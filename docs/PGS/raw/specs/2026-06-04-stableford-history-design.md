# Stableford History Page + Drawer Dashboard Icon

Date: 2026-06-04

## Overview

Two unrelated visibility fixes that share a single PR (and a single branch off `development`):

1. **Drawer dashboard icon** — make the existing "Dashboard" sidebar entry actually visible. One-line change in `src/utils/links/links.utils.tsx`. The Dashboard route, breadcrumb, and `HomeWorkIcon` are all already wired; only `show: false` is hiding it.
2. **Stableford history page** — a new `/stableford-history` page (and sidebar entry) showing the last 20 rounds in a table and a 3-line dual-axis chart of `Stableford Pts`, `Net vs Par`, and `Gross vs Par`. Plus a small rename of the dashboard's `Rounds` table column from "Points" to "Stableford Pts" for clarity.

No Firestore schema changes, no backfill utility, no new types on `IBasicRoundData`. Every value plotted or shown is already on the round document.

---

## 1. Drawer Dashboard Icon

### Change

**`src/utils/links/links.utils.tsx:16`** — flip `show: false` to `show: true` on the Dashboard entry.

```diff
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: HomeWorkIcon,
-   show: false,
+   show: true,
  },
```

That's the entire change for this item. No new imports, no new component, no breadcrumb edit (the breadcrumb's `HomeIcon` stays as-is — it represents "home", not "this sidebar item").

---

## 2. Stableford History Page

### New files

#### `src/utils/stableford/stableford.utils.tsx`

Pure helpers. Each takes a round and returns `number | null`. `null` is returned for any missing required input so the table renders `—` and the chart skips the point.

```ts
export const getStablefordPoints = (round: IRound): number | null => { ... }
export const getGrossScore       = (round: IRound): number | null => { ... } // = totals.score.totals
export const getNetScore         = (round: IRound): number | null => { ... } // = gross - roundPlayingHCP
export const getGrossVsPar       = (round: IRound): number | null => { ... } // = gross - roundPar
export const getNetVsPar         = (round: IRound): number | null => { ... } // = net   - roundPar
```

#### `src/utils/stableford/stableford.utils.test.ts`

Vitest cases:
- `getStablefordPoints` returns `totals.points.totals` when present, `null` otherwise.
- `getGrossScore` returns `totals.score.totals` when present, `null` otherwise.
- `getNetScore` returns `null` when `roundPlayingHCP` is missing.
- `getGrossVsPar` returns `null` when `roundPar` is missing.
- `getNetVsPar` returns `null` when either `roundPar` or `roundPlayingHCP` is missing.
- Sanity check: a 72-par round, gross 80, playingHCP 10 → `getNetVsPar() === 80 - 10 - 72 === -2`.

#### `src/components/StablefordHistory/StablefordHistory.component.tsx`

The page content. Mirrors the structure of `src/components/HandicapHistory/HandicapHistory.component.tsx` (cards in a vertical stack), with:

