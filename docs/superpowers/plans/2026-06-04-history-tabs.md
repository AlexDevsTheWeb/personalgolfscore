# History Tabs Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the two history routes (`/handicap-history` and `/stableford-history`) into a single tabbed page at `/history` that reads `?tab=stableford` from the URL.

**Architecture:** Thin new `History` component renders `MuiTabs` and conditionally mounts one of the two existing components (`HandicapHistory` or `StablefordHistory`). The two existing components stay in place; they lose their individual page headers (3-7 lines removed from each). Old routes are deleted, no redirect.

**Tech Stack:** React 19, MUI v7, `@mui/x-charts` 8.x, react-router-dom v7, Zustand (existing), TypeScript 6.

**Working branch:** `feat/history-tabs` (already created off `origin/development`; the design spec is committed in `d4ae2b6`).

**Design spec:** `docs/superpowers/specs/2026-06-04-history-tabs-design.md` (must-read before implementing).

---

## File Map

**New files**
- `src/components/History/History.component.tsx` — tabbed shell (page header + Tabs + conditional render of one of the two existing components)
- `src/pages/History.page.tsx` — thin wrapper

**Modified files**
- `src/components/HandicapHistory/HandicapHistory.component.tsx` — remove header block (lines 101-105) and `TimelineIcon` import (line 17)
- `src/components/StablefordHistory/StablefordHistory.component.tsx` — remove header block (lines 70-74) and `ScoreboardIcon` import (line 16)
- `src/App.tsx` — swap routes
- `src/utils/links/links.utils.tsx` — remove `ScoreboardIcon` import, drop the Stableford History entry, rename "Handicap History" → "History" and `link: '/handicap-history'` → `link: '/history'`
- `src/components/layout/MainLayout2.component.tsx` — replace the two `/handicap-history` and `/stableford-history` breadcrumb branches with a single `/history` branch

**Deleted files**
- `src/pages/HandicapHistory.page.tsx` — orphaned after the route change
- `src/pages/StablefordHistory.page.tsx` — orphaned after the route change

**Untouched (verify with grep before deleting page files)**
- `src/utils/stableford/stableford.utils.tsx` and its test
- `src/utils/firestore/backfillHcpHistory.utils.ts` and its test
- `src/components/Rounds/RoundsTable.component.tsx`
- Anything else in `src/`

---

## Task 1: Refactor — new History page + remove old routes / pages / component headers (one commit)

This is the big commit. It groups the new tabbed page, the route swap, the component header removals, and the page file deletions into one atomic change so the codebase is never in a half-migrated state.

**Files:**
- Create: `src/components/History/History.component.tsx`
- Create: `src/pages/History.page.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/HandicapHistory/HandicapHistory.component.tsx`
- Modify: `src/components/StablefordHistory/StablefordHistory.component.tsx`
- Delete: `src/pages/HandicapHistory.page.tsx`
- Delete: `src/pages/StablefordHistory.page.tsx`

- [ ] **Step 1: Create the `History` tabbed component**

Create `src/components/History/History.component.tsx` with the following content:

```tsx
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import HandicapHistory from '@/components/HandicapHistory/HandicapHistory.component';
import StablefordHistory from '@/components/StablefordHistory/StablefordHistory.component';

type HistoryTab = 'handicap' | 'stableford';

const History = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const rawTab = searchParams.get('tab');
	const tab: HistoryTab = rawTab === 'stableford' ? 'stableford' : 'handicap';

	const handleChange = (_: unknown, value: HistoryTab) => {
		navigate(value === 'stableford' ? '/history?tab=stableford' : '/history');
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
				<TimelineIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">History</Typography>
			</Box>
			<Tabs value={tab} onChange={handleChange} sx={{ mb: 2 }}>
				<Tab value="handicap" label="Handicap" />
				<Tab value="stableford" label="Stableford" />
			</Tabs>
			{tab === 'stableford' ? <StablefordHistory /> : <HandicapHistory />}
		</Box>
	);
};

export default History;
```

- [ ] **Step 2: Create the page wrapper**

Create `src/pages/History.page.tsx` with the following content:

```tsx
import History from '@/components/History/History.component';

const HistoryPage = () => {
	return <History />;
};

export default HistoryPage;
```

- [ ] **Step 3: Update `src/App.tsx` — swap the imports and routes**

Open `src/App.tsx`. The current imports around the two history pages are:

```ts
import HandicapHistoryPage from './pages/HandicapHistory.page';
import ImportRoundsPage from './pages/ImportRounds.page';
import StablefordHistoryPage from './pages/StablefordHistory.page';
```

Replace those three lines with:

```ts
import HistoryPage from './pages/History.page';
import ImportRoundsPage from './pages/ImportRounds.page';
```

Then update the two route lines inside the protected `<Route path="/">` block. The current lines (single-quoted) are:

```tsx
<Route path='/handicap-history' element={<HandicapHistoryPage />} />
<Route path='/stableford-history' element={<StablefordHistoryPage />} />
```

Replace those two lines with one line:

```tsx
<Route path='/history' element={<HistoryPage />} />
```

