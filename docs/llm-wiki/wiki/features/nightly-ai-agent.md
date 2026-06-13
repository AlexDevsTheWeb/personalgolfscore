---
title: Nightly AI Agent System
tags: [features, devops, ci-cd, automation]
created: 2026-06-13
updated: 2026-06-13
---

# Nightly AI Agent System

A two-agent nocturnal CI/CD pipeline that automatically maintains the LLM wiki and generates regression tests overnight using OpenRouter AI models.

## Architecture

```
┌──────────────────────────────────────────────────┐
│   nightly-reflection.yml (scheduled 23:00 UTC)   │
│   Agent 1: Dreamer (nightly_dream.js)            │
│     → Updates docs/llm-wiki/wiki/llm-wiki.md     │
│     → Dispatches event to trigger Agent 2        │
├──────────────────────────────────────────────────┤
│   nightly-qa-cascade.yml (repository_dispatch)   │
│   Agent 2: QA Guard (nightly_qa.js)              │
│     → Analyzes latest code diff                  │
│     → Generates regression test file via LLM     │
│     → Commits test + creates GitHub Issue        │
└──────────────────────────────────────────────────┘
```

## Agent 1: Dreamer

**Script**: `.github/scripts/nightly_dream.cjs`
**Workflow**: `.github/workflows/nightly-reflection.yml`

- Runs nightly at 23:00 UTC via cron schedule (`0 23 * * *`), also triggerable via `workflow_dispatch`
- Collects git log and diff from the last 24 hours (excluding `.github/` changes)
- Sends current wiki content + today's changes to OpenRouter (`deepseek/deepseek-r1`)
- LLM returns the updated wiki as markdown, written to `docs/llm-wiki/wiki/llm-wiki.md`
- Commits and pushes if content changed; skips if no git activity
- On success, fires a `repository_dispatch` event (`wiki_updated_cascade`) to trigger Agent 2

### Karpathy-Style Documentation Model

The system prompt follows Andrej Karpathy's documentation philosophy:
- Concise, factual, dense with technical information
- No pleasantries or introductions
- Focused on decisions, patterns, library changes, bugs resolved, and technical status

## Agent 2: QA Guard

**Script**: `.github/scripts/nightly_qa.cjs`
**Workflow**: `.github/workflows/nightly-qa-cascade.yml`

- Triggered by `repository_dispatch` after Agent 1 completes
- Diffs the last commit (`HEAD~1..HEAD`) to see what code changed
- Sends code diff + wiki context to OpenRouter
- LLM returns a JSON with `testFilePath` and `testCode`
- Writes the test file, commits it, and pushes
- Creates a GitHub issue with summary of what both agents did

## GitHub Secrets & Permissions

| Secret | Purpose |
|--------|---------|
| `OPENROUTER_API_KEY` | API key for OpenRouter AI model access |

- `GITHUB_TOKEN`: uses the built-in GitHub Actions token with explicit `contents: write` and `issues: write` permissions (configured via `permissions:` block in workflow YAMLs)

## Important Implementation Details

- Both workflows use Node 20 and `actions/checkout@v4` with `fetch-depth: 0` for full git history
- Agent 1 excludes `.github/` from its diff analysis to avoid self-referential updates
- Agent 2 diff scope is `HEAD~1 HEAD -- . ":!.github"` — only the most recent commit (from Agent 1)
- The QA script creates an issue with the label `agent-notification` (pre-created on GitHub)
- Model used: `deepseek/deepseek-r1` (configurable per-script)
- Temperature: 0.1 (Dreamer — more factual) and 0.2 (QA Guard — slightly more creative)

## Related Pages

- [CI Pipeline](../architecture/system-overview.md) — other GitHub Actions workflows
- [Testing Patterns](../patterns/testing.md) — Vitest and custom calc test framework
- [Branch Strategy](../conventions/branch-strategy.md) — git workflow
