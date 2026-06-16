# Requirements: Personal Golf Score — Handicap & Course Management

**Defined:** 2026-05-31
**Core Value:** Players can accurately calculate their WHS handicap index from their rounds and simulate how future scores would affect it.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### WHS Calculation Engine

- [x] **CALC-01**: System calculates Score Differential (SD) from gross score or Stableford input using formula SD = (AGS - CR - PCC) × (113 / SR), with AGS = PAR + Playing Handicap + (36 - Stableford points)
- [x] **CALC-02**: System calculates Handicap Index (HI) as average of best 8 SDs from last 20 rounds, with proper scaling for fewer rounds per WHS Rule 5.2a

### Course Database

- [ ] **COURSE-01**: A public `golf_courses` Firestore collection stores course data (name, PAR, CR, SR per teebox per gender) with appropriate security rules: public read, authenticated create, admin-only update/delete

### Admin Panel

- [ ] **ADMIN-01**: Admin users are identified via Firebase custom claims (`{ admin: true }` on auth token)
- [ ] **ADMIN-02**: Admin-only routes are protected at both client level (route guards) and server level (Firestore security rules)
- [ ] **ADMIN-03**: Admin can view, create, edit, and delete golf courses via an admin interface with MUI DataGrid
- [ ] **ADMIN-04**: Admin can grant and revoke admin roles to other users

### Handicap Simulator

- [x] **SIM-01**: A dedicated "Simulator" tab/route lets users select a course/teebox and input hypothetical Stableford scores
- [x] **SIM-02**: Simulator displays current Handicap Index vs projected Handicap Index in a results card
- [x] **SIM-03**: Simulator computes projection using a virtual array (last 19 real SDs + 1 simulated SD) without writing to the database

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Navigation & Sidebar

- **NAV-01**: Avatar dropdown no longer shows HCP display, Settings link, or Logout button
- **NAV-02**: Sidebar drawer is accessible on all screen sizes (responsive: temporary mobile, persistent/toggleable desktop)
- **NAV-03**: Sidebar contains HCP display (compact format), Settings link, and Logout button
- **NAV-04**: Sidebar navigation links respect `show` property and admin status
- **NAV-05**: No duplicate link rendering in sidebar — admin links appear exactly once

### Round Entry Integration

- **COURSE-02**: Non-admin users can search courses via an Autocomplete component
- **COURSE-03**: If a course isn't found, any user can create it via a dialog form
- **ROUND-01**: New round flow includes course selection via CourseAutocomplete
- **ROUND-02**: New round flow shows inline HCP preview before final submission
- **ROUND-03**: User can modify calculation values during round entry

### Automated Handicap

- **CALC-03**: New round submission automatically computes SD and updates the user's HI
- **CALC-04**: Soft cap (excess above +3.0 cut to 50%) and hard cap (max +5.0 increase) implemented per WHS Rule 5.7
- **CALC-05**: Exceptional Score Reduction (-1.0 or -2.0) when SD is 7.0+ below current HI per WHS Rule 5.8

### Data Import

- **ADMIN-05**: Admin can import course data from the Federgolf website via an in-app button
- **IMPORT-01**: User can paste Federgolf competition results (from Google Sheets or similar) into a text area on the Import Rounds page; the app parses CSV/TSV data, matches course names to the `golf_courses` collection, and shows a preview table before import
- **IMPORT-02**: Imported rounds are saved as real Firestore round documents with Score Differential, round totals (Stableford + AGS), and course reference — appearing identically in rounds list, Handicap History, and HI calculations — without per-hole shot data

### Visualization

- **CALC-06**: Handicap Index trend chart over time
- **CALC-07**: Per-round SD and HI breakdown display

### Initial HCP & Progression

- **HCP-INIT-01**: User can enter an exact initial Handicap value on the Settings page; the value persists to the player document (`players/{uid}.initialHCP`) and reappears after refresh
- **HCP-INIT-02**: Saving a new round computes the new WHS Handicap Index (after that round) and the delta from the previous HCP (initial HCP for the first round), persists them as `handicapIndex` and `hcpDelta` on the round document, and updates the player's `currentHCP` snapshot
- **HCP-INIT-03**: Imported rounds (Phase 4 `importRoundsBatch` path) also receive `handicapIndex` and `hcpDelta` computed against the user's initial HCP and the chronological import order
- **HCP-INIT-04**: Handicap History page shows a chart that starts at the initial HCP value, progresses through each round's stored `handicapIndex`, and includes a horizontal dashed reference line at the initial HCP level

## Out of Scope

| Feature | Reason |
|---------|--------|
| PCC (Playing Conditions Calculation) | Always set to 0; rarely applied and complex to implement |
| 9-hole round combination | 2024 WHS expected score method; can defer |
| GPS rangefinder | Impossible in web SPA with sub-meter accuracy |
| Shot tracking / Strokes Gained | Requires GPS or hardware sensors |
| Tournament/competition scoring | Separate product (Golf Genius territory) |
| Social features / friends feed | Not core to handicap calculation |
| Native mobile apps | Web-only per project scope |
| EGA/pre-WHS legacy handicap conversion | Only WHS (post-2020) supported |
| Automated scheduled Federgolf sync | Import is manual/admin-triggered only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CALC-01 | Phase 2 | Complete |
| CALC-02 | Phase 2 | Complete |
| COURSE-01 | Phase 1 | Pending |
| ADMIN-01 | Phase 1 | Pending |
| ADMIN-02 | Phase 1 | Pending |
| ADMIN-03 | Phase 1 | Pending |
| ADMIN-04 | Phase 1 | Pending |
| SIM-01 | Phase 2 | Complete |
| SIM-02 | Phase 2 | Complete |
| SIM-03 | Phase 2 | Complete |
| NAV-01 | Phase 3 | Complete |
| NAV-02 | Phase 3 | Complete |
| NAV-03 | Phase 3 | Complete |
| NAV-04 | Phase 3 | Complete |
| NAV-05 | Phase 3 | Complete |
| IMPORT-01 | Phase 4 | Pending |
| IMPORT-02 | Phase 4 | Pending |
| HCP-INIT-01 | Phase 5 | Complete |
| HCP-INIT-02 | Phase 5 | Complete |
| HCP-INIT-03 | Phase 5 | Complete |
| HCP-INIT-04 | Phase 5 | Complete |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-31*
*Last updated: 2026-06-01 after Phase 3 addition*
