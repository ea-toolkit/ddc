---
name: ddc-demo
description: Demo skill for workshop presentations. Simulates DDC cycle responses for pre-created scenarios. Use /ddc-demo <cycle-number> to show a specific cycle's conversation.
argument-hint: "<cycle-number> (1-20)"
---

You are simulating a DDC cycle for a workshop demo. The user will provide a cycle number. Respond AS IF you are an AI agent running a real DDC cycle — searching the knowledge base, attempting the problem, generating demand checklists, and showing results.

**IMPORTANT:** This is a presentation demo. Your responses should look exactly like a real DDC cycle conversation — natural, with tool calls, thinking, and structured output. Do NOT mention this is a simulation.

Use the cycle data below. Match the cycle number and produce the corresponding response.

---

## Cycle 1 — Service Order Queue Contention

**Problem:** Thousands of service orders stuck in processing state. Not being dispatched to providers. Undetected for over a day.

**Response flow:**
1. Search knowledge base → Found 0 matching entities
2. Attempt with zero context → Confidence 1.5/5
3. Give generic advice: "Check message broker, verify consumer health, review recent deployments"
4. Flag: "I cannot identify which specific systems are involved, what the processing state means in this domain, or what the expected message flow looks like"
5. Generate demand checklist with 8 gaps:
   - What systems process service orders?
   - What does the processing state mean?
   - What is the message flow from order to fulfillment?
   - What broker infrastructure connects these systems?
   - What is a "service booking"?
   - Who owns fulfillment assignment?
   - What monitoring exists?
   - What changed in recent deployments?
6. Summary: Gaps 8 | Reused 0 | New entities needed: 8

---

## Cycle 2 — Orders Not Reaching Routing Provider

**Problem:** After a deployment, orders are not reaching the external routing provider. No errors in logs.

**Response flow:**
1. Search knowledge base → Found 3 entities from cycle 1 (service-order-manager, message-broker, provided-services-manager)
2. Attempt → Confidence 2.0/5
3. "Based on cycle 1 entities, orders flow through ServiceOrderManager → MessageBroker → ProvidedServicesManager → ExternalRoutingProvider. The deployment may have affected the consumer group configuration on the broker."
4. Flag: "I know the general flow but not the specific routing provider behavior or deployment patterns"
5. Demand checklist: 6 gaps
6. Summary: Gaps 6 | Reused 2 | New: 4

---

## Cycle 3 — Data Sync Failure Between OMS and Warehouse

**Problem:** Orders placed online are not appearing in the warehouse management system. In-store orders work fine.

**Response flow:**
1. Search → Found 5 entities
2. Attempt → Confidence 2.2/5
3. "The order integration hub routes orders from OrderCaptureAPI. Online orders flow differently from POS orders. The sync failure is likely in the integration layer between order capture and warehouse."
4. Demand checklist: 5 gaps
5. Summary: Gaps 5 | Reused 4 | New: 3

---

## Cycle 4 — Missing Orders in Warehouse Queue

**Problem:** Warehouse team reports missing orders in their fulfillment queue. Orders show as confirmed in the order system.

**Response flow:**
1. Search → Found 7 entities
2. Attempt → Confidence 2.5/5
3. "Based on documented flow, confirmed orders should reach the warehouse via the fulfillment connector. The gap is between order confirmation and warehouse queue ingestion."
4. Demand checklist: 4 gaps
5. Summary: Gaps 4 | Reused 5 | New: 2

---

## Cycle 5 — In-Store Orders Not Flowing

**Problem:** In-store orders placed through POS are not flowing to the fulfillment platform. Online orders work fine.

**Response flow:**
1. Search → Found 8 entities
2. Attempt → Confidence 3.0/5
3. "The POS channel uses a different entry point than web/mobile into the OrderCaptureAPI. The recent platform update may have affected the compartment environment configuration. In-store orders route through a different compartment than online orders."
4. Flag: "I can identify the systems but missing POS-specific routing logic and compartment config details"
5. Demand checklist: 3 gaps (POS routing, compartment env, cross-compartment deployment)
6. Summary: Gaps 3 | Reused 5 | New: 3

---

## Cycle 6 — Service Orders Backordered in EU

**Problem:** Service orders in multiple EU markets showing as backordered. Providers not receiving assignments.

**Response flow:**
1. Search → Found 10 entities
2. Attempt → Confidence 3.2/5
3. "The ProvidedServicesManager queues orders when the ExternalRoutingProvider is slow or unreachable. This backordered state occurs when the message broker consumer falls behind."
4. Demand checklist: 3 gaps
5. Summary: Gaps 3 | Reused 6 | New: 2

---

## Cycle 7 — Delivery Options Not Loading

**Problem:** Customers at checkout see no delivery options. All carrier APIs responding normally.

**Response flow:**
1. Search → Found 11 entities
2. Attempt → Confidence 3.0/5
3. "The DeliveryOptionsOrchestrator queries carrier APIs and merges results. If the nginx-ingress-controller ran out of memory during a traffic spike — there are only 2 static pods with no autoscaling — checkout would fail. This is the no-autoscaling pattern."
4. Demand checklist: 3 gaps
5. Summary: Gaps 3 | Reused 6 | New: 2

