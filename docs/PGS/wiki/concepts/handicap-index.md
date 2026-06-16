---
title: WHS Handicap Index
tags: [whs, handicap, concept]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md, specs/2026-06-01-handicap-history-feature-design.md]
---

# WHS Handicap Index

The app implements the World Handicap System (WHS) handicap index calculation.

## Calculation

Given a set of score differentials (SDs), sorted most-recent-first:

1. Take the most recent 20 SDs (or all if fewer than 20)
2. Apply the WHS scaling table to determine how many of the lowest SDs to average
3. Average those lowest SDs and round to 1 decimal

### Scaling Table

| Rounds Available | Lowest N Used |
|---|---|
| 1-2 | 1 |
| 3-5 | 1 |
| 6-8 | 2 |
| 9-11 | 3 |
| 12-14 | 4 |
| 15-16 | 5 |
| 17-18 | 6 |
| 19 | 7 |
| 20 | 8 |

### Score Differential Formula

`SD = (AGS - Course Rating) × 113 / Slope Rating`

Where AGS = Adjusted Gross Score (the round's total strokes).

## Key Implementation Details

- **No 3-round minimum** — as of June 2026, WHS rules for 1-2 rounds are implemented per WHS Rule 5.2a
- **`calculateHandicapIndex()`** in `src/utils/whs/hi.utils.tsx` is the core function
- **Scaling** uses the `HI_SCALING` lookup table (`Record<number, number>`)
- Rounds without a `scoreDifferential` are excluded from the calculation

## Related Pages

- [Score Differential](score-differential.md) — How individual round SDs are computed
- [Handicap History Feature](../features/handicap-history.md) — The UI for viewing HI progression
- [HCP Persistence & Backfill](../features/hcp-persistence-backfill.md) — Per-round HCP field storage
- [Stableford](stableford.md) — Related scoring system
