import { describe, it, expect, beforeEach } from 'vitest';
import { TestDataGenerator, TestInspector } from '../../../dev-tools/testDataGenerator';
import { StepByStepTester, runQuickTest, formatTestResults } from '../../../dev-tools/stepByStepTester';
import { EdgeCaseTests, knownIssueTests } from '../../../dev-tools/edgeCaseTests';
import { totalsCalculator } from '../TotalsCalculator.utils';
import { calculateStablefordPoints, calculateGirValue, calculateUDValue, calculateScrambleValue } from '../../shots/shots.utils';

describe('Golf Calculation Tests', () => {
  
  describe('Basic Calculation Functions', () => {
    it('should calculate Stableford points correctly', () => {
      // Test basic point scenarios
      const eaglePoints = calculateStablefordPoints({
        hcp: 10,
        par: 4,
        strokes: 2,
        roundPlayingHCP: 18,
        roundHoles: 18,
      });
      expect(eaglePoints).toBe(4); // Eagle = 4 points

      const parPoints = calculateStablefordPoints({
        hcp: 10,
        par: 4,
        strokes: 4,
        roundPlayingHCP: 18,
        roundHoles: 18,
      });
      expect(parPoints).toBe(2); // Par = 2 points

      const bogeyPoints = calculateStablefordPoints({
        hcp: 10,
        par: 4,
        strokes: 5,
        roundPlayingHCP: 18,
        roundHoles: 18,
      });
      expect(bogeyPoints).toBe(1); // Bogey = 1 point
    });

    it('should calculate GIR correctly', () => {
      // Par 4 scenarios
      expect(calculateGirValue({ par: 4, strokes: 4, putts: 2, bogey: false })).toBe(true); // 2 shots to green
      expect(calculateGirValue({ par: 4, strokes: 5, putts: 2, bogey: false })).toBe(false); // 3 shots to green
      
      // Par 3 scenarios
      expect(calculateGirValue({ par: 3, strokes: 3, putts: 2, bogey: false })).toBe(true); // 1 shot to green
      expect(calculateGirValue({ par: 3, strokes: 4, putts: 2, bogey: false })).toBe(false); // 2 shots to green
      
      // Par 5 scenarios
      expect(calculateGirValue({ par: 5, strokes: 5, putts: 2, bogey: false })).toBe(true); // 3 shots to green
      expect(calculateGirValue({ par: 5, strokes: 6, putts: 2, bogey: false })).toBe(false); // 4 shots to green
    });

    it('should calculate up & down correctly', () => {
      const successfulUpDown = calculateUDValue({
        girValue: 0, // Missed GIR
        chipClub: 'SW',
        chipClubs: ['PW', 'GW', 'SW', 'LW'],
        numberOfPutts: 1,
        intermediateShots: [],
        parValue: 4,
        strokesValue: 4,
      });
      expect(successfulUpDown).toEqual({ made: 1, attempts: 1 });

      const failedUpDown = calculateUDValue({
        girValue: 0, // Missed GIR
        chipClub: 'SW',
        chipClubs: ['PW', 'GW', 'SW', 'LW'],
        numberOfPutts: 2, // 2 putts = failed up & down
        intermediateShots: [],
        parValue: 4,
        strokesValue: 5,
      });
      expect(failedUpDown).toEqual({ made: 0, attempts: 1 });

      const noUpDownAttempt = calculateUDValue({
        girValue: 1, // Made GIR - no up & down attempt
        chipClub: '',
        chipClubs: ['PW', 'GW', 'SW', 'LW'],
        numberOfPutts: 2,
        intermediateShots: [],
        parValue: 4,
        strokesValue: 4,
      });
      expect(noUpDownAttempt).toEqual({ made: 0, attempts: 0 });
    });
  });

  describe('Quick Test Scenarios', () => {
    it('should run mixed scenarios test successfully', () => {
      const result = runQuickTest('mixedScenarios', 3);
      
      console.log(formatTestResults(result));
      
      expect(result.steps).toHaveLength(3);
      expect(result.overallPassed).toBe(true);
      
      // Check that calculations are consistent
      result.steps.forEach(step => {
        expect(step.validationResult.passed).toBe(true);
        expect(step.calculationIssues).toHaveLength(0);
      });
    });

    it('should detect calculation issues in edge cases', () => {
      const edgeCaseConfig = knownIssueTests.puttLengthMismatch;
      const tester = new StepByStepTester(edgeCaseConfig);
      const result = tester.runFullTest();
      
      console.log(formatTestResults(result));
      
      // This test is expected to find issues
      expect(result.steps).toHaveLength(3);
      
      // Log details for manual inspection
      console.log('Edge case test details:', {
        issues: result.steps.map(s => s.calculationIssues),
        finalValidation: result.finalValidation,
      });
    });
  });

  describe('Edge Case Tests', () => {
    it('should handle array length mismatches', () => {
      const testConfig = EdgeCaseTests.getVariableMismatchTests().arrayLengthMismatch;
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      expect(result.steps).toHaveLength(3);
      
      // Check specific holes for expected issues
      const hole1 = result.steps[0];
      expect(hole1.holeData.putts).toBe(2);
      expect(hole1.holeData.puttsLength).toHaveLength(1); // Mismatch detected
      
      console.log('Array mismatch test:', formatTestResults(result));
    });

    it('should handle division by zero scenarios', () => {
      const testConfig = EdgeCaseTests.getBoundaryConditionTests().divisionByZero;
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      // Should not crash even with zero values
      expect(result.steps.length).toBeGreaterThan(0);
      
      console.log('Division by zero test:', formatTestResults(result));
    });

    it('should handle extreme values', () => {
      const testConfig = EdgeCaseTests.getBoundaryConditionTests().extremeValues;
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      expect(result.steps).toHaveLength(2);
      
      // Check that extreme values don't break calculations
      const extremeHole = result.steps[0];
      expect(extremeHole.holeData.strokes).toBe(15);
      expect(extremeHole.holeData.putts).toBe(8);
      expect(typeof extremeHole.holeData.points).toBe('number');
      
      console.log('Extreme values test:', formatTestResults(result));
    });
  });

  describe('Totals Calculator Integration', () => {
    it('should calculate totals correctly for a simple round', () => {
      const testShots = TestDataGenerator.createQuickTestRound(3, 'mixed');
      const totals = totalsCalculator(testShots);
      
      // Basic validation
      expect(totals.score.totals).toBeGreaterThan(0);
      expect(totals.points.totals).toBeGreaterThan(0);
      expect(totals.putts.totals).toBeGreaterThan(0);
      
      // Validate against test inspector
      const validation = TestInspector.validateRoundTotals(testShots, totals);
      
      if (!validation.passed) {
        console.error('Totals validation failed:', validation.issues);
        console.log('Validation summary:', validation.summary);
      }
      
      expect(validation.passed).toBe(true);
    });

    it('should handle IN/OUT calculations correctly', () => {
      // Create 18-hole test
      const testShots = TestDataGenerator.createQuickTestRound(18, 'mixed');
      const totals = totalsCalculator(testShots);
      
      // Check that IN/OUT splits are calculated
      const frontNineShots = testShots.slice(0, 9);
      const backNineShots = testShots.slice(9, 18);
      
      const frontNineScore = frontNineShots.reduce((sum, shot) => sum + shot.strokes, 0);
      const backNineScore = backNineShots.reduce((sum, shot) => sum + shot.strokes, 0);
      
      expect(totals.score.scoreIN).toBe(frontNineScore);
      expect(totals.score.scoreOUT).toBe(backNineScore);
      expect(totals.score.totals).toBe(frontNineScore + backNineScore);
    });
  });

  describe('Step-by-Step Testing', () => {
    it('should allow inspection at each hole', () => {
      const testConfig = EdgeCaseTests.getComplexScenarioTests().statisticalAnomalies;
      const tester = new StepByStepTester(testConfig);
      
      // Test step-by-step processing
      const step1 = tester.runTestUpToHole(1);
      expect(step1).toHaveLength(1);
      expect(step1[0].holeNumber).toBe(1);
      
      const step2 = tester.runTestUpToHole(2);
      expect(step2).toHaveLength(2);
      expect(step2[1].holeNumber).toBe(2);
      
      // Check calculation breakdown
      const breakdown = tester.getHoleCalculationBreakdown(1);
      expect(breakdown).toBeDefined();
      expect(breakdown?.raw.holeNumber).toBe(1);
      expect(breakdown?.calculated.points).toBeDefined();
      expect(breakdown?.intermediate.strokesToGreen).toBeDefined();
    });
  });
});

