# Project Research Summary

**Project:** Personal Golf Score — Handicap & Course Management
**Domain:** WHS Golf Handicap Calculator & Course DB
**Researched:** 2026-05-31
**Confidence:** HIGH

## Executive Summary

This project adds WHS (World Handicap System) handicap calculation, a shared course database, and admin tooling to an existing golf round-tracking app. The core value proposition is giving players an accurate WHS Handicap Index computed from their rounds, plus a unique handicap simulator that lets them project how future scores would affect their index — a feature no major competitor offers as a dedicated tool. The target market is Italian golfers (via Federgolf course data), and the app is a web SPA built on React 19 + Firebase.

**The research recommends a zero-new-dependency approach.** The WHS formulas are mathematically simple and well-documented in the official Rules of Handicapping (2024). No existing npm package provides a TypeScript WHS calculator, so building a custom pure-function module is the correct path. The admin panel should reuse existing MUI + DataGrid (no FireCMS). Admin roles should use Firebase custom claims. The Federgolf course import uses the already-installed axios library for HTTP. This means the entire feature set can be delivered without adding a single new package to `package.json`.

**The key risks are WHS calculation edge cases and Firestore data integrity.** The critical pitfalls are: (1) using gross score instead of Adjusted Gross Score (must cap each hole at Net Double Bogey first), (2) incorrect rounding of negative Score Differentials (round toward zero, not away), (3) missing the sliding-scale table for players with fewer than 20 rounds, and (4) omitting soft/hard caps and Exceptional Score Reduction safeguards. On the Firestore side, the `golf_courses` collection needs strict security rules validation to prevent abuse, and the course autocomplete must be debounced to avoid excessive read costs. All four pitfalls have clear mitigations documented in the research.

## Key Findings

### Recommended Stack

**Zero new npm dependencies.** Everything needed is either already installed or will be built as custom TypeScript modules. This keeps the dependency footprint small and avoids version conflicts.

**Core technologies:**
- **React 19 + TypeScript 6 + Vite 8** — Already installed; provides the SPA foundation
- **MUI Core 7 + @mui/x-data-grid 8** — Already installed; reuse for admin CRUD tables (do NOT add FireCMS or React Admin)
- **Zustand 5** — Already installed with persist middleware; add two focused slices (`handicap.store.ts`, `admin.store.ts`) instead of bloating the existing 793-line `app.store.ts`
- **Firebase Auth + Firestore** — Already installed; use custom claims for admin roles (not Firestore role documents)
- **React Hook Form** — Already installed; reuse for course creation dialogs and admin forms
- **axios** — Already installed; use for Federgolf HTML import (no cheerio/jsdom needed — try DOMParser or regex first)
- **WHS Handicap Calculator** — Build custom pure-TypeScript module (`src/utils/whs-calculator/`). No npm package implements WHS rules as a standalone TS module. The formulas are well-documented in the official Rules of Handicapping and mathematically straightforward

**What NOT to use:**
- FireCMS (Tailwind conflicts with MUI theme; overkill for 2 admin views)
- `ghin` npm package (US-only GHIN API wrapper, not a calculation engine)
- TanStack Query / SWR (Zustand + direct Firestore SDK is sufficient)
- Cloud Functions for course import (can be done client-side with admin auth)
- cheerio/jsdom (heavy; try DOMParser or regex for Federgolf HTML parsing first)

### Expected Features

**Must have (table stakes — Ship 1):**
- **WHS Handicap Index calculation** — average of best 8 Score Differentials from last 20 rounds, with proper scaling for fewer rounds (WHS Rule 5.2a table)
- **Score Differential calculation** — `SD = (AGS - CR - PCC) × (113 / SR)` with Net Double Bogey adjustment on hole scores
- **Course database** (`golf_courses` Firestore collection) — stores name, PAR, CR, SR per teebox per gender
- **Course search autocomplete** — Firestore prefix query with debounce (300ms), 3-char minimum, client-side cache
- **Add course dialog** — inline within round entry flow for courses not found in autocomplete
- **Round entry flow** — course selection → teebox selection → Stableford or gross score input → inline handicap preview → save
- **Round history** — paginated list with SD and HI per round
- **Basic stats** — FIR%, GIR%, putts per round, scoring average vs par

