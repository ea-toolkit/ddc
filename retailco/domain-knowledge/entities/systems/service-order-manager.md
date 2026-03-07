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

### Known Issues
- Orders getting stuck in ReadyToAssign status is a chronic recurring issue (2+ years)
- Multiple root causes have produced the same symptom over time, suggesting a systemic design issue
- No order flow monitoring has been in place, leading to 24+ hour detection times
- **Mass backorder incidents**: Orders marked as backordered despite inventory being available at distribution points. Root cause: a cutover team ran an XML deployment script intended for the CN compartment against the EU compartment, corrupting the inventory module configuration. ATP logic worked correctly but ran against corrupted data. See `backordered`, `cross-compartment-deployment-error`.
- **Inventory module vulnerability**: The Service Order Manager contains an inventory module whose configuration is compartment-specific. Corruption of this module (e.g., via cross-compartment deployment) causes region-wide false backorders with no automated detection.

### Queue Pattern
- Queue naming example: `SOM_AP_som.order.SalesOrder1_CREATE_CONSUMER_QUEUE`
- No queue registry exists, creating risk of competing consumers