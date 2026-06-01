# Handicap History Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the 3-round minimum from HI calculation, add a Handicap History page with a last-20-rounds table (best 8 highlighted), and an HCP progression line chart.

**Architecture:** Modify the WHS calculation engine to support 1-2 round HI. Add a new page/component for the history view. All read from existing `roundsList` in Zustand store — no new state or Firestore changes.

**Tech Stack:** React 19, MUI v7, @mui/x-charts, Recharts (or MUI x-charts LineChart), TypeScript 6

---

### Task 1: Update HI Scaling to Support 1-2 Rounds

**Files:**
- Modify: `src/utils/whs/hi.utils.tsx`

**Details:** Remove the 3-round minimum gate and extend `HI_SCALING` to cover 1-2 rounds per WHS extended rules (1 round → that SD is HI, 2 rounds → average both).

- [ ] **Step 1: Modify HI_SCALING and remove the gate**

In `src/utils/whs/hi.utils.tsx`:

```typescript
const HI_SCALING: Record<number, number> = {
	1: 1, 2: 1,
	3: 1, 4: 1, 5: 1,
	6: 2, 7: 2, 8: 2,
	9: 3, 10: 3, 11: 3,
	12: 4, 13: 4, 14: 4,
	15: 5, 16: 5,
	17: 6, 18: 6,
	19: 7,
	20: 8,
};
```

And remove lines 61-63 (`if (count < 3) { return null; }`).

- [ ] **Step 2: Run existing tests to confirm only <3 tests fail**

Run: `npm run test:calc:whs`
Expected: Only the "2 rounds", "1 round", "Empty array", and "Only 1 current SD" tests fail (expecting null, now getting values).

---

### Task 2: Update Test Data for New 1-2 Round Behavior

**Files:**
- Modify: `src/dev-tools/whsTestData.ts`

- [ ] **Step 1: Update the Handicap Index test cases**

Change:
```typescript
// "2 rounds - returns null (< 3 rounds)" → "2 rounds - average of both"
{
    name: '2 rounds - average of both',
    scoreDifferentials: [14.6, 10.2],
    expectedHI: 12.4, // (14.6 + 10.2) / 2 = 12.4
},
// "1 round - returns null (< 3 rounds)" → "1 round - that SD is HI"
{
    name: '1 round - that SD is HI',
    scoreDifferentials: [14.6],
    expectedHI: 14.6,
},
// "Empty array - returns null (< 3 rounds)" — keep as null (no data)
{
    name: 'Empty array - returns null',
    scoreDifferentials: [],
    expectedHI: null,
},
```

- [ ] **Step 2: Update the Projected HI test case**

Change:
```typescript
{
    name: 'Only 1 current SD — virtual has 2 entries, average of both',
    currentSDs: [14.6],
    simulatedSD: 4.6,
    // Virtual: [4.6, 14.6] → 2 entries → average = 9.6
    expectedHI: 9.6,
},
```

- [ ] **Step 3: Run tests to confirm all pass**

Run: `npm run test:calc:whs`
Expected: All 21 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/utils/whs/hi.utils.tsx src/dev-tools/whsTestData.ts
git commit -m "feat: remove 3-round minimum from HI calculation, support 1-2 rounds"
```

---

### Task 3: Update Simulator Component for No Minimum

**Files:**
- Modify: `src/components/Simulator/Simulator.component.tsx`

- [ ] **Step 1: Update `getScalingCount` to handle 1-2 rounds**

Change the function:
```typescript
const getScalingCount = (count: number): number => {
	if (count <= 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 1;
	if (count <= 8) return 2;
	if (count <= 11) return 3;
	if (count <= 14) return 4;
	if (count <= 16) return 5;
	if (count <= 18) return 6;
	if (count === 19) return 7;
	return 8;
};
```

- [ ] **Step 2: Remove the `<3 rounds` alert and update UI fallback**

Remove lines 231 (`hasFewRounds`) and lines 277-282 (the `<Alert>` for few rounds).

Update line 412: change `'\u2014 (need at least 3 rounds)'` to `'\u2014'` (em dash when HI is null, which only happens with 0 rounds).

- [ ] **Step 3: Update best8 SDs to work without minimum**

In `best8CurrentSDs` (line 170-179), change:
```typescript
if (sds.length < 3) return [];
// → to
if (sds.length === 0) return [];
```

In `best8ProjectedSDs` (line 182-193), change:
```typescript
if (count < 3) return [];
// → to
if (count === 0) return [];
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Simulator/Simulator.component.tsx
git commit -m "feat: update simulator UI to support 1-2 round HI calculation"
```

---

### Task 4: Create Handicap History Page Component

**Files:**
- Create: `src/pages/HandicapHistory.page.tsx`
- Create: `src/components/HandicapHistory/HandicapHistory.component.tsx`

- [ ] **Step 1: Create the page component**

`src/pages/HandicapHistory.page.tsx`:
```typescript
import HandicapHistory from '@/components/HandicapHistory/HandicapHistory.component';

const HandicapHistoryPage = () => {
	return <HandicapHistory />;
};

export default HandicapHistoryPage;
```

- [ ] **Step 2: Create the main component — imports and setup**

`src/components/HandicapHistory/HandicapHistory.component.tsx`:

```typescript
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
	Tooltip,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useAppStore } from '@/store/zustand';
