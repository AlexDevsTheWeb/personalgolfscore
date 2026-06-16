# HCP History Persistence + Backfill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persist `previousHCP` on every round alongside `handicapIndex` and `hcpDelta`, backfill these three fields on existing rounds via a one-time manual trigger in Settings, and update `/handicap-history` to show Old HCP / New HCP / Δ columns and a per-round HI line chart (with the existing dashed reference line preserved).

**Architecture:** Add a `previousHCP` field to the round schema; wire it through the two save paths (`saveNewRound`, `importRoundsBatch`) so every new write carries it. Add a one-shot `backfillHcpHistory(userId)` utility that walks existing rounds chronologically, computes the three fields using the same formula as imports, and writes a single Firestore batch. Expose a manual trigger in Settings, gated to render only when at least one round is missing the new fields. Strip the chart's hidden-data branches (D-11 anchor, D-14 single-point) and replace with a simple per-round HI filter; keep the dashed reference line at `initialHCP`.

**Tech Stack:** React 19, TypeScript 6, MUI v7, Firebase Firestore v12, Vitest. Existing patterns: `IBasicRoundData` round schema, `writeBatch` for atomic writes, `useAppStore` Zustand selector for rounds.

**Working directory:** branch `feat/hcp-history-persistence` (off `development`)

---

## File map

| File | Responsibility | Touch type |
|---|---|---|
| `src/types/roundData.types.tsx` | `IBasicRoundData` shape | Modify — add `previousHCP` field |
| `src/components/ImportRounds/RoundBuilder.utils.ts` | `IRoundImportDocument` + `buildRoundDocument` | Modify — thread `previousHCP` |
| `src/utils/round/round.utils.tsx` | `prepareRoundSaveBatch` | Modify — accept and write `previousHCP` |
| `src/utils/firestore/round.firestore.ts` | `saveNewRound`, `importRoundsBatch` | Modify — compute and pass `previousHCP` |
| `src/utils/firestore/backfillHcpHistory.utils.ts` | One-time backfill function | New |
| `src/utils/firestore/backfillHcpHistory.utils.test.ts` | Vitest unit tests for backfill calc | New |
| `src/components/Settings/Settings.component.tsx` | Backfill trigger UI | Modify — add gated section, dialog, snackbar |
| `src/components/HandicapHistory/HandicapHistory.component.tsx` | Table + chart | Modify — add columns, strip chart branches |

---

## Task 1: Add `previousHCP` to `IBasicRoundData`

**Files:**
- Modify: `src/types/roundData.types.tsx:159-176`

- [ ] **Step 1: Edit `src/types/roundData.types.tsx`**

Add `previousHCP?: number | null;` to `IBasicRoundData`. Place it directly above `handicapIndex` to keep the per-round HI trio grouped:

```ts
export interface IBasicRoundData {
  id: string,
  // roundData: DocumentData,
  roundCourse?: string,
  roundDate: number,
  roundHoles?: string,
  roundTee?: string,
  roundPar?: string,
  roundNumber?: string,
  roundPlayingHCP?: string,
  roundStrokes?: number,
  userId?: string
  createdAt: number,
  scoreDifferential?: number | null,
  previousHCP?: number | null,
  handicapIndex?: number | null,
  hcpDelta?: number | null,
  totals: IRoundTotals
}
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/roundData.types.tsx
git commit -m "feat: add previousHCP to IBasicRoundData"
```

---

## Task 2: Update `IRoundImportDocument` and `buildRoundDocument` to carry `previousHCP`

**Files:**
- Modify: `src/components/ImportRounds/RoundBuilder.utils.ts:7-26, 32-64`

- [ ] **Step 1: Add `previousHCP` to `IRoundImportDocument`**

Replace the interface in `src/components/ImportRounds/RoundBuilder.utils.ts`:

```ts
export interface IRoundImportDocument {
  roundDate: Timestamp;
  roundCourse: string;
  roundCourseRef: string | null;
  roundHoles: 18;
  roundTee: string;
  roundPar: number;
  roundPlayingHCP: number;
  roundStrokes: number;
  roundFormat: string;
  roundValid: boolean;
  roundNumber: number;
  totals: IRoundTotals;
  scoreDifferential: number | null;
  previousHCP: number | null;
  handicapIndex: number | null;
  hcpDelta: number | null;
  userId: string;
  importSource: 'federgolf-sheet';
  createdAt: FieldValue;
}
```

