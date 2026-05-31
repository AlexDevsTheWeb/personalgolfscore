# Feature Research: WHS Golf Handicap Calculator & Course Database

**Domain:** WHS Golf Handicap Calculation, Course Database Management, Handicap Simulation
**Researched:** 2026-05-31
**Confidence:** HIGH — validated against TheGrint, 18Birdies, GolfPad, MyEG, GHIN, Arccos, Golfshot and WHS rulebook documentation

## Feature Landscape

### Table Stakes (Users Expect These)

These are features that every contender in the space provides. Missing any one of these means the app feels incomplete or non-viable for serious golfers.

| # | Feature | Why It's Expected | Complexity | Prevalence |
|---|---------|-------------------|------------|------------|
| 1 | **WHS Handicap Index calculation** — average of best 8 Score Differentials from last 20 rounds, with proper handling for fewer than 20 rounds (3-5 = 1, 6-8 = 2, 9-11 = 3, 12-14 = 4, 15-16 = 5, 17-18 = 6, 19 = 7) | Core value proposition; without it the app is just a scorecard | **Medium** — algorithmic but well-defined | 100% of competitors |
| 2 | **Score Differential calculation** — `SD = (AGS - CR - PCC) × (113 / SR)` with support for both gross score and Stableford input | Required for every round entered; the fundamental WHS building block | **Low** — single formula | 100% |
| 3 | **Adjusted Gross Score (AGS) from Stableford** — `AGS = PAR + Playing HCP + (36 - Stableford points)` | Many recreational golfers play Stableford; must convert to enter WHS | **Low** | 100% |
| 4 | **Course database with CR/SR/PAR per teebox** — at minimum storing course name, PAR, Course Rating, Slope Rating per tee color, per gender | Every round needs course difficulty data to calculate SD | **Medium** — data model and population | 100% |
| 5 | **Course search via autocomplete** — search courses by name while entering a round | Primary UX for round entry; without it users must manually type data each time | **Low-Medium** — Firestore query + debounce | 100% |
| 6 | **Round entry with hole-by-hole scoring or total score** — enter per-hole strokes, putts, penalties; or quick-enter total | Core data capture; "how do I add a round" is the first question | **Low** — form UX | 100% |
| 7 | **User can add a course not in the database** — if autocomplete fails, a dialog/courtesy form lets user enter CR/SR/PAR/tees for that course and saves to shared collection | No official database has every course; without this, users with niche courses are blocked | **Low-Medium** | TheGrint, 18Birdies, GHIN, MyEG |
| 8 | **Handicap history / trend view** — chart or list of HI over time showing direction of play | Users want to see progress; the #2 reason to track handicap after having the number | **Low** — chart component + data query | TheGrint, GHIN, GolfPad |
| 9 | **Course Handicap calculator** — `CR - PAR + HI × (SR/113)` to show strokes received at a specific course/tee for today | Needed for net scoring, competition prep, knowing "what do I get today" | **Low** — single formula | GHIN, MyEG, WHS Calc |
| 10 | **Playing Handicap calculator** — Course Handicap × competition allowance (95% for medal/Stableford, etc.) | Competition players need format-specific handicaps | **Low** | GHIN, MyEG, WHS Calc |
| 11 | **Round history list** — paginated list of past rounds with date, course, SD, HI impact | The "my rounds" view; basic expectation of any tracking app | **Low** | 100% |
| 12 | **Basic stats** — FIR%, GIR%, putts per round, average score, scoring vs par | Stats justify the data entry effort; most basic expectation after handicap | **Low-Medium** | 100% |
| 13 | **Net double bogey max score** — WHS rule: max hole score for handicap purposes is net double bogey; must be applied when computing SD from hole-by-hole data | WHS regulatory requirement; GHIN applies automatically | **Medium** — needs hole-by-hole data, stroke index per hole, and course handicap | GHIN, MyEG, GHIN-linked apps |
| 14 | **Tee box selection during round entry** — user picks which tee (color) they played from, which determines CR/SR/PAR | Without this the SD calculation can't be correct | **Low** | 100% |

### Differentiators (Competitive Advantage)

Features that set a product apart. Not table stakes, but valued by segments of users.

