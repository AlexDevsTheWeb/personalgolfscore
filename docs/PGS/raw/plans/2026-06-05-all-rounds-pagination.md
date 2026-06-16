# All Rounds Page — Pagination + Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hard-coded 5-round cap on `/all-rounds` with a paginated (20/page) list of all rounds plus a two-input search bar (date picker + course text), filters combined with AND.

**Architecture:** Pure presentation change. `Rounds` becomes a pure list component (renders whatever it's given). All filtering, pagination, and filter state lives in `AllRounds.page.tsx`. Page + filter state is local `useState`; page resets on list/filter change. No Firestore writes, no new types, no new dependencies.

**Tech Stack:** React 19, MUI v7 (`TextField`, `Stack`, `Box`, `Pagination`), `@mui/x-date-pickers` `DatePicker`, dayjs, TypeScript 6, Vitest.

**Spec:** `docs/superpowers/specs/2026-06-05-all-rounds-pagination-design.md`

**Branch:** Work continues on the current branch (`fix/dashboard-stableford-display`); the spec commit already lives there. If a clean feature branch is preferred, cherry-pick the spec commit (`100cd93`) onto a new `feat/all-rounds-pagination` branch from `development` before starting.

---

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `src/components/Rounds/Rounds.component.tsx` | Modify (1 line) | Drop defensive `slice(0, 5)`; become a pure list renderer. |
| `src/pages/AllRounds.page.tsx` | Modify (full rewrite) | Page state, filter logic, pagination, search bar UI, empty states. |

No new files. No type additions. No dependency changes.

---

## Task 1: Remove defensive slice from `Rounds.component.tsx`

**Files:**
- Modify: `src/components/Rounds/Rounds.component.tsx:128`

- [ ] **Step 1: Edit the file**

Open `src/components/Rounds/Rounds.component.tsx` and find the `Rounds` function body (around line 114). The current line at 128:

```tsx
rounds.slice(0, 5).map((round, index) => (
```

Replace with:

```tsx
rounds.map((round, index) => (
```

The `Rounds` function now renders exactly the rounds it's given. `Dashboard.component.tsx:35` already calls `roundsList.slice(0, 5)` before passing to `Rounds`, so the dashboard's "last 5" preview is unaffected. The `RoundsButtons` render at line 137 stays.

- [ ] **Step 2: Type-check**

Run:

```bash
npm run type-check
```

Expected: clean exit, no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/Rounds/Rounds.component.tsx
git commit -m "refactor(rounds): drop defensive slice(0, 5) from Rounds component

Rounds is now a pure list renderer: it renders exactly the rounds
passed in. Dashboard still pre-slices to 5 before passing, so its
'last 5' preview is unchanged. This unblocks pagination on the
all-rounds page.

Part of the /all-rounds pagination + search feature.
Refs: docs/superpowers/specs/2026-06-05-all-rounds-pagination-design.md"
```

---

## Task 2: Rewrite `AllRounds.page.tsx` with state, memos, search bar, and pagination

**Files:**
- Modify: `src/pages/AllRounds.page.tsx` (full rewrite — replace the file contents)

- [ ] **Step 1: Replace the file contents**

Open `src/pages/AllRounds.page.tsx` and replace the entire file with the following. The current file is 16 lines; the new one is ~85 lines. Keep imports, exports, and default export style consistent with the rest of the codebase (`export default AllRounds;` at the bottom).

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

Notes:
- `PAGE_SIZE` is a module-level const; change here to tweak page size.
- `dayjs.isSame(other, 'day')` does the date comparison in the user's local timezone (matches the rest of the app's dayjs usage).
- `courseFilter` is trimmed and lowercased once per memo run, then substring-matched against `roundCourse` (case-insensitive).
- The `useEffect` resets `page` to 1 whenever the filtered list length could change (list mutation OR filter change). This avoids landing on a now-empty page after a delete or filter change.
- `Rounds` is given `pagedRounds`, not `roundsList`. The existing `Rounds` empty-state message ("No rounds yet") shows when there are zero rounds in the store AND no filter is active. The new "No rounds match your search." message handles the active-filter + 0-results case.
- `Pagination` is hidden when `pageCount <= 1` to avoid the "Page 1 of 1" noise.

- [ ] **Step 2: Type-check**

Run:

```bash
npm run type-check
```

Expected: clean exit, no output. The `DatePicker` `onChange` signature is `Dayjs | null` (or `value` if `disableFuture` etc. is set, which we don't set), so `setDateFilter` accepts it directly. `Pagination`'s `onChange` receives `(_, value: number)`, so `setPage(value)` is type-correct.

If you see a TypeScript error about `DatePicker`'s `onChange` value, it's because the MUI v7 typing of `onChange` can be `(value: Dayjs | null, context) => void` or `(value: Dayjs | null | undefined, context) => void` depending on the package version. If it errors, replace the `onChange` body with:

```tsx
onChange={(v) => setDateFilter(v ?? null)}
```

That `?? null` is a no-op for the common case but covers the `undefined` path.

- [ ] **Step 3: Build sanity check**

Run:

```bash
npm run build
```

Expected: clean exit. Catches any production-build-only TypeScript or import errors that `tsc --noEmit` might miss.

- [ ] **Step 4: Commit**

```bash
git add src/pages/AllRounds.page.tsx
git commit -m "feat(all-rounds): add 20/page pagination and date+course search

- Replace hard-coded 5-round display with 20-per-page MUI Pagination
- Add two filter inputs above the list: DatePicker (exact day match
  via dayjs.isSame(..., 'day')) and course TextField (case-insensitive
  substring match)
- Filters combine with AND; pagination operates on the filtered list
- Page state and filter state are local useState; page resets to 1
  on list mutation (delete/import) or filter change
- 'No rounds match your search.' empty state when filters are active
  and yield 0 results
- Pagination hidden when pageCount <= 1
- Depends on the Rounds component no longer slicing internally
  (refactor in the previous commit)

Refs: docs/superpowers/specs/2026-06-05-all-rounds-pagination-design.md"
```

---

## Task 3: Manual verification

**Files:** None. This task is end-to-end manual testing.

- [ ] **Step 1: Start the dev server**

```bash
npm start
```

Expected: Vite reports a local URL (typically `http://localhost:5173` or `http://localhost:3000` depending on `vite.config.ts`). The page compiles without errors.

If the dev server reports a date-picker related runtime warning, it is informational only; the picker still works.

- [ ] **Step 2: Verify the dashboard is unchanged**

Navigate to `/`. Confirm: the "last 5" rounds are shown exactly as before — date, course, score chip, stableford chip. The list still has at most 5 cards even if you have more rounds in Firestore.

- [ ] **Step 3: Verify pagination math**

Navigate to `/all-rounds`. With more than 20 rounds in the store:
- Page 1 shows 20 rows.
- The `Pagination` component renders with at least "2" button.
- Clicking "2" navigates to the next batch (could be fewer than 20 if total isn't a multiple of 20).
- Default sort: most recent first (newest `roundDate` on top).

If the dev account has fewer than 21 rounds, temporarily lower `PAGE_SIZE` to 3 at the top of `AllRounds.page.tsx`, restart the dev server, and re-verify. Restore `PAGE_SIZE = 20` before committing any verification artifact.

- [ ] **Step 4: Verify date filter**

In the date picker, pick a day that has at least one round. Confirm: only rounds from that day appear. Clear the date (click the X in the picker). Confirm: full list returns, page resets to 1.

- [ ] **Step 5: Verify course filter**

In the course text field, type a partial course name (case-insensitive). Confirm: only rounds whose `roundCourse` contains the substring remain. Clear the field. Confirm: full list returns, page resets to 1.

- [ ] **Step 6: Verify AND combination**

Pick a date AND type a course name that should match rounds on that day. Confirm: the intersection is shown. If you pick a date with no matching course, the "No rounds match your search." message appears. Clear the date or course — list returns.

- [ ] **Step 7: Verify page-reset on filter change**

On a list with 21+ rounds, navigate to page 2. Type a course name in the filter. Confirm: the page jumps back to 1. Clear the course. Confirm: you're still on page 1 of the unfiltered list.

- [ ] **Step 8: Verify mobile layout**

In DevTools, toggle device emulation to a narrow viewport (e.g. iPhone SE, 375px wide). Confirm: the date picker and course field stack vertically (column direction at `xs`). The `Pagination` component wraps to multiple rows automatically. Cards are still full-width and clickable.

- [ ] **Step 9: No leftover changes**

Run:

```bash
git status
git diff
```

Expected: working tree clean (or only the temporarily-edited `PAGE_SIZE` restored to 20). No stray files.

---

## Self-Review

**1. Spec coverage:**

| Spec section | Task |
| --- | --- |
| Section 1 (data model, no changes) | n/a — confirmed by absence of changes |
| Section 2 (Rounds.component.tsx slice removal) | Task 1 |
| Section 2 (AllRounds.page.tsx rewrite) | Task 2 |
| Section 3.1 (Dashboard unchanged) | Task 3 step 2 |
| Section 3.2 (list order) | Task 2 (default sort preserved by `getPlayerInfo` orderBy) |
| Section 3.3 (filters + AND) | Task 2 (filter memo) + Task 3 steps 4–6 |
| Section 3.4 (pagination math + reset) | Task 2 (memos + useEffect) + Task 3 steps 3, 7 |
| Section 3.5 (empty states) | Task 2 (JSX branches) + Task 3 step 6 |
| Section 3.6 (reset on remount) | Task 2 (no global state) + Task 3 (implied by component re-mount) |
| Section 4 (edge cases) | Task 3 covers them all |
| Section 5 (testing) | Task 1 step 2, Task 2 steps 2–3, Task 3 |

**2. Placeholder scan:** No "TBD", "TODO", "implement later", or "similar to Task N" placeholders. Every code step has the full file contents or the exact diff. Every command has the expected output.

**3. Type consistency:** `dateFilter` is `Dayjs | null` in both state declaration and `DatePicker` `value` prop. `setDateFilter` accepts the same. `page` is `number` everywhere. `pagedRounds`, `filteredRounds`, `roundsList` all flow through `IBasicRoundData[]` (from the store). `Pagination`'s `onChange` is `(_, value: number) => void` — matches `setPage`.

**4. Ambiguity check:** No ambiguous requirements. The "date picker exact day match" is implemented with `dayjs.isSame(other, 'day')` which is a clear, idiomatic choice. The "case-insensitive substring" is implemented with `.toLowerCase().includes(trimmed.toLowerCase())`. The "page resets" trigger is a single `useEffect` keyed on the three values that could invalidate the current page.