**Should have (differentiators — Ship 2):**
- **Handicap Simulator** — dedicated tab for "what-if" projection; computes virtual array (last 19 real + 1 simulated) with no database writes. No major competitor offers this as a standalone feature — **key competitive moat**
- **Inline handicap preview** — shows "this round changes HI from X to Y" before saving
- **Admin course CRUD** — view, create, edit, delete courses via MUI DataGrid
- **Federgolf course import** — admin-button-triggered fetch + parse of Italian course data (essential for Italian market)
- **Handicap trend chart** — HI history over time
- **Soft/hard cap** — WHS safeguards limiting HI increase to +3.0 (soft) / +5.0 (hard) above lowest HI in 12 months
- **Exceptional Score Reduction** — automatic reduction when SD is 7.0+ below current HI

**Defer (Ship 3+):**
- 9-hole round combination (2024 WHS "expected score" method — different from pre-2024)
- Per-round HI impact breakdown (which rounds are in best 8)
- Course Handicap calculator helper tool

**Anti-features (deliberately excluded):**
- GPS rangefinder (impossible in web SPA with sub-meter accuracy)
- Shot tracking / Strokes Gained (requires GPS or hardware sensors)
- Tournament/competition scoring (separate product — Golf Genius territory)
- Social features / friends feed
- PCC (Playing Conditions Calculation — always 0 per scope decision)
- Native mobile apps (web-only per project scope)
- EGA/pre-WHS legacy handicap conversion

### Architecture Approach

The architecture follows a layered pattern: **Pages → Components → State (Zustand) → Utils/Services → External (Firebase, Federgolf)**. All WHS calculations are pure functions with zero side effects, located in `src/utils/whs-calculator/`. The course database is a single Firestore collection (`golf_courses`) with teeboxes modeled as nested maps within each document (not separate documents or subcollections). Admin identity flows through Firebase custom claims (`{ admin: true }` on the auth token) with Firestore Security Rules gating write operations.

**Major components:**
1. **WHS Calculation Engine** (Phase 1) — Pure functions for SD, HI, Course HCP, Playing HCP, Soft/Hard Cap, ESR, Stableford conversion. Located in `src/utils/whs-calculator/`. No external dependencies, fully testable
2. **Course Database Service** (Phase 2) — Firestore collection + `course.firestore.ts` service + `CourseAutocomplete` component with debounced prefix search + `CourseCreateDialog` for user-contributed courses
3. **Automated Handicap Pipeline** (Phase 3) — Hooks into existing `saveNewRound()` via fire-and-forget `recalculateAfterRoundSave()`. Stores SD on each round document (not a mutable array on player doc). Caches HI on player document
4. **Admin Panel** (Phase 4) — Protected routes checking `token.admin === true` + MUI DataGrid CRUD + Federgolf import button. Cloud Function or local script for setting custom claims
5. **Handicap Simulator** (Phase 5) — Virtual array computation (19 real SDs + 1 simulated). Pure functions only, no Firestore writes. `SimulatorForm` + `SimulatorResult` components
6. **Stats & Visualization** (Phase 6) — HI trend chart, FIR/GIR/putts breakdowns

**Key architectural decisions:**
- Separate Zustand stores for handicap and admin state (avoid bloating 793-line `app.store.ts`)
- Firestore `runTransaction` or `writeBatch` for round save atomicity
- Public `golf_courses` read (`allow read: if true`), authenticated create, admin-only update/delete
- No `firestore.rules` file exists yet — must be created and deployed in Phase 2
- Course autocomplete: prefix query on slug field, debounced 300ms, minimum 3 chars, limit 10

### Critical Pitfalls

1. **Gross Score vs Adjusted Gross Score (AGS)** — The #1 WHS mistake. Score Differential uses AGS, which requires capping each hole at Net Double Bogey (Par + 2 + handicap strokes received). For unestablished players, max is Par + 5. Without this, SD values are inflated and HI is wrong. **Prevention:** Implement `calculateAdjustedGrossScore()` that applies NDB per hole before any SD formula runs. Validate against official examples.

2. **Negative SD Rounding** — WHS Rule 5.1c specifies minus differentials round toward zero. `Math.round(-1.55)` in JavaScript gives `-1` (integer), which is wrong. `(-1.55).toFixed(1)` behavior varies by engine for `.5` boundary. **Prevention:** Implement custom `roundSD(value)` with explicit `.5` toward zero handling. Test with `-1.55 → -1.5`, `-1.56 → -1.6`.

