# Domain Pitfalls: WHS Golf Handicap Calculator & Course Database

**Domain:** WHS Golf Handicap Calculator, Course DB, Admin Panel  
**Researched:** 2026-05-31  
**Confidence:** HIGH (verified against official WHS rules, Firebase docs, and community post-mortems)

---

## Critical Pitfalls

### Pitfall 1: Using Gross Score Instead of Adjusted Gross Score (AGS)

**What goes wrong:** The Score Differential formula uses AGS (Adjusted Gross Score), not the player's actual gross score. When the formula is fed raw gross scores without applying Net Double Bogey (NDB) adjustments, the SD is inflated for rounds with blow-up holes, producing an artificially high Handicap Index.

**Why it happens:** Developers see `SD = (AGS - CR - PCC) × (113 / SR)` and assume AGS = gross score. They miss the pre-processing step: each hole's score must be capped at Net Double Bogey before summing into AGS.

**Official WHS Rule (Rule 3.1, Rules of Handicapping):** Maximum hole score = Par + 2 + handicap strokes received on that hole. For new players establishing an initial HI, the max is Par + 5.

**How to avoid:**
- Implement a `calculateAGS(holeScores, courseHandicap, parByHole, strokeIndexByHole)` utility that applies NDB per hole.
- The Course Handicap itself requires a conversion: `CH = HI × (SR / 113) + (CR - Par)`. This creates a circular dependency for new players — handle by using Par + 5 max for initial rounds.
- Validate with known examples: Par 72, CR 70.8, SR 128, HCP 14 → AGS for a 10 on Par 4 with 1 stroke received = capped at 7, not 10.

**Warning signs:** SD values that seem unreasonably high for mid-handicap players; calculated HI consistently higher than official GHIN estimates.

**Phase to address:** Handicap Calculator implementation phase.

---

### Pitfall 2: Score Differential Rounding — Minus Differentials Round UP Toward Zero

**What goes wrong:** Standard rounding (0.5 rounds up) does NOT apply to negative Score Differentials. The WHS rule (Rule 5.1c) specifies that minus differentials round toward zero. This means:
- -1.54 → -1.5 (normal)
- -1.55 → -1.5 (NOT -1.6! Zero-toward rounding)
- -1.56 → -1.6 (normal, because .56 > .5)

**Why it happens:** The rounding rule for negative numbers is unusual — most programming languages' `Math.round()` uses "round half away from zero" or "round half up" behavior, which gives different results for negative .5 values. `Math.round(-1.55)` in JavaScript gives `-1` (integer), and `(-1.55).toFixed(1)` gives `"-1.5"` in some engines and `"-1.6"` in others depending on the implementation.

**How to avoid:** Implement custom rounding:
```typescript
function roundSD(value: number): number {
  const rounded = Math.abs(value).toFixed(2); // work with absolute
  // Use custom logic: for .55 exactly, round toward zero
  const abs = Math.abs(value);
  const truncated = Math.floor(abs * 10) / 10;
  const remainder = abs * 100 - truncated * 10;
  const result = remainder > 5 ? truncated + 0.1 : truncated;
  return value >= 0 ? result : -result;
}
```
Better: verify behavior with the Firestore emulator and unit tests against official WHS examples.

**Warning signs:** HI discrepancies of 0.1 for players with negative differentials (sub‑CR rounds); failing official validation examples.

**Phase to address:** Handicap Calculator — SD calculation unit.

---

### Pitfall 3: Best-8 Selection from Wrong Set of 20 (Rolling Window Errors)

**What goes wrong:** When calculating HI from the best 8 of the last 20 SDs, there are two distinct errors:
1. **Not limiting to exactly 20:** Using all scores (more than 20) instead of the most recent 20.
2. **Incorrect rolling window:** After a new round, the oldest round (by date) should be removed, not the worst-performing one. The best 8 are then re-selected from the updated 20.
3. **Missing less-than-20 table:** When the player has fewer than 20 SDs, a specific table determines how many SDs to use and whether an adjustment applies (Rule 5.2a).

**Why it happens:** The "best 8 of last 20" heuristic is well-known, but implementers miss:
- The sliding scale for < 20 rounds (e.g., 3 rounds → lowest 1 minus 2.0; 10 rounds → lowest 3; etc.)
- That a new good SD can cause an increase in HI (if it displaces an even better older SD)
- That the 20-round limit means old scores are *discarded*, not kept forever