- [ ] **Step 2: Add `previousHCP` to `buildRoundDocument` params and return**

Replace the function signature and body in `src/components/ImportRounds/RoundBuilder.utils.ts`:

```ts
export function buildRoundDocument(params: {
  parsed: IParsedRound;
  match: ICourseMatchResult;
  roundNumber: number;
  userId: string;
  previousHCP?: number | null;
  handicapIndex?: number | null;
  hcpDelta?: number | null;
}): IRoundImportDocument {
  const totals = createEmptyRoundTotals();
  totals.score.totals = params.parsed.roundStrokes;
  totals.points.totals = params.parsed.stablefordPoints;

  return {
    roundDate: Timestamp.fromDate(new Date(params.parsed.roundDate)),
    roundCourse: params.match.matched ? params.match.courseName : params.parsed.roundCourse,
    roundCourseRef: params.match.courseId,
    roundHoles: 18,
    roundTee: params.match.matched ? params.match.teeboxName : '',
    roundPar: params.parsed.roundPar,
    roundPlayingHCP: params.parsed.roundPlayingHCP,
    roundStrokes: params.parsed.roundStrokes,
    roundFormat: params.parsed.roundFormat,
    roundValid: params.parsed.roundValid,
    roundNumber: params.roundNumber,
    totals,
    scoreDifferential: params.parsed.scoreDifferential,
    previousHCP: params.previousHCP ?? null,
    handicapIndex: params.handicapIndex ?? null,
    hcpDelta: params.hcpDelta ?? null,
    userId: params.userId,
    importSource: 'federgolf-sheet',
    createdAt: serverTimestamp(),
  };
}
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: error in `importRoundsBatch` (it doesn't pass `previousHCP` yet) — **this is expected** and will be fixed in Task 5.

- [ ] **Step 4: Commit**

```bash
git add src/components/ImportRounds/RoundBuilder.utils.ts
git commit -m "feat: thread previousHCP through RoundBuilder"
```

---

## Task 3: Update `prepareRoundSaveBatch` to accept and write `previousHCP`

**Files:**
- Modify: `src/utils/round/round.utils.tsx:84-120`

- [ ] **Step 1: Add `previousHCP` parameter to `prepareRoundSaveBatch`**

Replace the function in `src/utils/round/round.utils.tsx`:

```ts
export const prepareRoundSaveBatch = (
  batch: WriteBatch,
  userId: string,
  general: INewRound,
  totals: IRoundTotals,
  currentRoundDistances: IDistance[],
  holes: IShots[],
  scoreDifferential?: number | null,
  previousHCP?: number | null,
  handicapIndex?: number | null,
  hcpDelta?: number | null
): string => {
  const playerRoundsCollectionRef = collection(db, 'players', userId, 'rounds');
  const roundRef = doc(playerRoundsCollectionRef);
  const roundId = roundRef.id;

  batch.set(roundRef, {
    ...general,
    totals: totals,
    distances: currentRoundDistances,
    userId: userId,
    scoreDifferential: scoreDifferential ?? null,
    previousHCP: previousHCP ?? null,
    handicapIndex: handicapIndex ?? null,
    hcpDelta: hcpDelta ?? null,
    roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  holes.forEach((holeData: IShots) => {
    const holeDocId = holeData.holeNumber?.toString();
    if (holeDocId && holeData.holeNumber > 0) {
      const holeRef = doc(db, 'players', userId, 'rounds', roundId, 'holes', holeDocId);
      batch.set(holeRef, holeData);
    } else {
      console.warn("Skipping hole due to missing/invalid holeNumber: ", holeData);
    }
  });
  return roundId;
};
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: error in `saveNewRound` (it doesn't pass `previousHCP` yet) — **this is expected** and will be fixed in Task 4.

- [ ] **Step 3: Commit**

```bash
git add src/utils/round/round.utils.tsx
git commit -m "feat: thread previousHCP through prepareRoundSaveBatch"
```

---

## Task 4: Update `saveNewRound` to compute and pass `previousHCP`

**Files:**
- Modify: `src/utils/firestore/round.firestore.ts:185-234`

- [ ] **Step 1: Lift `previousHCP` out of the `try` and pass it to `prepareRoundSaveBatch`**

In `src/utils/firestore/round.firestore.ts`, replace the section that declares `let handicapIndex` / `let hcpDelta` through the call to `prepareRoundSaveBatch`:

```ts
    // Compute Handicap Index, previousHCP, and delta (per D-04, D-08, HCP-PERSIST)
    let handicapIndex: number | null = null;
    let hcpDelta: number | null = null;
    let previousHCP: number | null = null;
    try {
      // CR-02 fix: legacy users (pre-Phase-5 rounds, no stored handicapIndex) need
      // the live WHS recalc, not the player's initialHCP, as the previousHCP for
      // the new hcpDelta computation.
      const mostRecent = store.roundsList[0];
      let prevHCP: number | null;
      if (mostRecent?.handicapIndex != null) {
        prevHCP = mostRecent.handicapIndex;
      } else if (store.roundsList.length > 0) {
        // Legacy fallback: live WHS recalc from existing SDs (mirrors D-15 chart branch)
        const legacySDs = store.roundsList
          .map((r) => r.scoreDifferential)
          .filter((sd): sd is number => sd !== null && sd !== undefined);
        prevHCP = calculateHandicapIndex(legacySDs);
      } else {
        prevHCP = player?.initialHCP ?? null;
      }
      if (prevHCP != null && scoreDifferential != null) {
        const previousSDs = store.roundsList
          .map((r) => r.scoreDifferential)
          .filter((sd): sd is number => sd !== null && sd !== undefined)
          .slice(0, 19);
        const virtualSDs = [scoreDifferential, ...previousSDs].slice(0, 20);
        const newHI = calculateHandicapIndex(virtualSDs);
        if (newHI != null) {
          handicapIndex = newHI;
          previousHCP = prevHCP;
          hcpDelta = +((newHI - prevHCP)).toFixed(1);
        }
      }
    } catch (hiError: any) {
      console.error('saveNewRound: Error computing Handicap Index:', hiError);
      // Round save continues without HI/delta — non-blocking
    }

    const batchSaveRound = writeBatch(db);
    savedRoundId = prepareRoundSaveBatch(
      batchSaveRound,
      userId,
      general,
      currentTotals,
      currentRoundDistances,
      holes,
      scoreDifferential,
      previousHCP,
      handicapIndex,
      hcpDelta
    );
    await batchSaveRound.commit();
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/firestore/round.firestore.ts
git commit -m "feat: persist previousHCP on new round save"
```

---

## Task 5: Update `importRoundsBatch` to capture `previousHCP` per round

**Files:**
- Modify: `src/utils/firestore/round.firestore.ts:69-135`

- [ ] **Step 1: Capture `previousHCP` in the loop and pass it to `buildRoundDocument`**

In `src/utils/firestore/round.firestore.ts`, the `importRoundsBatch` function uses `writeBatch` + `batch.set` directly (not `buildRoundDocument` for the final write). Update the loop to also compute `previousHCP` and include it in the document:

```ts
  for (const roundDoc of sortedDocs) {
    const newSD = roundDoc.scoreDifferential;
    let handicapIndex: number | null = null;
    let hcpDelta: number | null = null;
    let previousHCP: number | null = runningHCP;

    if (runningHCP != null && newSD != null) {
      const virtualSDs = [newSD, ...runningSDs].slice(0, 20);
      const newHI = calculateHandicapIndex(virtualSDs);
      if (newHI != null) {
        handicapIndex = newHI;
        hcpDelta = +((newHI - runningHCP)).toFixed(1);
      }
    } else if (runningHCP == null) {
      previousHCP = null;
    }

    const enrichedDoc: IRoundImportDocument = {
      ...roundDoc,
      previousHCP,
      handicapIndex,
      hcpDelta,
    };

    const batch = writeBatch(db);
    const roundRef = doc(collection(db, 'players', userId, 'rounds'));
    roundIds.push(roundRef.id);
    batch.set(roundRef, enrichedDoc);
    await batch.commit();
    console.log(`importRoundsBatch: imported round ${roundRef.id} (handicapIndex=${handicapIndex}, hcpDelta=${hcpDelta})`);

    if (newSD != null) {
      runningSDs = [newSD, ...runningSDs].slice(0, 19);
    }
    if (handicapIndex != null) {
      runningHCP = handicapIndex;
    } else {
      runningHCP = null;
    }
  }
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/firestore/round.firestore.ts
git commit -m "feat: persist previousHCP on import rounds"
```

---

## Task 6: Create `backfillHcpHistory` utility (TDD)

**Files:**
- Create: `src/utils/firestore/backfillHcpHistory.utils.ts`
- Create: `src/utils/firestore/backfillHcpHistory.utils.test.ts`

The function is a small orchestrator around `calculateHandicapIndex`. The **calculation** is the unit-testable part. The Firestore I/O is best tested via manual UAT or with a Firestore emulator (not configured here). To keep TDD viable, we extract the calculation into a pure helper and unit-test that, then keep the I/O wrapper thin.

### Step A: write the failing test

- [ ] **Step 1: Create the test file `src/utils/firestore/backfillHcpHistory.utils.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { computeRoundHcpHistory } from './backfillHcpHistory.utils';

describe('computeRoundHcpHistory', () => {
  it('returns empty for empty input', () => {
    const out = computeRoundHcpHistory([], 18.0);
    expect(out).toEqual([]);
  });

  it('anchors first round to initialHCP', () => {
    const out = computeRoundHcpHistory(
      [{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 }],
      18.0
    );
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      id: 'r1',
      previousHCP: 18.0,
      hcpDelta: +(12.0 - 18.0).toFixed(1), // -6.0
    });
    expect(out[0].handicapIndex).toBe(12.0);
  });

  it('chains subsequent rounds off previous handicapIndex', () => {
    const out = computeRoundHcpHistory(
      [
        { id: 'r1', roundDate: 1, scoreDifferential: 12.0 },
        { id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
      ],
      18.0
    );
    expect(out).toHaveLength(2);
    expect(out[1]).toMatchObject({
      id: 'r2',
      previousHCP: 12.0, // anchored to r1's handicapIndex
    });
    expect(out[1].hcpDelta).toBe(+(out[1].handicapIndex! - 12.0).toFixed(1));
  });

  it('skips rounds with null scoreDifferential', () => {
    const out = computeRoundHcpHistory(
      [
        { id: 'r1', roundDate: 1, scoreDifferential: null },
        { id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
      ],
      18.0
    );
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe('r2');
    expect(out[0].previousHCP).toBe(18.0); // initialHCP because r1 was skipped
  });

  it('returns null previousHCP/hcpDelta for first round when no initialHCP', () => {
    const out = computeRoundHcpHistory(
      [{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 }],
      null
    );
    expect(out[0].previousHCP).toBeNull();
    expect(out[0].hcpDelta).toBeNull();
    expect(out[0].handicapIndex).toBe(12.0);
  });

  it('produces null hcpDelta when first round has no anchor and we cannot compute delta', () => {
    const out = computeRoundHcpHistory(
      [
        { id: 'r1', roundDate: 1, scoreDifferential: 12.0 },
        { id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
      ],
      null
    );
    // r1: no anchor → previousHCP null, hcpDelta null
    expect(out[0].previousHCP).toBeNull();
    expect(out[0].hcpDelta).toBeNull();
    // r2: anchored to r1.handicapIndex
    expect(out[1].previousHCP).toBe(12.0);
    expect(out[1].hcpDelta).toBe(+(out[1].handicapIndex! - 12.0).toFixed(1));
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run backfillHcpHistory`
Expected: all tests fail with "Cannot find module './backfillHcpHistory.utils'" or "computeRoundHcpHistory is not a function".

### Step B: implement

- [ ] **Step 3: Create `src/utils/firestore/backfillHcpHistory.utils.ts`**

```ts
/**
 * One-time backfill of per-round HCP history fields.
 *
 * Walks a player's rounds chronologically, computing `previousHCP`,
 * `handicapIndex`, and `hcpDelta` using the same formula as
 * `importRoundsBatch`. The first round's `previousHCP` is anchored to
 * the player's `initialHCP` (or null if absent). Subsequent rounds
 * anchor to the previous round's `handicapIndex`.
 *
 * Pure helper `computeRoundHcpHistory` is unit-tested; the Firestore
 * wrapper `backfillHcpHistory` is integration-tested manually.
 */

import {
  collection,
  getDocs,
  orderBy,
  query,
  writeBatch,
  doc,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebase/firebase.utils';
import { calculateHandicapIndex } from '@/utils/whs/hi.utils';
import { IBasicRoundData } from '@/types/roundData.types';

export interface IRoundHcpInput {
  id: string;
  roundDate: number;
  scoreDifferential: number | null;
}

export interface IRoundHcpComputed {
  id: string;
  previousHCP: number | null;
  handicapIndex: number | null;
  hcpDelta: number | null;
}

/**
 * Pure calculation: given a chronologically-sorted list of rounds and
 * the player's initialHCP, return the per-round HCP fields to write.
 */
export const computeRoundHcpHistory = (
  rounds: IRoundHcpInput[],
  initialHCP: number | null
): IRoundHcpComputed[] => {
  const result: IRoundHcpComputed[] = [];
  let runningSDs: number[] = [];
  let runningHCP: number | null = initialHCP;

  for (const round of rounds) {
    let previousHCP: number | null = runningHCP;
    let handicapIndex: number | null = null;
    let hcpDelta: number | null = null;

    if (round.scoreDifferential != null) {
      const virtualSDs = [round.scoreDifferential, ...runningSDs].slice(0, 20);
      const newHI = calculateHandicapIndex(virtualSDs);
      if (newHI != null) {
        handicapIndex = newHI;
        if (previousHCP != null) {
          hcpDelta = +(newHI - previousHCP).toFixed(1);
        }
        runningSDs = [round.scoreDifferential, ...runningSDs].slice(0, 19);
        runningHCP = newHI;
      } else {
        // HI could not be computed (shouldn't happen with a non-null SD)
        previousHCP = null;
        runningHCP = null;
      }
    } else {
      // Round lacks a scoreDifferential — cannot compute anything; break the chain
      previousHCP = null;
      runningHCP = null;
    }

    result.push({ id: round.id, previousHCP, handicapIndex, hcpDelta });
  }

  return result;
};

export interface IBackfillResult {
  success: boolean;
  processed: number;
  updated: number;
  skipped: number;
  error?: string;
}

/**
 * Fetch all rounds, compute the HCP history, and write a single batch.
 * Idempotent: re-runs produce the same values.
 */
export const backfillHcpHistory = async (
  userId: string
): Promise<IBackfillResult> => {
  if (!userId) {
    return { success: false, processed: 0, updated: 0, skipped: 0, error: 'User ID required' };
  }

  try {
    // 1. Fetch player.initialHCP
    const playerDocRef = doc(db, 'players', userId);
    const playerSnap = await getDoc(playerDocRef);
    const initialHCP: number | null = playerSnap.exists()
      ? (playerSnap.data().initialHCP ?? null)
      : null;

    // 2. Fetch all rounds, sorted by date ascending
    const roundsColRef = collection(db, 'players', userId, 'rounds');
    const roundsQuery = query(roundsColRef, orderBy('roundDate', 'asc'));
    const roundsSnap = await getDocs(roundsQuery);

    if (roundsSnap.empty) {
      return { success: true, processed: 0, updated: 0, skipped: 0 };
    }

    const inputs: IRoundHcpInput[] = roundsSnap.docs.map((d) => {
      const data = d.data();
      const roundDate =
        data.roundDate instanceof Timestamp
          ? data.roundDate.toMillis()
          : Number(data.roundDate);
      const sd = data.scoreDifferential ?? null;
      return { id: d.id, roundDate, scoreDifferential: sd };
    });

    // 3. Compute the values (pure)
    const computed = computeRoundHcpHistory(inputs, initialHCP);

    // 4. Build batch
    const batch = writeBatch(db);
    let updated = 0;
    let skipped = 0;
    const processed = computed.length;

    for (let i = 0; i < computed.length; i++) {
      const next = computed[i];
      const origDoc = roundsSnap.docs[i];
      const origData = origDoc.data();
      const samePrev = origData.previousHCP === next.previousHCP;
      const sameHI = origData.handicapIndex === next.handicapIndex;
      const sameDelta = origData.hcpDelta === next.hcpDelta;
      if (samePrev && sameHI && sameDelta) {
        skipped += 1;
        continue;
      }
      const roundRef = doc(db, 'players', userId, 'rounds', next.id);
      batch.update(roundRef, {
        previousHCP: next.previousHCP,
        handicapIndex: next.handicapIndex,
        hcpDelta: next.hcpDelta,
      });
      updated += 1;
    }

    if (updated > 0) {
      await batch.commit();
    }

    return { success: true, processed, updated, skipped };
  } catch (err: any) {
    console.error('backfillHcpHistory failed:', err);
    return {
      success: false,
      processed: 0,
      updated: 0,
      skipped: 0,
      error: err?.message ?? 'Unknown error',
    };
  }
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run backfillHcpHistory`
Expected: all 6 tests pass.

- [ ] **Step 5: Run type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/utils/firestore/backfillHcpHistory.utils.ts src/utils/firestore/backfillHcpHistory.utils.test.ts
git commit -m "feat: add backfillHcpHistory utility with pure calc helper"
```

---

## Task 7: Add Settings UI for backfill trigger

**Files:**
- Modify: `src/components/Settings/Settings.component.tsx:24-140`

The Settings page is rendered inside the `SnackbarProvider` (root layout), so `useSnackbar` is available. The `roundsList` from `useAppStore` is already used by other pages.

- [ ] **Step 1: Import the backfill function and snackbar hook**

At the top of `src/components/Settings/Settings.component.tsx`, add the import:

```ts
import { backfillHcpHistory } from '@/utils/firestore/backfillHcpHistory.utils';
import { useSnackbar } from '@/components/Admin/SnackbarProvider.component';
import { Button, CircularProgress } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { IBasicRoundData } from '@/types/roundData.types';
```

- [ ] **Step 2: Add backfill state, condition, and handlers inside the `Settings` component**

Inside the `Settings` function (after the existing `useState` declarations), add:

```ts
  const { showSnackbar } = useSnackbar();
  const roundsList = useAppStore((state) => state.roundsList) as IBasicRoundData[];

  const roundsNeedingBackfill = roundsList.filter(
    (r) =>
      r.previousHCP == null ||
      r.handicapIndex == null ||
      r.hcpDelta == null
  ).length;

  const [backfillConfirmOpen, setBackfillConfirmOpen] = useState(false);
  const [isBackfilling, setIsBackfilling] = useState(false);

  const handleBackfill = async () => {
    if (!playerId) return;
    setIsBackfilling(true);
    try {
      const result = await backfillHcpHistory(playerId);
      if (result.success) {
        showSnackbar(
          `Updated ${result.updated} round${result.updated !== 1 ? 's' : ''}, ${result.skipped} already up to date.`,
          'success'
        );
        // Refresh player details so roundsList reflects the new fields
        await useAppStore.getState().getPlayerDetails(playerId);
      } else {
        showSnackbar(`Backfill failed: ${result.error ?? 'unknown error'}`, 'error');
      }
    } catch (err: any) {
      showSnackbar(`Backfill failed: ${err?.message ?? 'unknown error'}`, 'error');
    } finally {
      setIsBackfilling(false);
      setBackfillConfirmOpen(false);
    }
  };
```

- [ ] **Step 3: Add the backfill Card section and confirmation dialog**

After the existing "Initial Handicap" `Card` (just before the closing `</Box>` on line 134 of the original file), add:

```tsx
      {roundsNeedingBackfill > 0 && (
        <Box sx={{ mt: 3, maxWidth: 480 }}>
          <Card>
            <CardContent>
              <Typography variant="title3" gutterBottom>
                HCP History Backfill
              </Typography>
              <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
                {roundsNeedingBackfill} of your existing rounds don't have
                Old HCP, New HCP, and Δ values yet. Run this one-time
                recalculation to compute them using the same formula as
                new rounds. New rounds will be calculated automatically
                going forward.
              </Typography>
              {isBackfilling ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body" color="text.secondary">
                    Recalculating {roundsNeedingBackfill} rounds...
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setBackfillConfirmOpen(true)}
                  disabled={!playerId}
                >
                  Recalculate HCP history
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog
        open={backfillConfirmOpen}
        onClose={() => !isBackfilling && setBackfillConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Recalculate Handicap History?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will update the Old HCP, New HCP, and Δ fields on every
            round using the same formula as new rounds. The operation
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setBackfillConfirmOpen(false)}
            disabled={isBackfilling}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackfill}
            disabled={isBackfilling}
          >
            Recalculate
          </Button>
        </DialogActions>
      </Dialog>
```

- [ ] **Step 4: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Settings/Settings.component.tsx
git commit -m "feat: add manual HCP history backfill trigger to Settings"
```

---

## Task 8: Add Old HCP and New HCP columns to the Handicap History table

**Files:**
- Modify: `src/components/HandicapHistory/HandicapHistory.component.tsx:199-272`

- [ ] **Step 1: Add two new `<TableCell>` headers between "Score Diff." and "Δ"**

In `src/components/HandicapHistory/HandicapHistory.component.tsx`, replace the `<TableHead>` block:

```tsx
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Tee</TableCell>
                      <TableCell align="right">
                        Strokes
                      </TableCell>
                      <TableCell align="right">
                        Score Diff.
                      </TableCell>
                      <TableCell align="right">
                        Old HCP
                      </TableCell>
                      <TableCell align="right">
                        New HCP
                      </TableCell>
                      <TableCell align="right">
                        Δ
                      </TableCell>
                      <TableCell align="center">
                        Used
                      </TableCell>
                    </TableRow>
                  </TableHead>
```

- [ ] **Step 2: Add two new `<TableCell>` rows between Score Diff. and Δ in the body**

In the same file, replace the `TableBody` row block (the part that renders Strokes / Score Diff. / Δ / Used). Replace the four cells in question with the six-cell version:

```tsx
                                  <TableCell align="right">
                                    {round.totals?.score
                                      ?.totals ?? '\u2014'}
                                  </TableCell>
                                  <TableCell align="right">
                                    {round.scoreDifferential !=
                                    null
                                      ? round.scoreDifferential.toFixed(
                                              1
                                          )
                                      : '\u2014'}
                                  </TableCell>
                                  <TableCell align="right">
                                    {round.previousHCP != null
                                      ? round.previousHCP.toFixed(1)
                                      : '\u2014'}
                                  </TableCell>
                                  <TableCell align="right">
                                    {round.handicapIndex != null
                                      ? round.handicapIndex.toFixed(1)
                                      : '\u2014'}
                                  </TableCell>
                                  <TableCell align="right">
                                    {round.hcpDelta != null
                                      ? `${
                                              round.hcpDelta > 0
                                                  ? '+'
                                                  : ''
                                          }${round.hcpDelta.toFixed(1)}`
                                      : '\u2014'}
                                  </TableCell>
                                  <TableCell align="center">
                                    {isHighlighted
                                      ? '\u2606'
                                      : ''}
                                  </TableCell>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HandicapHistory/HandicapHistory.component.tsx
git commit -m "feat: add Old HCP and New HCP columns to handicap history table"
```

---

## Task 9: Strip chart branches and update `progressionData` logic

**Files:**
- Modify: `src/components/HandicapHistory/HandicapHistory.component.tsx:71-137`

- [ ] **Step 1: Replace `currentHI` with a simple sort-and-pick from `roundsWithSD`**

Replace the `currentHI` `useMemo` block (lines 71-84) with:

```ts
  // Current Handicap Index — prefer the most recent round's stored handicapIndex.
  // After the backfill runs, this is always set when rounds exist.
  const currentHI = useMemo(() => {
    if (!roundsList.length) return null;
    const mostRecentWithHI = roundsList
      .slice()
      .sort((a, b) => b.roundDate - a.roundDate)
      .find((r) => r.handicapIndex != null);
    return mostRecentWithHI?.handicapIndex ?? null;
  }, [roundsList]);
```

- [ ] **Step 2: Replace `progressionData` with a simple chronological filter**

Replace the entire `progressionData` `useMemo` block (lines 92-137) with:

```ts
  // HCP progression — chronological, one point per round with stored HI.
  // The dashed reference line at initialHCP (rendered separately) provides
  // the "started here" context.
  const progressionData = useMemo(() => {
    return [...roundsWithSD]
      .filter((r) => r.handicapIndex != null)
      .sort((a, b) => a.roundDate - b.roundDate)
      .map((r) => ({ date: r.roundDate, hi: r.handicapIndex as number }));
  }, [roundsWithSD]);
```

- [ ] **Step 3: Verify the `ChartsReferenceLine` block is still present**

The existing JSX at the bottom of the file (around lines 319-328) should remain untouched:

```tsx
                          {hasInitialHCP && (
                            <ChartsReferenceLine
                              y={initialHCP as number}
                              label="Initial HCP"
                              lineStyle={{
                                strokeDasharray: '5 5',
                                stroke: '#888',
                              }}
                            />
                          )}
```

Confirm it is still there; no changes needed.

- [ ] **Step 4: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/HandicapHistory/HandicapHistory.component.tsx
git commit -m "feat: simplify handicap history chart to per-round HI line"
```

---

## Task 10: Final verification

- [ ] **Step 1: Run the full test suite**

Run: `npm test -- --run`
Expected: all tests pass, including the new `backfillHcpHistory` tests.

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Run the WHS calculation tests**

Run: `npm run test:calc:whs`
Expected: all WHS tests pass (no formula changes — this confirms the backfill uses the same calculations as the existing tests).

- [ ] **Step 5: Manual UAT — backfill on a mixed-state account**

On a test account with at least 5 rounds, where some have `handicapIndex` / `hcpDelta` and some don't:

1. Open Settings. Confirm the "HCP History Backfill" card is visible with the correct count.
2. Click "Recalculate HCP history" → confirm dialog → confirm.
3. Confirm the snackbar reports the correct `updated` + `skipped` count.
4. Re-open Settings. Confirm the card is gone.
5. Open `/handicap-history`. Confirm:
   - All rows have Old HCP / New HCP / Δ values.
   - The chart shows a line through all rounds.
   - The dashed reference line at `initialHCP` is still visible.

- [ ] **Step 6: Manual UAT — backfill idempotency**

1. Edit any round in the Firestore console and clear its `previousHCP` field.
2. Refresh the app, open Settings. Confirm the backfill card reappears with `count === 1`.
3. Run the backfill. Confirm `updated === 1, skipped === (rounds.length - 1)`.

- [ ] **Step 7: Manual UAT — new round save**

1. Save a new round via the New Round form.
2. In the Firestore console, confirm the new round document has `previousHCP`, `handicapIndex`, and `hcpDelta` populated.

- [ ] **Step 8: Commit any straggler changes (e.g. lint fixes)**

```bash
git status
# if anything changed:
git add -A
git commit -m "chore: lint and type-check fixes"
```

---

## Self-review notes

- **Spec coverage:** §1 data model = Task 1. §2 save paths = Tasks 4, 5 (with 2, 3 as wiring). §3 backfill = Task 6. §4 Settings UI = Task 7. §5 table = Task 8. §6 chart = Task 9. §8 verification = Task 10.
- **Type consistency:** `previousHCP` is the field name throughout. The `IBackfillResult` shape in Task 6 matches the snackbar message format in Task 7. `computeRoundHcpHistory` is exported and used only inside the same file (no external call sites, so no signature drift risk).
- **No placeholders:** every step has either a code block or an exact command.
