---
title: Libraries Update (May 2026)
tags: [feature, libraries, maintenance]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-05-17-libraries-update-design.md, plans/2026-05-17-libraries-update-plan.md]
---

# Libraries Update (May 2026)

## Overview

Phased update of all major libraries to latest stable versions while maintaining stability.

## Phases

1. **React Core** — React 19, fix JSX/runtime type errors
2. **MUI Ecosystem** — MUI 7, MUI X packages (charts, data-grid, date-pickers)
3. **Firebase & Integrations** — Firebase 12, react-router-dom, zustand
4. **Utilities & Dev Tools** — axios, dayjs, lodash, vite 8, typescript 6, vitest

## Key Outcomes

- All 66 type errors resolved (22 blocking + 35 JSX + 9 remaining)
- Build succeeds with zero type errors
- Tests: 18 pass, 2 pre-existing failures remain
- Type error fixes included: tsconfig updates, web-vitals v5 API migration, type declaration shims for React 19 JSX

## Related Pages

- [History: Libraries Update](../history/2026-05-17-libraries-update.md)
- [Codebase Concerns](../patterns/codebase-concerns.md)