**WHS Rule 5.2a Table:**
| SDs in record | Use | Adjustment |
|---|---|---|
| 3 | Lowest 1 | −2.0 |
| 4 | Lowest 1 | −1.0 |
| 5 | Lowest 1 | 0 |
| 6 | Lowest 2 (avg) | −1.0 |
| 7–8 | Lowest 2 (avg) | 0 |
| 9–11 | Lowest 3 (avg) | 0 |
| 12–14 | Lowest 4 (avg) | 0 |
| 15–16 | Lowest 5 (avg) | 0 |
| 17–18 | Lowest 6 (avg) | 0 |
| 19 | Lowest 7 (avg) | 0 |
| 20+ | Lowest 8 (avg) | 0 |

**How to avoid:**
- Maintain a capped array of exactly 20 SDs (most recent by date).
- Implement the full table for < 20 rounds, not just the "best 8" formula.
- When a new round is added: remove the oldest, re-sort all 20, select lowest 8.
- Unit test: verify that a good round can cause HI to increase (counterintuitive but correct).
- Unit test: verify 3-round scenario produces `best1 - 2.0`.

**Warning signs:** Player with 8 rounds has HI calculated as average of best 8 (should be best 2); HI never increases after a good round.

**Phase to address:** Handicap Index calculation unit.

---

### Pitfall 4: Missing Soft/Hard Cap and Exceptional Score Reduction

**What goes wrong:** The Handicap Index calculation doesn't stop there. After averaging the best 8, WHS imposes safeguard mechanisms that many implementations omit:

1. **Low Handicap Index tracking:** The lowest HI in the past 365 days must be tracked.
2. **Soft Cap:** If (new HI − Low HI) > 3.0, the excess above 3.0 is restricted to 50%.
3. **Hard Cap:** After soft cap, the total increase cannot exceed 5.0 above Low HI.
4. **Exceptional Score Reduction:** If a new SD is 7.0+ strokes below the current HI, an automatic reduction is applied (table-based, −1.0, −2.0, etc. depending on how many strokes below).

**Why it happens:** Most tutorials only cover the "average best 8" part. The caps and exceptional score reduction are buried in Rule 5.7 and 5.8 of the official Rules of Handicapping. Many commercial apps got this wrong at WHS launch in 2020.

**How to avoid:**
- Store `lowHandicapIndex` and `lowHandicapIndexDate` on the player's handicap record.
- After calculating raw HI from best 8, apply: soft cap check → hard cap check → exceptional score check.
- Implement the exceptional score reduction table from Rule 5.8:

| SD vs HI at time of play | Reduction |
|---|---|
| 7.0–9.9 below | −1.0 |
| 10.0+ below | −2.0 |

**Warning signs:** Player's HI increases by 8 strokes after a layoff (cap should limit to +5); player shoots 65 and HI barely moves.

**Phase to address:** Handicap Index calculation — post-processing safeguards.

---

### Pitfall 5: Course Handicap & Playing Handicap Confusion

**What goes wrong:** The Handicap Index (HI) is a "portable number" — it is NOT the number of strokes a player receives on a course. Implementations that use HI directly for NDB calculations or display it as "strokes" are wrong.

**The correct formulas:**
- **Course Handicap:** `CH = HI × (SR / 113) + (CR - Par)` — this is the number of strokes for the specific tees being played.
- **Playing Handicap:** In competition formats, this is further adjusted (e.g., 95% for individual stroke play).
- **NDB uses CH**, not HI. To determine how many strokes a player gets on each hole, you need the hole's Stroke Index and the CH.

**Why it happens:** Developers skip the CR-Par adjustment and just use HI directly. This gives correct results only when CR = Par, which is uncommon.

**How to avoid:**
- Clearly separate the concepts in the code: `handicapIndex` (stored on player), `courseHandicap` (computed per round), `holeStrokes` (distributed per SI).
- The NDB calculation must use courseHandicap, not handicapIndex.
- Store CR and Par alongside SR in the course data.

**Warning signs:** Players report that their max score per hole doesn't match what they'd expect from their home club; playing handicap shown as exactly their HI.

**Phase to address:** Handicap Calculator — Course Handicap conversion.

---

### Pitfall 6: 9-Hole Score Handling (2024 WHS Revision)

**What goes wrong:** The 2024 WHS revisions changed how 9-hole scores are handled. They now use an "expected score" approach rather than combining two actual 9-hole scores. Many resources and tutorials still show the old method.

**Current (2024+) WHS Rule (Rule 5.1b):**
1. Calculate a 9-hole SD: `9-SD = (113 ÷ 9-hole SR) × (9-hole AGS − 9-hole CR − (0.5 × PCC))`
2. Combine with expected score based on player's HI: `18-SD = 9-SD + expected 9-hole SD (from HI)`
3. Round to nearest tenth.

