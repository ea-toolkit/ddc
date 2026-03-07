---
type: jargon-tech
id: four-eyes-principle
name: Four-Eyes Principle
description: Operational practice requiring two-person approval for critical operations like production deployments and compartment-level configuration changes.
status: active
related_systems: [service-order-manager]
---

# Four-Eyes Principle

## Overview

The four-eyes principle is an operational safeguard requiring that critical operations — especially production deployments and configuration changes — be reviewed and approved by a second person before execution. It prevents single-person errors from reaching production.

## Details

### Where It's Needed at RetailCo
- **Compartment-level deployments**: Running deployment scripts against regional compartments (EU, CN, etc.) should require a second person to verify the target compartment matches the intended one
- **Inventory module configuration changes**: Changes to the Service Order Manager's inventory module affect order flow for an entire region
- **Cutover operations**: Any migration or cutover activity that touches production configuration

### Current Gap
The cross-compartment deployment error that caused EU-wide false backorders would have been prevented by enforcing the four-eyes principle. The cutover team ran the wrong script against the wrong compartment with no second-person verification. See `cross-compartment-deployment-error`.
