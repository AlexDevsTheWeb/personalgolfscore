/**
 * WHS Handicap Index calculation utilities.
 *
 * WHS Rule 5.2a: Handicap Index = average of lowest N Score Differentials
 * from the most recent 20 rounds, where N depends on the number of rounds
 * available (see HI_SCALING table).
 *
 * D-04: HI is computed on-the-fly — never stored as a single persisted value.
 * SIM-03: Projected HI uses a virtual array — no database writes.
 *
 * Pattern: Pure functions, no side effects, typed parameters and returns.
 * Uses safeDivide for all division.
 *
 * [CITED: CONTEXT.md canonical refs — WHS Rule 5.2a]
 */

import { safeDivide } from '@/utils/calculator/math.utils';

/**
 * WHS Handicap Index scaling table (Rule 5.2a).
 *
 * Maps the number of available Score Differentials to the number of
 * lowest SDs to average.
 *
 * | Rounds | SDs to Avg |
 * |--------|-----------|
 * | 1-2    | 1         |
 * | 3-5    | 1         |
 * | 6-8    | 2         |
 * | 9-11   | 3         |
 * | 12-14  | 4         |
 * | 15-16  | 5         |
 * | 17-18  | 6         |
 * | 19     | 7         |
 * | 20     | 8         |
 */
const HI_SCALING: Record<number, number> = {
	1: 1, 2: 1,
	3: 1, 4: 1, 5: 1,
	6: 2, 7: 2, 8: 2,
	9: 3, 10: 3, 11: 3,
	12: 4, 13: 4, 14: 4,
	15: 5, 16: 5,
	17: 6, 18: 6,
	19: 7,
	20: 8,
};

/**
 * Calculate Handicap Index from an array of Score Differentials.
 *
 * The input array MUST be sorted with most recent first (descending date),
 * which matches the existing `roundsList` ordering from Firestore queries.
 *
 * @param scoreDifferentials - Array of Score Differentials, most recent first
 * @returns Handicap Index rounded to 1 decimal place, or null if no SDs
 */
export const calculateHandicapIndex = (
	scoreDifferentials: number[]
): number | null => {
	const count = Math.min(scoreDifferentials.length, 20);

	if (count === 0) {
		return null;
	}

	const toUse = HI_SCALING[count] ?? 1;

	// Take the most recent `count` entries (already in desc date order)
	const recent = scoreDifferentials.slice(0, count);

	// Sort ascending to find the lowest N SDs
	const sorted = [...recent].sort((a, b) => a - b);
	const bestN = sorted.slice(0, toUse);

	return safeDivide(
		bestN.reduce((sum, sd) => sum + sd, 0),
		bestN.length,
		1 // WHS standard: 1 decimal place
	);
};

/**
 * Calculate projected Handicap Index with a simulated Score Differential.
 *
 * Creates a virtual array where the simulated SD is placed as the most recent
 * round, followed by the last 19 real SDs. Delegates to calculateHandicapIndex.
 *
 * Per SIM-03: operates entirely in memory — no database writes.
 *
 * @param currentSDs - Current Score Differentials, most recent first
 * @param simulatedSD - The simulated Score Differential to project
 * @returns Projected Handicap Index, or null if the virtual array is empty
 */
export const calculateProjectedHandicapIndex = (
	currentSDs: number[],
	simulatedSD: number
): number | null => {
	// Virtual array: simulated SD as most recent + up to 19 real SDs
	const virtual = [simulatedSD, ...currentSDs.slice(0, 19)];
	return calculateHandicapIndex(virtual);
};
