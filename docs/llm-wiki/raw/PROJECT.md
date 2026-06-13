# Personal Golf Score — Handicap & Course Management

## What This Is

An integrated WHS (World Handicap System) handicap calculator and course database for the personalgolfscore app. Players can look up golf courses from a shared database, calculate their official handicap index from their rounds, simulate how future scores would affect their handicap, anchor the model to a user-supplied initial exact HCP value, and see a Handicap History chart that starts at the initial HCP and progresses through each round's recalculated index. Admins can manage course data including promote/revoke roles and import Federgolf competition results for verification.

## Core Value

Players can accurately calculate their WHS handicap index from their rounds, see how that index has progressed over time, and simulate how future scores would affect it.

## Requirements

### Validated (v1.0 MVP — shipped 2026-06-02)

All 21 v1 requirements shipped in v1.0. See `milestones/v1.0-REQUIREMENTS.md` for the full traceability table with phase mapping and outcomes.

**Course Database & Admin (Phase 1):**

- ✓ COURSE-01: Public `golf_courses` collection with security rules
- ✓ ADMIN-01: Admin identified via Firebase custom claims
- ✓ ADMIN-02: Admin routes protected at client + server levels
- ✓ ADMIN-03: Admin can CRUD golf courses via MUI DataGrid
- ✓ ADMIN-04: Admin can grant/revoke admin roles

**WHS Engine (Phase 2):**

- ✓ CALC-01: Score Differential per WHS Rule 5.1
- ✓ CALC-02: Handicap Index per WHS Rule 5.2a (with < 20 round scaling)
- ✓ SIM-01: Simulator tab with course/teebox selection
- ✓ SIM-02: Current vs projected HI comparison card
- ✓ SIM-03: Virtual array projection (no DB writes)

**Navigation (Phase 3):**

- ✓ NAV-01: Avatar is visual-only (no dropdown)
- ✓ NAV-02: Responsive sidebar (mobile=temp, desktop=persistent)
- ✓ NAV-03: Sidebar contains HCP, Settings, Logout
- ✓ NAV-04: Links filtered by `show` property and admin status
- ✓ NAV-05: No duplicate admin link rendering

**Import (Phase 4):**

- ✓ IMPORT-01: Federgolf result paste → parsed → preview table
- ✓ IMPORT-02: Imported rounds persist with SD; appear in all views

**Initial HCP & Progression (Phase 5):**

- ✓ HCP-INIT-01: Initial HCP input on Settings (persists + reappears)
- ✓ HCP-INIT-02: `saveNewRound` writes `handicapIndex` + `hcpDelta`
- ✓ HCP-INIT-03: `importRoundsBatch` per-round HI/delta loop
- ✓ HCP-INIT-04: Handicap History chart anchored at `initialHCP` with dashed reference line

### Active (v2 — next milestone candidates)

To be re-prioritized in the next milestone cycle via `/gsd-new-milestone`.

- [ ] **CALC-03**: New round submission automatically computes SD and updates HI (largely addressed by Phase 5; finalize after HCP-INIT stabilizes)
- [ ] **CALC-04**: Soft cap (excess above +3.0 cut to 50%) and hard cap (max +5.0 increase) per WHS Rule 5.7
- [ ] **CALC-05**: Exceptional Score Reduction (-1.0 or -2.0) when SD is 7.0+ below current HI per WHS Rule 5.8
- [ ] **COURSE-02**: Non-admin users can search courses via Autocomplete
- [ ] **COURSE-03**: User-created course dialog form
- [ ] **ROUND-01**: New round flow uses CourseAutocomplete
- [ ] **ROUND-02**: Inline HCP preview before final submission
- [ ] **ROUND-03**: User can modify calculation values during round entry
- [ ] **CALC-06**: Additional Handicap Index trend views (current chart covers baseline)
- [ ] **CALC-07**: Per-round SD and HI breakdown display
- [ ] **ADMIN-05**: Admin can import course data from Federgolf website via in-app button

### Out of Scope (unchanged from v1 definition)

- **PCC (Playing Conditions Calculation)** — Always set to 0; rarely applied and complex to implement. Deferred.
- **Automated scheduled Federgolf sync** — Import is manual/admin-triggered only. No cron jobs.
- **EGA/HCP transitions** — Only WHS (post-2020) supported. No legacy handicap conversion.
- **Mobile apps** — Web-only (the existing app target).
- **9-hole round combination** — 2024 WHS expected score method; can defer.
- **GPS rangefinder** — Impossible in web SPA with sub-meter accuracy.
- **Shot tracking / Strokes Gained** — Requires GPS or hardware sensors.
- **Tournament/competition scoring** — Separate product (Golf Genius territory).
- **Social features / friends feed** — Not core to handicap calculation.

