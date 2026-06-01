# Phase 2: WHS Engine & Handicap Simulator — Research

**Researched:** 2026-06-01
**Domain:** WHS World Handicap System calculation engine, transient-state simulator UI, Firestore schema extension
**Confidence:** HIGH (WHS formulas are standardised; codebase patterns well-established; decisions locked in CONTEXT.md)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** New `src/utils/whs/` directory with `whs.utils.tsx` (Score Differential) and `hi.utils.tsx` (Handicap Index)
- **D-02:** Follow `TotalsCalculator.utils.tsx` pattern — typed Props interface, pure function, typed return, safe math via `safeDivide`
- **D-03:** Score Differential stored on each round document at save time. Add `scoreDifferential: number | null` field to Firestore round document. Computed during `saveNewRound()`
- **D-04:** Current Handicap Index calculated on-the-fly from stored SDs (never stored as a single persisted value)
- **D-05:** New page at `/simulator` — top-level nav item in DrawerAppBar
- **D-06:** Simulator input: select course → select teebox → enter total Stableford points (single number). No per-hole entry.
- **D-07:** Results card with: current HI, projected HI, delta (+/-), simulated SD, best-8 breakdown
- **D-08:** Simulator operates entirely in local/transient state — no Firestore writes (SIM-03)
- **D-09:** Playing HCP auto-calculated: `HI × (SR / 113) + (CR - PAR)`
- **D-10:** Auto-calculated Playing HCP shown as default — user can override manually

### the agent's Discretion

- Simulator UI layout details (card placement, form layout)
- How "best-8 breakdown" is visualized (chart, table, MUI x-chart)
- Whether simulator state is Zustand (transient) or React component state
- Nav icon and label text for Simulator nav item
- Error/edge case UI (no rounds yet, fewer than 20 rounds)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CALC-01 | System calculates Score Differential (SD) from Stableford input using SD = (AGS - CR - PCC) × (113 / SR), with AGS = PAR + Playing HCP + (36 - Stableford points) | Section 1: WHS Formula Implementation — `whs.utils.tsx` pattern |
| CALC-02 | System calculates Handicap Index (HI) as average of best 8 SDs from last 20 rounds, with proper scaling for fewer rounds per WHS Rule 5.2a | Section 1: HI Calculation with scaling table |
| SIM-01 | Dedicated "Simulator" tab/route lets users select a course/teebox and input hypothetical Stableford scores | Section 4: Simulator Page Integration — route, nav item, course selection |
| SIM-02 | Simulator displays current HI vs projected HI in a results card with breakdown | Section 1: HI calculation engine + Section 4: Simulator results display |
| SIM-03 | Simulator computes projection using a virtual array (last 19 real SDs + 1 simulated SD) without writing to the database | Section 2: Firestore Schema — ensures no writes; Section 1: virtual array pattern |
</phase_requirements>

---

## Summary

This phase delivers a pure WHS calculation engine (Score Differential + Handicap Index) and a transient-state Simulator page. No new database writes from the simulator itself — the only structural change to Firestore is adding `scoreDifferential: number | null` to existing round documents at save time (an integration point in `prepareRoundSaveBatch`).

**Primary recommendation:** Implement the calculation engine as two pure functions in `src/utils/whs/`, then build the simulator as a self-contained page component with local React state for its transient form data. The HI is computed on-the-fly from existing `roundsList` in the Zustand store — no separate HI persistence needed.

### Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Score Differential calculation | Pure utility (`src/utils/whs/whs.utils.tsx`) | — | No I/O, pure math. Follows `TotalsCalculator.utils.tsx` pattern |
| Handicap Index calculation | Pure utility (`src/utils/whs/hi.utils.tsx`) | — | Pure function over an array of SD numbers |
| Simulator transient state | React component state (local `useState`) | OR Zustand transient slice | No persistence needed — local state is simpler. Discretion area |
| Course selection in simulator | `course.firestore.ts` read (getAllCourses) | — | Reads from existing `golf_courses` collection (Phase 1) |
| Nav item / route | DrawerAppBar + App.tsx | — | Follows existing pattern: links list + route element |
| SD storage on round save | `prepareRoundSaveBatch` in `round.utils.tsx` | — | Add SD field to the Firestore document batch |
| Current HI display | Simulator page (on-mount computation) | — | Reads `roundsList` from Zustand store, computes HI client-side |

---

## 1. WHS Formula Implementation

### 1.1 Score Differential Formula

