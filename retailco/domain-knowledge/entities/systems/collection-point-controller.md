---
type: system
id: collection-point-controller
name: CollectionPointController
description: Manages click & collect / pickup point locations and their availability for customer orders.
status: active
related_systems: [delivery-options-orchestrator]
implements_capability: delivery-arrangement
depends_on: []
---

# CollectionPointController

## Overview

The CollectionPointController manages the registry of pickup point locations available for click & collect orders. During checkout, the DeliveryOptionsOrchestrator queries this service to determine which collection points are available near the customer's address.

## Details

### Key Responsibilities
- Maintain registry of active pickup/collection points
- Return available collection points based on customer location
- Provide pickup point details (address, opening hours, capacity)

### Integration Points
- **Inbound**: Called by `delivery-options-orchestrator` during checkout
