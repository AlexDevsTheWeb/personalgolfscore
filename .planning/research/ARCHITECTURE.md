# Architecture Research

**Domain:** WHS Golf Handicap Calculator & Course DB
**Researched:** 2026-05-31
**Overall Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                     React 19 Application                        │
│                       src/App.tsx                               │
│                (Router + Theme + Localization)                    │
├─────────────────────────────────────────────────────────────────┤
│                    PAGES LAYER (src/pages/)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌────────────────┐ │
│  │Dashboard │ │AllRounds │ │ Handicap     │ │ AdminCourses   │ │
│  │.page.tsx  │ │.page.tsx │ │ Simulator    │ │ .page.tsx      │ │
│  │          │ │          │ │ .page.tsx     │ │                │ │
│  └────┬─────┘ └────┬─────┘ └──────┬───────┘ └───────┬────────┘ │
├───────┴───────────┴───────────────┴────────────────────────────┤
│                  COMPONENTS LAYER (src/components/)              │
│  ┌───────────────────┐ ┌─────────────────┐ ┌────────────────┐  │
│  │ CourseAutocomplete│ │HandicapDisplay  │ │ AdminCourseList│  │
│  │ .component.tsx    │ │.component.tsx   │ │ .component.tsx │  │
│  └────────┬──────────┘ └────────┬────────┘ └───────┬────────┘  │
│           │                     │                    │           │
│  ┌────────┴──────────┐ ┌───────┴────────┐ ┌─────────┴────────┐ │
│  │CourseCreateDialog │ │SimulatorForm   │ │AdminCourseForm   │ │
│  │.component.tsx     │ │.component.tsx  │ │.component.ts     │ │
│  └───────────────────┘ └────────────────┘ └──────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│              STATE & DATA LAYER (src/store/zustand/)             │
│  ┌────────────────────┐ ┌─────────────────┐ ┌────────────────┐  │
│  │  useAppStore       │ │ useHandicapStore│ │ useAdminStore  │  │
│  │  (Existing)        │ │ (NEW slice)     │ │ (NEW slice)    │  │
│  │  Persist:local     │ │ Persist:local   │ │ No persist     │  │
│  └────────────────────┘ └─────────────────┘ └────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│              UTILS / SERVICES LAYER (src/utils/)                  │
│  ┌────────────────────┐ ┌─────────────────┐ ┌────────────────┐  │
│  │whs-calculator/     │ │ firestore/      │ │ courses/       │  │
│  │ (PURE FUNCTIONS)   │ │ course.firestore│ │ federgolf      │  │
│  │ SD, HI, CourseHCP  │ │ .ts             │ │ .import.ts     │  │
│  │ PlayingHCP, ESR    │ │ handicap.       │ │ (admin only)   │  │
│  │ Soft/Hard Cap      │ │ firestore.ts    │ │                │  │
│  └────────────────────┘ └─────────────────┘ └────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│                   EXTERNAL SERVICES                               │
│  ┌────────────────────┐ ┌─────────────────┐ ┌────────────────┐  │
│  │   Firebase Auth    │ │  Firestore      │ │ Federgolf      │  │
│  │ (Custom claims for │ │ (golf_courses   │ │ (Italian Golf  │  │
│  │  admin role)       │ │  + subcollections│ │ Federation)    │  │
│  └────────────────────┘ └─────────────────┘ └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | File Location |
|-----------|---------------|--------------|
| **CourseAutocomplete** | Search golf courses by name (Firestore prefix query), display MUI Autocomplete, trigger CourseCreateDialog when not found | `src/components/Courses/CourseAutocomplete.component.tsx` |
| **CourseCreateDialog** | Form dialog for any authenticated user to create a new course in the public collection | `src/components/Courses/CourseCreateDialog.component.tsx` |
| **HandicapDisplay** | Read-only display of current HI, last 20 differentials, best 8 indicator | `src/components/Handicap/HandicapDisplay.component.tsx` |
| **HandicapTrend** | Chart showing HI history over time (line chart) | `src/components/Handicap/HandicapTrend.component.tsx` |
| **SimulatorForm** | Input form for hypothetical Stableford scores (course selection, per-hole points) | `src/components/Simulator/SimulatorForm.component.tsx` |
| **SimulatorResult** | Comparison card: "Current HI: 14.2 → Projected HI: 13.8" with breakdown | `src/components/Simulator/SimulatorResult.component.tsx` |
| **AdminCourseList** | Admin-only table listing all courses with edit/delete actions | `src/components/Admin/AdminCourseList.component.tsx` |
| **AdminCourseForm** | Admin-only form for adding/editing course details including teebox data | `src/components/Admin/AdminCourseForm.component.tsx` |
| **AdminImportButton** | One-click button triggering Federgolf course import | `src/components/Admin/AdminImportButton.component.tsx` |
| **ProtectedAdminRoute** | Wrapper checking `auth.token.admin === true` before rendering children | `src/pages/ProtectedAdminRoute.page.tsx` |

### Data Flow (Round Submission with Handicap Update)

```
User fills round form → CourseAutocomplete selects course → 
  Round saves to Firestore (existing flow) →
    On save success: calculateAdjustedGrossScore(holes, courseHCP) →
      calculateScoreDifferential(AGS, CR, SR, PCC=0) →
        Store SD on round document as `scoreDifferential` field →
          Recalculate HandicapIndex from last 20 rounds' SDs →
            Apply Soft/Hard Cap against lowHandicapIndex →
              Apply Exceptional Score Reduction if SD is 7.0+ below HI →
                Update player's handicapIndex cache in /handicap document
```

### Data Flow (Simulator)

```
User opens Simulator page → fetch last 20 rounds (real data) →
  User inputs hypothetical Stableford scores for new round →
    calculateAGSFromStableford(par, playingHCP, stablefordPts) →
      calculateScoreDifferential(...) →
        Build virtual array: [19 real SDs + 1 simulated SD] →
          calculateHandicapIndex(virtualSDs) →
            Display projected HI vs current HI →
              NO data is written to Firestore
```

## Firestore Data Model

### Collection: `golf_courses` (PUBLIC)

```typescript
// /golf_courses/{courseId}
interface GolfCourse {
  // Metadata
  name: string;                    // Full course name (e.g., "Golf Club Roma - Corso")
  slug: string;                    // URL-friendly unique name for lookups
  searchTokens: string[];          // Lowercased name fragments for prefix search
  
  // Location (optional but useful)
  city?: string;
  region?: string;
  country: string;                 // Default: "Italy"
  
  // Course details
  holesCount: number;              // 9 or 18 (default 18)
  tees: Teebox[];                  // Array of teebox configurations
  
  // Audit
  createdAt: Timestamp;
  createdBy: string;               // uid of user who created this
  updatedAt?: Timestamp;
  updatedBy?: string;
  
  // External reference
  federgolfId?: string;            // ID for Federgolf data source
}

interface Teebox {
  teeName: string;                 // "Gialli", "Bianchi", "Blu", etc.
  color: string;                   // Hex color for display
  par: number;                     // Total par (e.g., 72)
  courseRating: number;            // Course Rating (e.g., 71.5)
  slopeRating: number;             // Slope Rating (e.g., 130)
  totalYards?: number;             // Total length in yards
  holes: TeeboxHole[];             // Hole-by-hole data (18 or 9)
}

interface TeeboxHole {
  holeNumber: number;              // 1-18
  par: number;                     // 3, 4, or 5
  strokeIndex: number;             // Handicap stroke index (1-18)
  length: number;                  // Yards from this teebox
}
```

**Why public?** Courses are shared reference data. All authenticated users can read and create. Only admins can update/delete. This avoids data duplication.

### Collection: `players/{playerId}` (PRIVATE - owner only)

Existing structure augmented with handicap data:

```typescript
// /players/{playerId} (existing, with new fields)
interface PlayerDocument {
  // ... existing fields ...
  handicapIndex?: number;          // Cached current HI (computed, updated on new round)
  lowHandicapIndex?: number;      // Lowest HI in rolling 12 months (for caps)
  handicapLastUpdated?: Timestamp;
}
```

### Subcollection: `players/{playerId}/rounds/{roundId}` (PRIVATE - owner only)

Existing round documents get a new field:

```typescript
interface RoundDocument {
  // ... existing fields (course, date, totals, etc.) ...
  courseId?: string;               // Reference to golf_courses/{courseId}
  teeName?: string;                // Which teebox was played
  scoreDifferential?: number;      // Computed SD for this round (nullable for incomplete)
  adjustedGrossScore?: number;     // AGS after net double bogey adjustment
  courseHandicap?: number;         // HCP used for this round
  playingHandicap?: number;        // Playing HCP for the round
  pcc: number;                     // Always 0 (PCC deferred)
  exceptionalReduction?: number;   // -1.0 or -2.0 if ESR applied
}
```

**Why store SD on each round?** Enables recalculation of HI at any time from the round data itself. Avoids keeping a separate "score differentials" array that could get out of sync.

### Security Rules Pattern

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() && request.auth.token.admin == true;
    }

    // ── GOLF COURSES (public collection) ──
    match /golf_courses/{courseId} {
      allow read: if true;                          // Public read
      allow create: if isAuthenticated();            // Auth users can add
      allow update, delete: if isAdmin();            // Only admins modify
    }

    // ── PLAYER DATA (private, owner only) ──
    match /players/{playerId} {
      allow read, write: if isAuthenticated()
        && request.auth.uid == playerId;

      // Rounds subcollection
      match /rounds/{roundId} {
        allow read, write: if isAuthenticated()
          && request.auth.uid == playerId;
      }
    }
  }
}
```

**Key security decision for `golf_courses`:**
- `read: if true` — public read enables unauthenticated course lookups (though the app requires auth for everything else). Safest because course data is non-sensitive reference data.
- `create: if isAuthenticated()` — any logged-in user can add missing courses (per COURSE-03).
- `update, delete: if isAdmin()` — prevents data corruption by non-admin users.

There is currently NO `firestore.rules` file in the project — this must be created and deployed.

## WHS Calculation Engine

### Pure Function Pipeline

All calculations are pure functions with no side effects. Located in `src/utils/whs-calculator/`.

```typescript
// ─── Step 1: Adjusted Gross Score ───
// Applies net double bogey adjustment per hole
// For players without established HI: par + 5 max per hole
// Net Double Bogey = Par + 2 + handicapStrokesReceivedOnHole
function calculateAdjustedGrossScore(
  holes: { par: number; strokes: number; strokeIndex: number }[],
  courseHandicap: number,
  hasEstablishedHI: boolean
): number

