# Milestones

## v1.0 MVP (Shipped: 2026-06-02)

**Phases completed:** 5 phases, 12 plans, ~36 tasks
**Branching strategy:** none
**Tag:** `v1.0`

**Key accomplishments:**

1. **Admin foundation (Phase 1, 3 plans):** Course data types (ICourse/ITeebox), Firestore CRUD service for `golf_courses`, getAllPlayers for admin user management, Firestore security rules with public read + admin-only write, `isAdmin` field on IPlayerDetails; AdminRoute guard, CoursesTable/UsersTable MUI DataGrids, CourseFormDialog with teebox management, ConfirmDeleteDialog, SnackbarProvider; admin pages, routes, nav integration, seed admin.

2. **WHS engine (Phase 2, 2 plans):** WHS Score Differential (Rule 5.1) and Handicap Index (Rule 5.2a scaling) pure calculation engine with projected HI support, SD storage integration on round save; full Handicap Simulator page with course/teebox selection, Stableford input, real-time current vs projected HI comparison — all in ephemeral state, no Firestore writes.

3. **Responsive navigation (Phase 3, 2 plans):** Avatar simplified to visual-only (no dropdown, no HCP/settings/logout); compact SidebarHCP badge with color-coded levels; sidebar drawer as primary hub on all screen sizes (temporary on mobile, persistent/toggleable on desktop); single admin block gated by `isAdmin`; SPA routing via RouterLink.

4. **Federgolf import (Phase 4, 2 plans):** CSV/TSV parser with auto-delimiter detection, Italian decimal handling, `Valida=N` filtering; course matcher; per-round writeBatch; ImportForm/PreviewTable/ImportResult UI components; route and nav link.

5. **Initial HCP model (Phase 5, 3 plans including 05-3 gap closure):** Settings input with strict validation; per-round `handicapIndex` and `hcpDelta` persisted to round document; first-round guard enforced at three layers; `currentHCP` snapshot updated on save and import; `importRoundsBatch` refactored to per-round HI/delta loop with running HCP.

6. **Progression chart (Phase 5):** `@mui/x-charts` LineChart anchored at `initialHCP` with dashed `ChartsReferenceLine`; D-11/D-14/D-15 fallback branches for legacy users and initial-only users; gap-closure plan closed three integration defects (CR-01 imported rounds refresh, CR-02 live WHS recalc fallback for legacy users, CR-03 chart no double-point at first round).

**Issues resolved:** 4 Warnings (WR-01..04) and 3 Info notes (IN-01..03) noted during Phase 5 code review — non-blocking. 3 Critical defects (CR-01..03) closed in plan 05-3 — verified end-to-end with full SC re-verification (5/5 SCs verified, no regressions).

**Issues deferred:** Loose equality (`==`) in `round.firestore.ts`, debug `console.log` in production, missing live WHS recalc fallback in `importRoundsBatch` for null `initialHCP`, missing in-batch duplicate detection, HCP-INIT scenarios not run by `runAllTests`, redundant `Dashboard.page.tsx:24-30` `setRounds` workaround.

**Stats:** 12 plans, ~36 tasks, 22,749 LOC TypeScript, 238 files in `src/`, 87 `feat()` commits, 314 total commits. Timeline: 2024-11-04 → 2026-06-02 (575 days).

For full milestone details, see:
- [`milestones/v1.0-ROADMAP.md`](milestones/v1.0-ROADMAP.md) — phase details and plans
- [`milestones/v1.0-REQUIREMENTS.md`](milestones/v1.0-REQUIREMENTS.md) — final requirements traceability (21/21 SHIPPED)

## v2 — Current (Planning)

**Status:** Planning — scope being defined

Deferred requirements from v1 being evaluated for inclusion:

- Course integration with round entry (COURSE-02, COURSE-03, ROUND-01..03)
- WHS soft/hard caps and Exceptional Score Reduction (CALC-04, CALC-05)
- Federgolf course import button (ADMIN-05)
- Expanded HI trend views (CALC-06, CALC-07)
- Technical debt: `round.firestore.ts` loose equality, debug console.log, missing live WHS recalc fallback, import duplicate detection

See [`milestones/v2-current.md`](milestones/v2-current.md) for current tracking.

---
