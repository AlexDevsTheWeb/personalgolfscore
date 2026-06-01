# Phase 2: WHS Engine & Handicap Simulator - Pattern Map

**Mapped:** 2026-06-01
**Files analyzed:** 14 (6 new, 8 modified)
**Analogs found:** 14 / 14

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/utils/whs/whs.utils.tsx` | utility | transform | `src/utils/calculator/TotalsCalculator.utils.tsx` | exact (same role + data flow + safeDivide usage) |
| `src/utils/whs/hi.utils.tsx` | utility | transform | `src/utils/calculator/TotalsCalculator.utils.tsx` | exact (same role + data flow + safeDivide usage + typed return) |
| `src/pages/Simulator.page.tsx` | page | request-response | `src/pages/Statistics.page.tsx` | exact (same role — delegates to child component) |
| `src/components/Simulator/Simulator.component.tsx` | component | request-response | `src/components/Statistics/StatisticsMain.component.tsx` | role-match (MUI composition, data loading pattern) |
| `src/dev-tools/whsTestData.ts` | test | batch | `src/dev-tools/edgeCaseTests.ts` | exact (same role — static test case definitions with expected values) |
| `src/dev-tools/whsTestRunner.ts` | test | batch | `src/dev-tools/testRunner.ts` | exact (same role — test orchestrator class) |
| `src/types/roundData.types.tsx` (mod) | model | CRUD | existing file (add single field to IBasicRoundData) | in-file pattern |
| `src/types/roundDetails.types.tsx` (mod) | model | CRUD | existing file (inherits from IBasicRoundData) | in-file pattern |
| `src/utils/firestore/round.firestore.ts` (mod) | service | CRUD | `src/utils/firestore/course.firestore.ts` | role-match (Firestore async service pattern) |
| `src/utils/round/round.utils.tsx` (mod) | utility | CRUD | existing file (add SD field to prepareRoundSaveBatch) | in-file pattern |
| `src/App.tsx` (mod) | config | request-response | existing file (add route inside `/` layout) | in-file pattern |
| `src/store/zustand/app.store.ts` (mod, optional) | store | CRUD | existing file (AppState interface + persist pattern) | in-file pattern |
| `src/utils/links/links.utils.tsx` (mod) | config | — | existing file (add nav item to navbar_items array) | in-file pattern |
| `src/components/layout/MainLayout2.component.tsx` (mod) | component | — | existing file (add breadcrumb case + nav render) | in-file pattern |

---

## Pattern Assignments

### `src/utils/whs/whs.utils.tsx` (utility, transform)

**Analog:** `src/utils/calculator/TotalsCalculator.utils.tsx` (227 lines)

**Imports pattern** (file lines 1-6):
```typescript
import { IShots } from "@/types/roundData.types";
import { IRoundTotals } from "@/types/roundTotals.types";
import _ from "lodash";
import { initialStateRoundTotals } from "../constant.utils";
import { calculateChippingPitchingStatistics, calculateFWIrons, calculateInside100mtStatistics, calculatePuttsStatistics, calculateTeeShotsStatistics } from "../totals/totals.utils";
import { safeDivide, safePercentage } from "./math.utils";
```

**Pattern to copy:** Import only what's needed — `{ safeDivide }` from `@/utils/calculator/math.utils`. No UI imports, no Firestore imports. Pure calculation utility.

**Core pattern** (lines 8-227): Named export pure function receiving typed parameters, returning typed result object:
```typescript
export const totalsCalculator = (shots: IShots[]) => {
  let totals: IRoundTotals = _.cloneDeep(initialStateRoundTotals);
  // ... pure computation ...
  return totals;
};
```

**Pattern for whs.utils.tsx:**
```typescript
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
  // pure function, no side effects, safeDivide for division
};
```

**Safe divide pattern** (`src/utils/calculator/math.utils.tsx` lines 12-24) — copy usage:
```typescript
export const safeDivide = (numerator: number | undefined, denominator: number | undefined, precision: number = 2): number => {
  const num = numerator || 0;
  const den = denominator || 0;
  if (den === 0) return 0;
  const result = num / den;
  if (isNaN(result) || !isFinite(result)) return 0;
  return parseFloat(result.toFixed(precision));
};
```

**Error handling:** No try/catch needed — pure function with no I/O. safeDivide handles zero/NaN/Infinity internally.

---

### `src/utils/whs/hi.utils.tsx` (utility, transform)

**Analog:** `src/utils/calculator/TotalsCalculator.utils.tsx` (same pattern as whs.utils.tsx)

**Imports pattern:** Same as whs.utils.tsx — import `{ safeDivide }` from `@/utils/calculator/math.utils`.

**Core pattern** — pure function, array input, nullable return for edge cases:
```typescript
export const calculateHandicapIndex = (scoreDifferentials: number[]): number | null => {
  // null for < 3 rounds (no valid HI)
  // average of lowest N from most recent 20
  // safeDivide for final average
};
```

**Pattern from existing code** — the null return pattern matches Firestore service functions like `getCourseById` which returns `Promise<ICourse | null>`.

---

### `src/pages/Simulator.page.tsx` (page, request-response)

**Analog:** `src/pages/Statistics.page.tsx` (9 lines) — simplest page pattern in the codebase

**Imports + core pattern** (lines 1-9):
```typescript
import StatisticsMain from "../components/Statistics/StatisticsMain.component";

