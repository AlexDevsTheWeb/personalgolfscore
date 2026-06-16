---
title: Admin Panel
tags: [feature, admin, courses, users]
created: 2026-06-13
updated: 2026-06-13
sources: [milestones/v1.0-ROADMAP.md]
---

# Admin Panel

## Overview

Admin panel for managing the shared `golf_courses` database and user roles. Administrators are identified via Firebase custom claims (`{ admin: true }`). Routes are protected at both client (`AdminRoute` guard) and server (Firestore security rules) levels.

## Course Management (`/admin/courses`)

- MUI DataGrid listing all courses with CRUD actions
- Create course via `CourseFormDialog` with teebox management (multiple teeboxes per course with name, gender, par, CR, SR)
- Edit existing courses
- Delete with confirmation dialog
- Federgolf import button to bulk-import courses from the Italian Golf Federation website
- Public `golf_courses` collection with security rules: public read, authenticated create, admin-only update/delete

## User Management (`/admin/users`)

- MUI DataGrid listing all players (`getAllPlayers` from `player.firestore`)
- Admin role toggle for each user (promote/revoke)
- Changes reflected via Firebase Admin SDK custom claims

## Security Layers

1. **Firebase custom claims** — `{ admin: true }` on auth token
2. **Client guard** — `AdminRoute.page.tsx` redirects non-admin users to `/dashboard` with snackbar warning
3. **Server guard** — Firestore security rules check `request.auth.token.admin == true` for write operations on `golf_courses`

## Files

- `src/pages/AdminCourses.page.tsx` — Course management route
- `src/pages/AdminUsers.page.tsx` — User management route
- `src/pages/AdminRoute.page.tsx` — Admin auth guard
- `src/components/Admin/CoursesTable.component.tsx` — Course DataGrid + Federgolf import
- `src/components/Admin/UsersTable.component.tsx` — User DataGrid with role toggle
- `src/components/Admin/CourseFormDialog.component.tsx` — Course create/edit dialog
- `src/components/Admin/ConfirmDeleteDialog.component.tsx` — Delete confirmation
- `src/components/Admin/SnackbarProvider.component.tsx` — Toast notifications
- `src/utils/firestore/course.firestore.ts` — Course CRUD service
- `src/utils/firestore/federgolf-import.utils.ts` — FIG HTML import
- `src/utils/firestore/player.firestore.ts` — `getAllPlayers()` for user list

## Related Pages

- [Firestore Schema](../architecture/firestore-schema.md)
- [External Integrations](../architecture/external-integrations.md)
- [Import Rounds](import-rounds.md)
