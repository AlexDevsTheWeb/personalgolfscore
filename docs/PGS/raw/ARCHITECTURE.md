<!-- refreshed: 2026-05-17 -->
# Architecture

**Analysis Date:** 2026-05-17

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    React 19 Application                      │
│                    src/App.tsx                              │
│                    (Router + Theme + Localization)           │
├─────────────────────────────────────────────────────────────┤
│  Pages Layer (src/pages/)                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │Dashboard │ │AllRounds │ │Statistics│ │ Settings │         │
│  │.page.tsx │ │.page.tsx │ │.page.tsx │ │.page.tsx │         │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘         │
├───────┴───────────┴───────────┴───────────┴─────────────────┤
│  Components Layer (src/components/)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │Dashboard/    │ │Totals/       │ │NewRound/     │          │
│  │Charts/       │ │HolebyHole/   │ │AddNewRound/  │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  State & Data Layer (src/store/zustand + src/utils/)        │
│  ┌────────────────────────┐  ┌────────────────────────┐      │
│  │ useAppStore            │  │ Firestore Services    │      │
│  │ (Zustand + Persist)    │  │ round.firestore.ts    │      │
│  │                        │  │ player.firestore.ts   │      │
│  └────────────────────────┘  └────────────────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ┌────────────────────────┐  ┌────────────────────────┐      │
│  │ Firebase Auth          │  │ Firebase Firestore    │      │
│  │ (Authentication)       │  │ (Database)            │      │
│  └────────────────────────┘  └────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App.tsx | Root component, routing, theme setup | `src/App.tsx` |
| useAppStore | Global state management (Zustand) | `src/store/zustand/app.store.ts` |
| TotalsCalculator | Golf score/totals calculations | `src/utils/calculator/TotalsCalculator.utils.tsx` |
| round.firestore | Round CRUD operations | `src/utils/firestore/round.firestore.ts` |
| player.firestore | Player profile/bag CRUD | `src/utils/firestore/player.firestore.ts` |
| shots.utils | Shot-level calculations (GIR, putts) | `src/utils/shots/shots.utils.tsx` |

## Pattern Overview

**Overall:** React 19 SPA with client-side state management

**Key Characteristics:**
- React Router v7 for client-side routing
- Zustand with persist middleware for client state
- Firebase Auth + Firestore for backend
- MUI v7 for UI components
- Custom golf calculation engine in `src/utils/calculator/`

## Layers

**Pages Layer:**
- Purpose: Route handlers and page-level orchestration
- Location: `src/pages/`
- Contains: Page components (Dashboard, AllRounds, Statistics, Settings, etc.)
- Depends on: Components, hooks, store
- Used by: React Router in App.tsx

**Components Layer:**
- Purpose: Reusable UI components and feature modules
- Location: `src/components/`
- Contains: Dashboard/, Totals/, NewRound/, Rounds/, Dialog/, etc.
- Depends on: Hooks, store, types, utils
- Used by: Pages

**Hooks Layer:**
- Purpose: Encapsulated logic for forms, dialogs, calculations
- Location: `src/hooks/`
- Contains: useHoleFormManager, useDialog, various dialog hooks
- Depends on: Store, utils, types
- Used by: Components, Pages

**State Layer (Zustand):**
- Purpose: Global client state with persistence
- Location: `src/store/zustand/app.store.ts`
- Contains: Player data, rounds list, new round form data, theme preference
- Persists to: localStorage via zustand persist middleware
- Used by: All layers

**Utils Layer:**
- Purpose: Pure functions, calculations, external integrations
- Location: `src/utils/`
- Contains: calculator/, firestore/, shots/, totals/, firebase/
- Used by: Store, hooks, components

**Types Layer:**
- Purpose: TypeScript type definitions
- Location: `src/types/`
- Contains: round.types.tsx, player.types.tsx, roundData.types.tsx, etc.

## Data Flow

### Primary Request Path: View Round Details

1. **Entry** - User clicks on round in Rounds page
2. **Route** - React Router navigates to `/round/:roundID` (`src/pages/RoundsData.page.tsx:43`)
3. **Fetch** - Component calls `useAppStore.getRoundDetails(playerId, roundId)` (`src/store/zustand/app.store.ts:456`)
4. **API** - Store method calls `getRoundDetails()` from `src/utils/firestore/round.firestore.ts:18`
5. **Firestore** - Firestore fetches round document + subcollection holes (`src/utils/firestore/round.firestore.ts:28-42`)
6. **State** - Store updates `roundDetailsData` state
7. **Render** - RoundsData page renders hole-by-hole breakdown

### Secondary Flow: Save New Round

1. **Entry** - User completes hole entry form and clicks save
2. **Form** - AddNewRoundForm component triggers `useAppStore.saveNewRound()` (`src/store/zustand/app.store.ts:735`)
3. **Prepare** - Store gathers `newRoundMain`, `newRoundHoles`, `newRoundTotals`, `newRoundDistances`
4. **Calculate** - `totalsCalculator()` aggregates hole-level stats into round totals (`src/utils/calculator/TotalsCalculator.utils.tsx:8`)
5. **Firestore** - `saveNewRound()` in `src/utils/firestore/round.firestore.ts:63` writes batch
6. **Update** - Updates round + holes subcollection + player averages
7. **Reset** - Store resets new round state for next entry

