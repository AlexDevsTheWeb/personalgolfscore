---
title: Testing Conventions
tags: [conventions, testing]
created: 2026-06-13
updated: 2026-06-13
sources: [TESTING.md]
---

# Testing Conventions

## Test Commands

| Command | Purpose |
|---|---|
| `npm test` | Run all Vitest tests |
| `npm run type-check` | TypeScript validation |
| `npm run build` | Production build |
| `npm run test:calc:quick` | Quick 3-hole calculation test |
| `npm run test:calc:edge` | Edge case calculation tests |
| `npm run test:calc:all` | Full calculation test suite |

## Test Organization

- Unit tests co-located in `__tests__` directories (e.g., `src/utils/calculator/__tests__/calculations.test.ts`)
- Custom golf calculation test framework in `src/dev-tools/`
  - `testRunner.ts` — Test orchestrator
  - `testDataGenerator.ts` — Generates test round data
  - `stepByStepTester.ts` — Debug calculations hole-by-hole
  - `edgeCaseTests.ts` — Known edge cases
  - `mockShotData.ts` — Mock data

## Custom Calculation Tests

The custom test framework is considered **more valuable** than unit tests for this codebase. It validates golf-specific calculations end-to-end using realistic round data.

### Key Testing Patterns

- **Step-by-step testing** — `StepByStepTester` validates calculations hole by hole with running totals
- **Edge case testing** — Known issues like putt length array mismatches, club name inconsistency
- **WHS test suite** — `npm run test:calc:whs` tests the handicap calculation with known expected values
- **TestInspector** — `TestInspector.validateRoundTotals()` validates that calculated totals are internally consistent

## Related Pages

- [Testing Patterns](../patterns/testing.md)
- [Coding Conventions](coding.md)
