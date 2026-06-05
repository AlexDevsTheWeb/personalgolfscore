# All Rounds Page — Pagination + Search

Date: 2026-06-05

## Overview

Replace the hard-coded 5-round cap on `/all-rounds` with a paginated, searchable list of all the user's rounds. The dashboard's "last 5" preview is unchanged.

Today (`src/pages/AllRounds.page.tsx:11`) hands the full `roundsList` to `Rounds`, but `Rounds.component.tsx:128` does `rounds.slice(0, 5)` internally — so every round after the fifth is silently hidden. Fix that, add a 20-per-page paginator, and add two filter inputs (date picker + course text) above the list.

No Firestore schema changes, no new types on `IBasicRoundData`, no new dependencies (dayjs + `@mui/x-date-pickers` are already wired in `App.tsx`).

---

## 1. Data model

No changes. All filter inputs operate on fields already present on the round document:

- `roundDate: number` (ms timestamp, mapped by `getPlayerInfo` at `player.firestore.ts:33`)
- `roundCourse: string` (uppercased by the import path; raw from manual play)

`roundsList` in the Zustand store is already sorted `roundDate desc` by the Firestore `orderBy` query at `player.firestore.ts:25`, so the default order is preserved without any client-side sort.

---

## 2. Files

### Modified

#### `src/components/Rounds/Rounds.component.tsx`

Remove the defensive `rounds.slice(0, 5)` at line 128. The component becomes a pure list — it renders exactly the rounds it's given. Dashboard's behavior is unchanged because `Dashboard.component.tsx:35` already slices to 5 before passing.

```diff
- rounds.slice(0, 5).map((round, index) => (
+ rounds.map((round, index) => (
```

The `RoundsButtons` render at line 137 stays (the component is shared; harmless on the all-rounds page).

#### `src/pages/AllRounds.page.tsx`

Full rewrite. New responsibilities:

- Hold three pieces of state: `dateFilter: Dayjs | null`, `courseFilter: string`, `page: number` (1-indexed).
- Derive `filteredRounds`, `pagedRounds`, `pageCount` via `useMemo`.
- Reset `page` to 1 when the filtered list length or filter inputs change.
- Render the search bar, the (filtered, paged) `Rounds` list, and the MUI `Pagination` (hidden when `pageCount <= 1`).
- Render a "No rounds match your search" message when filters are active and `filteredRounds.length === 0`.

```tsx
import { Stack, Typography, TextField, Box, Pagination } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import Rounds from '@/components/Rounds/Rounds.component';
import { useAppStore } from '@/store/zustand';

const PAGE_SIZE = 20;

const AllRounds = () => {
  const roundsList = useAppStore((state) => state.roundsList);

  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const filteredRounds = useMemo(() => {
    const trimmedCourse = courseFilter.trim().toLowerCase();
    return roundsList.filter((round) => {
      if (dateFilter && !dayjs(round.roundDate).isSame(dateFilter, 'day')) {
        return false;
      }
      if (
        trimmedCourse &&
        !round.roundCourse.toLowerCase().includes(trimmedCourse)
      ) {
        return false;
      }
      return true;
    });
  }, [roundsList, dateFilter, courseFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredRounds.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [roundsList.length, dateFilter, courseFilter]);

  const pagedRounds = useMemo(
    () => filteredRounds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredRounds, page]
  );

  const hasActiveFilter = dateFilter !== null || courseFilter.trim() !== '';

  return (
    <Stack gap={2} sx={{ width: '100%' }}>
      <Typography variant="headline2">All rounds</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <DatePicker
          label="Date"
          value={dateFilter}
          onChange={(v) => setDateFilter(v)}
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
        />
        <TextField
          label="Course"
          size="small"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
      </Stack>

      {hasActiveFilter && filteredRounds.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No rounds match your search.
        </Typography>
      ) : (
        <Rounds rounds={pagedRounds} />
      )}

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Stack>
  );
};

export default AllRounds;
```

### Not modified

- `src/components/Rounds/Rounds.component.tsx` — other than the slice removal. No new props, no new exports.
- `src/utils/links/links.utils.tsx`, `src/components/layout/MainLayout2.component.tsx` — breadcrumb + sidebar entry already point at `/all-rounds` and work unchanged.
- `src/components/Rounds/RoundsTable.component.tsx` — unused component, left alone (out of scope).
- `package.json` — no new dependencies.

---

## 3. Behavior

### 3.1 Dashboard

Unchanged. `Dashboard.component.tsx:35` passes `roundsList.slice(0, 5)` to `Rounds`. The "last 5" preview stays.

