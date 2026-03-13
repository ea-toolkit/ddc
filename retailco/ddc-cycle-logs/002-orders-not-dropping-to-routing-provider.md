---
cycle_id: "002"
problem_name: Orders not dropping from Picking Service to External Routing Provider
date_started: 2026-03-06
date_completed: 2026-03-06
time_spent_minutes: 25
entities_created: 4
entities_updated: 0
entities_reused: 3
confidence_before: 2
confidence_after: 4
human_score: 4.5
checklist_size: 7
domain: retailco
---

# Cycle 002: Orders Not Dropping from Picking Service to External Routing Provider

## Problem Input

RetailCo's picking service releases work orders to the external routing provider, but orders are not arriving. Downstream fulfillment units cannot pick or ship.

## Agent Before (Zero Context)

With 8 entities from cycle 001, the agent could identify that the Picking Service sends data to the External Routing Provider (documented in `service-fulfillment-flow` and `external-routing-provider`), but had no entity for the Picking Service itself and didn't know the integration mechanism, what fulfillment units are, or the root cause pattern.

> "The Picking Service is referenced in relationships but has no entity file — I don't know what it actually is, how it integrates with the External Routing Provider, or what system sits between them."

**Confidence: 2/5** — Could name the downstream system from cycle 001 knowledge, but couldn't explain the failure.

## Information Checklist

| # | What Was Needed | Entity Type | Answered? |
|---|-----------------|-------------|-----------|
| 1 | What is the Picking Service? | system | Yes |
| 2 | How does Picking Service connect to External Routing Provider? | api / process | Yes |
| 3 | What is a "fulfillment unit"? | jargon-business | Yes |
| 4 | What was the actual root cause? | - | Yes |
| 5 | What is the order-to-delivery process (non-service path)? | process | Yes |
| 6 | What monitoring exists for this integration? | system | Yes |
| 7 | Are there intermediate systems? | system | Partial |

## Human Answers

Answers provided directly from domain expert knowledge:
- Picking Service coordinates warehouse picking, sends parcel data to External Routing Provider via direct API calls
- Root cause: poison message (legacy order with missing config) blocked queue, no DLQ to catch it
- Fulfillment units = distribution centers, stores, central warehouses
- Full order-to-delivery flow: OrderCaptureAPI → Service Order Manager → Picking Service → External Routing Provider → TSPs
- Alerts fire but don't page anyone — broken alerting pipeline, not missing alerts
- "Orders not dropping" is a recurring pattern across multiple systems

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Picking Service | system | created | `entities/systems/picking-service.md` |
| Fulfillment Unit | jargon-business | created | `entities/jargon-business/fulfillment-unit.md` |
| Order to Delivery Flow | process | created | `entities/processes/order-to-delivery-flow.md` |
| Dead Letter Queue | jargon-tech | created | `entities/jargon-tech/dead-letter-queue.md` |

**Entities reused from previous cycles**: `external-routing-provider`, `service-order-manager`, `service-fulfillment-flow` (3 reused)

## Agent After (With Context)

With 4 new + 3 reused entities, the agent correctly identified:
- Root cause: poison message blocking Picking Service queue, no DLQ
- Detection gap: alerts fire but no on-call setup, so nobody gets paged
- Resolution: manual consumer lag clearing
- 5 targeted safeguards: DLQ, input validation, order flow monitoring, actionable alerting, interface validation

**Confidence: 4/5**

## Human Review

**Score: 4.5/5** — Analysis solid. Minor additions:
- Alert fired shortly before user report but nobody paged (broken alerting pipeline, not missing alerts)
- Legacy order originated from a store via StoreSellingApp with missing default configuration
- Consumer lag monitoring with auto-remediation as additional safeguard
- "Orders not dropping" is a recurring cross-system pattern, not a one-off
- Corrections applied to `picking-service.md`