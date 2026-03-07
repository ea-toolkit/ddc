---
type: process
id: order-to-delivery-flow
name: Order to Delivery Flow
description: End-to-end process for physical product delivery from order capture through warehouse picking to last-mile delivery.
status: active
related_systems: [order-capture-api, store-selling-app, service-order-manager, picking-service, external-routing-provider, warehouse-management-system, order-integration-hub]
implements_capability: order-fulfillment
---

# Order to Delivery Flow

## Overview

The order-to-delivery flow handles physical product fulfillment — getting items from a fulfillment unit to the customer's door. This is distinct from the service fulfillment flow (assembly, installation) documented separately.

## Details

### Flow Steps

```
Customer places order (online or in-store via StoreSellingApp)
    ↓
OrderCaptureAPI (via Kafka)
    ↓
Service Order Manager (order lifecycle)
    ↓ [If physical delivery needed]
Picking Service (coordinates warehouse picking)
    ↓
External Routing Provider (RoutingPlatformV2)
    ↓
Transport Service Providers (DHL, etc.)
    ↓
Delivered to customer
```

### Parallel Path (Warehouse Operations)
Some orders flow through the Warehouse Management System for warehouse operations. These orders reach the WMS via the OrderIntegrationHub (integration middleware), not directly from the Service Order Manager:

```
Service Order Manager → OrderIntegrationHub → Warehouse Management System → Fulfillment Screens
```

The OrderIntegrationHub routes orders based on market, product type, and warehouse capabilities. Misconfigured routing rules can silently drop orders at this layer.

### Order Channels
- **Online**: Customer orders via e-commerce site
- **In-Store**: Staff creates order via StoreSellingApp — see `in-store-order-flow` for detailed upstream path

### Critical Integration Points
- **OrderCaptureAPI → Service Order Manager**: Kafka
- **Service Order Manager → Picking Service**: Order dispatch
- **Picking Service → External Routing Provider**: Direct API calls (parcel data: weight, dimensions, destination)

### Known Failure Modes
- Poison messages blocking Picking Service queue (no dead letter queue)
- **Unit conversion bugs** on weight data: Picking Service sends grams as kilograms (or similar), causing 1000x errors. No validation on either side. Deployments roll out regionally, affecting thousands of orders within hours. See `unit-conversion-bug`, `picking-to-routing-parcel-api`.
- Consumer lag with no automated detection or recovery
- Alerts that fire but don't page anyone
- No automated weight anomaly detection — errors caught by human reports from ops or TSP complaints
- **Orders not reaching WMS**: Orders pass through the OrderIntegrationHub to reach the Warehouse Management System. Routing rule misconfigurations or middleware failures can silently drop orders — WMS never receives them, or receives them but they fail to appear on fulfillment screens. See `orders-not-dropping`.
- **WMS status sync gaps**: WMS and Service Order Manager can disagree on order state