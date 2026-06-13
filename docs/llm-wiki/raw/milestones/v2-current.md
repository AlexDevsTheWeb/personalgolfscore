# Milestone v2: Current

**Status:** Planning

## Overview

Next milestone for Personal Golf Score. Scope being defined.

## Deferred Requirements from v1

The following v1 requirements were deferred to v2 (see `v1.0-REQUIREMENTS.md`):

### Round Entry Integration
- **COURSE-02**: Non-admin users can search courses via an Autocomplete component
- **COURSE-03**: If a course isn't found, any user can create it via a dialog form
- **ROUND-01**: New round flow includes course selection via CourseAutocomplete
- **ROUND-02**: New round flow shows inline HCP preview before final submission
- **ROUND-03**: User can modify calculation values during round entry

### Automated Handicap
- **CALC-03**: New round submission automatically computes SD and updates the user's HI (largely addressed by Phase 5 `saveNewRound`; finalize after HCP-INIT stabilizes)
- **CALC-04**: Soft cap (excess above +3.0 cut to 50%) and hard cap (max +5.0 increase) implemented per WHS Rule 5.7
- **CALC-05**: Exceptional Score Reduction (-1.0 or -2.0) when SD is 7.0+ below current HI per WHS Rule 5.8

### Course Import
- **ADMIN-05**: Admin can import course data from the Federgolf website via an in-app button

### Visualization
- **CALC-06**: Handicap Index trend chart over time (largely addressed by Phase 5 progression chart; expand with additional views)
- **CALC-07**: Per-round SD and HI breakdown display

## Phases

*To be defined.*

## Deferred Issues from v1

From Phase 5 code review:

- WR-01: Loose equality (`==`) in `round.firestore.ts`
- WR-02: Debug `console.log` in production `importRoundsBatch`
- WR-03: No live WHS recalc fallback in `importRoundsBatch` for null `initialHCP`
- WR-04: In-batch duplicate detection missing in `importRounds`
- Redundant `Dashboard.page.tsx:24-30` `setRounds` workaround
