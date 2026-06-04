# Type Errors Fix Progress

**Date:** 2026-05-17
**Worktree:** `.worktrees/libraries-update` (branch: `libraries-update`)

---

## Summary

| Phase | Before | After | Fixed |
|-------|--------|-------|-------|
| Phase 1: Blocking Errors | 22 | 0 | 22 |
| Remaining (JSX/Test) | 44 | 41 | 3 |
| **Total** | **66** | **41** | **25 (38%)** |

---

## Fixes Applied

### 1. tsconfig.json
- Added `"node"` to types array
- Fixed: TS2591 (process not found)

### 2. src/reportWebVitals.ts
- Updated from web-vitals v4 API to v5
- Changed: `getCLS, getFID, getFCP, getLCP, getTTFB` → `onCLS, onINP, onFCP, onLCP, onTTFB`
- Fixed: TS2305 (module has no exported member), TS2339

### 3. src/hooks/usePuttsInputDialog.hook.tsx
- Fixed useRef generic type: `useRef<number>()` → `useRef<number | undefined>(undefined)`
- Fixed: TS2554 (expected 1 argument, got 0)

### 4. src/dev-tools/testRunner.ts
- Removed non-existent import: `./firestoreInspector`
- Fixed: TS2307 (cannot find module)

### 5. src/types/clubs.types.tsx
- Fixed `IClubSetupFormProps`: `initialGolfBag` → `golfBag`
- Fixed `IPlayerSetupProps`: `handleHcpChange: () => void` → `(event: React.ChangeEvent<HTMLInputElement>) => void`
- Fixed: TS2322 (type not assignable) in Wizard components

### 6. src/types/props.types.tsx
- Added `key?: number` to `IShotsTableBody`
- Fixed: TS2322 in HolebyHoleTable

### 7. src/components/Rounds/Rounds.component.tsx
- Added `key?: number` to RoundsCompactCard props
- Fixed: TS2322

### 8. src/components/Totals/HolebyHole/components/StackBlock.component.tsx
- Added `key?: string | number` to IStatBlockProps
- Fixed: 5 TS2322 errors in BreakpointView components

### 9. src/dev-tools/stepByStepTester.ts
- Changed type assertion: `as Partial<IShots>` → `as IShots`
- Fixed: TS2322

### 10. src/components/layout/User.component.tsx
- Fixed null handling: `player.displayName ?? ''`, `player.photoURL ?? undefined`
- Fixed Avatar alt and src props
- Fixed StackPlayerMenu props: `name` and `value` defaults
- Fixed: TS2769, TS2345

### 11. src/dev-tools/edgeCaseTests.ts
- Fixed `fairway` type: `'HIT'` → `2` (numeric code)
- Fixed: TS2322, TS2741

---

## Remaining Issues (41 errors)

### All TS7026 - JSX implicitly 'any' (React 19 + TypeScript 6 compatibility)

| File | Count | Issue |
|------|-------|-------|
| CustomIcons.assets.tsx | 26 | Custom SvgIcon components |
| calculations.test.ts | 6 | Test file type issues |
| Other files (Dialog, Layout, etc.) | 9 | JSX type compatibility |

**Root Cause:** TypeScript 6 + React 19 types have compatibility issues with JSX.IntrinsicElements. The `@types/react` package structure changed in React 19.

---

## ✅ COMPLETED

### Phase 2: JSX Errors (Option A - Proper Type Declarations)

**Created:** `src/types/react-jsx.d.ts`
```typescript
/// <reference types="react" />
/// <reference types="react-dom" />

declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
```

**Fixed:** 35 JSX 'any' errors in CustomIcons.assets.tsx, Dialogs, Layouts

**Test Fix:** Added `intermediateShots` to GIR test calls in calculations.test.ts

### Final Results

| Metric | Value |
|--------|-------|
| Total Type Errors | **0** |
| Build | ✓ Success |
| Tests | 18 pass, 2 fail (pre-existing) |

**All type errors resolved!**

---

## GitHub Issues to Update

Pre-existing issues that may be related:
- #109, #110, #111 - Phase 1 tasks (already closed)
- #86 - Generic any Types (partially resolved)
- Original CONCERNS.md items: Tech debt, type safety