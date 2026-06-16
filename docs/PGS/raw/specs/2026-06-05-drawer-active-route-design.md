# Drawer Active-Route Highlighting

Date: 2026-06-05

## Overview

The left navigation drawer (`MainLayout2.component.tsx`) currently has no visual indication of which route the user is on. Add an active-state to the corresponding `ListItemButton` so the user can orient themselves at a glance, in both the collapsed (`57px`) and expanded (`240px`) drawer states.

Pure UI work: no Firestore schema changes, no new types, no new dependencies, no routing changes.

---

## 1. Architecture

### One new subcomponent

In `src/components/layout/MainLayout2.component.tsx`, define a local `NavLink` subcomponent that encapsulates the existing `ListItem` + `ListItemButton` + `ListItemIcon` + `ListItemText` pattern. The drawer renders 3 instances of this pattern (1 main loop, 2 admin items); the refactor collapses all of them onto one component so the active-state logic lives in exactly one place. The "Admin" caption (`Typography` + `Divider`) is unrelated and stays as is.

```tsx
const NavLink: React.FC<{
  link: TLinkSidebar;
  isActive: boolean;
  drawerOpen: boolean;
  onClick?: () => void;
}> = ({ link, isActive, drawerOpen, onClick }) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      component={RouterLink}
      to={link.link}
      onClick={onClick}
      selected={isActive}
      sx={{
        minHeight: 48,
        justifyContent: drawerOpen ? 'initial' : 'center',
        px: 2.5,
        // Active state styling (only when isActive)
        ...(isActive && {
          backgroundColor: (theme) => theme.palette.action.selected,
          '& .MuiListItemIcon-root, & .MuiListItemText-root': {
            color: (theme) => theme.palette.primary.main,
          },
          '& .MuiListItemText-primary': { fontWeight: 600 },
        }),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          justifyContent: 'center',
          mr: drawerOpen ? 1.5 : 'auto',
        }}
      >
        <SvgIcon component={link.icon} inheritViewBox />
      </ListItemIcon>
      <ListItemText primary={link.name} sx={{ opacity: drawerOpen ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
);
```

### One helper

```ts
const computeIsActive = (link: TLinkSidebar): boolean => {
  if (link.link === '/') {
    return location.pathname === '/' || location.pathname === '/dashboard';
  }
  return (
    location.pathname === link.link ||
    location.pathname.startsWith(link.link + '/')
  );
};
```

The `/` special case handles the dual route (`App.tsx:45-46` — both `/` and `/dashboard` render `DashboardPage`).

### Three call sites

| Location (line in current file) | Before | After |
| --- | --- | --- |
| `MainLayout2.component.tsx:142-168` (main link loop) | inline `ListItem` + `ListItemButton` | `<NavLink link={link} isActive={computeIsActive(link)} drawerOpen={drawerOpen} onClick={drawerOpen ? handleDrawerToggle : undefined} />` |
| `MainLayout2.component.tsx:179-201` (admin Courses) | inline `ListItem` + `ListItemButton` | `<NavLink link={...inline TLinkSidebar...} isActive={computeIsActive(adminCoursesLink)} drawerOpen={drawerOpen} onClick={drawerOpen ? handleDrawerToggle : undefined} />` |
| `MainLayout2.component.tsx:202-224` (admin Users) | inline `ListItem` + `ListItemButton` | same pattern with admin users link |

The "Admin" caption at `MainLayout2.component.tsx:172-178` and its `Divider` at `MainLayout2.component.tsx:171` are **unchanged** — they only show when the drawer is expanded and the user is an admin.

### Why a subcomponent, not a hook

The pattern involves both layout (ListItem/Button/Icon/Text) and styling (active state). Extracting it as a component gives us a single place to add or change the active-state logic. A hook returning `isActive` would still leave the rendering duplicated 4×.

---

## 2. Visual treatment

| Element | When `isActive` | Source |
| --- | --- | --- |
| `ListItemButton` background | `theme.palette.action.selected` | MUI built-in — auto-adapts to light/dark theme |
| `ListItemIcon` color | `theme.palette.primary.main` | brand color, pops against the tinted background |
| `ListItemText` color | `theme.palette.primary.main` | matches icon |
| `ListItemText` weight | `fontWeight: 600` | semibold bump reinforces "this is the active item" |

**Collapsed state** (57px wide): user sees only the icon. The tinted row background + primary-colored icon = clear "you are here" indicator. The text is invisible (`opacity: 0`) so the weight bump is irrelevant.

**Expanded state** (240px wide): user sees icon + text on a tinted background, both in primary color, text semibold.

**Hover and focus states**: MUI's `selected` prop composes with `:hover` and `Mui-focusVisible` natively. Active items still show hover affordance; the active styling wins visually. No new theme overrides needed.

**No new theme tokens, no new colors.** `palette.action.selected` and `palette.primary.main` already exist in the theme.

