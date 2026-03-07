---
type: system
id: delivery-options-orchestrator
name: DeliveryOptionsOrchestrator
description: Frontend-facing service that orchestrates delivery option queries during checkout, determining available methods, time windows, and costs.
status: active
related_systems: [capacity-controller, address-resolution-service, collection-point-controller]
implements_capability: delivery-arrangement
depends_on: []
---

# DeliveryOptionsOrchestrator

## Overview

The DeliveryOptionsOrchestrator is the backend service that powers the delivery options page during e-commerce checkout. When a customer enters their delivery address, the frontend calls this service to determine what delivery methods, time windows, and costs are available for their specific cart and location.

## Details

### Key Responsibilities
- Receive delivery option requests from the e-commerce frontend (cart contents + delivery address)
- Orchestrate calls to downstream services (CapacityController, AddressResolutionService, CollectionPointController)
- Aggregate and return available delivery methods, time slots, costs, and pickup locations
- Serve as the single entry point for all delivery availability queries

### Integration Points
- **Inbound**: E-commerce frontend (website and mobile app) during checkout
- **Outbound**: Calls `capacity-controller` for slot/method availability
- **Outbound**: Calls `address-resolution-service` for address validation and zone determination
- **Outbound**: Calls `collection-point-controller` for click & collect locations
- **Infrastructure**: Sits behind an nginx-ingress-controller (load balancer)

### Known Failure Modes
- If this service is down or unresponsive, the delivery options page shows nothing — checkout is effectively dead
- Depends on the nginx-ingress-controller for traffic routing; if the load balancer is overloaded, requests never reach this service
- No graceful degradation — when any downstream dependency fails, the entire delivery options page fails rather than showing partial results
- Global impact when failures occur (all markets except potentially China which may have a separate stack)