- **Empty state card** when `roundsList.length === 0` (same wording as HCP history).
- **Last 20 Rounds table card** — 6 columns: `Date`, `Course`, `Stableford`, `Score`, `Net vs Par`, `Gross vs Par`. All numeric cells right-aligned, `—` for nulls. The table uses a stable transparent wrapper on every `Stableford` cell so row heights match (the HCP history page already uses this pattern for its SD column).
- **Trend chart card** — single `<LineChart>` from `@mui/x-charts` with the dataset and series described below.
- No row-level highlighting (stableford has no "used" rule analogous to WHS's best-N-of-20).

#### `src/pages/StablefordHistory.page.tsx`

Thin wrapper that renders `<StablefordHistory />`. Parallels `src/pages/HandicapHistory.page.tsx`.

### Edited files

#### `src/utils/links/links.utils.tsx`

Add a new sidebar entry:

```ts
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
// ...
{
  id: 8,
  name: 'Stableford History',
  link: '/stableford-history',
  icon: ScoreboardIcon,
  show: true,
},
```

#### `src/components/layout/MainLayout2.component.tsx`

Two changes inside the `getBreadcrumbs` switch (around lines 88-116):

- Import the new page (no — the page is registered via the router, not imported here).
- Add an `else if (path === '/stableford-history')` branch that pushes `{ label: 'Stableford History', path: '/stableford-history' }`.

The breadcrumb root (the `Home` icon) is already correct and points to `/dashboard`, which is exactly the new drawer entry from change #1.

#### Router registration

In the file that owns the route table (likely `src/App.tsx` — verify at implementation time, may be `src/routes/...`):

```tsx
<Route path="/stableford-history" element={<StablefordHistory />} />
```

Exact import + wrapping follows whatever pattern the existing `/handicap-history` route uses (probably wrapped in `<ProtectedRoute>`).

#### `src/components/Rounds/RoundsTable.component.tsx:32`

Rename header `'Points'` to `'Stableford Pts'`. No data change.

### Data flow

- `useAppStore` `roundsList` is the single source (same as `/handicap-history`).
- `last20 = roundsList.slice(0, 20)` — same sort and slice semantics as the HCP history page.
- No Firestore writes. No backfill utility. The values plotted and shown are derived from fields that already exist on each round document: `totals.points.totals`, `totals.score.totals`, `roundPar`, `roundPlayingHCP`.
- No new fields on `IBasicRoundData` or any round type.

### Math (single source of truth in `stableford.utils.tsx`)

| Helper | Formula | Returns `null` if… |
|--------|---------|---------------------|
| `getStablefordPoints` | `totals.points.totals` | `totals.points` missing |
| `getGrossScore` | `totals.score.totals` | `totals.score` missing |
| `getNetScore` | `getGrossScore - roundPlayingHCP` | either missing |
| `getGrossVsPar` | `getGrossScore - roundPar` | either missing |
| `getNetVsPar` | `getNetScore - roundPar` (≡ `getGrossScore - roundPar - roundPlayingHCP`) | any missing |

Note: the existing `RoundsTable.component.tsx:43-44` defines `netScore` and `grossScore` with the names inverted relative to common golf usage. This spec does NOT change that file's logic, only renames its header. If a future refactor wants to clean up the variable names, that's out of scope for this PR.

### Chart config

Single `<LineChart>` from `@mui/x-charts` (already a project dep, version 8.x).

- **Dataset** — `last20.map(round => ({ date: round.roundDate, stableford, netVsPar, grossVsPar }))`. `date` is a `Date` object for the time scale.
- **Series:**
  - `{ dataKey: 'stableford', label: 'Stableford Pts', yAxisId: 'left', color: 'success.main' }`
  - `{ dataKey: 'netVsPar',   label: 'Net vs Par',     yAxisId: 'right', color: 'primary.main' }`
  - `{ dataKey: 'grossVsPar', label: 'Gross vs Par',   yAxisId: 'right', color: 'warning.main' }`
- **X axis:** time scale, `valueFormatter: (d) => dayjs(d).format('DD/MM/YY')`. Matches the HCP history page formatter.
- **Y axes:**
  - `left`: `label: 'Stableford Pts'`, no fixed range — automatic, lets outlier rounds above 40 not get clipped (theoretical 18-hole ceiling is 90 for all-albatrosses, realistic ceiling ~54 for all-birdies).
  - `right`: `label: 'vs Par'`, no fixed range, automatic.
- **Height:** `300` (same as HCP history).
- **Missing values:** `null` entries from the utils flow into MUI charts as gaps; no chart-level config needed.

### Testing approach

- **Unit tests** for the pure utils (see `stableford.utils.test.ts` above).
- **No React component tests** for the new page — consistent with how `/handicap-history` is shipped (the repo's testing approach for UI is manual UAT via the dev server).
- **No Firestore tests** — no writes, no reads beyond the existing `roundsList` store slice.
- **Manual UAT checklist** (to be run by the user before marking the PR ready):
  1. With zero rounds: page shows empty-state card.
  2. With 5 rounds: table has 5 rows, chart has 3 series, both axes labeled.
  3. With a round that has `totals.points` populated and `roundPar` / `roundPlayingHCP` set: table cells show numbers (not `—`), chart line is drawn.
  4. With a round that has `totals.points` missing (legacy import): table cell shows `—`, chart skips the point for that date.
  5. Drawer (after the change in #1): "Dashboard" entry appears with `HomeWorkIcon` and links to `/`.
  6. Dashboard `Rounds` table: header now reads "Stableford Pts".
  7. `/handicap-history` and `/stableford-history` are independently reachable from the drawer, breadcrumbs work, no console errors.

### Branch and PR

- Branch: `feat/stableford-history` off `origin/development` (created at the start of this work).
- Commits (two):
  1. `feat(stableford): add /stableford-history page with 3-line dual-axis chart`
  2. `chore(ui): expose Dashboard in the drawer and rename Points column to Stableford Pts`
- Push the branch and open a **draft** PR to `development` (same pattern as PR #125 for the HCP history work).

---

## Out of scope

- Stableford per-hole breakdown (e.g., which holes gained/lost points) — not asked for.
- Stableford backfill — not needed; data is already on every round.
- Persisting a `stablefordIndex` or `netVsParSnapshot` on the round doc — derivable on the fly, not worth a new field.
- Renaming the `netScore` / `grossScore` variables in `RoundsTable.component.tsx:43-44` — pre-existing, separate concern.
- Visual redesign of the `HandicapHistory` page — no changes here.
