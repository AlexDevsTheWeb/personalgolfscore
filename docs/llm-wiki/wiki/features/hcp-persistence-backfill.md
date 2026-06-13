---
title: HCP Persistence & Backfill
tags: [feature, handicap, persistence, backfill]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-03-hcp-history-persistence-design.md]
---

# HCP Persistence & Backfill

## Overview

Persist `previousHCP` on every round alongside the already-stored `handicapIndex` and `hcpDelta`, and backfill these fields on existing rounds via a one-time trigger in Settings.

## Data Model

Added `previousHCP?: number | null` to `IBasicRoundData`. The three per-round HCP fields:

| Field | Meaning |
|---|---|
| `scoreDifferential` | Round's SD (already existed) |
| `previousHCP` | HI carried into this round |
| `handicapIndex` | HI after this round |
| `hcpDelta` | `handicapIndex - previousHCP` |

## Backfill Utility

- **File**: `src/utils/firestore/backfillHcpHistory.utils.ts`
- **Pure helper**: `computeRoundHcpHistory()` — unit tested with 6 vitest cases
- **Orchestrator**: `backfillHcpHistory()` — reads all rounds, computes, writes single batch
- Idempotent: re-runs produce the same values, already-correct rounds are skipped

## Settings UI

A gated section in Settings appears only when rounds are missing the new fields. Includes a confirmation dialog and progress indicator. After backfill, the section disappears.

## Chart Changes

Simplified the HCP progression chart to read per-round `handicapIndex` directly (instead of computing from SDs). Removed the D-11 anchor point and D-14 single-point branches. Kept the dashed reference line at `initialHCP`.

## Related Pages

- [ADR-002: Per-Round HCP Persistence](../decisions/hcp-persistence.md)
- [WHS Handicap Index Concept](../concepts/handicap-index.md)
- [History: Implementation](../history/2026-06-03-hcp-persistence.md)
