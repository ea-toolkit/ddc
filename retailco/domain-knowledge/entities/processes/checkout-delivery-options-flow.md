---
type: process
id: checkout-delivery-options-flow
name: Checkout Delivery Options Flow
description: The process by which the e-commerce checkout resolves and presents delivery options to the customer.
status: active
related_systems: [delivery-options-orchestrator, capacity-controller, address-resolution-service, collection-point-controller]
implements_capability: delivery-arrangement
---

# Checkout Delivery Options Flow

## Overview

This process describes how delivery options are resolved during e-commerce checkout — from the customer entering their address to seeing available delivery methods and time slots. This is the pre-order flow, distinct from the post-order fulfillment flows documented elsewhere.

## Details

### Flow Steps

```
Customer adds items to cart (website or mobile app)
    |
Customer proceeds to checkout
    |
Customer enters/confirms delivery address
    |
Frontend calls DeliveryOptionsOrchestrator
    |
DeliveryOptionsOrchestrator calls AddressResolutionService
    |   -> Validates address, returns coordinates + serviceability zone
    |
DeliveryOptionsOrchestrator calls CapacityController (via router)
    |   -> Checks available delivery methods and time windows
    |
DeliveryOptionsOrchestrator calls CollectionPointController
    |   -> Returns nearby pickup point locations
    |
DeliveryOptionsOrchestrator aggregates results
    |
Frontend displays delivery arrangement to customer
    |
Customer selects delivery option
    |
Order is placed -> enters fulfillment flow (see order-to-delivery-flow)
```

### Infrastructure Layer
All requests to the DeliveryOptionsOrchestrator pass through an nginx-ingress-controller (load balancer). This is a critical infrastructure component — if it is overloaded or misconfigured, no requests reach the backend services.

### Known Failure Patterns

1. **Load balancer exhaustion** (Spring incident): nginx-ingress-controller ran out of memory during a 3-5x traffic spike. Only 2 static pods with no autoscaling. Checkout was dead for ~30 minutes, thousands of orders lost. Auto-resolved, then manually scaled to 6 pods.

2. **Address resolution overload** (Summer incident): AddressResolutionService overloaded during migration from external to internal provider. No load testing performed. Delivery options page failed globally (except China) for ~1 hour. Hundreds of orders lost.

### Systemic Issues
- **No autoscaling**: Static pod counts across the stack — nginx, DeliveryOptionsOrchestrator, AddressResolutionService
- **No capacity headroom**: Services sized for average traffic, not peaks
- **No graceful degradation**: Any single service failure = complete checkout failure
- **No fallback**: No cached results, no partial options, no "try again later" with retry
- **Global blast radius**: Failure affects all markets simultaneously (except China)
