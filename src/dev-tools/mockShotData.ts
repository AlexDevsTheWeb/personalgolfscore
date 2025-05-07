import { IShots } from '@/types/roundData.types';
import { initialStateTmpHole } from '@/utils/constant.utils'; // Ensure this provides sensible defaults

// Helper to create a base shot, assuming calculations like points, gir, etc.,
// would be pre-calculated for these mocks if we're testing totalsCalculator directly.
// For simplicity, we'll mock some of these calculated fields.
// If testing the hole saving logic itself, these would be calculated by setNewHole reducer.

const createMockShot = (overrides: Partial<IShots>): IShots => {
	const baseShot: IShots = {
		...initialStateTmpHole, // Start with initial defaults
		// Essential raw inputs
		holeNumber: 1,
		par: 4,
		strokes: 0,
		putts: 0,
		puttsLength: [],
		hcp: 1,
		distance: 400,
		// Calculated fields (mocked for testing totalsCalculator)
		points: 0,
		gir: false,
		girBogey: false,
		upDown: { made: 0, attempts: 0 },
		scramble: { made: 0, attempts: 0 },
		// Default other fields that might be used in calculations
		fairway: 0,
		driveDistance: 0,
		toGreenMeters: 0,
		chipClub: '',
		greenSideL: 0,
		greenSideR: 0,
		greenSideS: 0,
		greenSideO: 0,
		puttsUnder2: 0,
		putts2_4: 0,
		putts4_6: 0,
		putts6_10: 0,
		puttsOver10: 0,
		toGreenMetersOver100: 0,
		toGreenMeters80_100: 0,
		toGreenMeters60_80: 0,
		toGreenMetersUnder60: 0,
		...overrides, // Apply specific overrides for the test case
	};

	// Mock some basic calculations if not provided in overrides
	if (overrides.strokes !== undefined && overrides.par !== undefined) {
		if (overrides.points === undefined) {
			// Simplified points logic for mock, real logic is in setNewHole
			baseShot.points = Math.max(
				0,
				baseShot.par +
					2 -
					baseShot.strokes +
					(Math.floor((baseShot.hcp + roundPlayingHCPMock - 1) / 18) +
						((baseShot.hcp + roundPlayingHCPMock - 1) % 18 >= baseShot.holeNumber
							? 1
							: 0)),
			);
		}
		if (overrides.gir === undefined && overrides.putts !== undefined) {
			baseShot.gir = baseShot.strokes - baseShot.putts <= baseShot.par - 2;
		}
	}
	return baseShot;
};

const roundPlayingHCPMock = 18; // Example HCP for points calculation in mock

export const mockRound_Simple3Holes: IShots[] = [
	createMockShot({
		holeNumber: 1,
		par: 4,
		strokes: 4,
		putts: 2,
		puttsLength: [5, 1],
		hcp: 10,
		distance: 350,
		teeClub: 'DRIVER',
		driveDistance: 230,
		fairway: 5,
		toGreen: 'i7',
		toGreenMeters: 120,
		gir: true,
	}),
	createMockShot({
		holeNumber: 2,
		par: 3,
		strokes: 3,
		putts: 1,
		puttsLength: [2],
		hcp: 18,
		distance: 150,
		teeClub: 'i6',
		toGreen: 'i6',
		toGreenMeters: 150,
		gir: true,
	}),
	createMockShot({
		holeNumber: 3,
		par: 5,
		strokes: 5,
		putts: 2,
		puttsLength: [10, 0.5],
		hcp: 5,
		distance: 480,
		teeClub: 'DRIVER',
		driveDistance: 260,
		fairway: 5,
		toGreen: '3W',
		toGreenMeters: 220, // This implies a second shot
		// Assuming third shot gets on green
		gir: true, // If 3rd shot hit the green
	}),
];

export const mockRound_HighPutts_3Holes: IShots[] = [
	createMockShot({
		holeNumber: 1,
		par: 4,
		strokes: 6,
		putts: 3,
		puttsLength: [12, 3, 1],
		hcp: 8,
		distance: 380,
		teeClub: 'DRIVER',
		driveDistance: 240,
		fairway: 4,
		toGreen: 'i5',
		toGreenMeters: 140,
		gir: true,
	}),
	createMockShot({
		holeNumber: 2,
		par: 4,
		strokes: 7,
		putts: 4,
		puttsLength: [15, 4, 2, 0.5],
		hcp: 2,
		distance: 420,
		teeClub: 'DRIVER',
		driveDistance: 200,
		fairway: 0,
		toGreen: 'HYBRID',
		toGreenMeters: 180,
		gir: false,
		chipClub: 'SW',
		greenSide: 'S', // Short
	}),
	createMockShot({
		holeNumber: 3,
		par: 3,
		strokes: 5,
		putts: 3,
		puttsLength: [8, 2, 1],
		hcp: 15,
		distance: 160,
		teeClub: 'i7',
		toGreen: 'i7',
		toGreenMeters: 160,
		gir: false,
		chipClub: 'PW',
		greenSide: 'L', // Left
	}),
];

export const mockRound_Full18Holes_Basic: IShots[] = Array.from(
	{ length: 18 },
	(_, i) =>
		createMockShot({
			holeNumber: i + 1,
			par: (i % 3) + 3, // Cycles par 3, 4, 5
			strokes: (i % 3) + 3 + Math.floor(Math.random() * 3) - 1, // Par +/- 1
			putts: Math.random() > 0.1 ? 2 : Math.random() > 0.5 ? 1 : 3,
			puttsLength: [Math.random() * 10, Math.random() * 2],
			hcp: (i % 18) + 1,
			distance: 300 + i * 10,
			gir: Math.random() > 0.4,
			teeClub: 'DRIVER',
			fairway: 5,
		}),
);