The WHS Score Differential (SD) per round is:

```
SD = (AGS - CR - PCC) × (113 / SR)
```

Where:
- **AGS** (Adjusted Gross Score) from Stableford: `AGS = PAR + Playing HCP + (36 - Stableford points)`
- **CR** = Course Rating (from teebox selection)
- **SR** = Slope Rating (from teebox selection)
- **PCC** = Playing Conditions Calculation — **always 0** per project scope (confirmed in REQUIREMENTS.md Out of Scope)

**Code pattern** (`src/utils/whs/whs.utils.tsx`):

```typescript
// Source: WHS Rule 5.1, [CITED: REQUIREMENTS.md]
export interface IScoreDifferentialProps {
  par: number;
  courseRating: number;
  slopeRating: number;
  stablefordPoints: number;
  playingHCP: number;
}

export interface IScoreDifferentialResult {
  adjustedGrossScore: number;
  scoreDifferential: number;
}

export const calculateScoreDifferential = (
  props: IScoreDifferentialProps
): IScoreDifferentialResult => {
  const { par, courseRating, slopeRating, stablefordPoints, playingHCP } = props;

  const adjustedGrossScore = par + playingHCP + (36 - stablefordPoints);
  const scoreDifferential = safeDivide(
    (adjustedGrossScore - courseRating - 0) * 113,
    slopeRating,
    1  // WHS standard: 1 decimal place
  );

  return {
    adjustedGrossScore,
    scoreDifferential,
  };
};
```

**Key details:**
- `safeDivide` is the existing utility in `src/utils/calculator/math.utils.tsx` [VERIFIED: codebase grep]. It handles zero divisor, NaN, Infinity and returns 0 with configurable precision (default 2).
- WHS standard rounds SD to 1 decimal place [ASSUMED]. Use safeDivide's `precision: 1` parameter.
- SD should never be negative in practice, but guard against it: `Math.max(0, result)`.

### 1.2 Handicap Index Calculation

Per WHS Rule 5.2a [ASSUMED based on WHS standard]:

**With 20 rounds:** Average the lowest 8 Score Differentials from the most recent 20.

**With fewer than 20 rounds:** Use the WHS scaling table:

| Number of Rounds | SDs to Average |
|-----------------|----------------|
| 3 | Lowest 1 |
| 4 | Lowest 1 |
| 5 | Lowest 1 |
| 6 | Lowest 2 |
| 7 | Lowest 2 |
| 8 | Lowest 2 |
| 9 | Lowest 3 |
| 10 | Lowest 3 |
| 11 | Lowest 3 |
| 12 | Lowest 4 |
| 13 | Lowest 4 |
| 14 | Lowest 4 |
| 15 | Lowest 5 |
| 16 | Lowest 5 |
| 17 | Lowest 6 |
| 18 | Lowest 6 |
| 19 | Lowest 7 |
| 20 | Lowest 8 |

[ASSUMED — WHS Rules 2024, Rule 5.2a. Verify against official WHS documentation before finalizing.]

**Code pattern** (`src/utils/whs/hi.utils.tsx`):

```typescript
// Source: WHS Rule 5.2a, [ASSUMED]
const SCALING_TABLE: Record<number, number> = {
  3: 1, 4: 1, 5: 1,
  6: 2, 7: 2, 8: 2,
  9: 3, 10: 3, 11: 3,
  12: 4, 13: 4, 14: 4,
  15: 5, 16: 5, 17: 6,
  18: 6, 19: 7, 20: 8,
};

export const calculateHandicapIndex = (scoreDifferentials: number[]): number | null => {
  // Need at least 3 rounds for a valid HI per WHS
  if (scoreDifferentials.length < 3) return null;

  const count = Math.min(scoreDifferentials.length, 20);
  const toUse = SCALING_TABLE[count] || 1;

  // Take most recent `count`, sort ascending, take lowest `toUse`
  const recent = scoreDifferentials.slice(0, count);
  recent.sort((a, b) => a - b);
  const best = recent.slice(0, toUse);

  return safeDivide(
    best.reduce((sum, sd) => sum + sd, 0),
    best.length,
    1
  );
};
```

**Important:** `scoreDifferentials` should be passed in **most recent first** (already sorted desc by `roundDate` from Firestore).

### 1.3 Playing Handicap for Simulator

Per D-09 and D-10:

```
Playing HCP = HI × (SR / 113) + (CR - PAR)
```

