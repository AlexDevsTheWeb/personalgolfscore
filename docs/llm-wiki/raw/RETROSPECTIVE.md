# Retrospective

## Milestone: v1.0 — MVP (Personal Golf Score — Handicap & Course Management)

**Shipped:** 2026-06-02
**Phases:** 5 | **Plans:** 12 | **Tasks:** ~36

### What Was Built

Five phases delivered end-to-end, each producing a verifiable vertical slice:

1. **Admin foundation (Phase 1, 3 plans)** — Course database + admin auth + MUI DataGrid UI
2. **WHS engine (Phase 2, 2 plans)** — Pure-function SD/HI calculations + Simulator with no DB writes
3. **Responsive navigation (Phase 3, 2 plans)** — Sidebar-first shell, visual-only avatar, admin link gating
4. **Federgolf import (Phase 4, 2 plans)** — CSV/TSV parser with Italian decimal handling + preview table
5. **Initial HCP model + progression chart (Phase 5, 3 plans including 05-3 gap closure)** — Settings input, per-round HI/delta, chart anchored at `initialHCP` with dashed reference line

### What Worked

- **Vertical-slice phasing** with concrete success criteria kept each phase focused and verifiable
- **Custom `test:calc` framework** (`src/dev-tools/`) caught calculation issues early; HCP-INIT scenarios added in Phase 5 extension
- **Decimal phase numbering for gap closure** (`05-3-PLAN.md`) cleanly separated post-verification fixes from the parent phase — no version churn, clear "INSERTED" semantics in ROADMAP
- **Three-layer first-round guard** (UX alert + disabled button + logic throw) — defense in depth proved valuable when programmatic calls bypassed the UI
- **`AdminRoute` composable after `ProtectedRoute`** — clean separation between authentication and authorization concerns
- **Per-round `writeBatch` in `importRoundsBatch`** — running SDs + running HCP need sequential computation; batch-per-round keeps the UI responsive while preserving order
- **Verifier-driven gap closure** — running `gsd-verifier` after each phase surfaced integration defects that unit tests would have missed (CR-01, CR-02, CR-03 all integration-level)
- **Plan 05-3 gap closure** — three small targeted fixes (3 files, +34/-12 lines) closed all 3 CRs without scope creep

### What Was Inefficient

- **Phase 5 verification revealed 3 critical integration gaps** that should have been caught during plan execution — the store's `getPlayerDetails` not refreshing `roundsList` (CR-01), the `previousHCP` chain missing live WHS recalc fallback (CR-02), and the chart's double-push at first round's date (CR-03) were all integration-level defects visible from the existing code but missed by plan review
- **REQUIREMENTS.md traceability table was stale** for Phases 1 and 4 — Phase completion didn't update the checkboxes or traceability rows, requiring a manual fix in the v1.0 archive
- **ROADMAP.md Phase 2 plan list** had a copy-paste error showing Phase 5's plans (05-01, 05-02, 05-3) under Phase 2; corrected in the archive
- **Code review and verification were run as separate post-execution steps** — combining them (or running review as part of plan execution) would have surfaced the 3 CRs before phase close
- **`Dashboard.page.tsx:24-30` workaround** for the missing `setRounds` in `getPlayerDetails` was preserved as a "harmless redundancy" — should have been a signal to fix the root cause earlier
- **gsd-sdk's `roadmap.analyze` only saw Phases 1 and 2** (not 3-5) — the tool's ROADMAP parser doesn't recognize all phase formats; manual archive work was needed to include all 5 phases

### Patterns Established

- **`*.utils.ts(x)` for pure calculations**, **`*.component.tsx` for React components**, **`*.page.tsx` for routes**, **`*.types.ts(x)` for types** — naming convention stayed consistent across all 5 phases
- **Defense in depth for state guards** (UI + handler + logic) — established by the first-round guard, reusable pattern
- **Per-round `writeBatch` for ordered multi-doc writes** — `importRoundsBatch` pattern, also useful for any "running state" import scenario
- **Function-form `set((state) => ({...}))` when reading current state** — established by CR-01 fix in `getPlayerDetails`; clearer than multiple `set` calls
- **D-11 / D-14 / D-15 branch pattern for chart fallbacks** — explicit branch per data state, no implicit assumptions
- **`grep` verification in plan acceptance criteria** — caught the CR-01/02/03 root causes during plan review of fix tasks

### Key Lessons

- **Run integration verification, not just per-plan verification** — the 3 CRs in Phase 5 were all integration-level (chart + store + firestore interaction). Unit-level plan review missed them
- **Treat workarounds in production code as bugs** — `Dashboard.page.tsx:24-30` `setRounds` call was a clear signal that `getPlayerDetails` was incomplete
- **Update traceability tables when phases complete** — automation or checklist needed; stale traceability hides real coverage
- **ROADMAP parser limitations in tools** — if the tool can't see all phases, fall back to manual archive assembly with all 5 phases documented
- **Decimal phase numbering for gap closure** worked well — keep this pattern for post-verification fixes
- **`handoff prose is sufficient`** — Phase 5 verification revealed 3 fixes; `05-3-PLAN.md` was ~300 lines and worked without re-deriving context
- **First-round guard is a recurring pattern** — WHS model anchors at initial HCP; subsequent rounds compute delta. Will likely repeat for v2 (CALC-04/05 caps)
- **All warnings + info notes (4 + 3) from Phase 5 review were non-blocking** — they accumulated to real tech debt but didn't break the milestone. Address in v2 housekeeping phase

### Cost Observations

- **Model mix**: 100% sonnet (per `executor_model: sonnet, verifier_model: sonnet` in config)
- **Sessions**: Multiple (no precise count; STATE.md shows "Last session: 2026-06-02T08:06:23.502Z" as the most recent checkpoint)
- **Notable efficiency observation**: Phase 5 took longer than other phases (2 plans + 1 gap closure vs. 2 plans for similar-sized work) due to the gap-closure cycle; consider running integration verification before phase close in v2 to avoid this

---

## Cross-Milestone Trends

_Table populated as additional milestones complete._

| Milestone | Phases | Plans | Tasks | Warnings Carried | Criticals Closed | LOC Δ |
|-----------|--------|-------|-------|------------------|------------------|-------|
| v1.0 MVP  | 5      | 12    | ~36   | 4                | 3                | +N/A  |
