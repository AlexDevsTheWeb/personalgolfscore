# Golf Calculation Testing Framework

This framework provides a comprehensive testing solution for your golf application's calculation logic, allowing you to efficiently test calculations without manually entering data for all 18 holes.

## Quick Start

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Run a quick test**:
   ```bash
   npm run test:calc:quick
   ```

3. **See the demo**:
   ```bash
   tsx src/dev-tools/demo.ts
   ```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run test:calc:quick` | Run a quick 3-hole validation test |
| `npm run test:calc:edge` | Test edge cases and potential calculation issues |
| `npm run test:calc:all` | Run comprehensive test suite with all scenarios |
| `npm run test` | Run standard Vitest unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Framework Components

### 1. Test Data Generator (`testDataGenerator.ts`)

Generates realistic golf round data with various scenarios:

```typescript
import { TestDataGenerator } from '@/dev-tools/testDataGenerator';

// Create a quick 3-hole test round
const testShots = TestDataGenerator.createQuickTestRound(3, 'mixed');

// Create from predefined scenarios
const scenarios = TestDataGenerator.getTestScenarios();
const perfectRound = new TestDataGenerator().createTestRound(scenarios.perfectRound);
```

**Available Scenarios:**
- `perfectRound` - All birdies and eagles
- `disasterRound` - High scores with penalties
- `mixedScenarios` - Realistic variety of scores
- `calculationEdgeCases` - Boundary conditions

### 2. Step-by-Step Tester (`stepByStepTester.ts`)

Process golf rounds hole by hole with inspection at each step:

```typescript
import { StepByStepTester } from '@/dev-tools/stepByStepTester';

const tester = new StepByStepTester(testConfig);

// Process up to hole 5 and inspect
const steps = tester.runTestUpToHole(5);
steps.forEach(step => {
  console.log(`Hole ${step.holeNumber}: ${step.holeData.strokes} strokes, ${step.holeData.points} points`);
  console.log(`Running total: ${step.runningTotals.score.totals}`);
  console.log(`Issues: ${step.calculationIssues}`);
});

// Get detailed breakdown for a specific hole
const breakdown = tester.getHoleCalculationBreakdown(3);
console.log('Calculation details:', breakdown);
```

### 3. Edge Case Tests (`edgeCaseTests.ts`)

Test specific problematic scenarios:

```typescript
import { EdgeCaseTests, knownIssueTests } from '@/dev-tools/edgeCaseTests';

// Test variable mismatches
const mismatchTests = EdgeCaseTests.getVariableMismatchTests();

// Test known problematic calculations
const tester = new StepByStepTester(knownIssueTests.puttLengthMismatch);
const result = tester.runFullTest();
```

**Edge Case Categories:**
- **Variable Mismatches**: puttsLength array vs putts count, club name inconsistencies
- **Boundary Conditions**: Division by zero, extreme values
- **Mathematical Issues**: Rounding errors, percentage calculations
- **Complex Scenarios**: Mid-round calculations, statistical anomalies

### 4. Firestore Inspector (`firestoreInspector.ts`)

Inspect and compare Firestore data:

```typescript
import { createFirestoreTestUtils } from '@/dev-tools/firestoreInspector';

const firestoreUtils = createFirestoreTestUtils('your-user-id');

// Inspect a round in Firestore
const roundData = await firestoreUtils.inspectRound('round-id');
console.log('Round data:', roundData);

// Compare local calculations with Firestore
const comparison = await firestoreUtils.compareWithFirestore(
  'round-id', 
  localShots, 
  localTotals
);
console.log('Differences:', comparison.differences);
```

## Testing Workflow

### 1. Quick Validation
Start with a quick test to verify basic functionality:
```bash
npm run test:calc:quick
```

### 2. Edge Case Detection
Run edge case tests to identify potential issues:
```bash
npm run test:calc:edge
```

### 3. Step-by-Step Debugging
When you find issues, use step-by-step testing:
```typescript
import { StepByStepTester } from '@/dev-tools/stepByStepTester';

const tester = new StepByStepTester(problemConfig);
const steps = tester.runTestUpToHole(5);

