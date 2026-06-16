# Consolidate Handicap + Stableford History into `/history` (tabbed)

Date: 2026-06-04

## Overview

After the HCP history persistence + backfill work (PR #125) and the new stableford history page (PR #128) both merged to `development`, the user has two separate history routes (`/handicap-history`, `/stableford-history`) that show closely related views of the same dataset. This refactor consolidates them into a single tabbed page at `/history`, with `?tab=stableford` as the only query param needed to switch views.

The two existing components (`HandicapHistory.component.tsx` and `StablefordHistory.component.tsx`) stay in their current files and folders. A thin new `History` page reads the query param, renders `MuiTabs`, and conditionally mounts one of the two existing components. The two components lose their individual header lines (3-7 lines removed from each).

No data flow changes, no utils changes, no Firestore changes, no new dependencies. Pure UI refactor.

---

## 1. URL & tab handling

- Route: `/history` (single, replaces both old routes)
- Query param: `?tab=stableford` selects the Stableford tab. Any other value (including missing or `?tab=garbage`) falls back to the Handicap tab. `?tab=handicap` is also accepted for symmetry.
- Old routes `/handicap-history` and `/stableford-history` are **deleted, no redirect** (per the brainstorming Q1 decision). They fall through to the catch-all `<Route path="*">` which renders the `Error` page.

## 2. New files

### `src/components/History/History.component.tsx`

- Default export `History` (functional component)
- Uses `useSearchParams` from `react-router-dom` to read `tab`
- Uses `useNavigate` to push the new URL when a tab is clicked
- Renders a `<Box>` containing:
  - Page header: `<TimelineIcon />` + `<Typography variant="headline2">History</Typography>`
  - `<Tabs value={tab} onChange={...}>` with two `<Tab value="handicap" label="Handicap" />` and `<Tab value="stableford" label="Stableford" />` (MUI Tabs)
  - Conditionally: `tab === 'stableford' ? <StablefordHistory /> : <HandicapHistory />`
- The two child components manage their own loading / empty states (already wired); the wrapper itself has no data.
- No `useMemo`, no `useEffect`, no store access — it's a pure router shell.

### `src/pages/History.page.tsx`

Three-line wrapper, same shape as the deleted `HandicapHistory.page.tsx` and `StablefordHistory.page.tsx`:

```tsx
import History from '@/components/History/History.component';

const HistoryPage = () => {
	return <History />;
};

export default HistoryPage;
```

## 3. Modified files

### `src/components/HandicapHistory/HandicapHistory.component.tsx`

Remove the page-header block. Specifically, delete the `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>` block at the top of the returned JSX (contains `<TimelineIcon />` and `<Typography variant="headline2">Handicap History</Typography>`). The component still does all its data work (filter, sort, last 20, highlighted SDs, chart) — only the header is gone.

The `TimelineIcon` import is no longer needed in this file (only the page-level `History` component will use it). Remove the import.

### `src/components/StablefordHistory/StablefordHistory.component.tsx`

Same change: remove the page-header block (currently contains `<ScoreboardIcon />` and `<Typography variant="headline2">Stableford History</Typography>`). The `ScoreboardIcon` import is removed from this file.

### `src/App.tsx`

- Remove `import HandicapHistoryPage from './pages/HandicapHistory.page';`
- Remove `import StablefordHistoryPage from './pages/StablefordHistory.page';`
- Add `import HistoryPage from './pages/History.page';`
- Remove the two route lines:
  - `<Route path='/handicap-history' element={<HandicapHistoryPage />} />`
  - `<Route path='/stableford-history' element={<StablefordHistoryPage />} />`
- Add one route line:
  - `<Route path='/history' element={<HistoryPage />} />`

### `src/utils/links/links.utils.tsx`

- Remove the `ScoreboardIcon` import (no longer used).
- Remove the sidebar entry I added in PR #128: `{ id: 8, name: 'Stableford History', link: '/stableford-history', icon: ScoreboardIcon, show: true }`.
- Rename the existing first entry: `{ id: 1, name: 'Handicap History', link: '/handicap-history', icon: TimelineIcon, show: true }` → `{ id: 1, name: 'History', link: '/history', icon: TimelineIcon, show: true }`. `TimelineIcon` is kept because "history" is generic and the icon still reads well.

(The `id: 1` stays; IDs are stable internal keys, not display order.)

### `src/components/layout/MainLayout2.component.tsx`

In the `getBreadcrumbs()` function:

- Remove the two `else if` branches:
  - `} else if (path === '/handicap-history') { ... }`
  - `} else if (path === '/stableford-history') { ... }`
- Add one branch:
  - `} else if (path === '/history') { breadcrumbs.push({ label: 'History', path: '/history' }); }`

Breadcrumb always reads `Home / History` (tab is not in the breadcrumb — it lives in the URL `?tab=`).

## 4. Deleted files

- `src/pages/HandicapHistory.page.tsx` — orphaned, no importer
- `src/pages/StablefordHistory.page.tsx` — orphaned, no importer

(Verification step before deletion: `grep -r "HandicapHistoryPage\|StablefordHistoryPage" src/` returns no matches.)

## 5. Data flow

Unchanged. Both `HandicapHistory` and `StablefordHistory` continue to read `roundsList` from `useAppStore` and apply their existing `useMemo` filter/sort/slice logic. The new `History` wrapper has no data dependency.

The store, the stableford utils, the HCP backfill, and the round types are all untouched by this refactor.

## 6. Testing approach

- **No new vitest cases** — the change is pure UI routing and a one-line title edit. The existing 17 stableford utils tests + 6 backfillHcpHistory tests are unaffected and must continue to pass.
- **No new types** — the new `History` component has no props and no data signature.
- **Manual UAT** (mirrored in the PR body):
  1. Open `/history` → Handicap tab content (Last 20 Rounds table + HCP Progression chart) renders, no console errors.
  2. Click "Stableford" tab → URL becomes `/history?tab=stableford`, Stableford table + 3-line chart render.
  3. Refresh at `/history?tab=stableford` → Stableford tab stays selected.
  4. Open `/history?tab=garbage` → falls back to Handicap.
  5. Old `/handicap-history` and `/stableford-history` return the catch-all Error page (no redirect).
  6. Drawer shows one "History" entry, links to `/history`.
  7. Breadcrumb on `/history` reads `Home / History`.
  8. `/handicap-history` link no longer appears in the drawer (only History).

## 7. Branch & PR

- Branch: `feat/history-tabs` (created at the start of this work, off `origin/development`).
- Commits (two):
  1. `refactor(history): consolidate handicap + stableford history into /history tabs`
  2. `chore(ui): rename Handicap History drawer entry to History` (bundles sidebar + breadcrumb rename so it's a single small follow-up commit)
- Push the branch and open a **draft** PR to `development`.

## 8. Out of scope

- The internal structure of `HandicapHistory.component.tsx` and `StablefordHistory.component.tsx` (charts, tables, highlights, calculations) — unchanged.
- Stableford history table columns or chart config — unchanged.
- HCP history persistence + backfill — unchanged.
- Per-user tab preference persistence (localStorage) — explicitly rejected in brainstorming; default is always Handicap.
- Old-route redirect logic (301/302 from `/handicap-history` or `/stableford-history` to `/history`) — explicitly rejected in brainstorming; both routes 404.

## 9. Rollback

If the refactor ships and needs to be undone, a single revert of the two commits on `development` restores the old behavior cleanly, since the two existing component files are still untouched (just stripped of their headers).
