---
title: Firestore Schema
tags: [architecture, firestore, database]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md, specs/2026-06-01-import-rounds-verification-design.md, specs/2026-06-03-hcp-history-persistence-design.md]
---

# Firestore Schema

## Collection Structure

```
golf_courses/{courseId}
  └── course document (name, PAR, CR, SR per teebox per gender)

players/{playerId}
  ├── player document (profile, initialHCP, currentHCP, golf bag)
  └── rounds/{roundId}
        ├── round document (metadata, totals, HCP fields)
        └── holes/{holeNumber}
              └── hole document (per-hole shot data)
```

## Player Document

Key fields on each player document:

| Field | Type | Description |
|---|---|---|
| `uid` | string | Firebase Auth UID |
| `displayName` | string | Player display name |
| `email` | string | Player email |
| `photoURL` | string\|null | Profile photo URL |
| `isAdmin` | boolean | Admin flag (from custom claims sync) |
| `initialHCP` | number\|null | User-supplied initial handicap index |
| `currentHCP` | number\|null | Most recent handicap index (updated on each round save) |
| `themePreference` | string | "light" or "dark" |
| `golfBag` | object | Clubs with distances |

## Round Document

Key fields on each round document:

| Field | Type | Description |
|---|---|---|
| `roundDate` | Timestamp | Date of the round |
| `roundCourse` | string | Course name |
| `roundCourseRef` | string\|null | Course document ID if matched |
| `roundHoles` | number | Number of holes (typically 18) |
| `roundTee` | string | Teebox name |
| `roundPar` | number | Course par |
| `roundPlayingHCP` | number | Playing handicap for this round |
| `roundStrokes` | number | Total strokes (AGS) |
| `scoreDifferential` | number\|null | Pre-computed SD (WHS Rule 5.1) |
| `previousHCP` | number\|null | HI before this round |
| `handicapIndex` | number\|null | HI after this round (best N SDs) |
| `hcpDelta` | number\|null | `handicapIndex - previousHCP` |
| `totals` | IRoundTotals | Aggregated round totals |
| `importSource` | string\|null | `"federgolf-sheet"` for imported rounds |
| `userId` | string | Auth UID |

## Golf Courses Collection

```
golf_courses/{courseId}
```

Key fields:

| Field | Type | Description |
|---|---|---|
| `name` | string | Course name |
| `status` | CourseStatus | `"active"` or `"inactive"` |
| `teeboxes` | ITeebox[] | Array of teebox configurations |
| `createdAt` | Timestamp | Creation timestamp |
| `updatedAt` | Timestamp | Last update timestamp |

Each teebox in `teeboxes[]`:

| Field | Type | Description |
|---|---|---|
| `name` | string | Teebox name (e.g., "White", "Yellow") |
| `gender` | "male" \| "female" | Gender for rating |
| `par` | number | Course par |
| `courseRating` | number | Course Rating (CR) |
| `slopeRating` | number | Slope Rating (SR) |

**Security rules:**
- Public read (any authenticated user)
- Authenticated create (any authenticated user)
- Admin-only update/delete

## Imported Round Document

Imported rounds use `importSource: "federgolf-sheet"` to distinguish from hand-entered rounds. Their `totals` are minimal:
- `score.totals` — Adjusted Gross Score
- `points.totals` — Stableford total
- All other fields zeroed from `initialStateRoundTotals`
- No holes subcollection

Imported rounds still carry `scoreDifferential`, `handicapIndex`, and `hcpDelta` computed during the import batch via sequential per-round computation.

## Firestore Security Rules Pattern

- `golf_courses` — `read` if authenticated; `create` if authenticated; `update`/`delete` if `request.auth.token.admin == true`
- `players` — `read`/`write` own data; admin can `read` all
- `players/{uid}/rounds` — `read`/`write` own data only
- Admin custom claims set via Firebase Admin SDK (backend function)

## Related Pages

- [System Overview](system-overview.md)
- [Data Flow](data-flow.md)
- [Import Rounds Feature](../features/import-rounds.md)
- [HCP Persistence & Backfill](../features/hcp-persistence-backfill.md)