const Statistics = () => {
  return (
    <StatisticsMain />
  )
}

export default Statistics
```

**Pattern to copy:** Slim page component that delegates entirely to a child component. Default export.

**Alternative analog:** `src/pages/Dashboard.page.tsx` (49 lines) — for data-loading pages:

**Data loading pattern** (lines 10-34):
```typescript
const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoadingPlayer = useAppStore((state) => state.isLoadingPlayer);
  const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
  const roundsList = useAppStore((state) => state.roundsList);
  // ...

  useEffect(() => {
    if (uid) {
      fetchInitialTheme(uid);
      if (auth) {
        getPlayerDetails(uid).then((result) => {
          if (result) {
            setRounds(result.rounds || []);
          }
        });
      }
    }
  }, [uid]);

  if (!uid || !!isLoadingPlayer) return <Spinner />;

  return <Dashboard />;
};
```

**Pattern for Simulator.page.tsx:** Use Statistics.page.tsx pattern (slim delegation) if data loading is inside the component; use Dashboard.page.tsx pattern if course loading + HI computation happen at the page level.

---

### `src/components/Simulator/Simulator.component.tsx` (component, request-response)

**Analog:** `src/components/Statistics/StatisticsMain.component.tsx` — MUI composition with data display

**Pattern for MUI form + card display:** Use MUI components following the project's standard imports:
```typescript
import { useState, useEffect, useMemo } from 'react';
import {
  Card, CardContent, Typography, TextField,
  Select, MenuItem, FormControl, InputLabel,
  Grid, Box, Divider
} from '@mui/material';
import { getAllCourses } from '@/utils/firestore/course.firestore';
import { useAppStore } from '@/store/zustand';
import { ICourse, ITeebox } from '@/types/course.types';
import { calculateScoreDifferential } from '@/utils/whs/whs.utils';
import { calculateHandicapIndex, calculateProjectedHandicapIndex } from '@/utils/whs/hi.utils';
```

**Transient state pattern** (React component state, not Zustand — per discretion area in D-08):
```typescript
const [courses, setCourses] = useState<ICourse[]>([]);
const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
const [selectedTeebox, setSelectedTeebox] = useState<ITeebox | null>(null);
const [stablefordPoints, setStablefordPoints] = useState<number>(36);
const [manualPlayingHCP, setManualPlayingHCP] = useState<number | null>(null);
const [loading, setLoading] = useState(true);
```

**Course loading pattern** (from existing `src/utils/firestore/course.firestore.ts` `getAllCourses`):
```typescript
useEffect(() => {
  getAllCourses().then(all => {
    setCourses(all.filter(c => c.status === 'Active'));
    setLoading(false);
  }).catch(err => {
    console.error('Failed to load courses:', err);
    setLoading(false);
  });
}, []);
```

**HI computation pattern** (reads `roundsList` from Zustand store, computes on the fly):
```typescript
const roundsList = useAppStore((state) => state.roundsList);