describe('Specific Calculation Issue Tests', () => {
  
  describe('Variable Mismatch Issues', () => {
    it('should detect putts length array mismatches', () => {
      const testConfig = knownIssueTests.puttLengthMismatch;
      const shots = new TestDataGenerator().createTestRound(testConfig);
      
      // Check for specific mismatch scenarios
      const hole1 = shots[0];
      expect(hole1.putts).toBe(2); // Says 2 putts
      expect(hole1.puttsLength).toHaveLength(1); // But only 1 length
      
      const hole2 = shots[1];
      expect(hole2.putts).toBe(1); // Says 1 putt
      expect(hole2.puttsLength).toHaveLength(2); // But 2 lengths
      
      // Calculate totals and check for consistency
      const totals = totalsCalculator(shots);
      const validation = TestInspector.validateRoundTotals(shots, totals);
      
      console.log('Putt length mismatch validation:', validation);
    });

    it('should handle club name inconsistencies', () => {
      const testConfig = EdgeCaseTests.getVariableMismatchTests().clubNameInconsistency;
      const shots = new TestDataGenerator().createTestRound(testConfig);
      
      // Check that different club name formats are handled
      expect(shots[0].teeClub).toBe('driver'); // lowercase
      expect(shots[1].teeClub).toBe('DRIVER'); // uppercase
      expect(shots[2].teeClub).toBe('3w'); // different format
      
      // Should still calculate totals without errors
      const totals = totalsCalculator(shots);
      expect(totals).toBeDefined();
      expect(totals.score.totals).toBeGreaterThan(0);
    });
  });

  describe('Mathematical Edge Cases', () => {
    it('should handle zero and null values gracefully', () => {
      const testConfig = EdgeCaseTests.getVariableMismatchTests().nullUndefinedValues;
      const shots = new TestDataGenerator().createTestRound(testConfig);
      
      // Should not crash with zero values
      expect(() => totalsCalculator(shots)).not.toThrow();
      
      const totals = totalsCalculator(shots);
      
      // Check that zero values are handled appropriately
      expect(totals.score.totals).toBeGreaterThan(0);
      expect(typeof totals.teeShots.teeDriver.averageDistance).toBe('number');
      expect(isNaN(totals.teeShots.teeDriver.averageDistance)).toBe(false);
    });

    it('should handle extreme values without overflow', () => {
      const testConfig = EdgeCaseTests.getBoundaryConditionTests().extremeValues;
      const shots = new TestDataGenerator().createTestRound(testConfig);
      
      const totals = totalsCalculator(shots);
      
      // Check that extreme values don't cause overflow or NaN
      expect(isFinite(totals.score.totals)).toBe(true);
      expect(isFinite(totals.points.totals)).toBe(true);
      expect(isFinite(totals.putts.totals)).toBe(true);
      
      // All percentages should be between 0 and 100 (or 0 and 1 depending on implementation)
      expect(totals.gir.avg).toBeGreaterThanOrEqual(0);
      expect(totals.gir.avg).toBeLessThanOrEqual(100);
    });
  });
});

