---
title: Initial HCP & Progression Chart
tags: [feature, handicap, hcp, chart]
created: 2026-06-13
updated: 2026-06-13
sources: [milestones/v1.0-ROADMAP.md]
---

# Initial HCP & Progression Chart

## Overview

Anchors the handicap model to a user-supplied initial exact HCP value, captures the recalculated WHS Handicap Index and its delta on every saved round, and renders a Handicap History chart that starts at the initial HCP with a dashed reference line.

## Initial HCP Input (Settings)

- Input field on Settings page with strict validation
- Persisted to Firestore player document (`players/{uid}.initialHCP`)
- Reappears after refresh via player data fetch
- First-round guard enforced at three layers:
  1. **UI Alert** — warning banner shown
  2. **Disabled button** — save button greyed out
  3. **Logic throw** — save method throws if initialHCP is null and no rounds exist

## Per-Round HI/Delta

- Every saved round computes:
  - `handicapIndex` — recalculated WHS HI (best N of last 20, including this round)
  - `hcpDelta` — `handicapIndex - previousHCP`
- Stored on round document at save time
- `currentHCP` snapshot updated on the player document
- Imported rounds (`importRoundsBatch`) also receive per-round HI/delta via sequential computation with running HCP state

## Handicap History Chart

- `@mui/x-charts` LineChart anchored at `initialHCP`
- Dashed `ChartsReferenceLine` at the initial HCP level
- Fallback branches:
  - **D-11** — legacy user with existing rounds but no initialHCP
  - **D-14** — initialHCP set + 0 rounds (single point + reference line)
  - **D-15** — no initialHCP + import-only rounds (em-dash in Δ column)

## Key Design

- Per-round `writeBatch` in `importRoundsBatch` enables incremental HI computation with running HCP state
- Chart card lifted out of `roundsWithSD.length > 0` guard so D-14 renders correctly
- Delta column shows `+N`, `-N`, or `—` (em-dash for null)

## Files

- `src/utils/whs/hi.utils.tsx` — `calculateHandicapIndex()` with `HI_SCALING` table
- `src/utils/firestore/round.firestore.ts` — `saveNewRound()` with HI/delta, `importRoundsBatch()` with running computation
- `src/utils/firestore/backfillHcpHistory.utils.ts` — One-time backfill utility for existing rounds

## Related Pages

- [Handicap Index](../concepts/handicap-index.md)
- [Data Flow](../architecture/data-flow.md)
- [HCP Persistence & Backfill](hcp-persistence-backfill.md)
