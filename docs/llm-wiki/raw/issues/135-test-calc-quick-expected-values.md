---
source: https://github.com/AlexDevsTheWeb/personalgolfscore/issues/135
state: OPEN
created: 2026-06-13
tags: [bug, test, calc, stableford]
---

# [BUG] test:calc:quick: per-hole expected values don't sum to total

## Summary

`npm run test:calc:quick` reports FAIL on "Mixed Scenarios Test (3 holes)" — per-hole points mismatch but totals summary passes (calculatedPoints=9, totalsPoints=9).

## Root Cause

Two interacting bugs:

### Bug A: `roundHoles` set to `holeConfigs.length` instead of 18

In `src/dev-tools/testDataGenerator.ts:66`, `createTestRound` sets:

```typescript
this.roundHoles = config.holeConfigs.length;
```

For the quick 3-hole test, this makes `roundHoles = 3` instead of 18. This feeds into `calculateStablefordPoints`:

```typescript
diff = roundPlayingHCP - roundHoles; // = 15 - 3 = 12 (wrong: huge positive)
```

The `diff > 0` branch fires, adding +2 to `newPar` instead of +0. The inflated `newPar` causes `calculatePoints` to return `undefined` (no condition matches), which gets coerced to `0` via `|| 0`.

With the correct `roundHoles = 18`:
- `diff = 15 - 18 = -3`
- `diff < 0`, `hcp <= -3` is false → `newPar` unchanged
- `calculatePoints` matches eagle/birdie/par correctly

### Bug B: Wrong `expectedPoints` in test fixture

The `expectedPoints` values in the `mixedScenarios` fixture (hole 1: 5, hole 2: 3) were set based on the broken behavior and don't match the correct calculation.

## Correct Expected Values (with roundHoles=18)

| Hole | Par | Strokes | HCP | Result | Points |
|------|-----|---------|-----|--------|--------|
| 1 | 5 | 3 | 7 | Eagle | 4 |
| 2 | 4 | 3 | 12 | Birdie | 3 |
| 3 | 4 | 4 | 5 | Par | 2 |

Total: 9 — matches `calculatedPoints` and `totalsPoints`.

## Fix

1. **`testDataGenerator.ts`**: Add `roundHoles` field to `TestRoundConfig` or `courseInfo`, default to 18, use instead of `config.holeConfigs.length`
2. **`testDataGenerator.ts`**: Fix `expectedPoints` in `mixedScenarios`: hole 1 → 4, hole 2 → 3

## Acceptance Criteria

- `npm run test:calc:quick` shows ✅ for all 3 holes
- Per-hole expected values sum to the stated expected total (9)
- `npm run test:calc:edge` and `npm run test:calc:all` also pass

## Resolution (2026-06-13)

Fixed in commit `5463254` on branch `fix/test-calc-quick-expected-values`.
PR #136 → `development` (Closes #135).

| File | Change |
|------|--------|
| `testDataGenerator.ts` | Added `holes?: number` (default 18) to `TestCourseInfo`; `roundHoles` now uses `config.courseInfo.holes` instead of config length |
| `testDataGenerator.ts` | Fixed `calculationEdgeCases` hole 2 `expectedGIR` (true→false: 7 strokes−5 putts=2 to green, par3 needs ≤1) |
| `edgeCaseTests.ts` | Fixed `statisticalAnomalies` holes 1–2 `expectedPoints` (4→5: net albatross with diff=0 HCP) |

All 17 `npm run test:calc:all` scenarios pass ✅
