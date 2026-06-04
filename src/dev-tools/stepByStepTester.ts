import { IShots } from '@/types/roundData.types';
import { IRoundTotals } from '@/types/roundTotals.types';
import { totalsCalculator } from '@/utils/calculator/TotalsCalculator.utils';
import { TestDataGenerator, TestRoundConfig, TestInspector } from './testDataGenerator';

export interface StepResult {
  holeNumber: number;
  holeData: IShots;
  runningTotals: IRoundTotals;
  calculationIssues: string[];
  cumulativeShots: IShots[];
  validationResult: {
    passed: boolean;
    issues: string[];
    summary: any;
  };
}

export interface RoundTestResult {
  roundName: string;
  description: string;
  steps: StepResult[];
  finalValidation: {
    passed: boolean;
    issues: string[];
    summary: any;
  };
  overallPassed: boolean;
}

export class StepByStepTester {
  private testConfig: TestRoundConfig;
  private generator: TestDataGenerator;
  private currentShots: IShots[] = [];
  private steps: StepResult[] = [];

  constructor(testConfig: TestRoundConfig) {
    this.testConfig = testConfig;
    this.generator = new TestDataGenerator();
  }

  /**
   * Run the full test round step by step
   */
  runFullTest(): RoundTestResult {
    this.reset();
    const allHoles = this.generator.createTestRound(this.testConfig);
    
    // Process each hole step by step
    allHoles.forEach((hole, index) => {
      this.processHoleStep(hole, index);
    });

    // Final validation
    const finalTotals = totalsCalculator(this.currentShots);
    const finalValidation = TestInspector.validateRoundTotals(this.currentShots, finalTotals);

    const overallPassed = this.steps.every(step => step.validationResult.passed) && finalValidation.passed;

    return {
      roundName: this.testConfig.roundName,
      description: this.testConfig.description,
      steps: this.steps,
      finalValidation,
      overallPassed,
    };
  }

  /**
   * Process a single hole and capture the step result
   */
  private processHoleStep(hole: IShots, index: number): StepResult {
    // Add hole to running collection
    this.currentShots.push(hole);

    // Calculate running totals
    const runningTotals = totalsCalculator(this.currentShots);

    // Validate calculations for this specific hole
    const holeConfig = this.testConfig.holeConfigs[index];
    const holeValidation = TestInspector.compareHoleCalculations(hole, holeConfig);

    // Validate running totals
    const totalsValidation = TestInspector.validateRoundTotals(this.currentShots, runningTotals);

    // Combine all issues
    const allIssues = [...holeValidation.issues, ...totalsValidation.issues];

    const stepResult: StepResult = {
      holeNumber: hole.holeNumber,
      holeData: hole,
      runningTotals,
      calculationIssues: allIssues,
      cumulativeShots: [...this.currentShots],
      validationResult: {
        passed: allIssues.length === 0,
        issues: allIssues,
        summary: {
          hole: holeValidation.details,
          totals: totalsValidation.summary,
        },
      },
    };

    this.steps.push(stepResult);
    return stepResult;
  }

  /**
   * Run test up to a specific hole number
   */
  runTestUpToHole(holeNumber: number): StepResult[] {
    this.reset();
    const allHoles = this.generator.createTestRound(this.testConfig);
    
    for (let i = 0; i < Math.min(holeNumber, allHoles.length); i++) {
      this.processHoleStep(allHoles[i], i);
    }

    return this.steps;
  }

  /**
   * Get detailed breakdown of calculations for a specific hole
   */
  getHoleCalculationBreakdown(holeNumber: number): {
    raw: IShots;
    calculated: any;
    intermediate: any;
  } | null {
    const step = this.steps.find(s => s.holeNumber === holeNumber);
    if (!step) return null;

    const hole = step.holeData;
    
    return {
      raw: {
        holeNumber: hole.holeNumber,
        par: hole.par,
        hcp: hole.hcp,
        strokes: hole.strokes,
        putts: hole.putts,
        puttsLength: hole.puttsLength,
        teeClub: hole.teeClub,
        driveDistance: hole.driveDistance,
        fairway: hole.fairway,
        toGreen: hole.toGreen,
        toGreenMeters: hole.toGreenMeters,
        chipClub: hole.chipClub,
        water: hole.water,
        out: hole.out,
        sand: hole.sand,
      } as IShots,
      calculated: {
        points: hole.points,
        gir: hole.gir,
        girBogey: hole.girBogey,
        upDown: hole.upDown,
        scramble: hole.scramble,
        bounceBack: hole.bounceBack,
      },
      intermediate: {
        strokesToGreen: hole.strokes - hole.putts,
        girThreshold: hole.par - 2,
        girBogeyThreshold: hole.par - 1,
        puttCounts: {
          puttsUnder2: hole.puttsUnder2,
          putts2_4: hole.putts2_4,
          putts4_6: hole.putts4_6,
          putts6_10: hole.putts6_10,
          puttsOver10: hole.puttsOver10,
        },
        greenApproachCounts: {
          toGreenMetersOver100: hole.toGreenMetersOver100,
          toGreenMeters80_100: hole.toGreenMeters80_100,
          toGreenMeters60_80: hole.toGreenMeters60_80,
          toGreenMetersUnder60: hole.toGreenMetersUnder60,
        },
      },
    };
  }

