# Drawer Active-Route Highlighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Highlight the active route in the left navigation drawer with a tinted background + primary-colored icon and text, so the user can orient themselves at a glance.

**Architecture:** Extract a local `NavLink` subcomponent in `MainLayout2.component.tsx` that encapsulates the existing `ListItem` + `ListItemButton` + `ListItemIcon` + `ListItemText` pattern. The `NavLink` accepts an `isActive` prop and uses MUI's `selected` prop on `ListItemButton` plus theme tokens (`palette.action.selected`, `palette.primary.main`) to apply the active styling. A `computeIsActive` helper determines whether the current `location.pathname` matches the link (with prefix matching, plus a special case for the dual `/` and `/dashboard` Dashboard route). All 3 inline link blocks (1 main loop + 2 admin items) are replaced with `<NavLink>` calls.

**Tech Stack:** React 19, MUI v7 (`ListItemButton` `selected` prop, `theme.palette.action.selected`, `theme.palette.primary.main`), React Router v7 (`useLocation`).

---

## File Structure

### Modified

| File | Responsibility |
| --- | --- |
| `src/components/layout/MainLayout2.component.tsx` | Define local `NavLink` subcomponent + `computeIsActive` helper. Replace 3 inline `ListItem`+`ListItemButton` blocks with `<NavLink>` calls. |

### Not Modified

- `src/utils/links/links.utils.tsx` — link data unchanged
- `src/types/general.types.tsx` — `TLinkSidebar` unchanged
- `src/App.tsx` — routes unchanged
- `src/styles/theme/Components.theme.tsx` — no theme overrides needed

---

## Task 1: Add NavLink subcomponent and refactor 3 call sites

**Files:**
- Modify: `src/components/layout/MainLayout2.component.tsx`

- [ ] **Step 1: Add `computeIsActive` helper just above the `drawer` definition (around line 122)**

Insert this block right after the `const breadcrumbs = getBreadcrumbs();` line (currently line 121) and before `const drawer = (`:

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

- [ ] **Step 2: Add the `NavLink` subcomponent just above the `drawer` definition, after `computeIsActive`**

Insert this block (it uses `link`, `TLinkSidebar`, `RouterLink`, `ListItem`, `ListItemButton`, `ListItemIcon`, `SvgIcon`, `ListItemText` — all already imported at the top of the file):

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

- [ ] **Step 3: Replace the main link loop (currently lines 142-168) with a single `<NavLink>` call**

Find this block:

```tsx
{links.filter((l) => l.show === true).map((link: TLinkSidebar, index: number) => (
  <ListItem key={index} disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      component={RouterLink}
      to={link.link}
      onClick={drawerOpen ? handleDrawerToggle : undefined}
      sx={{
        minHeight: 48,
        justifyContent: drawerOpen ? 'initial' : 'center',
        px: 2.5,
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
      <ListItemText
        primary={link.name}
        sx={{ opacity: drawerOpen ? 1 : 0 }}
      />
    </ListItemButton>
  </ListItem>
))}
```

Replace with:

```tsx
{links.filter((l) => l.show === true).map((link: TLinkSidebar, index: number) => (
  <NavLink
    key={index}
    link={link}
    isActive={computeIsActive(link)}
    drawerOpen={drawerOpen}
    onClick={drawerOpen ? handleDrawerToggle : undefined}
  />
))}
```

- [ ] **Step 4: Replace the admin Courses block (currently lines 179-201) with a `<NavLink>` call**

Find this block (inside the `{player?.isAdmin && (<>...</>)}`):

```tsx
<ListItem disablePadding sx={{ display: 'block' }}>
  <ListItemButton
    component={RouterLink}
    to="/admin/courses"
    onClick={drawerOpen ? handleDrawerToggle : undefined}
    sx={{
      minHeight: 48,
      justifyContent: drawerOpen ? 'initial' : 'center',
      px: 2.5,
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        justifyContent: 'center',
        mr: drawerOpen ? 1.5 : 'auto',
      }}
    >
      <SvgIcon component={GolfCourseIcon} inheritViewBox />
    </ListItemIcon>
    <ListItemText primary="Courses" sx={{ opacity: drawerOpen ? 1 : 0 }} />
  </ListItemButton>
</ListItem>
```

Replace with:

```tsx
<NavLink
  link={{ id: 3, name: 'Courses', link: '/admin/courses', icon: GolfCourseIcon, show: true }}
  isActive={computeIsActive({ id: 3, name: 'Courses', link: '/admin/courses', icon: GolfCourseIcon, show: true })}
  drawerOpen={drawerOpen}
  onClick={drawerOpen ? handleDrawerToggle : undefined}
/>
```