// ─── Step 2: Score Differential ───
// (AGS - CR - PCC) × (113 / SR)
// Rounded to 1 decimal place
// PCC always 0 for now (deferred)
function calculateScoreDifferential(
  ags: number,
  courseRating: number,
  slopeRating: number,
  pcc: number = 0
): number

// ─── Step 3: Handicap Index ───
// Average of best 8 SDs from last 20 rounds
// Minimum rounds needed: 3
// Sliding scale for < 20 rounds (see WHS table below)
function calculateHandicapIndex(
  scoreDifferentials: number[],  // Array of computed SDs, newest first
  options?: { applyCap?: boolean; lowHandicapIndex?: number }
): number

// ─── Step 4: Course Handicap ───
// HI × (SR / 113) [England/Wales/Ireland]
// HI × (SR / 113) + (CR - Par) [Rest of World / USGA]
function calculateCourseHandicap(
  handicapIndex: number,
  slopeRating: number,
  courseRating: number,
  par: number,
  region: 'UKI' | 'RoW'
): number

// ─── Step 5: Playing Handicap ───
// Course Handicap × Allowance (0.95 for medal/stableford)
function calculatePlayingHandicap(
  courseHandicap: number,
  allowance: number
): number

// ─── Step 6: AGS from Stableford (for Simulator) ───
// AGS = Par + PlayingHandicap + (36 - StablefordPoints)
function calculateAGSFromStableford(
  par: number,
  playingHandicap: number,
  stablefordPoints: number
): number

