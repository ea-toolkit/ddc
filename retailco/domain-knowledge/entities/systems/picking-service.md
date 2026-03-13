---
type: system
id: picking-service
name: Picking Service
description: Coordinates order picking in warehouses and stores, then sends shipping data to the External Routing Provider for delivery dispatch.
status: active
related_systems: [service-order-manager, external-routing-provider, warehouse-management-system]
implements_capability: order-fulfillment
depends_on: [message-broker]
---

# Picking Service

## Overview

The Picking Service is the middleman between "order created" and "get it shipped." It receives orders from the Service Order Manager, coordinates picking at fulfillment units (distribution centers, stores), and sends parcel data (weight, dimensions, destination) to the External Routing Provider via direct API calls.

## Details

### Key Responsibilities
- Coordinate order picking at fulfillment units
- Send shipping/parcel data to External Routing Provider
- Interface between order management and physical logistics

### Integration Points
- **Inbound**: Receives orders from `service-order-manager`
- **Outbound**: Sends parcel data to `external-routing-provider` via direct API calls
- **Related**: Works alongside `warehouse-management-system` for warehouse operations

### Unit Conversion Responsibility
The Picking Service is responsible for converting weight data from its upstream source unit into kilograms before sending to the External Routing Provider via `picking-to-routing-parcel-api`. The weight payload is a bare number with no unit label — the implicit contract is kilograms. See `unit-conversion-bug` for the failure pattern.

### Known Issues
- **Unit conversion bugs**: Has sent weight data in wrong units (e.g., grams sent as kg, off by 1000x) due to broken conversion logic. Neither side validates, so errors propagate silently to TSP pricing, affecting thousands of shipments. See `weight-based-pricing` for financial impact.
- **No dead letter queue**: Poison messages (malformed orders) block the entire queue, halting all downstream processing
- **Consumer lag**: When a message blocks the queue, all subsequent orders pile up with no automated recovery or auto-scaling
- **Broken alerting pipeline**: Alerts exist and DO fire, but there is no on-call setup for the Picking Service team — so alerts go unacknowledged. In one incident, an alert fired shortly before a user reported the issue but nobody got paged.

### Incident Pattern: Poison Message
A single legacy order from a store (created via StoreSellingApp with missing default configuration) can block the entire processing queue. Without a dead letter queue, one bad message stops all orders behind it from reaching the External Routing Provider.

### Recurring Pattern
"Orders not dropping" is a pattern that has occurred across multiple systems (Picking Service, Warehouse Management System), not a one-off. This suggests systemic gaps in queue resilience and monitoring across the fulfillment domain.