# Stack Research

**Domain:** WHS Golf Handicap Calculator & Course DB Admin
**Researched:** 2026-05-31
**Confidence:** HIGH

## Recommended Stack

### Foundation (Existing — No Change)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | 19.2.4 | UI framework | Already installed, stable |
| TypeScript | 6.0.2 | Type safety | Already installed, strict mode on |
| Vite | 8.0.3 | Build tool | Already installed, fast SWC compiler |
| MUI Core | 7.3.9 | UI components | Already installed, admin pages reuse same design |
| @mui/x-data-grid | 8.28.2 | **Admin CRUD tables** | **Already installed** — perfect for course list/admin tables |
| @mui/x-date-pickers | 8.27.2 | Date selection | Already installed |
| Zustand | 5.0.12 | State management | Already installed, persist middleware |
| React Hook Form | 7.72.1 | Forms | Already installed |
| Firebase JS SDK | 12.11.0 | Auth + Firestore | Already installed |
| dayjs | 1.11.20 | Date handling | Already installed |
| axios | 1.14.0 | HTTP client | Already installed (used for Federgolf import) |

### New Dependencies

#### 1. WHS Handicap Calculator — Build Custom (No npm Package Exists)

**Verdict: NO existing TypeScript npm package for WHS handicap calculation.**

| Library | What It Does | Verdict |
|---------|--------------|---------|
| `ghin` / `@spicygolf/ghin` | Unofficial GHIN API wrapper (US-centric) | ❌ Not a calculation engine; requires GHIN credentials; US-only |
| `longestdrive/laravel-golf-handicap-calculator` | PHP WHS calculator | ❌ PHP/Laravel only |
| `bri-b-dev/handycap` | Vue 3 app with WHS tracking | ❌ Vue app, not a reusable library |
| `daneden/handy` | TypeScript handicap calculator | ❌ Single-club custom build, no npm package, stale |

**Recommendation: Build a custom WHS calculation module.**

The WHS formulas are well-documented and mathematically simple. The existing codebase already has `TotalsCalculator.utils.tsx` — follow the same pattern:

```typescript
// src/utils/handicap/whs.utils.ts — NEW FILE
// Pure functions, no side effects, fully tested via existing dev-tools framework
```

**Why NOT to use any existing library:**
- No npm package implements WHS rules as a standalone TS module
- The `ghin` package wraps the US-only GHIN API, which is irrelevant for Italian/Federgolf users
- Building our own gives full control over WHS compliance, edge cases, and testing

**WHS formulas to implement (from official 2024 Rules of Handicapping, verified against USGA/R&A docs):**

| Formula | Source Rule |
|---------|-------------|
| `ScoreDifferential = (113 ÷ SlopeRating) × (AdjGrossScore - CourseRating - PCC)` | Rule 5.1a |
| `9HoleSD = (113 ÷ 9HoleSlope) × (9HoleAdjGross - 9HoleCR - 0.5×PCC)` | Rule 5.1b |
| `HI = average of lowest N SDs from last 20 rounds (N varies by count)` | Rule 5.2a/b |
| `CourseHCP = HI × (Slope ÷ 113) + (CR - Par)` | Rule 6.1a |
| `PlayingHCP = CourseHCP × Allowance (rounded)` | Rule 6.2a |

**PCC is always 0 for this project** (per scope decision) — simplifies implementation.

**Testing approach:** Use existing dev-tools framework (`testRunner.ts`, `testDataGenerator.ts`) to validate against known WHS example calculations from the official rulebook.

#### 2. Admin Panel — Use Existing Stack (No New Library)

**Verdict: Build admin pages using existing MUI + DataGrid. Do NOT add FireCMS.**

| Option | Verdict | Reason |
|--------|---------|--------|
| **Build custom with MUI** | ✅ **RECOMMENDED** | Reuses existing stack; DataGrid already installed; full control |
| FireCMS (self-hosted) | ❌ | v3.0 uses Tailwind CSS (conflicts with MUI theme); separate deployment; hard to integrate |
| JetAdmin / no-code | ❌ | Not type-safe, no React integration, limits customization |
| MUI template (Mantis, Aurora) | ❌ | Overengineered for 1-2 admin pages; adds cruft |

**Admin page structure (new files following codebase conventions):**
```
src/pages/admin/
├── AdminDashboard.page.tsx        # Admin home (stats, quick links)
├── AdminCourses.page.tsx          # Course list with DataGrid CRUD
├── AdminCourseForm.component.tsx  # Create/edit course dialog
├── AdminImport.page.tsx           # Federgolf import trigger
└── AdminRoute.component.tsx       # Route guard checking custom claims
```

