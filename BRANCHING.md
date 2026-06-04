# Branching Strategy

## Branches

| Branch | Purpose | Lifecycle |
|--------|---------|-----------|
| `main` | Production releases | Protected. Only updated via `development` → `main` merge + tag. |
| `development` | Integration branch for active work | Phase 1 delivered here. Feature branches merge back here. |
| `feat/*` | New features | Branch from `development`, merge back via PR to `development`. |
| `fix/*` | Bugfixes | Branch from `development`, merge back via PR to `development`. |

## Release Flow

```
feat/* → PR → development → PR → main → tag v* → GitHub Actions deploys
```

1. Feature/fix branches merge into `development`
2. When enough features are ready, `development` merges into `main`
3. A semver tag (`v1.0.0`, `v1.1.0`, etc.) is created on `main`
4. GitHub Actions `deploy` workflow builds and deploys to Firebase Hosting automatically

## CI

- **Pull requests** to `development` or `main`: run type-check + build (`ci.yml`)
- **Tags** matching `v*`: run type-check + build + Firebase deploy (`deploy.yml`)

## Naming

- Feature branches: `feat/<short-description>` (e.g., `feat/whs-engine`)
- Bugfix branches: `fix/<short-description>` (e.g., `fix/infinite-loading-loop`)

## Per-commit convention

Prefix commit messages with the scope:
- `feat(xx):` — new feature work
- `fix(xx):` — bug fixes
- `docs(xx):` — documentation
- `chore(xx):` — tooling, CI, config, housekeeping

Where `xx` is the phase number (e.g., `feat(01):`, `fix(01):`).
