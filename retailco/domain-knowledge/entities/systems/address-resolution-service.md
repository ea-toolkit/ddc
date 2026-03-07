---
type: system
id: address-resolution-service
name: AddressResolutionService
description: Converts customer addresses to coordinates and determines delivery serviceability zones.
status: active
related_systems: [delivery-options-orchestrator, capacity-controller]
implements_capability: delivery-arrangement
depends_on: []
---

# AddressResolutionService

## Overview

The AddressResolutionService handles geocoding — converting customer delivery addresses into geographic coordinates and determining which serviceability zone the address falls into. This zone information is critical for the CapacityController to determine what delivery options are available.

## Details

### Key Responsibilities
- Convert delivery addresses to latitude/longitude coordinates
- Determine delivery serviceability zones based on coordinates
- Validate that an address is within a deliverable area

### Integration Points
- **Inbound**: Called by `delivery-options-orchestrator` during checkout
- **Outbound**: Previously used an external geocoding provider; migrated to an internal solution

### Known Incidents
- **Geocoding migration overload**: During migration from an external geocoding provider to an internal solution, the new service was not load tested. Under production traffic, it became overloaded and caused the delivery options page to fail globally (except China) for approximately one hour. Hundreds of orders were lost.

### Known Issues
- Load testing gaps — the migration incident revealed that capacity planning for this service was inadequate
- No fallback mechanism — if this service fails, there is no cached or degraded response path
