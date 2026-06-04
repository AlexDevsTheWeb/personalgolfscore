# Zustand Store Splitting Plan

## Overview

The current `app.store.ts` is 793 lines with 20+ different state slices. This document outlines how to split it into smaller, maintainable stores.

## Current State

### Slices in `app.store.ts`:
1. **UI Controls** - `showDistances`, `isLoading`
2. **Player** - `player`, `isLoading`, `error`
3. **Golf Bag/Clubs** - `clubs`, `teeClubs`, `distanceClubs`, etc.
4. **Rounds** - `rounds`, `playerID`
5. **Round Details** - `roundDetails`
6. **New Round** - `newRoundMain`, `newRoundHoles`, `newRoundTotals`, `newRoundDistances`, `newRoundClubs`
7. **Round Saver** - `newRoundSaver`
8. **Theme** - `themeMode`

---

## Proposed Store Structure

```
src/store/zustand/
├── index.ts                    # Re-exports all stores
├── player.store.ts             # Player & authentication state
├── clubs.store.ts              # Golf bag & clubs state
├── rounds.store.ts             # Rounds list state
├── roundDetails.store.ts       # Single round details state
├── newRound.store.ts           # New round creation state
├── ui.store.ts                 # UI controls state
└── app.store.ts                # Keep for now, migrate gradually
```

---

## Implementation Steps

### Step 1: Create `player.store.ts`

```typescript
// src/store/zustand/player.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IPlayerStateData } from '@/types/player.types';

interface PlayerState {
  isLoading: boolean;
  error: string;
  errorMessage: string;
  player: IPlayerStateData | null;
  setPlayer: (player: IPlayerStateData) => void;
  clearPlayer: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string, message: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      isLoading: false,
      error: '',
      errorMessage: '',
      player: null,
      setPlayer: (player) => set({ player, isLoading: false, error: '' }),
      clearPlayer: () => set({ player: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error, errorMessage) => set({ error, errorMessage }),
    }),
    { name: 'player-storage' }
  )
);
```

### Step 2: Create `newRound.store.ts`

```typescript
// src/store/zustand/newRound.store.ts
import { create } from 'zustand';
import { InitialStateNewRound, IShots } from '@/types/roundData.types';
import { IRoundTotals } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';

interface NewRoundState {
  // Main round data
  isLoading: boolean;
  isSaved: boolean;
  setFirstHole: boolean;
  round: InitialStateNewRound['round'];
  
  // Holes
  holes: IShots[];
  holesCompleted: number;
  
  // Totals
  roundTotals: IRoundTotals;
  
  // Distances
  roundDistances: { club: string; mt: number[]; avg: number }[];
  
  // Actions
  setRoundField: (field: string, value: any) => void;
  addHole: (hole: IShots) => void;
  // ... etc
}

export const useNewRoundStore = create<NewRoundState>()(
  persist(
    (set) => ({
      isLoading: false,
      isSaved: false,
      setFirstHole: false,
      round: { roundDate: '', roundCourse: '', roundHoles: 18, ... },
      holes: [],
      holesCompleted: 0,
      roundTotals: initialStateRoundTotals,
      roundDistances: [],
      
      setRoundField: (field, value) => set((state) => ({
        round: { ...state.round, [field]: value }
      })),
      
      addHole: (hole) => set((state) => ({
        holes: [...state.holes, hole],
        holesCompleted: state.holesCompleted + 1
      })),
    }),
    { name: 'new-round-storage' }
  )
);
```

### Step 3: Create remaining stores

- `rounds.store.ts` - For rounds list
- `clubs.store.ts` - For golf bag
- `ui.store.ts` - For theme, loading states

### Step 4: Update imports (gradual migration)

**Phase A - Create stores first, keep using old store:**
- Create all new stores with initial state
- Old `app.store.ts` still imports from new stores (reads from them)

**Phase B - Migrate components one by one:**
- Update components to import from new stores
- Remove old store usage

**Phase C - Cleanup:**
- Delete unused slices from `app.store.ts`
- Or keep `app.store.ts` as a "combined" store that reads from smaller stores

---

## Migration Example

### Before (using giant store):
```typescript
// Old way
import { useAppStore } from '@/store/zustand';

const player = useAppStore((state) => state.player);
const holes = useAppStore((state) => state.newRoundHoles.holes);
```

### After (using split stores):
```typescript
// New way
import { usePlayerStore } from '@/store/zustand/player.store';
import { useNewRoundStore } from '@/store/zustand/newRound.store';

const player = usePlayerStore((state) => state.player);
const holes = useNewRoundStore((state) => state.holes);
```

---

## Testing Strategy

1. **Unit test each store** - Test actions/reducers in isolation
2. **Integration test flows** - Test complete user flows (e.g., creating a new round)
3. **Manual testing** - Ensure all features work after migration

---

## Files to Update After Splitting

These files will need import updates:

- All components importing from `useAppStore`
- Hooks using store selectors
- Firestore utilities
- Any file using `useAppStore.getState()`

---

## Estimated Time

- Creating stores: ~30 min
- Migration per component: ~5 min
- Total components to update: ~20-30
- **Estimated total: 2-3 hours**

---

## Rollback Plan

If issues arise:
1. Keep old `app.store.ts` as fallback
2. Use feature flags to switch between old/new stores
3. Git branch for incremental testing