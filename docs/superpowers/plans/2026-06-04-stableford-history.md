# Stableford History Page + Drawer Dashboard Icon — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a new `/stableford-history` page with a 3-line dual-axis trend chart and a 6-column last-20-rounds table, plus two small UI cleanups (drawer Dashboard entry visibility, dashboard `Points` → `Stableford Pts` column rename).

**Architecture:** Pure utility functions in `src/utils/stableford/stableford.utils.tsx` (covered by vitest) read directly from the existing `IBasicRoundData` shape; a single React component reads `roundsList` from the Zustand store and renders the table + `<LineChart>` (no new types on `IBasicRoundData`, no Firestore writes, no backfill). Routing, sidebar, and breadcrumb are wired through the existing patterns.

**Tech Stack:** React 19, MUI v7, `@mui/x-charts` 8.x, Zustand (existing), Vitest 4.x (existing), TypeScript 6.

**Working branch:** `feat/stableford-history` (already created off `origin/development`; the design spec is committed in `716a0b8`).

**Design spec:** `docs/superpowers/specs/2026-06-04-stableford-history-design.md` (must-read before implementing).

---

## File Map

**New files**
- `src/utils/stableford/stableford.utils.tsx` — pure helpers (`getStablefordPoints`, `getGrossScore`, `getNetScore`, `getGrossVsPar`, `getNetVsPar`)
- `src/utils/stableford/stableford.utils.test.ts` — vitest cases
- `src/components/StablefordHistory/StablefordHistory.component.tsx` — page content
- `src/pages/StablefordHistory.page.tsx` — page wrapper

**Modified files**
- `src/App.tsx` — register `/stableford-history` route
- `src/utils/links/links.utils.tsx` — add `Stableford History` sidebar entry, flip Dashboard `show` flag
- `src/components/layout/MainLayout2.component.tsx` — add breadcrumb branch for `/stableford-history`
- `src/components/Rounds/RoundsTable.component.tsx` — rename `Points` header to `Stableford Pts`

**Out of scope (do not touch)**
- `IBasicRoundData` type, Firestore schema, redux store, calculator utils, HCP history logic.

---

## Task 1: Pure stableford utils + vitest tests (TDD)

**Files:**
- Create: `src/utils/stableford/stableford.utils.test.ts`
- Create: `src/utils/stableford/stableford.utils.tsx`

- [ ] **Step 1: Create the test file**

Create `src/utils/stableford/stableford.utils.test.ts` with the following content:

```ts
import { describe, it, expect } from 'vitest';
import {
	getStablefordPoints,
	getGrossScore,
	getNetScore,
	getGrossVsPar,
	getNetVsPar,
} from './stableford.utils';
import type { IBasicRoundData } from '@/types/roundData.types';

describe('stableford.utils', () => {
	describe('getStablefordPoints', () => {
		it('returns totals.points.totals when present', () => {
			const round = { totals: { points: { totals: 36 } } } as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(36);
		});

		it('returns null when totals.points is missing', () => {
			const round = { totals: {} } as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(null);
		});

		it('returns null when totals itself is missing', () => {
			const round = {} as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(null);
		});
	});

	describe('getGrossScore', () => {
		it('returns totals.score.totals when present', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(80);
		});

		it('returns null when totals.score is missing', () => {
			const round = { totals: {} } as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(null);
		});

		it('returns null when totals itself is missing', () => {
			const round = {} as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(null);
		});
	});

	describe('getNetScore', () => {
		it('returns gross - playingHCP when both present (gross 80, hcp 10 -> 70)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(70);
		});

		it('returns null when roundPlayingHCP is missing', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = { roundPlayingHCP: '10' } as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(null);
		});
	});

	describe('getGrossVsPar', () => {
		it('returns gross - par when both present (gross 80, par 72 -> +8)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(8);
		});

		it('handles negative values (under par: gross 70, par 72 -> -2)', () => {
			const round = {
				totals: { score: { totals: 70 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(-2);
		});

		it('returns null when roundPar is missing', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = { roundPar: '72' } as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(null);
		});
	});

	describe('getNetVsPar', () => {
		it('returns net - par when all three present (gross 80, hcp 10, par 72 -> -2)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(-2);
		});

		it('returns null when roundPar is missing', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});

		it('returns null when roundPlayingHCP is missing', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = {
				roundPar: '72',
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});
	});
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `npx vitest run src/utils/stableford/stableford.utils.test.ts`
Expected: FAIL with "Cannot find module './stableford.utils'" or similar module-resolution error. The test file imports functions from a module that doesn't exist yet.

- [ ] **Step 3: Create the utils implementation**

Create `src/utils/stableford/stableford.utils.tsx` with the following content:

```ts
import type { IBasicRoundData } from '@/types/roundData.types';

