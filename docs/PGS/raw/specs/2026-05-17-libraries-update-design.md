# Libraries Update - Phase Plan

**Date:** 2026-05-17
**Risk Tolerance:** Balanced (wait for minor patches, test thoroughly)
**Timeline:** Phased approach

## Goal
Stay current with latest library versions while maintaining stability through systematic phased updates.

## Phases

### Phase 1: React Core
**Priority:** High (foundation layer)
- Update React to latest stable
- Ensure react-dom matches
- Fix JSX/runtime type errors
- Verify fundamental rendering works

### Phase 2: MUI Ecosystem
**Priority:** High (UI components)
- Update @mui/material
- Update @mui/icons-material
- Update @mui/x-charts, @mui/x-data-grid, @mui/x-date-pickers
- Fix theme/component prop breaking changes

### Phase 3: Firebase & Integrations
**Priority:** Medium (backend)
- Update firebase (Firestore, Auth)
- Update react-router-dom
- Update zustand

### Phase 4: Utilities & Dev Tools
**Priority:** Medium
- Update axios, dayjs, lodash
- Update vite, typescript, vitest
- Update @testing-library packages

## Risk Mitigation
- Each phase: update → test → fix → commit before next
- Run `npm run type-check` and `npm test` between updates
- Review MUI migration guides for breaking changes

## Dependencies Already Flagged in CONCERNS.md
- #98 - React 19 Compatibility
- #99 - MUI v7 Migration