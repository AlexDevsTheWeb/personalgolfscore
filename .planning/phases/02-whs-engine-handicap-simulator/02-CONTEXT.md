# Phase 2: WHS Engine & Handicap Simulator - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a WHS-compliant Score Differential and Handicap Index calculation engine (pure calculation functions), plus a dedicated Simulator page where players can select a course/teebox, enter total Stableford points for a hypothetical round, and see the projected impact on their Handicap Index without saving anything to the database.

This phase does NOT include automatic SD computation on real round save (CALC-03 — deferred to v2), course search for non-admin users (COURSE-02/03 — v2), round entry course integration (ROUND-01/02/03 — v2), or Federgolf import (ADMIN-05 — v2).

</domain>

<decisions>
## Implementation Decisions

### WHS Engine Organization
- **D-01:** New `src/utils/whs/` directory with two files:
  - `whs.utils.tsx` — Score Differential calculation: `(AGS - CR - PCC) × (113 / SR)` where `AGS = PAR + Playing HCP + (36 - Stableford points)` and PCC is always 0
  - `hi.utils.tsx` — Handicap Index calculation: average of best 8 SDs from last 20 rounds, with proper scaling for fewer rounds per WHS Rule 5.2a
- **D-02:** Follow the same pattern as `TotalsCalculator.utils.tsx` — typed Props interface, pure function, typed return, safe math via existing `safeDivide`

### Score Differential Storage
- **D-03:** Score Differential stored on each round document at save time. Add `scoreDifferential: number | null` field to the Firestore round document schema. Computed during `saveNewRound()` using course/tee data from the round.
- **D-04:** Current Handicap Index calculated on-the-fly from stored SDs (never stored as a single persisted value — recomputed from the SD list when needed).

### Simulator Page
- **D-05:** New page at `/simulator` — added as a top-level nav item in DrawerAppBar
- **D-06:** Input form: select course from `golf_courses` collection → select teebox → enter total Stableford points for the round (single number, not per-hole). No hole-by-hole entry.
- **D-07:** Results display: numbers + breakdown card showing current HI, projected HI, delta (+/-), the simulated Score Differential, and a summary of how it affects the best-8 calculation
- **D-08:** Simulator operates entirely in local/transient state — no Firestore writes (SIM-03)

### Playing Handicap for Simulator
- **D-09:** Auto-calculated using standard WHS formula: `Playing HCP = HI × (SR / 113) + (CR - PAR)`
- **D-10:** Auto-calculated value is shown as a default — user can override with manual input

### the agent's Discretion
- Simulator UI layout details (card placement, form layout) — planner flexes within MUI patterns
- How the "best-8 breakdown" is visualized (chart? table? MUI x-chart?)
- Whether simulator state is Zustand (transient) or React component state
- Nav icon and label text for the Simulator nav item
- Error/edge case UI (no rounds yet? fewer than 20 rounds?)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Scope
- `.planning/REQUIREMENTS.md` — CALC-01, CALC-02, SIM-01, SIM-02, SIM-03 requirements
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria (5 items), dependencies on Phase 1
- `.planning/phases/01-course-database-admin-foundation/01-CONTEXT.md` — Prior decisions: admin infra, course data model (ICourse/ITeebox with courseRating, slopeRating)

### Codebase Patterns (must follow)
- `src/types/course.types.tsx` — ICourse, ITeebox interfaces (courseRating and slopeRating already defined)
- `src/utils/calculator/TotalsCalculator.utils.tsx` — Calculation function pattern (typed props, pure function, typed return)
- `src/store/zustand/app.store.ts` — Zustand store pattern for new state slices
- `src/utils/firestore/round.firestore.ts` — Firestore service pattern; `saveNewRound()` for SD storage integration point
- `src/types/round.types.tsx` and `src/types/roundData.types.tsx` — Round document types (will need `scoreDifferential` field)
- `src/types/player.types.tsx` — IPlayerDetails (has `HCP` field — raw user-entered value, not WHS HI)
- `src/pages/AddNewRound.page.tsx` — Reference for round entry flow (not reused for simulator per decision)
- `src/components/common/header/` — DrawerAppBar (where Simulator nav item will be added)
- `src/App.tsx` — Route definition pattern
- `src/utils/calculator/math.utils.tsx` — `safeDivide` utility for safe math

### Test Infrastructure
- `src/dev-tools/testRunner.ts` — Test orchestrator to extend for WHS calculations
- `src/dev-tools/testDataGenerator.ts` — Test data generation pattern (add WHS scenarios)
- `src/dev-tools/edgeCaseTests.ts` — Edge case testing pattern (add WHS edge cases)

### WHS Formula Reference
- WHS Rule 5.1: Score Differential = (AGS - CR - PCC) × (113 / SR), PCC = 0 always
- WHS Rule 5.2a: Handicap Index = average of best 8 SDs from last 20 rounds; scaling for fewer rounds
- AGS from Stableford: AGS = PAR + Playing HCP + (36 - Stableford points)
- Playing HCP from HI: Playing HCP = HI × (SR / 113) + (CR - PAR)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`ICourse` / `ITeebox`** (`src/types/course.types.tsx`) — courseRating and slopeRating already exist on teeboxes; simulator course selection reuses `getCourses` from `course.firestore.ts`
- **`TotalsCalculator.utils.tsx` pattern** — blueprint for WHS calculation functions (typed props, pure functions, safe divide)
- **`safeDivide`** (`src/utils/calculator/math.utils.tsx`) — guards against NaN/Infinity in WHS calculations
- **Dev-tools test infrastructure** (`src/dev-tools/`) — extend `TestDataGenerator` with WHS scenarios, `TestInspector` with WHS validation rules
- **`drawerAppBar`** — existing nav component; add Simulator nav item following the admin links pattern from Phase 1

### Established Patterns
- Calculation functions in `src/utils/` with named exports and typed return values
- Zustand persist for state that survives refresh (HI cache, simulator transient state)
- Firestore services in `src/utils/firestore/*.ts` with async try-catch
- Pages in `src/pages/*.page.tsx`, routed in `src/App.tsx`
- Admin route from Phase 1 shows how to add conditional nav items

### Integration Points
- **Route tree** in `src/App.tsx` — add `/simulator` route under existing `/` layout
- **DrawerAppBar** — add Simulator nav item (top-level, always visible)
- **Zustand store** — add simulator state slice (course selection, stableford input, results) and HI helper action
- **`round.firestore.ts`** — add `scoreDifferential` computation inside `saveNewRound()` (or via a new function called during save)
- **Course Firestore service** (`src/utils/firestore/course.firestore.ts`) — simulator reads courses for selection

</code_context>

<specifics>
## Specific Ideas

- Simulator is a simple form: course dropdown → teebox dropdown → Stableford points input → results card updates
- Results card shows current HI, projected HI, delta with +/- sign, simulated SD value, and a mini list showing the best-8 SDs (current vs projected)
- Playing HCP auto-fills from HI + teebox data, with an edit button to override
- Nav item labeled "Simulator" (or "Simula" if space is tight) with a calculate/forecast icon

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-WHS-Engine-Handicap-Simulator*
*Context gathered: 2026-06-01*