export const getStablefordPoints = (round: IBasicRoundData): number | null => {
	return round.totals?.points?.totals ?? null;
};

export const getGrossScore = (round: IBasicRoundData): number | null => {
	return round.totals?.score?.totals ?? null;
};

export const getNetScore = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPlayingHCP == null) return null;
	return gross - Number(round.roundPlayingHCP);
};

export const getGrossVsPar = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPar == null) return null;
	return gross - Number(round.roundPar);
};

export const getNetVsPar = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPar == null || round.roundPlayingHCP == null) return null;
	return gross - Number(round.roundPar) - Number(round.roundPlayingHCP);
};
```

- [ ] **Step 4: Run the tests to confirm they pass**

Run: `npx vitest run src/utils/stableford/stableford.utils.test.ts`
Expected: PASS, 14/14 test cases green (3 + 3 + 3 + 4 + 4 — 1 from the negative + shared cases).

- [ ] **Step 5: Type-check the new files**

Run: `npm run type-check`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/utils/stableford/stableford.utils.tsx src/utils/stableford/stableford.utils.test.ts
git commit -m "feat(stableford): add pure utils for stableford/vs-par derivations"
```

---

## Task 2: StablefordHistory component + page + router + sidebar + breadcrumb (feat commit)

This is the big one. The single commit groups the page itself with all its wiring. The next task (Task 3) handles the two small UI cleanups.

**Files:**
- Create: `src/components/StablefordHistory/StablefordHistory.component.tsx`
- Create: `src/pages/StablefordHistory.page.tsx`
- Modify: `src/App.tsx` (add import + route line)
- Modify: `src/utils/links/links.utils.tsx` (add import + new sidebar entry)
- Modify: `src/components/layout/MainLayout2.component.tsx` (add breadcrumb branch)

- [ ] **Step 1: Create the page wrapper**

Create `src/pages/StablefordHistory.page.tsx`:

```tsx
import StablefordHistory from '@/components/StablefordHistory/StablefordHistory.component';

const StablefordHistoryPage = () => {
	return <StablefordHistory />;
};

export default StablefordHistoryPage;
```

- [ ] **Step 2: Create the StablefordHistory component**

Create `src/components/StablefordHistory/StablefordHistory.component.tsx`:

```tsx
import { useMemo } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Alert,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { useAppStore } from '@/store/zustand';
import {
	getStablefordPoints,
	getGrossScore,
	getNetVsPar,
	getGrossVsPar,
} from '@/utils/stableford/stableford.utils';
import dayjs from 'dayjs';

const formatSigned = (n: number | null): string => {
	if (n == null) return '\u2014';
	const fixed = n.toFixed(1);
	return n > 0 ? `+${fixed}` : fixed;
};

const StablefordHistory = () => {
	const roundsList = useAppStore((state) => state.roundsList);
	const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

	// Rounds with stableford, sorted by date descending (most recent first)
	const roundsWithStableford = useMemo(() => {
		return roundsList
			.filter((r) => getStablefordPoints(r) != null && r.roundDate)
			.sort((a, b) => b.roundDate - a.roundDate);
	}, [roundsList]);

	// Last 20 for the table (most recent first)
	const last20 = useMemo(() => {
		return roundsWithStableford.slice(0, 20);
	}, [roundsWithStableford]);

	// Chart data (chronological, oldest -> newest on the x axis)
	const chartData = useMemo(() => {
		return [...last20]
			.sort((a, b) => a.roundDate - b.roundDate)
			.map((round) => ({
				date: round.roundDate,
				stableford: getStablefordPoints(round),
				netVsPar: getNetVsPar(round),
				grossVsPar: getGrossVsPar(round),
			}));
	}, [last20]);

	if (isLoadingRounds) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
				<ScoreboardIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">Stableford History</Typography>
			</Box>

			{roundsWithStableford.length === 0 && (
				<Alert severity="info">
					No rounds with stableford points yet. Play some rounds first!
				</Alert>
			)}

			{roundsWithStableford.length > 0 && (
				<>
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Last 20 Rounds
							</Typography>
							<TableContainer>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Date</TableCell>
											<TableCell>Course</TableCell>
											<TableCell align="right">Stableford</TableCell>
											<TableCell align="right">Score</TableCell>
											<TableCell align="right">Net vs Par</TableCell>
											<TableCell align="right">Gross vs Par</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{last20.map((round) => {
											const stableford = getStablefordPoints(round);
											const score = getGrossScore(round);
											const netVsPar = getNetVsPar(round);
											const grossVsPar = getGrossVsPar(round);
											return (
												<TableRow key={round.id}>
													<TableCell>
														{dayjs(round.roundDate).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell>
														{round.roundCourse ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{stableford ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{score ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{formatSigned(netVsPar)}
													</TableCell>
													<TableCell align="right">
														{formatSigned(grossVsPar)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Trend
							</Typography>
							<Box sx={{ width: '100%', height: 300 }}>
								<LineChart
									dataset={chartData}
									xAxis={[
										{
											dataKey: 'date',
											scaleType: 'time',
											valueFormatter: (date: Date) =>
												dayjs(date).format('DD/MM/YY'),
										},
									]}
									yAxis={[
										{ id: 'left', label: 'Stableford Pts' },
										{ id: 'right', label: 'vs Par' },
									]}
									series={[
										{
											dataKey: 'stableford',
											label: 'Stableford Pts',
											yAxisId: 'left',
											color: '#2e7d32',
											showMark: true,
											connectNulls: false,
										},
										{
											dataKey: 'netVsPar',
											label: 'Net vs Par',
											yAxisId: 'right',
											color: '#1976d2',
											showMark: true,
											connectNulls: false,
										},
										{
											dataKey: 'grossVsPar',
											label: 'Gross vs Par',
											yAxisId: 'right',
											color: '#ed6c02',
											showMark: true,
											connectNulls: false,
										},
									]}
									height={300}
									margin={{ top: 10, right: 20, bottom: 30, left: 50 }}
								/>
							</Box>
						</CardContent>
					</Card>
				</>
			)}
		</Box>
	);
};

export default StablefordHistory;
```

