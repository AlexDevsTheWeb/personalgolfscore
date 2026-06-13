# Import Rounds Verification Page Design

Date: 2026-06-01

## Overview

A new page where players can paste Federgolf/FIG competition results from a Google Sheet and import them as real rounds. This lets users verify the Handicap History page, rounds list, and HI calculation against known competition data — without entering 18 holes of shot-by-shot data. Rounds appear identically to hand-entered rounds in all pages that read `roundsList`.

**Not in scope:** Per-hole statistics, shot data, club tracking, distance averages. This is a bulk-import for handicap verification only.

---

## Route

- Path: `/import-rounds`
- Nav label: "Import Rounds"
- Icon: `FileUploadIcon` (or `PublishIcon`)
- Only visible for logged-in players (inside `ProtectedRoute`)

---

## Data Flow

```
User copies rows from Google Sheet
        │
        ▼
Paste into <textarea> on /import-rounds
        │
        ▼
Parse CSV/TSV text → structured array of round data
        │
        ▼
Match Campo column → golf_courses collection by name
  (try exact match first, fall back to LIKE search)
        │
        ▼
Look up teebox matching the round's Par/CR/SR
  (find teebox with matching courseRating and slopeRating)
        │
        ▼
Show preview table: date, course (match status ✓/✗), par, CR, SR,
Playing HCP, Stableford, AGS, Score Diff, Expected HI
        │
        ▼
User clicks "Import Rounds"
        │
        ▼
For each round, create Firestore round document:
  - Round metadata (date, course ref, tee, par, playing HCP, holes=18)
  - `totals` = minimal valid IRoundTotals (score, points filled; rest zeroed)
  - `scoreDifferential` = pre-computed from sheet
  - No holes subcollection
  - Uses existing `saveNewRound` path (or a simplified writer)
        │
        ▼
Show success summary: X rounds imported, Y course matches,
expected HI vs calculated HI
```

---

## Page Layout

```
+----------------------------------------------------+
| Import Rounds                                      |
| (FileUploadIcon + title)                           |
+----------------------------------------------------|
| Paste competition results from your Federgolf      |
| spreadsheet below. One row per round.              |
|                                                     |
| ┌─────────────────────────────────────────────┐    |
| │ Data;Gara;Campo;Giro;Formula;Buche;Valida;...│    |
| │ 09/05/2026;Muratory Wine;BARLASSINA;1;SPM;...│    |
| │ 24/05/2026;GOFOX ON TOUR 2026;AMBROSIANO;...│    |
| │ ...                                         │    |
| └─────────────────────────────────────────────┘    |
|                                                     |
| [Parse & Preview]                                   |
+----------------------------------------------------|
| Preview (shows after parse):                        |
|                                                     |
| # | Date     | Course      | Match | Tee | Par | PHCP | Stbl | AGS | SD   | ✓ |
| 1 | 09/05/26 | BARLASSINA  | ✓     | Giallo | 72 | 30   | 33   | 105 | 29.1 | ⬜ |
| 2 | 24/05/26 | AMBROSIANO  | ✓     | Giallo | 72 | 31   | 36   | 103 | 26.8 | ⬜ |
| 3 | 09/05/26 | BARLASSINA  | ✓     | Giallo | 72 | 31   | 23   | 116 | 38.5 | ⬜ |
| ...                                                     |
|                                                     |
| [Select All]  [Import X Selected Rounds]             |
+----------------------------------------------------|
| Results (shows after import):                       |
|                                                     |
| ✓ 40 rounds imported                                |
| ✓ 38 course matches                                 |
| ⚠ 2 courses not found (names stored as-is)         |
|                                                     |
| Expected HI: 26.8                                   |
| Calculated HI: 26.8                                 |
| Match: ✓                                            |
|                                                     |
| [View Handicap History]  [Import More]              |
+----------------------------------------------------+
```

---

## CSV Parsing

### Expected Columns (from Google Sheet)

