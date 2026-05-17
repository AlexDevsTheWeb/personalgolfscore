#!/usr/bin/env node

import { TestDataGenerator } from './testDataGenerator';
import { StepByStepTester, runQuickTest, formatTestResults } from './stepByStepTester';
import { EdgeCaseTests, knownIssueTests } from './edgeCaseTests';
// import { createFirestoreTestUtils } from './firestoreInspector'; // File doesn't exist
import { calculateStablefordPoints, calculateGirValue, calculateUDValue } from '../utils/shots/shots.utils';

/**
 * Interactive test runner for golf calculations
 * Run this file directly to test your calculations step by step
 */
export class InteractiveTestRunner {
  
  /**
   * Run a quick 3-hole test and display results
   */
  static runQuickTest(): void {
    console.log('🏌️  Running Quick 3-Hole Test...\n');
    
    const result = runQuickTest('mixedScenarios', 3);
    console.log(formatTestResults(result));
    
    if (!result.overallPassed) {
      console.log('\n🚨 Issues found! Check the details above.\n');
    } else {
      console.log('\n✅ All calculations passed!\n');
    }
  }

  /**
   * Run edge case tests to identify potential issues
   */
  static runEdgeCaseTests(): void {
    console.log('🔍 Running Edge Case Tests...\n');
    
    const edgeCases = EdgeCaseTests.getAllEdgeCaseTests();
    let totalIssues = 0;
    
    Object.entries(edgeCases).forEach(([testName, testConfig]) => {
      console.log(`\n--- Testing: ${testName} ---`);
      
      const tester = new StepByStepTester(testConfig);
      const result = tester.runFullTest();
      
      const issueCount = result.steps.reduce((sum, step) => sum + step.calculationIssues.length, 0);
      totalIssues += issueCount;
      
      if (issueCount > 0) {
        console.log(`❌ Found ${issueCount} issues:`);
        result.steps.forEach(step => {
          if (step.calculationIssues.length > 0) {
            console.log(`  Hole ${step.holeNumber}: ${step.calculationIssues.join(', ')}`);
          }
        });
      } else {
        console.log('✅ No issues found');
      }
    });
    
    console.log(`\n📊 Total issues found across all edge case tests: ${totalIssues}`);
  }

  /**
   * Test specific calculation functions in isolation
   */
  static testCalculationFunctions(): void {
    console.log('⚙️  Testing Individual Calculation Functions...\n');
    
    // Test cases for individual functions
    const testCases = [
      {
        name: 'Stableford Points - Eagle',
        test: () => {
          const points = calculateStablefordPoints({
            hcp: 1, par: 4, strokes: 2, roundPlayingHCP: 18, roundHoles: 18
          });
          return { expected: 4, actual: points, passed: points === 4 };
        }
      },
      {
        name: 'GIR - Par 4 Regulation',
        test: () => {
          const gir = calculateGirValue({
            par: 4, strokes: 4, putts: 2, bogey: false, intermediateShots: 0
          });
          return { expected: true, actual: gir, passed: gir === true };
        }
      },
      {
        name: 'Up & Down - Successful',
        test: () => {
          const upDown = calculateUDValue({
            girValue: 0, chipClub: 'SW', chipClubs: ['SW'], numberOfPutts: 1,
            intermediateShots: [], parValue: 4, strokesValue: 4
          });
          return { 
            expected: { made: 1, attempts: 1 }, 
            actual: upDown, 
            passed: upDown.made === 1 && upDown.attempts === 1 
          };
        }
      },
    ];

    testCases.forEach(testCase => {
      try {
        const result = testCase.test();
        const status = result.passed ? '✅' : '❌';
        console.log(`${status} ${testCase.name}`);
        if (!result.passed) {
          console.log(`   Expected: ${JSON.stringify(result.expected)}`);
          console.log(`   Actual: ${JSON.stringify(result.actual)}`);
        }
      } catch (error) {
        console.log(`❌ ${testCase.name} - Error: ${error}`);
      }
    });
  }

  /**
   * Interactive step-by-step test runner
   */
  static runStepByStepTest(testName?: string, maxHoles: number = 3): void {
    console.log('🔄 Running Step-by-Step Test...\n');
    
    const scenarios = TestDataGenerator.getTestScenarios();
    const testConfig = testName ? scenarios[testName] : scenarios.mixedScenarios;
    
    if (!testConfig) {
      console.log(`❌ Test scenario '${testName}' not found. Available tests:`);
      Object.keys(scenarios).forEach(name => console.log(`  - ${name}`));
      return;
    }

    // Limit holes for interactive testing
    const limitedConfig = {
      ...testConfig,
      holeConfigs: testConfig.holeConfigs.slice(0, maxHoles),
    };

    const tester = new StepByStepTester(limitedConfig);
    
    console.log(`Testing: ${limitedConfig.roundName}`);
    console.log(`Description: ${limitedConfig.description}`);
    console.log(`Holes to test: ${maxHoles}\n`);

    // Run step by step and show results
    for (let hole = 1; hole <= maxHoles; hole++) {
      console.log(`--- Processing Hole ${hole} ---`);
      
      const steps = tester.runTestUpToHole(hole);
      const currentStep = steps[steps.length - 1];
      
      if (currentStep) {
        console.log(`Hole ${hole} Data:`);
        console.log(`  Par: ${currentStep.holeData.par}`);
        console.log(`  Strokes: ${currentStep.holeData.strokes}`);
        console.log(`  Putts: ${currentStep.holeData.putts}`);
        console.log(`  Points: ${currentStep.holeData.points}`);
        console.log(`  GIR: ${currentStep.holeData.gir}`);
        console.log(`  Up & Down: ${JSON.stringify(currentStep.holeData.upDown)}`);
        console.log(`  Scramble: ${JSON.stringify(currentStep.holeData.scramble)}`);
        
        console.log(`\nRunning Totals after ${hole} hole(s):`);
        console.log(`  Total Score: ${currentStep.runningTotals.score.totals}`);
        console.log(`  Total Points: ${currentStep.runningTotals.points.totals}`);
        console.log(`  Total Putts: ${currentStep.runningTotals.putts.totals}`);
        console.log(`  GIR Count: ${currentStep.runningTotals.gir.totals}`);
        
        if (currentStep.calculationIssues.length > 0) {
          console.log(`\n⚠️  Issues found:`);
          currentStep.calculationIssues.forEach(issue => {
            console.log(`    - ${issue}`);
          });
        } else {
          console.log(`\n✅ No calculation issues`);
        }
        
        console.log('\n' + '='.repeat(50) + '\n');
      }
    }
  }