3. **Best-8 from Wrong Set of 20** — Two errors: (a) not limiting to exactly 20 most recent rounds (by date, not worst), and (b) missing the WHS Rule 5.2a sliding scale for < 20 rounds (3 rounds = lowest 1 minus 2.0; 6 rounds = lowest 2 minus 1.0; etc.). **Prevention:** Implement the full table as a constant, maintain exactly 20 rounds capped by date, and unit test that a good round can *increase* HI (counterintuitive but correct when it displaces a better older SD).

4. **Missing Soft/Hard Cap and ESR** — After computing HI from best 8, WHS imposes: (a) soft cap (excess above +3.0 cut to 50%), (b) hard cap (total increase max +5.0), (c) Exceptional Score Reduction (-1.0 or -2.0 if SD is 7.0+ below HI). **Prevention:** Track `lowHandicapIndex` on player document with date. Always chain: raw HI → soft cap → hard cap → ESR check. Implement all three before calling HI "complete."

5. **Client-Only Admin Protection** — React route guards are cosmetic. A user with DevTools can bypass them. If Firestore Security Rules don't independently check `request.auth.token.admin == true`, any authenticated user can write to admin collections. **Prevention:** Always gate Firestore writes on `token.admin` in security rules. Route guards are UX-only. Admin Cloud Functions must verify `context.auth.token.admin === true` at entry.

6. **Course Autocomplete Firestore Costs** — Naive `onChange → query Firestore` on every keystroke causes high read costs and sluggish UX. **Prevention:** Debounce 300ms, minimum 3 characters, client-side cache in Zustand, limit 10 results, use Firestore prefix query on `slug` field.

7. **Public Course Write Without Validation** — `allow create: if request.auth != null` without data validation lets users create courses with PAR=999 or SR=1. **Prevention:** Firestore rules must validate `request.resource.data` types and ranges (PAR 27-77, SR 55-155, CR 27.0-80.0) and enforce `createdBy == request.auth.uid`. Consider rate limiting via Cloud Function.

## Implications for Roadmap

Based on the research, the feature dependencies (FEATURES.md §Feature Dependencies), the architecture build order (ARCHITECTURE.md §Build Order & Dependencies), and the pitfall mitigations (PITFALLS.md), the following 6-phase structure is recommended:

### Phase 1: WHS Calculation Engine
**Rationale:** Pure computation with zero external dependencies. The WHS formulas are the core value proposition and must be validated against official examples before anything else depends on them. Enables unit testing in complete isolation.
**Delivers:** Complete pure-function calculation library with full test coverage
**Addresses:** CALC-01 (SD calculation), CALC-02 (HI calculation), underlying formulas for ROUND-02 (inline preview) and SIM-01 (simulator)
**Avoids:** Pitfalls #1 (AGS vs gross), #2 (negative rounding), #3 (best-8/wrong window), #4 (caps/ESR), #5 (HI vs Course HCP), #15 (Stableford sign)
**New files:** `src/utils/whs-calculator/*` (9 utility files + test file), `src/types/course.types.ts`, `src/types/handicap.types.ts`
**Research flag:** **Skip research** — WHS formulas are well-documented in official 2024 Rules of Handicapping. Build test cases from the official rulebook examples.

### Phase 2: Course Database & Autocomplete
**Rationale:** Courses are the prerequisite for any meaningful handicap calculation. Without a populated course database with CR/SR/PAR per teebox, there's no way to compute Score Differentials. This phase also enables the CourseAutocomplete in the existing round entry flow, making the app immediately more useful.
**Delivers:** Shared course database with search, user-contributed courses, Firestore security rules
**Addresses:** COURSE-01 (golf_courses collection), COURSE-02 (autocomplete), COURSE-03 (user-created courses), ROUND-01 (course selection in round flow)
**Avoids:** Pitfalls #7 (unvalidated writes), #8 (duplicate courses), #12 (autocomplete costs), #13 (non-existent course UX), #16 (teebox modeling), #21 (loading/error states), #22 (teebox selection), #25 (index errors)
**New files:** `src/components/Courses/CourseAutocomplete.component.tsx`, `CourseCreateDialog.component.tsx`, `src/utils/firestore/course.firestore.ts`, `src/hooks/useCourseSearch.hook.ts`, `firestore.rules` (must be created — none exists yet)
**Research flag:** **Needs deeper research** for Federgolf import approach (which happens in Phase 4 but the data model must be ready now). The HTML parsing strategy (DOMParser vs regex vs light library) needs a spike. Also need to verify Firestore composite index creation flow.

