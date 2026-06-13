# Wiki Index

## Project Overview
- [Project Overview](overview.md) — High-level synthesis of the project: what it does, stack, architecture, current state

## Concepts
- [Handicap Index](concepts/handicap-index.md) — WHS handicap calculation algorithm and rules
- [Stableford](concepts/stableford.md) — Stableford point scoring system
- [Score Differential](concepts/score-differential.md) — How score differentials are computed

## Architecture
- [System Overview](architecture/system-overview.md) — Layered architecture, component responsibilities
- [Data Flow](architecture/data-flow.md) — How data moves through the app (view round, save round, create round)
- [Firestore Schema](architecture/firestore-schema.md) — Database collections, documents, and subcollections
- [External Integrations](architecture/external-integrations.md) — Firebase Auth, Firestore, environment config

## Decisions
- [State Management (Zustand)](decisions/state-management.md) — Why Zustand over Redux, persist pattern
- [Store Splitting Plan](decisions/store-splitting.md) — Planned refactor from monolithic store to domain-specific stores
- [HCP Persistence Design](decisions/hcp-persistence.md) — Why `previousHCP` is stored per-round vs recomputed
- [History Tabs Consolidation](decisions/history-tabs.md) — Consolidating two history routes into one tabbed page

## Conventions
- [Coding Conventions](conventions/coding.md) — Naming patterns, code style, imports, error handling, component patterns
- [Testing Conventions](conventions/testing.md) — Test framework organization, custom calculation tests
- [Branch Strategy & Workflow](conventions/branch-strategy.md) — Git branching, PR workflow, commit conventions

## Features
- [Admin Panel](features/admin-panel.md) — Course & user management, MUI DataGrid, Federgolf course import
- [WHS Handicap Simulator](features/whs-simulator.md) — Project handicap impact of hypothetical rounds (no DB writes)
- [Initial HCP & Progression Chart](features/initial-hcp-progression.md) — User-supplied initial HCP, per-round HI/delta, chart anchored at initialHCP
- [Libraries Update (May 2026)](features/libraries-update.md) — Phased update of React 19, MUI 7, Firebase 12, etc.
- [Handicap History](features/handicap-history.md) — Remove 3-round minimum, last-20 table, HCP progression chart
- [Stableford History](features/stableford-history.md) — 6-column table, 3-line dual-axis chart
- [HCP Persistence & Backfill](features/hcp-persistence-backfill.md) — Store `previousHCP` + backfill for existing rounds
- [History Tabs](features/history-tabs.md) — Consolidate `/handicap-history` + `/stableford-history` into `/history?tab=`
- [All Rounds Pagination](features/all-rounds-pagination.md) — Replace 5-round cap with 20/page paginated list + filters
- [Drawer Active Route](features/drawer-active-route.md) — Highlight active nav item in the sidebar drawer
- [Import Rounds](features/import-rounds.md) — Bulk import Federgolf competition results from spreadsheets
- [Nightly AI Agent](features/nightly-ai-agent.md) — Two-agent nocturnal pipeline for wiki + test automation

## Patterns
- [Testing Patterns](patterns/testing.md) — Vitest configuration, custom test runner, step-by-step tester
- [Codebase Concerns](patterns/codebase-concerns.md) — Tech debt, known bugs, performance bottlenecks, security considerations

## Milestones

- [v1.0 MVP (SHIPPED)](../raw/milestones/v1.0-ROADMAP.md) — 5 phases, 12 plans, 21 requirements — shipped 2026-06-02
- [v2 (Planning)](../raw/milestones/v2-current.md) — Next milestone, scope being defined
- [v1.0 Full Requirements Traceability](../raw/milestones/v1.0-REQUIREMENTS.md) — Complete CALC/COURSE/ADMIN/SIM/NAV/IMPORT/HCP-INIT mapping

## Open Issues

- [#135 test:calc:quick per-hole expected values](raw/issues/135-test-calc-quick-expected-values.md) — `roundHoles` set to holeConfigs.length (3) instead of 18, corrupting Stableford calculation in quick test (resolved)
- [#137 import HCP chain anchored to initialHCP instead of currentHCP](raw/issues/137-import-hcp-chain-anchor.md) — Multi-batch import produces wrong `previousHCP`/`hcpDelta` on first round of each subsequent batch

## History (Changelog)
- [Libraries Update](history/2026-05-17-libraries-update.md) — May 2026: library version bumps + type error fixes
- [Handicap History Feature](history/2026-06-01-handicap-history.md) — June 1: HI calculation changes + new page
- [HCP Persistence](history/2026-06-03-hcp-persistence.md) — June 3: per-round previousHCP + backfill utility
- [Stableford History](history/2026-06-04-stableford-history.md) — June 4: new stableford page + drawer fixes
- [History Tabs](history/2026-06-04-history-tabs-refactor.md) — June 4: consolidate routes into /history with tabs
- [All Rounds Pagination](history/2026-06-05-all-rounds-pagination.md) — June 5: pagination + search on all-rounds page
- [Drawer Active Route](history/2026-06-05-drawer-active-route.md) — June 5: active-route highlighting in navigation drawer
