---
title: Coding Conventions
tags: [conventions, coding]
created: 2026-06-13
updated: 2026-06-13
sources: [CONVENTIONS.md]
---

# Coding Conventions

## Before You Code

Before starting any feature or bugfix, **read the wiki first** (`docs/llm-wiki/wiki/index.md`) to understand:
- The current architecture and data flow
- Existing patterns and conventions
- Code naming and file organization
- Related features and decisions
- Known concerns and tech debt

This ensures consistency and prevents rework.

## File Naming

| Type | Pattern | Example |
|---|---|---|
| Components | `*.component.tsx` | `Dashboard.component.tsx` |
| Hooks | `*.hook.ts` | `useDialog.hook.ts` |
| Utilities | `*.utils.ts` or `*.utils.tsx` | `TotalsCalculator.utils.tsx` |
| Types | `*.types.ts` or `*.types.tsx` | `roundData.types.tsx` |
| Enums | `*.enum.tsx` | `shots.enum.tsx` |
| Pages | `*.page.tsx` | `Dashboard.page.tsx` |

## Code Style

- Prettier formatting
- Single quotes, trailing commas, tabs for indentation (1 space tab width)
- Semicolons required
- Arrow parens: avoid when unnecessary
- ESLint: extends `react-app`, `react-app/jest`

## Import Order

1. External libraries (React, MUI, etc.)
2. Path alias imports (`@/...`)
3. Relative imports (local components/modules)

### Path Aliases

| Alias | Directory |
|---|---|
| `@/calc/*` | Calculation utilities |
| `@/components/*` | React components |
| `@/enum/*` | Enumerations |
| `@/hooks/*` | Custom hooks |
| `@/pages/*` | Page components |
| `@/store/*` | State management |
| `@/types/*` | TypeScript types |
| `@/utils/*` | Utility functions |

## Error Handling

- Try-catch for async Firestore operations
- Error state in store: `error: string`, `errorMessage: string`
- Error objects with `errorCode` and `errorMessage`
- Loading states: `isLoading: boolean`
- Fallback UI with conditional rendering: `if (!!isLoadingControls) return <Spinner />`

## Type Naming Conventions

| Category | Prefix | Pattern | Example | Location |
|---|---|---|---|---|
| Interfaces | `I` | `I{Name}` | `IUser`, `IShots`, `IRoundTotals`, `IPlayerDetails` | `src/types/{domain}.types.ts` |
| Type aliases | `T` | `T{Name}` | `TLinkSidebar` | `src/types/{domain}.types.ts` |

- All interfaces and types go in `src/types/{domain}.types.ts` files, grouped by domain
- Examples: `round.types.ts`, `player.types.ts`, `course.types.ts`, `general.types.ts`
- One `.types.ts` file per logical domain, named after the primary entity or responsibility

## Component Patterns

- Functional components with hooks
- Direct store access via Zustand selectors
- MUI components for UI
- React Hook Form for form state management

## Related Pages

- [System Architecture](../architecture/system-overview.md)
- [Testing Conventions](testing.md)
- [Branch Strategy & Workflow](branch-strategy.md)