### Phase 3: Automated Handicap Integration
**Rationale:** Depends on Phase 1 (validated formulas) and Phase 2 (course data). This is where "live" computation connects rounds to Handicap Index. The fire-and-forget pattern after round save ensures the round is never blocked by calculation failures.
**Delivers:** Automatic HI computation on every round save, inline handicap preview, cached HI on player profile
**Addresses:** CALC-03 (auto HI update on new round), ROUND-02 (inline HCP preview), ROUND-03 (modifiable calc values)
**Avoids:** Pitfalls #18 (non-atomic round save), #19 (edit/delete HI changes), #24 (date handling for 20-round window)
**New files:** `src/store/zustand/handicap.store.ts`, `src/utils/firestore/handicap.firestore.ts`, `src/hooks/useHandicapCalculation.hook.ts`, `src/components/Handicap/HandicapDisplay.component.tsx`, `src/utils/handicap/handicap.utils.ts`
**Research flag:** **Skip research** — Standard Firestore integration pattern. The key architectural decision (fire-and-forget, store SD on round doc, cache HI on player doc) is already validated.

### Phase 4: Admin Panel
**Rationale:** Enables Federgolf course import (critical for Italian market adoption) and course data quality management. Admins can fix errors, remove duplicates, and keep the database trustworthy. Could be built after Phase 2, but lower priority than getting basic HI computation working. Admins can use Firebase Console as interim.
**Delivers:** Admin route protection, course CRUD, Federgolf import, custom claims infrastructure
**Addresses:** ADMIN-01 (custom claims), ADMIN-02 (protected routes), ADMIN-03 (course CRUD), ADMIN-04 (Federgolf import)
**Avoids:** Pitfalls #10 (custom claims staleness), #11 (client-only protection), #20 (self-escalation), #26 (rate limiting)
**New files:** `src/pages/admin/*.page.tsx` (3 pages + route guard), `src/components/Admin/*.component.tsx` (3 components), `src/store/zustand/admin.store.ts`, `src/hooks/useAdminCourses.hook.ts`, `src/utils/federgolf/federgolf.import.ts`, `scripts/set-admin-claim.ts`, Cloud Function for admin promotion
**Research flag:** **Needs deeper research** for the custom claims propagation + token refresh pattern. The Doug Stevenson mirror pattern (Firestore doc + Cloud Function + client listener) needs to be designed. Also need to investigate whether a Cloud Function or local script is the right approach for initial admin bootstrap.

### Phase 5: Handicap Simulator
**Rationale:** The key competitive differentiator. Depends on all prior phases being stable — users need their real HI before they care about simulating changes. The pure-function virtual array approach ensures no data mutation risk.
**Delivers:** Dedicated Simulator tab with course/tee selection, hypothetical Stableford input, projected HI vs current HI comparison
**Addresses:** SIM-01 (simulator tab), SIM-02 (projected HI display), SIM-03 (virtual array, no writes)
**Avoids:** Pitfalls #14 (mutating real data — use structuredClone, no Firestore writes), #27 (client timestamp in virtual array)
**New files:** `src/pages/HandicapSimulator.page.tsx`, `src/components/Simulator/SimulatorForm.component.tsx`, `SimulatorResult.component.tsx`
**Research flag:** **Skip research** — Straightforward pure-function extension of the existing WHS engine. The virtual array pattern is well-defined.

### Phase 6: Statistics & Trend Visualization
**Rationale:** Enhancement layer on top of accumulated round data. Depends on having enough rounds tracked to make trends meaningful. Basic stats (FIR, GIR, putts) build on existing data; HI trend is new.
**Delivers:** HI trend line chart, expanded stat breakdowns
**Addresses:** Round history with SD/HI per round (ALREADY covered in Phase 3), handicap trend chart, basic stats enhancements
**New files:** `src/components/Handicap/HandicapTrend.component.tsx`, stat visualization components
**Research flag:** **Skip research** — Standard chart component work using MUI X-Charts or a lightweight chart library.

### Phase Ordering Rationale

