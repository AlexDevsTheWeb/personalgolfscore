# Issue #137 — Import Rounds HCP Chain Anchor Bug

## Summary

When importing rounds in multiple batches via the `import-rounds` route, the first round of each subsequent batch gets an incorrect `previousHCP` because `importRoundsBatch` anchors the running HCP chain to the player's `initialHCP` (a fixed value) instead of their `currentHCP` (which reflects the last computed HI after all prior imports).

## Impact

- The HCP History chart shows correct `handicapIndex` values per round (computed from score differentials)
- But `previousHCP` and `hcpDelta` are wrong on the first round of each subsequent import batch
- Example: initialHCP=14.0, after batch 1 currentHCP=11.5. Batch 2's first round gets `previousHCP=14.0` instead of `previousHCP=11.5`

## Root Cause

In `app.store.ts:869`:
```typescript
const initialHCP = state.player?.initialHCP ?? null;
```

Passes `initialHCP` (static, user-set value) as the chain anchor to `importRoundsBatch`. After prior import batches have updated `currentHCP` to the last computed HI, the next batch still anchors to the original `initialHCP`.

In `round.firestore.ts:88`:
```typescript
let runningHCP: number | null = initialHCP;
```

The running chain resets to the fixed initial value instead of picking up from the last computed HI.

## Trace

With initialHCP=14.0, three rounds imported in two batches:

| Batch | Round | prevHCP (actual) | prevHCP (should be) | HI (based on SDs) |
|-------|-------|---|---|---|
| 1     | A     | 14.0 | 14.0 | 12.0 |
| 1     | B     | 12.0 | 12.0 | 11.5 |
| 2     | C     | **14.0** ✗ | **11.5** | 10.0 |

The `handicapIndex` is correct in all cases (computed from SDs, not runningHCP). Only `previousHCP` and `hcpDelta` are wrong.

## Related

- The Settings page has a "Recalculate HCP History" button that runs `backfillHcpHistory()`, which recomputes all per-round HCP fields from scratch
- The `backfillHcpHistory` utility uses the same `computeRoundHcpHistory()` logic but starts fresh with all rounds chronologically — it is NOT affected by this bug

## Fix

1. **`app.store.ts:869`**: Change from `initialHCP` to `currentHCP ?? initialHCP`
2. **`round.firestore.ts:88`**: Update parameter/variable to reflect using the anchor correctly

The fix ensures:
- If `currentHCP` exists (after prior imports) → chain starts from the last computed HI
- If no `currentHCP` but `initialHCP` exists → chain starts from initialHCP (correct for first batch)
- If neither → null (graceful, no HI/delta computed for that batch)

## Resolution (2026-06-13)

Fixed in commit `641efac` on branch `fix/import-rounds-hcp-chain-anchor`.
PR #138 → `development` (Closes #137).

**After merge**: go to Settings → click "Recalculate HCP History" to fix existing rounds' `previousHCP`/`hcpDelta`. Future imports will chain correctly automatically.

| File | Change |
|------|--------|
| `app.store.ts:869` | Changed `const initialHCP = state.player?.initialHCP ?? null` → `const anchorHCP = state.player?.currentHCP ?? state.player?.initialHCP ?? null` |
| `round.firestore.ts:73,88` | Renamed param `initialHCP` → `anchorHCP`; `runningHCP` initialized from it |
