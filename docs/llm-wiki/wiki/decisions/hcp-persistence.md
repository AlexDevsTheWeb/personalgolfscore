---
title: ADR-002 — Per-Round HCP Persistence
tags: [decision, adr, handicap, persistence]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-03-hcp-history-persistence-design.md]
---

# ADR-002: Store `previousHCP` Per-Round vs Recompute on Every Read

## Context

The handicap history feature needed to show Old HCP, New HCP, and Δ for each round. The `handicapIndex` and `hcpDelta` were already stored per-round from Phase 5, but the `previousHCP` was a local variable only.

## Decision

Store `previousHCP` as a per-round field on each round document, alongside the existing `handicapIndex` and `hcpDelta`.

## Rationale

- Avoids expensive recomputation every time the history page loads
- Backfill is a one-time operation via a utility function
- The three fields together form a complete audit trail of HI evolution
- Idempotent: re-running backfill is a no-op for already-correct rounds

## Consequences

- New field `previousHCP?: number | null` on `IBasicRoundData`
- One-time `backfillHcpHistory()` utility in `src/utils/firestore/backfillHcpHistory.utils.ts`
- Settings page has a gated trigger UI for the backfill
- New rounds get all three fields populated automatically at save time

## Related Pages

- [HCP Persistence & Backfill Feature](../features/hcp-persistence-backfill.md)
- [WHS Handicap Index Concept](../concepts/handicap-index.md)
