---
type: system
id: external-routing-provider
name: External Routing Provider
description: Third-party logistics and delivery routing system that dispatches orders to Transport Service Providers (TSPs).
status: active
related_systems: [service-order-manager, provided-services-manager, picking-service]
implements_capability: service-fulfillment
---

# External Routing Provider

## Overview

The External Routing Provider is an external third-party system used for transport and delivery routing. It receives orders from multiple upstream systems (Service Order Manager, Provided Services Manager, Picking Service) and dispatches them to Transport Service Providers (TSPs) for last-mile delivery and service execution.

## Details

### Platform Versions
- **RoutingPlatformV2**: Current active platform
- **RoutingPlatformV1**: Legacy platform, being decommissioned

### Integration Points
- **From Service Order Manager**: Receives work orders via SaveWorkOrder API (known duplication issue)
- **From Provided Services Manager**: Receives service fulfillment orders
- **From Picking Service**: Receives picked order data including weight/dimensions
- **Outbound**: Dispatches to Transport Service Providers (TSPs)

### Work Order Processing
The External Routing Provider is not just a pass-through — it is the system that **generates picking instructions** for warehouses:
1. Receives SaveWorkOrder messages from Service Order Manager via MessageBroker queues
2. Stores work orders in its own internal database
3. Generates picking instructions based on routing logic
4. Sends picking instructions to the appropriate warehouse system (WarehouseManagementSystem, PickingService)

This makes the External Routing Provider a critical link: if it stops processing, warehouses have inventory but no pick instructions. See `work-order-release`, `work-order-to-picking-flow`.

### Known Issues
- Access level management across platform versions
- Data duplication via SaveWorkOrder API
- **No weight validation**: Accepts any numeric weight value from upstream systems without schema validation, sanity checks, or min/max bounds. Assumes all values are in kilograms. See `picking-to-routing-parcel-api` and `unit-conversion-bug`.
- **Work order processing failures**: If the External Routing Provider receives work orders but fails to generate picking instructions (database issue, internal processing error, routing logic failure), warehouses see no pick tasks despite orders existing upstream. This is distinct from the "orders not dropping" pattern — messages were delivered successfully, but the recipient failed to act on them.