The `@mui/x-data-grid` (already installed at 8.28.2) provides:
- Column sorting, filtering, pagination out of the box
- Row edit / inline editing
- Export to CSV
- Row selection for batch operations

No additional tables or grid libraries needed.

#### 3. Firebase Admin Role Management — Use Custom Claims

| Pattern | What | Why |
|---------|------|-----|
| **Firebase Custom Claims** | `{ role: 'admin' }` on user auth token | Zero extra reads; enforced in Firestore rules; works offline |
| Firestore role document | `users/{uid}/role` field | ❌ Requires extra read per request; not available in security rules without `get()` |

**Implementation plan:**

**a) Bootstrap the first admin:**
Create a one-time Node.js script using Firebase Admin SDK:
```typescript
// scripts/set-admin-claim.ts — NEW FILE
import admin from 'firebase-admin';
admin.initializeApp({ credential: admin.credential.cert('./service-account.json') });
await admin.auth().setCustomUserClaims('USER_UID', { role: 'admin' });
```

**b) Firestore security rules for `golf_courses` collection:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.token.role == 'admin';
    }

    // Admin-only collection for course management
    match /golf_courses/{courseId} {
      allow read: if request.auth != null; // Any authenticated user can search
      allow create, update, delete: if isAdmin();
    }

    // Admin-only collection for import metadata
    match /import_log/{docId} {
      allow read, write: if isAdmin();
    }
  }
}
```

**c) Client-side admin detection:**
```typescript
// src/utils/auth/admin.utils.ts — NEW FILE
import { auth } from '@/utils/firebase/firebase.utils';

export async function isAdmin(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  const token = await user.getIdTokenResult();
  return token.claims.role === 'admin';
}