// Inspect each step
steps.forEach(step => {
  if (step.calculationIssues.length > 0) {
    console.log(`Issues at hole ${step.holeNumber}:`, step.calculationIssues);
    
    // Get detailed breakdown
    const breakdown = tester.getHoleCalculationBreakdown(step.holeNumber);
    console.log('Calculation breakdown:', breakdown);
  }
});
```

### 4. Firestore Verification
After fixing issues, verify against Firestore:
```typescript
const comparison = await firestoreUtils.compareWithFirestore(roundId, shots, totals);
if (comparison.differences.fieldMismatches.length > 0) {
  console.log('Field mismatches found:', comparison.differences.fieldMismatches);
}
```

## Common Use Cases

### Testing Specific Calculations

**Points Calculation:**
```typescript
const pointsTest = EdgeCaseTests.createCustomEdgeCaseTest(
  'Points Test',
  'Testing Stableford points edge cases',
  [
    { par: 4, strokes: 2, hcp: 1, expectedPoints: 4 }, // Eagle
    { par: 4, strokes: 3, hcp: 10, expectedPoints: 3 }, // Birdie  
    { par: 4, strokes: 4, hcp: 18, expectedPoints: 2 }, // Par
  ]
);
```

**GIR Calculation:**
```typescript
const girTest = EdgeCaseTests.createCustomEdgeCaseTest(
  'GIR Test',
  'Testing GIR boundary conditions',
  [
    { par: 4, strokes: 4, putts: 2, expectedGIR: true }, // Exactly regulation
    { par: 4, strokes: 5, putts: 2, expectedGIR: false }, // Over regulation
  ]
);
```

**Up & Down Testing:**
```typescript
const upDownTest = EdgeCaseTests.createCustomEdgeCaseTest(
  'Up & Down Test',
  'Testing short game scenarios',
  [
    { 
      par: 4, 
      strokes: 4, 
      putts: 1, 
      chipClub: 'SW',
      expectedGIR: false,
      expectedUpDown: { made: 1, attempts: 1 }
    }
  ]
);
```

### Debugging Variable Mismatches

```typescript
// Test for common data entry errors
const mismatchTest = knownIssueTests.puttLengthMismatch;
const result = new StepByStepTester(mismatchTest).runFullTest();

result.steps.forEach(step => {
  if (step.holeData.putts !== step.holeData.puttsLength.length) {
    console.log(`Hole ${step.holeNumber}: putts=${step.holeData.putts}, puttsLength.length=${step.holeData.puttsLength.length}`);
  }
});
```

### Testing Different Handicap Scenarios

```typescript
const handicapTests = [0, 5, 18, 36].map(hcp => 
  EdgeCaseTests.createCustomEdgeCaseTest(
    `HCP ${hcp} Test`,
    `Testing with ${hcp} handicap`,
    [{ par: 4, strokes: 5, hcp: 1, roundPlayingHCP: hcp }]
  )
);
```

## Output Examples

### Successful Test
```
=== Mixed Scenarios Test (3 holes) ===
Description: Variety of realistic scoring scenarios
Overall Result: ✅ PASSED

✅ Hole 1: 3 strokes, 1 putts, 5 points, GIR: true
✅ Hole 2: 3 strokes, 1 putts, 3 points, GIR: true  
✅ Hole 3: 4 strokes, 1 putts, 2 points, GIR: false

📊 Summary: {
  "calculatedScore": 10,
  "totalsScore": 10,
  "calculatedPoints": 10,
  "totalsPoints": 10
}
```

### Issue Detection
```
❌ Hole 1: 4 strokes, 2 putts, 2 points, GIR: true
    ⚠️  Points mismatch: calculated 2, expected 3
    ⚠️  Total putts mismatch: sum of holes = 2, totals = 1

🚨 Final Validation Issues:
  - Array length mismatch detected in puttsLength
```

## Benefits

1. **⚡ Efficiency**: Test complex scenarios without manual data entry
2. **🔍 Precision**: Inspect calculations at each step
3. **🐛 Bug Detection**: Identify variable mismatches and calculation errors
4. **📊 Validation**: Compare local calculations with Firestore data
5. **🧪 Edge Cases**: Test boundary conditions and unusual scenarios
6. **📈 Confidence**: Verify calculations before deployment

## Integration with Development Workflow

1. **During Development**: Use quick tests to verify changes
2. **Before Commits**: Run edge case tests to catch regressions
3. **Debugging**: Use step-by-step testing to isolate issues
4. **Data Validation**: Compare with Firestore to ensure consistency

## Extending the Framework

### Adding New Test Scenarios

```typescript
const myCustomTest: TestRoundConfig = {
  roundName: 'My Custom Test',
  description: 'Testing specific scenario',
  courseInfo: { name: 'My Course', par: 36, tee: 'Blue', playerHCP: 15 },
  holeConfigs: [
    {
      holeNumber: 1,
      par: 4,
      hcp: 1,
      distance: 400,
      strokes: 5,
      putts: 2,
      puttsLength: [8, 1],
      teeClub: 'DRIVER',
      expectedPoints: 1, // Expected values for validation
    }
  ],
};
```

### Adding New Validation Rules

```typescript
// Extend TestInspector with custom validation
static validateCustomRule(shots: IShots[], totals: IRoundTotals): ValidationResult {
  const issues: string[] = [];
  
  // Your custom validation logic here
  if (someCondition) {
    issues.push('Custom validation failed');
  }
  
  return { passed: issues.length === 0, issues, summary: {} };
}
```

This framework solves your original problem by providing a way to efficiently test your golf application without manually entering data for all 18 holes, while giving you the ability to inspect calculations and verify Firestore data at every step.