  /**
   * Reset tester state
   */
  private reset(): void {
    this.currentShots = [];
    this.steps = [];
  }

  /**
   * Get summary of issues found across all steps
   */
  getIssuesSummary(): {
    totalIssues: number;
    issuesByHole: { [holeNumber: number]: string[] };
    commonIssues: string[];
  } {
    const issuesByHole: { [holeNumber: number]: string[] } = {};
    const allIssues: string[] = [];

    this.steps.forEach(step => {
      if (step.calculationIssues.length > 0) {
        issuesByHole[step.holeNumber] = step.calculationIssues;
        allIssues.push(...step.calculationIssues);
      }
    });

    // Find common issue patterns
    const issueCounts: { [issue: string]: number } = {};
    allIssues.forEach(issue => {
      const pattern = issue.split(':')[0]; // Get issue type before details
      issueCounts[pattern] = (issueCounts[pattern] || 0) + 1;
    });

    const commonIssues = Object.entries(issueCounts)
      .filter(([, count]) => count > 1)
      .map(([pattern]) => pattern);

    return {
      totalIssues: allIssues.length,
      issuesByHole,
      commonIssues,
    };
  }
}

/**
 * Helper function to create and run quick tests
 */
export const runQuickTest = (
  scenarioName: keyof ReturnType<typeof TestDataGenerator.getTestScenarios> = 'mixedScenarios',
  maxHoles: number = 3
): RoundTestResult => {
  const scenarios = TestDataGenerator.getTestScenarios();
  const config = scenarios[scenarioName];
  
  // Limit holes for quick testing
  const quickConfig: TestRoundConfig = {
    ...config,
    roundName: `${config.roundName} (${maxHoles} holes)`,
    holeConfigs: config.holeConfigs.slice(0, maxHoles),
  };

  const tester = new StepByStepTester(quickConfig);
  return tester.runFullTest();
};

/**
 * Pretty print test results for console logging
 */
export const formatTestResults = (result: RoundTestResult): string => {
  let output = `\n=== ${result.roundName} ===\n`;
  output += `Description: ${result.description}\n`;
  output += `Overall Result: ${result.overallPassed ? '✅ PASSED' : '❌ FAILED'}\n\n`;

  result.steps.forEach(step => {
    const status = step.validationResult.passed ? '✅' : '❌';
    output += `${status} Hole ${step.holeNumber}: `;
    output += `${step.holeData.strokes} strokes, ${step.holeData.putts} putts, `;
    output += `${step.holeData.points} points, GIR: ${step.holeData.gir}\n`;
    
    if (step.calculationIssues.length > 0) {
      step.calculationIssues.forEach(issue => {
        output += `    ⚠️  ${issue}\n`;
      });
    }
  });

  if (result.finalValidation.issues.length > 0) {
    output += `\n🚨 Final Validation Issues:\n`;
    result.finalValidation.issues.forEach(issue => {
      output += `  - ${issue}\n`;
    });
  }

  output += `\n📊 Summary: ${result.finalValidation.summary ? JSON.stringify(result.finalValidation.summary, null, 2) : 'No summary available'}\n`;

  return output;
};

/**
 * Create a minimal test round for specific calculation testing
 */
export const createMinimalTestRound = (
  calculation: 'points' | 'gir' | 'putts' | 'scramble' | 'updown',
  edgeCase?: string
): TestRoundConfig => {
  const baseConfig = {
    roundName: `${calculation.toUpperCase()} Test`,
    description: `Testing ${calculation} calculations${edgeCase ? ` - ${edgeCase}` : ''}`,
    courseInfo: { name: 'Test Course', par: 36, tee: 'Test', playerHCP: 18 },
    holeConfigs: [] as any[],
  };

  switch (calculation) {
    case 'points':
      baseConfig.holeConfigs = [
        { holeNumber: 1, par: 4, hcp: 1, distance: 400, strokes: 2, putts: 1, puttsLength: [2], teeClub: 'DRIVER', expectedPoints: 4 }, // Eagle
        { holeNumber: 2, par: 4, hcp: 10, distance: 380, strokes: 3, putts: 1, puttsLength: [3], teeClub: 'DRIVER', expectedPoints: 3 }, // Birdie
        { holeNumber: 3, par: 4, hcp: 18, distance: 360, strokes: 4, putts: 2, puttsLength: [5, 1], teeClub: 'DRIVER', expectedPoints: 2 }, // Par
      ];
      break;
    
    case 'gir':
      baseConfig.holeConfigs = [
        { holeNumber: 1, par: 4, hcp: 1, distance: 400, strokes: 3, putts: 1, puttsLength: [3], teeClub: 'DRIVER', expectedGIR: true },
        { holeNumber: 2, par: 4, hcp: 10, distance: 380, strokes: 4, putts: 2, puttsLength: [5, 1], teeClub: 'DRIVER', expectedGIR: true },
        { holeNumber: 3, par: 4, hcp: 18, distance: 360, strokes: 5, putts: 2, puttsLength: [4, 1], teeClub: 'DRIVER', expectedGIR: false },
      ];
      break;

    default:
      baseConfig.holeConfigs = [
        { holeNumber: 1, par: 4, hcp: 1, distance: 400, strokes: 4, putts: 2, puttsLength: [5, 1], teeClub: 'DRIVER' },
      ];
  }

  return baseConfig as TestRoundConfig;
};

export default StepByStepTester;
