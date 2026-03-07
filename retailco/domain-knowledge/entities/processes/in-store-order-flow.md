---
type: process
id: in-store-order-flow
name: In-Store Order Creation Flow
description: The process by which store staff create customer orders via the StoreSellingApp and route them into the fulfillment pipeline.
status: active
related_systems: [store-selling-app, order-capture-api, service-order-manager]
implements_capability: order-capture
---

# In-Store Order Creation Flow

## Overview

Store staff create orders for walk-in customers using the StoreSellingApp. The order should flow from the app through order capture services and into the Service Order Manager, where it enters the same fulfillment pipeline as online orders. The upstream path (StoreSellingApp to Service Order Manager) is less well-understood than the downstream fulfillment chain.

## Details

### Staff Workflow
1. Customer comes to store
2. Staff opens StoreSellingApp on terminal
3. Enters product codes / scans items
4. Selects delivery or pickup option
5. Processes payment
6. Submits order — expects confirmation that order is placed

### Technical Flow (Partially Known)
```
StoreSellingApp (in-store terminal)
    ↓ [unknown integration pattern — API call? multiple hops?]
OrderCaptureAPI / intermediate services
    ↓ [Kafka]
Service Order Manager
    ↓ [downstream fulfillment — well-documented]
Picking / WMS / Routing
```

### Online vs In-Store Path Differences
- **Online**: E-commerce frontend → OrderCaptureAPI → Service Order Manager (relatively direct)
- **In-Store**: StoreSellingApp → ??? → Service Order Manager (path less clear, possibly involves additional services or network bridges)
- Both paths should converge at the Service Order Manager
- Regional differences may exist — some markets may route differently

### Failure Scenarios (Hypothesized)
When "store staff cannot process orders," the failure could be at any of these layers:
1. **StoreSellingApp itself** — app crash, freeze, UI error
2. **Network** — store terminal cannot reach cloud services (different network topology than cloud-native services)
3. **Intermediate services** — one of the services between StoreSellingApp and OrderCaptureAPI is down or broken
4. **OrderCaptureAPI** — API rejecting or silently dropping orders
5. **Kafka/Service Order Manager** — downstream rejection (less likely to be store-specific)

### Diagnostic Approach
To pinpoint where the flow breaks:
- **Check StoreSellingApp**: What does the staff member see? Error message? Timeout? Silent failure?
- **Check OrderCaptureAPI logs**: Are store orders arriving at all?
- **Check Service Order Manager**: Are orders from the store channel present?
- If Service Order Manager has them → downstream issue (well-documented in KB)
- If Service Order Manager doesn't have them → upstream issue (less documented)

### Knowledge Gaps
- The exact services between StoreSellingApp and OrderCaptureAPI
- Whether store network infrastructure introduces unique failure modes
- Whether there's monitoring on the store order path specifically
- Historical incident where "code refactoring broke one of the services" — details unknown