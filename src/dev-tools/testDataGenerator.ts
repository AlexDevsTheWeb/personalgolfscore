import { IShots, IDistance } from '@/types/roundData.types';
import { IRoundTotals } from '@/types/roundTotals.types';
import { initialStateTmpHole } from '@/utils/constant.utils';
import { calculateGirValue, calculateScrambleValue, calculateStablefordPoints, calculateUDValue, calculatePuttLengthCounts, calculateGreenApproachCounts } from '@/utils/shots/shots.utils';
import { IIntermediateShot } from '@/types/roundData.types';

export interface TestRoundConfig {
  roundName: string;
  courseInfo: {
    name: string;
    par: number;
    tee: string;
    playerHCP: number;
  };
  holeConfigs: TestHoleConfig[];
  description: string;
  expectedIssues?: string[]; // Known calculation issues to test
}

export interface TestHoleConfig {
  holeNumber: number;
  par: 3 | 4 | 5;
  hcp: number;
  distance: number;
  // Scoring scenario
  strokes: number;
  putts: number;
  puttsLength: number[];
  
  // Tee shot
  teeClub: string;
  driveDistance?: number;
  fairway?: number; // 4=left, 5=center, 6=right, 0=not applicable (par 3)
  
  // Approach/Green
  toGreen?: string; // club used to reach green
  toGreenMeters?: number; // distance of approach shot
  gir?: boolean; // if not specified, will be calculated
  greenSide?: string; // 'S', 'O', 'L', 'R' if missed green
  
  // Short game
  chipClub?: string;
  intermediateShots?: IIntermediateShot[];
  
  // Penalties
  water?: number;
  out?: number;
  sand?: number;
  
  // Expected calculations (for verification)
  expectedPoints?: number;
  expectedGIR?: boolean;
  expectedScramble?: { made: number; attempts: number };
  expectedUpDown?: { made: number; attempts: number };
}

export class TestDataGenerator {
  private roundPlayingHCP: number = 18;
  private roundHoles: number = 18;

  /**
   * Creates a realistic golf round scenario for testing calculations
   */
  createTestRound(config: TestRoundConfig): IShots[] {
    this.roundPlayingHCP = config.courseInfo.playerHCP;
    this.roundHoles = config.holeConfigs.length;

    return config.holeConfigs.map(holeConfig => this.createTestHole(holeConfig));
  }

  /**
   * Creates a single test hole with all calculations
   */
  private createTestHole(config: TestHoleConfig): IShots {
    const baseHole: IShots = {
      ...initialStateTmpHole,
      holeNumber: config.holeNumber,
      par: config.par,
      hcp: config.hcp,
      distance: config.distance,
      strokes: config.strokes,
      putts: config.putts,
      puttsLength: [...config.puttsLength],
      teeClub: config.teeClub,
      driveDistance: config.driveDistance || 0,
      fairway: config.fairway || 0,
      toGreen: config.toGreen || '',
      toGreenMeters: config.toGreenMeters || 0,
      chipClub: config.chipClub || '',
      intermediateShots: config.intermediateShots || [],
      water: config.water || 0,
      out: config.out || 0,
      sand: config.sand || 0,
    };

    // Set green side flags
    if (config.greenSide) {
      baseHole.greenSide = config.greenSide;
      baseHole.greenSideL = config.greenSide === 'L' ? 1 : 0;
      baseHole.greenSideO = config.greenSide === 'O' ? 1 : 0;
      baseHole.greenSideR = config.greenSide === 'R' ? 1 : 0;
      baseHole.greenSideS = config.greenSide === 'S' ? 1 : 0;
    }

    // Calculate derived values
    const points = calculateStablefordPoints({
      hcp: baseHole.hcp,
      par: baseHole.par,
      strokes: baseHole.strokes,
      roundPlayingHCP: this.roundPlayingHCP,
      roundHoles: this.roundHoles,
    }) || 0;

    const gir = config.gir !== undefined ? config.gir : calculateGirValue({
      par: baseHole.par,
      putts: baseHole.putts,
      strokes: baseHole.strokes,
      bogey: false,
      intermediateShots: baseHole.intermediateShots.length,
    });

    const girBogey = calculateGirValue({
      par: baseHole.par,
      putts: baseHole.putts,
      strokes: baseHole.strokes,
      bogey: true,
      intermediateShots: baseHole.intermediateShots.length,
    });

    const upDown = calculateUDValue({
      girValue: gir ? 1 : 0,
      chipClub: baseHole.chipClub,
      parValue: baseHole.par,
      numberOfPutts: baseHole.putts,
      strokesValue: baseHole.strokes,
      chipClubs: ['PW', 'GW', 'SW', 'LW', 'CHIP', 'PUTT'], // Default chip clubs
      intermediateShots: baseHole.intermediateShots,
    });

    const scramble = calculateScrambleValue({
      girValue: gir ? 1 : 0,
      parValue: baseHole.par,
      strokesValue: baseHole.strokes,
    });

    const puttCounts = calculatePuttLengthCounts(baseHole.puttsLength);
    const greenApproachCounts = calculateGreenApproachCounts(baseHole.toGreenMeters);

    // Create final hole with calculated values
    const finalHole: IShots = {
      ...baseHole,
      points,
      gir,
      girBogey,
      upDown,
      scramble,
      ...puttCounts,
      ...greenApproachCounts,
    };

    return finalHole;
  }

