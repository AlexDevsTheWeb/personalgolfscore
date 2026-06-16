---
title: History Tabs Consolidation
tags: [feature, ui, routing, refactor]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-04-history-tabs-design.md]
---

# History Tabs Consolidation

## Overview

Consolidated `/handicap-history` and `/stableford-history` into a single tabbed page at `/history` with `?tab=stableford` query param.

## Implementation

- **New `History` component** — thin shell with MUI Tabs, reads `tab` from `useSearchParams`
- **Two existing components kept intact** — only page headers removed from each
- **Old routes deleted** — no redirects, both fall through to catch-all Error page
- **Drawer** — Single "History" entry pointing to `/history`
- **Breadcrumb** — `Home / History` (tab not in breadcrumb)

## Key Design Decisions

- Default tab is always Handicap
- No per-user tab preference persistence
- No old-route redirects (both 404 intentionally)
- Component headers stripped so the parent `History` shell owns all page-level UI

## Related Pages

- [ADR-003: Consolidate History Routes](../decisions/history-tabs.md)
- [Handicap History](handicap-history.md)
- [Stableford History](stableford-history.md)
- [History: Implementation](../history/2026-06-04-history-tabs-refactor.md)
