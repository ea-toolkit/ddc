---
type: system
id: capacity-controller
name: CapacityController
description: Central service that determines delivery availability, capacity, and time windows for customer orders.
status: active
related_systems: [delivery-options-orchestrator, address-resolution-service]
implements_capability: delivery-arrangement
depends_on: []
---

# CapacityController

## Overview

The CapacityController is the core backend service that determines what delivery methods and time windows are available for a given order. It is called by the DeliveryOptionsOrchestrator during checkout to check capacity and return available slots.

## Details

### Key Responsibilities
- Determine available delivery methods for a cart + address combination (home delivery, parcel, large-item delivery, click & collect)
- Check capacity and return available time windows/slots for each method
- Factor in product type, cart weight/dimensions, and delivery zone when determining options
- Return cost and service level information for each option

### Integration Points
- **Inbound**: Called by `delivery-options-orchestrator` via a capacity hub router
- **Outbound**: May query inventory and logistics systems for real-time capacity data

### Known Issues
- No autoscaling — static pod count means traffic spikes can overwhelm the service
- When overloaded, fails completely rather than degrading gracefully
