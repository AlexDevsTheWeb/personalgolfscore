---
title: Testing Patterns
tags: [pattern, testing, vitest]
created: 2026-06-13
updated: 2026-06-13
sources: [TESTING.md]
---

# Testing Patterns

## Vitest Configuration

- Vitest v4.1.2 with `@vitest/coverage-v8`
- jsdom v29.0.1 for DOM environment
- `@testing-library/react` v16.3.2 for component tests
- `@testing-library/jest-dom` v6.9.1 for DOM matchers

## Test Structure

```typescript
import { describe, it, expect } from 'vitest';

describe('Golf Calculation Tests', () => {
  describe('Basic Calculation Functions', () => {
    it('should calculate Stableford points correctly', () => {
      const eaglePoints = calculateStablefordPoints({ ... });
      expect(eaglePoints).toBe(4);
    });
  });
});
```

## Custom Dev-Tools

The `src/dev-tools/` directory contains a custom testing framework specifically for golf calculations:

- **TestDataGenerator** — Creates realistic round scenarios (`createQuickTestRound(3, 'mixed')`)
- **StepByStepTester** — Walks through a round hole-by-hole, exposing intermediate calculations
- **EdgeCaseTests** — Pre-configured edge case scenarios (array mismatches, null values, extreme values)
- **TestInspector** — Validates that calculated totals match expected values

These tools are more useful than standard unit tests because they validate the golf calculation engine end-to-end with realistic data.

## Related Pages

- [Testing Conventions](../conventions/testing.md)
- [Codebase Concerns](codebase-concerns.md)