Additionally, for initial handicaps (first scores ever), 9-hole scores ARE still combined with another actual 9-hole score (this is the only exception).

**Why it happens:** The rule changed in 2024. Training data and older blog posts describe the old "combine two 9s" approach.

**How to avoid:**
- Check the date of any resource describing 9-hole handling.
- Implement the 2024 rules: expected score for established handicaps, combine-two-9s for initial handicaps only.
- Store metadata flagging whether a score is 9-hole or 18-hole.

**Warning signs:** 9-hole scores produce wildly different HI than expected; the app uses the "combine two 9-holes" method documented in pre-2024 sources.

**Phase to address:** Handicap Calculator — 9-hole support (phase after core 18-hole).

---

### Pitfall 7: Firestore — Public Write Access Without Validation Leads to Course Spam

**What goes wrong:** The `golf_courses` collection needs "any authenticated user can create" (because players add missing courses). Without strict Security Rules validation, a malicious user can:
- Create thousands of bogus courses (costing read/write charges)
- Insert courses with deliberately wrong CR/SR/PAR values
- Overwrite existing courses (if update is not properly restricted)

**Why it happens:** It's tempting to write a wide open rule like:
```
match /golf_courses/{course} {
  allow read: if true;
  allow create: if request.auth != null;
}
```
This is Firebase's "authenticated users can write" anti-pattern — it allows any logged-in user to create unlimited documents without validation.

**How to avoid:**
Use role-gated rules with data validation:
```
match /golf_courses/{course} {
  allow read: if true;
  allow create: if request.auth != null
    && request.resource.data.name is string
    && request.resource.data.name.size() > 0
    && request.resource.data.name.size() < 200
    && request.resource.data.par is number
    && request.resource.data.par >= 27
    && request.resource.data.par <= 77
    && request.resource.data.cr is number
    && request.resource.data.cr >= 27.0
    && request.resource.data.cr <= 80.0
    && request.resource.data.sr is number
    && request.resource.data.sr >= 55
    && request.resource.data.sr <= 155
    && request.resource.data.createdBy == request.auth.uid;
  allow update, delete: if request.auth.token.admin == true;
}
```
Also add a rate-limit mechanism via a Cloud Function or a `recentCreations` subcollection per user.

**Warning signs:** 5000 courses in the database within an hour; courses with PAR=999 or SR=1.

**Phase to address:** Firestore security rules + course CRUD.

---

### Pitfall 8: Firestore — Cannot Natively Enforce Unique Course Names

**What goes wrong:** The course database should not have duplicate entries for the same course/tees. But Firestore has no built-in uniqueness constraint across documents in a collection. Without enforcement, users searching "Augusta National" might see 12 similar entries.

**Why it happens:** Firestore's security rules cannot check "does a document with this field value already exist in this collection?" because the `get()` and `exists()` functions only work with document paths, not queries. Checking all documents in a collection would be prohibitively expensive.

**How to avoid:**
Pattern 1 (recommended): Use the course name (slugified) as the document ID. This provides natural uniqueness:
```
match /golf_courses/{courseId} {
  allow create: if request.auth != null
    && !exists(/databases/$(database)/documents/golf_courses/$(courseId));
}
```
But this only works if course ID = name. For multi-tee courses (same course, different tees), use compound IDs: `augusta-national-blue`, `augusta-national-white`.

Pattern 2: Use a separate `course_names` collection as a uniqueness index, with document IDs = course name slugs. Create via batch write alongside the course document.

Pattern 3: Post-validation via Cloud Function — detect duplicates and merge or flag them. Accepts temporary duplicates.

**Warning signs:** Search autocomplete returns multiple identical-looking results; users create "Augusta National" when "Augusta National GC" already exists.

**Phase to address:** Course database creation phase.

---

### Pitfall 9: Firestore — Security Rules Are Not Query Filters

**What goes wrong:** This is a well-documented Firestore gotcha. If a Security Rule restricts read access (e.g., `allow read: if resource.data.visibility == 'public'`), a query that doesn't explicitly filter on `visibility == 'public'` will FAIL — even if all matching documents happen to be public.

For the golf course DB with mixed public/private data, this means:
- A query like `collection('golf_courses').get()` will fail if the rule requires a specific condition
- The query must include `where('field', '==', value)` that matches the rule's condition

**Why it happens:** Firestore evaluates queries against the *potential* result set, not actual results. If a query *could* return documents the user shouldn't see, it's rejected.

**How to avoid:**
If courses are fully public (read: true), this isn't a problem — a blanket `allow read: if true` on `golf_courses` won't have this issue. But for any collection with conditional read access, the client query MUST include the same conditions as the rule.

