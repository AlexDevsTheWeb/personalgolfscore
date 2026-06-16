# HCP History Persistence + Backfill Design

Date: 2026-06-03

## Overview

Persist `previousHCP` (old HCP) on every round alongside the already-stored `handicapIndex` (new HCP) and `hcpDelta`, backfill these three fields on existing rounds via a one-time manual trigger in Settings, and update the `/handicap-history` table and chart to surface them.

**Why now:** Phase 5 (HCP-INIT, branches 05-01 / 05-02 / 05-03) added the computation and storage of `handicapIndex` and `hcpDelta` for new rounds, but the `previousHCP` value used in the calculation was kept as a local variable only. Rounds saved before Phase 5 also have none of the three fields. The chart in D-14 (initialHCP set, no rounds with stored HI) currently renders a single point at `Date.now()` that sits on top of the dashed reference line, making the per-round progression invisible.

---

## 1. Data model additions

Add `previousHCP` to `IBasicRoundData` in `src/types/roundData.types.tsx`:

```ts
previousHCP?: number | null;
```

Final per-round shape (all optional / nullable to remain backward compatible):

| Field | Meaning | Source |
|---|---|---|
| `scoreDifferential` | Round's SD | WHS 5.1 |
| `previousHCP` | HI carried into this round | Previous round's `handicapIndex`, or `initialHCP` for the first round; `null` if no `initialHCP` and no prior round |
| `handicapIndex` | HI after this round | `calculateHandicapIndex([newSD, ...prior20SDs])` |
| `hcpDelta` | `handicapIndex - previousHCP`, rounded to 1 decimal | Derived |

---

## 2. Save paths — persist `previousHCP` going forward

The `previousHCP` value is already computed in two places; we just need to write it to Firestore.

### `src/utils/firestore/round.firestore.ts` — `saveNewRound`

The `previousHCP` local var (lines 192-204) is already computed (CR-02 fix). Pass it through to `prepareRoundSaveBatch` so it's written to the new round document.

### `src/utils/firestore/round.firestore.ts` — `importRoundsBatch`

The running `runningHCP` is already tracked. Capture it as `previousHCP` for the next round's `enrichedDoc` (mirror what `saveNewRound` does).

### `src/utils/round/round.utils.tsx` — `prepareRoundSaveBatch`

Add `previousHCP?: number | null` parameter; write it into the round document alongside `scoreDifferential`, `handicapIndex`, `hcpDelta`.

### `src/components/ImportRounds/RoundBuilder.utils.ts` — `IRoundImportDocument`

Add `previousHCP?: number | null` to both the construction params interface and the document interface.

---

## 3. Backfill utility (one-time)

**New file:** `src/utils/firestore/backfillHcpHistory.utils.ts`

```ts
export interface IBackfillResult {
  success: boolean;
  processed: number;
  updated: number;
  skipped: number;
  error?: string;
}

export const backfillHcpHistory = async (
  userId: string
): Promise<IBackfillResult>;
```

**Algorithm:**

1. Fetch `player.initialHCP` (from `player.firestore` or `useAppStore`).
2. Query all rounds for `userId`, ordered by `roundDate` ascending.
3. Walk rounds chronologically, mirroring `importRoundsBatch`:
   - `previousHCP` = previous round's `handicapIndex`, or `initialHCP` if this is the first round, or `null` if neither is available.
   - `handicapIndex` = `calculateHandicapIndex([newSD, ...runningSDs].slice(0, 20))`; `null` if SD missing.
   - `hcpDelta` = `+(handicapIndex - previousHCP).toFixed(1)`; `null` if either is `null`.
4. Skip rounds where `scoreDifferential == null` (cannot compute HI) — log a warning, don't write.
5. Build a single Firestore `writeBatch` with one `update` per processable round, writing only `{ previousHCP, handicapIndex, hcpDelta }` — never touching other fields.
6. Commit the batch. Firestore `writeBatch` is atomic.
7. Return `{ processed, updated, skipped, success }`. `updated` counts rounds whose values actually changed; `skipped` counts rounds whose existing values already match.

