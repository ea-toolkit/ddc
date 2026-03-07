---
type: system
id: order-integration-hub
name: OrderIntegrationHub
description: Integration middleware layer that routes order events from the Service Order Manager to downstream fulfillment systems including the Warehouse Management System.
status: active
related_systems: [service-order-manager, warehouse-management-system]
implements_capability: order-fulfillment
depends_on: [message-broker]
---

# OrderIntegrationHub

## Overview

The OrderIntegrationHub is an integration platform that sits between the Service Order Manager and downstream fulfillment systems like the Warehouse Management System. Orders do not flow directly from the Service Order Manager to the WMS — they pass through this middleware layer, which handles event routing, transformation, and delivery.

## Details

### Key Responsibilities
- Receive order events from the Service Order Manager
- Route and transform order events for downstream systems
- Deliver order data to the Warehouse Management System (and potentially other fulfillment systems)

### Integration Points
- **Inbound**: Order events from `service-order-manager`
- **Outbound**: Routed events to `warehouse-management-system`

### Routing and Filtering
Orders are routed based on:
- Market
- Product type
- Warehouse capabilities
- Fulfillment method

These routing rules are a potential failure point — misconfigured rules can silently drop orders for specific combinations of market, product type, or warehouse.

### Consumer Architecture
The hub uses downstream consumers to read from queues and forward to downstream systems. These consumers are a critical link — if they stop, messages pile up in OrderIntegrationHub queues but never reach the WMS.

### Known Risks
- **Consumer shutdown during lifecycle management**: During planned lifecycle management activities or maintenance on the platform, consumers may be intentionally shut down. If downstream teams (WMS/warehouse ops) are not notified, orders silently stop flowing. Queues fill up, but no one downstream knows.
- **Deployment-breaking message flow**: OrderIntegrationHub deployments have broken the consumer pipeline, stopping order flow to the WMS entirely.
- **No consumer health monitoring**: There is no automated monitoring on whether consumers are running and processing messages. Queue depth monitoring is also missing.
- **Silent drops from routing rules**: Misconfigured routing rules can also cause orders to be silently not forwarded.
- **Opacity**: As middleware, debugging "where did the order go?" requires checking OrderIntegrationHub queue depths, consumer status, routing rule matches, and downstream delivery.
- **No pre-change impact assessment**: Teams performing work on OrderIntegrationHub don't have visibility into who depends on their systems, leading to unnotified disruptions.

### Incident History
- OrderIntegrationHub deployment broke message flow to WMS
- Lifecycle management activity shut down consumers without notifying warehouse teams
- Multiple distribution centers affected across EU and UK regions