// ─── Step 7: Soft Cap ───
// If increase > 3.0 above lowHI:
//   excess = newHI - lowHI - 3.0
//   capped = lowHI + 3.0 + (excess × 0.5)
function applySoftCap(newHI: number, lowHandicapIndex: number): number

// ─── Step 8: Hard Cap ───
// After soft cap, limit total increase to 5.0
function applyHardCap(newHI: number, lowHandicapIndex: number): number

// ─── Step 9: Exceptional Score Reduction ───
// If SD is 7.0-9.9 below HI: apply -1.0 to all last 20 SDs
// If SD is 10.0+ below HI: apply -2.0 to all last 20 SDs
function calculateExceptionalReduction(
  scoreDifferential: number,
  currentHandicapIndex: number
): number
```

### WHS Rounds-to-Differentials Table

| Rounds Available | Differentials Used | Adjustment |
|-----------------|-------------------|------------|
| 3 | Lowest 1 | -2.0 |
| 4 | Lowest 1 | -1.0 |
| 5 | Lowest 1 | None |
| 6 | Lowest 2 | -1.0 |
| 7-8 | Lowest 2 | None |
| 9-11 | Lowest 3 | None |
| 12-14 | Lowest 4 | None |
| 15-16 | Lowest 5 | None |
| 17-18 | Lowest 6 | None |
| 19 | Lowest 7 | None |
| 20 | Lowest 8 | × 0.96 |

### Validation Strategy

The calculation engine must be validated against known WHS examples before integration. The existing dev-tools pattern in `src/dev-tools/` should be extended:

```typescript
// Test cases (to be created in dev-tools/)
const testCases = [
  {
    label: 'USGA example: CR 73.5, SR 130, AGS 95',
    courseRating: 73.5,
    slopeRating: 130,
    ags: 95,
    expectedSD: 18.7,       // (95 - 73.5) × (113/130) = 18.688 → 18.7
    pcc: 0,
  },
  {
    label: 'Intelligent Golf example: CR 75.1, SR 132, AGS 85',
    courseRating: 75.1,
    slopeRating: 132,
    ags: 85,
    expectedSD: 8.5,         // (85 - 75.1) × (113/132) = 8.47 → 8.5
    pcc: 0,
  }
];
```

## State Management

### New Zustand Slices

Rather than bloating the existing 793-line `app.store.ts`, two focused slices should be created:

**Option A: Separate stores** (RECOMMENDED, follows single-responsibility)

```typescript
// src/store/zustand/handicap.store.ts
interface HandicapState {
  // Computed data
  currentHandicapIndex: number | null;
  lowHandicapIndex: number | null;
  last20Differentials: ScoreDifferentialEntry[];
  best8Differentials: ScoreDifferentialEntry[];
  isCalculating: boolean;
  lastCalculated: Timestamp | null;

