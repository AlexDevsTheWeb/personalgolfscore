---
title: Handicap History Feature
tags: [feature, handicap, whs, history]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-01-handicap-history-feature-design.md]
---

# Handicap History Feature

## Changes Made

1. **Removed 3-round minimum** for HI calculation (WHS Rule 5.2a compliance for 1-2 rounds)
2. **New Handicap History page** at `/handicap-history` (later moved to `/history?tab=handicap`)
3. **HCP progression line chart** showing HI evolution over time

### HI Scaling Changes

Added `1: 1, 2: 1` to the `HI_SCALING` table in `hi.utils.tsx` and removed the `if (count < 3) return null` guard.

### Page Structure

- **Last 20 Rounds table** — Date, Course, Tee, Strokes, Score Diff, Used (star for best N SDs)
- **HCP Progression chart** — Line chart showing HI after each round, computed cumulatively

### Implementation Details

- Route: `/handicap-history` (later consolidated into `/history` tabs)
- Component: `src/components/HandicapHistory/HandicapHistory.component.tsx`
- No new store slices — reads from existing `roundsList`

## Related Pages

- [WHS Handicap Index Concept](../concepts/handicap-index.md)
- [HCP Persistence & Backfill](hcp-persistence-backfill.md)
- [History Tabs](history-tabs.md)
- [History: Implementation](../history/2026-06-01-handicap-history.md)
