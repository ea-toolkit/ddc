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

### Known Issues
- Access level management across platform versions
- Data duplication via SaveWorkOrder API
- **No weight validation**: Accepts any numeric weight value from upstream systems without schema validation, sanity checks, or min/max bounds. Assumes all values are in kilograms. See `picking-to-routing-parcel-api` and `unit-conversion-bug`.