import { calculateHandicapIndex } from '@/utils/whs/hi.utils';
import dayjs from 'dayjs';
```

- [ ] **Step 3: Add the scaling count helper**

```typescript
const getScalingCount = (count: number): number => {
	if (count <= 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 1;
	if (count <= 8) return 2;
	if (count <= 11) return 3;
	if (count <= 14) return 4;
	if (count <= 16) return 5;
	if (count <= 18) return 6;
	if (count === 19) return 7;
	return 8;
};
```

- [ ] **Step 4: Add component with data derivation**

```typescript
const HandicapHistory = () => {
	const roundsList = useAppStore((state) => state.roundsList);
	const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

	// Rounds with SD, sorted by date descending (most recent first)
	const roundsWithSD = useMemo(() => {
		return roundsList
			.filter((r) => r.scoreDifferential != null && r.roundDate)
			.sort((a, b) => b.roundDate - a.roundDate);
	}, [roundsList]);

	// Last 20 for the table
	const last20 = useMemo(() => {
		return roundsWithSD.slice(0, 20);
	}, [roundsWithSD]);

	// SDs from last 20
	const last20SDs = useMemo(() => {
		return last20.map((r) => r.scoreDifferential as number);
	}, [last20]);

	// Current HI
	const currentHI = useMemo(() => {
		return calculateHandicapIndex(roundsWithSD.map((r) => r.scoreDifferential as number));
	}, [roundsWithSD]);

	// Which SD indices (in last20) are among the best N
	const highlightedIndices = useMemo(() => {
		if (last20SDs.length === 0) return new Set<number>();
		const count = Math.min(last20SDs.length, 20);
		const toUse = getScalingCount(count);
		// Get lowest N values (with tie-breaking by position)
		const sorted = last20SDs
			.map((sd, i) => ({ sd, i }))
			.sort((a, b) => a.sd - b.sd || a.i - b.i);
		const bestIndices = new Set(sorted.slice(0, toUse).map((item) => item.i));
		return bestIndices;
	}, [last20SDs]);

	// HCP progression data points (chronological)
	const progressionData = useMemo(() => {
		const chronological = [...roundsWithSD]
			.sort((a, b) => a.roundDate - b.roundDate);
		const points: { date: number; hi: number }[] = [];
		const accumulated: number[] = [];
		for (const round of chronological) {
			accumulated.push(round.scoreDifferential as number);
			const hi = calculateHandicapIndex([...accumulated]);
			if (hi != null) {
				points.push({ date: round.roundDate, hi });
			}
		}
		return points;
	}, [roundsWithSD]);

	if (isLoadingRounds) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography>Loading...</Typography>
			</Box>
		);
	}