**Idempotency:** Re-runnable. A round whose three fields are already correct produces a no-op `update` and is counted in `skipped`.

**Edge cases:**

| Scenario | Behavior |
|---|---|
| 0 rounds | Return `{ processed: 0, updated: 0, skipped: 0, success: true }`. No Firestore call. |
| Rounds without `initialHCP` (legacy user) | First round gets `previousHCP = null` and `hcpDelta = null`; subsequent rounds work normally. |
| Round with `scoreDifferential == null` | Skip with `console.warn`; don't write. |
| Network / batch failure | Catch and return `{ success: false, error: message }`; no partial writes. |

---

## 4. Settings UI — manual one-time trigger

Add a new section to `src/components/Settings/Settings.component.tsx`, placed below the Initial HCP input.

**Visibility:** The section is rendered only when `roundsNeedingBackfill > 0`, where:

```ts
const roundsNeedingBackfill = roundsList.filter(
  (r) =>
    r.previousHCP == null ||
    r.handicapIndex == null ||
    r.hcpDelta == null
).length;
```

Once all rounds have all three fields, the section disappears — communicating the one-time nature visually. No "done" state badge needed.

**Section content:**

- **Title:** "HCP History Backfill"
- **Body:** "Your existing rounds don't have the new handicap history fields yet. Run this one-time recalculation to compute Old HCP, New HCP, and Δ for every round. New rounds you save will be calculated automatically."
- **Button:** `Recalculate HCP history` (MUI `Button variant="contained" color="primary"`, disabled while `isLoading`)
- **Progress state:** Replace the button with a `CircularProgress` + "Recalculating N rounds..." text during the run.
- **Confirmation dialog:** A reusable `AlertDialog` (or `Dialog` + `DialogTitle` / `DialogContent` / `DialogActions`):
  - Title: "Recalculate Handicap History?"
  - Body: "This will update the Old HCP, New HCP, and Δ fields on every round using the same formula as new rounds. The operation cannot be undone."
  - Buttons: Cancel / Recalculate
- **Result feedback:** A `Snackbar` (or inline `Alert`) with "Updated N rounds, K already up to date." on success, or the error message on failure.

**Re-trigger path:** If the user wants to re-run (e.g., to fix a data issue), they can edit and re-save one round, or delete and re-import. The button reappears as soon as any round is missing a field.

---

## 5. Table changes — `src/components/HandicapHistory/HandicapHistory.component.tsx`

Add two new columns between "Score Diff." and the existing "Δ":

| New column | Source | Format |
|---|---|---|
| **Old HCP** (`align="right"`) | `round.previousHCP` | `toFixed(1)`, or `—` if null |
| **New HCP** (`align="right"`) | `round.handicapIndex` | `toFixed(1)`, or `—` if null |

Keep existing Δ and Used (⭐) columns unchanged. Total columns: Date, Course, Tee, Strokes, Score Diff., Old HCP, New HCP, Δ, Used = 9 columns.

Color hint (subtle): positive Δ rendered with `+` prefix (already implemented), negative Δ already has the minus sign. No additional color coding.

---

## 6. Chart changes — `src/components/HandicapHistory/HandicapHistory.component.tsx`

**Goal:** Solid line through per-round `handicapIndex` values + dashed reference line at `initialHCP`. No anchor point at the earliest round. No single-point fallback that hides the data.

### Remove

- The `initialHCP` anchor point in the D-11 branch (lines 124-131 of the current file). The anchor was a workaround to show the "started here" value before the backfill — now redundant.
- The `roundsWithHI.length === 0` D-14 single-point branch (lines 116-118). This is the branch that today hides the per-round data when stored HI is missing.
- The CR-03 skip-index-0 fix (lines 125-127 + line 132) — only relevant when the anchor existed.
- The `mostRecentWithHI` fallback in `currentHI` (lines 75-79) — after backfill, the most recent round's `handicapIndex` is always present when rounds exist.