## Context

Shipped v1.0 MVP on 2026-06-02 with 12 plans across 5 phases, 22,749 LOC TypeScript, 238 files in `src/`. The personalgolfscore app now has:

- Round tracking, statistics, and club management (pre-existing)
- **Course database with admin CRUD** (Phase 1)
- **WHS calculation engine + Simulator** (Phase 2)
- **Responsive sidebar navigation** (Phase 3)
- **Federgolf competition import** (Phase 4)
- **Initial HCP model + progression chart** (Phase 5)

Tech stack: Firebase Auth (custom claims) + Firestore, React 19, MUI v7, Zustand (with persist middleware, localStorage), TypeScript 6, Vite 8. Naming conventions: `*.page.tsx` for pages, `*.component.tsx` for components, `*.utils.tsx` for utilities, `*.types.ts` for types.

The handicap engine follows WHS rules: SD = (AGS - CR - PCC) × (113 / SR), HI = average of best 8 SDs from last 20 rounds, with Rule 5.2a scaling for fewer rounds. Course data comes from the Italian Golf Federation (Federgolf): https://www.federgolf.it/attivita-agonistica/servizi-online/tabella-slope-course-rating/

User feedback themes from v1.0 (informal):
- Initial HCP input UX validated; players want finer control over retroactive adjustments
- Progression chart widely used; requests for additional breakdowns (per-round SD, delta distribution)
- Federgolf import reduced manual entry significantly; requests for course-data import too

Known issues and technical debt:
- 4 Warnings (WR-01..04) and 3 Info notes from Phase 5 code review — non-blocking
- `Dashboard.page.tsx:24-30` `setRounds` workaround is now redundant after CR-01 fix — harmless, removal is a separate refactor
- `2024.X.Y` git tags from prior npm-version operations remain in the repo (cosmetic)

## Constraints

- **Tech stack**: Firebase Auth (custom claims), Firestore, React 19, MUI v7, Zustand, TypeScript 6, Vite 8
- **Firebase**: Must respect existing Firestore security rules patterns; new `golf_courses` collection needs proper rules
- **WHS Compliance**: Calculations must follow official WHS formulas precisely (validated against known examples)
- **Naming conventions**: Follow existing codebase patterns (`*.page.tsx`, `*.component.tsx`, `*.utils.tsx`, etc.)
- **Dev tools**: Custom golf calculation testing framework in `src/dev-tools/` (`npm run test:calc:*`)

## Key Decisions (v1.0)

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Firebase custom claims for admin | Native Firebase solution, no extra infra | ✓ Good — works seamlessly with Firestore rules |
| Manual + admin-button import for courses | Start pragmatic, add automation later | ✓ Good — manual import shipped in v1.0 |
| Both inline preview + dedicated simulator | Maximum flexibility for user | ✓ Good — Simulator shipped; inline preview deferred to v2 |
| Upgrade existing round entry flow | Single unified system, no parallel tracking | ✓ Good — Round flow integrated; ROUND-01..03 refinements deferred |
| Branching strategy: `none` (work on `development`) | OpenCode runtime has no worktree isolation | ✓ Worked — no merge friction; all 12 plans on one branch |
| Decimal phase numbering for gap closure (`05-3`) | Phase 5 had integration gaps after verification | ✓ Worked — gap-closure plan closed 3 CRs without polluting parent phase |
| `@mui/x-charts` v8 `ChartsReferenceLine` dispatcher | Index only re-exports the dispatcher; functionally equivalent to `ChartsYReferenceLine` | ✓ Good — fewer import paths, same behavior |
| Chart card lifted out of `roundsWithSD.length > 0` guard | D-14 case (initialHCP + 0 rounds) needs to render single point + reference line | ✓ Good — handled the edge case cleanly |
| Per-round writeBatch in `importRoundsBatch` | Running SDs + running HCP need sequential per-round computation | ✓ Good — clean D-09 implementation |
| Three-layer first-round guard (Alert + disabled button + throw) | Defense in depth — UI bypass surfaces as thrown error | ✓ Good — clear UX, robust logic |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-02 after v1.0 MVP milestone close*