Note: We construct an inline `TLinkSidebar` because the admin links aren't in the `links` array. The `GolfCourseIcon` import (line 5) is still used here, do not remove it.

- [ ] **Step 5: Replace the admin Users block (currently lines 202-224) with a `<NavLink>` call**

Find this block:

```tsx
<ListItem disablePadding sx={{ display: 'block' }}>
  <ListItemButton
    component={RouterLink}
    to="/admin/users"
    onClick={drawerOpen ? handleDrawerToggle : undefined}
    sx={{
      minHeight: 48,
      justifyContent: drawerOpen ? 'initial' : 'center',
      px: 2.5,
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        justifyContent: 'center',
        mr: drawerOpen ? 1.5 : 'auto',
      }}
    >
      <SvgIcon component={PeopleIcon} inheritViewBox />
    </ListItemIcon>
    <ListItemText primary="Users" sx={{ opacity: drawerOpen ? 1 : 0 }} />
  </ListItemButton>
</ListItem>
```

Replace with:

```tsx
<NavLink
  link={{ id: 4, name: 'Users', link: '/admin/users', icon: PeopleIcon, show: true }}
  isActive={computeIsActive({ id: 4, name: 'Users', link: '/admin/users', icon: PeopleIcon, show: true })}
  drawerOpen={drawerOpen}
  onClick={drawerOpen ? handleDrawerToggle : undefined}
/>
```

The `PeopleIcon` import (line 7) is still used here, do not remove it.

- [ ] **Step 6: Run type-check to confirm no compilation errors**

Run: `npm run type-check`
Expected: clean exit, no errors.

If the type-checker complains about the inline `TLinkSidebar` construction in Steps 4-5 (because `TLinkSidebar.icon` is typed as `any`, see `src/types/general.types.tsx:5`), that's fine — `any` accepts anything. If it complains about something else, read the error carefully and fix.

- [ ] **Step 7: Build to confirm no runtime issues**

Run: `npm run build`
Expected: clean build (chunk-size warnings are normal and unrelated).

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/MainLayout2.component.tsx
git commit -m "feat: highlight active route in navigation drawer

Extract a local NavLink subcomponent and add computeIsActive helper
to MainLayout2. The NavLink uses MUI's selected prop plus
palette.action.selected background and palette.primary.main
icon/text colors to indicate the active route. Prefix-based path
matching with a special case for the dual / and /dashboard
Dashboard route. All 3 inline ListItem blocks (main loop + 2
admin items) now use NavLink."
```

---

## Task 2: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm start`
Expected: dev server starts, no console errors.

- [ ] **Step 2: Walk through each route and verify the active item is highlighted**

Open the app in a browser. For each route below, confirm the corresponding drawer item is highlighted (tinted background + primary-colored icon and text):

- [ ] `/` (Dashboard) → Dashboard highlighted
- [ ] `/dashboard` (navigate by typing the URL) → Dashboard highlighted (special case)
- [ ] `/clubs` → Clubs highlighted
- [ ] `/simulator` → HCP Simulator highlighted
- [ ] `/history` → History highlighted
- [ ] `/import-rounds` → Import Rounds highlighted
- [ ] `/admin/courses` (as admin) → Courses (admin) highlighted
- [ ] `/admin/users` (as admin) → Users (admin) highlighted
- [ ] `/round/anyRoundId` → no drawer item highlighted (correct — All Rounds is not in the drawer)
- [ ] `/addNewRound` → no drawer item highlighted
- [ ] `/settings` → no drawer item highlighted

- [ ] **Step 3: Verify both theme modes**

Toggle the theme switcher in the footer:

- [ ] Light mode: tinted background visible, primary-colored icon/text legible
- [ ] Dark mode: tinted background visible, primary-colored icon/text legible

- [ ] **Step 4: Verify drawer collapsed and expanded states**

- [ ] With drawer collapsed (57px), click an item: it navigates and the icon is highlighted
- [ ] Click the menu icon to expand the drawer (240px): the active item's text is also highlighted
- [ ] Toggle between collapsed/expanded while on a route: active state persists

- [ ] **Step 5: Verify hover and focus**

- [ ] Hover over the active item: hover affordance still shows (slightly different background tone), active state wins visually
- [ ] Hover over an inactive item: standard hover, no active-state bleed-through
- [ ] Tab through drawer items with keyboard: focus ring shows on each, active item has both focus and active styles

If any check fails, fix the issue in `MainLayout2.component.tsx`, re-run `npm run type-check`, and re-verify. Do not commit verification-only changes.

- [ ] **Step 6: Stop the dev server**

Press `Ctrl+C` in the terminal where the dev server is running.
