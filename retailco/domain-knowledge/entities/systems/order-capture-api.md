---
type: system
id: order-capture-api
name: OrderCaptureAPI
description: Selling API layer that receives orders from customer-facing channels and routes them to the Service Order Manager.
status: active
related_systems: [store-selling-app, service-order-manager]
implements_capability: order-capture
depends_on: []
---

# OrderCaptureAPI

## Overview

The OrderCaptureAPI (Selling API) is the API layer that accepts orders from customer-facing channels and forwards them to the Service Order Manager via Kafka. It serves as the entry point into RetailCo's order management pipeline.

## Details

### Key Responsibilities
- Accept orders from online and in-store channels
- Validate and transform order data for downstream processing
- Coordinate across 3 internal microservices to complete the store order path
- Publish order events to Kafka for consumption by `service-order-manager`

### Internal Architecture — 3 Microservices
OrderCaptureAPI is not a single service. The store order creation path involves **3 separate microservices** that must coordinate:

1. **Order Capture Service** — receives the order submission from the store frontend
2. **Validation Service** — validates order data and business rules
3. **Coordination Service** — coordinates with `service-order-manager` to persist the order

These services have significant code duplication between them, accumulated tech debt, and no shared test environment that exercises the full 3-service flow with real data. A change to shared parameters or contracts must be applied to all 3 services — missing one causes total store order failure. See `incomplete-refactoring-pattern`.

### Integration Points
- **Inbound (online)**: Receives orders directly from the e-commerce frontend
- **Inbound (in-store)**: Receives orders from both `store-selling-app` and `modern-store-selling-app` depending on market
- **Outbound**: Publishes order events to Kafka, consumed by `service-order-manager`

### Error Behavior
When any of the 3 microservices fails, the error propagates back to the store frontend. The order gets captured locally in the store app but remains in a "pending" or "read-only" state — visible to the staff member but not flowing downstream to Service Order Manager.

### Knowledge Gaps
- Exact names of the 3 microservices — known only by role (capture, validation, coordination)
- Routing logic — how orders are distributed across the services (sequential pipeline vs parallel)
- Whether store orders and online orders use the same API endpoints or different ones