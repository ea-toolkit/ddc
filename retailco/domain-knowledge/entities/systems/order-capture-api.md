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
- Publish order events to Kafka for consumption by `service-order-manager`

### Integration Points
- **Inbound (online)**: Receives orders directly from the e-commerce frontend
- **Inbound (in-store)**: Receives orders from `store-selling-app` — but the exact integration pattern is uncertain. There may be multiple intermediate services involved in the store order path, not a single direct connection.
- **Outbound**: Publishes order events to Kafka, consumed by `service-order-manager`

### Knowledge Gaps
- Whether this is a single API or multiple services behind a facade — unclear
- The exact store-to-API integration path — references exist to "3 different services" involved in store order creation
- Validation rules applied to incoming orders — unknown
- Error handling behavior — does it return errors synchronously or fail silently?
- Whether store orders and online orders use the same API endpoints or different ones