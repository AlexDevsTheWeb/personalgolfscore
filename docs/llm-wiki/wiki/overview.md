---
title: Personal Golf Score — Project Overview
tags: [project, overview]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md, STACK.md, STRUCTURE.md, CONVENTIONS.md]
---

# Personal Golf Score — Project Overview

A React 19 + Firebase golf tracking app for recording rounds, calculating WHS handicap indexes, and analyzing performance through charts and statistics.

## What It Does

- **Round tracking** — enter per-hole shot data (strokes, putts, GIR, fairways, penalties, club distances) and save rounds to Firestore
- **WHS Handicap Index** — calculates official World Handicap System handicap index from score differentials, using the correct scaling table (best N of last 20)
- **Handicap history** — view your HI progression over time with a table of the last 20 rounds and a line chart
- **Stableford history** — track Stableford points, net vs par, and gross vs par trends
- **Golf bag management** — manage clubs with distances for each club
- **Dashboard** — charts for score trends, GIR, fairways, putts, par averages, and points
- **Import rounds** — bulk-import Federgolf/FIG competition results from a Google Sheet for handicap verification

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TypeScript 6 |
| Routing | React Router DOM 7 |
| UI | MUI 7 (Material-UI), @mui/x-charts, @mui/x-data-grid, @mui/x-date-pickers |
| State | Zustand 5 with persist middleware (localStorage) |
| Backend | Firebase Auth (Google OAuth, Email/Password), Firestore |
| Build | Vite 8, SWC |
| Forms | React Hook Form 7 |
| Testing | Vitest 4, custom golf calc test framework (`src/dev-tools/`) |
| Utilities | axios, dayjs, lodash, deepmerge |

## Architecture

The app follows a layered SPA architecture:
- **Pages** layer — route handlers in `src/pages/*.page.tsx`
- **Components** layer — reusable UI in `src/components/*/`
- **Hooks** layer — encapsulated logic in `src/hooks/*.hook.ts`
- **State** layer — single Zustand store (`useAppStore`) persisted to localStorage
- **Utils** layer — pure functions, Firestore services, calculations
- **Types** layer — TypeScript interfaces in `src/types/*.types.ts`

## Key Domain Concepts

- **WHS Handicap Index** — calculated from the best N score differentials out of the last 20 (or fewer), where N depends on the number of available rounds per the WHS scaling table
- **Score Differential** — `(AGS - CR) × 113 / SR` where AGS = adjusted gross score, CR = course rating, SR = slope rating
- **Stableford** — points awarded per hole based on strokes relative to par and playing handicap
- **GIR** (Green in Regulation) — hitting the green in par minus 2 strokes or fewer
- **Scramble** — making par or better after missing GIR
- **Up & Down** — getting up and down from off the green

## Current State (June 2026)

The project shipped **v1.0 MVP** on 2026-06-02 covering 5 phases (12 plans, 21 requirements):
- Phase 1: Course database + admin panel (Firestore `golf_courses`, admin CRUD, user role management)
- Phase 2: WHS calculation engine + handicap simulator (Score Differential, Handicap Index, ephemeral simulator)
- Phase 3: Navigation reorg (responsive sidebar, visual-only avatar, de-duplicated admin links)
- Phase 4: Import rounds (Federgolf CSV/TSV import with course matching)
- Phase 5: Initial HCP model + progression chart (per-round HI/delta, `@mui/x-charts` chart anchored at initialHCP)

Post-v1.0 additions:
- History tabs consolidation (`/history?tab=handicap|stableford`)
- All-rounds pagination (20/page) + date/course search
- Drawer active-route highlighting
- Release automation (v1.1, SemVer tags)
- Dashboard score chart dual-axis fix + migration script

**Known concerns** — Large monolithic Zustand store (966 lines), theme fragmentation, generic `any` types, no error boundaries, no E2E tests, deferred WHS soft/hard caps (CALC-04/05), missing live WHS recalc fallback for legacy users.

## Milestone Status

| Milestone | Status | Date |
|-----------|--------|------|
| [v1.0 MVP](../raw/milestones/v1.0-ROADMAP.md) | ✅ SHIPPED | 2026-06-02 |
| [v2](../raw/milestones/v2-current.md) | 🔄 Planning | — |

Full v1 requirements traceability: [`v1.0-REQUIREMENTS.md`](../raw/milestones/v1.0-REQUIREMENTS.md)

## Related Pages

- [Architecture Overview](../architecture/system-overview.md)
- [Coding Conventions](../conventions/coding.md)
- [Handicap Index](../concepts/handicap-index.md)
- [Stableford](../concepts/stableford.md)
- [Testing Patterns](../patterns/testing.md)
- [Codebase Concerns](../patterns/codebase-concerns.md)