For admin-only collections (e.g., a `course_audit_log`), use a separate collection with explicit admin-only rules and don't attempt to have mixed-access collections.

**Warning signs:** Firestore permission-denied errors when reading a collection that has rows the user could access; queries that work in the console fail in the app.

**Phase to address:** Security rules implementation.

---

### Pitfall 10: Custom Claims Staleness — Admin Promotion Doesn't Take Effect Immediately

**What goes wrong:** When an admin is promoted via Firebase Admin SDK's `setCustomUserClaims()`, the change propagates to the user's ID token only after:
1. The current token expires (up to 1 hour), OR
2. The user signs out and back in, OR
3. The client calls `getIdToken(true)` to force refresh

This means: a user who is made an admin cannot access admin features for up to an hour, and a user who is *demoted* from admin still has admin access for up to an hour — a security window.

**Why it happens:** Firebase Auth caches ID tokens on the client. Custom claims are in the token. The token refresh interval is designed to reduce network calls, not for instant propagation.

**How to avoid:**
- On the admin panel (the tool that promotes/demotes users), trigger a client-side token refresh: `await currentUser.getIdToken(true)`.
- Better: Use the Firestore+Cloud Functions mirror pattern (Doug Stevenson pattern). Store admin status in a Firestore document (e.g., `admins/{uid}`), have a Cloud Function mirror it to custom claims, AND have the client listen to the Firestore document for changes to trigger a token refresh.
- For security-sensitive demotion: In addition to clearing the custom claim, use Firebase Admin SDK to revoke refresh tokens for the demoted user: `admin.auth().revokeRefreshTokens(uid)`. This forces re-authentication.

**Warning signs:** After making a user admin in the console, they report they can't access admin features for "about an hour."

**Phase to address:** Admin panel — custom claims management.

---

### Pitfall 11: Permission Escalation via Client-Side Only Protection

**What goes wrong:** The admin panel routes are protected in React Router, but a user with browser DevTools can:
1. Find the admin page component code
2. Modify the protected route check in memory
3. Access the admin UI
4. The UI then calls Firestore — if the Security Rules don't also gate on custom claims, the user can write to admin-only collections

This is not theoretical — the Tea app hack (2025) followed exactly this pattern: client-side auth checks with no backend enforcement.

**Why it happens:** All React code runs in the user's browser. Any check in JavaScript can be bypassed by modifying the code at runtime. The real security must be in Firestore Security Rules and/or Cloud Functions.

**How to avoid:**
- **Never** rely on route guards alone. They are cosmetic UX, not security.
- Always gate Firestore writes on `request.auth.token.admin == true` for admin operations.
- For admin-only Cloud Functions, verify `context.auth.token.admin === true` at the start of each function.
- For extra protection: use `request.auth.token.email` verified domain checks for high-value operations.

```
// Firestore rule: admin-only write to courses
match /golf_courses/{course} {
  allow update, delete: if request.auth.token.admin == true;
  allow create: if request.auth != null;  // any authenticated user
}
```

**Warning signs:** Admin panel routes check `isAdmin` but Firestore rules don't also check; admin panel checks use a Firestore document field (`user.isAdmin`) that the user could write to themselves.

**Phase to address:** Admin + security rules implementation.

---

### Pitfall 12: Course Autocomplete — Firestore Read Costs and UX

**What goes wrong:** A naive course search that fires a Firestore query on every keystroke causes:
1. **High costs:** Every keystroke = a Firestore read (charged per document even if the query returns no results).
2. **Sluggish UX:** Firestore queries have latency. An unoptimized autocomplete feels laggy.
3. **Rate limiting:** At scale, Firestore may throttle frequent queries.

**Why it happens:** Developers implement autocomplete with `onChange → query Firestore` without debouncing, caching, or pagination.

**How to avoid:**
- Debounce the input: wait 300ms after the last keystroke before querying.
- Minimum query length: don't query until 3+ characters entered.
- Client-side cache: cache results in Zustand (or similar) to avoid re-querying same terms.
- Consider a `name_lower` field for case-insensitive search: `.where('name_lower', '>=', prefix).where('name_lower', '<', prefix + '~')`.
- Limit results: `.limit(10)` to prevent large result sets.

```typescript
// Debounced autocomplete hook
function useCourseSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery.length < 3) return;
    const q = query(
      collection(db, 'golf_courses'),
      where('name_lower', '>=', debouncedQuery.toLowerCase()),
      where('name_lower', '<', debouncedQuery.toLowerCase() + '~'),
      orderBy('name_lower'),
      limit(10)
    );
    // ...subscribe or getDocs
  }, [debouncedQuery]);
  
  return { query, setQuery, results };
}
```