const currentHI = useMemo(() => {
  const sds = roundsList
    .filter(r => r.scoreDifferential != null)
    .map(r => r.scoreDifferential as number);
  return calculateHandicapIndex(sds);
}, [roundsList]);
```

**Playing HCP auto-calc with manual override pattern** (D-09, D-10):
```typescript
const playingHCP = useMemo(() => {
  if (!selectedTeebox || currentHI == null) return null;
  return manualPlayingHCP ?? Math.round(
    currentHI * (selectedTeebox.slopeRating / 113) +
    (selectedTeebox.courseRating - selectedTeebox.par)
  );
}, [selectedTeebox, currentHI, manualPlayingHCP]);
```

**Simulated SD + projected HI pattern** (virtual array for SIM-03):
```typescript
const simulatedResult = useMemo(() => {
  if (!selectedTeebox || playingHCP == null) return null;
  return calculateScoreDifferential({
    par: selectedTeebox.par,
    courseRating: selectedTeebox.courseRating,
    slopeRating: selectedTeebox.slopeRating,
    stablefordPoints,
    playingHCP,
  });
}, [selectedTeebox, playingHCP, stablefordPoints]);

const projectedHI = useMemo(() => {
  if (!simulatedResult) return null;
  const sds = roundsList
    .filter(r => r.scoreDifferential != null)
    .map(r => r.scoreDifferential as number);
  // Virtual array: simulated SD + last 19 real SDs
  const virtual = [simulatedResult.scoreDifferential, ...sds.slice(0, 19)];
  return calculateHandicapIndex(virtual);
}, [simulatedResult, roundsList]);
```

---

### `src/dev-tools/whsTestData.ts` (test, batch)

**Analog:** `src/dev-tools/edgeCaseTests.ts` (605 lines) — static test case definitions

**Pattern** (lines 1-80): Static methods returning arrays of test case objects with named scenarios:
```typescript
export class EdgeCaseTests {
  static getVariableMismatchTests(): { [key: string]: TestRoundConfig } {
    return {
      arrayLengthMismatch: {
        roundName: 'Array Length Mismatch Test',
        description: 'Testing scenarios where puttsLength array might not match putts count',
        courseInfo: { name: 'Mismatch Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['puttsLength array mismatch', 'putts count vs array length'],
        holeConfigs: [ /* ... */ ],
      },
    };
  }
}
```

**Pattern for whsTestData.ts — simpler static data:**
```typescript
export const WHSScoreDifferentialTestCases = [
  {
    name: 'Good round - Standard Course',
    input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 42, playingHCP: 18 },
    expectedAGS: 78,
    expectedSD: 4.6,
  },
  // ...
];

export const WHSHandicapIndexTestCases = [
  {
    name: '20 rounds - best 8',
    scoreDifferentials: [ /* 20 numbers */ ],
    expectedHI: 12.4,
  },
  // ...
];
```

---

### `src/dev-tools/whsTestRunner.ts` (test, batch)

**Analog:** `src/dev-tools/testRunner.ts` (308 lines) — test orchestrator pattern

**Pattern** (lines 1-29): Class with static methods that execute tests and log results:
```typescript
import { TestDataGenerator } from './testDataGenerator';
import { StepByStepTester, runQuickTest, formatTestResults } from './stepByStepTester';
import { EdgeCaseTests, knownIssueTests } from './edgeCaseTests';

export class InteractiveTestRunner {
  static runQuickTest(): void {
    console.log('🏌️  Running Quick 3-Hole Test...\n');
    const result = runQuickTest('mixedScenarios', 3);
    console.log(formatTestResults(result));
    if (!result.overallPassed) {
      console.log('\n🚨 Issues found! Check the details above.\n');
    } else {
      console.log('\n✅ All calculations passed!\n');
    }
  }
  // ...
}
```

**Pattern for whsTestRunner.ts — simpler, focused on WHS:**
```typescript
import { WHSScoreDifferentialTestCases, WHSHandicapIndexTestCases } from './whsTestData';
import { calculateScoreDifferential } from '../utils/whs/whs.utils';
import { calculateHandicapIndex } from '../utils/whs/hi.utils';

export class WHSTestRunner {
  static runAll(): void { /* iterate test cases */ }
  static runQuick(): void { /* run a few representative cases */ }
}

// CLI entry point
const args = process.argv.slice(2);
const mode = args[0] || 'quick';
if (mode === 'all') WHSTestRunner.runAll();
else WHSTestRunner.runQuick();
```

---

### `src/types/roundData.types.tsx` (modify — model, CRUD)

**Analog:** Existing file — add `scoreDifferential` field to `IBasicRoundData`

**Current IBasicRoundData** (lines 159-173):
```typescript
export interface IBasicRoundData {
  id: string,
  roundCourse?: string,
  roundDate: number,
  roundHoles?: string,
  roundTee?: string,
  roundPar?: string,
  roundNumber?: string,
  roundPlayingHCP?: string,
  roundStrokes?: number,
  userId?: string
  createdAt: number,
  totals: IRoundTotals
}
```

**Add after `totals`:**
```typescript
  scoreDifferential?: number | null;