  /**
   * Predefined test scenarios for common edge cases
   */
  static getTestScenarios(): { [key: string]: TestRoundConfig } {
    return {
      perfectRound: {
        roundName: 'Perfect Round Test',
        description: 'All birdies and eagles for calculation edge testing',
        courseInfo: { name: 'Test Course', par: 72, tee: 'Championship', playerHCP: 0 },
        holeConfigs: Array.from({ length: 18 }, (_, i) => ({
          holeNumber: i + 1,
          par: (i % 3) + 3 as 3 | 4 | 5,
          hcp: (i % 18) + 1,
          distance: 300 + (i * 20),
          strokes: ((i % 3) + 3) - 1, // Always birdie
          putts: 1,
          puttsLength: [3],
          teeClub: 'DRIVER',
          driveDistance: 250 + (i * 5),
          fairway: 5, // Center
          toGreen: 'i7',
          toGreenMeters: 120,
          expectedGIR: true,
        })),
      },

      disasterRound: {
        roundName: 'High Score Test',
        description: 'Testing high scores and penalty scenarios',
        courseInfo: { name: 'Disaster Course', par: 72, tee: 'Back', playerHCP: 30 },
        expectedIssues: ['High penalty strokes', 'Multiple chip shots', 'Long putts'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 420,
            strokes: 8,
            putts: 3,
            puttsLength: [15, 4, 1],
            teeClub: 'DRIVER',
            driveDistance: 180,
            fairway: 0, // Miss
            water: 1,
            toGreen: 'SW',
            toGreenMeters: 40,
            chipClub: 'SW',
            greenSide: 'S',
            expectedGIR: false,
            expectedScramble: { made: 0, attempts: 1 },
          },
          // Add more disaster holes...
          ...Array.from({ length: 17 }, (_, i) => ({
            holeNumber: i + 2,
            par: ((i + 1) % 3) + 3 as 3 | 4 | 5,
            hcp: ((i + 1) % 18) + 1,
            distance: 350 + (i * 15),
            strokes: ((i + 1) % 3) + 5, // Always over par
            putts: 2 + (i % 2),
            puttsLength: i % 2 ? [8, 2] : [12, 3, 1],
            teeClub: i % 2 ? 'DRIVER' : '3W',
            driveDistance: 200 + (i * 10),
            fairway: i % 3 === 0 ? 4 : (i % 3 === 1 ? 5 : 6),
            toGreen: 'i' + (5 + (i % 4)),
            toGreenMeters: 100 + (i * 10),
            expectedGIR: false,
          })),
        ],
      },

      mixedScenarios: {
        roundName: 'Mixed Scenarios Test',
        description: 'Variety of realistic scoring scenarios',
        courseInfo: { name: 'Mixed Course', par: 72, tee: 'Regular', playerHCP: 15 },
        holeConfigs: [
          // Eagle on par 5
          {
            holeNumber: 1,
            par: 5,
            hcp: 7,
            distance: 520,
            strokes: 3,
            putts: 1,
            puttsLength: [2],
            teeClub: 'DRIVER',
            driveDistance: 280,
            fairway: 5,
            toGreen: '3W',
            toGreenMeters: 240,
            expectedGIR: true,
            expectedPoints: 5,
          },
          // Birdie on par 4
          {
            holeNumber: 2,
            par: 4,
            hcp: 12,
            distance: 385,
            strokes: 3,
            putts: 1,
            puttsLength: [4],
            teeClub: 'DRIVER',
            driveDistance: 260,
            fairway: 5,
            toGreen: 'i8',
            toGreenMeters: 125,
            expectedGIR: true,
            expectedPoints: 3,
          },
          // Par with up & down
          {
            holeNumber: 3,
            par: 4,
            hcp: 5,
            distance: 410,
            strokes: 4,
            putts: 1,
            puttsLength: [1.5],
            teeClub: 'DRIVER',
            driveDistance: 245,
            fairway: 4, // Left
            toGreen: 'i6',
            toGreenMeters: 165,
            chipClub: 'SW',
            greenSide: 'S',
            expectedGIR: false,
            expectedUpDown: { made: 1, attempts: 1 },
            expectedScramble: { made: 1, attempts: 1 },
          },
          // Add more mixed scenarios...
          ...Array.from({ length: 15 }, (_, i) => ({
            holeNumber: i + 4,
            par: ((i + 3) % 3) + 3 as 3 | 4 | 5,
            hcp: ((i + 3) % 18) + 1,
            distance: 320 + (i * 25),
            strokes: ((i + 3) % 3) + 3 + (i % 3) - 1, // Mix of scores
            putts: 1 + (i % 3),
            puttsLength: i % 3 === 0 ? [1] : i % 3 === 1 ? [6, 1] : [10, 3, 0.5],
            teeClub: i % 2 ? 'DRIVER' : ((i % 4 === 0) ? '3W' : 'HYBRID'),
            driveDistance: 220 + (i * 8),
            fairway: [4, 5, 6, 0][i % 4],
            toGreen: 'i' + (5 + (i % 5)),
            toGreenMeters: 80 + (i * 15),
          })),
        ],
      },

      calculationEdgeCases: {
        roundName: 'Calculation Edge Cases',
        description: 'Specific scenarios to test calculation boundaries and edge cases',
        courseInfo: { name: 'Edge Case Course', par: 72, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Boundary conditions', 'Division by zero', 'Percentage calculations'],
        holeConfigs: [
          // Zero putts (chip-in)
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 380,
            strokes: 3,
            putts: 0,
            puttsLength: [],
            teeClub: 'DRIVER',
            driveDistance: 260,
            fairway: 5,
            toGreen: 'NO',
            chipClub: 'SW',
            greenSide: 'S',
            expectedGIR: false,
          },
          // Maximum putts scenario
          {
            holeNumber: 2,
            par: 3,
            hcp: 18,
            distance: 165,
            strokes: 7,
            putts: 5,
            puttsLength: [20, 8, 4, 2, 0.5],
            teeClub: 'i7',
            toGreen: 'i7',
            toGreenMeters: 165,
            expectedGIR: true,
          },
          // Multiple penalties
          {
            holeNumber: 3,
            par: 4,
            hcp: 3,
            distance: 420,
            strokes: 10,
            putts: 2,
            puttsLength: [6, 1],
            teeClub: 'DRIVER',
            water: 2,
            out: 1,
            toGreen: 'i9',
            toGreenMeters: 90,
          },
          // Add more edge cases...
        ],
      },
    };
  }

  /**
   * Create a quick test round with specified number of holes
   */
  static createQuickTestRound(holes: number = 3, scenario: 'good' | 'bad' | 'mixed' = 'mixed'): IShots[] {
    const generator = new TestDataGenerator();
    const configs = this.getTestScenarios();
    
    const baseConfig = configs.mixedScenarios;
    const quickConfig: TestRoundConfig = {
      ...baseConfig,
      roundName: `Quick ${holes} Hole Test`,
      holeConfigs: baseConfig.holeConfigs.slice(0, holes),
    };

    return generator.createTestRound(quickConfig);
  }
}