The sheet has these columns:
`#`, `Data`, `Gara`, `Campo`, `Giro`, `Formula`, `Buche`, `Valida`, `Playing HCP`, `Par`, `CR`, `SR`, `Stbl`, `AGS`, `PCC`, `SD`, `Corr SD`, `Corr`, `Index Vecchio`, `Index Nuovo`, `Var.`

### Parser Logic

1. Split pasted text by newlines → rows
2. Detect delimiter (tab `\t` or comma `,` or semicolon `;`)
3. Parse each row:
   - `Data` (date) → `roundDate` — parse via dayjs (format DD/MM/YYYY)
   - `Campo` (course name) → used for course lookup
   - `Formula` — store as metadata (not used in calculations)
   - `Buche` (holes) → `roundHoles` (always 18)
   - `Playing HCP` → `roundPlayingHCP` (parse Italian decimal `,` → `.`)
   - `Par` → `roundPar`
   - `CR` → course rating (for teebox lookup)
   - `SR` → slope rating (for teebox lookup)
   - `Stbl` → `totals.points.totals` (Stableford points)
   - `AGS` → `totals.score.totals` (adjusted gross score)
   - `SD` → `scoreDifferential` (store pre-computed)
   - `Valida` — skip rows where Valida is `N` (not valid for handicap)

### Robustness

- Skip empty lines
- Skip header row (detect by "Data" in first cell or by `#` marker)
- Handle Italian decimal format (comma as decimal separator)
- Handle empty fields gracefully

---

## Course Matching

### Algorithm

1. Normalize the sheet's `Campo` value: trim, uppercase, remove extra spaces
2. Query `golf_courses` collection for `name == normalizedName` (exact match)
3. If no match, try `name LIKE %normalizedName%` (case-insensitive contains)
4. If still no match, mark as **unmatched** — store the raw course name as `roundCourse` string

### Teebox Lookup

Once a course is matched, find the teebox that matches the sheet's `CR` and `SR`:
1. Iterate `course.teeboxes[]`
2. Find teebox where `courseRating == parsedCR && slopeRating == parsedSR`
3. If found: set `roundTee` to teebox `name`
4. If not found: set `roundTee` to the first available teebox `name` (with warning)

### Edge Cases

- Course found but no teebox matches CR/SR → warn but import with first teebox
- Course not found → store raw name, set tee to empty string, import with warning
- Multiple courses match the same name → pick first result, log ambiguity

---

## Firestore Document Structure

### Round Document (`players/{playerId}/rounds/{roundId}`)

```typescript
{
  roundDate: Timestamp,           // Parsed from Data column
  roundCourse: string,            // Course name (or "UNMATCHED: BARLASSINA" if not found)
  roundCourseRef: string | null,  // Course document ID if matched
  roundHoles: 18,
  roundTee: string,               // Teebox name from matched course
  roundPar: number,               // From sheet
  roundPlayingHCP: number,        // From sheet
  roundStrokes: number,           // AGS from sheet
  roundNumber: number,            // Auto-assigned (next available)
  roundFormat: string,            // Formula from sheet (e.g., "SPS", "SPM")
  roundValid: boolean,            // Valida == "S"

  totals: {
    score: { totals: number },        // AGS
    points: { totals: number },       // Stableford points
    fairway: { firTot: 0, firCounter: 0 },
    gir: { counter: 0, tot: 0 },
    putts: { totals: 0 },
    // All other IRoundTotals fields set to 0 / default
    // See IRoundTotals type for full structure
  },

  scoreDifferential: number | null,   // Pre-computed from sheet
  userId: string,                     // Current player's auth UID
  createdAt: Timestamp,               // serverTimestamp()
  importSource: "federgolf-sheet",    // Marker for imported rounds
}
```

### No Holes Subcollection

Imported rounds have **no holes subcollection** — the per-hole shot data is not needed for handicap verification. Pages that read `roundDetails.holes` will get an empty array for these rounds. If the user clicks into an imported round's detail page, show a notice: "This round was imported. No per-hole data available."

### `importSource` Field