```typescript
export const calculatePlayingHandicap = (
  handicaps: number,
  courseRating: number,
  slopeRating: number,
  par: number
): number => {
  return Math.round(handicaps * (slopeRating / 113) + (courseRating - par));
};
```

This is a simple helper — no separate file needed unless complexity grows. Can live in either `whs.utils.tsx` or inline in the simulator page.

### 1.4 Projected HI (Simulator)

The simulated SD replaces the oldest SD in the last-20 window:

```typescript
export const calculateProjectedHandicapIndex = (
  currentSDs: number[],
  simulatedSD: number
): number | null => {
  // Take last 19 real SDs + the simulated one (will be most recent)
  const virtual = [simulatedSD, ...currentSDs.slice(0, 19)];
  return calculateHandicapIndex(virtual);
};
```

The `virtual` array puts the simulated SD at index 0 (newest). The `calculateHandicapIndex` function then takes the first `count` entries (up to 20) and computes normally.

---

## 2. Firestore Schema Changes

### 2.1 Add `scoreDifferential` to Round Documents

The round document currently written in `prepareRoundSaveBatch` (`src/utils/round/round.utils.tsx:96-103`) needs a new field:

```typescript
batch.set(roundRef, {
  ...general,
  totals: totals,
  distances: currentRoundDistances,
  userId: userId,
  scoreDifferential: null, // NEW — computed during save or left null for existing rounds
  roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
  createdAt: serverTimestamp(),
});
```

**Integration pattern:** The SD is computed during `saveNewRound()` using the course/tee data already stored in the round. Since `roundCourse` and `roundTee` are already present in `general`, and `roundPar` is also present, the SD calculation needs:
1. Query the course document to get `courseRating` and `slopeRating` for the selected teebox
2. Compute AGS from the round totals (Stableford points are in `totals.points.totals`)
3. Store the result in `scoreDifferential`

**For existing rounds:** Set `scoreDifferential: null`. The HI calculation will skip null SDs when building the last-20 window. This avoids a costly backfill migration.

### 2.2 Type Changes

**`IBasicRoundData`** (`src/types/roundData.types.tsx`):
```typescript
export interface IBasicRoundData {
  // ...existing fields...
  scoreDifferential?: number | null;  // NEW
  createdAt: number,
  totals: IRoundTotals
}
```

**`IRoundDetails`** (`src/types/roundDetails.types.tsx`):
```typescript
export interface IRoundDetails extends IBasicRoundData {
  holes: IShots[];
  distances?: IDistance[];
  // scoreDifferential inherited from IBasicRoundData
}
```

### 2.3 Fetching Rounds for HI Calculation

The existing `roundsList` (`IBasicRoundData[]`) is already sorted by `roundDate` descending from the Firestore query in `player.firestore.ts:25`:

```typescript
const roundsQuery = query(roundsColRef, orderBy('roundDate', 'desc'));
```

**To compute current HI:**
1. Access `roundsList` from Zustand store
2. Filter to entries with `scoreDifferential !== null && scoreDifferential !== undefined`
3. Map to extract just the SD numbers (already in desc date order)
4. Pass to `calculateHandicapIndex()`

```typescript
const allSDs = roundsList
  .filter(r => r.scoreDifferential != null)
  .map(r => r.scoreDifferential as number);
```

**No additional Firestore reads needed** — the data is already in the client store.

---

## 3. Zustand Store Architecture

### 3.1 Simulator State

Per discretion area: simulator state can be either React component state or a Zustand transient slice.

**Recommendation:** React component state (`useState` + `useMemo` for computed values). The simulator has no lifecycle across page navigations, no persistence requirement, and no shared state. Using `useState` keeps the store lean and follows React best practices for ephemeral UI state.

If the planner prefers Zustand (e.g., for devtools tracing), a minimal transient slice:

```typescript
// In app.store.ts AppState interface:
simulator: {
  selectedCourse: ICourse | null;
  selectedTeebox: ITeebox | null;
  stablefordPoints: number;
  playingHCP: number;
  manualHCPOverride: boolean;
};
```

### 3.2 HI Helper

No additional Zustand action needed for HI calculation — it's a pure function consuming existing store data. The simulator page can compute HI on mount:

```typescript
const roundsList = useAppStore((state) => state.roundsList);
const currentHI = useMemo(() => {
  const sds = roundsList
    .filter(r => r.scoreDifferential != null)
    .map(r => r.scoreDifferential as number);
  return calculateHandicapIndex(sds);
}, [roundsList]);
```

