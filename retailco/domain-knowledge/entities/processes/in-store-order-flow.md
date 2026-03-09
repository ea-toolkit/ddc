---
type: process
id: in-store-order-flow
name: In-Store Order Creation Flow
description: The process by which store staff create customer orders via the StoreSellingApp, routed through 3 intermediate services to the Service Order Manager.
status: active
related_systems: [store-selling-app, modern-store-selling-app, order-capture-api, service-order-manager]
implements_capability: order-capture
---

# In-Store Order Creation Flow

## Overview

Store staff create orders for walk-in customers using either StoreSellingApp (legacy) or ModernStoreSellingApp (newer, market-dependent). Regardless of frontend, orders are submitted to OrderCaptureAPI, which processes them through **3 internal microservices** (order capture, validation, and coordination with Service Order Manager). This 3-service architecture is the critical upstream path that differs from the online channel.

## Details

### Staff Workflow
1. Customer comes to store
2. Staff opens StoreSellingApp on terminal
3. Enters product codes / scans items
4. Selects delivery or pickup option
5. Processes payment
6. Submits order — routed to one of 3 services that calls Service Order Manager

### Technical Flow
```
StoreSellingApp / ModernStoreSellingApp (in-store terminal)
    ↓
OrderCaptureAPI (3 microservices — sequential pipeline)
    ┌─ Order Capture Service (receives submission)
    ├─ Validation Service (validates order data)
    └─ Coordination Service (persists to Service Order Manager)
    ↓
Service Order Manager
    ↓ [downstream fulfillment — well-documented]
Picking / WMS / Routing
```

### Error Behavior
When any microservice in the pipeline fails, the error propagates back to the store frontend. The order gets stuck in a "pending" or "read-only" state in the store app — captured locally but not flowing downstream. The staff member sees an error and cannot resubmit.

### Online vs In-Store Path
- **Online**: Goes through OrderCaptureAPI more directly to Service Order Manager
- **In-Store**: Goes through the 3-service layer before reaching Service Order Manager
- Both converge at Service Order Manager for downstream fulfillment

### Known Failure Pattern: Incomplete Refactoring
A specific incident occurred where a team refactored code across the store order processing services:
- All 3 services call the Service Order Manager's **save order endpoint**
- 2 of the 3 services were updated correctly
- The 3rd service was missed
- Orders routed through the missed service never reached the Service Order Manager
- Orders were captured correctly in StoreSellingApp — the failure was between the intermediate services and Service Order Manager
- **Duration**: 2 hours 8 minutes
- **Scope**: Global (all markets except China)
- **Detection**: Not caught by automated tests — no integration test coverage exists for the complete StoreSellingApp → Service Order Manager path across all 3 services
- See `incomplete-refactoring-pattern` for the anti-pattern and safeguards

### Root Cause Pattern
This is NOT an operational failure (network, infrastructure). It's a **change management and testing gap**:
- The 3-service architecture creates a dependency mapping problem — teams don't know all the services they need to update
- No integration tests verify that all 3 services correctly save orders to Service Order Manager
- Partial failures (1 of 3 broken) are harder to detect because some orders still flow

### Knowledge Gaps
- **Names of the 3 services** — what are they called?
- **Routing logic** — how is it decided which service handles a given order?
- **Dependency mapping** — is there a documented map of which services call Service Order Manager?
- **Test coverage** — what tests exist today, and what would a proper integration test look like?