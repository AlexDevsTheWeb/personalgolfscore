# Handicap History Feature Design

Date: 2026-06-01

## Overview

Three related changes to the Handicap system:
1. Remove the 3-round minimum gate for HI calculation (allow 1-2 rounds)
2. New Handicap History page with a table of the last 20 rounds, highlighting the best 8 SDs
3. HCP progression line chart on the same page

---

## 1. Remove 3-Round Minimum Limit

### Current State
`hi.utils.tsx:61-63` returns `null` when fewer than 3 Score Differentials exist. The `HI_SCALING` table starts at 3 rounds. The simulator shows an alert when < 3 rounds exist.

### Changes

**`src/utils/whs/hi.utils.tsx`:**
- Add `1: 1, 2: 1` to `HI_SCALING` table
- Remove the `if (count < 3) return null` guard
- `getScalingCount` helper is internal to Simulator and updated separately

**`src/components/Simulator/Simulator.component.tsx`:**
- Remove `hasFewRounds` check and its alert (lines 231, 277-282)
- Remove the "— (need at least 3 rounds)" fallback in the results card (line 412)
- Update `getScalingCount()`: add 1→1, 2→1 entries; remove the `if (count < 3) return 0` guard
- Show proper HI value even for 1-2 rounds

**Test data (`src/dev-tools/whsTestData.ts`):**
- "2 rounds - returns null" → expect average of the 2 SDs
- "1 round - returns null" → expect that single SD
- "Empty array - returns null" → still null (no data at all)
- "Only 1 current SD (projected)" → expect that single SD

### WHS Compliance
WHS Rule 5.2a does define values for 1-2 rounds:
- 1 round: that SD is the Handicap Index
- 2 rounds: average of both SDs

---

## 2. New Handicap History Page

### Route
- Path: `/handicap-history`
- Nav label: "Handicap History"
- Icon: `TimelineIcon` (or `AutoGraphIcon` if preferred, but simulator already uses it)

### Page Structure
Two stacked sections in a single page component:

```
+------------------------------------------+
|  Handicap History                         |
|  (TimelineIcon + title)                   |
+------------------------------------------+
|  Last 20 Rounds                           |
|  +------+--------+-----+-----+-----+---+ |
|  | Date | Course | Tee | Str | SD  |   | |
|  +------+--------+-----+-----+-----+---+ |
|  | 6/1  | CourseA| Blk | 85  | 14.2| ⭐| |
|  | 5/28 | CourseB| Wht | 82  | 12.1| ⭐| |
|  | ...  |        |     |     |     |   | |
|  +------+--------+-----+-----+-----+---+ |
+------------------------------------------+
|  HCP Progression                          |
|  [Line Chart]                             |
|  Date -> Handicap Index over time         |
+------------------------------------------+
```

### Last 20 Rounds Table

**Data source:** `roundsList` from Zustand store, filtered to rounds with `scoreDifferential != null`, sorted by `roundDate` descending.

**Columns:**
| Column | Source | Format |
|---|---|---|
| Date  | `roundDate` | dayjs formatted (DD/MM/YYYY) |
| Course | `roundCourse` | String |
| Tee | `roundTee` | String |
| Strokes | `totals.totalStrokes` | Number |
| Score Differential | `scoreDifferential` | 1 decimal (e.g. 14.2) |
| Used in HI | computed | Star icon ⭐ if this SD is among the lowest N for the current scaling |

**Highlighting logic:**
1. Get up to 20 most recent SDs from the filtered list
2. Determine N = WHS scaling count for current number of rounds
3. Sort those 20 SDs ascending, take lowest N
4. Rows whose SD matches the lowest N get highlighted (colored background + star)

**Edge cases:**
- 1-2 rounds available: only 1 row highlighted (or 2 for 2 rounds under new scaling)
- 0 rounds: show empty state "No rounds with score differentials yet"
- More than 20 rounds: only the most recent 20 are shown

### Component Structure
- `src/pages/HandicapHistory.page.tsx` — thin page component
- `src/components/HandicapHistory/HandicapHistory.component.tsx` — main component
- No new store slices (reads from existing `roundsList`)

---

## 3. HCP Progression Line Chart

### Chart Logic
For each round with a `scoreDifferential` (chronological order), compute the HI using **only rounds up to and including that point**. This shows how the player's HI evolved as each new round was completed.

**Algorithm:**
1. Take all rounds with `scoreDifferential`, sort by `roundDate` ascending (oldest first)
2. For each round at index `i`:
   - Take SDs from `[0..i]` (all rounds up to this point)
   - Reverse to most-recent-first (as `calculateHandicapIndex` expects)
   - Call `calculateHandicapIndex()` → get HI at that point
3. Plot: X = roundDate, Y = HI value
4. Skip data points where HI is null (shouldn't happen after removing 3-round gate)

### Visual Details
- `@mui/x-charts` `LineChart` (already in dependencies)
- Show line with dots at each data point
- Y-axis: Handicap Index (0-54 or auto-range)
- X-axis: dates (rotated labels if dense)
- Tooltip on hover: date + HI value
- Empty state: "Play some rounds to see your Handicap progression"

### Edge Cases
- 0-1 rounds: show empty state with prompt
- 2 rounds: only 2 data points, still shows a line
- All same HI: flat line (acceptable)
- Missing SD on some rounds: only include rounds that have SDs

---

## Files Changed

### Modified files
| File | Change |
|---|---|
| `src/utils/whs/hi.utils.tsx` | Add 1:1, 2:1 to HI_SCALING; remove count<3 gate; update JSDoc |
| `src/components/Simulator/Simulator.component.tsx` | Remove <3 alerts & fallback; update getScalingCount; update best8 SDs logic |
| `src/dev-tools/whsTestData.ts` | Update 1-2 round test expectations; update projected test |
| `src/App.tsx` | Add `/handicap-history` route |
| `src/utils/links/links.utils.tsx` | Add nav link for Handicap History |

### New files
| File | Purpose |
|---|---|
| `src/pages/HandicapHistory.page.tsx` | Route page |
| `src/components/HandicapHistory/HandicapHistory.component.tsx` | Full feature component |
| `docs/superpowers/specs/2026-06-01-handicap-history-feature-design.md` | This document |

---

## Verification

- `npm run test:calc:whs` — all tests must pass
- `npm run type-check` — no TypeScript errors
- `npm run build` — production build succeeds
- Manual: navigate to simulator, verify no <3 alerts, verify HI shows with 1-2 rounds
- Manual: navigate to `/handicap-history`, verify table + chart render
