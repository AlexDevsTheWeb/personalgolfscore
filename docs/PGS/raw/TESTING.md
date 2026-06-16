# Testing Patterns

**Analysis Date:** 2026-05-17

## Test Framework

**Runner:**
- Vitest v4.1.2
- Config: No `vitest.config.*` file detected - uses defaults
- Runs via: `npm test` or `vitest`

**Assertion Library:**
- Vitest built-in expect

**Run Commands:**
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage with @vitest/coverage-v8
npm run test:calc        # Custom calculation tests via dev-tools
npm run test:calc:quick  # Quick 3-hole calculation test
npm run test:calc:edge   # Edge case calculation tests
npm run test:calc:all    # Full calculation test suite
```

**Additional Test Dependencies:**
- @testing-library/jest-dom v6.9.1
- @testing-library/react v16.3.2
- @testing-library/user-event v14.6.1
- @types/jest v30.0.0
- jsdom v29.0.1

## Test File Organization

**Location:**
- Co-located with source in `__tests__` directories - Example: `src/utils/calculator/__tests__/calculations.test.ts`
- Development tools in `src/dev-tools/` for calculation testing

**Naming:**
- `*.test.ts` for unit tests
- `*.test.tsx` for component tests (if any)

**Structure:**
- Single test file at `src/utils/calculator/__tests__/calculations.test.ts` (404 lines)
- Custom test utilities in `src/dev-tools/`:
  - `testRunner.ts` - Test orchestrator
  - `testDataGenerator.ts` - Generates test round data
  - `stepByStepTester.ts` - Debug calculations hole-by-hole
  - `edgeCaseTests.ts` - Known edge cases
  - `mockShotData.ts` - Mock data for testing

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { TestDataGenerator, TestInspector } from '../../../dev-tools/testDataGenerator';
import { StepByStepTester, runQuickTest, formatTestResults } from '../../../dev-tools/stepByStepTester';
import { EdgeCaseTests, knownIssueTests } from '../../../dev-tools/edgeCaseTests';
import { totalsCalculator } from '../TotalsCalculator.utils';
import { calculateStablefordPoints, calculateGirValue, calculateUDValue, calculateScrambleValue } from '../../shots/shots.utils';

describe('Golf Calculation Tests', () => {
  describe('Basic Calculation Functions', () => {
    it('should calculate Stableford points correctly', () => {
      const eaglePoints = calculateStablefordPoints({ ... });
      expect(eaglePoints).toBe(4);
    });
  });
});
```

**Patterns:**
- Nested describe blocks for grouping related tests
- Multiple describe blocks for different test categories
- It blocks for individual test cases
- expect() for assertions with various matchers

## Mocking

**Framework:** Vitest handles mocking natively; custom test utilities for golf-specific mocking

**Patterns:**
```typescript
// Test data generation
import { TestDataGenerator } from '../../../dev-tools/testDataGenerator';
const testShots = TestDataGenerator.createQuickTestRound(3, 'mixed');

// Custom test config
import { knownIssueTests } from '../../../dev-tools/edgeCaseTests';
const edgeCaseConfig = knownIssueTests.puttLengthMismatch;
const tester = new StepByStepTester(edgeCaseConfig);
```

**What to Mock:**
- Round/shot data for calculation tests
- Edge case scenarios (array mismatches, null values, extreme values)
- Test configurations for known issues

**What NOT to Mock:**
- Simple calculation functions tested directly
- Totals calculator with real test data

## Fixtures and Factories

**Test Data:**
```typescript
// TestDataGenerator from src/dev-tools/testDataGenerator.ts
export class TestDataGenerator {
  createTestRound(config: TestRoundConfig): IShots[] { ... }
  static createQuickTestRound(holeCount: number, scenario: string): IShots[] { ... }
  static getTestScenarios(): { mixedScenarios: TestRoundConfig; ... } { ... }
}

// EdgeCaseTests from src/dev-tools/edgeCaseTests.ts
export class EdgeCaseTests {
  static getVariableMismatchTests(): TestRoundConfig { ... }
  static getBoundaryConditionTests(): TestRoundConfig { ... }
  static getComplexScenarioTests(): TestRoundConfig { ... }
  static createCustomEdgeCaseTest(name: string, description: string, holes: TestHoleConfig[]): TestRoundConfig { ... }
}
```

**Location:**
- `src/dev-tools/testDataGenerator.ts` - Main test data factory
- `src/dev-tools/edgeCaseTests.ts` - Edge case configurations
- `src/dev-tools/mockShotData.ts` - Additional mock data

## Coverage

**Requirements:** None explicitly enforced

**View Coverage:**
```bash
npm run test:coverage
```

**Coverage Provider:** @vitest/coverage-v8

**Test Coverage Areas:**
- Golf calculation functions (Stableford points, GIR, Up & Down, Scramble)
- Totals calculator (score, points, putts, fairways)
- Edge case handling (array mismatches, division by zero, extreme values)
- Integration tests for full 18-hole rounds

## Test Types

**Unit Tests:**
- Individual calculation functions tested in isolation
- Example: `calculateStablefordPoints`, `calculateGirValue`, `calculateUDValue`
- Input-output verification with known expected values

**Integration Tests:**
- Full round processing tests - 18-hole rounds with all calculations
- Totals calculator integration with test data
- Step-by-step testing with running totals validation
- Example: `should process a complete 18-hole round`

**Custom Calculation Tests:**
- Custom test runner in `src/dev-tools/testRunner.ts`
- More valuable than unit tests for this codebase
- Validates golf-specific calculations end-to-end
- Run via `npm run test:calc:*` commands

**E2E Tests:** Not detected

## Common Patterns

**Async Testing:**
- Synchronous calculations mostly; no async test patterns observed
- Future async operations would use async/await with Vitest

**Error Testing:**
```typescript
// Example from tests - expect no throw
expect(() => totalsCalculator(shots)).not.toThrow();

// Validation checking
const validation = TestInspector.validateRoundTotals(testShots, totals);
if (!validation.passed) {
  console.error('Totals validation failed:', validation.issues);
}
expect(validation.passed).toBe(true);
```

**Test Utilities:**
- `TestInspector.validateRoundTotals()` - Validates calculated totals
- `StepByStepTester` - Debug calculations hole-by-hole
- `formatTestResults()` - Pretty print test output

## Test Inspection and Debugging

**StepByStepTester:**
```typescript
const tester = new StepByStepTester(testConfig);
const result = tester.runFullTest();

// Inspect individual holes
const step1 = tester.runTestUpToHole(1);
expect(step1).toHaveLength(1);

// Get calculation breakdown
const breakdown = tester.getHoleCalculationBreakdown(1);
expect(breakdown?.calculated.points).toBeDefined();
```

**Result Validation:**
```typescript
expect(result.overallPassed).toBe(true);
result.steps.forEach(step => {
  expect(step.validationResult.passed).toBe(true);
  expect(step.calculationIssues).toHaveLength(0);
});
```

## Key Test Files

- `src/utils/calculator/__tests__/calculations.test.ts` - Main test file (404 lines)
- `src/dev-tools/testRunner.ts` - Test orchestrator
- `src/dev-tools/testDataGenerator.ts` - Test data factory (507 lines)
- `src/dev-tools/stepByStepTester.ts` - Step-by-step testing utility
- `src/dev-tools/edgeCaseTests.ts` - Edge case configurations

---

*Testing analysis: 2026-05-17*