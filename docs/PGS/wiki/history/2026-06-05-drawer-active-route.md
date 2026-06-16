---
title: Drawer Active-Route Highlighting — Implementation History
tags: [history, ui, navigation]
created: 2026-06-13
updated: 2026-06-13
sources: [plans/2026-06-05-drawer-active-route.md]
---

# Drawer Active-Route Highlighting — June 5, 2026

## Plan

2 tasks: add NavLink subcomponent + refactor 3 call sites → manual verification across all routes.

## Key Changes

- `src/components/layout/MainLayout2.component.tsx` — added local `NavLink` subcomponent + `computeIsActive` helper
- 3 inline `ListItem`+`ListItemButton` blocks replaced with `<NavLink>` calls (main loop + 2 admin items)
- Admin "Courses" and "Users" links use inline `TLinkSidebar` objects (not in the `links` array)

## Active Route Matching

- `/` or `/dashboard` → Dashboard highlighted (special case for dual route)
- Exact match or prefix match for all other routes
- `/round/:roundID`, `/addNewRound`, `/settings` → no drawer item highlighted (correct — not in drawer)

## Related Pages

- [Drawer Active-Route Feature](../features/drawer-active-route.md)
