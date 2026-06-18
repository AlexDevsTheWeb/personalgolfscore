---
# LLM Wiki

Project knowledge base for AI agents.

## Architecture

- **Monorepo** with ES modules (`"type": "module"` in package.json).
- **CommonJS files** must use `.cjs` extension for compatibility (e.g., `config.cjs`, `seed.cjs`).
- **Nightly AI agent system** runs automatically to maintain wiki + test automation.
- **Workspace vault** used for import rounds HCP chain anchoring.
- **Night dreamer** is the component responsible for automated maintenance; it now uses the correct wiki path after a fix.

## Key Decisions

- **DeepSeek v4 Flash** is the current LLM provider (switched from Gemini 2.0 Flash, retired June 1).
- **Error logging** improved during provider migration.
- **HCP chain anchoring**: `importRoundsBatch` anchors to `currentHCP` instead of `initialHCP` to fix chain consistency.
- **Round holes calculation**: corrected in test data generator; expected values aligned accordingly.
- **Night dreamer wiki path**: corrected to point to the new LLM wiki location (previously pointing to a stale path).

## Conventions

- `.cjs` for CommonJS modules in ES module project.
- Workspace vault for HCP chain operations.
- Wiki updates documented with resolution sections for bug fixes.

## Patterns

- **Nightly automation**: AI agent updates wiki + runs tests on schedule.
- **Bug fix documentation**: each fix includes resolution section in wiki and vault update.
- **Path consistency**: Ensure all references to the wiki in automation scripts (e.g., night dreamer) are updated when the file location changes.

## Milestones

- [x] AI wiki creation
- [x] Nightly AI agent system
- [x] HCP chain anchoring fix
- [x] Round holes calculation fix
- [x] Provider migration to DeepSeek v4 Flash
- [ ] Test automation fully stable
---
**Bug Fix: Night dreamer wiki path (2025-01-27)**
- **Issue**: Night dreamer automation script had a hardcoded or stale path to the wiki file, causing it to update the wrong location.
- **Resolution**: Updated the path to match the new LLM wiki file location (commit `623878c`). Now the nightly agent correctly modifies the canonical `llm-wiki.md`.