---
cycle_id: "010"
problem_name: Store selling app order submission errors
date_started: 2026-03-09
date_completed: 2026-03-09
time_spent_minutes: 25
entities_created: 1
entities_updated: 4
entities_reused: 4
confidence_before: 2
confidence_after: 4
human_score: 5
checklist_size: 10
domain: retailco
---

# Cycle 010: Store Selling App Order Submission Errors

## Problem Input

Store staff using the in-store selling application cannot place orders for customers. The application shows errors when trying to submit any order. What is the root cause?

## Agent Before (Zero Context)

The KB had entities for StoreSellingApp, OrderCaptureAPI, in-store-order-flow, and the incomplete-refactoring-pattern from cycle 005. However, the agent lacked:
- Knowledge of a second store frontend (ModernStoreSellingApp)
- Detail on what the 3 microservices within OrderCaptureAPI actually do (roles: capture, validation, coordination)
- The specific failure mode (parameter name mismatch)
- Error behavior from the store app perspective (pending/read-only state)
- Incident timing details (26 min to alert, 16 min rollback)
- Deployment gap specifics (no canary, no health checks, no auto-rollback)

The agent could list plausible failure zones but produced a diagnostic-style checklist asking the user to investigate logs and infrastructure — treating the user as an investigator rather than a domain expert.

**Confidence: 2/5**

## Information Checklist

### Systems
- [x] Second store frontend — ModernStoreSellingApp exists alongside StoreSellingApp, market-dependent
- [x] OrderCaptureAPI internal architecture — 3 microservices with distinct roles (capture, validation, coordination)
- [ ] Exact names of the 3 microservices — still unknown

### Failure Context
- [x] Error behavior — orders stuck in pending/read-only state in store app, not flowing to Service Order Manager
- [x] Specific failure mode — parameter name mismatch after incomplete refactoring
- [x] Scope — total store order failure, global except market-cn
- [x] Time to first alert — 26 minutes, markets reported before formal escalation
- [x] Resolution — rollback, ~16 minutes once decided

### Deployment & Testing
- [x] No canary deployment — change went to all traffic immediately
- [x] No integration test environment — services tested locally in isolation only
- [x] No automated health checks or auto-rollback

## Human Answers

The domain expert provided:
- Two store frontends exist: StoreSellingApp (legacy, some markets) and ModernStoreSellingApp (newer, other markets). Both use the same backend path through OrderCaptureAPI.
- OrderCaptureAPI has 3 microservices in the store order path: one for order capture, one for validation, one for coordination with Service Order Manager. Significant code duplication and tech debt between them.
- Root cause: developer consolidating duplicate parameters across the 3 services, updated 2 of 3, missed the third. The missed service expected the old parameter name and failed.
- Error behavior: order captured in store app but stuck in pending/read-only — not reaching Service Order Manager.
- Deployment had no canary, no health checks, no auto-rollback. No test environment exercises the full 3-service flow.
- 26 minutes to first alert. Markets reported before escalation. Rollback took ~16 minutes.
- Expert explicitly corrected the agent's approach: "Stop asking diagnostic questions — that's YOUR job. I'm here to fill domain knowledge gaps."

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| ModernStoreSellingApp | system | created | `entities/systems/modern-store-selling-app.md` |
| StoreSellingApp | system | updated | `entities/systems/store-selling-app.md` |
| OrderCaptureAPI | system | updated | `entities/systems/order-capture-api.md` |
| In-Store Order Creation Flow | process | updated | `entities/processes/in-store-order-flow.md` |
| Incomplete Refactoring Pattern | jargon-tech | updated | `entities/jargon-tech/incomplete-refactoring-pattern.md` |

## Agent After (Accepted)

Root cause: **Incomplete Refactoring Pattern** across OrderCaptureAPI's 3 microservices.

A developer consolidating duplicate parameters updated 2 of the 3 microservices in the store order path but missed the third. The third service still expected the old parameter name. Orders passed through the first two services (capture, validation) successfully, then failed at the third (coordination) because it couldn't find the parameter it needed.

Result: every store order worldwide (except China) failed. Orders captured in the store app but stuck in pending/read-only state — never reaching Service Order Manager. Staff saw errors on submission.

Why it wasn't caught:
- No integration test environment exercises the full 3-service pipeline
- Services tested locally in isolation — each passed individually
- No canary deployment — change went to 100% of traffic
- No automated health checks or auto-rollback
- 26 minutes to first alert; markets reported before formal escalation
- Rollback took ~16 minutes once decided

The agent correctly recognized this as the same anti-pattern documented in cycle 005, applied the pattern to the specific failure mode (parameter name mismatch vs general refactoring), and identified the deployment gaps that allowed it to reach production.

**Confidence: 4/5** — Root cause, failure mode, and architecture clear. Missing exact microservice names prevents 5/5.

## Human Review

**Score: 5/5** — "You did exactly what the DDC cycle is designed for."

What the agent got right:
- Root cause pattern identification from existing KB
- Failure mechanism (3-service pipeline, where it broke)
- Impact understanding (pending/read-only, global scope)
- Detection/response gaps (no integration testing, no canary, alert delay)
- Pattern recognition — connected to cycle 005 anti-pattern
- Confidence calibration — 4/5 appropriate given remaining unknowns

Key feedback on agent behavior:
- The RED phase checklist was too diagnostic — asked the user to investigate logs, check if online orders work, verify infrastructure. The expert corrected this: "That's YOUR job. I'm here to fill domain knowledge gaps, not do your investigation."
- The agent should distinguish between **domain knowledge questions** (ask the expert) and **diagnostic investigation** (do it yourself). DDC cycles are for domain knowledge curation, not incident triage delegation.

Remaining gaps:
- Exact names of the 3 OrderCaptureAPI microservices
- Whether the microservices form a sequential pipeline or have a different coordination pattern