- [ ] **Step 4: Remove the page header from `HandicapHistory.component.tsx`**

Open `src/components/HandicapHistory/HandicapHistory.component.tsx`. Delete the `import TimelineIcon from '@mui/icons-material/Timeline';` line (currently line 17). Then in the returned JSX (currently around line 101), delete this 5-line block:

```tsx
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
				<TimelineIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">Handicap History</Typography>
			</Box>
```

The file should still type-check and the rest of the component (filter, sort, last 20, highlighted SDs, chart) is untouched.

- [ ] **Step 5: Remove the page header from `StablefordHistory.component.tsx`**

Open `src/components/StablefordHistory/StablefordHistory.component.tsx`. Delete the `import ScoreboardIcon from '@mui/icons-material/Scoreboard';` line (currently line 16). Then in the returned JSX (currently around line 70), delete this 5-line block:

```tsx
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
				<ScoreboardIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">Stableford History</Typography>
			</Box>
```

- [ ] **Step 6: Verify no remaining references to the old page imports or paths**

Run: `grep -rn "HandicapHistoryPage\|StablefordHistoryPage\|/handicap-history\|/stableford-history" src/`
Expected: no matches. (The plan description above is in `docs/`, which is not in `src/`, so the grep should be clean.)

If matches appear, they must be removed before continuing. Common places to check if something slipped through: a stray import in a barrel file, a leftover route in `App.tsx`, a leftover breadcrumb branch.

- [ ] **Step 7: Delete the two orphaned page files**

```bash
git rm src/pages/HandicapHistory.page.tsx src/pages/StablefordHistory.page.tsx
```

- [ ] **Step 8: Type-check the full project**

Run: `npm run type-check`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 9: Run the existing vitest suites to confirm no regressions**

Run: `npx vitest run src/utils/stableford/stableford.utils.test.ts src/utils/firestore/backfillHcpHistory.utils.test.ts`
Expected: both files pass (17/17 + 6/6). Pre-existing failures in `App.test.tsx` and `calculations.test.ts` are unrelated and were present on `development` — see PR #125/#128.

- [ ] **Step 10: Commit**

```bash
git add src/components/History/History.component.tsx \
        src/pages/History.page.tsx \
        src/App.tsx \
        src/components/HandicapHistory/HandicapHistory.component.tsx \
        src/components/StablefordHistory/StablefordHistory.component.tsx
git rm src/pages/HandicapHistory.page.tsx src/pages/StablefordHistory.page.tsx
git commit -m "refactor(history): consolidate handicap + stableford history into /history tabs

- New /history route with MuiTabs shell (Handicap / Stableford)
- ?tab=stableford query param selects the Stableford tab; default is
  Handicap; invalid values fall back to Handicap
- New History.component.tsx is a thin shell that conditionally mounts
  one of the two existing components (no rewrite)
- HandicapHistory and StablefordHistory components drop their individual
  page headers and unused icon imports
- Old /handicap-history and /stableford-history routes deleted (no
  redirect) along with their orphaned page wrappers
- No data flow, utils, types, or Firestore changes"
```

---

## Task 2: Drawer + breadcrumb rename (chore commit)

**Files:**
- Modify: `src/utils/links/links.utils.tsx`
- Modify: `src/components/layout/MainLayout2.component.tsx`

- [ ] **Step 1: Update the sidebar entry in `src/utils/links/links.utils.tsx`**