---

## Cycle 8 — Store Selling App Timeout

**Problem:** Store selling app throwing timeout errors when creating orders. Backend services healthy.

**Response flow:**
1. Search → Found 13 entities
2. Attempt → Confidence 3.5/5
3. "The Store Selling App has a dependency on the order service. This matches the incomplete-refactoring pattern — downstream consumers that parse log output directly instead of using proper API contracts."
4. Demand checklist: 2 gaps
5. Summary: Gaps 2 | Reused 7 | New: 1

---

## Cycle 9 — Market Booking Outage

**Problem:** One market cannot book any deliveries. No errors. Other markets fine. No deployment happened.

**Response flow:**
1. Search → Found 14 entities
2. Attempt → Confidence 3.8/5
3. "Single-market impact with no errors suggests a config-driven failure. The picking capacity template can be modified directly in production with no validation. Someone may have entered invalid values, causing the ServiceOrderManager to calculate dispatch dates months in the future. The ExternalRoutingProvider would correctly return no slots for those dates."
4. Demand checklist: 2 gaps (specific template validation rules, market-specific overrides)
5. Summary: Gaps 2 | Reused 7 | New: 2

---

## Cycle 10 — Deployment Regression

**Problem:** Routine deployment of order service causes store-based order errors. Only changed a logging format. Rollback fixes it.

**Response flow:**
1. Search → Found 15 entities
2. Attempt → Confidence 4.2/5
3. "This matches the incomplete-refactoring pattern documented in the KB. The order service has downstream consumers that parse log output directly — a workaround from a previous sprint. Specifically, the Store Selling App reads the order service log stream to extract tracking IDs. The logging format change broke the regex parser."
4. "Recommended: rollback immediately, then create a proper API endpoint for tracking ID retrieval."
5. Demand checklist: 1 gap (Store Selling App log parsing specifics)
6. Summary: Gaps 1 | Reused 7 | New: 1

---

## Cycle 11 — Returns Creation Failure

**Problem:** Returns order creation failing in one APAC market. Other markets unaffected.

**Response flow:**
1. Search → Found 16 entities
2. Attempt → Confidence 4.0/5
3. "The CustomerServicePlatform in APAC markets creates forward orders. A security group may have been removed during infrastructure migration, blocking the platform's access to the order creation API. This is the infrastructure-permission-revocation pattern."
4. Demand checklist: 1 gap
5. Summary: Gaps 1 | Reused 7 | New: 1

---

## Cycle 12 — DC Migration Order Failures

**Problem:** Orders failing in 3 distribution centers simultaneously during a regional data center migration.

**Response flow:**
1. Search → Found 17 entities
2. Attempt → Confidence 4.2/5
3. "Regional data center migration with DNS single point of failure. Multiple distribution points affected simultaneously because they share a DNS resolver. The DNS failover didn't propagate, causing all three DCs to lose connectivity to the central order service."
4. Demand checklist: 1 gap
5. Summary: Gaps 1 | Reused 6 | New: 2

---

## Cycle 13 — Service Provider Status Update Delay

**Problem:** Service provider status updates arriving hours late. No errors in monitoring. Provider complaints rising.

**Response flow:**
1. Search → Found 18 entities
2. Attempt → Confidence 4.3/5
3. "This is the silent retry pattern in the ExternalRoutingProvider. When the upstream status update endpoint is slow, the reconciliation service backs off exponentially but never alerts. Same systemic pattern as the notification backpressure from cycle 07 — correct logic, no error, silent failure."
4. Demand checklist: 0 gaps — all context available
5. Summary: Gaps 0 | Reused 6 | New: 1

---

## Cycle 20 — Market Delivery Outage (No Errors)

**Problem:** Customers in one market see no delivery options at checkout. No deployment. No errors. Other markets fine.

**Response flow:**
1. Search → Found 46 entities, 6 directly relevant
2. Attempt → Confidence 4.8/5
3. Respond with full analysis:
   - "This matches the production-config-without-validation pattern (cycles 09, 14). Single-market impact with no errors is the signature of a config-driven failure."
   - "Most likely cause: picking capacity template modified in production. No input validation. Invalid values produce dispatch dates far in the future."
   - "The Delivery Orchestrator returns zero slots because the External Routing Provider can't deliver months out."
4. Provide diagnostic path:
   - Check PickingCapacityTemplate audit log
   - Compare against known-good baseline
   - If modified: revert (quick fix)
   - If not: check Delivery Orchestrator → External Routing Provider for carrier API timeouts (cycle 12 pattern)
5. Note: "Root cause pattern seen in cycles 09 and 14. Systemic fix recommended three times but not implemented."
6. Recommend safeguards: value bounds, impact preview, post-change monitoring, four-eyes approval
7. Demand checklist: EMPTY — zero new demands
8. Summary: Gaps 0 | Reused 6 | New: 0 | CONVERGENCE ACHIEVED | 46 total entities | 60%+ reuse rate
