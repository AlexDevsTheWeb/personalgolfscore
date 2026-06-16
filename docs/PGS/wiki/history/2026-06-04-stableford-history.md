---
title: Stableford History — Implementation History
tags: [history, stableford]
created: 2026-06-13
updated: 2026-06-13
sources: [plans/2026-06-04-stableford-history.md]
---

# Stableford History — June 4, 2026

## Plan

4 tasks: pure utils (TDD) → component + page + wiring → drawer/column cleanups → verification + PR.

## Key Files

| File | Change |
|---|---|
| `src/utils/stableford/stableford.utils.tsx` | **New** — 5 pure helpers with 14 vitest cases |
| `src/components/StablefordHistory/StablefordHistory.component.tsx` | **New** — page content (table + chart) |
| `src/pages/StablefordHistory.page.tsx` | **New** — route wrapper |
| `src/App.tsx` | New route |
| `src/utils/links/links.utils.tsx` | New sidebar entry + Dashboard show fix |
| `src/components/layout/MainLayout2.component.tsx` | New breadcrumb branch |
| `src/components/Rounds/RoundsTable.component.tsx` | `Points` → `Stableford Pts` rename |

## Verification

- 14/14 vitest cases pass
- Type-check clean
- Build succeeds

## Related Pages

- [Stableford History Feature](../features/stableford-history.md)
- [Stableford Concept](../concepts/stableford.md)