a. Remove the `import ScoreboardIcon from '@mui/icons-material/Scoreboard';` line at the top of the file (it was added in PR #128 and is no longer referenced).

b. Delete the Stableford History entry at the bottom of the `navbar_items` array:

```ts
  {
    id: 8,
    name: 'Stableford History',
    link: '/stableford-history',
    icon: ScoreboardIcon,
    show: true,
  },
```

c. Rename the existing Handicap History entry from:

```ts
  {
    id: 6,
    name: 'Handicap History',
    link: '/handicap-history',
    icon: TimelineIcon,
    show: true,
  },
```

to:

```ts
  {
    id: 6,
    name: 'History',
    link: '/history',
    icon: TimelineIcon,
    show: true,
  },
```

(The `id: 6` stays — internal key, not display order.)

- [ ] **Step 2: Update the breadcrumb branch in `src/components/layout/MainLayout2.component.tsx`**

In the `getBreadcrumbs()` function, replace these two `else if` branches:

```ts
    } else if (path === '/handicap-history') {
      breadcrumbs.push({ label: 'Handicap History', path: '/handicap-history' });
    } else if (path === '/stableford-history') {
      breadcrumbs.push({ label: 'Stableford History', path: '/stableford-history' });
```

with this single branch:

```ts
    } else if (path === '/history') {
      breadcrumbs.push({ label: 'History', path: '/history' });
```

The rest of the switch is unchanged. Breadcrumb on `/history` now reads `Home / History` regardless of which tab is active (the tab lives in the URL `?tab=`, not the breadcrumb).

- [ ] **Step 3: Type-check the project**

Run: `npm run type-check`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/utils/links/links.utils.tsx src/components/layout/MainLayout2.component.tsx
git commit -m "chore(ui): rename Handicap History drawer entry to History

- links.utils.tsx: drop ScoreboardIcon import and the Stableford
  History entry; rename Handicap History -> History and its link
  /handicap-history -> /history; TimelineIcon kept
- MainLayout2.component.tsx: replace the two /handicap-history and
  /stableford-history breadcrumb branches with a single /history branch"
```

---

## Task 3: Final verification + push + draft PR

- [ ] **Step 1: Re-run the vitest suites**

Run: `npx vitest run src/utils/stableford/stableford.utils.test.ts src/utils/firestore/backfillHcpHistory.utils.test.ts`
Expected: 17/17 + 6/6 pass.

- [ ] **Step 2: Type-check the full project**

Run: `npm run type-check`
Expected: exit 0.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: build succeeds (the pre-existing chunk-size warning is OK).

- [ ] **Step 4: Push the branch**

```bash
git push origin feat/history-tabs
```

- [ ] **Step 5: Open a draft PR to `development`**

Run:

```bash
gh pr create --draft \
  --base development \
  --head feat/history-tabs \
  --title "refactor(history): consolidate handicap + stableford into /history tabs" \
  --body "$(cat <<'EOF'
## What'\''s in this PR

- **New `/history` route** with MUI Tabs (Handicap / Stableford). `?tab=stableford` selects the Stableford tab; default is Handicap; invalid values fall back to Handicap. State survives refresh.
- **Thin `History` shell** reads the query param and conditionally mounts one of the two existing components. No rewrite of `HandicapHistory` or `StablefordHistory` — both keep their data logic, charts, tables.
- The two existing components lose their individual page headers and unused icon imports (3-7 line edits).
- **Old `/handicap-history` and `/stableford-history` routes deleted** (no redirect, per spec). Their orphaned `*.page.tsx` files are removed.
- **Drawer:** Stableford History entry removed; "Handicap History" renamed to "History" with `link: /history`. `TimelineIcon` kept.
- **Breadcrumb:** `Home / History` (tab is not in the breadcrumb — it lives in the URL `?tab=`).

## How to verify (manual UAT)

1. `npm start`, log in, open the drawer → confirm one "History" entry pointing to `/history`.
2. Open `/history` → Handicap tab content renders, no console errors, breadcrumb reads `Home / History`.
3. Click the "Stableford" tab → URL becomes `/history?tab=stableford`, Stableford table + 3-line chart render.
4. Refresh at `/history?tab=stableford` → Stableford tab stays selected.
5. Open `/history?tab=garbage` → falls back to Handicap.
6. Old `/handicap-history` and `/stableford-history` return the catch-all Error page.
7. `/handicap-history` link no longer appears in the drawer (only History).

## Tests

- `npx vitest run src/utils/stableford/stableford.utils.test.ts src/utils/firestore/backfillHcpHistory.utils.test.ts` — 17/17 + 6/6 pass.
- Pre-existing vitest failures on `development` (`App.test.tsx`, `calculations.test.ts`) are unrelated and were present before this branch.

## Out of scope

- The internal structure of the two existing history components (charts, tables, highlights, calculations) — unchanged.
- Per-user tab preference persistence (localStorage) — explicitly rejected in brainstorming.
- Old-route redirect logic — explicitly rejected in brainstorming.

## Commits in this PR

- `docs(spec): add /history tabbed consolidation design`
- `refactor(history): consolidate handicap + stableford history into /history tabs`
- `chore(ui): rename Handicap History drawer entry to History`
EOF
)"
```

- [ ] **Step 6: Post the PR URL in the chat so the user can review**

---

## Self-Review (executed at plan-write time)

- **Spec coverage:**
  - Section 1 (URL & tab handling) → Task 1 Step 1 (query param parsing + invalid fallback).
  - Section 2 (new files) → Task 1 Steps 1-2 (`History.component.tsx`, `History.page.tsx`).
  - Section 3 (modified files) → Task 1 Steps 3-5 (App.tsx, both component headers) + Task 2 Steps 1-2 (sidebar, breadcrumb).
  - Section 4 (deleted files) → Task 1 Steps 6-7 (grep + git rm).
  - Section 5 (data flow) → no task needed; "unchanged" is informational.
  - Section 6 (testing) → Task 3 Steps 1-3 (re-run vitest, type-check, build).
  - Section 7 (branch & PR) → Task 3 Steps 4-6 (push + gh pr create + post URL).
- **Placeholder scan:** No TBDs, no "implement later", no "add appropriate validation". Every step has actual code or an exact command.
- **Type consistency:** The `HistoryTab` type is defined once in `History.component.tsx` (Task 1 Step 1) and only used there. The `History` component imports `HandicapHistory` and `StablefordHistory` by their default-exported names (consistent with how the existing `App.tsx` and `MainLayout2.component.tsx` already import them). The breadcrumb branch in Task 2 Step 2 uses the literal `'/history'` path, matching the route in `App.tsx` (Task 1 Step 3) and the `link:` in `links.utils.tsx` (Task 2 Step 1).
