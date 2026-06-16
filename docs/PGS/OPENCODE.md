# LLM Wiki: Personal Golf Score

This file tells the LLM how to maintain the project wiki. It is the schema layer of the LLM Wiki pattern (see `raw/starting.md`).

## Wiki Purpose

A persistent, LLM-maintained knowledge base for the Personal Golf Score project — a React 19 + Firebase golf tracker with WHS handicap calculation, round statistics, bag management, and history tracking.

The wiki accumulates project knowledge over time: architecture docs, decisions, conventions, feature specs, and the evolution log. It sits between the user and the raw sources, and the LLM owns its maintenance entirely.

## Directory Structure

```
docs/llm-wiki/
├── OPENCODE.md          # This file — the schema
├── raw/                 # IMMUTABLE source documents (user places here)
│   ├── starting.md      # Karpathy's original LLM Wiki idea
│   └── ...              # Architecture docs, specs, issue exports, feature briefs
└── wiki/                # LLM-maintained markdown wiki (LLM owns this)
    ├── index.md         # Master catalog of every wiki page with summary
    ├── log.md           # Append-only chronological record of all operations
    ├── overview.md      # High-level project synthesis (evolves over time)
    ├── concepts/        # Domain concepts (handicap, stableford, GIR, etc.)
    ├── architecture/    # System architecture documentation
    ├── decisions/       # Architecture Decision Records (ADRs)
    ├── conventions/     # Coding, naming, and documentation conventions
    ├── features/        # Feature documentation from issues/specs
    ├── patterns/        # Reusable code patterns used in the project
    └── history/         # Changelog and project evolution timeline
```

## Page Conventions

- **Format**: Markdown with YAML frontmatter for metadata
- **Frontmatter** fields:
  ```yaml
  ---
  title: Page Title
  tags: [tag1, tag2]
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  sources: [filename-in-raw]
  ---
  ```
- **Cross-references**: Use relative `[Page Name](../path/to/page.md)` links. Every page should link to related pages.
- **Tone**: Concise, technical, factual. No fluff.
- **Orphan policy**: Every page must have at least one inbound link from another wiki page (or from the index). The LLM should check for orphans during lint passes.

## Operations

### 1. Ingest

Triggered when the user drops a new source into `raw/` and says "ingest this" or similar.

Workflow:
1. Read the source file(s) in `raw/`
2. Discuss key takeaways with the user — ask what to emphasize
3. Write a summary page in the appropriate `wiki/` subdirectory
4. Update `wiki/index.md` — add the new page to the catalog
5. Update relevant entity/concept/architecture pages that this new source touches
6. Append an entry to `wiki/log.md`
7. Tell the user what changed

An ingest typically touches 3-10 wiki pages.

### 2. Query

Triggered when the user asks a question about the project.

Workflow:
1. Read `wiki/index.md` to find relevant pages
2. Read those pages
3. Synthesize an answer with citations to wiki pages (and optionally raw sources)
4. If the answer is valuable as a reference page — offer to file it back into the wiki

### 3. Lint

Triggered when the user says "lint the wiki" or periodically.

Workflow:
1. List all pages in `wiki/`
2. Check for: contradictions between pages, stale claims, orphan pages (no inbound links), important concepts without their own page, missing cross-references
3. Suggest new questions to investigate and new sources to look for
4. Report findings to the user
5. Append a lint entry to `wiki/log.md`

## Index Structure (`wiki/index.md`)

The index is a catalog. Format:

```markdown
# Wiki Index

## Concepts
- [Handicap Index](concepts/handicap-index.md) — WHS handicap calculation and history
- [Stableford](concepts/stableford.md) — Stableford point scoring system

## Architecture
- [Data Flow](architecture/data-flow.md) — How data moves through the app
- [Firestore Schema](architecture/firestore-schema.md) — Database collections and documents

## Decisions
- [ADR-001: State Management](decisions/adr-001-state-management.md) — Zustand over Redux
...
```

Updated on every ingest. Read on every query to route to the right pages.

## Log Structure (`wiki/log.md`)

Append-only chronological log. Each entry starts with a consistent format:

```markdown
## [2026-06-13] ingest | Feature: WHS Handicap Calculator
- Source: `raw/whs-calc-spec.md`
- Created: `wiki/concepts/handicap-index.md`
- Updated: `wiki/architecture/data-flow.md`, `wiki/index.md`
```

The consistent `## [YYYY-MM-DD]` prefix lets you grep the log with unix tools:
`grep "^## \[" wiki/log.md | tail -5`

## Project Context

Key facts the LLM should know (keep current):
- **Stack**: React 19, Vite 8, TypeScript 6, MUI 7, Firebase Auth + Firestore, Zustand
- **Node**: v22.14.0
- **Testing**: Vitest + custom golf calculation test framework in `src/dev-tools/`
- **Branch strategy**: `development` base, `feat/*` or `fix/*` branches, PRs target `development`
- **Naming**: `*.page.tsx`, `*.component.tsx`, `*.utils.tsx`, `*.hook.ts`, `*.types.ts`, `*.enum.tsx`
- **State**: Single Zustand store with persist middleware (localStorage key: `app-storage`)

## Relationships to Other Config Files

- **AGENTS.md** (project root): Instructs the LLM on coding tasks — build, run, test, branch strategy, conventions. The LLM follows AGENTS.md for code work.
- **OPENCODE.md** (this file): Instructs the LLM on wiki maintenance — ingest, query, lint. The LLM follows OPENCODE.md for documentation work.
- **They are complementary.** AGENTS.md handles the codebase; OPENCODE.md handles the knowledge base. Both can be active in the same session.
