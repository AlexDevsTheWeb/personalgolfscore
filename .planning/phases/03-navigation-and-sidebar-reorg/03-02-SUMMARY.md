---
phase: 03-navigation-and-sidebar-reorg
plan: 02
subsystem: ui
tags: [drawer, sidebar, responsive, navigation, mui, useMediaQuery, routerlink]

requires:
  - phase: 03-01
    provides: SidebarHCP component, simplified User avatar
provides:
  - Responsive sidebar drawer (temporary on mobile, persistent on desktop)
  - Restructured drawer content with filtered links, compact HCP, Settings, admin section, ThemeSwitcher, Logout
  - SPA navigation via RouterLink (no full-page reloads)
affects: []

tech-stack:
  added: []
  patterns:
    - useMediaQuery + useTheme for responsive drawer variant switching
    - component={RouterLink} to={path} for SPA nav links in drawer
    - Conditional side-effect onClick for drawer close (mobile only)
    - CSS transition on main content margin for drawer push effect

key-files:
  created: []
  modified:
    - src/components/layout/MainLayout2.component.tsx

key-decisions:
  - "Renamed `mobileOpen` state to `drawerOpen` — the drawer now opens/closes on all screen sizes, not just mobile"
  - "Drawer variant switches via `useMediaQuery(theme.breakpoints.up('md'))` — single drawer component handles both modes"
  - "On desktop nav link click does NOT close drawer — consistent with Research Pitfall 2 guidance"

patterns-established:
  - "Responsive drawer: conditional variant + conditional wrapper onClick + conditional main content margin"
  - "Nav link filtering: `links.filter(l => l.show === true)` as single source of truth"

requirements-completed: [NAV-02, NAV-03, NAV-04, NAV-05]

duration: 2 min
completed: 2026-06-01
---

# Phase 3 Plan 2: Sidebar Drawer Restructure & Responsive Variant Switching

**Restructured the sidebar drawer as the primary navigation hub on all screen sizes — filtered nav links (show===true), compact HCP badge, Settings/admin/ThemeSwitcher/Logout in correct ordering, and responsive variant switching (temporary on mobile, persistent/toggleable on desktop).**

## Performance

- **Duration:** 2 min
- **Started:** 2026-06-01T07:32:07Z
- **Completed:** 2026-06-01T07:34:07Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced `links.map()` with `links.filter(l => l.show === true).map()` — Dashboard, Courses, Users excluded from main nav loop
- Removed hardcoded duplicate Profile/Clubs/Statistics ListItem blocks (single source of truth)
- Removed old admin block inside `links.map()` — replaced with NEW admin section after Settings (single render, isAdmin-gated)
- Changed ALL nav `href` attributes to `component={RouterLink} to={path}` for SPA navigation
- Added `SidebarHCP` compact badge display in drawer
- Added Settings ListItemButton navigating to `/settings`
- Added Logout ListItemButton with Logout icon, calling `handleLogout`
- Moved ThemeSwitcher to correct position between admin section and Logout
- Removed obsolete `AccountCircleIcon` and `Avatar` imports
- Added `useMediaQuery` + `useTheme` for responsive breakpoint detection
- Changed Drawer variant to `persistent` on desktop (md+), `temporary` on mobile
- Removed the `display: { xs: 'block', sm: 'none' }` constraint — drawer now opens on ALL screen sizes
- Made drawer wrapper `onClick` conditional — only closes drawer on nav click on mobile
- Added CSS transition with conditional `ml` on main content for desktop drawer push effect

## Task Commits

Each task was committed atomically:

1. **Task 1: Restructure drawer contents** — `8d3ad82` (feat)
2. **Task 2: Add responsive drawer variant switching** — `27eff44` (feat)

**Plan metadata:** Pending on next step

## Files Created/Modified

- `src/components/layout/MainLayout2.component.tsx` — Restructured drawer content (~60 lines changed): filtered nav links, RouterLink, SidebarHCP compact HCP, Settings/admin/ThemeSwitcher/Logout correct ordering, responsive variant switching with useMediaQuery, conditional main content margin with CSS transition

## Decisions Made

- Renamed `mobileOpen` → `drawerOpen` to reflect that the drawer opens on all screen sizes, not just mobile
- Single Drawer component with variant switching via `useMediaQuery` (not two separate Drawers) — cleaner, less code
- On desktop, clicking nav links does NOT close the drawer — only the hamburger toggle controls it (per Research resolution)
- Removed `Avatar` import from MainLayout2 — no longer needed since Profile block removed; `User` component handles its own avatar rendering

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All Phase 3 plans complete (03-01: Avatar simplification + SidebarHCP, 03-02: Sidebar drawer restructure + responsive variant)
- Sidebar drawer is now the primary navigation hub on all screen sizes
- Admin links render only for admin users, in a dedicated section — no duplicate rendering
- SPA navigation via RouterLink — no full-page reloads on sidebar link click
- Phase complete, ready for next phase

---

*Phase: 03-navigation-and-sidebar-reorg*
*Completed: 2026-06-01*
