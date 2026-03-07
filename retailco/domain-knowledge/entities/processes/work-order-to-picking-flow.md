---
type: process
id: work-order-to-picking-flow
name: Work Order to Picking Flow
description: The process from Service Order Manager dispatching a work order through to picking instructions appearing on warehouse fulfillment screens.
status: active
related_systems: [service-order-manager, external-routing-provider, warehouse-management-system, picking-service]
implements_capability: order-fulfillment
depends_on: [message-broker]
---

# Work Order to Picking Flow

## Overview

This process covers the critical path from the Service Order Manager deciding an order is ready for fulfillment, through the External Routing Provider generating logistics instructions, to pick tasks appearing on warehouse screens. It is real-time, automatic, and has no manual gates.

## Details

### Flow Steps

```
1. Service Order Manager: Order reaches fulfillment-ready state
       ↓ (SaveWorkOrder message via MessageBroker queue)
2. External Routing Provider: Receives message, stores work order in its database
       ↓ (internal processing)
3. External Routing Provider: Generates picking instructions based on routing logic
       ↓ (integration with warehouse systems)
4. Warehouse systems (WarehouseManagementSystem / PickingService): Receive picking instructions
       ↓
5. Fulfillment screens: Pick tasks visible to warehouse staff
```

### Integration Details
- **Service Order Manager → External Routing Provider**: SaveWorkOrder messages sent via MessageBroker queues
- **External Routing Provider → Warehouse systems**: Picking instructions sent to the appropriate fulfillment system based on order type and warehouse capabilities

### Timing
- No batching, wave planning, or scheduling at this level
- Orders flow individually as they become ready
- Expected end-to-end latency: near real-time (seconds to low minutes under normal conditions)

### Relationship to Other Flows
- This flow is a subset of the broader `order-to-delivery-flow`
- The parallel path documented in `order-to-delivery-flow` (Service Order Manager → OrderIntegrationHub → WarehouseManagementSystem) covers a different integration route for some order types
- This flow specifically covers the Service Order Manager → External Routing Provider → warehouse path

### Diagnostic Approach
When pick instructions stop appearing, diagnose layer by layer:
1. Check Service Order Manager: Are SaveWorkOrder messages being sent? Check outbound queue.
2. Check MessageBroker: Are messages sitting in the queue unconsumed? Check queue depth.
3. Check External Routing Provider: Are work orders appearing in its database? What status are they in?
4. Check External Routing Provider → warehouse integration: Are picking instructions being generated and sent?
5. Check warehouse systems: Are instructions arriving but failing to render on screens?