### 3.2 /all-rounds — list order

Most-recent-first (already the case via `getPlayerInfo`'s `orderBy('roundDate', 'desc')`). No client-side sort logic.

### 3.3 /all-rounds — filters

- **Date**: optional. If set, the round's local day must match (`dayjs(roundDate).isSame(dateFilter, 'day')`).
- **Course**: optional. Case-insensitive substring match on `roundCourse` (after trimming the query). Empty / whitespace-only = no filter.
- **AND** combination: a round must pass both filters to appear.

### 3.4 /all-rounds — pagination

- `PAGE_SIZE = 20`.
- `pageCount = Math.max(1, Math.ceil(filteredRounds.length / 20))`.
- `pagedRounds = filteredRounds.slice((page - 1) * 20, page * 20)`.
- MUI `Pagination` numbered buttons, rounded, primary color, centered at the bottom of the list.
- Hidden when `pageCount <= 1`.
- Page resets to 1 when `roundsList.length` changes (delete/import) **or** when either filter changes.

### 3.5 /all-rounds — empty states

- `filteredRounds.length === 0` **with** an active filter: render "No rounds match your search." (`<Typography color="text.secondary">`).
- `filteredRounds.length === 0` **without** an active filter: render the existing `<Rounds>` empty state ("No rounds yet"), because `<Rounds>` is given an empty array and its built-in empty branch fires.

### 3.6 Reset / remount

Page and filter state live in the page component. Navigating away unmounts it; coming back reinitializes to `page=1`, `dateFilter=null`, `courseFilter=''`. Matches the user's "component state only" choice from brainstorming Q4.

---

## 4. Edge cases

| Case | Behavior |
| --- | --- |
| 0 rounds in store, no filter | Existing `<Rounds>` empty state ("No rounds yet") |
| 0 rounds in store, with filter | Same "No rounds yet" (filters are a no-op) |
| 1–20 filtered results | Pagination hidden (`pageCount === 1`) |
| 21+ filtered results | Pagination visible, defaults to page 1 |
| Filter returns 0 results | "No rounds match your search." (filter-active branch) |
| Change filter while on page 3 | `useEffect` resets to page 1 |
| Delete a round while filtered | `roundsList.length` change → page resets to 1 |
| Import rounds | Same reset |
| Course query is whitespace only | Trimmed → treated as no filter |
| Date picker cleared | `dateFilter = null` → no date filter |
| Mobile viewport | Search inputs stack vertically; MUI Pagination wraps |

---

## 5. Testing / verification

- `npm run type-check` — confirms `DatePicker` props, `Dayjs | null` state, MUI `Pagination` types.
- **Manual scenarios** (recommended before pushing the PR):
  1. Seed 25 rounds (or temporarily set `PAGE_SIZE = 3` locally), navigate to `/all-rounds` → page 1 of 2 with 20 rows; click "2" → next 5 rows.
  2. Type a partial course name → only matching rounds; clear → full list returns.
  3. Pick a date → only that day's rounds; clear date → full list returns.
  4. Combine both → AND logic confirmed.
  5. Type a course name that matches nothing → "No rounds match your search.", no pagination.
  6. Filter that returns 25+ → 2 pages, page count tracks filtered length.
  7. Change filter while on page 2 → resets to page 1.
  8. Delete a round while filtered → page resets, results re-filter.
  9. Mobile viewport: inputs stack, pagination wraps to multiple rows.

No automated test added — the only logic in the file is the `filteredRounds` filter and the page math, both short, both covered by the manual scenarios above. Existing `Rounds` component tests (if any) continue to apply.

---

## 6. Out of scope (YAGNI)

- Sort columns / sort options.
- Page-size selector (15 / 20 / 50).
- URL state for `page` or filters.
- Date range picker.
- Searching by other fields (par, score, stableford, HCP delta).
- Recently-searched history.
- Touching the dashboard "last 5" preview.
- Removing or using `RoundsTable.component.tsx`.

---

## 7. Constants

- `PAGE_SIZE = 20` — module-level `const` at the top of `AllRounds.page.tsx`. Single place to tweak.

---

## 8. Dependencies

- `@mui/x-date-pickers` — already in `package.json`; `DatePicker` imported from `@mui/x-date-pickers/DatePicker`.
- `dayjs` — already in `package.json`; `Dayjs` type imported from `dayjs`.
- `<LocalizationProvider dateAdapter={AdapterDayjs}>` is already mounted in `App.tsx:31`, so `DatePicker` works without any additional provider setup.