**Warning signs:** Autocomplete fires a Firestore request on every character; typing lags behind input; Firebase console shows high read counts for the courses collection.

**Phase to address:** Round entry UI — course autocomplete.

---

### Pitfall 13: Non-Existent Course Flow — Creating Mid-Round Creates UX Friction

**What goes wrong:** A user enters a round, searches for their course, can't find it, and needs to create it. If this flow requires leaving the round entry form, opening a dialog, filling form fields, saving, then returning to the round form — they'll abandon the process.

**Why it happens:** The course creation logic is treated as a separate CRUD operation rather than an inline part of the round-entry flow.

**How to avoid:**
- Embed course creation as a dialog *within* the round entry flow, not as a redirect.
- Pre-fill the course name from the autocomplete search term.
- Show only essential fields in the creation dialog (name, PAR, CR, SR) — defer teebox details, images, etc.
- Auto-select the newly created course for the round after save.
- Re-query the autocomplete source after creation so the new course appears in subsequent searches.

**Warning signs:** Users start typing "my local course" then give up when they can't find it and have to navigate away.

**Phase to address:** Round entry UI — course selection + creation flow.

---

### Pitfall 14: Simulator Mutates Real Round Data

**What goes wrong:** The simulator tab takes the user's last 19 real rounds and adds 1 simulated round to show projected HI. If the code accidentally persists the simulated round (or modifies an existing round's SD), the user's real handicap is corrupted.

**Why it happens:** The simulator needs access to real SDs to calculate projected HI, but if the manipulation is done on the actual state (not a deep copy), a side effect could trigger a Firestore write.

