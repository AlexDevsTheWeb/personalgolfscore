---
title: Stableford History Feature
tags: [feature, stableford, history]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-04-stableford-history-design.md]
---

# Stableford History Feature

## Overview

A new `/stableford-history` page (later consolidated into `/history?tab=stableford`) showing the last 20 rounds in a 6-column table and a 3-line dual-axis trend chart.

This PR also included two unrelated cleanups:
1. Made the "Dashboard" sidebar entry visible (was hidden via `show: false`)
2. Renamed the `Points` column to `Stableford Pts` in the dashboard rounds table

## Page Structure

- **Last 20 Rounds table** — Date, Course, Stableford, Score, Net vs Par, Gross vs Par (6 columns)
- **Trend chart** — Single `LineChart` from `@mui/x-charts` with 3 series:
  - `Stableford Pts` (left y-axis, green)
  - `Net vs Par` (right y-axis, blue)
  - `Gross vs Par` (right y-axis, orange)

## Key Files

- `src/utils/stableford/stableford.utils.tsx` — Pure helper functions covered by 14 vitest cases
- `src/components/StablefordHistory/StablefordHistory.component.tsx` — Main page component
- No Firestore schema changes, no new types, no backfill needed

## Related Pages

- [Stableford Concept](../concepts/stableford.md)
- [History Tabs](history-tabs.md)
- [History: Implementation](../history/2026-06-04-stableford-history.md)
