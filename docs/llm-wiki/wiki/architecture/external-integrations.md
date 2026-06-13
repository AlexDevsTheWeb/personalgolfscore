---
title: External Integrations
tags: [architecture, integrations, firebase]
created: 2026-06-13
updated: 2026-06-13
sources: [INTEGRATIONS.md]
---

# External Integrations

## Firebase

- **Firebase Auth** — Authentication via Google OAuth and Email/Password
  - SDK: `firebase` v12.11.0
  - Implementation: `src/utils/firebase/firebase.utils.tsx`
  - Google OAuth: `src/components/LoginForm/components/GoogleLoginButton.component.tsx`
  - Email/Password: `src/utils/firebase/firebaseLogin.utils.tsx`
  - Admin roles via Firebase custom claims (`{ admin: true }` on auth token) — set/revoked via Firebase Admin SDK

- **Firebase Firestore** — NoSQL database for all app data
  - Collections: `players`, `players/{uid}/rounds`, `players/{uid}/rounds/{roundId}/holes`, `golf_courses`
  - Connection via Firebase SDK
  - Admin custom claims checked in security rules for `golf_courses` write access

- **Firebase Storage** — For user profile photos (`photoURL` updates)

## Federgolf (Italian Golf Federation)

- **FIG Course Import** — `src/utils/firestore/federgolf-import.utils.ts`
  - Fetches HTML from the Italian Golf Federation website
  - Parses course data into `ICourse` documents
  - Writes to Firestore in batches
  - Includes CORS proxy fallback
  - Uses `axios` (already installed) for HTTP

## OpenRouter (AI Agent System)

- **OpenRouter API** — AI model access for the nightly two-agent pipeline
  - Model: `deepseek/deepseek-r1` (configurable)
  - Usage: LLM wiki updates (Agent 1: Dreamer) and regression test generation (Agent 2: QA Guard)
  - Endpoint: `https://openrouter.ai/api/v1/chat/completions`
  - Auth: Bearer token via `OPENROUTER_API_KEY` GitHub secret
  - Trigger: Scheduled nightly via GitHub Actions

## GitHub Actions (CI/CD)

- **CI**: Pull request validation (`ci.yml`) — type-check + build on PR to `development`/`main` and push to `development`
- **Deploy**: Tag-based deployment (`deploy.yml`) — Firebase Hosting deploy on `v*` tags
- **Nightly AI Agent**: Two cascading workflows (`nightly-reflection.yml` → `nightly-qa-cascade.yml`) for autonomous wiki and test maintenance

## Environment Configuration

All Firebase credentials loaded from `.env` via `import.meta.env`:

| Variable | Purpose |
|---|---|
| `VITE_APP_API_KEY` | Firebase API key |
| `VITE_APP_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_APP_PROJECT_ID` | Firebase project ID |
| `VITE_APP_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_APP_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_APP_APP_ID` | Firebase app ID |

## Related Pages

- [System Overview](system-overview.md)
- [Data Flow](data-flow.md)
- [Firestore Schema](firestore-schema.md)
