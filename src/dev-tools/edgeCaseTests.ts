import { TestRoundConfig, TestHoleConfig } from './testDataGenerator';

/**
 * Edge case test scenarios specifically designed to catch common calculation errors
 */
export class EdgeCaseTests {
  
  /**
   * Tests for variable mismatch issues
   */
  static getVariableMismatchTests(): { [key: string]: TestRoundConfig } {
    return {
      arrayLengthMismatch: {
        roundName: 'Array Length Mismatch Test',
        description: 'Testing scenarios where puttsLength array might not match putts count',
        courseInfo: { name: 'Mismatch Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['puttsLength array mismatch', 'putts count vs array length'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 2, // Says 2 putts
            puttsLength: [5], // But only 1 length recorded - common data entry error
            teeClub: 'DRIVER',
            driveDistance: 250,
            fairway: 5,
          },
          {
            holeNumber: 2,
            par: 4,
            hcp: 10,
            distance: 380,
            strokes: 5,
            putts: 1, // Says 1 putt
            puttsLength: [8, 2], // But 2 lengths recorded - another mismatch
            teeClub: 'DRIVER',
            driveDistance: 230,
            fairway: 4,
          },
          {
            holeNumber: 3,
            par: 3,
            hcp: 15,
            distance: 165,
            strokes: 3,
            putts: 0, // Chip-in scenario
            puttsLength: [], // Correctly empty array
            teeClub: 'i7',
            chipClub: 'SW',
            greenSide: 'S',
          },
        ],
      },

      clubNameInconsistency: {
        roundName: 'Club Name Inconsistency Test',
        description: 'Testing different club name formats and case sensitivity',
        courseInfo: { name: 'Club Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Club name format differences', 'Case sensitivity issues'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 2,
            puttsLength: [6, 1],
            teeClub: 'driver', // Lowercase
            driveDistance: 250,
          },
          {
            holeNumber: 2,
            par: 4,
            hcp: 10,
            distance: 380,
            strokes: 4,
            putts: 2,
            puttsLength: [4, 1],
            teeClub: 'DRIVER', // Uppercase
            driveDistance: 240,
          },
          {
            holeNumber: 3,
            par: 5,
            hcp: 5,
            distance: 520,
            strokes: 5,
            putts: 2,
            puttsLength: [8, 1],
            teeClub: '3w', // Different format
            driveDistance: 220,
            toGreen: '3W', // Different format for same club type
            toGreenMeters: 200,
          },
        ],
      },