- [ ] **Step 3: Add the route in `src/App.tsx`**

In `src/App.tsx`, add the import alphabetically and the route line. Specifically:

a. Add this import next to the other page imports (around line 23, just after `HandicapHistoryPage`):

```ts
import StablefordHistoryPage from './pages/StablefordHistory.page';
```

b. Add this route line inside the protected `<Route path="/">` block, next to the existing `/handicap-history` route (around line 53):

```tsx
<Route path="/stableford-history" element={<StablefordHistoryPage />} />
```

- [ ] **Step 4: Add the sidebar entry in `src/utils/links/links.utils.tsx`**

a. Add the icon import at the top of the file, with the other MUI icon imports (line 1-7 area):

```ts
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
```

b. Add a new entry to the `navbar_items` array (after the `Import Rounds` entry, around line 59):

```ts
{
	id: 8,
	name: 'Stableford History',
	link: '/stableford-history',
	icon: ScoreboardIcon,
	show: true,
},
```

- [ ] **Step 5: Add the breadcrumb branch in `src/components/layout/MainLayout2.component.tsx`**

In the `getBreadcrumbs()` function (lines 71-119 of the file), add a new `else if` branch for `/stableford-history`. Place it after the `/handicap-history` branch (around line 102):

```ts
} else if (path === '/stableford-history') {
	breadcrumbs.push({ label: 'Stableford History', path: '/stableford-history' });
```

- [ ] **Step 6: Type-check the full project**

Run: `npm run type-check`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/StablefordHistory/StablefordHistory.component.tsx \
        src/pages/StablefordHistory.page.tsx \
        src/App.tsx \
        src/utils/links/links.utils.tsx \
        src/components/layout/MainLayout2.component.tsx
git commit -m "feat(stableford): add /stableford-history page with 3-line dual-axis chart

- New StablefordHistory page: 6-column last-20 table (Date, Course,
  Stableford, Score, Net vs Par, Gross vs Par) + LineChart with 3
  series (Stableford Pts on left axis, Net/Gross vs Par on right)
- Pure derivations live in src/utils/stableford/stableford.utils.tsx
  so legacy rounds with missing fields render as -- and gap in chart
- New sidebar entry 'Stableford History' (ScoreboardIcon) + route +
  breadcrumb"
```

---

## Task 3: Drawer Dashboard icon + Dashboard Points column rename (chore commit)

**Files:**
- Modify: `src/utils/links/links.utils.tsx` (flip Dashboard `show` flag)
- Modify: `src/components/Rounds/RoundsTable.component.tsx` (rename header)

- [ ] **Step 1: Flip the Dashboard sidebar `show` flag**

In `src/utils/links/links.utils.tsx`, in the first entry of `navbar_items` (lines 11-17), change `show: false` to `show: true`:

```ts
{
	id: 1,
	name: "Dashboard",
	link: "/",
	icon: HomeWorkIcon,
	show: true,
},
```

- [ ] **Step 2: Rename the dashboard `Points` column header**

In `src/components/Rounds/RoundsTable.component.tsx`, line 32, change the column header string from `'Points'` to `'Stableford Pts'`:

```tsx
<TableCell align='center' space='10px'>Stableford Pts</TableCell>
```

(No other change in the file — the cell content at line 70 still binds to `round.totals?.points?.totals`, which is the stableford value.)

- [ ] **Step 3: Type-check the project**

Run: `npm run type-check`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/utils/links/links.utils.tsx src/components/Rounds/RoundsTable.component.tsx
git commit -m "chore(ui): expose Dashboard in the drawer and rename Points column to Stableford Pts

- links.utils.tsx: flip Dashboard show: false -> show: true so it
  appears in the navigation drawer (HomeWorkIcon was already wired)
- RoundsTable.component.tsx: rename 'Points' column to 'Stableford
  Pts' for clarity; data binding unchanged"
```

