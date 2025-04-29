import { RootState } from '@/store/store';
import { IRoundTotals, ITotalRoundsAvg } from '@/types/roundTotals.types';
import { calculateDisplayableAverages } from '@/utils/calculator/AverageCalculator.utils';

import { createSelector } from '@reduxjs/toolkit';

// Input selector for the raw aggregated data
const selectRawTotalsAvg = (state: RootState): ITotalRoundsAvg | null | undefined =>
  state.player.player?.totalsRoundsAVG;

// Memoized selector to calculate displayable averages
export const selectDisplayableOverallTotals = createSelector(
  [selectRawTotalsAvg], // Input selector
  (rawTotalsAvg): IRoundTotals => { // Result function
    // Call the utility function to perform the calculation
    return calculateDisplayableAverages(rawTotalsAvg);
  }
);