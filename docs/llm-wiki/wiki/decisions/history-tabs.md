---
title: ADR-003 — Consolidate History Routes into Tabbed Page
tags: [decision, adr, routing, ui]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-04-history-tabs-design.md]
---

# ADR-003: Consolidate History Routes into Tabbed Page

## Context

After adding both Handicap History and Stableford History pages, the user had two separate routes (`/handicap-history`, `/stableford-history`) showing related views of the same rounds data.

## Options

1. **Keep separate routes** — Two nav entries, two breadcrumbs, user navigates between them
2. **Tabbed page at `/history`** — Single route with `?tab=stableford` query param

## Decision

Option 2: Single `/history` route with MUI Tabs. Default tab is Handicap. Query param `?tab=stableford` selects Stableford. Invalid values fall back to Handicap.

## Rationale

- Reduces drawer clutter (one "History" entry instead of two)
- Faster switching between views (no full page navigation)
- Cleaner breadcrumb (`Home / History` regardless of tab)
- Simpler to implement — thin wrapper component, no data changes

## Consequences

- Old routes `/handicap-history` and `/stableford-history` deleted (no redirects)
- Two existing components (`HandicapHistory`, `StablefordHistory`) kept intact, only headers removed
- No per-user tab preference persistence (explicitly rejected — default is always Handicap)
- No old-route redirects (both 404 — explicitly rejected)

## Related Pages

- [History Tabs Feature](../features/history-tabs.md)
