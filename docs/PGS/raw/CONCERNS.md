# Codebase Concerns

**Analysis Date:** 2026-05-17

## Tech Debt

**Large Zustand Store (793 lines):**
- Issue: Single monolithic store in `src/store/zustand/app.store.ts` handles player, rounds, clubs, new round, UI controls, and totals
- Files: `src/store/zustand/app.store.ts`
- Impact: Difficult to maintain, test, and refactor. Any change risks affecting multiple features
- Fix approach: Split into domain-specific stores (playerStore, roundsStore, clubsStore, uiStore) using zustand's split slices pattern

**Theme Configuration Fragmentation:**
- Issue: Theme spread across multiple files with 809 lines in Components.theme.tsx alone
- Files: `src/styles/theme/Components.theme.tsx`, `src/styles/theme/Typography.theme.tsx`, `src/styles/theme/Palette.theme.tsx`
- Impact: Theme changes require editing multiple files; no single source of truth for design tokens
- Fix approach: Consolidate into single theme configuration or use design tokens system

**Generic `any` Types:**
- Issue: Using untyped `any` for hole adjustments and error handling
- Files: `src/types/round.types.tsx:6`, `src/utils/firestore/round.firestore.ts:56`
- Impact: Type safety reduced; runtime errors from incorrect data structure won't be caught at compile time
- Fix approach: Define proper interfaces for `holeAdjusted` payload; use `unknown` for catch error parameter

**Constants File Size:**
- Issue: `src/utils/constant.utils.tsx` at 637 lines containing mixed types of constants
- Files: `src/utils/constant.utils.tsx`
- Impact: Hard to navigate; unclear what constants belong to which domain
- Fix approach: Split into domain-specific constant files (scoring.constants.ts, ui.constants.ts)

## Known Bugs

**Putts Length Array Mismatch (Documented in Tests):**
- Symptoms: User can enter different number of putts than puttsLength array items
- Files: `src/dev-tools/edgeCaseTests.ts`
- Trigger: Enter 2 putts but only 1 putt length, or vice versa
- Workaround: Edge case tests exist but no runtime validation prevents this

**Club Name Inconsistency:**
- Symptoms: Different club name formats (lowercase 'driver', uppercase 'DRIVER', '3w' vs '3W') can cause lookup failures
- Files: `src/utils/shots/shots.utils.tsx`, `src/dev-tools/edgeCaseTests.ts:58-98`
- Trigger: Club selection uses case-sensitive matching
- Workaround: Normalize club names on input or use case-insensitive comparison

## Security Considerations

**Firebase Credentials in Environment:**
- Risk: Firebase config in `.env` - needs careful handling
- Files: `.env` (not committed per AGENTS.md)
- Current mitigation: `.env` is in `.gitignore`
- Recommendations: Verify `.gitignore` contains `.env*`; add explicit `.env` entry if missing

**No Input Sanitization on Club Names:**
- Risk: User-provided club names stored directly to Firestore
- Files: `src/utils/firestore/player.firestore.ts`
- Current mitigation: None observed
- Recommendations: Validate club names against allowed list before storage

## Performance Bottlenecks

**Redundant Array Cloning:**
- Problem: Heavy use of `_.cloneDeep` in `AverageCalculator.utils.tsx` and `app.store.ts`
- Files: `src/utils/calculator/AverageCalculator.utils.tsx`, `src/store/zustand/app.store.ts`
- Cause: Lodash deep clone on large objects every render
- Improvement path: Use Immer for immutable state updates, or clone only modified paths

**Large State Serialization:**
- Problem: Entire Zustand state persisted to localStorage via redux-persist pattern
- Files: `src/store/zustand/app.store.ts`
- Cause: persist middleware serializes all state on every change
- Improvement path: Use selective persistence with only critical user data; implement debounced saves

## Fragile Areas

**Calculation Utilities:**
- Files: `src/utils/calculator/AverageCalculator.utils.tsx`, `src/utils/shots/shots.utils.tsx`, `src/utils/round/round.utils.tsx`
- Why fragile: Complex scoring logic (Stableford points, GIR, Up & Down, Scrambles) with many edge cases; no unit tests for calculation functions
- Safe modification: Add unit tests for each calculation before modifying; use dev-tools/testRunner.ts to validate
- Test coverage: Only `src/utils/calculator/__tests__/calculations.test.ts` exists, but custom test framework in dev-tools is primary validation

**Round Save Logic:**
- Files: `src/utils/firestore/round.firestore.ts:63-139`
- Why fragile: Complex Firestore batch writes updating multiple collections (round, holes, distances, averages)
- Safe modification: Add transaction support; ensure idempotent operations
- Test coverage: No tests for save/round operations

## Scaling Limits

**Firestore Collection Structure:**
- Current: Players → Rounds → Holes subcollection
- Limit: Deep nesting may impact query performance for aggregate statistics across all rounds
- Scaling path: Consider denormalized aggregate collections for statistics queries

**localStorage Persistence:**
- Current capacity: Unlimited (browser-dependent, typically 5-10MB)
- Limit: Will fail silently when storage quota exceeded
- Scaling path: Implement storage quota detection and cleanup old rounds

## Dependencies at Risk

**React 19 (Latest):**
- Risk: React 19 is very new (May 2026); some libraries may have compatibility issues
- Impact: MUI v7, Firebase v12 may have unexpected interactions with React 19
- Migration plan: Monitor for type errors and library updates; test thoroughly before minor version bumps

**MUI v7 (Latest):**
- Risk: MUI v7 recently released; some v5/v6 patterns may be deprecated
- Impact: Theme and component prop changes may break existing patterns
- Migration plan: Review MUI migration guide on updates; use codemod for automated fixes

## Missing Critical Features

**Error Boundaries:**
- Problem: No React Error Boundary component to catch rendering errors gracefully
- Blocks: App crashes completely on unexpected rendering errors; no recovery mechanism

**Loading States Consistency:**
- Problem: Some components may not handle async states properly
- Blocks: Race conditions in data fetching; confusing UX when operations are in progress

## Test Coverage Gaps

**No Unit Tests for Core Calculations:**
- What's not tested: `calculateStablefordPoints`, `calculateGirValue`, `calculateUDValue`, `calculateScrambleValue`
- Files: `src/utils/shots/shots.utils.tsx`
- Risk: Calculation logic changes could produce incorrect scores without detection
- Priority: High

**No Integration Tests for Firestore:**
- What's not tested: Round save, player updates, data fetching from Firestore
- Files: `src/utils/firestore/`
- Risk: Firebase security rules or data structure changes could break app silently
- Priority: High

**No E2E Tests:**
- What's not tested: Full user flows (login → add round → view statistics)
- Files: None
- Risk: Regression in critical user paths won't be caught
- Priority: Medium

---

*Concerns audit: 2026-05-17*