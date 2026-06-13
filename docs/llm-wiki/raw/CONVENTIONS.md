# Coding Conventions

**Analysis Date:** 2026-05-17

## Naming Patterns

**Files:**
- Components: `*.component.tsx` - Example: `Dashboard.component.tsx`, `Spinner.component.tsx`
- Hooks: `*.hook.ts` - Example: `useDialog.hook.ts`
- Utilities: `*.utils.ts` or `*.utils.tsx` - Example: `TotalsCalculator.utils.tsx`, `shots.utils.tsx`
- Types: `*.types.ts` - Example: `user.types.ts`, `round.types.ts`
- Enums: `*.enum.tsx` - Example: `shots.enum.tsx`
- Pages: `*.page.tsx` - Example: `Dashboard.page.tsx`, `Login.page.tsx`

**Functions:**
- camelCase - Example: `calculateStablefordPoints`, `handleAddNewRound`
- Action functions prefixed with handler intent: `handle*`, `on*`, `set*`
- Utility functions descriptive: `calculateGirValue`, `calculateUDValue`

**Variables:**
- camelCase - Example: `roundsList`, `isLoadingControls`, `roundPlayingHCP`
- Boolean variables prefixed with `is*`, `has*`, `can*` - Example: `isOpen`, `isLoading`, `hasError`
- Arrays use plural nouns - Example: `roundsList`, `holes`, `clubs`

**Types/Interfaces:**
- PascalCase with descriptive suffixes - Example: `IUser`, `IControls`, `IShots`, `IRoundTotals`
- Interface prefixes: `I` for interfaces - Example: `IUser`, `IPlayerStateData`
- Type aliases for unions: descriptive names - Example: `ThemeMode`, `CLUBSSELECTION`

## Code Style

**Formatting:**
- Tool: Prettier
- Single quotes for strings
- Trailing commas: all
- Tab width: 1 space
- Use tabs for indentation (not spaces)
- Arrow parens: avoid (only when unnecessary)
- Semicolons: yes
- Bracket spacing: true

**Linting:**
- No ESLint config detected - uses Create React App defaults (`eslintConfig` in `package.json`)
- Extends: `react-app`, `react-app/jest`

## Import Organization

**Order (top to bottom):**
1. External libraries (React, MUI, etc.)
2. Path alias imports (`@/...`)
3. Relative imports (local components/modules)

**Example:**
```typescript
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/spinner/Spinner.component";
import Rounds from "../Rounds/Rounds.component";
import { useAppStore } from "@/store/zustand";
```

**Path Aliases:**
- `@/calc/*` - Calculation utilities
- `@/components/*` - React components
- `@/enum/*` - Enumerations
- `@/features/*` - Feature modules
- `@/hooks/*` - Custom hooks
- `@/pages/*` - Page components
- `@/routes/*` - Routing configuration
- `@/store/*` - State management
- `@/styles/*` - Styling
- `@/types/*` - TypeScript types
- `@/utils/*` - Utility functions

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (Firestore calls)
- Error state in store: `error: string`, `errorMessage: string`
- Error objects with `errorCode` and `errorMessage` - Example: `{ errorCode: 0, errorMessage: '' }`
- Loading states: `isLoading: boolean`
- Fallback UI with conditional rendering - Example: `if (!!isLoadingControls) return <Spinner />`

**Example from `src/store/zustand/app.store.ts`:**
```typescript
const initialPlayer: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as IPlayerStateData,
};
```

## Logging

**Framework:** console.log (no formal logging library)

**Patterns:**
- Debug logging with `console.log` for test results
- Error logging with `console.error` for validation failures
- No structured logging system in place

## Comments

**When to Comment:**
- Complex calculation logic - Example: GIR calculation in `src/utils/shots/shots.utils.tsx`
- Test configurations and edge cases
- JSDoc style for exported functions in utilities

**JSDoc/TSDoc:**
- Used in dev-tools for test configurations
- Parameter descriptions for utility functions

**Example from `src/dev-tools/testDataGenerator.ts`:**
```typescript
/**
 * Creates a realistic golf round scenario for testing calculations
 */
createTestRound(config: TestRoundConfig): IShots[] { ... }
```

## Function Design

**Size:** Typically 20-50 lines; complex calculations separated into multiple helper functions

**Parameters:**
- Destructured for clarity - Example: `const { par, strokes, putts, bogey } = props;`
- Interface-typed for external functions - Example: `props: IStablefordPointsProps`
- Explicit types on all parameters

**Return Values:**
- Explicit return types for utility functions
- Boolean returns for conditional functions
- Object returns for complex calculations - Example: `{ attempts: number; made: number }`

## Module Design

**Exports:**
- Named exports for utilities - Example: `export const calculateStablefordPoints = ...`
- Default exports for React components - Example: `export default Dashboard`
- Mixed: named exports for hooks - Example: `export const useDialog = ...; export default useDialog;`

**Barrel Files:**
- Not heavily used; direct imports preferred
- Store uses index.ts for re-exports - Example: `src/store/zustand/index.ts`

## Component Patterns

**Structure:**
- Functional components with hooks
- Direct store access via Zustand selectors
- MUI components for UI

**Example from `src/components/Dashboard/Dashboard.component.tsx`:**
```typescript
const Dashboard = () => {
  const navigate = useNavigate();
  const roundsList = useAppStore((state) => state.roundsList);
  const player = useAppStore((state) => state.player);
  const isLoadingControls = useAppStore((state) => state.isLoadingControls);

  if (!!isLoadingControls) {
    return <Spinner />
  }

  return ( ... );
};

export default Dashboard;
```

**Form Handling:**
- React Hook Form for form state management
- MUI DatePicker for date inputs
- Custom validation with formState errors

## State Management

**Primary:** Zustand with persist middleware

**Patterns:**
- Centralized store in `src/store/zustand/app.store.ts`
- Selective state subscriptions via selectors
- Persist to localStorage via `redux-persist` equivalent (zustand/middleware persist)

## TypeScript Conventions

**Strict Mode:** Enabled in `tsconfig.json`

**Key Settings:**
- `strict: true`
- `noFallthroughCasesInSwitch: true`
- `isolatedModules: true`
- `noEmit: true`

---

*Convention analysis: 2026-05-17*