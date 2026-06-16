---
title: Stableford Scoring
tags: [stableford, concept, scoring]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-04-stableford-history-design.md]
---

# Stableford Scoring

Stableford is a points-based golf scoring system where players earn points per hole based on their score relative to par, adjusted by their playing handicap.

## Points Table

| Score Relative to Par | Strokes vs Par | Stableford Points |
|---|---|---|
| Albatross (double eagle) | -3 | 5 |
| Eagle | -2 | 4 |
| Birdie | -1 | 3 |
| Par | 0 | 2 |
| Bogey | +1 | 1 |
| Double bogey or worse | +2 or more | 0 |

## Implementation

The app computes Stableford points per hole in `calculateStablefordPoints()` in `src/utils/shots/shots.utils.tsx`. The round total (sum of all hole points) is stored in `totals.points.totals` on each round document.

### Derived Statistics

| Stat | Formula | Source |
|---|---|---|
| Stableford Points | `totals.points.totals` | Direct from round doc |
| Gross Score | `totals.score.totals` | Direct from round doc |
| Net Score | Gross Score - Playing HCP | Derived |
| Gross vs Par | Gross Score - Course Par | Derived |
| Net vs Par | Net Score - Course Par | Derived |

## Related Pages

- [Handicap Index](handicap-index.md) — The handicap system Stableford interacts with
- [Stableford History Feature](../features/stableford-history.md) — History page with table and chart
- [Testing Patterns](../patterns/testing.md) — How Stableford calculation tests are structured