  // Actions
  calculateDifferential: (round: RoundData, course: GolfCourse) => number;
  recalculateHandicapIndex: (playerId: string) => Promise<number>;
  getProjectedHandicap: (simulatedRound: SimulatedRound) => ProjectionResult;
}
```

```typescript
// src/store/zustand/admin.store.ts
interface AdminState {
  courses: GolfCourse[];
  isLoading: boolean;
  selectedCourse: GolfCourse | null;
  isImporting: boolean;
  importStatus: string | null;

  // Actions
  fetchAllCourses: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  importFromFedergolf: () => Promise<void>;
}
```

**Option B: Single store augmentation** — Add slices to the existing `useAppStore`. This is consistent with the existing pattern but adds to an already-large file.

**Recommendation:** Option A (separate stores) because:
1. The existing store is already 793 lines
2. Handicap state is computation-heavy and distinct from UI/form state
3. Admin state is ephemeral (no persist needed) and conceptually separate
4. Separate stores can be independently tested and maintained

### Integration Points with Existing Store

The existing `app.store.ts` method `saveNewRound()` must be "hooked" after round save to trigger handicap recalculation. This is a **sequence extension**:

```typescript
// In app.store.ts saveNewRound, after successful Firestore write:
// 1. Calculate AGS from the just-saved holes
// 2. Calculate SD using course CR/SR
// 3. Update the round document with scoreDifferential
// 4. Trigger handicapStore.recalculateHandicapIndex(playerId)

