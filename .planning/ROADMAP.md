# Roadmap: Personal Golf Score — Handicap & Course Management

## Overview

This roadmap delivers WHS (World Handicap System) handicap calculation, a shared golf course database, and admin tooling to the existing round-tracking app, plus a unique handicap simulator that lets players project how future scores would affect their index. The work is split into two vertical slices: first the administrative foundation (course database + admin panel), then the player-facing calculation engine (WHS formulas + simulator).

## Phases

- [x] **Phase 1: Course Database & Admin Foundation** - Admin authentication, route protection, golf course CRUD, and the public `golf_courses` collection (completed 2026-05-31)
- [x] **Phase 2: WHS Engine & Handicap Simulator** - WHS Score Differential and Handicap Index calculation engine plus a dedicated Simulator with course/teebox selection and projected HI display (completed 2026-06-01)
- [x] **Phase 3: Navigation & Sidebar Reorg** - Move Avatar menu (HCP, settings, logout) to sidebar; fix admin link visibility; make sidebar responsive across all screen sizes (completed 2026-06-01)
- [ ] **Phase 4: Import Rounds Verification** - Import Federgolf competition results via clipboard paste, match courses, save as real rounds in Firestore for handicap verification (pending)

## Phase Details

### Phase 1: Course Database & Admin Foundation

**Goal**: Establish course database infrastructure with admin management
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: COURSE-01, ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04
**Success Criteria** (what must be TRUE):

  1. Admin users can access admin-only pages; non-admin users are redirected away from admin routes
  2. Admin can view a list of golf courses, create new courses, edit existing courses, and delete courses via the admin interface
  3. Admin can promote other users to the admin role and revoke admin access
  4. A public `golf_courses` Firestore collection stores course data (name, PAR, CR, SR per teebox) with proper security rules — public read, authenticated create, admin-only update/delete

**Plans**: 3 plans
**UI hint**: yes

Plans:

- [x] 01-01-PLAN.md — Foundation: types, Firestore service, security rules (Wave 1)
- [x] 01-02-PLAN.md — Admin UI Components: AdminRoute, DataGrids, dialogs, snackbar (Wave 2)
- [x] 01-03-PLAN.md — Page Integration: admin pages, routes, nav, seed admin (Wave 3)

### Phase 2: WHS Engine & Handicap Simulator

**Goal**: Enable players to calculate their WHS Handicap Index and simulate future scores
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: CALC-01, CALC-02, SIM-01, SIM-02, SIM-03
**Success Criteria** (what must be TRUE):

  1. User can navigate to the Simulator tab, select a course from the database, and choose a teebox with PAR/CR/SR values
  2. User can input hypothetical Stableford scores for 18 holes and the system calculates the correct Score Differential using the WHS formula
  3. User can view their current Handicap Index displayed in the simulator
  4. User can see a projected Handicap Index alongside their current one, showing what their HI would be with the simulated round included
  5. User can verify that simulated data does not appear anywhere in their actual round history (no database writes)

**Plans**: 2 plans
**UI hint**: yes

Plans:

**Wave 1**

- [x] 02-01-PLAN.md — WHS Calculation Engine + SD Storage + Tests (Wave 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 02-02-PLAN.md — Handicap Simulator Page + Nav Integration (Wave 2)

### Phase 3: Navigation & Sidebar Reorg

**Goal**: Reorganize navigation so the sidebar (hamburger drawer) contains all user actions — HCP, settings, logout, and admin links — instead of the Avatar menu, and make the sidebar accessible on all screen sizes
**Depends on**: Phase 1 (admin infra), Phase 2 (HCP display)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):

   1. Avatar dropdown no longer shows HCP, Settings, or Logout — only the avatar image remains as a visual indicator
   2. Sidebar drawer is accessible from both mobile and desktop (responsive: temporary on mobile, persistent/toggleable on desktop)
   3. Sidebar contains: HCP display, Settings link, Logout button (moved from Avatar menu)
   4. Sidebar properly filters navigation links: public links shown to all users, admin links shown only when `player.isAdmin` is true
   5. No duplicate link rendering in sidebar (current bug: admin links render twice — once from `links.map()` and once from conditional block)

**Plans**: 2 plans
**UI hint**: yes

Plans:

**Wave 1**

- [x] 03-01-PLAN.md — Simplify Avatar + create compact SidebarHCP component (Wave 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 03-02-PLAN.md — Responsive sidebar drawer with filtered links, HCP/Settings/Logout (Wave 2)

### Phase 4: Import Rounds Verification

**Goal**: Enable players to paste Federgolf competition results from a Google Sheet and import them as real rounds in Firestore, with course name matching, for verifying Handicap History and HI calculations
**Depends on**: Phase 1 (course database), Phase 2 (WHS engine/SD storage)
**Requirements**: IMPORT-01, IMPORT-02
**Success Criteria** (what must be TRUE):

   1. User can copy rows from a Google Sheet and paste them into a text area on the Import Rounds page
   2. The app parses the pasted data, matches course names to the `golf_courses` collection (exact name match first, then LIKE), and finds the matching teebox via CR/SR
   3. User sees a preview table with all parsed rounds, course match status, and expected Score Differentials before importing
   4. Imported rounds are saved as real Firestore round documents (not simulated data) — they appear in rounds list, Handicap History, and HI calculations
   5. Imported rounds have no per-hole shot data (just the round totals + Score Differential)
   6. After import, the page shows a summary comparing the expected HI (from the sheet's `Index Nuovo`) vs the calculated HI from the app's engine

**Plans**: 2 plans
**UI hint**: yes

Plans:

**Wave 1**

- [ ] 04-01-PLAN.md — CSV parser, course matcher, round builder, Firestore batch import (Wave 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 04-02-PLAN.md — Import Rounds page UI: paste form, preview table, import result summary, route, nav link (Wave 2)

## Progress

**Execution Order:** Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Course Database & Admin Foundation | 3/3 | Complete   | 2026-05-31 |
| 2. WHS Engine & Handicap Simulator | 2/2 | Complete   | 2026-06-01 |
| 3. Navigation & Sidebar Reorg | 2/2 | Complete   | 2026-06-01 |
