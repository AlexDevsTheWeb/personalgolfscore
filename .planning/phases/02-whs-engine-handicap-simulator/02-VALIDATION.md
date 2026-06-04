---
phase: 2
slug: whs-engine-handicap-simulator
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-06-01
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.2 (existing) + Dev-tools custom runner (existing) |
| **Config file** | `vitest.config.ts` (existing) |
| **Quick run command** | `npm run test:calc:whs-quick` |
| **Full suite command** | `npm run test:calc:whs` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** `npm run type-check` + `npm run test:calc:whs-quick`
- **After every plan wave:** Full WHS test suite + `npm run test:calc:all` (existing)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CALC-01, CALC-02 | T-02-01-01 / T-02-01-02 | Input validation guards against out-of-range Stableford values | unit | `npm run test:calc:whs-quick` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | CALC-02 | — | N/A | unit | `npm run type-check` | ✅ | ⬜ pending |
| 02-01-03 | 01 | 1 | CALC-01 | T-02-01-03 | SD field written only with valid course data | integration | `npm run test:calc:whs` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | SIM-01, SIM-02 | T-02-02-01 / T-02-02-02 | Course/teebox selection validated against loaded data | integration | Manual (no test DB) | — | ⬜ pending |
| 02-02-02 | 02 | 2 | SIM-03 | T-02-02-03 | No Firestore write operations in simulator code | code review | Manual inspection | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/dev-tools/whsTestRunner.ts` — WHS-specific test scenarios (or extend existing testRunner)
- [ ] `src/dev-tools/whsTestData.ts` — WHS test data with known expected values
- [ ] New npm scripts in `package.json`: `test:calc:whs-quick` and `test:calc:whs`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Simulator loads courses from Firestore | SIM-01 | Requires live Firestore data — no test DB in CI | Run app, navigate to /simulator, confirm courses dropdown populates |
| Simulator does not write to Firestore | SIM-03 | Cannot assert absence of writes in automated tests | Inspect code — verify no `.firestore.` calls exist in Simulator components |
| Nav integration | SIM-01 | UI rendering assertion | Run app, confirm Simulator nav item appears in DrawerAppBar |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
