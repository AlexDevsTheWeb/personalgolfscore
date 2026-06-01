# Roadmap: Personal Golf Score — Handicap & Course Management

## Overview

This roadmap delivers WHS (World Handicap System) handicap calculation, a shared golf course database, and admin tooling to the existing round-tracking app, plus a unique handicap simulator that lets players project how future scores would affect their index. The work is split into two vertical slices: first the administrative foundation (course database + admin panel), then the player-facing calculation engine (WHS formulas + simulator).

## Phases

- [ ] **Phase 1: Course Database & Admin Foundation** - Admin authentication, route protection, golf course CRUD, and the public `golf_courses` collection
- [ ] **Phase 2: WHS Engine & Handicap Simulator** - WHS Score Differential and Handicap Index calculation engine plus a dedicated Simulator with course/teebox selection and projected HI display

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
- [ ] 01-03-PLAN.md — Page Integration: admin pages, routes, nav, seed admin (Wave 3)

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

- [ ] 02-01-PLAN.md — WHS Calculation Engine + SD Storage + Tests (Wave 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 02-02-PLAN.md — Handicap Simulator Page + Nav Integration (Wave 2)

## Progress

**Execution Order:** Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Course Database & Admin Foundation | 2/3 | In Progress|  |
| 2. WHS Engine & Handicap Simulator | 0/0 | Not started | - |