| # | Feature | Value Proposition | Complexity | Who Has It | Our Priority |
|---|---------|-------------------|------------|------------|-------------|
| 1 | **Handicap Simulator** — dedicated "what-if" tab where user inputs hypothetical Stableford score and sees current HI vs projected HI | Unique competitive moat for a calculator app; lets users gamify improvement; no major competitor offers this as a *standalone feature* (GolfPad has rough equivalent, TheGrint doesn't) | **Medium** — virtual array (last 19 real + 1 simulated), no DB writes | None as dedicated feature (CaddieCalc web tool only) | **HIGH — key differentiator** |
| 2 | **Inline handicap preview during round entry** — before saving, show "this round will change your HI from X to Y" | Immediate feedback loop; reduces surprise, increases engagement | **Low-Medium** — run same calc as simulator but during entry flow | None widely | **HIGH** |
| 3 | **Federgolf course data import** — admin-button-triggered import of Italian course data from https://www.federgolf.it/attivita-agonistica/servizi-online/tabella-slope-course-rating/ | Critical for Italian market; without this, users must manually enter courses | **Medium** — HTML parsing or API discovery needed | No competitor has this (Federgolf-specific) | **HIGH — Italian market necessity** |
| 4 | **Admin course management** — admin users can edit/delete courses, merge duplicates, correct CR/SR errors | Crowd-sourced course data inevitably has errors; admin tools keep database trustworthy | **Medium** — admin auth + CRUD UI + moderation queue | GHIN (federation-managed) | **HIGH** |
| 5 | **Pre-filled course data from national rating database** — auto-populate CR/SR/PAR for known courses instead of requiring manual input | Reduces friction for course entry; makes the shared DB more valuable | **Medium-High** — needs source data (USGA NCRDB, Federgolf, etc.) | TheGrint, 18Birdies (40k+ courses), GHIN | **MEDIUM** |
| 6 | **Soft cap / Hard cap** — WHS safeguard: HI cannot rise more than 3.0 (soft cap) or 5.0 (hard cap) above lowest HI in last 12 months | WHS compliance; official handicap apps must implement this | **Low-Medium** | GHIN, MyEG, official systems | **MEDIUM** (required if claiming official calculation) |
| 7 | **Exceptional Score Reduction** — WHS safeguard: if a SD is 7+ strokes below the player's HI on that day, additional reduction applies | WHS compliance for official calculations | **Medium** — need to track HI on day of play per round | GHIN, official systems | **MEDIUM** |
| 8 | **9-hole round combination** — two 9-hole rounds can be combined into an 18-hole equivalent for handicap purposes | WHS allows this; casual players often play 9 holes | **Low** | GHIN, MyEG, GolfPad | **MEDIUM** |
| 9 | **Handicap Index lookup** — search any player's HI by name/email/GHIN# | Social/competitive utility; lets you check opponents' handicaps before a match | **Low** — GHIN API integration | TheGrint (GHIN/GHAP lookup), GHIN | **LOW** (requires federation partnership) |
| 10 | **Scorecard picture service** — take photo of paper scorecard, OCR auto-fills hole scores | High convenience for users who keep paper scorecards; reduces data entry friction | **High** — OCR/computer vision, human-in-loop validation | TheGrint Pro | **LOW** (not web-SPA compatible) |
| 11 | **Per-hole stats breakdown** — stats per hole index (e.g., scoring average on hole index 1-18) | Deeper analytics for serious golfers | **Medium** | GolfPad, TheGrint Pro | **LOW** |
| 12 | **Shot tracking (GPS / manual)** — track club used, direction, distance for each shot | Hardcore golfers want strokes-gained data | **High** — requires GPS, swing detection, or manual entry | Arccos, 18Birdies, GolfPad | **LOW** (not in scope) |
| 13 | **Tournament / competition scoring** — live leaderboard, skins, Stableford, match play calculation | Group play utility | **Medium-High** | TheGrint, 18Birdies | **LOW** (not in scope) |
| 14 | **Social / friends feed** — see friends' rounds, comment, compare | Community stickiness | **Medium** | TheGrint, 18Birdies | **LOW** |
| 15 | **Handicap revision history with per-round impact** — show which specific rounds are currently in the best-8, and how each new round would replace an old one | Transparency; users want to understand *why* their HI changed | **Low-Medium** | MyEG (partial), none comprehensively | **MEDIUM** |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem valuable but are strategically wrong to build.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|--------------|-----------|-------------------|
| 1 | **Built-in GPS rangefinder** | Requires native mobile app with background location services; impossible in web SPA. Even web-based geolocation API is insufficient for golf-course-level accuracy (sub-meter needed). Massively complex for limited value. | The app is a web SPA, not a mobile app. Accept this constraint. |
| 2 | **AI swing analysis (video-based)** | Entirely different product category (Arccos, 18Birdies AI Coach). Requires computer vision, ML models, mobile camera access. Zero overlap with handicap calculation. | Link to/endorse third-party swing analysis tools. |
| 3 | **Automatic shot tracking with hardware** | Requires Arccos-style sensors in club grips or wearable. Hardware dependency, supply chain, support nightmare. Not viable for a web app. | Let users manually enter shot data if they want; focus on handicap calculation. |
| 4 | **Full tournament/league management** | Product scope creep. Requires group management, scheduling, points calculation, payment processing (for entry fees). This is Golf Genius's entire business. | Keep social features minimal; focus on individual handicap tracking. |
| 5 | **Playing Conditions Calculation (PCC)** | Officially marked **Out of Scope** in PROJECT.md. PCC requires analyzing ALL scores posted at a course on a given day to detect abnormal conditions. Needs massive user base + federation data access. Rarely applied (typically 0). | Always set PCC = 0, as documented. |
| 6 | **Automated scheduled Federgolf sync** | Cron job infrastructure, Federgolf may change their page structure, legal concerns about automated scraping. Documented as Out of Scope in PROJECT.md. | Admin-button-triggered import only. |
| 7 | **EGA / pre-WHS legacy handicap conversion** | WHS launched November 2020; legacy systems (CONGU, EGA, USGA pre-2020) are obsolete. Complexity of supporting multiple calculation engines is high for diminishing user base. | Support WHS only (post-2020), as documented. |
| 8 | **Native mobile app (iOS/Android)** | Would require building + maintaining two native codebases, app store submissions, push notification infrastructure, offline-first architecture. Current app is a web SPA. | Keep web-only, as documented. Responsive design for mobile browser use. |
| 9 | **Weather/atmospheric adjustment** | Arccos does this with AI, requiring massive shot database. Simple formulas are inaccurate. Adds complexity with minimal value for handicap calculation (WHS doesn't adjust for weather per round). | Don't attempt; WHS handles this via PCC (which is 0). |
| 10 | **Strokes Gained analytics** | Requires per-shot location data (GPS coordinates for each shot relative to hole). TheGrint Pro and Arccos have this but need native GPS tracking. Meaningless without shot-level data collection. | Traditional stats (FIR, GIR, putts, penalties) provide sufficient value. |
| 11 | **Booking/tee time integration** | Entirely separate domain. Would need partnerships with courses, booking APIs, payment processing. No overlap with handicap tracking. | Focus on what happens *after* the round, not before. |
| 12 | **Golf course review/rating system** | User reviews of courses are a separate product (Google Maps for golf). Moderation burden, spam, legal liability. | Let users rate only factual course data accuracy (e.g., "CR/SR seems wrong"). |

### Feature Dependencies

```
COURSE DATABASE (golf_courses collection)
├── Course search autocomplete ───────────────────────── ROUND ENTRY
│       └── depends on: populated golf_courses collection
├── Add course dialog ────────────────────────────────── ROUND ENTRY
│       └── populates: golf_courses collection
├── Admin course CRUD ────────────────────────────────── ADMIN
│       └── requires: Firebase custom claims (admin role)
└── Federgolf import ─────────────────────────────────── ADMIN
        └── requires: Firebase custom claims (admin role)
        └── depends on: golf_courses collection write access

WHS CALCULATION ENGINE
├── Score Differential (SD) ──────────────────────────── ALL DOWNSTREAM
│       ├── depends on: AGS calculation from Stableford (or direct gross score)
│       ├── depends on: CR, SR, PAR from course database
│       └── depends on: Playing Handicap from user profile
├── Handicap Index (HI) ─────────────────────────────── DASHBOARD
│       ├── depends on: last 20 SDs from rounds collection
│       └── depends on: net double bogey adjustments on hole-by-hole scores
└── Soft cap / Hard cap ──────────────────────────────── HI CALCULATION
        └── depends on: lowest HI in last 12 months

ROUND ENTRY FLOW
├── Course selection (autocomplete or add) ──────────── MANDATORY STEP
├── Tee box selection ────────────────────────────────── MANDATORY STEP
├── Score input (hole-by-hole or total) ──────────────── MANDATORY STEP
├── Inline HCP preview ───────────────────────────────── UI STEP
│       └── depends on: SD calculation + temporary HI projection
└── Save round + update HI ──────────────────────────── FINAL STEP
        └── writes: rounds collection
        └── writes: user's current HI on profile

SIMULATOR
├── Course/tee selection ─────────────────────────────── SAME AS ROUND ENTRY
├── Hypothetical score input ─────────────────────────── INDEPENDENT
└── Projected HI display ────────────────────────────── RESULT
        └── depends on: virtual array (last 19 real + 1 simulated)
        └── depends on: SD calculation + best-8 averaging
        └── NO writes to database
```

## MVP Definition

Based on the competitive landscape and project constraints (web SPA, Italian market, existing codebase), here is the recommended MVP:

### Must Have (Ship 1)
1. **Course database** (`golf_courses` collection) with CR/SR/PAR per teebox per gender
2. **Course autocomplete** search component
3. **Add course dialog** for user-contributed courses
4. **Score Differential calculation** from Stableford input
5. **WHS Handicap Index calculation** (best 8 of last 20, with fewer-rounds scaling)
6. **Round entry flow** with course selection → tee selection → score input → save
7. **Inline handicap preview** during round entry (before save, show projected impact)
8. **Round history list** with SD and HI per round

### Should Have (Ship 2)
9. **Admin course CRUD** (view, create, edit, delete)
10. **Federgolf course import** (admin button)
11. **Dedicated Simulator tab** (what-if Stableford projection)
12. **Handicap trend chart** (HI over time)
13. **Basic stats** (FIR%, GIR%, putts/hole, scoring average)

### Nice to Have (Ship 3+)
14. Soft cap / Hard cap implementation
15. Exceptional Score Reduction
16. 9-hole round combination
17. Per-round HI impact breakdown (which rounds are in the best 8)
18. Course Handicap calculator helper tool
19. Pre-filled course data from Federgolf / known sources

### Not in MVP (Deferred or Out of Scope)
- GPS rangefinder
- Shot tracking
- Tournament scoring
- Social features
- PCC (always 0)
- Native mobile apps

### Key MVP Rationale

The **handicap simulator** (differentiator #1) is the strongest competitive moat and should ship in Ship 1 or early Ship 2 — no major competitor offers this as a dedicated feature. The **inline handicap preview** during round entry is a low-cost variant that should ship in Ship 1 alongside core round entry. Together they form a "what-if + immediate feedback" loop that no other golf app provides in a web context.

The **Federgolf import** is not optional for the Italian market — without pre-loaded course data, users must manually enter courses, which is a significant adoption barrier. This should be prioritized alongside the admin tools.

## Sources

- **TheGrint** — App Store page, thegrint.com product features, handicap lookup tool. Confidence: HIGH (verified against live app store listing and official website).
- **18Birdies** — 18birdies.com product page, App Store listing, Smart Tracking announcement (Aug 2025). Confidence: HIGH.
- **GolfPad GPS** — golfpadgps.com features, App Store listing. Confidence: HIGH.
- **MyEG (England Golf)** — App Store listing, englandgolf.org MyEG app features, National Club Golfer article (Apr 2024). Confidence: HIGH.
- **GHIN Mobile** — USGA GHIN app features, NCGA blog posts (2025-2026), Google Play listing. Confidence: HIGH.
- **Arccos** — Arccos Golf app features, arccosgolf.com product pages, Apple Watch companion. Confidence: HIGH.
- **USGA WHS Rules** — usga.org/handicapping, Rules of Handicapping (2024 revision), Course Rating and Slope Database. Confidence: HIGH (primary source).
- **WHS Handicap Index Calculation** — usga.org WHS topics page (accessed 2026-05-31). Confidence: HIGH.
- **Golf Insider Best Golf Handicap App (2025-06-18)** — Comparative review of handicap apps. Confidence: MEDIUM (third-party review).
- **Golf Monthly Best GPS Apps (2026-02-02)** — Competitive landscape. Confidence: MEDIUM.
- **CaddieCalc Handicap Progress Predictor** — Example of what-if simulator. Confidence: MEDIUM (shows market gap).
- **intelligentgolf WHS Calculations** — Detailed WHS formula reference for UK vs ROW differences. Confidence: HIGH.