/**
 * Test utilities for inspection and verification
 */
export class TestInspector {
  /**
   * Compare calculated values with expected values
   */
  static compareHoleCalculations(hole: IShots, expectedHole: Partial<TestHoleConfig>): {
    passed: boolean;
    issues: string[];
    details: any;
  } {
    const issues: string[] = [];
    const details: any = {
      calculated: {},
      expected: {},
      differences: {},
    };

    // Check points calculation
    if (expectedHole.expectedPoints !== undefined) {
      details.calculated.points = hole.points;
      details.expected.points = expectedHole.expectedPoints;
      if (hole.points !== expectedHole.expectedPoints) {
        issues.push(`Points mismatch: calculated ${hole.points}, expected ${expectedHole.expectedPoints}`);
        details.differences.points = hole.points - expectedHole.expectedPoints;
      }
    }

    // Check GIR calculation
    if (expectedHole.expectedGIR !== undefined) {
      details.calculated.gir = hole.gir;
      details.expected.gir = expectedHole.expectedGIR;
      if (hole.gir !== expectedHole.expectedGIR) {
        issues.push(`GIR mismatch: calculated ${hole.gir}, expected ${expectedHole.expectedGIR}`);
      }
    }

    // Check scramble calculation
    if (expectedHole.expectedScramble) {
      details.calculated.scramble = hole.scramble;
      details.expected.scramble = expectedHole.expectedScramble;
      if (hole.scramble.made !== expectedHole.expectedScramble.made || 
          hole.scramble.attempts !== expectedHole.expectedScramble.attempts) {
        issues.push(`Scramble mismatch: calculated ${JSON.stringify(hole.scramble)}, expected ${JSON.stringify(expectedHole.expectedScramble)}`);
      }
    }

    // Check up & down calculation
    if (expectedHole.expectedUpDown) {
      details.calculated.upDown = hole.upDown;
      details.expected.upDown = expectedHole.expectedUpDown;
      if (hole.upDown.made !== expectedHole.expectedUpDown.made || 
          hole.upDown.attempts !== expectedHole.expectedUpDown.attempts) {
        issues.push(`Up & Down mismatch: calculated ${JSON.stringify(hole.upDown)}, expected ${JSON.stringify(expectedHole.expectedUpDown)}`);
      }
    }

    return {
      passed: issues.length === 0,
      issues,
      details,
    };
  }