describe('Integration Tests', () => {
  
  describe('Full Round Processing', () => {
    it('should process a complete 18-hole round', () => {
      const scenarios = TestDataGenerator.getTestScenarios();
      const tester = new StepByStepTester(scenarios.mixedScenarios);
      const result = tester.runFullTest();
      
      expect(result.steps).toHaveLength(18);
      expect(result.finalValidation).toBeDefined();
      
      console.log('Full 18-hole test summary:', {
        passed: result.overallPassed,
        issueCount: result.steps.reduce((sum, step) => sum + step.calculationIssues.length, 0),
        finalScore: result.steps[17]?.runningTotals.score.totals,
      });
    });

    it('should maintain calculation consistency throughout the round', () => {
      const testConfig = EdgeCaseTests.getComplexScenarioTests().midRoundScenarios;
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      // Check that calculations remain consistent as holes are added
      result.steps.forEach((step, index) => {
        expect(step.runningTotals.score.totals).toBeGreaterThan(0);
        
        if (index > 0) {
          const previousStep = result.steps[index - 1];
          // Score should only increase
          expect(step.runningTotals.score.totals).toBeGreaterThan(previousStep.runningTotals.score.totals);
        }
      });
    });
  });

  describe('Known Issue Detection', () => {
    it('should identify division by zero issues', () => {
      const testConfig = knownIssueTests.divisionByZero;
      const tester = new StepByStepTester(testConfig);
      
      // Should not crash even with problematic data
      expect(() => tester.runFullTest()).not.toThrow();
      
      const result = tester.runFullTest();
      console.log('Division by zero test result:', formatTestResults(result));
    });

    it('should handle percentage calculation edge cases', () => {
      const testConfig = knownIssueTests.percentageOverflow;
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      // Check that all percentage calculations are valid
      const finalTotals = result.steps[result.steps.length - 1]?.runningTotals;
      if (finalTotals) {
        expect(isFinite(finalTotals.fairway.fairwayCenter)).toBe(true);
        expect(finalTotals.fairway.fairwayCenter).toBeGreaterThanOrEqual(0);
        expect(finalTotals.fairway.fairwayCenter).toBeLessThanOrEqual(100);
      }
    });
  });
});

describe('Custom Test Creation', () => {
  it('should allow creation of custom test scenarios', () => {
    const customTest = EdgeCaseTests.createCustomEdgeCaseTest(
      'Custom Chip-In Test',
      'Testing multiple chip-in scenarios',
      [
        {
          holeNumber: 1,
          par: 4,
          strokes: 3,
          putts: 0, // Chip-in
          puttsLength: [],
          chipClub: 'SW',
          expectedUpDown: { made: 1, attempts: 1 },
        },
        {
          holeNumber: 2,
          par: 3,
          strokes: 1,
          putts: 0, // Hole-in-one
          puttsLength: [],
          teeClub: 'i8',
        },
      ]
    );

    const tester = new StepByStepTester(customTest);
    const result = tester.runFullTest();
    
    expect(result.steps).toHaveLength(2);
    expect(result.steps[0].holeData.putts).toBe(0);
    expect(result.steps[1].holeData.strokes).toBe(1);
    
    console.log('Custom chip-in test:', formatTestResults(result));
  });
});