// This should be done as an async chain, NOT inline in app.store.ts
// to avoid further bloat. Use a hook or utility function:
import { recalculateAfterRoundSave } from '@/utils/handicap/handicap.utils';

// After batch write succeeds:
await recalculateAfterRoundSave(playerId);  // Updates round SD + recalculates HI
```

## Course Search (Autocomplete)

Firestore does NOT support full-text search natively in Standard edition. For course autocomplete, use prefix matching:

```typescript
// Prefix query pattern (works on standard Firestore)
const searchCourses = async (query: string): Promise<GolfCourse[]> => {
  if (query.length < 2) return [];

  const normalized = query.toLowerCase();
  const end = normalized.replace(/.$/, c =>
    String.fromCharCode(c.charCodeAt(0) + 1)
  );

  const snapshot = await db
    .collection('golf_courses')
    .where('slug', '>=', normalized)
    .where('slug', '<', end)
    .orderBy('slug')
    .limit(10)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GolfCourse));
};

// slug field: lowercased, whitespace-collapsed, no punctuation
// e.g., "Golf Club Roma - Corso" → "golf club roma corso"
```

**Why this works:** Course names are short strings with natural prefix patterns. Users type "golf club r" and get "golf club roma corso", "golf club roma - appia", etc. The dataset is modest (hundreds, not millions). This approach handles the 99% case on standard Firestore with zero additional cost.

**Firestore Enterprise upgrade path (if needed):** The new text search pipelines (announced GA April 2026) provide full-text search with relevance ranking via the `search()` pipeline stage, but require creating a new Enterprise-mode database.

## Admin Architecture

### Admin Identity Flow

```text
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Admin Script  │────▶│ Firebase Auth    │────▶│  Client App     │
│ (npm run      │     │ setCustomClaims() │     │  onAuthState    │
│  set-admin)   │     │ uid → {admin: true}│     │  Changed()      │
└──────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌──────────────────┐
                                              │  ProtectedAdmin   │
                                              │  Route checks     │
                                              │  user.token.admin │
                                              └──────────────────┘
```

### Setting Admin Claims

There is NO existing admin infrastructure. Admin claims must be set server-side. Two approaches:

**Recommended: Firebase Cloud Function with onCall trigger**
```typescript
// functions/src/index.ts
export const setAdminClaim = functions.https.onCall(async (data, context) => {
  // Only existing admins can promote others
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied', 'Only admins can assign admin roles'
    );
  }

  await admin.auth().setCustomUserClaims(data.uid, { admin: true });
  return { success: true };
});
```

**Fallback: npm script using Admin SDK**
```bash
# scripts/set-admin.ts (run locally, never in production)
npx ts-node scripts/set-admin.ts <user-email>
```

### Admin Route Protection

```typescript
// src/pages/ProtectedAdminRoute.page.tsx
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuth();  // Firebase user object

  if (!user) return <Navigate to="/login" />;

  // Force token refresh to get latest claims
  // (claims are cached in ID token for up to 1 hour)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    user.getIdTokenResult(true).then((tokenResult) => {
      setIsAdmin(tokenResult.claims.admin === true);
    });
  }, [user]);

  if (isAdmin === null) return <Spinner />;    // Checking
  if (!isAdmin) return <Navigate to="/" />;    // Denied
  return <>{children}</>;                       // Authorized
};
```

### Admin Routes in App.tsx

```typescript
// New routes to add
<Route path="/admin" element={
  <ProtectedAdminRoute>
    <AdminLayout />
  </ProtectedAdminRoute>
}>
  <Route index element={<AdminCoursesPage />} />
  <Route path="courses/new" element={<AdminCourseFormPage />} />
  <Route path="courses/:courseId/edit" element={<AdminCourseFormPage />} />
  <Route path="import" element={<AdminImportPage />} />
</Route>
```

## Build Order & Dependencies

```text
Phase 1: WHS Engine (pure functions)       → No dependencies on other phases
  ├─ Types (course.types.ts, handicap.types.ts)
  ├─ whs-calculator/ (SD, HI, CourseHCP, PlayingHCP, ESR, Caps)
  └─ Validation tests (against known WHS examples)

