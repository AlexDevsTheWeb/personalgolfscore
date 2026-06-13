---
title: HCP Persistence & Backfill — Implementation History
tags: [history, handicap, persistence, backfill]
created: 2026-06-13
updated: 2026-06-13
sources: [plans/2026-06-03-hcp-history-persistence.md]
---

# HCP Persistence & Backfill — June 3, 2026

## Plan

10 tasks: add type field → update RoundBuilder → update prepareRoundSaveBatch → wire saveNewRound → wire importRoundsBatch → create backfill utility (TDD) → Settings UI → table columns → chart simplification → final verification.

## Key Files Changed/Created

| File | Change |
|---|---|
| `src/types/roundData.types.tsx` | Added `previousHCP` to `IBasicRoundData` |
| `src/utils/round/round.utils.tsx` | Added `previousHCP` param to `prepareRoundSaveBatch` |
| `src/utils/firestore/round.firestore.ts` | Compute and pass `previousHCP` in `saveNewRound` and `importRoundsBatch` |
| `src/utils/firestore/backfillHcpHistory.utils.ts` | **New** — `computeRoundHcpHistory` pure helper + `backfillHcpHistory` orchestrator |
| `src/utils/firestore/backfillHcpHistory.utils.test.ts` | **New** — 6 vitest cases |
| `src/components/Settings/Settings.component.tsx` | Gated backfill trigger with dialog + snackbar |
| `src/components/HandicapHistory/HandicapHistory.component.tsx` | Old/New HCP columns; simplified chart to per-round HI line |

## Test Results

- All 6 backfill tests pass
- WHS tests unchanged (no formula changes)
- Type-check clean, build succeeds

## Related Pages

- [HCP Persistence & Backfill Feature](../features/hcp-persistence-backfill.md)
- [ADR-002: Per-Round HCP Persistence](../decisions/hcp-persistence.md)
