---
title: Data Flow
tags: [architecture, data-flow]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md]
---

# Data Flow

## View Round Details

1. User clicks round on Rounds page
2. Route: React Router navigates to `/round/:roundID`
3. Component calls `useAppStore.getRoundDetails(playerId, roundId)`
4. Store method calls `getRoundDetails()` from `src/utils/firestore/round.firestore.ts`
5. Firestore fetches round document + holes subcollection
6. Store updates `roundDetailsData` state
7. RoundsData page renders hole-by-hole breakdown

## Save New Round

1. User completes hole entry and clicks save
2. `AddNewRoundForm` triggers `useAppStore.saveNewRound()`
3. Store gathers `newRoundMain`, `newRoundHoles`, `newRoundTotals`, `newRoundDistances`
4. `totalsCalculator()` aggregates hole-level stats
5. `prepareRoundSaveBatch()` computes WHS Score Differential via `calculateScoreDifferential()` and Handicap Index via `calculateHandicapIndex()`
6. `saveNewRound()` in `round.firestore.ts` writes a Firestore batch
7. Batch writes: round document (with `scoreDifferential`, `handicapIndex`, `hcpDelta`) + holes subcollection + updates player averages + updates player `currentHCP`
8. Store resets new round state

## New Round Creation Flow

1. Navigate to `/addNewRound`
2. Enter round metadata (date, course, holes, tee, par, playing HCP)
3. Per-hole entry via `AddSingleHole.component.tsx`
4. Each hole triggers `setNewHole()` which calculates:
   - Stableford points
   - GIR value
   - Up/Down
   - Scramble
5. `totalsCalculator()` aggregates all holes into round totals
6. `prepareRoundSaveBatch()` computes SD + HI per WHS rules
7. Batch write to Firestore

## Import Rounds Flow

1. Navigate to `/import-rounds`
2. User pastes CSV/TSV data from Federgolf spreadsheet into text area
3. `parseImportText()` auto-detects delimiter (tab/comma/semicolon), handles Italian decimals (comma → period), filters `Valida=N` rows
4. Parsed rounds stored in store as `parsedRounds`
5. `matchAllCourses()` matches course names against `golf_courses` collection (exact → LIKE → unmatched)
6. Preview table shows parsed data with course match status
7. User confirms import → `importRounds()` in store triggers `importRoundsBatch()` in Firestore service
8. Per-round `writeBatch` writes sequentially — each round's HI computed from running SDs + running HCP
9. Imported rounds have `importSource: "federgolf-sheet"`, minimal totals (no per-hole data), and computed `scoreDifferential`/`handicapIndex`/`hcpDelta`
10. Store updates `importResults` with count of imported rounds

## Simulator Flow (No Database Writes)

1. Navigate to `/simulator`
2. Select course from `golf_courses` collection (dropdown loads via `course.firestore.getAllCourses()`)
3. Select teebox → PAR/CR/SR shown
4. Input hypothetical Stableford scores for 18 holes (local `useState`)
5. `calculateScoreDifferential()` computes SD from Stableford input via AGS = PAR + Playing HCP + (36 - Stableford points)
6. Virtual array: last 19 real SDs (from `roundsList`) + 1 simulated SD
7. `calculateProjectedHandicapIndex()` computes projected HI using virtual array
8. Results card shows current HI vs projected HI with delta
9. **No Firestore writes** — all state is ephemeral React component state

## Initial HCP & Progression Flow

1. User enters initial HCP on Settings page
2. Saved to Firestore player document (`players/{uid}.initialHCP`)
3. On each round save/import, `handicapIndex` and `hcpDelta` computed and stored on round document
4. First-round guard: if no rounds exist and initialHCP is null, save is blocked at UI (Alert, disabled button) and logic (throw) levels
5. Handicap History chart anchors at `initialHCP` and plots each round's `handicapIndex` with dashed reference line

## State Management

- `useAppStore` (Zustand) holds all application state
- Persisted to localStorage under key `app-storage`
- Partial persistence for specific slices (theme, player, rounds, golf bag)
- Import state (`parsedRounds`, `courseMatches`, `importResults`) explicitly excluded from persistence
- No server-side state sync beyond Firestore reads/writes

## Related Pages

- [System Overview](system-overview.md)
- [Firestore Schema](firestore-schema.md)
- [Import Rounds Feature](../features/import-rounds.md)
- [HCP Persistence & Backfill](../features/hcp-persistence-backfill.md)
