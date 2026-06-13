---
title: Branch Strategy & Workflow
tags: [conventions, git, branching]
created: 2026-06-13
updated: 2026-06-13
sources: [AGENTS.md, .planning/config.json]
---

# Branch Strategy & Workflow

## Branch Rules

- **NEVER push directly** to `development`, `release/*`, or `main` — always create a feature/fix branch first
- `development` — primary integration branch; all PRs target this
- `main` — production releases only
- `release/*` — release candidates and staging

## Branch Naming

| Purpose | Pattern | Example |
|---|---|---|
| Feature | `feat/{slug}` | `feat/history-tabs` |
| Bugfix | `fix/{slug}` | `fix/dashboard-stableford-display` |
| Phase work | `feat/phase-{n}-{slug}` | `feat/phase-2-whs-engine` |
| Milestone work | `feat/milestone-{milestone}-{slug}` | `feat/milestone-v1-admin` |
| Quick/task | `fix/{slug}` | `fix/env-vars` |

## Workflow

0. **Read the wiki** — before starting, review `docs/llm-wiki/wiki/index.md` to understand architecture, patterns, conventions, and existing decisions
1. **Issue first** — create GitHub issue if none exists for the feature/bugfix
2. **Branch first** — create branch from `development` before implementing:
   ```
   git checkout -b feat/{slug} development
   ```
3. **Implement** — commit using conventional commits format
4. **PR** — open pull request targeting `development`
5. **Review & merge** — after approval, merge to `development`

## Commit Convention

```
feat: add handicap simulator with course selection
fix: correct score differential rounding for negative values
docs: update firestore schema documentation
chore: bump dependencies
```

Prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `style:`

## Tagging

- Releases tagged with SemVer (e.g., `v1.0`, `v1.1`)
- Tags created at milestone completion or significant release

## Related Pages

- [Coding Conventions](coding.md)
- [System Architecture](../architecture/system-overview.md)
- [Wiki Index](../index.md)