      nullUndefinedValues: {
        roundName: 'Null/Undefined Values Test',
        description: 'Testing handling of null, undefined, and zero values',
        courseInfo: { name: 'Null Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Null value handling', 'Zero vs undefined distinction'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 2,
            puttsLength: [0, 0], // Zero distance putts
            teeClub: 'DRIVER',
            driveDistance: 0, // Zero drive distance
            fairway: 0, // Zero fairway (should this be treated as miss or N/A?)
          },
          {
            holeNumber: 2,
            par: 3,
            hcp: 18,
            distance: 0, // Zero hole distance
            strokes: 3,
            putts: 1,
            puttsLength: [2],
            teeClub: 'i7',
          },
        ],
      },
    };
  }

  /**
   * Tests for calculation boundary conditions
   */
  static getBoundaryConditionTests(): { [key: string]: TestRoundConfig } {
    return {
      divisionByZero: {
        roundName: 'Division by Zero Test',
        description: 'Testing scenarios that might cause division by zero errors',
        courseInfo: { name: 'Zero Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Division by zero', 'Average calculation errors'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 0, // Zero putts - might cause division issues in averages
            puttsLength: [],
            teeClub: 'DRIVER',
            driveDistance: 250,
            chipClub: 'SW', // Chip-in scenario
          },
          {
            holeNumber: 2,
            par: 4,
            hcp: 10,
            distance: 380,
            strokes: 0, // Zero strokes - invalid but test error handling
            putts: 0,
            puttsLength: [],
            teeClub: 'DRIVER',
          },
        ],
      },

      extremeValues: {
        roundName: 'Extreme Values Test',
        description: 'Testing very high and very low values that might break calculations',
        courseInfo: { name: 'Extreme Course', par: 36, tee: 'Test', playerHCP: 54 }, // Max handicap
        expectedIssues: ['Extreme value handling', 'Overflow conditions'],
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 600, // Very long hole
            strokes: 15, // Very high score
            putts: 8, // Many putts
            puttsLength: [25, 12, 8, 4, 2, 1, 0.5, 0.3], // Very long first putt
            teeClub: 'DRIVER',
            driveDistance: 100, // Very short drive
            water: 3, // Multiple penalties
            out: 2,
          },
          {
            holeNumber: 2,
            par: 3,
            hcp: 18,
            distance: 80, // Very short hole
            strokes: 1, // Hole in one
            putts: 0,
            puttsLength: [],
            teeClub: 'LW',
            driveDistance: 80,
          },
        ],
      },

      percentageCalculations: {
        roundName: 'Percentage Calculation Test',
        description: 'Testing edge cases in percentage calculations',
        courseInfo: { name: 'Percentage Course', par: 72, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Percentage overflow', 'Rounding errors'],
        holeConfigs: Array.from({ length: 18 }, (_, i) => ({
          holeNumber: i + 1,
          par: 4,
          hcp: (i % 18) + 1,
          distance: 400,
          strokes: 4,
          putts: 2,
          puttsLength: [5, 1],
          teeClub: 'DRIVER',
          driveDistance: 250,
          fairway: 5, // All fairways hit - should result in 100% fairway percentage
        })),
      },
    };
  }

  /**
   * Tests for scoring logic edge cases
   */
  static getScoringLogicTests(): { [key: string]: TestRoundConfig } {
    return {
      stablefordPointsEdgeCases: {
        roundName: 'Stableford Points Edge Cases',
        description: 'Testing Stableford points calculation in various handicap scenarios',
        courseInfo: { name: 'Stableford Course', par: 36, tee: 'Test', playerHCP: 18 },
        expectedIssues: ['Handicap stroke allocation', 'Points calculation edge cases'],
        holeConfigs: [
          // Hole where player gets 2 handicap strokes
          {
            holeNumber: 1,
            par: 4,
            hcp: 1, // Hardest hole, gets stroke
            distance: 450,
            strokes: 5, // Bogey with stroke = net par = 2 points
            putts: 2,
            puttsLength: [6, 1],
            teeClub: 'DRIVER',
            expectedPoints: 2,
          },
          // Hole where player gets no handicap strokes
          {
            holeNumber: 2,
            par: 4,
            hcp: 18, // Easiest hole, no stroke
            distance: 320,
            strokes: 4, // Par with no stroke = 2 points
            putts: 2,
            puttsLength: [3, 1],
            teeClub: 'DRIVER',
            expectedPoints: 2,
          },
          // Double eagle scenario
          {
            holeNumber: 3,
            par: 5,
            hcp: 10,
            distance: 500,
            strokes: 2, // Double eagle with stroke = 6 points
            putts: 1,
            puttsLength: [1],
            teeClub: 'DRIVER',
            driveDistance: 300,
            expectedPoints: 6,
          },
        ],
      },

      girCalculationEdgeCases: {
        roundName: 'GIR Calculation Edge Cases',
        description: 'Testing GIR calculations with complex shot sequences',
        courseInfo: { name: 'GIR Course', par: 36, tee: 'Test', playerHCP: 18 },
        holeConfigs: [
          // Par 4, exactly regulation (2 shots to green)
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 2,
            puttsLength: [5, 1],
            teeClub: 'DRIVER',
            toGreen: 'i7',
            toGreenMeters: 150,
            expectedGIR: true, // 2 shots to green = regulation for par 4
          },
          // Par 4, one over regulation (3 shots to green)
          {
            holeNumber: 2,
            par: 4,
            hcp: 10,
            distance: 380,
            strokes: 5,
            putts: 2,
            puttsLength: [4, 1],
            teeClub: 'DRIVER',
            chipClub: 'SW', // Had to chip, so 3 shots to green
            greenSide: 'S',
            expectedGIR: false, // 3 shots to green = over regulation
          },
          // Par 5 with intermediate shots
          {
            holeNumber: 3,
            par: 5,
            hcp: 5,
            distance: 520,
            strokes: 6,
            putts: 2,
            puttsLength: [8, 1],
            teeClub: 'DRIVER',
            driveDistance: 260,
            toGreen: '3W',
            toGreenMeters: 200,
            intermediateShots: [{ club: 'SW', distance: 60, fairway: 2 }], // 4 shots to green (2 = Center)
            expectedGIR: false, // 4 shots to green = over regulation for par 5
          },
        ],
      },

      upDownScrambleLogic: {
        roundName: 'Up & Down / Scramble Logic Test',
        description: 'Testing up & down and scramble calculations with edge cases',
        courseInfo: { name: 'Short Game Course', par: 36, tee: 'Test', playerHCP: 18 },
        holeConfigs: [
          // Successful up & down
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4, // Par score
            putts: 1,
            puttsLength: [2],
            teeClub: 'DRIVER',
            chipClub: 'SW',
            greenSide: 'S',
            expectedGIR: false,
            expectedUpDown: { made: 1, attempts: 1 },
            expectedScramble: { made: 1, attempts: 1 }, // Made par from missed GIR
          },
          // Failed up & down but successful scramble
          {
            holeNumber: 2,
            par: 4,
            hcp: 10,
            distance: 380,
            strokes: 4, // Par score
            putts: 2,
            puttsLength: [6, 1],
            teeClub: 'DRIVER',
            chipClub: 'PW',
            greenSide: 'L',
            expectedGIR: false,
            expectedUpDown: { made: 0, attempts: 1 }, // 2 putts = failed up & down
            expectedScramble: { made: 1, attempts: 1 }, // Still made par
          },
          // No chip shot, but missed GIR
          {
            holeNumber: 3,
            par: 4,
            hcp: 5,
            distance: 360,
            strokes: 5, // Bogey
            putts: 2,
            puttsLength: [4, 1],
            teeClub: 'DRIVER',
            // No chipClub specified - missed green but no designated chip
            expectedGIR: false,
            expectedUpDown: { made: 0, attempts: 0 }, // No up & down attempt without chip
            expectedScramble: { made: 0, attempts: 1 }, // Failed scramble (bogey)
          },
        ],
      },
    };
  }

  /**
   * Tests for mathematical calculation issues
   */
  static getMathematicalEdgeCases(): { [key: string]: TestRoundConfig } {
    return {
      averageCalculations: {
        roundName: 'Average Calculation Edge Cases',
        description: 'Testing average calculations with edge cases',
        courseInfo: { name: 'Average Course', par: 36, tee: 'Test', playerHCP: 18 },
        holeConfigs: [
          // Single data point for averages
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 400,
            strokes: 4,
            putts: 1,
            puttsLength: [5],
            teeClub: 'DRIVER',
            driveDistance: 250, // Only one distance measurement
          },
          // No distance data
          {
            holeNumber: 2,
            par: 3,
            hcp: 18,
            distance: 165,
            strokes: 3,
            putts: 2,
            puttsLength: [8, 1],
            teeClub: 'i7',
            driveDistance: 0, // No distance recorded
          },
        ],
      },

      roundingIssues: {
        roundName: 'Rounding Issues Test',
        description: 'Testing scenarios that might cause rounding errors',
        courseInfo: { name: 'Rounding Course', par: 35, tee: 'Test', playerHCP: 17 }, // Odd numbers
        holeConfigs: [
          {
            holeNumber: 1,
            par: 4,
            hcp: 1,
            distance: 333, // Numbers that don't divide evenly
            strokes: 4,
            putts: 2,
            puttsLength: [3.33, 0.67], // Decimal putt lengths
            teeClub: 'DRIVER',
            driveDistance: 246.5, // Decimal distance
          },
        ],
      },
    };
  }

  /**
   * Tests for complex multi-hole scenarios
   */
  static getComplexScenarioTests(): { [key: string]: TestRoundConfig } {
    return {
      midRoundScenarios: {
        roundName: 'Mid-Round Calculation Test',
        description: 'Testing calculations at different points in the round',
        courseInfo: { name: 'Progressive Course', par: 72, tee: 'Test', playerHCP: 18 },
        holeConfigs: [
          // Front 9 - Good start
          ...Array.from({ length: 9 }, (_, i) => ({
            holeNumber: i + 1,
            par: (i % 3) + 3 as 3 | 4 | 5,
            hcp: (i % 18) + 1,
            distance: 300 + (i * 20),
            strokes: ((i % 3) + 3) - 1, // All birdies front 9
            putts: 1,
            puttsLength: [3],
            teeClub: 'DRIVER',
            driveDistance: 250,
            fairway: 5,
            expectedGIR: true,
          })),
          // Back 9 - Disaster
          ...Array.from({ length: 9 }, (_, i) => ({
            holeNumber: i + 10,
            par: ((i + 1) % 3) + 3 as 3 | 4 | 5,
            hcp: ((i + 9) % 18) + 1,
            distance: 300 + (i * 20),
            strokes: ((i + 1) % 3) + 3 + 3, // All triple bogeys back 9
            putts: 3,
            puttsLength: [15, 4, 1],
            teeClub: 'DRIVER',
            driveDistance: 200,
            fairway: 0, // All misses
            water: i % 3 === 0 ? 1 : 0, // Some water penalties
            expectedGIR: false,
          })),
        ],
      },

      statisticalAnomalies: {
        roundName: 'Statistical Anomalies Test',
        description: 'Testing scenarios that create unusual statistics',
        courseInfo: { name: 'Anomaly Course', par: 36, tee: 'Test', playerHCP: 18 },
        holeConfigs: [
          // All eagles
          {
            holeNumber: 1,
            par: 5,
            hcp: 1,
            distance: 500,
            strokes: 3,
            putts: 1,
            puttsLength: [4],
            teeClub: 'DRIVER',
            driveDistance: 300,
            toGreen: '5W',
            toGreenMeters: 200,
            expectedGIR: true,
            expectedPoints: 4,
          },
          // All hole-in-ones
          {
            holeNumber: 2,
            par: 3,
            hcp: 18,
            distance: 150,
            strokes: 1,
            putts: 0,
            puttsLength: [],
            teeClub: 'i8',
            driveDistance: 150,
            expectedGIR: true,
            expectedPoints: 4,
          },
          // 10 on a par 3
          {
            holeNumber: 3,
            par: 3,
            hcp: 5,
            distance: 180,
            strokes: 10,
            putts: 4,
            puttsLength: [20, 8, 3, 1],
            teeClub: 'i6',
            water: 2,
            out: 1,
            chipClub: 'SW',
            greenSide: 'O',
            expectedGIR: false,
          },
        ],
      },
    };
  }

  /**
   * Get all edge case tests combined
   */
  static getAllEdgeCaseTests(): { [key: string]: TestRoundConfig } {
    return {
      ...this.getVariableMismatchTests(),
      ...this.getBoundaryConditionTests(),
      ...this.getMathematicalEdgeCases(),
      ...this.getComplexScenarioTests(),
    };
  }

  /**
   * Create a custom edge case test
   */
  static createCustomEdgeCaseTest(
    name: string,
    description: string,
    holes: Partial<TestHoleConfig>[]
  ): TestRoundConfig {
    return {
      roundName: name,
      description,
      courseInfo: { name: 'Custom Test Course', par: holes.length * 4, tee: 'Test', playerHCP: 18 },
      holeConfigs: holes.map((hole, index) => ({
        holeNumber: index + 1,
        par: 4,
        hcp: (index % 18) + 1,
        distance: 400,
        strokes: 4,
        putts: 2,
        puttsLength: [5, 1],
        teeClub: 'DRIVER',
        ...hole,
      })) as TestHoleConfig[],
    };
  }
}

/**
 * Specific test cases for known problematic calculations
 */
export const knownIssueTests = {
  /**
   * Test for putt length vs putt count mismatch
   */
  puttLengthMismatch: EdgeCaseTests.getVariableMismatchTests().arrayLengthMismatch,

  /**
   * Test for division by zero in averages
   */
  divisionByZero: EdgeCaseTests.getBoundaryConditionTests().divisionByZero,

  /**
   * Test for percentage calculation overflow
   */
  percentageOverflow: EdgeCaseTests.getBoundaryConditionTests().percentageCalculations,

  /**
   * Test for handicap allocation edge cases
   */
  handicapEdgeCases: EdgeCaseTests.getScoringLogicTests().stablefordPointsEdgeCases,
};

export default EdgeCaseTests;