```

---

### `src/types/roundDetails.types.tsx` (modify — model, CRUD)

**Current** (lines 4-7):
```typescript
export interface IRoundDetails extends IBasicRoundData {
  holes: IShots[];
  distances?: IDistance[];
}
```

No changes needed — `scoreDifferential` is inherited from `IBasicRoundData`.

---

### `src/utils/firestore/round.firestore.ts` (modify — service, CRUD)

**Analog Firestore service:** `src/utils/firestore/course.firestore.ts` (132 lines)

**Pattern for async Firestore operations** (lines 32-49):
```typescript
export const getAllCourses = async (): Promise<ICourse[]> => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const coursesQuery = query(coursesRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(coursesQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...convertTimestamps(data), id: doc.id } as ICourse;
    });
  } catch (error: any) {
    console.error('course.firestore: Error fetching all courses:', error);
    throw error;
  }
};
```

**SD computation integration point** in `saveNewRound()` (file lines 63-139):
After the batch commit (line 89), or inside `prepareRoundSaveBatch`, compute SD:

```typescript
// Inside saveNewRound, after batchSaveRound.commit():
// Compute and store scoreDifferential
const stablefordPoints = currentTotals.points.totals;
// Read course/tee from newRoundMain.round
const { roundCourse, roundTee, roundPar, roundPlayingHCP } = general;
// Get courseRating + slopeRating from stored data or query
// Store on round doc in a separate update or as part of prepareRoundSaveBatch
```

**Add `getCourseByName` helper** if needed (following `getCourseById` pattern from `course.firestore.ts` lines 51-74).

---

### `src/utils/round/round.utils.tsx` (modify — utility, CRUD)

**Current `prepareRoundSaveBatch`** (lines 84-114):
```typescript
export const prepareRoundSaveBatch = (
  batch: WriteBatch,
  userId: string,
  general: INewRound,
  totals: IRoundTotals,
  currentRoundDistances: IDistance[],
  holes: IShots[]
): string => {
  // ...
  batch.set(roundRef, {
    ...general,
    totals: totals,
    distances: currentRoundDistances,
    userId: userId,
    roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  // ...
};
```

**Add `scoreDifferential: number | null` field** to the `batch.set()` call:
```typescript
batch.set(roundRef, {
  ...general,
  totals: totals,
  distances: currentRoundDistances,
  userId: userId,
  scoreDifferential: null, // computed by saveNewRound before calling this
  roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
  createdAt: serverTimestamp(),
});
```

---

### `src/App.tsx` (modify — config, request-response)

**Current route pattern** (lines 34-52):
```typescript
<Route
  path="/"
  element={
    <ProtectedRoute>
      <SharedLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/clubs" element={<ClubsPage />} />
  <Route path="/all-rounds" element={<AllRounds />} />
  <Route path="/round/:roundID" element={<RoundsData />} />
  <Route path='/addNewRound' element={<AddNewRound />} />
  <Route path='/statistics' element={<Statistics />} />
  <Route path='/settings' element={<SettingsPage />} />
  <Route path="/admin/courses" element={<AdminRoute><AdminCoursesPage /></AdminRoute>} />
  <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
</Route>
```

**Add after the `/settings` route:**
```typescript
<Route path='/simulator' element={<SimulatorPage />} />
```

**Import to add** (with other page imports at top):
```typescript
import SimulatorPage from './pages/Simulator.page';
```

---

### `src/store/zustand/app.store.ts` (modify — store, CRUD)

**AppState interface** (lines 150-239) — add optional simulator state if not using React component state:
```typescript
export interface AppState {
  // ...existing fields...
  simulator?: {
    selectedCourse: ICourse | null;
    selectedTeebox: ITeebox | null;
    stablefordPoints: number;
    playingHCP: number;
    manualHCPOverride: boolean;
  };
  // ...existing actions...
  setSimulatorState?: (state: Partial<AppState['simulator']>) => void;
}
```

**IMPORTANT:** If adding simulator state, ensure it is NOT in the `partialize` function (lines 767-788) so it doesn't persist to localStorage:
```typescript
partialize: (state) => ({
  themePreference: state.themePreference,
  // ...existing fields — DO NOT add simulator here
}),
```

---

### `src/utils/links/links.utils.tsx` (modify — config)

**Current pattern** (lines 7-36):
```typescript
const navbar_items: TLinkSidebar[] = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: HomeWorkIcon,
    show: false,
  },
  // ...
  {
    id: 4,
    name: "Users",
    link: "/admin/users",
    icon: PeopleIcon,
    show: false,
  },
];
```

**Add after the existing items** (before the `export default`):
```typescript
  {
    id: 5,
    name: "Simulator",
    link: "/simulator",
    icon: CalculateIcon, // or AutoGraphIcon, TrendingUpIcon
    show: true,
  },
```

**Import to add:**
```typescript
import CalculateIcon from '@mui/icons-material/Calculate';
// or: import AutoGraphIcon from '@mui/icons-material/AutoGraph';
```

---

### `src/components/layout/MainLayout2.component.tsx` (modify — component)

**Breadcrumbs pattern** — add `/simulator` case in `getBreadcrumbs()` (around line 94):
```typescript
} else if (path === '/settings') {
  breadcrumbs.push({ label: 'Settings', path: '/settings' });
} else if (path === '/simulator') {                    // NEW
  breadcrumbs.push({ label: 'Simulator', path: '/simulator' });  // NEW
} else if (path.startsWith('/round/')) {
```

**Same addition in `getMobileBreadcrumbs()`** (around line 142):
```typescript
} else if (path === '/settings') {
  breadcrumbs.push({ label: 'Settings', path: '/settings' });
} else if (path === '/simulator') {                    // NEW
  breadcrumbs.push({ label: 'Simulator', path: '/simulator' });  // NEW
} else if (path.startsWith('/round/')) {
```

**Note:** The nav item renders automatically via `links.map()` (line 170-194) since the Simulator link has `show: true`. No hardcoded nav item needed.

---

## Shared Patterns

### Pure Calculation Functions (whs.utils.tsx + hi.utils.tsx)

**Source:** `src/utils/calculator/TotalsCalculator.utils.tsx`
**Applies to:** Both `whs.utils.tsx` and `hi.utils.tsx`

Key shared characteristics:
- Named exports, not default exports
- Typed Props interface or typed function parameters
- Return type defined as interface (or `number | null` for edge cases)
- Uses `safeDivide` from `@/utils/calculator/math.utils` for ALL division
- No I/O, no side effects, no try/catch
- `Math.max(0, result)` guard for non-negative SD values

### Firestore Service Pattern (round.firestore.ts modification)

**Source:** `src/utils/firestore/course.firestore.ts`
**Applies to:** `round.firestore.ts` SD storage integration

Key shared characteristics:
- Named async functions returning typed Promises
- try/catch with `console.error('prefix: message:', error)` + `throw error`
- Input validation at top (throw early if missing params)
- Timestamp conversion helper for Firestore Timestamp → milliseconds

### Zustand Store Slicing (optional simulator state)

**Source:** `src/store/zustand/app.store.ts`
**Applies to:** Any simulator state added to the store

Key shared characteristics:
- Interface/type for state properties within `AppState`
- Async actions: `set({ loading: true })` → try block → `set({ ...result })` → catch block → `set({ error })`
- Protected from persistence: simulator state excluded from `partialize`
- Zustand devtools wrapping for debugging

### Nav Integration

**Source:** `src/utils/links/links.utils.tsx` + `src/components/layout/MainLayout2.component.tsx`
**Applies to:** Route + nav + breadcrumbs for `/simulator`

Key shared characteristics:
- Route added inside the `/` layout's `<Routes>` in `App.tsx`
- Nav item in `links.utils.tsx` with `show: true` renders automatically via `links.map()`
- Breadcrumbs added as simple `else if` statements in both `getBreadcrumbs()` and `getMobileBreadcrumbs()`
- Page component imported with default export

---

## No Analog Found

All files have close analogs in the codebase. No unmatched files.

## Metadata

**Analog search scope:** `src/utils/calculator/`, `src/utils/firestore/`, `src/pages/`, `src/components/`, `src/types/`, `src/store/zustand/`, `src/utils/links/`, `src/components/layout/`, `src/dev-tools/`
**Files scanned:** 20+
**Pattern extraction date:** 2026-06-01