Phase 2: Course Database                    → Depends on Phase 1 types
  ├─ Firestore collection: golf_courses
  ├─ Firestore security rules (golf_courses rules)
  ├─ course.firestore.ts service
  ├─ CourseAutocomplete.component.tsx
  └─ CourseCreateDialog.component.tsx

Phase 3: Automated Handicap                 → Depends on Phase 1 + Phase 2
  ├─ Handicap calculation integration into round save flow
  ├─ handicap.firestore.ts (SD storage, HI caching)
  ├─ handicap.store.ts (Zustand slice)
  ├─ HandicapDisplay.component.tsx
  └─ Dashboard integration

Phase 4: Admin Panel                        → Depends on Phase 2
  ├─ Firebase custom claims (Cloud Function + script)
  ├─ ProtectedAdminRoute.page.tsx
  ├─ Admin route definitions in App.tsx
  ├─ admin.store.ts (Zustand, no persist)
  ├─ AdminCourseList.component.tsx
  ├─ AdminCourseForm.component.tsx
  └─ AdminImportButton.component.tsx

Phase 5: Handicap Simulator                 → Depends on Phase 1 + Phase 2 + Phase 3
  ├─ Simulator page (new route)
  ├─ SimulatorForm.component.tsx
  ├─ SimulatorResult.component.tsx
  ├─ Virtual score history logic
  └─ Projected HI vs current HI comparison
