---
title: Score Differential
tags: [whs, score-differential, concept]
created: 2026-06-13
updated: 2026-06-13
sources: [specs/2026-06-01-handicap-history-feature-design.md]
---

# Score Differential

A Score Differential (SD) normalizes a player's round score to a standard difficulty, enabling comparison across different courses and tees.

## Formula

```
SD = (AGS - Course Rating) × 113 / Slope Rating
```

- **AGS** — Adjusted Gross Score (total strokes for the round)
- **Course Rating** — The difficulty rating of the tees played
- **Slope Rating** — The relative difficulty for a bogey golfer vs a scratch golfer
- **113** — The standard slope rating

## Storage

Each round document stores its pre-computed SD in the `scoreDifferential` field. For hand-entered rounds, this is calculated at save time. For imported rounds, the SD is taken directly from the competition sheet.

## Usage

- SDs are the input to the WHS Handicap Index calculation (see [handicap-index.md](handicap-index.md))
- The Handicap History page shows the last 20 SDs and highlights the best N (where N depends on the scaling table)
- Rounds without a SD (`scoreDifferential == null`) are excluded from HI calculation

## Related Pages

- [Handicap Index](handicap-index.md) — How SDs are aggregated into an index
- [Handicap History Feature](../features/handicap-history.md) — SD visualization
