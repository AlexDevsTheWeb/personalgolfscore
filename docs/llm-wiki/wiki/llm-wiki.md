---
# LLM Wiki

Project knowledge base for AI agents.

## Architecture

- **Monorepo** with ES modules (`"type": "module"` in package.json).
- **CommonJS files** must use `.cjs` extension for compatibility (e.g., `config.cjs`, `seed.cjs`).
- **Nightly AI agent system** runs automatically to maintain wiki + test automation. Latest cycle: `43e973c` (test generation) and `39b6390` (wiki update).
- **Workspace vault** used for import rounds HCP chain anchoring.

## Key Decisions

- **DeepSeek v4 Flash** is the current LLM provider (switched from Gemini 2.0 Flash, retired June 1). Migrated via commit `1daf377`.
- **Error logging** improved in `212c3ce` during the Gemini-to-DeepSeek transition (`1daf377`). The DeepSeek migration Replaces the older Gemini provider.
- **HCP chain anchoring**: Fixed in `641efac` – `importRoundsBatch` now anchors to `currentHCP` instead of `initialHCP` to ensure chain consistency.
- **Round holes calculation**: Corrected in `5463254`; test data generator updated and expected values aligned. Documented in wiki in `fa33b31`.
- **Nightly agent commits**: `39b6390` = wiki update ("dreaming"), `43e973c` = automatic regression test generation. These commits represent the automated cycle.

## Conventions

- `.cjs` for CommonJS modules in ES module project.
- Workspace vault for HCP chain operations.
- Wiki updates documented with resolution sections for bug fixes.

## Patterns

- **Nightly automation**: AI agent updates wiki + runs tests on schedule (`feat/nightly-ai-agent` branch PR #139).
- **Bug fix documentation**: each fix includes resolution section in wiki and vault update.
- **Provider migration lifecycle**: first migrate to Gemini (`212c3ce`), then to DeepSeek (`1daf377`), with improved error logging.

## Milestones

- [x] AI wiki creation
- [x] Nightly AI agent system
- [x] HCP chain anchoring fix
- [x] Round holes calculation fix
- [x] Provider migration to DeepSeek v4 Flash
- [ ] Test automation fully stable

## Resolution Log

### Bug: Round holes calculation (PR #136)
**Commit**: `5463254`
**Fix**: Corrected calculation in test data generator. Expected values aligned.
**Documentation**: Updated wiki and vault in `fa33b31`.

### Bug: HCP chain anchoring (PR #138)
**Commit**: `641efac`
**Fix**: `importRoundsBatch` anchors to `currentHCP` instead of `initialHCP`.
**Documentation**: Workspace vault added in `d017018`, resolution section in `faa1b25`.

### Bug: CommonJS compatibility
**Commits**: `bc9405f`
**Fix**: Renamed `.js` files to `.cjs` for ES module project.

### Provider migration to DeepSeek v4 Flash
**Commits**: `212c3ce` (Gemini → Gemini with better logging), `1daf377` (Gemini → DeepSeek)
**Fix**: Switched from Gemini 2.0 Flash (retired Jun 1) to DeepSeek v4 Flash.
**Prerequisite**: Improved error logging added in `212c3ce`.

### Nightly AI agent system (PR #139)
**Commit**: `b5c0280` (feat), `43e973c` (test automation), `39b6390` (wiki update)
**Feature**: Automated nightly cycle: wiki update + regression test generation.
**State**: Active, with initial commits demonstrating the pattern.