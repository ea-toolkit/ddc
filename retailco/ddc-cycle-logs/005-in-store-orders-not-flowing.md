---
cycle_id: "005"
problem_name: In-store orders not flowing to fulfillment
date_started: 2026-03-07
date_completed: 2026-03-07
time_spent_minutes: 30
entities_created: 6
entities_updated: 3
entities_reused: 7
confidence_before: 2
confidence_after: 4
human_score: 4
checklist_size: 12
domain: retailco
---

# Cycle 005: In-Store Orders Not Flowing to Fulfillment

## Problem Input

Store staff cannot process customer orders through the in-store selling application (StoreSellingApp). Orders created in-store are not flowing to downstream fulfillment systems.

## Agent Before (Zero Context)

The KB had strong coverage of the downstream fulfillment chain (Service Order Manager → OrderIntegrationHub → WMS, Picking Service → External Routing Provider) but **zero entities** for the upstream in-store path. The agent knew StoreSellingApp existed (referenced in `order-to-delivery-flow`) but had no entity for it, no entity for the OrderCaptureAPI, and no knowledge of the architecture between the store app and the Service Order Manager.

Initial attempt produced a generic "check each zone" diagnostic framework with 4 failure zones, treating the store-to-SOM path as a "black box." The answer was too vague to be actionable — it couldn't identify the 3-service architecture or the incomplete refactoring pattern.

**Confidence: 2/5**

## Information Checklist

### Systems
- [x] StoreSellingApp — what is it, who owns it, what does it integrate with?
- [x] OrderCaptureAPI — how does it receive and route orders?
- [ ] The 3 intermediate services — what are their names?

### Business Logic
- [x] In-store order creation flow — staff workflow and technical path
- [x] Store order types — delivery, click & collect, service bookings
- [ ] Routing logic — how orders are distributed across the 3 services

### Integration
- [x] StoreSellingApp to Service Order Manager path — 3 services calling SOM save order endpoint
- [ ] Dependency mapping — complete list of services calling SOM

### Failure Context
- [x] Root cause — incomplete refactoring, 1 of 3 services missed
- [x] Scope — global except China, ~2 hours 8 minutes
- [x] Pattern — partial failure (some orders flow, others don't)

### Personas
- [x] Store sales staff — who they are, how failures impact them

## Human Answers

The domain expert provided:
- StoreSellingApp is a legacy POS system on store terminals, multi-team ownership
- 3 separate services sit between StoreSellingApp and Service Order Manager, each calling SOM's save order endpoint
- The root cause was code refactoring: 2 of 3 services updated, 3rd missed
- Orders captured correctly in StoreSellingApp but never reached SOM through the missed service
- Duration: 2h 8m, global except China
- Expert could not provide: names of the 3 services, routing logic between them
- Expert identified this as a testing gap (no integration tests) and dependency mapping gap, not an operational failure
- Expert recommended documenting as a distinct anti-pattern: "incomplete refactoring across multiple services"

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| StoreSellingApp | system | created | `entities/systems/store-selling-app.md` |
| OrderCaptureAPI | system | created | `entities/systems/order-capture-api.md` |
| In-Store Order Creation Flow | process | created | `entities/processes/in-store-order-flow.md` |
| Order Capture | capability | created | `entities/capabilities/order-capture.md` |
| Store Sales Staff | persona | created | `entities/personas/store-sales-staff.md` |
| Incomplete Refactoring Pattern | jargon-tech | created | `entities/jargon-tech/incomplete-refactoring-pattern.md` |
| Order to Delivery Flow | process | updated | `entities/processes/order-to-delivery-flow.md` |
| Orders Not Dropping | jargon-tech | updated | `entities/jargon-tech/orders-not-dropping.md` |
| Service Order Manager | system | reused | `entities/systems/service-order-manager.md` |

## Agent After (With Context)

Correctly identified:
- 3 services handle store order creation, each calling Service Order Manager's save order endpoint
- Root cause: incomplete refactoring — 2 of 3 services updated, 3rd missed
- Partial failure pattern: some store orders flow (via updated services), others don't (via missed service)
- This is a testing/dependency gap, not an infrastructure failure
- Required safeguards: dependency mapping, coordinated changes, integration tests, distributed tracing

**Confidence: 4/5** — Architecture and failure pattern clear. Missing service names and routing logic prevent 5/5.

## Human Review

**Score: 4/5** — "Much better! Now you've got it."

Corrections applied:
- First answer was too generic ("check each zone") — corrected to specific 3-service architecture
- Added the incomplete refactoring anti-pattern as a distinct entity
- Updated duration from "~2 hours" to "2 hours 8 minutes"
- Added that orders were captured correctly in StoreSellingApp — failure was between intermediate services and SOM

Remaining gaps:
- Names of the 3 intermediate services — unknown even to the expert
- Routing logic between the 3 services — not documented anywhere
- Complete dependency map of services calling Service Order Manager's save order endpoint