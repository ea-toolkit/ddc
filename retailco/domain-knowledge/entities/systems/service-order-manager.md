---
type: system
id: service-order-manager
name: Service Order Manager
description: Central order management system handling the full order lifecycle from creation through fulfillment.
status: active
related_systems: [provided-services-manager, external-routing-provider, order-capture-api, picking-service]
implements_capability: service-fulfillment
depends_on: [message-broker]
owned_by: order-management-team
---

# Service Order Manager

## Overview

The Service Order Manager is RetailCo's central system for managing orders across the fulfillment lifecycle. It receives orders from the Order Capture API (via Kafka), orchestrates service fulfillment by routing service orders to the Provided Services Manager (via MessageBroker queues), and sends work orders to the External Routing Provider.

## Details

### Key Responsibilities
- Order lifecycle management (creation → fulfillment → completion)
- Service order routing to downstream systems
- Integration with external routing and delivery providers
- Order state management including the ReadyToAssign status

### Integration Points
- **Inbound**: Receives orders from `order-capture-api` via Kafka
- **Outbound to services**: Routes service orders to `provided-services-manager` via MessageBroker queues
- **Outbound to delivery**: Sends work orders to `external-routing-provider` via SaveWorkOrder API

### Picking Capacity Templates
The Service Order Manager contains a picking capacity template subsystem that defines warehouse picking capacity and lead times per fulfillment unit. These templates drive dispatch date calculations — when a customer queries delivery availability, the system reads the template for eligible fulfillment units and calculates a dispatch date. This dispatch date is sent to the `external-routing-provider`, which returns available delivery slots. See `picking-capacity-template`.

Templates are modifiable directly in production with no validation on value reasonableness. Bad template values produce nonsensical dispatch dates that cascade downstream. See `production-config-without-validation`.

### Known Issues
- Orders getting stuck in ReadyToAssign status is a chronic recurring issue (2+ years)
- Multiple root causes have produced the same symptom over time, suggesting a systemic design issue
- No order flow monitoring has been in place, leading to 24+ hour detection times
- **Mass backorder incidents**: Orders marked as backordered despite inventory being available at distribution points. Root cause: a cutover team ran an XML deployment script intended for the market-cn compartment against the EU compartment, corrupting the inventory module configuration. ATP logic worked correctly but ran against corrupted data. See `backordered`, `cross-compartment-deployment-error`.
- **Inventory module vulnerability**: The Service Order Manager contains an inventory module whose configuration is compartment-specific. Corruption of this module (e.g., via cross-compartment deployment) causes region-wide false backorders with no automated detection.
- **Picking capacity template misconfiguration** (market-au): Modified picking capacity thresholds created undefined template scenarios for certain stores. Dispatch dates calculated months in the future, causing the External Routing Provider to return no delivery slots. Affected scheduled delivery for specific zip codes. See `picking-capacity-template`.

### Queue Pattern
- Queue naming example: `SOM_AP_som.order.SalesOrder1_CREATE_CONSUMER_QUEUE`
- No queue registry exists, creating risk of competing consumers