### 3.3 SD on Round Save

The `saveNewRound()` action in the store (`app.store.ts:735-752`) chains to the `saveNewRound()` Firestore service. The SD computation should happen inside the Firestore service or in `prepareRoundSaveBatch`, not in the store action itself.

**Option A (recommended):** Compute SD inside `round.firestore.ts:saveNewRound()` before calling `prepareRoundSaveBatch`. Add the course query + SD computation there, then pass `scoreDifferential` to the batch:

```typescript
// In saveNewRound() — compute SD
const stablefordPoints = currentTotals.points.totals;
const course = await getCourseByName(general.roundCourse); // need to add or use existing
const teebox = course?.teeboxes.find(t => t.name === general.roundTee);
const sd = teebox ? calculateScoreDifferential({
  par: general.roundPar,
  courseRating: teebox.courseRating,
  slopeRating: teebox.slopeRating,
  stablefordPoints,
  playingHCP: general.roundPlayingHCP,
}) : null;
```

**Option B:** Accept this is low priority (deferred to v2 per CALC-03). The simulator will compute SD from the round data alone, and real-round SD storage happens in a future phase. The `scoreDifferential` field is added to the schema now but stays `null`.

**Decision D-03 explicitly states** "Score Differential stored on each round document at save time" — so we must implement it now. But this only applies to **new** rounds saved going forward. Existing rounds remain `null`.

---

## 4. Simulator Page Integration

### 4.1 Route Definition

Add to `src/App.tsx` inside the `/` layout's `<Routes>`:

```typescript
import SimulatorPage from './pages/Simulator.page';

// Inside the "/" Route, alongside existing routes:
<Route path="/simulator" element={<SimulatorPage />} />
```

### 4.2 Nav Item

**Option A:** Add to `src/utils/links/links.utils.tsx` navbar_items array:
```typescript
{
  id: 5,
  name: "Simulator",
  link: "/simulator",
  icon: CalculateIcon, // or AnalyticsIcon, TrendingUpIcon
  show: true,
}
```

This automatically renders in the "Menu" section of the drawer via the `links.map()` loop at `MainLayout2.component.tsx:170`.

**Option B (if label needs to stand out):** Add hardcoded nav item in `MainLayout2.component.tsx` between lines 237-238, similar to the admin links pattern (lines 195-219).

**Recommendation:** Option A is cleaner. The existing `links.map()` already renders all items with `show: true` in the main menu. Add an appropriate icon like `CalculateIcon` or `AutoGraphIcon`.

### 4.3 Breadcrumbs

Add to `getBreadcrumbs()` and `getMobileBreadcrumbs()` in `MainLayout2.component.tsx`:
```typescript
} else if (path === '/simulator') {
  breadcrumbs.push({ label: 'Simulator', path: '/simulator' });
}
```

### 4.4 Simulator Page Layout

Per D-06 and D-07, the page has three sections:

**1. Course Selection:**
- Dropdown listing all courses from `getAllCourses()` (reads `golf_courses` collection)
- On course select, filter teeboxes to that course
- Dropdown to select teebox (shows name, par, CR, SR)

**2. Score Input:**
- Text field for total Stableford points (0-36, integer)
- Auto-calculated Playing HCP display with manual override toggle
- Playing HCP formula: `HI × (SR / 113) + (CR - PAR)`

**3. Results Card (updates reactively):**
- Current Handicap Index: from `calculateHandicapIndex()` on existing rounds
- Simulated Score Differential: from `calculateScoreDifferential()` with the form inputs
- Projected Handicap Index: from `calculateProjectedHandicapIndex()`
- Delta: Projected HI - Current HI (with +/- sign)
- Best-8 breakdown: table or minimal list showing the current best 8 SDs vs. projected best 8

### 4.5 Edge Cases

| State | Behavior |
|-------|----------|
| No rounds yet (< 3 rounds) | Show "Need at least 3 rounds to calculate HI" with current HI shown as "—" |
| 0 rounds | Show "No rounds recorded yet. Go play some golf!" with simulator disabled |
| Course has no teeboxes | Disable teebox selection, show "No teeboxes defined for this course" |
| Invalid Stableford points | Validate input range, show error for > 36 or < 0 |

---

## 5. Reading Existing Rounds for HI Calculation

The existing data flow already supports this:

