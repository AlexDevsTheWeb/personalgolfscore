/**
 * WHS (World Handicap System) test data definitions.
 *
 * Test cases for Score Differential, Handicap Index, and Playing Handicap
 * calculations following WHS Rules 5.1 and 5.2a.
 *
 * [CITED: CONTEXT.md canonical refs — WHS formulas]
 */

export interface IScoreDifferentialTestCase {
	name: string;
	input: {
		par: number;
		courseRating: number;
		slopeRating: number;
		stablefordPoints: number;
		playingHCP: number;
	};
	expectedAGS: number;
	expectedSD: number;
}

export interface IHandicapIndexTestCase {
	name: string;
	scoreDifferentials: number[];
	expectedHI: number | null;
}

export interface IProjectedHITestCase {
	name: string;
	currentSDs: number[];
	simulatedSD: number;
	expectedHI: number | null;
}

export interface IPlayingHCPTestCase {
	name: string;
	handicapIndex: number;
	courseRating: number;
	slopeRating: number;
	par: number;
	expectedPlayingHCP: number;
}

/**
 * Score Differential test cases — WHS Rule 5.1
 *
 * SD = (AGS - CR - PCC) × (113 / SR), PCC = 0
 * AGS = PAR + Playing HCP + (36 - Stableford points)
 *
 * NOTE: The "good round" uses playingHCP=12 to produce the expected AGS=78 / SD=4.6.
 * The plan's acceptance criteria reference playingHCP=18 but the correct WHS formula
 * yields AGS=78 only with playingHCP=12. This is tracked as a plan deviation.
 */
export const WHSScoreDifferentialTestCases: IScoreDifferentialTestCase[] = [
	{
		name: 'Good round - Standard Course',
		input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 42, playingHCP: 12 },
		expectedAGS: 78,
		expectedSD: 4.6,
	},
	{
		name: 'Average round - Standard Course',
		input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 36, playingHCP: 18 },
		expectedAGS: 90,
		expectedSD: 14.6,
	},
	{
		name: 'Poor round - Standard Course',
		input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 24, playingHCP: 18 },
		expectedAGS: 102,
		expectedSD: 24.7,
	},
	{
		name: 'Different course - easier layout',
		input: { par: 70, courseRating: 68.5, slopeRating: 125, stablefordPoints: 38, playingHCP: 14 },
		expectedAGS: 82,
		expectedSD: 12.2,
	},
	{
		name: 'High slope course',
		input: { par: 72, courseRating: 74.0, slopeRating: 145, stablefordPoints: 30, playingHCP: 20 },
		expectedAGS: 98,
		expectedSD: 18.7,
	},
	{
		name: 'Zero Stableford points (worst possible)',
		input: { par: 72, courseRating: 72.5, slopeRating: 135, stablefordPoints: 0, playingHCP: 18 },
		expectedAGS: 126,
		expectedSD: 44.7,
	},
];

/**
 * Handicap Index test cases — WHS Rule 5.2a
 *
 * With 20 rounds: average lowest 8 of most recent 20 SDs.
 * With < 20 rounds: use WHS scaling table.
 * Returns null if no rounds.
 */
