# Technology Stack

**Analysis Date:** 2026-05-17

## Languages

**Primary:**
- TypeScript 6.0.2 - All application code
- JSX/TSX - React components

**Secondary:**
- None detected

## Runtime

**Environment:**
- Node.js v22.14.0 (`.nvmrc`)
- Browser (ES2020 target)

**Package Manager:**
- npm (npm v10+ implied)
- Lockfile: Not detected (may use package-lock.json or npm-shrinkwrap.json)

## Frameworks

**Core:**
- React 19.2.4 - UI framework
- React Router DOM 7.14.0 - Client-side routing

**UI:**
- MUI (Material-UI) 7.3.9 - Component library
- @mui/x-charts 8.28.2 - Charting
- @mui/x-data-grid 8.28.2 - Data tables
- @mui/x-date-pickers 8.27.2 - Date selection

**State Management:**
- Zustand 5.0.12 - Global state with persist middleware
- Uses localStorage via `app-storage` key

**Forms:**
- React Hook Form 7.72.1 - Form handling

## Testing

**Framework:**
- Vitest 4.1.2 - Unit testing
- @vitest/coverage-v8 4.1.2 - Coverage reporting

**Test Utilities:**
- @testing-library/react 16.3.2 - Component testing
- @testing-library/jest-dom 6.9.1 - Jest matchers
- @testing-library/user-event 14.6.1 - User simulation
- jsdom 29.0.1 - DOM environment

**Custom Test Runner:**
- `src/dev-tools/testRunner.ts` - Golf calculation tests
- `src/dev-tools/testDataGenerator.ts` - Test data generation
- `src/dev-tools/edgeCaseTests.ts` - Edge case tests
- `src/dev-tools/stepByStepTester.ts` - Debug calculations

## Build/Dev

**Build Tool:**
- Vite 8.0.3 - Development server and production builds
- @vitejs/plugin-react-swc 4.3.0 - React Fast Refresh

**Plugins:**
- vite-tsconfig-paths 6.1.1 - Path alias resolution
- vite-plugin-svgr 5.2.0 - SVG as React components

**Development:**
- TypeScript 6.0.2 - Type checking
- ESLint (via package.json config) - Linting

## Key Dependencies

**Critical:**
- firebase 12.11.0 - Authentication and Firestore database
- react 19.2.4 - Core UI framework
- @mui/material 7.3.9 - UI component library

**Data/Utilities:**
- axios 1.14.0 - HTTP client
- dayjs 1.11.20 - Date handling
- lodash 4.18.1 - Utility functions
- deepmerge 4.3.1 - Object merging

**Other:**
- web-vitals 5.2.0 - Performance monitoring

## Configuration

**Environment:**
- Environment variables via `import.meta.env` (Vite standard)
- Firebase config uses `VITE_APP_*` prefixed env vars
- Config source: `src/utils/firebase/firebase.utils.tsx`

**Build:**
- `vite.config.ts` - Vite configuration with path aliases
- `tsconfig.json` - TypeScript configuration with path mappings
- `.prettierrc` - Code formatting (single quotes, trailing commas, tabs)

**Path Aliases:**
- `@/*` maps to `src/*`
- `@/calc/*`, `@/components/*`, `@/hooks/*`, `@/pages/*`, `@/store/*`, etc.

## Platform Requirements

**Development:**
- Node v22.14.0
- npm for package management
- Browser with ES2020 support

**Production:**
- Static build output in `dist/` directory
- SPA deployment (React Router handles all routes)
- Firebase as backend (Firestore + Auth)

---

*Stack analysis: 2026-05-17*