### New Round Creation Flow

1. **Entry** - Navigate to `/addNewRound` → `AddNewRoundPage` (`src/pages/AddNewRound.page.tsx`)
2. **Setup** - User enters round meta (date, course, holes, tee, par, HCP)
3. **Hole Entry** - `AddSingleHole.component.tsx` collects per-hole data
4. **Calculation** - Each hole triggers `setNewHole()` which calculates:
   - Stableford points (`calculateStablefordPoints`)
   - GIR value (`calculateGirValue`)
   - Up/Down (`calculateUDValue`)
   - Scramble (`calculateScrambleValue`)
5. **Totals** - `totalsCalculator()` aggregates all holes into round totals
6. **Save** - Batch write to Firestore (round doc + holes subcollection + averages)

**State Management:**
- Zustand store (`useAppStore`) holds all application state
- Persisted to localStorage (key: `app-storage`)
- Partial persistence for specific slices (theme, player, rounds, golf bag)
- No server-side state sync beyond Firestore reads/writes

## Key Abstractions

**Shots Interface (IShots):**
- Purpose: Represents a single hole's shot data
- Location: `src/types/roundData.types.tsx`
- Properties: holeNumber, par, strokes, putts, gir, fairway, teeClub, intermediateShots, etc.

**Totals Calculator:**
- Purpose: Aggregates hole-level shots into round-level statistics
- Location: `src/utils/calculator/TotalsCalculator.utils.tsx`
- Pattern: Functional, receives array of IShots, returns IRoundTotals
- Called from: Store's setNewHole, setTotalsByHole methods

**Firestore Collections:**
- Structure: `players/{playerId}/rounds/{roundId}/holes/{holeNumber}`
- Round document: Contains round metadata + totals + distances
- Holes subcollection: Individual hole shot data

## Entry Points

**Application Entry:**
- Location: `src/index.tsx`
- Triggers: `ReactDOM.createRoot(document.getElementById('root'))`
- Responsibilities: BrowserRouter setup, App mount

**Main App Component:**
- Location: `src/App.tsx`
- Triggers: BrowserRouter wraps App
- Responsibilities: Routes setup, Theme wrapper, Localization provider

**Protected Routes:**
- Location: `src/pages/ProtectedRoute.page.tsx`
- Triggers: Any route inside the `/` path (requires auth)
- Responsibilities: Firebase auth check, redirect to login if unauthenticated

**Authentication:**
- Location: `src/pages/Login.page.tsx`, `src/components/LoginForm/`
- Triggers: `/login` route or unauthenticated access attempt

## Architectural Constraints

- **Threading:** Single-threaded JavaScript (React event loop)
- **Global state:** Single Zustand store instance (`useAppStore`)
- **Persistence:** localStorage only - no session storage or cookies
- **Routing:** Client-side only (react-router-dom v7)
- **No SSR:** Vite builds for browser only

## Anti-Patterns

### Direct Store Manipulation

**What happens:** Some components access `useAppStore.getState()` directly rather than using the hook
**Why it's wrong:** Bypasses React's reactivity, may cause stale renders, harder to debug
**Do this instead:** Use `const state = useAppStore()` for reactive updates

### Large Component Files

**What happens:** Some components like `HolebyHoleTotals.component.tsx` contain many sub-components in one file
**Why it's wrong:** Hard to navigate, co-locates unrelated concerns
**Do this instead:** Split into separate files in component-specific directories

### Type Coercion in Store

**What happens:** Store uses `as any` for some state assignments (e.g., `newHoleTmp as any`)
**Why it's wrong:** Bypasses TypeScript safety, runtime errors possible
**Do this instead:** Properly type intermediate states and helpers

### Console Error Handling

**What happens:** Firestore operations use `console.error` without user-facing error UI
**Why it's wrong:** Users see no feedback on failures, errors logged to console only
**Do this instead:** Add toast/snackbar notifications for errors

## Error Handling

**Strategy:** Try-catch in async store methods, error state in store

**Patterns:**
- Async store methods catch errors and update error state (`src/store/zustand/app.store.ts:362-377`)
- Error messages stored in `playerError`, `playerErrorMessage`, `roundDetailsError`
- Components check error state and render fallback UI

## Cross-Cutting Concerns

**Logging:** Console-based (no structured logging framework)
**Validation:** `src/utils/inputs/ValidateInputs.utils.tsx` for form validation
**Authentication:** Firebase Auth - check auth state in ProtectedRoute
**Theme:** MUI theming via `src/styles/ThemeSetup.styles.tsx`, persisted in store
**i18n:** MUI X Date Pickers with Italian locale (`dayjs/locale/it`)

---

*Architecture analysis: 2026-05-17*