---
title: Planned Store Splitting
tags: [decision, refactor, store]
created: 2026-06-13
updated: 2026-06-13
sources: [ZUSTAND_STORE_SPLITTING.md]
---

# Planned Store Splitting

The current `app.store.ts` is 793 lines with 8+ different state slices. A refactor is planned to split into domain-specific stores.

## Proposed Structure

```
src/store/zustand/
├── index.ts              # Re-exports all stores
├── player.store.ts       # Player & authentication state
├── clubs.store.ts        # Golf bag & clubs state
├── rounds.store.ts       # Rounds list state
├── roundDetails.store.ts # Single round details state
├── newRound.store.ts     # New round creation state
├── ui.store.ts           # UI controls state (theme, loading)
└── app.store.ts          # Keep for migration, then deprecate
```

## Migration Strategy

**Phase A** — Create new stores with initial state; old store reads from them
**Phase B** — Migrate components one by one to import from new stores
**Phase C** — Delete unused slices from `app.store.ts`

## Related Pages

- [ADR-001: Zustand](state-management.md)
- [Codebase Concerns](../patterns/codebase-concerns.md)