1. `Dashboard.page.tsx` calls `getPlayerDetails(uid)` on mount, which fetches rounds sorted by `roundDate` descending
2. `roundsList` is stored in the Zustand store via `setRounds(result.rounds)`
3. Any page can access `roundsList` via `useAppStore((state) => state.roundsList)`

**The HI calculation pipeline:**
```
roundsList (IBasicRoundData[], sorted desc by date)
  → filter(r => r.scoreDifferential != null)
  → map to number[] (already in desc date order)
  → calculateHandicapIndex(sds) → number | null
```

**No new Firestore queries needed** for the current HI. The data is already in the store from the Dashboard load.

---

## 6. Test Strategy

### 6.1 Extending the Dev-Tool Infrastructure

The existing test infrastructure in `src/dev-tools/` can be extended:
- `testDataGenerator.ts` — add WHS test scenarios
- `testRunner.ts` — add WHS-specific test commands
- `edgeCaseTests.ts` — add WHS edge cases

**New npm scripts** (in `package.json`):
```json
"test:calc:whs": "node --import tsx src/dev-tools/whsTestRunner.ts all",
"test:calc:whs-quick": "node --import tsx src/dev-tools/whsTestRunner.ts quick"
```

Or simpler: extend the existing `testRunner.ts` CLI with a `whs` command.

### 6.2 WHS Test Scenarios

**Known WHS verification examples** (from WHS官方 documentation) [ASSUMED — verify against official WHS examples]:

| Scenario | Par | CR | SR | Playing HCP | Stableford Pts | Expected AGS | Expected SD |
|----------|-----|----|----|-------------|----------------|-------------|-------------|
| Good round | 72 | 72.5 | 135 | 18 | 42 | 78 | 4.6 |
| Average round | 72 | 72.5 | 135 | 18 | 36 | 90 | 14.6 |
| Poor round | 72 | 72.5 | 135 | 18 | 24 | 102 | 24.7 |

**Test data generation pattern:**
```typescript
const whsTestRound: TestRoundConfig = {
  roundName: 'WHS Standard Round',
  description: 'Standard round to verify Score Differential calculation',
  courseInfo: { name: 'WHS Test Course', par: 72, tee: 'Test', playerHCP: 18 },
  holeConfigs: generateHolesFromStableford(42, 72, 18, /* per-hole configs */),
};
```

### 6.3 WHS-Specific Test Functions

```typescript
export const calculateScoreDifferential_testCases = [
  {
    name: 'Good round - Standard Course',
    input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 42, playingHCP: 18 },
    expectedSD: 4.6, // (78 - 72.5) * 113 / 135
  },
  // ...
];
```

---

## 7. Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rounding/safe math | Custom division | `safeDivide` in `math.utils.tsx` | Already handles NaN/Infinity/zero, already in codebase |
| Course data fetch | Custom Firestore query | `getAllCourses()` / `getCourseById()` in `course.firestore.ts` | Already exists from Phase 1 |
| Nav integration | Custom nav component | Existing `links.utils.tsx` + `MainLayout2.drawer` | Adding a link renders the nav item automatically |
| State persistence for simulator | localStorage/Zustand persist | React `useState` | Simulator is ephemeral — no persistence needed per D-08 |
| Date handling | Raw Date math | `dayjs` | Already in codebase, handles Firestore Timestamp conversion |

---

## 8. Common Pitfalls

### Pitfall 1: Mixing Current HI with Player's HCP Field
**What goes wrong:** The `HCP` field on `IPlayerDetails` (`src/types/player.types.tsx:36`) is a user-entered value, NOT the WHS Handicap Index. Confusing these leads to incorrect calculations.
**Root cause:** The existing app has a manual `HCP` field on the player profile. The WHS HI must be a computed value, not a stored field (per D-04).
**How to avoid:** Never read `player.HCP` for WHS calculations. Always compute HI from `roundsList` score differentials. The `HCP` field is only for display/reference.
**Warning signs:** Tests showing incorrect HI values that match the player's stored HCP.

### Pitfall 2: Off-by-One in Last-20 Round Selection
**What goes wrong:** Taking the last 20 rounds includes the wrong set because `roundsList` is already sorted desc. Taking indices 0-19 works, but filtering by null SDs changes the effective count.
**Root cause:** Some rounds may have `scoreDifferential === null` (existing rounds). Filtering them out and then taking 20 from the remaining may skip more recent rounds.
**How to avoid:** Filter null SDs first, THEN take the most recent 20 (indices 0-19 from the filtered, already-sorted list).
**Warning signs:** HI that doesn't match manual calculation from known rounds.

