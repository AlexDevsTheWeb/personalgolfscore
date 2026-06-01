# Phase 2: WHS Engine & Handicap Simulator - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-01
**Phase:** 2-WHS-Engine-Handicap-Simulator
**Areas discussed:** WHS Engine location, SD storage strategy, Simulator input UX, Simulator results display, Simulator nav placement, Playing Handicap source, Playing HCP formula

---

## WHS Engine Location

| Option | Description | Selected |
|--------|-------------|----------|
| New `src/utils/whs/` directory | Dedicated directory for whs.utils.tsx + hi.utils.tsx — clean separation | ✓ |
| Add to existing `src/utils/calculator/` | New whs.utils.tsx alongside TotalsCalculator | |
| Single file in calculator/ | One whs.utils.tsx file | |

**User's choice:** New `src/utils/whs/` directory
**Notes:** Clean separation from round-level statistics. Follows the same pattern as TotalsCalculator (typed props, pure function, typed return, safeDivide).

---

## Score Differential Storage

| Option | Description | Selected |
|--------|-------------|----------|
| Compute on-the-fly | Calculate SD each time from round scores + course data. No DB writes. | |
| Store SD on round save | Compute and store SD on the round document during saveNewRound() | ✓ |
| Lazy compute + cache locally | Calculate on first load, cache in Zustand persist | |

**User's choice:** Store SD on round save
**Notes:** SD is computed during `saveNewRound()` and stored on the Firestore round document. HI is still calculated on-the-fly from stored SDs.

---

## Simulator Input UX

| Option | Description | Selected |
|--------|-------------|----------|
| Single-page 18-hole grid | Table layout with hole #, par, Stableford input | |
| Two-panel split view | Course info + summary on one side, input grid on other | |
| Freeform | User described their vision | ✓ |

**User's choice:** Simple form — select course/teebox, enter total Stableford points (single number). Not hole-by-hole. Reuses course selection, but not the existing round entry form.
**Notes:** "We already have the forms for the insert of the 18 holes of the round. We don't need a new one." — but also doesn't want to reuse them. Just total Stableford + course selection.

---

## Simulator Results Display

| Option | Description | Selected |
|--------|-------------|----------|
| Just the two numbers | Current HI and Projected HI side by side | |
| Numbers + breakdown | Current HI, projected HI, delta, simulated SD, best-8 detail | ✓ |

**User's choice:** Numbers + breakdown
**Notes:** Show current HI, projected HI, delta, the Score Differential the simulated round would produce, and how it affects best-8 calculation.

---

## Simulator Nav Placement

| Option | Description | Selected |
|--------|-------------|----------|
| New top-level nav item | Dedicated Simulator item in DrawerAppBar | ✓ |
| Sub-page under Statistics | Accessed from Statistics page | |

**User's choice:** New top-level nav item

---

## Playing Handicap Source

| Option | Description | Selected |
|--------|-------------|----------|
| Manual input field | User enters Playing HCP manually | |
| Auto-calculate from teebox | Derive from slope + HI | |
| Both — auto with override | Auto-calculate with manual override | ✓ |

**User's choice:** Both — auto with override

---

## Playing HCP Formula

| Option | Description | Selected |
|--------|-------------|----------|
| Standard WHS formula | Playing HCP = HI × (SR / 113) + (CR - PAR) | ✓ |
| Simplified — HI × (SR / 113) | Slope adjustment only | |
| Ask the user every time | Default to auto with override | |

**User's choice:** Standard WHS formula

---

## the agent's Discretion

- Simulator UI layout details (card placement, form layout)
- How the "best-8 breakdown" is visualized
- Simulator state management approach (Zustand transient vs React local state)
- Nav icon and label text for the Simulator nav item
- Error/edge case UI (no rounds, fewer than 20)

## Deferred Ideas

None — discussion stayed within phase scope.