1. **Phase 1 first** because WHS formulas are the core domain — must be validated in isolation before any integration
2. **Phase 2 second** because courses are prerequisite data for SD computation — no CR/SR = no meaningful handicap
3. **Phase 3 third** because it wires together rounds + courses + formulas — this is the "live" system
4. **Phase 4 fourth** because admin tooling (especially Federgolf import) is essential for data quality but lower priority than core computation working
5. **Phase 5 fifth** because simulator depends on stable HI computation and user understanding of their handicap
6. **Phase 6 last** because it's a pure enhancement layer that benefits from accumulated data and stable core

**Dependency graph:** Phase 1 → Phase 2 → Phase 3 → Phase 5 (and Phase 2 → Phase 4). Phases 4 and 5 can run in parallel after Phase 2 and 3 are stable.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Verified against existing codebase (package.json); zero new dependencies needed; all recommendations use proven Firebase patterns |
| Features | **HIGH** | Validated against 7 competitors (TheGrint, 18Birdies, GolfPad, MyEG, GHIN, Arccos, Golfshot) plus WHS rulebook; market gap for simulator is confirmed |
| Architecture | **HIGH** | WHS formulas from official Rules of Handicapping (2024); Firebase patterns from official docs; Firestore data model validated against real-world course data structures |
| Pitfalls | **HIGH** | WHS pitfalls from official rules + USGA FAQs; Firestore pitfalls from official docs + real-world post-mortems (Tea app hack); every mitigation has a concrete code-level solution |

**Overall confidence:** HIGH

### Gaps to Address

1. **No `firestore.rules` file exists in the project** — Must be created and deployed during Phase 2. The research provides the rule content; deployment via `firebase deploy --only firestore:rules` needs to be added to the workflow
2. **Federgolf HTML parsing strategy unproven** — The Federgolf page structure may change. The Phase 2/4 planning needs a spike to verify parsing works with current HTML. The fallback is manual CSV upload or admin data entry
3. **WHS validation test cases need creation** — The research references official WHS examples but the actual test cases aren't written. Phase 1 planning must include creating test data from the official Rules of Handicapping rulebook
4. **Firebase composite index for course search must be created** — The `slug >= prefix AND slug < end ORDER BY slug` query needs a composite index. Must be created before deployment
5. **Admin bootstrap script execution** — Someone with Firebase Admin SDK access (service account) needs to run the `set-admin-claim.ts` script. This is a one-time manual step that must be documented

## Sources

### Primary (HIGH confidence)
- **WHS Rules of Handicapping 2024** — USGA/R&A official rulebook. SD formula (Rule 5.1a), HI calculation (Rule 5.2a/b), Net Double Bogey (Rule 3.1), Soft/Hard Cap (Rule 5.7), Exceptional Score Reduction (Rule 5.8), 9-hole (Rule 5.1b)
- **USGA WHS FAQs** — Score Differential formula, PCC explanation, max hole score, 2024 revisions Q&A
- **Firebase Custom Claims docs** — Token-based admin identity pattern, 1000-byte limit, propagation behavior
- **Firestore Security Rules docs** — Role-based access patterns, rules-are-not-filters behavior, insecure patterns
- **Firestore Data Model docs** — Subcollections, document limits, nested data best practices
- **Firestore Enterprise Text Search docs** — Future upgrade path for full-text course search
- **Existing codebase** — `package.json` (verified all dependencies), `app.store.ts` (integration points), `App.tsx` (routing patterns)

### Secondary (MEDIUM confidence)
- **Intelligent Golf WHS Calculations** — UKI vs RoW Course Handicap formula differences
- **Golfnet.ie WHS Guide** — Rounds-to-differentials worked examples
- **ScoringZone WHS Common Mistakes** — Community-identified pitfalls (verified against official rules)
- **Doug Stevenson Custom Claims + Firestore Mirror** — Token propagation delay solution pattern
- **Competitor app analysis** — TheGrint, 18Birdies, GolfPad, MyEG, GHIN, Arccos feature lists (verified via live app stores and official websites)
- **Golf Insider / Golf Monthly app reviews** — Competitive landscape validation
- **CaddieHQ SD Calculation Guide** — NDB example verification

### Tertiary (LOW confidence)
- **Federgolf course data page** — HTML structure (may change; needs verification during planning)
- **Tea App post-mortem** — Client-only Firebase security failure (sourced from dev.to)
- **OpenSourceGolf data model** — Reference only, not used directly

---
*Research completed: 2026-05-31*
*Ready for roadmap: yes*
