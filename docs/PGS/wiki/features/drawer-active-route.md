---
title: Drawer Active-Route Highlighting
tags: [feature, ui, navigation]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-05-drawer-active-route-design.md]
---

# Drawer Active-Route Highlighting

## Overview

Added visual indication of the active route in the left navigation drawer, in both collapsed (57px) and expanded (240px) states.

## Implementation

- **Local `NavLink` subcomponent** — encapsulates `ListItem` + `ListItemButton` + `ListItemIcon` + `ListItemText` with active styling
- **`computeIsActive` helper** — prefix-based path matching with special case for `/` and `/dashboard`
- **3 call sites** replaced — main link loop + 2 admin items (Courses, Users)

## Visual Treatment

| Element | Active State |
|---|---|
| `ListItemButton` background | `theme.palette.action.selected` |
| `ListItemIcon` color | `theme.palette.primary.main` |
| `ListItemText` color | `theme.palette.primary.main` |
| `ListItemText` weight | `fontWeight: 600` |

No new theme tokens, no new colors, no animation.

## Related Pages

- [History: Implementation](../history/2026-06-05-drawer-active-route.md)
