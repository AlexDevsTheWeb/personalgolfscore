---
title: Import Rounds Feature
tags: [feature, import, federgolf]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-01-import-rounds-verification-design.md]
---

# Import Rounds Feature

## Overview

A page where players paste Federgolf/FIG competition results from a Google Sheet and import them as real rounds — enabling verification of handicap history without entering 18 holes of shot-by-shot data.

## Data Flow

1. User copies rows from Google Sheet
2. Paste into textarea on `/import-rounds`
3. Parse CSV/TSV text → structured round data
4. Match course name against `golf_courses` collection
5. Look up teebox matching the round's CR/SR
6. Show preview table with match status
7. User selects rounds and clicks Import
8. Firestore batch write creates round documents

## Key Design

- **No holes subcollection** — imported rounds have per-hole data; detail page shows "no per-hole data available"
- **`importSource: "federgolf-sheet"`** — marks imported rounds for filtering and UI context
- **Course matching** — exact match first, then LIKE fallback, then store raw name
- **Italian decimal format** handled (comma as decimal separator)
- Rounds where `Valida = N` (not valid for handicap) are skipped

## Files

- `src/pages/ImportRounds.page.tsx` — Route page
- `src/components/ImportRounds/` — Full component tree (orchestrator, form, preview, results, parser, course matcher, round builder)

## Related Pages

- [Firestore Schema](../architecture/firestore-schema.md)
