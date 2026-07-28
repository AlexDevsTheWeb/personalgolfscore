---
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
- **Automatic nightly regression test generation**: The nightly agent now generates regression tests automatically (commit `7fb6f29`, confirmed by subsequent run `3180519`). This is a step toward fully stable test automation.
- **Combined nightly automation**: The nightly agent now both updates the wiki and generates regression tests in a single automated run (commits `3180519`, `e091bbc`).
- **Nightly regression test generation retested**: Successfully verified in commit `fa5f2e2`.

## Conventions

- `.cjs` for CommonJS modules in ES module project.
- Workspace vault for HCP chain operations.
- Wiki updates documented with resolution sections for bug fixes.

## Patterns

- **Nightly automation**: AI agent updates wiki + runs tests on schedule (first fully automated cycle observed with commits `3180519` and `e091bbc`).
- **Bug fix documentation**: each fix includes resolution section in wiki and vault update.
- **Path consistency**: Ensure all references to the wiki in automation scripts (e.g., night dreamer) are updated when the file location changes.
- **Test generation**: The nightly agent now automatically generates regression tests, reducing manual test maintenance (commits `7fb6f29`, `3180519`).
- **Iterative stability verification**: Each nightly run is treated as a verification step; regression test generation is repeatedly tested to ensure robustness (commits `fa5f2e2`, `5773fb4`).

## Milestones

- [x] AI wiki creation
- [x] Nightly AI agent system
- [x] HCP chain anchoring fix
- [x] Round holes calculation fix
- [x] Provider migration to DeepSeek v4 Flash
- [x] Automatic nightly regression test generation
- [ ] Test automation fully stable

---

**Bug Fix: Night dreamer wiki path (2025-01-27)**
- **Issue**: Night dreamer automation script had a hardcoded or stale path to the wiki file, causing it to update the wrong location.
- **Resolution**: Updated the path to match the new LLM wiki file location (commit `623878c`). Now the nightly agent correctly modifies the canonical `llm-wiki.md`.

**Feature: Automatic nightly regression test generation & wiki update (2025-01-28)**
- **Change**: The nightly agent now automatically generates regression tests (commit `7fb6f29`, re-executed `3180519`) and updates the wiki (commit `e091bbc`) in a single nightly run. This is part of the ongoing effort to stabilize test automation.
- **Impact**: Reduces manual test maintenance and wiki upkeep, moving the project closer to the "Test automation fully stable" milestone.

**Test: Nightly regression test generation retested (2025-01-29)**
- **Verification**: Commit `fa5f2e2` confirmed that the automatic regression test generation continues to function correctly in a subsequent nightly cycle.
- **Impact**: Increases confidence that the feature is stable; the project remains on track to achieve fully stable test automation.

**Test: Nightly regression test generation and wiki update verified (2025-01-30)**
- **Verification**: Commits `e8837e2` (test generation) and `555e8d9` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation verified (2025-01-31)**
- **Verification**: Commit `5773fb4` confirms another successful automatic nightly regression test generation.
- **Impact**: Further evidence of the automated system's reliability; the project remains on track to achieve fully stable test automation.

**Test: Nightly regression test generation and wiki update verified (2025-02-01)**
- **Verification**: Commits `55de33e` (test generation) and `93304f1` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation verified (2025-02-02)**
- **Verification**: Commit `af0ff1d` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to build confidence in the automated system's reliability; the project remains on track to achieve fully stable test automation.

**Test: Nightly regression test generation verified (2025-02-03)**
- **Verification**: Commit `0716053` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation and wiki update verified (2025-02-04)**
- **Verification**: Commits `9aa5644` (test generation) and `06ce7da` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation and wiki update verified (2025-02-05)**
- **Verification**: Commits `347c310` (test generation) and `c8dd101` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation and wiki update verified (2025-02-06)**
- **Verification**: Commits `dc41d25` (test generation) and `924d2fc` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation verified (2025-02-07)**
- **Verification**: Commit `d771cfe` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.

**Test: Nightly regression test generation and wiki update verified (2025-02-08)**
- **Verification**: Commits `18120bb` (test generation) and `e12fb7f` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation and wiki update verified (2025-02-09)**
- **Verification**: Commits `441564d` (test generation) and `f14a164` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation and wiki update verified (2025-02-10)**
- **Verification**: Commits `2ba9544` (test generation) and `acc0bbf` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.

**Test: Nightly regression test generation verified (2025-02-11)**
- **Verification**: Commit `5b0614d` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.

**Test: Nightly regression test generation verified (2025-02-12)**
- **Verification**: Commit `a14f9e8` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.