  /**
   * Validate round totals calculations
   */
  static validateRoundTotals(shots: IShots[], totals: IRoundTotals): {
    passed: boolean;
    issues: string[];
    summary: any;
  } {
    const issues: string[] = [];
    const summary: any = {};

    // Basic score validation
    const calculatedScore = shots.reduce((sum, shot) => sum + shot.strokes, 0);
    summary.calculatedScore = calculatedScore;
    summary.totalsScore = totals.score.totals;
    
    if (calculatedScore !== totals.score.totals) {
      issues.push(`Total score mismatch: sum of holes = ${calculatedScore}, totals = ${totals.score.totals}`);
    }

    // Points validation
    const calculatedPoints = shots.reduce((sum, shot) => sum + shot.points, 0);
    summary.calculatedPoints = calculatedPoints;
    summary.totalsPoints = totals.points.totals;
    
    if (calculatedPoints !== totals.points.totals) {
      issues.push(`Total points mismatch: sum of holes = ${calculatedPoints}, totals = ${totals.points.totals}`);
    }

    // GIR validation
    const calculatedGIR = shots.filter(shot => shot.gir).length;
    summary.calculatedGIR = calculatedGIR;
    summary.totalsGIR = totals.gir.totals;
    
    if (calculatedGIR !== totals.gir.totals) {
      issues.push(`GIR count mismatch: counted = ${calculatedGIR}, totals = ${totals.gir.totals}`);
    }

    // Putts validation
    const calculatedPutts = shots.reduce((sum, shot) => sum + shot.putts, 0);
    summary.calculatedPutts = calculatedPutts;
    summary.totalsPutts = totals.putts.totals;
    
    if (calculatedPutts !== totals.putts.totals) {
      issues.push(`Total putts mismatch: sum of holes = ${calculatedPutts}, totals = ${totals.putts.totals}`);
    }

    return {
      passed: issues.length === 0,
      issues,
      summary,
    };
  }
}

export default TestDataGenerator;
