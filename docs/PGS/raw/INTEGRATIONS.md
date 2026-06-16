# External Integrations

**Analysis Date:** 2026-05-17

## APIs & External Services

**Firebase:**
- Firebase Auth - Authentication provider
  - SDK: `firebase` (v12.11.0)
  - Implementation: `src/utils/firebase/firebase.utils.tsx`
  - Auth methods: Google OAuth, Email/Password
  - Config via environment variables (see below)

- Firebase Firestore - NoSQL database
  - SDK: `firebase/firestore`
  - Implementation: `src/utils/firebase/firebase.utils.tsx`
  - Used for: Player data, rounds, clubs, settings

**HTTP Client:**
- Axios 1.14.0 - External API calls
  - Config: Not detected in codebase
  - Usage: Likely for future integrations or data sync

**No other external APIs detected** - App is self-contained with Firebase backend.

## Data Storage

**Database:**
- Firebase Firestore
  - Collections: `players`, `rounds` (inferred from code)
  - Connection: Configured via Firebase SDK
  - Client: Firebase Firestore SDK

**File Storage:**
- Firebase Storage (implied via Firebase config)
  - `VITE_APP_STORAGE_BUCKET` env var
  - Used for: User profile photos (see `photoURL` updates)

**Caching:**
- localStorage via Zustand persist middleware
  - Storage key: `app-storage`
  - Persisted: Theme preference, player data, clubs, rounds, round details

## Authentication & Identity

**Auth Provider:**
- Firebase Authentication
  - Implementation: `src/components/LoginForm/components/GoogleLoginButton.component.tsx`
  - Provider: Google OAuth via `GoogleAuthProvider`
  - Email/Password: `src/utils/firebase/firebaseLogin.utils.tsx`
  - User state: Managed via Zustand store (`useAppStore`)

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Console logging only (`console.log`, `console.error`)
- No external logging service

**Performance:**
- Web Vitals 5.2.0
  - Config: `src/reportWebVitals.ts`
  - Reports: CLS, FID, FCP, LCP, TTFB

## CI/CD & Deployment

**Hosting:**
- Not detected in codebase
- Likely: Firebase Hosting (given Firebase integration)

**CI Pipeline:**
- None detected in codebase

## Environment Configuration

**Required env vars:**
- `VITE_APP_API_KEY` - Firebase API key
- `VITE_APP_AUTH_DOMAIN` - Firebase auth domain
- `VITE_APP_PROJECT_ID` - Firebase project ID
- `VITE_APP_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_APP_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_APP_APP_ID` - Firebase app ID
- `VITE_APP_MEASUREMENT_ID` - Firebase measurement ID

**Secrets location:**
- `.env` file (not committed to git)
- Loaded via `import.meta.env` in `src/utils/firebase/firebase.utils.tsx`

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

---

*Integration audit: 2026-05-17*