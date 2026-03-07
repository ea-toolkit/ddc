---
type: jargon-tech
id: work-order-release
name: Work Order Release
description: The process by which a work order sent to the External Routing Provider is transformed into picking instructions that appear on warehouse fulfillment screens.
status: active
related_systems: [service-order-manager, external-routing-provider, warehouse-management-system, picking-service]
---

# Work Order Release

## Overview

A "work order" is a message the Service Order Manager sends to the External Routing Provider via the SaveWorkOrder API over MessageBroker queues. It tells the External Routing Provider: "here is an order that needs fulfilling — create the routing and picking instructions." "Release for picking" means those pick tasks become visible and actionable on warehouse fulfillment screens. There is no manual release step — it is fully automatic.

## Details

### Work Order vs Sales Order
- **Sales order**: The customer-facing order record managed by the Service Order Manager throughout its lifecycle
- **Work order**: The fulfillment instruction sent from the Service Order Manager to the External Routing Provider, triggering the logistics execution chain

### Release Flow
```
Service Order Manager sends SaveWorkOrder message (via MessageBroker)
    ↓
External Routing Provider receives and stores work order in its database
    ↓
External Routing Provider generates picking instructions
    ↓
Picking instructions flow to warehouse systems (WarehouseManagementSystem, PickingService)
    ↓
Pick tasks appear on fulfillment screens (= "released for picking")
```

### Key Characteristics
- **No batching or wave planning** at the Service Order Manager → External Routing Provider level. Orders flow individually in real-time as they are ready.
- **No manual release**: The entire chain is automatic once the Service Order Manager sends the SaveWorkOrder message.
- **Preconditions for sending**: The order must be in the correct fulfillment-ready state in the Service Order Manager, inventory must be allocated, and routing must be possible. If the Service Order Manager sends the message, these preconditions are met.
- Wave planning may exist within individual warehouse systems, but that is downstream of this flow.

### Failure Points
When warehouses report "no pick instructions arriving," the break is somewhere in this chain:
1. Service Order Manager not sending messages (queue issue, service state problem)
2. External Routing Provider not receiving messages (queue connectivity, consumer down)
3. External Routing Provider received but not processing (database issue, internal error)
4. External Routing Provider processed but not generating instructions (routing logic failure, integration issue with warehouse systems)
