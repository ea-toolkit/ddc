---
cycle_id: "004"
problem_name: Orders missing between order management and warehouse
date_started: 2026-03-07
date_completed: 2026-03-07
time_spent_minutes: 30
entities_created: 5
entities_updated: 4
entities_reused: 8
confidence_before: 1
confidence_after: 3
human_score: 3.5
checklist_size: 12
domain: retailco
---

# 004 — Orders Missing Between Order Management and Warehouse

## Problem Input

RetailCo's warehouse management system shows orders as received, but they never appear in the fulfillment screens. Orders are going missing between the order management system and the warehouse.

## Agent Before (Zero Context)

The KB had no entity for the Warehouse Management System and no knowledge of the integration middleware (OrderIntegrationHub) between the Service Order Manager and the WMS. The agent could only pattern-match from previous incidents (competing consumers, poison messages) without understanding the actual architecture.

**Confidence: 1/5** — No WMS entity, no integration hub entity, no understanding of the order flow to the warehouse.

## Information Checklist

### Terminology
- [x] What are "fulfillment screens"?
- [x] What does "received" mean in WMS context?

### Systems
- [x] Warehouse Management System — role, responsibilities, integration
- [x] Integration platform between Service Order Manager and WMS (OrderIntegrationHub)
- [x] What system owns the fulfillment screens?

### Business Logic
- [x] How do orders flow from Service Order Manager to WMS?
- [x] Integration between WMS and Picking Service
- [x] What triggers orders to appear on fulfillment screens?

### Data/Integration
- [ ] Exact message format WMS receives (still unknown)
- [x] Status sync between WMS and Service Order Manager
- [x] Routing rules and filtering in the integration layer

### Process
- [x] Exact order sequence to WMS
- [x] Monitoring gaps

## Human Answers

Key information provided by the domain expert:

1. **Fulfillment screens** are the UI where warehouse staff see picking tasks — may be part of WMS or separate, varies by fulfillment unit.
2. **"Received"** means the order record hit the WMS database (message acknowledged), not that it's actionable.
3. **WMS** manages warehouse operations — picking tasks, aisle routing, inventory tracking. Overlap with Picking Service is messy.
4. **Integration flow**: Service Order Manager → OrderIntegrationHub (integration middleware) → WMS. Not direct.
5. **WMS ↔ Picking Service** boundary is fuzzy — depends on order type and fulfillment method.
6. **Routing rules** in the integration hub route based on market, product type, warehouse capabilities — can silently drop orders.
7. **Monitoring** is minimal — issues caught by warehouse staff, not automation.
8. **"Orders not dropping"** has happened to WMS before — recurring pattern.

### Human Review Corrections
- **Consumer shutdown is the primary cause**: During lifecycle management activities on OrderIntegrationHub, its consumers get shut down, stopping all order flow to WMS. Not just routing rules.
- **"Received" is ambiguous**: Could mean WMS has it, logs show arrival, OR upstream thinks it sent successfully. Critical distinction.
- **Communication gaps**: OrderIntegrationHub team doesn't notify WMS/warehouse teams before maintenance. No dependency registry exists.
- **Specific incidents**: OrderIntegrationHub deployment breaking flow; lifecycle management shutting down consumers without notice. Multiple distribution centers affected across EU and UK regions.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Warehouse Management System | system | created | `entities/systems/warehouse-management-system.md` |
| OrderIntegrationHub | system | created | `entities/systems/order-integration-hub.md` |
| Fulfillment Screens | jargon-business | created | `entities/jargon-business/fulfillment-screens.md` |
| Orders Not Dropping | jargon-tech | created | `entities/jargon-tech/orders-not-dropping.md` |
| Planned Maintenance Communication Gap | jargon-tech | created | `entities/jargon-tech/planned-maintenance-communication-gap.md` |
| Order to Delivery Flow | process | updated | `entities/processes/order-to-delivery-flow.md` |
| MessageBroker | platform | updated | `entities/platforms/message-broker.md` |
| Orders Not Dropping | jargon-tech | updated | `entities/jargon-tech/orders-not-dropping.md` |
| OrderIntegrationHub | system | updated | `entities/systems/order-integration-hub.md` |

## Agent After (With Context)

The order flow to the WMS is: **Service Order Manager → OrderIntegrationHub → Warehouse Management System → Fulfillment Screens**.

The most likely cause is **OrderIntegrationHub consumers being down** — either from:
1. **Planned lifecycle management activity** where consumers were shut down without notifying warehouse teams
2. **OrderIntegrationHub deployment** that broke the consumer pipeline

In either case, messages enter OrderIntegrationHub queues (so upstream systems think orders were sent successfully), but consumers are not running, so messages never reach the WMS. This explains why "WMS shows orders as received" may actually mean "upstream thinks they sent them" rather than "WMS database has them."

**Investigation path**: Check OrderIntegrationHub queue depths (messages piling up?), consumer status (running?), recent lifecycle management/deployment activity, and who was notified.

This is another instance of the `orders-not-dropping` pattern, compounded by `planned-maintenance-communication-gap` — no dependency registry, no pre-change impact assessment, siloed team communication.

**Confidence: 3/5** — Architecture is understood, primary failure modes identified, but exact WMS internals and message schemas remain unknown.

## Human Review

**Score: 3.5/5**

Positives:
- Three-zone failure analysis was good structured thinking
- Pattern recognition correct — this IS "orders not dropping"
- Investigation path solid

Corrections applied:
- Consumer shutdown during lifecycle management is the primary cause (not routing rules)
- "Received" interpretation needs more care — ambiguous across systems
- Added communication gap pattern as a first-class entity
- Added specific incident history (affected distribution centers, OrderIntegrationHub deployment failures)

### Remaining Gaps
- Exact WMS internal processing steps (received → visible)
- WMS message schema
- Complete dependency map for OrderIntegrationHub