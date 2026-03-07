---
type: system
id: warehouse-management-system
name: Warehouse Management System
description: Manages warehouse operations including picking task assignment, aisle routing, and inventory tracking across fulfillment units.
status: active
related_systems: [service-order-manager, picking-service, order-integration-hub]
implements_capability: order-fulfillment
depends_on: [order-integration-hub]
---

# Warehouse Management System

## Overview

The Warehouse Management System manages physical warehouse operations — what to pick, which aisle, inventory tracking, and picker task assignment. It receives orders from the Service Order Manager via the OrderIntegrationHub (an integration middleware layer) and presents them to warehouse staff through fulfillment screens for picking.

## Details

### Key Responsibilities
- Picking task assignment to warehouse staff
- Aisle and location routing within warehouses
- Inventory tracking at fulfillment unit level
- Presenting orders on fulfillment screens for warehouse operators

### Integration Points
- **Inbound**: Receives order events from `service-order-manager` via `order-integration-hub` (not a direct connection)
- **Related**: Works alongside `picking-service` — overlap exists depending on order type and fulfillment method
- **Fulfillment screens**: The UI where warehouse staff see picking tasks. May be the WMS's own UI or a separate application depending on the fulfillment unit.

### Relationship with Picking Service
The boundary between the Warehouse Management System and the Picking Service is fuzzy:
- **Picking Service**: Focuses on customer picking/shipping coordination and sending parcel data to the External Routing Provider
- **Warehouse Management System**: Focuses on physical warehouse operations (what to pick, where)
- Some flows use both systems in parallel; others use one or the other depending on order type and fulfillment method

### Order States
- **Received**: The order record has reached the WMS database (message acknowledged). Does not mean it's actionable yet.
- **Visible on fulfillment screens**: The order has been processed and assigned, appearing for warehouse staff to act on.

### Known Issues
- **Orders not arriving**: The most common failure is orders never reaching the WMS at all — the OrderIntegrationHub's consumers are down due to maintenance or deployment, so messages sit in OrderIntegrationHub queues. Upstream systems (Service Order Manager) believe they sent the orders successfully because messages were accepted into OrderIntegrationHub queues.
- **"Shows as received" is ambiguous**: When someone says "WMS shows orders as received," this could mean: (a) WMS database has the order in a "received" status, (b) WMS logs show messages arrived, or (c) upstream systems believe they sent successfully. Clarifying which is critical for diagnosis.
- **Orders received but not visible**: Orders can reach the WMS database but fail to appear on fulfillment screens due to internal processing failures.
- **"Orders not dropping" pattern**: Recurring across fulfillment systems (WMS, Picking Service). See `orders-not-dropping`.
- **Limited monitoring**: Issues are typically caught by warehouse staff noticing missing orders, not by automated monitoring. No monitoring exists on the OrderIntegrationHub → WMS message flow.
- **Status sync gaps**: WMS and Service Order Manager can disagree on order state.

### Affected Fulfillment Units (Known Incidents)
- Multiple distribution centers across EU and UK regions have been impacted by order flow disruptions