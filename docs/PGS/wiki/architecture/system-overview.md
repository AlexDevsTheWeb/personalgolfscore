---
title: System Architecture Overview
tags: [architecture]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md, STACK.md, STRUCTURE.md]
---

# System Architecture Overview

## Layer Diagram

```
┌──────────────────────────────────────────────────────────────┐
│              React 19 Application (src/App.tsx)               │
│        Router + Theme + Admin Guards + Localization           │
├──────────────────────────────────────────────────────────────┤
│  Pages Layer (src/pages/*.page.tsx)                           │
│  Dashboard | AllRounds | Statistics | Settings | Clubs        │
│  RoundsData | AddNewRound | History                           │
│  Simulator | ImportRounds | AdminCourses | AdminUsers         │
├──────────────────────────────────────────────────────────────┤
│  Components Layer (src/components/*/)                         │
│  Dashboard/ | Totals/ | NewRound/ | Rounds/ | Dialog/         │
│  Clubs/ | Statistics/ | Settings/ | LoginForm/ | Wizard/      │
│  Admin/ | Simulator/ | History/ | ImportRounds/               │
│  StablefordHistory/ | layout/                                 │
├──────────────────────────────────────────────────────────────┤
│  Hooks Layer (src/hooks/*.hook.ts)                            │
│  useHoleFormManager | useDialog | various dialog hooks        │
├──────────────────────────────────────────────────────────────┤
│  State Layer (src/store/zustand/)                             │
│  useAppStore (966 lines, Zustand + persist → localStorage)     │
├──────────────────────────────────────────────────────────────┤
│  Utils Layer (src/utils/)                                     │
│  calculator/ | whs/ | firestore/ | firebase/ | shots/          │
│  totals/ | stableford/ | links/ | round/                      │
├──────────────────────────────────────────────────────────────┤
│  Types Layer (src/types/*.types.ts)                           │
│  IShots | IRoundTotals | IBasicRoundData | IPlayerState        │
│  ICourse | ITeebox | IRoundDetails | IImportResult            │
├──────────────────────────────────────────────────────────────┤
│  External Services                                            │
│  Firebase Auth | Firebase Firestore | Firebase Storage         │
│  Federgolf (FIG) API (course import via axios)                │
└──────────────────────────────────────────────────────────────┘
```

## Key Components

| Component | Responsibility | Location |
|---|---|---|
| App.tsx | Root component, routing, theme setup | `src/App.tsx` |
| useAppStore | Global state management (Zustand) | `src/store/zustand/app.store.ts` |
| TotalsCalculator | Golf score/totals calculations | `src/utils/calculator/TotalsCalculator.utils.tsx` |
| whs.utils | WHS Score Differential (Rule 5.1) + Playing Handicap (D-09) | `src/utils/whs/whs.utils.tsx` |
| hi.utils | WHS Handicap Index (Rule 5.2a) with scaling + Projected HI | `src/utils/whs/hi.utils.tsx` |
| round.firestore | Round CRUD + WHS SD/HI on save + batch import | `src/utils/firestore/round.firestore.ts` |
| course.firestore | Course CRUD on `golf_courses` collection | `src/utils/firestore/course.firestore.ts` |
| player.firestore | Player profile/bag CRUD + admin `getAllPlayers` | `src/utils/firestore/player.firestore.ts` |
| federgolf-import.utils | FIG website course import via axios | `src/utils/firestore/federgolf-import.utils.ts` |
| backfillHcpHistory.utils | One-time HCP backfill for existing rounds | `src/utils/firestore/backfillHcpHistory.utils.ts` |
| shots.utils | Shot-level calculations (Stableford, GIR, putts) | `src/utils/shots/shots.utils.tsx` |
| stableford.utils | Stableford data extractors (points, net/gross) | `src/utils/stableford/stableford.utils.tsx` |
| Admin/CoursesTable | Admin course CRUD with MUI DataGrid + Federgolf import | `src/components/Admin/CoursesTable.component.tsx` |
| Admin/UsersTable | Admin user management + role toggle | `src/components/Admin/UsersTable.component.tsx` |
| Simulator | Full HCP simulator with ephemeral state projection | `src/components/Simulator/Simulator.component.tsx` |
| ImportRounds | Federgolf sheet import with preview table | `src/components/ImportRounds/ImportRounds.component.tsx` |

## Entry Points

- **Application**: `src/index.tsx` — `ReactDOM.createRoot`, `BrowserRouter`, renders `<App />`
- **Auth-gated routes**: `src/pages/ProtectedRoute.page.tsx` — redirects to `/login` if unauthenticated
- **Admin-gated routes**: `src/pages/AdminRoute.page.tsx` — redirects to `/dashboard` if not admin
- **Authentication**: `src/pages/Login.page.tsx`, `src/components/LoginForm/` — Google OAuth and Email/Password
- **Main layout**: `src/pages/SharedLayout.page.tsx` — DrawerAppBar with responsive sidebar + `<Outlet />`

## Routes

| Route | Page | Auth |
|---|---|---|
| `/login` | LoginPage | Public |
| `/` | DashboardPage | Protected |
| `/dashboard` | DashboardPage | Protected |
| `/clubs` | ClubsPage | Protected |
| `/all-rounds` | AllRounds | Protected |
| `/round/:roundID` | RoundsData | Protected |
| `/addNewRound` | AddNewRound | Protected |
| `/statistics` | Statistics | Protected |
| `/simulator` | SimulatorPage | Protected |
| `/history` | HistoryPage | Protected |
| `/import-rounds` | ImportRoundsPage | Protected |
| `/settings` | SettingsPage | Protected |
| `/admin/courses` | AdminCoursesPage | Admin only |
| `/admin/users` | AdminUsersPage | Admin only |
| `*` | ErrorPage | Public |

## Nav Links (Sidebar)

| # | Name | Icon | Visibility |
|---|---|---|---|
| 1 | Dashboard | HomeWorkIcon | Always |
| 2 | Clubs | SportsGolfIcon | Always |
| 5 | HCP Simulator | AutoGraphIcon | Always |
| 6 | History | TimelineIcon | Always |
| 7 | Import Rounds | FileUploadIcon | Always |
| 3 | Courses | GolfCourseIcon | Admin only |
| 4 | Users | PeopleIcon | Admin only |

## Architectural Constraints

- Single-threaded (React event loop)
- Single Zustand store instance (`useAppStore`) — 966 lines
- localStorage-only persistence (no session storage or cookies)
- Client-side routing only (react-router-dom v7)
- No SSR — Vite builds for browser only
- Admin auth: Firebase custom claims (`{ admin: true }`) + client-side `AdminRoute` guard + Firestore security rules
- WHS calculations: Pure-function modules in `src/utils/whs/` following official WHS Rules of Handicapping

## Related Pages

- [Data Flow](data-flow.md)
- [Firestore Schema](firestore-schema.md)
- [External Integrations](external-integrations.md)
- [Coding Conventions](../conventions/coding.md)
