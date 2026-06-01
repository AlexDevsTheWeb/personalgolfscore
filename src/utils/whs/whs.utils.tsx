/**
 * WHS Score Differential and Playing Handicap utilities.
 *
 * WHS Rule 5.1: Score Differential = (AGS - CR - PCC) × (113 / SR)
 *   - AGS = PAR + Playing HCP + (36 - Stableford points)
 *   - PCC = 0 (Playing Conditions Calculation — always 0 per project scope)
 *
 * D-09: Playing HCP = HI × (SR / 113) + (CR - PAR)
 *
 * Pattern: Typed Props interface → pure function → typed return.
 * Uses safeDivide from the existing math utilities.
 *
 * [CITED: CONTEXT.md canonical refs]
 */

import { safeDivide } from '@/utils/calculator/math.utils';

export interface IScoreDifferentialProps {
	par: number;
	courseRating: number;
	slopeRating: number;
	stablefordPoints: number;
	playingHCP: number;
}

export interface IScoreDifferentialResult {
	adjustedGrossScore: number;
	scoreDifferential: number;
}

/**
 * Calculate WHS Score Differential per Rule 5.1.
 *
 * SD = Math.max(0, (AGS - CR) × 113 / SR)
 * AGS = PAR + Playing HCP + (36 - Stableford points)
 * PCC = 0 (always)
 *
 * @param props - Input parameters (par, courseRating, slopeRating, stablefordPoints, playingHCP)
 * @returns Object with adjustedGrossScore and scoreDifferential (1 decimal place)
 */
export const calculateScoreDifferential = (
	props: IScoreDifferentialProps
): IScoreDifferentialResult => {
	const { par, courseRating, slopeRating, stablefordPoints, playingHCP } = props;

	const adjustedGrossScore = par + playingHCP + (36 - stablefordPoints);

	const rawSD = safeDivide(
		(adjustedGrossScore - courseRating) * 113,
		slopeRating,
		1 // WHS standard: 1 decimal place
	);

	const scoreDifferential = Math.max(0, rawSD);

	return {
		adjustedGrossScore,
		scoreDifferential,
	};
};

/**
 * Calculate Playing Handicap per D-09 formula.
 *
 * Playing HCP = HI × (SR / 113) + (CR - PAR)
 * Result is rounded to the nearest integer.
 *
 * @param handicapIndex - The player's Handicap Index
 * @param courseRating - Course Rating of the selected teebox
 * @param slopeRating - Slope Rating of the selected teebox
 * @param par - Par of the course/teebox
 * @returns Rounded Playing Handicap as an integer
 */
export const calculatePlayingHandicap = (
	handicapIndex: number,
	courseRating: number,
	slopeRating: number,
	par: number
): number => {
	return Math.round(
		handicapIndex * (slopeRating / 113) + (courseRating - par)
	);
};