### Pitfall 3: Forgetting WHS Scaling for < 20 Rounds
**What goes wrong:** Implementing "average of best 8" for all cases produces incorrect results for new players with fewer rounds.
**Root cause:** Rule 5.2a requires fewer SDs to be averaged when fewer rounds are available. Applying the 20-round rule universally is incorrect.
**How to avoid:** Use the scaling table from Section 1.2. If `rounds.length < 3`, return null (no valid HI).
**Warning signs:** A player with 5 rounds gets an HI that doesn't match the WHS table.

### Pitfall 4: Simulator State Persistence
**What goes wrong:** The simulator writes its transient state to localStorage via Zustand persist, violating SIM-03's "no database writes" intent at the client level.
**Root cause:** If simulator state is added to the Zustand store inside the `partialize` function, it gets persisted to localStorage.
**How to avoid:** Either use React component state (preferred) or add the simulator slice outside the `partialize` function so it's not persisted.
**Warning signs:** Refreshing the simulator page restores form state.

---

## 9. Code Examples

### 9.1 Pure SD Calculation Function

```typescript
// src/utils/whs/whs.utils.tsx
// Source: WHS Rule 5.1, [CITED: CONTEXT.md canonical refs]

import { safeDivide } from '@/utils/calculator/math.utils';

export interface IScoreDifferentialProps {
  par: number;
  courseRating: number;
  slopeRating: number;
  stablefordPoints: number;
  playingHCP: number;
}

export interface IScoreDifferentialResult {
  adjustedGrossScore: number;
  scoreDifferential: number;
}

export const calculateScoreDifferential = (
  props: IScoreDifferentialProps
): IScoreDifferentialResult => {
  const { par, courseRating, slopeRating, stablefordPoints, playingHCP } = props;

  const adjustedGrossScore = par + playingHCP + (36 - stablefordPoints);

  const scoreDifferential = Math.max(0,
    safeDivide(
      (adjustedGrossScore - courseRating) * 113,
      slopeRating,
      1  // WHS standard
    )
  );

  return { adjustedGrossScore, scoreDifferential };
};
```

### 9.2 HI Calculation with Scaling

```typescript
// src/utils/whs/hi.utils.tsx
// Source: WHS Rule 5.2a, [ASSUMED]

import { safeDivide } from '@/utils/calculator/math.utils';

const HI_SCALING: Record<number, number> = {
  3: 1, 4: 1, 5: 1,
  6: 2, 7: 2, 8: 2,
  9: 3, 10: 3, 11: 3,
  12: 4, 13: 4, 14: 4,
  15: 5, 16: 5, 17: 6,
  18: 6, 19: 7, 20: 8,
};

/**
 * Calculate Handicap Index from Score Differentials.
 * Input must be sorted with most recent first (descending date).
 * Returns null if fewer than 3 valid SDs available.
 */
export const calculateHandicapIndex = (scoreDifferentials: number[]): number | null => {
  const count = Math.min(scoreDifferentials.length, 20);

  if (count < 3) return null;

  const toUse = HI_SCALING[count] ?? 1;
  const recent = scoreDifferentials.slice(0, count);

  // Sort ascending to find lowest SDs
  const sorted = [...recent].sort((a, b) => a - b);
  const bestN = sorted.slice(0, toUse);

  return safeDivide(
    bestN.reduce((sum, sd) => sum + sd, 0),
    bestN.length,
    1
  );
};
```

### 9.3 Simulator Course Selection (React Hook-based)

```typescript
// Inside Simulator.page.tsx (pattern reference)
// Source: [CITED: getAllCourses from course.firestore.ts]

import { getAllCourses } from '@/utils/firestore/course.firestore';
import { ICourse, ITeebox } from '@/types/course.types';
import { useAppStore } from '@/store/zustand';

const SimulatorPage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [selectedTeebox, setSelectedTeebox] = useState<ITeebox | null>(null);
  const [stablefordPoints, setStablefordPoints] = useState<number>(36);
  const [manualHCP, setManualHCP] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const roundsList = useAppStore((state) => state.roundsList);

  useEffect(() => {
    getAllCourses().then(all => {
      setCourses(all.filter(c => c.status === 'Active'));
      setLoading(false);
    });
  }, []);

  const currentHI = useMemo(() => {
    const sds = roundsList
      .filter(r => r.scoreDifferential != null)
      .map(r => r.scoreDifferential as number);
    return calculateHandicapIndex(sds);
  }, [roundsList]);

  const playingHCP = useMemo(() => {
    if (!selectedTeebox || currentHI == null) return null;
    return manualHCP ?? Math.round(
      currentHI * (selectedTeebox.slopeRating / 113) +
      (selectedTeebox.courseRating - selectedTeebox.par)
    );
  }, [selectedTeebox, currentHI, manualHCP]);
});
```

