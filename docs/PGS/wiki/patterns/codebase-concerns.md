---
title: Codebase Concerns
tags: [pattern, tech-debt, bugs, security]
created: 2026-06-13
updated: 2026-06-13
sources: [CONCERNS.md, TYPE_ERRORS_FIX_PROGRESS.md]
---

# Codebase Concerns

## Tech Debt

| Issue | Severity | Location | Notes |
|---|---|---|---|
| Large Zustand Store (966 lines) | High | `app.store.ts` | Single store handles player, rounds, clubs, UI, totals, import — hard to maintain |
| Theme Fragmentation | Medium | `src/styles/theme/` | 809 lines in Components.theme.tsx alone, spread across 3 files |
| Generic `any` Types | Medium | Various | Hole adjustments, error handling — type safety reduced |
| Constants File Size | Low | `constant.utils.tsx` | 637 lines of mixed constants |
| Loose Equality (`==` in `round.firestore.ts`) | Low | `round.firestore.ts` | Code style, not a blocker |
| Debug `console.log` in production import | Low | `importRoundsBatch` | Cosmetic noise |
| Missing in-batch duplicate detection | Low | `importRounds` | Edge case |
| Redundant `Dashboard.page.tsx` `setRounds` workaround | Low | `Dashboard.page.tsx:24-30` | Harmless after CR-01 fix |

## Known Bugs

- **Putts Length Array Mismatch** — User can enter different number of putts than putt length entries
- **Club Name Inconsistency** — Case-sensitive club name matching can cause lookup failures

## Performance Bottlenecks

- Heavy `_.cloneDeep` usage in `AverageCalculator.utils.tsx` and `app.store.ts`
- Entire Zustand state serialized to localStorage on every change
- Import batch is sequential per-round (required for incremental HI computation)

## Security Considerations

- Firebase credentials in `.env` (mitigated by `.gitignore`)
- Admin routes protected at client (`AdminRoute` guard) and server (Firestore security rules) levels
- Firebase custom claims (`{ admin: true }`) for admin identification — verified server-side in security rules
- No input sanitization on club names (stored directly to Firestore)

## Missing Features

- No React Error Boundary component
- Inconsistent loading states across components
- No live WHS recalc fallback in `importRoundsBatch` for null `initialHCP` (D-15 scenario)

## Test Coverage Gaps

- No unit tests for core calculation functions (`calculateStablefordPoints`, etc.)
- No integration tests for Firestore operations
- No E2E tests for full user flows
- Custom calc tests (`test:calc:*`) exist but not run in CI

## Type Errors (Resolved)

All 66 type errors from the libraries update were resolved as of the May 2026 fix:
- 22 blocking errors (tsconfig, web-vitals, useRef, imports, prop types, key props)
- 35 JSX implicit `any` errors (fixed via `react-jsx.d.ts` declaration)
- Remaining 9 errors across dialog and layout components

## Related Pages

- [Store Splitting Plan](../decisions/store-splitting.md)
- [Testing Patterns](testing.md)
- [Milestone v2 Current](../raw/milestones/v2-current.md)