  /**
   * Run all available test scenarios
   */
  static runAllTests(): void {
    console.log('🧪 Running All Test Scenarios...\n');
    
    const scenarios = TestDataGenerator.getTestScenarios();
    const edgeCases = EdgeCaseTests.getAllEdgeCaseTests();
    const allTests = { ...scenarios, ...edgeCases };
    
    let totalTests = 0;
    let passedTests = 0;
    let totalIssues = 0;
    
    Object.entries(allTests).forEach(([testName, testConfig]) => {
      totalTests++;
      
      console.log(`\n--- ${testName} ---`);
      console.log(`Description: ${testConfig.description}`);
      
      try {
        const tester = new StepByStepTester({
          ...testConfig,
          holeConfigs: testConfig.holeConfigs.slice(0, 3), // Limit to 3 holes for speed
        });
        
        const result = tester.runFullTest();
        const issueCount = result.steps.reduce((sum, step) => sum + step.calculationIssues.length, 0);
        
        if (result.overallPassed && issueCount === 0) {
          console.log('✅ PASSED');
          passedTests++;
        } else {
          console.log(`❌ FAILED (${issueCount} issues)`);
          totalIssues += issueCount;
        }
        
      } catch (error) {
        console.log(`💥 ERROR: ${error}`);
      }
    });
    
    console.log(`\n📊 Test Summary:`);
    console.log(`  Total Tests: ${totalTests}`);
    console.log(`  Passed: ${passedTests}`);
    console.log(`  Failed: ${totalTests - passedTests}`);
    console.log(`  Total Issues: ${totalIssues}`);
  }

  /**
   * Show available test scenarios
   */
  static listAvailableTests(): void {
    console.log('📋 Available Test Scenarios:\n');
    
    const scenarios = TestDataGenerator.getTestScenarios();
    const edgeCases = EdgeCaseTests.getAllEdgeCaseTests();
    
    console.log('Standard Scenarios:');
    Object.entries(scenarios).forEach(([name, config]) => {
      console.log(`  - ${name}: ${config.description}`);
    });
    
    console.log('\nEdge Case Tests:');
    Object.entries(edgeCases).forEach(([name, config]) => {
      console.log(`  - ${name}: ${config.description}`);
    });
  }
}

/**
 * CLI interface functions
 */
export const runQuickCalculationTest = () => InteractiveTestRunner.runQuickTest();
export const runEdgeCaseTests = () => InteractiveTestRunner.runEdgeCaseTests();
export const runStepByStepTest = (testName?: string, holes: number = 3) => 
  InteractiveTestRunner.runStepByStepTest(testName, holes);
export const runAllTests = () => InteractiveTestRunner.runAllTests();
export const listTests = () => InteractiveTestRunner.listAvailableTests();

// CLI execution for ESM
const args = process.argv.slice(2);
const command = args[0];

if (command) {
  switch (command) {
    case 'quick':
      InteractiveTestRunner.runQuickTest();
      break;
    case 'edge':
      InteractiveTestRunner.runEdgeCaseTests();
      break;
    case 'step':
      const testName = args[1];
      const holes = args[2] ? parseInt(args[2]) : 3;
      InteractiveTestRunner.runStepByStepTest(testName, holes);
      break;
    case 'all':
      InteractiveTestRunner.runAllTests();
      break;
    case 'list':
      InteractiveTestRunner.listAvailableTests();
      break;
    default:
      console.log('🏌️  Golf Calculation Test Runner\n');
      console.log('Usage:');
      console.log('  npm run test:calc quick       - Run quick 3-hole test');
      console.log('  npm run test:calc edge        - Run edge case tests');
      console.log('  npm run test:calc step [name] [holes] - Run step-by-step test');
      console.log('  npm run test:calc all         - Run all tests');
      console.log('  npm run test:calc list        - List available tests');
      console.log('\nExamples:');
      console.log('  npm run test:calc step mixedScenarios 5');
      console.log('  npm run test:calc step perfectRound 9');
  }
} else {
  console.log('🏌️  Golf Calculation Test Runner\n');
  console.log('Usage:');
  console.log('  npm run test:calc quick       - Run quick 3-hole test');
  console.log('  npm run test:calc edge        - Run edge case tests');
  console.log('  npm run test:calc step [name] [holes] - Run step-by-step test');
  console.log('  npm run test:calc all         - Run all tests');
  console.log('  npm run test:calc list        - List available tests');
}
