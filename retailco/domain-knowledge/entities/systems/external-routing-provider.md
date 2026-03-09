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
- **RoutingPlatformV2**: Current active platform — the TSP-facing web portal where Transport Service Providers log in to view assigned jobs and update work order status
- **RoutingPlatformV1**: Legacy platform, being decommissioned

### Integration Points
- **From Service Order Manager**: Receives work orders via SaveWorkOrder API (known duplication issue)
- **From Provided Services Manager**: Receives service fulfillment orders
- **From Picking Service**: Receives picked order data including weight/dimensions
- **Outbound**: Dispatches to Transport Service Providers (TSPs)
- **Inbound from TSPs**: Receives status updates from TSPs via RoutingPlatformV2 portal and propagates them back to ServiceOrderManager (see `work-order-status-update-flow`)

### Work Order Processing
The External Routing Provider is not just a pass-through — it is the system that **generates picking instructions** for warehouses:
1. Receives SaveWorkOrder messages from Service Order Manager via MessageBroker queues
2. Stores work orders in its own internal database
3. Generates picking instructions based on routing logic
4. Sends picking instructions to the appropriate warehouse system (WarehouseManagementSystem, PickingService)

This makes the External Routing Provider a critical link: if it stops processing, warehouses have inventory but no pick instructions. See `work-order-release`, `work-order-to-picking-flow`.

### Dispatch Date and Delivery Slot Calculation
The External Routing Provider also serves as the delivery slot engine. When the Service Order Manager calculates a dispatch date (based on picking capacity templates) and sends it to the External Routing Provider, it evaluates whether it can offer delivery slots within a reasonable window from that dispatch date. If the dispatch date is absurdly far in the future (e.g., months out), the External Routing Provider returns no available delivery slots — this is correct behavior from its perspective, but the customer sees an empty delivery options page.

### TSP Access Model
TSPs log into RoutingPlatformV2 with individual accounts. Users can belong to multiple groups (regions, clients, service types). The permission model is complex — multi-market, multi-group users have fragile access configurations that are prone to breaking during deployments (see `access-level-deployment-regression`).

### V1 to V2 Migration Risk
The decommission of RoutingPlatformV1 involves migrating users and order data to RoutingPlatformV2. Both versions share backend infrastructure (database). Known migration failure modes:

1. **Access level bug causing DB throttling**: During user migration, a bug in RoutingPlatformV1's search shipment page caused users with historically modified access levels to trigger expensive database queries, throttling the shared database and blocking order processing. Second access level incident on this platform. See `migration-traffic-amplification`.

2. **Parallel-run data corruption (theoretical risk)**: The shared database architecture means any cutover involving both systems running simultaneously risks duplicate processing or lost orders. This has not been confirmed as a documented incident, but is an architectural risk inherent to the shared-database design. See `parallel-run-data-corruption`.

### Key Internal Components
- **WOH/WOMGR**: Work Order Handler / Work Order Manager — internal components that process work orders. Run as pods (baseline: 10 pods). Vulnerable to connection pool exhaustion when database throttles.

### Known Issues
- **Access level deployment regressions**: Recurring pattern where deployments break permission calculations for multi-group TSP users, causing them to lose visibility of assigned work orders (see `access-level-deployment-regression`)
- Data duplication via SaveWorkOrder API
- **No weight validation**: Accepts any numeric weight value from upstream systems without schema validation, sanity checks, or min/max bounds. Assumes all values are in kilograms. See `picking-to-routing-parcel-api` and `unit-conversion-bug`.
- **Work order processing failures**: If the External Routing Provider receives work orders but fails to generate picking instructions (database issue, internal processing error, routing logic failure), warehouses see no pick tasks despite orders existing upstream. This is distinct from the "orders not dropping" pattern — messages were delivered successfully, but the recipient failed to act on them.
- **No dispatch date validation**: Accepts dispatch dates from upstream without checking reasonableness. Returns empty slots for absurd dates (months out) instead of flagging the input as anomalous. This makes upstream config errors invisible — the provider just silently returns nothing.