```

- [ ] **Step 5: Add the table render**

```tsx
// ... inside the component return
<Box sx={{ p: 2 }}>
	{/* Header */}
	<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
		<TimelineIcon sx={{ fontSize: 32 }} />
		<Typography variant="headline2">Handicap History</Typography>
	</Box>

	{/* Empty state */}
	{roundsWithSD.length === 0 && (
		<Alert severity="info">
			No rounds with score differentials yet. Play some rounds first!
		</Alert>
	)}

	{roundsWithSD.length > 0 && (
		<>
			{/* Current HI summary */}
			<Box sx={{ mb: 2 }}>
				<Typography variant="body" color="text.secondary">
					Current Handicap Index
				</Typography>
				<Typography variant="title3">
					{currentHI != null ? currentHI.toFixed(1) : '\u2014'}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					Based on {roundsWithSD.length} round{roundsWithSD.length !== 1 ? 's' : ''}
					{last20SDs.length > 0 && ` \u2022 Lowest ${getScalingCount(Math.min(last20SDs.length, 20))} of last ${Math.min(last20SDs.length, 20)} SDs used`}
				</Typography>
			</Box>

			{/* Last 20 Rounds Table */}
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
									<TableCell>Tee</TableCell>
									<TableCell align="right">Strokes</TableCell>
									<TableCell align="right">Score Diff.</TableCell>
									<TableCell align="center">Used</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{last20.map((round, idx) => {
									const isHighlighted = highlightedIndices.has(idx);
									return (
										<TableRow
											key={round.id}
											sx={{
												...(isHighlighted && {
													backgroundColor: 'action.selected',
												}),
											}}
										>
											<TableCell>
												{dayjs(round.roundDate).format('DD/MM/YYYY')}
											</TableCell>
											<TableCell>{round.roundCourse ?? '\u2014'}</TableCell>
											<TableCell>{round.roundTee ?? '\u2014'}</TableCell>
											<TableCell align="right">
												{round.totals?.totalStrokes ?? '\u2014'}
											</TableCell>
											<TableCell align="right">
												{round.scoreDifferential != null
													? round.scoreDifferential.toFixed(1)
													: '\u2014'}
											</TableCell>
											<TableCell align="center">
												{isHighlighted ? '\u2B50' : ''}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>

			{/* HCP Progression Chart */}
			<Card>
				<CardContent>
					<Typography variant="title6" gutterBottom>
						HCP Progression
					</Typography>
					{progressionData.length < 2 ? (
						<Typography variant="body" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
							Need at least 2 rounds to show progression.
						</Typography>
					) : (
						<Box sx={{ width: '100%', height: 300 }}>
							<LineChart
								dataset={progressionData}
								xAxis={[{
									dataKey: 'date',
									scaleType: 'time',
									valueFormatter: (date: Date) => dayjs(date).format('DD/MM/YY'),
								}]}
								yAxis={[{
									label: 'Handicap Index',
								}]}
								series={[{
									dataKey: 'hi',
									label: 'Handicap Index',
									showMark: true,
									connectNulls: false,
								}]}
								slotProps={{
									legend: { hidden: true },
								}}
							/>
						</Box>
					)}
				</CardContent>
			</Card>
		</>
	)}
</Box>
```

Note: The `roundDate` in `IBasicRoundData` is a `number` (timestamp). The `dayjs(round.roundDate)` call will interpret it correctly as a timestamp.

- [ ] **Step 4: Ensure the LineChart works with the timestamp data**

The `roundDate` field in `IBasicRoundData` is `roundDate: number` (line 163 of `roundData.types.tsx`). For `@mui/x-charts` `LineChart` with `scaleType: 'time'`, the `date` value needs to be a `Date` object or a timestamp number (milliseconds). The `round.roundDate` looks like it's already a timestamp, so it should work directly.

If the timestamp is in seconds (Unix timestamp), convert: `round.roundDate * 1000`. Let me check how it's used elsewhere...

Actually, looking at the type definition: `roundDate: number` and looking at how `dayjs` is used in the rendering: `dayjs(round.roundDate).format(...)` — if it's stored as a Unix timestamp in seconds, dayjs handles it by default. But `@mui/x-charts` time scale expects milliseconds. Let me convert in the progression data:

In the progression data computation:
```typescript
points.push({ date: round.roundDate * 1000, hi });
```

And for the xAxis formatter, wrap in `new Date()`:
```typescript
valueFormatter: (date: Date) => dayjs(date).format('DD/MM/YY'),
```

Wait, the x-charts time scale type might handle timestamps. Let me look at the existing charts in the codebase for reference.

- [ ] **Step 5: Check existing chart pattern in codebase**

Look at existing charts in `src/components/Dashboard/components/Charts/` to see how they use `@mui/x-charts`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/HandicapHistory.page.tsx src/components/HandicapHistory/HandicapHistory.component.tsx
git commit -m "feat: create Handicap History page with last-20 table and HCP progression chart"
```

---

### Task 5: Add Route and Navigation

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/utils/links/links.utils.tsx`

- [ ] **Step 1: Add route in App.tsx**

Find the simulator route and add the handicap history route:
```typescript
import HandicapHistoryPage from '@/pages/HandicapHistory.page';

// Inside <Routes>:
<Route path='/handicap-history' element={<HandicapHistoryPage />} />
```

- [ ] **Step 2: Add nav link**

In `src/utils/links/links.utils.tsx`, add a nav item after the simulator:
```typescript
import TimelineIcon from '@mui/icons-material/Timeline';

// In the nav items array:
{
    name: 'Handicap History',
    path: '/handicap-history',
    icon: TimelineIcon,
    description: 'View handicap progression and score differential history',
},
```

- [ ] **Step 3: Type check and build**

Run: `npm run type-check`
Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/utils/links/links.utils.tsx
git commit -m "feat: add Handicap History route and nav link"
```

---

### Task 6: Verification

- [ ] **Step 1: Run WHS tests**

Run: `npm run test:calc:whs`
Expected: All 21 tests pass.

- [ ] **Step 2: Type check**

Run: `npm run type-check`
Expected: No errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Production build succeeds.
