---
title: ADR-001 — Zustand for State Management
tags: [decision, adr, state-management]
created: 2026-06-13
updated: 2026-06-13
sources: [ARCHITECTURE.md, CONVENTIONS.md]
---

# ADR-001: Zustand for State Management

## Context

The app needed client-side state management with persistence. Options were Redux Toolkit, Zustand, or React Context.

## Decision

Use **Zustand 5** with its `persist` middleware for global state management.

## Rationale

- Simpler API than Redux Toolkit (no boilerplate reducers/actions)
- Built-in `persist` middleware for localStorage integration
- Selective subscriptions prevent unnecessary re-renders
- Lightweight (~1KB) compared to Redux Toolkit

## Consequences

- Single store instance (`useAppStore`) at `src/store/zustand/app.store.ts` (currently 793 lines)
- Persists to localStorage under key `app-storage`
- Store has grown large — see [store splitting plan](store-splitting.md)
- Components subscribe to slices via selectors: `useAppStore((state) => state.roundsList)`

## Related Pages

- [Store Splitting Plan](store-splitting.md)
- [Coding Conventions](../conventions/coding.md)
