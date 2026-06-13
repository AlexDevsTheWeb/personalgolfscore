# Wiki Log

## [2026-06-13] ingest | .planning Milestone Archives to Wiki
- **Sources**: `.planning/milestones/v1.0-REQUIREMENTS.md`, `.planning/milestones/v1.0-ROADMAP.md`
- **Created**: `raw/milestones/v1.0-REQUIREMENTS.md`, `raw/milestones/v1.0-ROADMAP.md`, `raw/milestones/v2-current.md`
- **Updated**: `raw/MILESTONES.md` (added v2 section), `raw/ROADMAP.md` (v2 current focus), `wiki/index.md` (milestones section), `wiki/overview.md` (milestone status table)

## [2026-06-13] update | Strengthen Branch Rules + Read-Wiki-First Rule
- **Updated**: `wiki/conventions/branch-strategy.md` — explicit rule: "NEVER push directly to development/release/*/main"; added "Read the wiki" as step 0 in workflow
- **Updated**: `wiki/conventions/coding.md` — added "Before You Code" section: read wiki first to understand architecture, patterns, conventions, decisions

## [2026-06-13] update | Branch Strategy + Type Naming Conventions
- **Created**: `wiki/conventions/branch-strategy.md` — Branch naming, PR workflow, commit conventions from AGENTS.md + .planning/config.json
- **Updated**: `wiki/conventions/coding.md` — Added `I{Name}` / `T{Name}` prefix table, `.types.ts` file location convention
- **Updated**: `wiki/index.md` — Added branch-strategy entry to conventions section

## [2026-06-13] update | Codebase Scan — Wiki Sync
- **Trigger**: Full codebase scan to align wiki with actual project state
- **Updated**: `wiki/architecture/system-overview.md` (18 pages, 8 routes, 7 nav links, new utils: whs/stableford/firestore services, Admin/Simulator/History/ImportRounds components, store: 966 lines)
- **Updated**: `wiki/architecture/data-flow.md` (import rounds flow, simulator flow, initial HCP flow, save flow with WHS SD/HI)
- **Updated**: `wiki/architecture/firestore-schema.md` (added `golf_courses` collection, player fields `initialHCP`/`currentHCP`, round fields `handicapIndex`/`hcpDelta`/`previousHCP`/`scoreDifferential`, security rules, Federgolf import details)
- **Updated**: `wiki/architecture/external-integrations.md` (Firebase custom claims for admin, Federgolf FIG import via axios)
- **Updated**: `wiki/patterns/codebase-concerns.md` (store: 966 lines, added WR-01..04 deferred issues, security admin layers, import sequential batch perf note)
- **Created**: `wiki/features/admin-panel.md` — Course & user management with MUI DataGrid
- **Created**: `wiki/features/whs-simulator.md` — Ephemeral-state handicap simulator
- **Created**: `wiki/features/initial-hcp-progression.md` — Initial HCP input, per-round HI/delta, chart
- **Updated**: `wiki/overview.md` (v1.0 MVP summary, post-v1.0 additions, updated concerns)

## [2026-06-13] ingest | Initial Wiki Seed
- **Description**: First ingest of all existing project documentation into the wiki
- **Sources** (24 files from `raw/`):
  - Foundational: `ARCHITECTURE.md`, `STACK.md`, `STRUCTURE.md`, `CONVENTIONS.md`, `CONCERNS.md`, `INTEGRATIONS.md`, `TESTING.md`, `TYPE_ERRORS_FIX_PROGRESS.md`, `ZUSTAND_STORE_SPLITTING.md`
  - Specs (8): `2026-05-17-libraries-update-design.md`, `2026-06-01-handicap-history-feature-design.md`, `2026-06-01-import-rounds-verification-design.md`, `2026-06-03-hcp-history-persistence-design.md`, `2026-06-04-history-tabs-design.md`, `2026-06-04-stableford-history-design.md`, `2026-06-05-all-rounds-pagination-design.md`, `2026-06-05-drawer-active-route-design.md`
  - Plans (7): `2026-05-17-libraries-update-plan.md`, `2026-06-01-handicap-history-implementation.md`, `2026-06-03-hcp-history-persistence.md`, `2026-06-04-history-tabs.md`, `2026-06-04-stableford-history.md`, `2026-06-05-all-rounds-pagination.md`, `2026-06-05-drawer-active-route.md`
- **Created**: `wiki/overview.md`, `wiki/index.md`, plus all concept/architecture/decision/convention/feature/history/pattern pages (28 pages total)
- **Updated**: `OPENCODE.md` (schema file created prior to ingest)