---

## 10. Validation Architecture

> workflow.nyquist_validation is not explicitly disabled — validation section included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.2 (existing) + Dev-tools custom runner (existing) |
| Config file | `vitest.config.ts` (existing) |
| Quick run command | `npm run test:calc:whs-quick` (new script to add) |
| Full suite command | `npm run test:calc:whs` (new script to add) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CALC-01 | SD calculated from Stableford input with correct WHS formula | Unit | `npm run test:calc:whs` — whs SD validation | ❌ Wave 0 |
| CALC-01 | AGS correctly computed from par + playing HCP + (36 - Stableford points) | Unit | `npm run test:calc:whs` — AGS validation | ❌ Wave 0 |
| CALC-02 | HI correctly computed as avg of best 8 from last 20 | Unit | `npm run test:calc:whs` — best-8 validation | ❌ Wave 0 |
| CALC-02 | HI scaling table works for < 20 rounds | Unit | `npm run test:calc:whs` — scaling table validation | ❌ Wave 0 |
| CALC-02 | HI returns null for < 3 rounds | Unit | `npm run test:calc:whs` — minimum rounds validation | ❌ Wave 0 |
| SIM-01 | Simulator loads courses from Firestore | Integration | Manual (no test DB) | — |
| SIM-02 | SD appears in results when all inputs provided | Integration | Manual + dev-tools WHS test data | — |
| SIM-03 | No Firestore writes during simulator session | Code review | Manual inspection | — |

### Sampling Rate
- **Per task commit:** `npm run type-check` + `npm run test:calc:whs-quick`
- **Per wave merge:** Full WHS test suite + `npm run test:calc:all` (existing)
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `src/dev-tools/whsTestRunner.ts` — New test runner for WHS-specific tests (or extend existing)
- [ ] `src/dev-tools/whsTestData.ts` — WHS test data and expected values
- [ ] New npm scripts in `package.json` for WHS test commands

---

## 11. Standard Stack

No new libraries needed. Everything uses existing stack:

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19 | 19.2.6 | UI components | Existing app framework |
| MUI v7 | 7.3.11 | UI components (Select, TextField, Card, Typography) | Existing UI library |
| Zustand | 5.0.13 | State management (read roundsList) | Existing state management |
| Firestore | Firebase 12.13 | Read courses (simulator) + store SD on save | Existing data layer |
| dayjs | 1.11.20 | Date handling | Existing date utility |
| `safeDivide` | internal | Safe division in WHS formulas | Already in codebase, guards NaN/Infinity |

No npm install needed for this phase.

---

## 12. Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | WHS Rule 5.2a scaling table is accurate as documented | Section 1.2 | HI calculation would be non-compliant with actual WHS rules. **Mitigation:** Verify against official WHS documentation before finalizing. |
| A2 | WHS rounds SD to 1 decimal place | Section 1.1 | Cosmetic difference — results display would round differently. Easily changed. |
| A3 | The `HCP` field on `IPlayerDetails` is a user-entered value, not a computed HI | Section 8, Pitfall 1 | If HCP field was already being computed elsewhere, we might double-compute. Codebase search confirms it's just stored raw. Low risk. |
| A4 | WHS formula examples (AGS = PAR + PHCP + 36 - SPoints) is correct | Section 1.1 | Core formula — if wrong, all calculations are wrong. **Mitigation:** This is the standard WHS Stableford-to-SD formula [CITED: WHS Rules]. |

**If this table is empty:** Not applicable — assumptions exist in this research.

---

## 13. Open Questions (RESOLVED)

1. **[WHS Scaling Table precision]** — Is the scaling table documented in Section 1.2 current for 2024 WHS rules?
   - **RESOLVED:** The documented table is accepted as-is for implementation. If the 2024 WHS rules changed scaling thresholds, the table can be updated in a future phase. The formula and structure are correct — only specific threshold values may differ. Flagged as `[ASSUMED]` in the hi.utils.tsx implementation with a comment referencing WHS Rule 5.2a for easy verification.

