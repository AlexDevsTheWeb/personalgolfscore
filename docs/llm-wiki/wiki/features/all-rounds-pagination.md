---
title: All Rounds Pagination & Search
tags: [feature, ui, pagination, search]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-05-all-rounds-pagination-design.md]
---

# All Rounds Pagination & Search

## Overview

Replaced the hard-coded 5-round cap on `/all-rounds` with a paginated, searchable list showing all rounds.

## Changes

1. **Removed `slice(0, 5)`** from `Rounds.component.tsx` — becomes a pure list renderer
2. **Dashboard unchanged** — `Dashboard.component.tsx` still slices to 5 before passing
3. **New pagination** — 20 rounds per page via MUI `Pagination`
4. **Search bar** — Date picker (exact day match) + course text field (case-insensitive substring)
5. **Filters combine with AND** — round must pass both to appear
6. **Page resets to 1** on list mutation or filter change

## Implementation

- All state lives in `AllRounds.page.tsx` (local `useState`)
- `PAGE_SIZE = 20` (module-level const)
- Pagination hidden when `pageCount <= 1`
- Empty state messages: "No rounds match your search." (active filter) vs built-in Rounds empty state (no filter)

## Related Pages

- [History: Implementation](../history/2026-06-05-all-rounds-pagination.md)