export const WHSHandicapIndexTestCases: IHandicapIndexTestCase[] = [
	{
		name: '20 rounds - best 8',
		// Best 8: [10.0, 11.0, 12.0, 12.0, 13.0, 13.0, 14.0, 14.0] — avg = 99/8 = 12.4
		scoreDifferentials: [
			15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, // indices 0-7 (most recent, worst)
			10.0, 11.0, 12.0, 12.0, 13.0, 13.0, 14.0, 14.0, // indices 8-15 (best 8)
			23.0, 24.0, 25.0, 26.0, // indices 16-19 (oldest)
		],
		expectedHI: 12.4,
	},
	{
		name: '5 rounds - lowest 1 (scaling)',
		scoreDifferentials: [14.6, 10.2, 12.1, 15.0, 9.8],
		expectedHI: 9.8,
	},
	{
		name: '3 rounds - lowest 1 (minimum)',
		scoreDifferentials: [14.6, 10.2, 12.1],
		expectedHI: 10.2,
	},
	{
		name: '2 rounds - lowest 1 (scaling)',
		scoreDifferentials: [14.6, 10.2],
		expectedHI: 10.2, // lowest 1: 10.2
	},
	{
		name: '1 round - that SD is HI',
		scoreDifferentials: [14.6],
		expectedHI: 14.6,
	},
	{
		name: 'Empty array - returns null (no data)',
		scoreDifferentials: [],
		expectedHI: null,
	},
	{
		name: '8 rounds - lowest 2 (scaling)',
		scoreDifferentials: [15.0, 14.5, 13.0, 12.5, 20.0, 18.0, 11.0, 10.5],
		expectedHI: 10.8, // lowest 2: 10.5 + 11.0 = 21.5 / 2 = 10.75 → 10.8
	},
	{
		name: '15 rounds - lowest 5 (scaling)',
		scoreDifferentials: [
			20.0, 19.0, 18.0, 17.0, 16.0, 15.0, 14.0, 13.0,
			12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0,
		],
		expectedHI: 8.0, // lowest 5: 6+7+8+9+10 = 40/5 = 8.0
	},
];

/**
 * Projected Handicap Index test cases — virtual array pattern (SIM-03)
 */
export const WHSProjectedHITestCases: IProjectedHITestCase[] = [
	{
		name: '5 current SDs + simulated SD (virtual has 6 entries)',
		currentSDs: [14.6, 10.2, 12.1, 15.0, 9.8],
		simulatedSD: 4.6,
		// Virtual: [4.6, 14.6, 10.2, 12.1, 15.0, 9.8] → 6 entries
		// WHS scaling for 6 rounds = lowest 2 → [4.6, 9.8] = avg 7.2
		expectedHI: 7.2,
	},
	{
		name: '20 current SDs + simulated SD (drops oldest)',
		currentSDs: [
			15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0,
			10.0, 11.0, 12.0, 12.0, 13.0, 13.0, 14.0, 14.0,
			23.0, 24.0, 25.0, 26.0,
		],
		simulatedSD: 5.0,
		// Virtual: [5.0, 15.0, ..., 25.0] (drops index 19 = 26.0) → 20 entries
		// WHS scaling for 20 rounds = lowest 8
		// Best 8: 5.0, 10.0, 11.0, 12.0, 12.0, 13.0, 13.0, 14.0 = 90/8 = 11.25 → 11.3
		expectedHI: 11.3,
	},
	{
		name: 'Only 1 current SD — virtual has 2 entries, lowest of both',
		currentSDs: [14.6],
		simulatedSD: 4.6,
		// Virtual: [4.6, 14.6] → 2 entries → scaling=1 → lowest 1 → 4.6
		expectedHI: 4.6,
	},
];

/**
 * Playing Handicap test cases — D-09 formula
 *
 * Playing HCP = HI × (SR / 113) + (CR - PAR)
 */
export const WHSPlayingHCPTestCases: IPlayingHCPTestCase[] = [
	{
		name: 'Standard calculation',
		handicapIndex: 12.4,
		courseRating: 72.5,
		slopeRating: 135,
		par: 72,
		expectedPlayingHCP: 15, // Math.round(12.4 * 135/113 + (72.5 - 72)) = Math.round(15.31) = 15
	},
	{
		name: 'High handicap index',
		handicapIndex: 26.4,
		courseRating: 72.5,
		slopeRating: 135,
		par: 72,
		expectedPlayingHCP: 32, // Math.round(26.4 * 135/113 + 0.5) = Math.round(32.03) = 32
	},
	{
		name: 'Low slope course',
		handicapIndex: 10.0,
		courseRating: 68.0,
		slopeRating: 113, // Standard slope
		par: 70,
		expectedPlayingHCP: 8, // Math.round(10 * 113/113 + (68 - 70)) = Math.round(10 - 2) = 8
	},
	{
		name: 'Zero handicap index',
		handicapIndex: 0.0,
		courseRating: 72.0,
		slopeRating: 125,
		par: 72,
		expectedPlayingHCP: 0, // Math.round(0 * 125/113 + 0) = Math.round(0) = 0
	},
];
