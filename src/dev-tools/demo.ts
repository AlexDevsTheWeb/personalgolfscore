import { TestDataGenerator, TestInspector } from './testDataGenerator';
import { StepByStepTester, runQuickTest, formatTestResults } from './stepByStepTester';
import { EdgeCaseTests } from './edgeCaseTests';
import { totalsCalculator } from '@/utils/calculator/TotalsCalculator.utils';

/**
 * Demonstration of the testing framework capabilities
 * Run this to see how you can test your golf calculations efficiently
 */

console.log('🏌️  Golf Calculation Testing Framework Demo\n');
console.log('='.repeat(60) + '\n');

// 1. Quick Test - Generate and test a 3-hole round
console.log('1️⃣  Quick Test - 3 Hole Round\n');
const quickTest = runQuickTest('mixedScenarios', 3);
console.log(formatTestResults(quickTest));

// 2. Step-by-step inspection
console.log('\n2️⃣  Step-by-Step Inspection\n');
const stepTester = new StepByStepTester(EdgeCaseTests.getVariableMismatchTests().arrayLengthMismatch);

// Process hole by hole and inspect
for (let hole = 1; hole <= 3; hole++) {
  console.log(`--- Inspecting Hole ${hole} ---`);
  
  const steps = stepTester.runTestUpToHole(hole);
  const currentStep = steps[steps.length - 1];
  
  if (currentStep) {
    console.log(`Raw Data: Par ${currentStep.holeData.par}, ${currentStep.holeData.strokes} strokes, ${currentStep.holeData.putts} putts`);
    console.log(`Calculated: ${currentStep.holeData.points} points, GIR: ${currentStep.holeData.gir}`);
    console.log(`Running Score: ${currentStep.runningTotals.score.totals}, Points: ${currentStep.runningTotals.points.totals}`);
    
    if (currentStep.calculationIssues.length > 0) {
      console.log(`⚠️  Issues: ${currentStep.calculationIssues.join(', ')}`);
    } else {
      console.log('✅ No issues');
    }
    
    // Detailed calculation breakdown
    const breakdown = stepTester.getHoleCalculationBreakdown(hole);
    if (breakdown) {
      console.log(`Calculation Details:`);
      console.log(`  Strokes to Green: ${breakdown.intermediate.strokesToGreen}`);
      console.log(`  GIR Threshold: ${breakdown.intermediate.girThreshold}`);
      console.log(`  Up & Down: ${JSON.stringify(breakdown.calculated.upDown)}`);
    }
  }
  
  console.log('');
}

// 3. Test individual calculation functions
console.log('3️⃣  Individual Function Testing\n');

// Test a specific calculation
const testShots = TestDataGenerator.createQuickTestRound(5, 'mixed');
console.log(`Generated ${testShots.length} test holes`);

// Calculate totals and validate
const totals = totalsCalculator(testShots);
const validation = TestInspector.validateRoundTotals(testShots, totals);

console.log(`Validation result: ${validation.passed ? '✅ PASSED' : '❌ FAILED'}`);
if (!validation.passed) {
  console.log('Issues found:');
  validation.issues.forEach(issue => console.log(`  - ${issue}`));
}

console.log('\nValidation Summary:');
console.log(JSON.stringify(validation.summary, null, 2));

// 4. Show what data you can inspect
console.log('\n4️⃣  Available Data for Inspection\n');

const sampleHole = testShots[0];
console.log('Sample Hole Data Structure:');
console.log('Raw Input Fields:', {
  holeNumber: sampleHole.holeNumber,
  par: sampleHole.par,
  strokes: sampleHole.strokes,
  putts: sampleHole.putts,
  puttsLength: sampleHole.puttsLength,
  teeClub: sampleHole.teeClub,
  driveDistance: sampleHole.driveDistance,
  fairway: sampleHole.fairway,
  toGreen: sampleHole.toGreen,
  toGreenMeters: sampleHole.toGreenMeters,
});

console.log('\nCalculated Fields:', {
  points: sampleHole.points,
  gir: sampleHole.gir,
  girBogey: sampleHole.girBogey,
  upDown: sampleHole.upDown,
  scramble: sampleHole.scramble,
  bounceBack: sampleHole.bounceBack,
});

console.log('\nTotals Summary:', {
  score: {
    total: totals.score.totals,
    average: totals.score.avg,
    vsPar: totals.score.vsPar,
  },
  points: {
    total: totals.points.totals,
    average: totals.points.avg,
  },
  gir: {
    count: totals.gir.totals,
    percentage: totals.gir.avg,
  },
  putts: {
    total: totals.putts.totals,
    average: totals.putts.avg,
  },
});

console.log('\n5️⃣  How to Use This Framework\n');
console.log('Available Commands:');
console.log('  npm run test:calc:quick    - Quick 3-hole validation');
console.log('  npm run test:calc:edge     - Test edge cases and potential issues');
console.log('  npm run test:calc:all      - Run comprehensive test suite');
console.log('  npm run test              - Run Vitest unit tests');
console.log('');
console.log('Programming Interface:');
console.log('  import { TestDataGenerator, StepByStepTester } from "@/dev-tools/testDataGenerator"');
console.log('  import { EdgeCaseTests } from "@/dev-tools/edgeCaseTests"');
console.log('  import { createFirestoreTestUtils } from "@/dev-tools/firestoreInspector"');
console.log('');
console.log('This framework allows you to:');
console.log('  ✅ Generate realistic test data without manual entry');
console.log('  ✅ Step through calculations hole by hole');
console.log('  ✅ Inspect intermediate calculation values');
console.log('  ✅ Validate against Firestore data');
console.log('  ✅ Test edge cases and boundary conditions');
console.log('  ✅ Identify variable mismatches and calculation errors');

console.log('\n🎯 Ready to test your golf calculations efficiently!');