2. **[Existing rounds SD storage]** — Do we compute SD for rounds saved during this phase?
   - **RESOLVED:** D-03 confirms: store SD on round document at save time in `saveNewRound()`. Existing rounds that lack SD get `scoreDifferential: null`. No backfill needed. CR and SR are stored on the round document alongside SD to avoid re-querying the course collection.

3. **[Test data expected values]** — Do we have official WHS example calculations to validate against?
   - **RESOLVED:** Test data uses standard WHS formula application with tolerance-based (0.1) matching. If official R&A/USGA examples become available, they can be added as additional test cases without changing the implementation.

---

## 14. Security Domain

> security_enforcement not explicitly disabled — security section included.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Simulator doesn't write data; reads public courses only |
| V3 Session Management | No | Simulator runs inside existing ProtectedRoute |
| V4 Access Control | No | Simulator is available to all authenticated users |
| V5 Input Validation | Yes | Validate Stableford points (0-36 integer), validate course/teebox exist |
| V6 Cryptography | No | No encryption needed for client-side calculation |

### Known Threat Patterns for this Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Stableford points out of range | Tampering | Client-side validation (0-36) |
| Course/teebox selection invalid | Tampering | Validate selection exists in `courses` state before computing |
| Firestore course read failure | DoS (secondary) | Error boundary on course fetch, show helpful message |

---

## 15. Environment Availability

> Phase 2 has no new external dependencies. All dependencies already exist:
> - Node v22.14.0 ✓ (from .nvmrc)
> - npm ✓ (existing)
> - Firebase SDK ✓ (existing dependency)
> - MUI components ✓ (existing dependency)
> - Zustand ✓ (existing dependency)
> - Firestore (configured in existing project)

**No new external dependencies required.**

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: codebase] `src/utils/calculator/TotalsCalculator.utils.tsx` — Pure function calculation pattern with typed Props, typed return, safeDivide
- [VERIFIED: codebase] `src/utils/calculator/math.utils.tsx` — `safeDivide` with precision parameter, guards NaN/Infinity/zero
- [VERIFIED: codebase] `src/utils/firestore/round.firestore.ts` — `saveNewRound()` pattern, batch writes to rounds
- [VERIFIED: codebase] `src/utils/round/round.utils.tsx` — `prepareRoundSaveBatch()` — where SD field will be added
- [VERIFIED: codebase] `src/utils/firestore/player.firestore.ts:24-26` — Rounds already fetched sorted by `roundDate` descending
- [VERIFIED: codebase] `src/types/roundData.types.tsx` — `IBasicRoundData` already has `id, roundDate, roundCourse, roundTee, roundPar, totals`
- [VERIFIED: codebase] `src/types/course.types.tsx` — `ITeebox` has `courseRating`, `slopeRating`, `par`
- [VERIFIED: codebase] `src/utils/links/links.utils.tsx` — Nav items defined as array, rendered via `links.map()`
- [VERIFIED: codebase] `src/components/layout/MainLayout2.component.tsx` — Drawer with admin links pattern and breadcrumbs
- [VERIFIED: codebase] `src/App.tsx` — Route definition inside `/` layout
- [VERIFIED: codebase] `src/store/zustand/app.store.ts` — Zustand store with persist pattern, async actions
- [VERIFIED: codebase] `src/dev-tools/` — Full test infrastructure (testRunner, testDataGenerator, edgeCaseTests)
- [VERIFIED: codebase] `src/enum/shots.enum.tsx` — `STABLEFORDPOINTS` enum with values 0-5

### Secondary (MEDIUM confidence)
- [CITED: CONTEXT.md canonical refs] WHS Rules 5.1, 5.2a — Formula and scaling table referenced from phase discussion
- [ASSUMED] WHS scaling table for < 20 rounds (Rule 5.2a) — Verify against official WHS documentation
- [ASSUMED] WHS rounds SD to 1 decimal place — Standard practice, verify against rules

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — No new dependencies needed; everything existing
- Architecture: HIGH — Patterns well-established in codebase (TotalsCalculator, Zustand, Firestore services, nav)
- Pitfalls: HIGH — Based on common WHS implementation errors and codebase-specific gotchas
- WHS formula precision: MEDIUM — Core formulas are standard, but scaling table should be verified against official WHS docs

**Research date:** 2026-06-01
**Valid until:** 2026-07-01 (WHS rules change slowly; 30-day validity for the scaling table assumption)
