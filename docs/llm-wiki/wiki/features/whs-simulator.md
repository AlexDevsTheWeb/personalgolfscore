---
title: WHS Handicap Simulator
tags: [feature, whs, simulator, handicap]
created: 2026-06-13
updated: 2026-06-13
sources: [milestones/v1.0-ROADMAP.md]
---

# WHS Handicap Simulator

## Overview

A dedicated simulator page (`/simulator`) that lets players project how a hypothetical round would affect their Handicap Index. All computation happens in ephemeral React state — no data is written to Firestore.

## Data Flow

1. Select course from dropdown (loaded from `golf_courses` collection via `course.firestore.getAllCourses()`)
2. Select teebox — PAR, CR, SR displayed in MenuItem
3. Input hypothetical Stableford scores for all 18 holes
4. Score Differential computed via `calculateScoreDifferential()` using:
   - `AGS = PAR + Playing Handicap + (36 - Stableford points)`
5. Virtual array created from last 19 real SDs (`roundsList`) + 1 simulated SD
6. `calculateProjectedHandicapIndex()` computes projected HI using WHS Rule 5.2a on the virtual array
7. Results card shows:
   - Current Handicap Index (from player's real rounds)
   - Projected Handicap Index
   - Delta (+/- change)
   - Best score differentials breakdown using WHS scaling table
8. **No Firestore writes** — all state is local `useState` per SIM-03

## Key Design

- Pure-function calculations reuse the same WHS engine (`whs.utils.tsx`, `hi.utils.tsx`)
- Virtual array projection avoids any database writes
- MUI v7 custom Typography variants: `headline2` for title, `title6` for headings, `title4` for data values
- Grid v2 size prop syntax: `<Grid size={{ xs:12, md:7 }}>`

## Files

- `src/pages/Simulator.page.tsx` — Route page
- `src/components/Simulator/Simulator.component.tsx` — Full simulator UI (595 lines)

## Related Pages

- [Handicap Index](../concepts/handicap-index.md)
- [Score Differential](../concepts/score-differential.md)
- [Firestore Schema](../architecture/firestore-schema.md)