**How to avoid:**
- Work entirely with computed/dervied data in the simulator. Do NOT read from Firestore inside the simulator — use the already-loaded SD array from Zustand.
- When constructing the virtual 20-round array, use structuredClone (or Immer's `produce`) to ensure no mutation of real data.
- Never call any Firestore write function from the simulator code path.
- Keep the simulator logic in a pure utility function: `projectHandicapIndex(realSDs: number[], simulatedSD: number): number`

```typescript
function projectHandicapIndex(realSDs: number[], simulatedSD: number): number {
  // Work on a local array — no state mutations
  const combined = [...realSDs]; // clone
  combined.push(simulatedSD);
  // Sort by date, keep most recent 20
  // ... calculation logic
  return projectedHI;
}
```

**Warning signs:** Simulator shows "Round saved" notification; simulator data persists after page refresh; real handicap changes after visiting the simulator tab.

**Phase to address:** Simulator implementation phase.

---

### Pitfall 15: Input Mode Confusion — Stableford vs Gross Score Conversion

**What goes wrong:** The app accepts both Stableford points and gross scores as input. If the conversion between the two modes reverses incorrectly, the AGS calculation produces wrong SDs. Specifically:

`AGS = PAR + PlayingHandicap + (36 - StablefordPoints)`

A player who enters 38 Stableford points (playing well) should get an AGS lower than PAR + PH. A player who enters 32 Stableford points (playing poorly) should get a higher AGS.

If the sign is reversed: `36 - 38 = -2` (reduces AGS — correct), vs `38 - 36 = +2` (increases AGS — wrong).

**Why it happens:** The Stableford-to-gross formula is easy to transpose. Testing typically only checks one direction.

**How to avoid:**
- Implement the formula exactly as: `AGS = PAR + PH + (36 - Stableford)`.
- Validate with the spec's example: PAR 72, PH 14, Stableford 38 → AGS = 72 + 14 + (36 - 38) = 86 - 2 = 84.
- Also test: PAR 72, PH 14, Stableford 32 → AGS = 72 + 14 + (36 - 32) = 86 + 4 = 90.
- When displaying both modes, keep them as separate paths through the calculation, not a toggle that converts mid-entry.

**Warning signs:** Players who score 40 Stableford points get a higher AGS than par; the calculation example from the spec doesn't match.

**Phase to address:** Round entry — Stableford/gross input handling.

---

### Pitfall 16: Firestore Teebox Data Modeling — Nested Object vs Subcollection

**What goes wrong:** A golf course has multiple teeboxes (Blue, White, Red, etc.), each with its own PAR, CR, SR. Two modeling approaches exist, and the wrong choice causes query problems:

**Bad approach:** Store each teebox as a separate document:
```
golf_courses/{courseId_blue_tees} → { name: "Augusta", tees: "Blue", par: 72, cr: 74.2, sr: 148 }
golf_courses/{courseId_white_tees} → { name: "Augusta", tees: "White", par: 72, cr: 71.5, sr: 135 }
```
This makes course search hell — you find multiple documents for the same course, and the autocomplete shows duplicates.

**Also bad:** Store teeboxes as a subcollection:
```
golf_courses/{courseId}/teeboxes/{teeboxId}
```
This requires two queries (course + teebox) to display a round's course info, doubling reads.

**How to avoid:**
- Use a single document per course with teebox data as a nested map:
```
golf_courses/{courseId} → {
  name: "Augusta National",
  par: 72,
  teeboxes: {
    blue: { par: 72, cr: 74.2, sr: 148, tees: "Blue" },
    white: { par: 72, cr: 71.5, sr: 135, tees: "White" },
    red: { par: 72, cr: 69.8, sr: 121, tees: "Red" }
  }
}
```
- Keep the document small — teebox data is bounded (most courses have 4-6 teeboxes).
- When storing a round, reference the course document and store the selected teebox name (string) to avoid ambiguity.

**Warning signs:** Course autocomplete shows identical courses with different teebox names; adding a round requires two Firestore reads (course + teebox).

**Phase to address:** Course database schema design.

---

## Moderate Pitfalls

### Pitfall 17: PCC Default = 0 Misses Edge Documentation

**What goes wrong:** The spec says "PCC always 0." This is pragmatically correct for the MVP. However, if the UI doesn't mention PCC at all and a power user notices the SD calculation doesn't include it, credibility suffers. More critically, the 9-hole formula uses `0.5 × PCC`, so if PCC support is added later, the 9-hole path must be updated separately.

**How to avoid:**
- Document the PCC=0 decision in code: `const PCC = 0; // Always 0 per spec — revisit when adding PCC support`.
- Add a comment in the 9-hole SD function noting the `0.5 × PCC` adjustment for future implementation.
- In the UI, have a tooltip or info icon explaining "Playing Conditions not applied."

**Phase to address:** Handicap Calculator — deferred PCC.

### Pitfall 18: Round Save Transaction Not Atomic

**What goes wrong:** Saving a round involves: (1) write round document, (2) update player's handicap index, (3) update the 20-round SD array, (4) write individual hole scores. If any of these fail, the system has inconsistent data: a round exists but HI wasn't recalculated, or HI was recalculated but round wasn't saved.

**Why it happens:** Multiple Firestore write operations without a batch/transaction.

**How to avoid:**
- Use Firestore `runTransaction` for the critical path: read current SDs → compute new SD → write round → update HI.
- Or use batched writes (`writeBatch`) for operations that don't need read-before-write.
- Implement an idempotency key to prevent double-submission if the user clicks "Save" twice.

**Phase to address:** Round save implementation.

### Pitfall 19: Deleting or Editing a Historical Round Changes HI Retroactively

**What goes wrong:** If a user deletes a round from 8 rounds ago, the 20-round set must be recomputed. The HI could change significantly because a different set of 8 best SDs are now in the window. Users find this confusing.

**Why it happens:** The HI is always a function of the current 20-round window. Removing a round shifts the window.

**How to avoid:**
- Recalculate HI after any round deletion or edit.
- Show a warning: "Deleting this round may change your Handicap Index."
- Maintain an audit trail of HI changes so users can understand WHY their HI changed.
- Consider soft-deletes (mark round as deleted but keep in calculation) vs hard-deletes.

**Phase to address:** Round edit/delete + HI recalculation.

### Pitfall 20: Admin Panel — Single User Can Escalate Their Own Role

**What goes wrong:** If the admin role is managed via a Firestore document (e.g., `users/{uid}/role`) and the user can write to their own user document, they can set their own role to admin.

**Why it happens:** It's convenient to put everything in the user document. But write access to user documents is typically gated on `request.auth.uid == userId`, which means a user can write to any field in their own document — including `role`.

**How to avoid:**
- Option A: Use custom claims only (1000 byte limit, propagation delay).
- Option B: Use a separate `admins` collection that only existing admins can write to.
  ```
  match /admins/{uid} {
    allow read: if request.auth != null;
    allow write: if request.auth.token.admin == true;
  }
  ```
- Option C: Use a Cloud Function to manage role assignments — only the function (with Admin SDK) can set admin status. Client calls the function, which verifies the caller is already an admin.

**Phase to address:** Admin panel — role management.

### Pitfall 21: No Loading/Error States for Course Autocomplete

**What goes wrong:** The autocomplete component shows nothing when Firestore is loading or has errored. The user thinks no courses exist, times out, and creates a duplicate.

**How to avoid:**
- Always show loading spinner when query is in flight.
- Show "No courses found. Create one?" when results are empty.
- Show error state with retry option when Firestore returns an error.
- Use MUI's Autocomplete with `loading` prop and `noOptionsText` prop.

**Phase to address:** Round entry UI.

### Pitfall 22: Teebox Selection UI Complexity

**What goes wrong:** After selecting a course, the user must also select which teebox they played. If this step is not obvious, users enter round data with the default teebox, producing incorrect SDs (wrong CR/SR).

**How to avoid:**
- After course selection, show a teebox selector with labels like "Blue (CR 74.2 / SR 148 / Par 72)".
- Make teebox selection required before the round can be saved.
- If a course has only one teebox in the database, pre-select it automatically.

**Phase to address:** Round entry — teebox selection.

---

## Minor Pitfalls

### Pitfall 23: Displaying HI With Wrong Decimal Precision

The WHS specifies HI is displayed to one decimal place (e.g., 12.8, not 12.84). Ensure formatting doesn't show 2+ decimal places.

### Pitfall 24: Date Handling for 20-Round Window

The 20-round window is based on the date the round was PLAYED, not the date it was ENTERED. If a user backfills old rounds, they should not enter the 20-round window — or should use the played date for sorting.

### Pitfall 25: Firestore Index Errors on Course Search

Firestore requires composite indexes for queries with multiple `.where()` clauses and `.orderBy()`. The course search query (by name prefix) needs a composite index. Without it, the query throws an error with a link to create one, but this is a poor UX if it happens in production.

**Prevention:** Create indexes before deployment via `firebase.json` or the Firebase Console. For the course search query:
```
Collection: golf_courses
Fields: name_lower (ascending), __name__ (ascending)
```

### Pitfall 26: No Rate Limiting on Course Creation

A bot (or angry user) could create thousands of courses in minutes, costing Firestore write charges and polluting the database. Without any guard:

- Add a Cloud Function that limits creates per user per hour (e.g., max 3 courses per hour).
- Or check creation timestamps in the UI/Firestore Rules.

### Pitfall 27: Simulator Uses Client Timestamp

The simulated round should use a fake/neutral date that places it within the last 20 rounds window for projection purposes. If it uses `new Date()`, and the user runs the simulator the next day, the simulated round's position in the 20-round window may differ.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| **Course DB schema** | Teebox modeled as separate documents (duplicate courses) | Use nested map within a single course document |
| **Course CRUD** | Public write allows vandalism | Strict Security Rules validation per Pitfall 7 |
| **Course search** | Firestore read costs on every keystroke | Debounce + 3-char minimum + client cache |
| **Course creation flow** | Disrupts round entry flow | Inline dialog within round form |
| **SD calculation** | Gross score instead of AGS | Implement NDB adjustment first |
| **SD rounding** | Negative SDs rounded wrong | Custom rounding for `.5` toward zero |
| **< 20 rounds table** | Missing adjustment values (-2.0, -1.0) | Implement full WHS Rule 5.2a table |
| **Soft/hard cap** | HI increases unbounded | Track Low HI, implement cap formulas |
| **Exceptional score** | Good scores don't reduce HI enough | Implement Rule 5.8 reduction table |
| **9-hole support** | Uses old "combine two 9s" method | Use 2024 expected score approach |
| **Admin claims** | Stale token after claim change | Force `getIdToken(true)` + revoke on demotion |
| **Admin routes** | Client-only protection | Firestore rules must also gate on `token.admin` |
| **Round save** | Partial writes leave inconsistent state | Use Firestore batched writes or transactions |
| **Simulator** | Mutates real round data | Pure functions on cloned data only |
| **Input modes** | Stableford formula sign error | Validate against spec example |
| **Round edit/delete** | HI changes unpredictably | Warning dialog + full recalculation |

---

## Sources

### Official Rules & Documentation
- **WHS Rules of Handicapping (2024):** https://www.randa.org/en/roh/the-rules-of-handicapping/rule-5 — Rule 5.1 (SD calculation), 5.1c (negative rounding), 5.2 (HI table), 5.7 (caps), 5.8 (exceptional score) — HIGH confidence
- **USGA WHS FAQs:** https://www.usga.org/content/usga/home-page/handicapping/world-handicap-system/world-handicap-system-usga-golf-faqs.html — SD formula, PCC explanation — HIGH confidence
- **USGA Net Double Bogey:** https://www.usga.org/content/usga/home-page/handicapping/world-handicap-system/topics/net-double-bogey.html — Hole score adjustment rules — HIGH confidence
- **USGA Playing Conditions Calculation:** https://www.whs.com/articles/2019/playing-conditions-calculation.html — PCC range and triggers — HIGH confidence
- **USGA 2024 WHS Revisions Q&A:** https://www.usga.org/content/usga/home-page/articles/2025/02/answering-most-common-questions-from-2024-WHS-revisions.html — 9-hole expected score method — HIGH confidence
- **WHS Guidance (GB&I):** https://www.readkong.com/page/guidance-on-the-whs-rules-of-handicapping-as-applied-within-5304110 — 9-hole PCC halving, initial handicap — HIGH confidence

### Firebase Documentation
- **Custom Claims (official):** https://firebase.google.com/docs/auth/admin/custom-claims — 1000-byte limit, propagation behavior — HIGH confidence
- **Firestore Security Rules (official):** https://firebase.google.com/docs/firestore/security/insecure-rules — Common insecure patterns — HIGH confidence
- **Rules Are Not Filters:** https://firebase.google.com/docs/firestore/security/rules-conditions — Critical query behavior — HIGH confidence
- **Firestore Data Model:** https://firebase.google.com/docs/firestore/data-model — Subcollections, document limits — HIGH confidence
- **Transaction Serializability:** https://firebase.google.com/docs/firestore/transaction-data-contention — Pessimistic vs optimistic — HIGH confidence
- **Role-Based Access with Custom Claims:** https://firebase.blog/posts/2019/03/firebase-security-rules-admin-sdk-tips/ — Admin SDK bypasses rules — HIGH confidence
- **Security: Admin SDK bypass:** https://firebase.google.com/docs/firestore/security/rules-structure — Service accounts bypass rules — HIGH confidence

### Community & Analysis
- **ScoringZone — WHS Common Mistakes:** https://www.scoringzone.net/blog/calculating-a-golf-handicap.html — Wrong slope/CR, forgetting AGS — MEDIUM confidence (third party, verified against official rules)
- **TheGrint — Why an 83 beats an 82:** https://thegrint.com/range/post/why-an-83-may-count-toward-your-handicap-but-an-82-might-not — Real-world differential comparison — MEDIUM confidence
- **Tea App Post-Mortem (Firebase hack):** https://dev.to/uzairsaleemkhan/how-the-tea-app-got-hacked-firebase-pitfalls-and-lessons-for-engineers-5aic — Client-only security, open Firestore — HIGH confidence (verified incident)
- **Firestore Data Modeling Guide:** https://firemap.dev/blog/firestore-data-modeling-guide — Duplicate prevention, subcollection patterns — MEDIUM confidence
- **Firestore Many-to-Many:** https://oneuptime.com/blog/post/2026-02-17-how-to-design-firestore-data-models-for-complex-many-to-many-relationships/view — Junction collection patterns — MEDIUM confidence
- **Doug Stevenson — Custom Claims + Firestore Mirror:** https://medium.com/firebase-developers/patterns-for-security-with-firebase-supercharged-custom-claims-with-firestore-and-cloud-functions-bb8f46b24e11 — Token propagation delay solution — HIGH confidence
- **LinkedIn — Custom Claims Pitfalls:** https://www.linkedin.com/posts/qudratullah-me_softwarearchitecture-techleadership-engineeringexcellence-activity-7371376018080808961-9Q0n — Stale data, audit trail issues — MEDIUM confidence
- **CheckVibe — 8 Firebase Security Mistakes:** https://checkvibe.dev/blog/firebase-security-rules-guide — Exposing admin collections, wildcard rules — MEDIUM confidence
- **CaddieHQ — SD Calculation Guide:** https://www.caddiehq.com/resources/how-to-calculate-score-differential-in-golf — NDB example, AGS computation — MEDIUM confidence (tutorial, verified against rules)
- **USGA Handicap Manual (archived pre-WHS):** https://www.usga.org/custom-search-pages/rules/handicap-manual/rule-14389.html — 96% factor (pre-WHS, historical context) — HIGH confidence

### Project-Specific Sources
- **Project spec:** `/Users/abstract/CODE/personal/personalgolfscore/.planning/PROJECT.md` — MVP scope, tech stack constraints — HIGH confidence
- **Calculation spec:** `/Users/abstract/CODE/personal/personalgolfscore/docs/hcp_calculator/specifiche_tecniche_calcolo_golf.md` — SD formula, example validation — HIGH confidence
- **Codebase concerns:** `/Users/abstract/CODE/personal/personalgolfscore/.planning/codebase/CONCERNS.md` — Existing pitfalls, Firestore structure, tech debt — HIGH confidence
- **Initial WHS teething problems:** https://thegolfbusiness.co.uk/2020/11/teething-problems-in-first-week-of-new-world-handicap-system/ — Real-world WHS rollout issues (wrong slope, best-8 mis-selection) — MEDIUM confidence (news article)