```

### Phase Ordering Rationale

1. **Phase 1 first** — Pure computation with no external deps. The WHS formulas are the core value and must be validated before anything else depends on them. Enables unit testing in isolation.

2. **Phase 2 second** — Course data is the prerequisite for meaningful handicap calculations. Without courses, there's no CR/SR to compute SDs. Also enables the CourseAutocomplete in the existing round entry flow.

3. **Phase 3 third** — Depends on courses being in the system and SD formula being validated. This is the "live" integration point that connects rounds → HI.

4. **Phase 4 fourth** — Admin panel could be built immediately after Phase 2, but it's lower priority than getting basic HI computation working. Admins can use the Firebase console in the interim.

5. **Phase 5 last** — The simulator is a differentiator but depends on all prior phases being stable. Users need to see their real HI before they care about simulating changes.

## New Files Summary

```
src/
├── pages/
│   ├── HandicapSimulator.page.tsx              # Phase 5
│   ├── AdminCourses.page.tsx                   # Phase 4
│   ├── AdminCourseForm.page.tsx                # Phase 4
│   ├── AdminImport.page.tsx                    # Phase 4
│   └── ProtectedAdminRoute.page.tsx            # Phase 4
│
├── components/
│   ├── Courses/
│   │   ├── CourseAutocomplete.component.tsx    # Phase 2
│   │   └── CourseCreateDialog.component.tsx    # Phase 2
│   ├── Handicap/
│   │   ├── HandicapDisplay.component.tsx       # Phase 3
│   │   └── HandicapTrend.component.tsx         # Phase 3
│   ├── Simulator/
│   │   ├── SimulatorForm.component.tsx         # Phase 5
│   │   └── SimulatorResult.component.tsx       # Phase 5
│   └── Admin/
│       ├── AdminCourseList.component.tsx       # Phase 4
│       ├── AdminCourseForm.component.tsx       # Phase 4
│       └── AdminImportButton.component.tsx     # Phase 4
│
├── store/zustand/
│   ├── handicap.store.ts                       # Phase 3
│   └── admin.store.ts                          # Phase 4
│
├── utils/
│   ├── whs-calculator/                         # Phase 1
│   │   ├── scoreDifferential.utils.ts
│   │   ├── handicapIndex.utils.ts
│   │   ├── courseHandicap.utils.ts
│   │   ├── exceptionalScore.utils.ts
│   │   ├── softHardCap.utils.ts
│   │   ├── stablefordConversion.utils.ts
│   │   ├── constants.ts
│   │   └── __tests__/
│   │       └── whs-calculator.test.ts
│   ├── firestore/
│   │   ├── course.firestore.ts                 # Phase 2
│   │   └── handicap.firestore.ts               # Phase 3
│   └── courses/
│       └── federgolf.import.ts                 # Phase 4
│
├── hooks/
│   ├── useCourseSearch.hook.ts                 # Phase 2
│   ├── useHandicapCalculation.hook.ts          # Phase 3
│   └── useAdminCourses.hook.ts                 # Phase 4
│
├── types/
│   ├── course.types.ts                         # Phase 1
│   └── handicap.types.ts                       # Phase 1
│
└── firestore.rules                             # Phase 2 (must be created & deployed)
```

## Integration Patterns

### Pattern 1: Hooking into Existing Round Save

The existing `saveNewRound()` in `app.store.ts` performs a batch write (round doc + holes subcollection). After any successful round save, handicap calculation must trigger. **Do not inline this into app.store.ts** — use a composable utility:

```typescript
// In app.store.ts -> saveNewRound(), after batch.commit():
try {
  await batch.commit();  // existing
  // NEW: trigger handicap recalculation (fire-and-forget, non-blocking)
  recalculateAfterRoundSave(playerId).catch(console.error);
} catch (error) {
  // existing error handling
}
```

```typescript
// src/utils/handicap/handicap.utils.ts
export async function recalculateAfterRoundSave(playerId: string): Promise<void> {
  // 1. Fetch the just-saved round (to get its courseId, holes, etc.)
  const savedRound = await getLatestRound(playerId);

  // 2. Fetch course data for CR/SR
  const course = await getCourse(savedRound.courseId);
  const teebox = course.tees.find(t => t.teeName === savedRound.teeName)!;

  // 3. Calculate AGS (net double bogey adjustment)
  const courseHandicap = calculateCourseHandicap(
    savedRound.handicapIndexUsed ?? 0, // previous HI
    teebox.slopeRating,
    teebox.courseRating,
    teebox.par,
    'RoW'
  );
  const ags = calculateAdjustedGrossScore(
    savedRound.holes.map(h => ({
      par: h.par,
      strokes: h.strokes,
      strokeIndex: h.strokeIndex,
    })),
    courseHandicap,
    !!savedRound.handicapIndexUsed
  );

  // 4. Calculate SD
  const sd = calculateScoreDifferential(ags, teebox.courseRating, teebox.slopeRating);

  // 5. Update round document with SD + AGS
  await updateRoundWithScoreDifferential(savedRound.id, sd, ags, courseHandicap);

  // 6. Recalculate HI from last 20 rounds
  const last20 = await getLast20RoundsWithDifferentials(playerId);
  const newHI = calculateHandicapIndex(last20.map(r => r.scoreDifferential!));

  // 7. Apply soft/hard cap
  const lowHI = await getLowHandicapIndex(playerId);
  const cappedHI = applyHardCap(applySoftCap(newHI, lowHI), lowHI);

  // 8. Update player's cached HI
  await updateHandicapIndexCache(playerId, cappedHI);
}
```

### Pattern 2: Simulator Virtual Array

The simulator creates a "what-if" array without mutating any data:

```typescript
export function getProjectedHandicap(
  last20Rounds: RoundData[],
  simulatedCourse: GolfCourse,
  simulatedStablefordPoints: number[],
  simulatedTeeName: string
): ProjectionResult {
  const currentDifferentials = last20Rounds
    .filter(r => r.scoreDifferential != null)
    .map(r => r.scoreDifferential!);

  // Calculate simulated SD
  const teebox = simulatedCourse.tees.find(t => t.teeName === simulatedTeeName)!;
  const parTotal = teebox.par;
  const currentHCP = last20Rounds[0]?.handicapIndexUsed ?? 0;
  const courseHCP = calculateCourseHandicap(currentHCP, teebox.slopeRating, teebox.courseRating, parTotal, 'RoW');
  const simAGS = calculateAGSFromStableford(parTotal, courseHCP,
    simulatedStablefordPoints.reduce((a, b) => a + b, 0));
  const simSD = calculateScoreDifferential(simAGS, teebox.courseRating, teebox.slopeRating);

  // Build virtual array: 19 most recent real SDs + 1 simulated SD
  const virtualDifferentials = [
    simSD,
    ...currentDifferentials.slice(0, 19),  // top 19 (excluding the oldest)
  ];

  const currentHI = calculateHandicapIndex(currentDifferentials);
  const projectedHI = calculateHandicapIndex(virtualDifferentials);

  return {
    currentHI,
    projectedHI,
    difference: +(projectedHI - currentHI).toFixed(1),
    simulatedSD: simSD,
    isImprovement: projectedHI < currentHI,
  };
}
```

## Anti-Patterns to Avoid

### 1. Firestore Query for Every Keystroke
**Problem:** Calling Firestore on every keystroke in the autocomplete field incurs read costs and latency.
**Solution:** Debounce the input (300ms minimum), cache results, and only query when the prefix changes significantly.

### 2. Storing Score Differentials as an Array on Player Document
**Problem:** A `last20differentials` array on the player document would require reading and rewriting the entire array on every round, creating contention.
**Solution:** Store SD on individual round documents and compute HI by querying the last 20 rounds. Cache only the computed HI value on the player document.

### 3. Inline Calculation in Store
**Problem:** Putting the WHS calculation logic inside Zustand store methods makes the store untestable and couples state management to computation.
**Solution:** Keep all calculations in pure functions in `utils/whs-calculator/`. The store only calls these functions.

### 4. Blocking the Round Save on Handicap Calculation
**Problem:** If handicap recalculation fails, the round should still be saved.
**Solution:** The handicap pipeline is fire-and-forget after the batch write commits. The round is saved regardless. HI computation failures are logged, not thrown.

### 5. Letting Non-Admins Set Custom Claims
**Problem:** Allowing `setCustomUserClaims` to be called from the client.
**Solution:** Custom claims must only be set from a Cloud Function (with an admin check) or a local admin script. Never expose the Admin SDK to the client.

## Sources

| Source | Type | Confidence | Used For |
|--------|------|-----------|----------|
| [USGA FAQ - Score Differential](https://www.usga.org/content/usga/home-page/handicapping/world-handicap-system/world-handicap-system-usga-golf-faqs/faqs---what-is-a-score-differential.html) | Official docs | HIGH | SD formula, AGS definition |
| [USGA FAQ - Max Hole Score](https://www.usga.org/content/usga/home-page/handicapping/world-handicap-system/world-handicap-system-usga-golf-faqs/faqs---what-is-the-maximum-hole-score-.html) | Official docs | HIGH | Net double bogey rule |
| [Intelligent Golf - WHS Calculations](https://www.intelligentgolf.co.uk/whs_calculations) | Industry reference | MEDIUM | Regional CH differences (UKI vs RoW) |
| [Golfnet.ie WHS Guide](https://www.golfnet.ie/whs) | Industry reference | MEDIUM | Rounds-to-differentials table, worked examples |
| [golf.okrasa.eu - Handicap Index](http://golf.okrasa.eu/language/en/handicap-en/whs-en) | Reference calculator | MEDIUM | Formula cross-validation |
| [Firebase Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims) | Official docs | HIGH | Admin identity architecture |
| [Firestore Security Rules & Auth](https://firebase.google.com/docs/rules/rules-and-auth) | Official docs | HIGH | Security rules patterns |
| [Firestore Text Search docs](https://firebase.google.com/docs/firestore/enterprise/text-search) | Official docs | HIGH | Enterprise text search (future upgrade) |
| [Firestore 'Next 26' Announcement](https://firebase.blog/posts/2026/04/firestore-pipelines-ga) | Official blog | HIGH | Pipeline ops GA + text search preview |
| [Firebase blog - Pipeline operations](https://firebase.blog/posts/2026/04/firestore-pipelines-ga) | Official blog | MEDIUM | Enterprise pipeline search capabilities |
| Existing codebase (`app.store.ts`, `App.tsx`) | Code analysis | HIGH | Integration points, existing patterns |

---

*Architecture analysis: 2026-05-31*