---

## Task 4: Final verification + push + draft PR

- [ ] **Step 1: Run the new vitest suite**

Run: `npx vitest run src/utils/stableford/stableford.utils.test.ts`
Expected: PASS, 14/14. (Pre-existing test failures in `src/App.test.tsx` and `src/utils/calculator/__tests__/calculations.test.ts` are not related and were present on `development` — see PR #125 description.)

- [ ] **Step 2: Type-check the full project**

Run: `npm run type-check`
Expected: exit 0.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: build succeeds, no errors. Warning-level notices are OK.

- [ ] **Step 4: Push the branch**

```bash
git push origin feat/stableford-history
```

- [ ] **Step 5: Open a draft PR to `development`**

Run:

```bash
gh pr create --draft \
  --base development \
  --head feat/stableford-history \
  --title "feat(stableford): new /stableford-history page + drawer/column cleanups" \
  --body "$(cat <<'EOF'
## What's in this PR

- **New `/stableford-history` page** — 6-column last-20-rounds table (Date, Course, Stableford, Score, Net vs Par, Gross vs Par) and a 3-line `<LineChart>` (Stableford Pts on the left axis, Net & Gross vs Par on the right) over the same 20 rounds.
- **Pure utils** in `src/utils/stableford/stableford.utils.tsx` covered by 14 vitest cases. No Firestore writes, no schema changes, no new types on `IBasicRoundData` — every value plotted is derived from fields already on each round doc.
- **Sidebar entry** for Stableford History with `ScoreboardIcon`.
- **Drawer fix** — `Dashboard` entry was hidden via `show: false`; now visible. `HomeWorkIcon` and the `/` route were already wired.
- **Dashboard rename** — Rounds table `Points` column → `Stableford Pts` for clarity (data binding unchanged).

## How to verify (manual UAT)

1. `npm start`, log in, go to `/dashboard` → confirm the "Dashboard" entry is visible in the drawer and that clicking it lands on `/dashboard` (or `/`).
2. From the drawer, click "Stableford History" → page loads with no console errors.
3. With 0 rounds: empty-state Alert.
4. With ≥ 1 round that has `totals.points.totals` populated: 6-column table renders, chart shows 3 series with the right y-axis labels.
5. With a round that has `totals.points` missing: that row's "Stableford" cell shows `—`; the chart skips that date for that series.
6. `/handicap-history` still loads correctly and is unchanged.
7. Breadcrumb on `/stableford-history` reads `Home / Stableford History`.
8. On the dashboard's Rounds table, the column header now reads "Stableford Pts".

## Tests

- New: `npx vitest run src/utils/stableford/stableford.utils.test.ts` — 14/14 pass.
- Pre-existing vitest failures on `development` (`App.test.tsx`, `calculations.test.ts`) are not caused by this branch.

## Out of scope

- Stableford per-hole breakdown, `stablefordIndex` persistence, refactoring `RoundsTable.component.tsx`'s `netScore`/`grossScore` variable names.
EOF
)"
```

- [ ] **Step 6: Post the PR URL in the chat so the user can review**

---

## Self-Review (executed at plan-write time)

- **Spec coverage:**
  - Section 1 (drawer fix) → covered by Task 3 Step 1.
  - Section 2 (new page) → covered by Task 2 Steps 1-2 (page + component) + Task 2 Step 3 (router) + Task 2 Step 4 (sidebar) + Task 2 Step 5 (breadcrumb).
  - Section 2 (utils) → covered by Task 1.
  - Section 2 (dashboard rename) → covered by Task 3 Step 2.
  - Section 2 (UAT checklist) → mirrored in the PR body (Task 4 Step 5).
  - Section 2 (testing) → covered by Task 1 vitest cases.
- **Placeholder scan:** No TBDs, no "implement later", no "add appropriate validation". Every step has actual code or an exact command.
- **Type consistency:** Helper names (`getStablefordPoints`, `getGrossScore`, `getNetScore`, `getGrossVsPar`, `getNetVsPar`) match between Task 1 and Task 2. The component's import block, table columns, and chart series use the same field names (`stableford`, `netVsPar`, `grossVsPar`, `date`) end-to-end. The `formatSigned` helper in the component is local to the file and not exported — no risk of name drift.
