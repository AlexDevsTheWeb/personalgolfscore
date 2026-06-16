# Libraries Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Systematically update all libraries to latest stable versions in phased approach while maintaining stability.

**Architecture:** Phased approach - tackle one library category at a time (React → MUI → Firebase/Integrations → Utilities/DevTools). Each phase: update → test → fix → commit.

**Tech Stack:** React 19, MUI v7, Firebase v12, Vite 8, TypeScript 6

---

## Phase 1: React Core

### Task 1: Verify Current React Versions

**Files:**
- Modify: `package.json:27-28`

- [ ] **Step 1: Check current React version**

```bash
npm ls react react-dom
```

- [ ] **Step 2: Check for latest stable versions**

```bash
npm view react version
npm view react-dom version
```

- [ ] **Step 3: Commit current state**

```bash
git add package.json
git commit -m "chore: document current React versions"
```

---

### Task 2: Update React Dependencies

**Files:**
- Modify: `package.json:27-28`

- [ ] **Step 1: Update React to latest stable**

```bash
npm install react@latest react-dom@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check 2>&1 | head -50
```

- [ ] **Step 3: Run dev server test**

```bash
npm run start &
sleep 5
curl -s http://localhost:5173 | head -20
```

- [ ] **Step 4: Commit changes**

```bash
git add package.json package-lock.json
git commit -m "feat: update React to latest stable version"
```

---

### Task 3: Fix React Type Errors

**Files:**
- Modify: `src/types/react-jsx-runtime.d.ts` (may need updates)
- Modify: `tsconfig.json`

- [ ] **Step 1: Identify type errors**

```bash
npm run type-check 2>&1 | grep -i react
```

- [ ] **Step 2: Fix any new type errors**

Common fixes:
- Add missing types to tsconfig
- Update type declaration shims for React 19

- [ ] **Step 3: Run type check again**

```bash
npm run type-check
```

- [ ] **Step 4: Commit fixes**

```bash
git add src/ tsconfig.json
git commit -m "fix: resolve React 19 type errors"
```

---

## Phase 2: MUI Ecosystem

### Task 4: Update MUI Core

**Files:**
- Modify: `package.json:9-13`

- [ ] **Step 1: Check current MUI versions**

```bash
npm ls @mui/material @mui/icons-material
```

- [ ] **Step 2: Check latest stable versions**

```bash
npm view @mui/material version
npm view @mui/icons-material version
```

- [ ] **Step 3: Update MUI packages**

```bash
npm install @mui/material@latest @mui/icons-material@latest
```

- [ ] **Step 4: Run type check**

```bash
npm run type-check 2>&1 | head -30
```

- [ ] **Step 5: Check for breaking changes**

Look at console for:
- Deprecated prop warnings
- Theme API changes
- Component API changes

- [ ] **Step 6: Commit changes**

```bash
git add package.json package-lock.json
git commit -m "feat: update MUI core packages"
```

---

### Task 5: Update MUI X Packages

**Files:**
- Modify: `package.json:11-13`

- [ ] **Step 1: Update MUI X packages**

```bash
npm install @mui/x-charts@latest @mui/x-data-grid@latest @mui/x-date-pickers@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check 2>&1 | head -30
```

- [ ] **Step 3: Test charts and data grids**

```bash
npm run start &
# Navigate to Dashboard to see charts
# Navigate to any page with DataGrid
```

- [ ] **Step 4: Commit changes**

```bash
git add package.json package-lock.json
git commit -m "feat: update MUI X packages"
```

---

### Task 6: Fix MUI Breaking Changes

**Files:**
- Modify: `src/styles/theme/` files
- Modify: Any components using deprecated MUI patterns

- [ ] **Step 1: Identify breaking changes from type errors**

```bash
npm run type-check 2>&1 | grep -i mui
```

- [ ] **Step 2: Check for deprecated theme patterns**

Common issues:
- Theme structure changes
- Component prop renames
- Styling API changes

- [ ] **Step 3: Fix theme files**

Update theme configuration if needed based on MUI v7 migration guide.

- [ ] **Step 4: Run type check and verify**

```bash
npm run type-check
```

- [ ] **Step 5: Commit fixes**

```bash
git add src/
git commit -m "fix: resolve MUI v7 breaking changes"
```

---

## Phase 3: Firebase & Integrations

### Task 7: Update Firebase

**Files:**
- Modify: `package.json:25`

- [ ] **Step 1: Check current Firebase version**

```bash
npm ls firebase
```

- [ ] **Step 2: Update Firebase**

```bash
npm install firebase@latest
```

- [ ] **Step 3: Run type check**

```bash
npm run type-check 2>&1 | head -20
```

- [ ] **Step 4: Test auth and Firestore**

```bash
npm run start &
# Test login flow
# Test adding a round
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update Firebase to latest"
```

---

### Task 8: Update React Router

**Files:**
- Modify: `package.json:30`

- [ ] **Step 1: Update react-router-dom**

```bash
npm install react-router-dom@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check 2>&1 | head -20
```

- [ ] **Step 3: Test navigation**

```bash
npm run start &
# Test all navigation flows
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update react-router-dom"
```

---

### Task 9: Update Zustand

**Files:**
- Modify: `package.json:36`

- [ ] **Step 1: Update zustand**

```bash
npm install zustand@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check 2>&1 | head -20
```

- [ ] **Step 3: Test state management**

Test:
- Adding rounds
- Dashboard updates
- Club management

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update zustand"
```

---

## Phase 4: Utilities & Dev Tools

### Task 10: Update Utilities

**Files:**
- Modify: `package.json:22-26`

- [ ] **Step 1: Update utilities**

```bash
npm install axios@latest dayjs@latest lodash@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update utility libraries"
```

---

### Task 11: Update Dev/Build Tools

**Files:**
- Modify: `package.json:21,31-32`
- Modify: `package.json:74-78`

- [ ] **Step 1: Update build tools**

```bash
npm install vite@latest typescript@latest
npm install --save-dev vitest@latest @vitest/coverage-v8@latest
```

- [ ] **Step 2: Run type check**

```bash
npm run type-check
```

- [ ] **Step 3: Run tests**

```bash
npm test
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update build and test tools"
```

---

### Task 12: Final Verification

**Files:**
- All

- [ ] **Step 1: Full type check**

```bash
npm run type-check
```

- [ ] **Step 2: Full test suite**

```bash
npm test
```

- [ ] **Step 3: Production build**

```bash
npm run build
```

- [ ] **Step 4: Commit all remaining changes**

```bash
git add -A
git commit -m "chore: complete libraries update - all phases"
```