// Or using onIdTokenChanged for reactive updates:
export function onAdminStateChanged(cb: (isAdmin: boolean) => void) {
  return onIdTokenChanged(auth, async (user) => {
    if (!user) { cb(false); return; }
    const token = await user.getIdTokenResult();
    cb(token.claims.role === 'admin');
  });
}
```

**Why NOT use Firestore-based role storage:**
- Every security rule that checks roles would require a `get()` call (billed Firestore read)
- Can't protect admin routes on the client without a network call
- Custom claims keep it in the JWT — synchronous, zero-cost

#### 4. Federgolf Course Data Import

**Data source:** https://www.federgolf.it/slope-and-course-rating-new/ — HTML table with 891 courses

| Approach | Verdict | Reason |
|----------|---------|--------|
| **Admin-triggered fetch + parse** | ✅ **RECOMMENDED** | Simple; no infra needed; user clicks "Import" → axios GET → parse HTML → batch write to Firestore |
| Scheduled cron sync | ❌ | Out of scope per PROJECT.md |
| Manual CSV upload | ❌ | More work for admin; HTML source is authoritative |

**Parsing approach:**
```typescript
// src/utils/federgolf/federgolf.utils.ts — NEW FILE
// Uses axios to GET the HTML table, cheerio or regex to parse rows
// Maps Italian tee names to internal enum
// Batch writes to Firestore golf_courses collection
```

**Note:** Federgolf's page has 891 courses. The HTML is a straightforward table. A simple parser (either regex or DOMParser in a Cloud Function) extracts: course name, PAR, CR, SR per tee color. No official API exists — the web page is the source of truth.

**Data model for `golf_courses` Firestore collection:**
```typescript
interface GolfCourse {
  id: string;                    // Firestore doc ID
  name: string;                  // Course name (e.g., "ACAYA")
  slug: string;                  // URL-safe name for autocomplete
  par: number;                   // Total par (e.g., 71)
  location?: {                   // Optional location data
    city?: string;
    region?: string;
    country: string;             // Default: "IT"
  };
  tees: TeeBox[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;             // Admin UID who created/imported
  // metadata
  importSource?: 'federgolf' | 'manual';
  federgolfSlug?: string;        // Original Federgolf URL slug for re-import
}

interface TeeBox {
  color: TeeColor;
  gender: 'men' | 'women' | 'both';
  courseRating: number;          // CR (e.g., 73.9)
  slopeRating: number;           // SR (e.g., 136)
  par: number;                   // May differ by tee
}

enum TeeColor {
  NERO = 'nero',      // Black (men)
  BIANCO = 'bianco',  // White (men)
  GIALLO = 'giallo',  // Yellow (men)
  VERDE = 'verde',    // Green (men)
  BLU = 'blu',        // Blue (women)
  ROSSO = 'rosso',    // Red (women)
  ARANCIO = 'arancio',// Orange (women)
}
```

#### 5. User-Created Courses

Any authenticated user can create courses not found in the import (requirement COURSE-03):

| Rule | Detail |
|------|--------|
| Firestore `create` | Allowed if `request.auth != null` (any authenticated user) |
| Firestore `update`/`delete` | Admin-only (prevents abuse) |
| Differentiate sources | Add `createdBy` field + `source: 'manual' \| 'federgolf'` |

This means the `golf_courses` collection rules:
```javascript
match /golf_courses/{courseId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null; // Any user can add missing courses
  allow update, delete: if isAdmin();    // Only admins edit/delete
}
```

---

### What NOT to Use

| Technology | Why Not |
|------------|---------|
| **FireCMS** | v3.0 uses Tailwind CSS (breaks existing MUI theme theme); separate deployment; overkill for 1-2 admin views |
| **React Admin** (ra-data-firestore) | Heavy framework; forces its own routing/state; conflicts with existing Zustand/React Router |
| **MUI Templates** (Mantis, Aurora) | 80+ pages of cruft for 2 admin pages; expensive licenses |
| **`ghin` npm package** | US-only GHIN API; requires credentials; doesn't calculate WHS |
| **TanStack Query / SWR** | Already have Zustand + direct Firestore SDK; adding another data layer adds complexity with no benefit for a Firestore-connected app |
| **Firestore role document pattern** | Extra reads, slower security rules, more complexity vs custom claims |
| **Cloud Functions for course import** | Can be done client-side since admin is already authenticated; Cloud Functions add deployment complexity |
| **PapaParse / CSV libraries** | Federgolf data is HTML table, not CSV. Simple DOM parsing suffices |
| **cheerio / jsdom** | Heavy dependencies for HTML parsing; try DOMParser (built-in) or regex first |

### Dependencies Summary

**New npm packages needed:**
- None for the WHS calculator (pure TS — build custom)
- None for the admin panel (use existing MUI + DataGrid)
- None for Federgolf import (use axios which is already installed)

**Dev dependencies considered:**
- None needed beyond what's already in `package.json`

**This is a zero-net-new-dependency feature** — everything needed is either already in the project or will be built as custom TypeScript modules following existing code patterns.

---

### Architecture Integration Points

```
New Feature Modules              Existing Codebase
─────────────────                ────────────────
src/utils/handicap/              src/utils/calculator/
  whs.utils.ts      ──uses──►      TotalsCalculator.utils.tsx (reuse for AGS calc)
  whs.types.ts

src/pages/admin/                 src/store/zustand/
  AdminCourses.page.tsx  ──uses──►  app.store.ts (add course slices)
  AdminCourseForm.component.tsx
  AdminRoute.component.tsx       src/utils/firestore/
                                  round.firestore.ts  (read CR/SR from course)
                                  courses.firestore.ts (NEW)

src/utils/federgolf/             External:
  federgolf.utils.ts  ──fetches──►  federgolf.it HTML table (axios)

src/components/CourseAutocomplete/  (NEW)
  CourseAutocomplete.component.tsx

src/utils/auth/
  admin.utils.ts   ──reads──►  Firebase Auth custom claims
```

### Sources

- **WHS Official Rules:** [USGA/R&A Rules of Handicapping 2024](https://wagolf.org/hubfs/assets/pdfs/2024-Rules-of-Handicapping-with-Handicap-Committee-Guide.pdf) — HIGH confidence, authoritative
- **Firebase Custom Claims:** [Firebase docs](https://firebase.google.com/docs/auth/admin/custom-claims) — HIGH confidence, official
- **Firebase RBAC Security Rules:** [Firebase docs](https://firebase.google.com/docs/rules/rules-and-auth) — HIGH confidence, official
- **Federgolf Course Data:** [Federgolf Slope & Course Rating](https://www.federgolf.it/slope-and-course-rating-new/) — MEDIUM confidence (no API, HTML scraping needed)
- **Federgolf Course Handicap Calc:** [Federgolf Calcolo HCP](https://www.federgolf.it/settore-tecnico/calcolo-hcp/) — MEDIUM confidence (reference for Italian implementation)
- **OpenSourceGolf Data Model:** [OpenSourceGolf Open Course Data Model](https://opensourcegolf.com/open-course.html) — MEDIUM confidence (reference only, not used directly)
- **GHIN npm package:** [n8io/ghin](https://github.com/n8io/ghin) — LOW confidence for this project (US-only, API wrapper not engine)
- **No existing WHS TS library:** Verified via npm search, GitHub search — no standalone TypeScript WHS calculation package exists — HIGH confidence

---
*Stack research for: WHS Golf Handicap Calculator & Course DB Admin*
*Researched: 2026-05-31*