---

## 3. Matching logic

`computeIsActive(link)` returns `true` when:

| Link `link.link` | Current `location.pathname` | Active? | Why |
| --- | --- | --- | --- |
| `/` | `/` | yes | special-case for Dashboard |
| `/` | `/dashboard` | yes | special-case (both render `DashboardPage`) |
| `/` | anything else | no | |
| `/clubs` | `/clubs` | yes | exact match |
| `/clubs` | `/clubs/anything` | yes | prefix match (future-proofing) |
| `/clubs` | anything else | no | |
| `/simulator` | `/simulator`, `/simulator/...` | yes | exact + prefix |
| `/history` | `/history`, `/history/...` | yes | exact + prefix |
| `/import-rounds` | `/import-rounds`, `/import-rounds/...` | yes | exact + prefix |
| `/admin/courses` | `/admin/courses`, `/admin/courses/...` | yes | exact + prefix |
| `/admin/users` | `/admin/users`, `/admin/users/...` | yes | exact + prefix |
| (any) | `/round/:roundID` | no | no drawer item is a parent — `All Rounds` isn't in the drawer |
| (any) | `/addNewRound` | no | not in the drawer |
| (any) | `/settings` | no | settings is in the footer area, not the drawer |
| (any) | `/login`, `/signup`, `/error` | no | drawer is mounted under `ProtectedRoute` |

**Drawer toggle interaction:**
- Tapping a drawer item while expanded → still calls `handleDrawerToggle` (existing `onClick` behavior preserved).
- Active state persists across drawer open/close (we don't gate `isActive` on `drawerOpen`).

**Accessibility:**
- `ListItemButton`'s `selected` prop sets `aria-selected="true"` on the rendered anchor (since `component={RouterLink}` resolves to `<a>`).
- The active state is purely visual styling, not announced separately — `aria-selected` is the canonical accessibility hook.

**What this does NOT change:**
- No new route definitions
- No changes to admin section's "Admin" caption / divider
- No changes to footer (Avatar, Settings, ThemeSwitcher, Logout)
- No changes to breadcrumb (already shows current path textually)
- No animation on the active state transition (MUI handles hover transition natively; we don't add a separate one)

---

## 4. Files

### Modified

#### `src/components/layout/MainLayout2.component.tsx`

- Add `NavLink` subcomponent (local, not exported).
- Add `computeIsActive` helper.
- Replace 3 inline `ListItem`+`ListItemButton` blocks with `<NavLink>` calls (main loop + 2 admin items).
- The admin section's `<Typography variant="caption">Admin</Typography>` and `<Divider sx={{ my: 1 }} />` stay exactly as they are.

### Not modified

- `src/utils/links/links.utils.tsx` — link data unchanged.
- `src/types/general.types.tsx` — `TLinkSidebar` type unchanged.
- `src/App.tsx` — route definitions unchanged.
- `src/pages/SharedLayout.page.tsx` — layout wrapper unchanged.
- `src/styles/theme/Components.theme.tsx` — no theme overrides needed.

---

## 5. Verification

### Type-check
- `npm run type-check` must pass.

### Manual verification (in dev environment)

**Each route, both drawer states** (collapsed + expanded):

- [ ] `/` (Dashboard) → Dashboard highlighted
- [ ] `/dashboard` → Dashboard highlighted (special case)
- [ ] `/clubs` → Clubs highlighted
- [ ] `/simulator` → HCP Simulator highlighted
- [ ] `/history` → History highlighted
- [ ] `/import-rounds` → Import Rounds highlighted
- [ ] `/admin/courses` → Courses (admin) highlighted *(as admin)*
- [ ] `/admin/users` → Users (admin) highlighted *(as admin)*
- [ ] `/round/:roundID` → no drawer item highlighted (correct)
- [ ] `/addNewRound` → no drawer item highlighted
- [ ] `/settings` → no drawer item highlighted

**Theme**:
- [ ] Light mode: tinted background visible, primary-colored icon/text legible
- [ ] Dark mode: tinted background visible, primary-colored icon/text legible

**Collapsed vs expanded**:
- [ ] Collapsed (`57px`): only the icon shows, with the tinted background filling the row
- [ ] Expanded (`240px`): icon + text show, both highlighted
- [ ] Toggle between collapsed/expanded while on a route: active state persists

**Interaction**:
- [ ] Hover over active item: still shows hover affordance (MUI default)
- [ ] Hover over inactive item: standard hover, no active-state bleed-through
- [ ] Click active item: navigates to same route, no flicker

### Out of scope (intentionally not verifying)

- Unit tests for `computeIsActive` (per `AGENTS.md`, calculation tests are valued; this is pure UI logic with no calculation)
- Performance/load testing (5-7 nav items, no concerns)
- Animation testing (we don't add animations; MUI's default `:hover` transition is what it is)