### Replace `progressionData` with

```ts
const progressionData = useMemo(() => {
  return [...roundsWithSD]
    .filter((r) => r.handicapIndex != null)
    .sort((a, b) => a.roundDate - b.roundDate)
    .map((r) => ({ date: r.roundDate, hi: r.handicapIndex as number }));
}, [roundsWithSD]);
```

### Keep

The dashed reference line at `initialHCP`:

```jsx
{hasInitialHCP && (
  <ChartsReferenceLine
    y={initialHCP as number}
    label="Initial HCP"
    lineStyle={{ strokeDasharray: '5 5', stroke: '#888' }}
  />
)}
```

### Keep

The "your initial handicap is saved" `Alert` (D-14 banner) for the case of `initialHCP` set but zero rounds — this is a UX hint, not a chart concern.

### Result matrix

The chart card is rendered when `progressionData.length >= 1`. The reference line is part of the chart and only appears with it.

| State | What renders |
|---|---|
| 0 rounds, no `initialHCP` | Empty-state Alert (existing) |
| 0 rounds, has `initialHCP` | "Your initial handicap (X.X) is saved" Alert; no chart card |
| ≥1 round, all with stored HI | Chart card: per-round HI line + dashed reference line at `initialHCP` |
| ≥1 round, some missing stored HI (pre-backfill) | No chart card; Settings backfill section visible |
| ≥1 round, no `initialHCP` | Chart card: per-round HI line, no reference line, legacy banner prompts to set `initialHCP` |

---

## 7. Files changed

### Modified

| File | Change |
|---|---|
| `src/types/roundData.types.tsx` | Add `previousHCP?: number \| null` to `IBasicRoundData` |
| `src/utils/firestore/round.firestore.ts` | Pass `previousHCP` through `saveNewRound` and `importRoundsBatch` |
| `src/utils/round/round.utils.tsx` | Add `previousHCP` param to `prepareRoundSaveBatch` |
| `src/components/ImportRounds/RoundBuilder.utils.ts` | Add `previousHCP` to `IRoundImportDocument` interfaces and builder |
| `src/components/Settings/Settings.component.tsx` | Add HCP History Backfill section with gated button, dialog, snackbar |
| `src/components/HandicapHistory/HandicapHistory.component.tsx` | Add Old/New HCP columns; strip chart anchor + single-point branch; keep reference line |

### New

| File | Purpose |
|---|---|
| `src/utils/firestore/backfillHcpHistory.utils.ts` | `backfillHcpHistory(userId)` function |
| `docs/superpowers/specs/2026-06-03-hcp-history-persistence-design.md` | This document |

---

## 8. Verification

- `npm run type-check` — no TypeScript errors
- `npm run test:calc:whs` — existing WHS tests still pass (no WHS rule changes)
- `npm run test:calc:quick` / `test:calc:edge` — calculation tests still pass
- **Manual — backfill trigger:**
  - On a test account with mixed round states (some with all 3 fields, some missing), click "Recalculate HCP history"
  - Verify the result snackbar reports `updated + skipped === rounds.length`
  - Re-open Settings: section is hidden
  - Re-open `/handicap-history`: table shows Old HCP / New HCP / Δ for every row; chart shows the per-round line + dashed reference line at `initialHCP`
- **Manual — backfill idempotency:** Trigger again (via the re-trigger path: edit and re-save a round, which clears one field) → verify `updated` is small, `skipped` is large
- **Manual — new round:** Save a brand-new round via the New Round form → confirm via Firestore console that the new round document has `previousHCP`, `handicapIndex`, `hcpDelta` populated
- **Manual — legacy user (no `initialHCP`):** First round's Old HCP / Δ show `—`; subsequent rounds show real values; chart renders without reference line