The `importSource: "federgolf-sheet"` marker lets us:
- Filter imported rounds in the rounds list if needed
- Show context-appropriate UI for imported rounds
- Avoid double-importing the same data

---

## Component Tree

```
src/pages/ImportRounds.page.tsx         ← Route page (thin wrapper)
src/components/ImportRounds/
  ImportRounds.component.tsx            ← Main orchestrator
  ImportForm.component.tsx              ← Textarea for paste + Parse button
  PreviewTable.component.tsx            ← Preview parsed data before import
  ImportResult.component.tsx            ← Success/failure summary after import
  ImportRoundParser.utils.ts            ← CSV/TSV parsing logic
  CourseMatcher.utils.ts                ← Course matching algorithm
  RoundBuilder.utils.ts                 ← Builds Firestore-compatible round objects
```

---

## Store Integration

### New Zustand Slice

A minimal slice in the existing Zustand store:

```typescript
importRounds: {
  parsedRounds: IParsedRound[],     // Parsed + matched round data (preview)
  importResults: IImportResult | null,  // After import
  isLoading: boolean,
  error: string | null,
}
```

Methods:
- `parseImportText(text: string)` — parse pasted CSV, match courses, store in `parsedRounds`
- `importRounds(selectedIndices: number[])` — save selected rounds to Firestore
- `resetImport()` — clear all import state

---

## Edge Cases

| Case | Handling |
|---|---|
| Empty paste | Show error: "Paste competition data first" |
| Wrong format | Show error: "Could not parse data. Expected columns: Date, Course, Par, CR, SR, Stbl, AGS, SD, ..." |
| Duplicate rounds | Check date+coursename combination; warn if already imported |
| Invalid rounds (Valida=N) | Skip automatically with note |
| All courses unmatched | Import proceeds, rounds stored with raw course names |
| 0 valid rounds to import | Disable import button, show "No valid rounds found" |
| Partial import failure | Batch with Firestore batch writes; report success count vs failure count |
| Round detail page for imported round | Show "This round was imported. No per-hole data available." |
| Handicap History with imported rounds | Works identically — reads `scoreDifferential` from round doc |
| Concurrent imports | Round number auto-assignment avoids conflicts |
| Very large paste (100+ rounds) | Warn: "Large import — may take a moment" |

---

## Verification

- `npm run type-check` — no TypeScript errors
- `npm run build` — production build succeeds
- Manual: paste 40 rows from Google Sheet, verify parse matches expected
- Manual: verify preview table shows correct course match status
- Manual: import rounds, verify they appear in Handicap History page
- Manual: verify Handicap Index calculation matches expected HI from sheet (`Index Nuovo`)
- Manual: verify imported round detail page shows "no holes" notice
- Manual: try invalid paste (wrong format, empty) → error messages shown
- Manual: verify Valida=N rounds are skipped

---

## Files Changed

### New files
| File | Purpose |
|---|---|
| `src/pages/ImportRounds.page.tsx` | Route page |
| `src/components/ImportRounds/ImportRounds.component.tsx` | Main orchestrator |
| `src/components/ImportRounds/ImportForm.component.tsx` | Paste textarea + parse button |
| `src/components/ImportRounds/PreviewTable.component.tsx` | Preview table |
| `src/components/ImportRounds/ImportResult.component.tsx` | Success/failure summary |
| `src/components/ImportRounds/ImportRoundParser.utils.ts` | CSV/TSV parser |
| `src/components/ImportRounds/CourseMatcher.utils.ts` | Course matching algorithm |
| `src/components/ImportRounds/RoundBuilder.utils.ts` | Build round objects for Firestore |

### Modified files
| File | Change |
|---|---|
| `src/App.tsx` | Add `/import-rounds` route |
| `src/utils/links/links.utils.tsx` | Add nav link for Import Rounds |
| `src/store/zustand/app.store.ts` | Add `importRounds` slice with parse/import/reset methods |
| `src/utils/firestore/round.firestore.ts` | Add `importRoundsBatch()` function for bulk round creation |
