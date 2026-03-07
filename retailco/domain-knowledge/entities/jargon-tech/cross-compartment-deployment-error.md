---
type: jargon-tech
id: cross-compartment-deployment-error
name: Cross-Compartment Deployment Error
description: Failure pattern where a deployment script intended for one regional compartment is executed against a different compartment, corrupting region-specific configuration.
status: active
related_systems: [service-order-manager]
---

# Cross-Compartment Deployment Error

## Overview

A cross-compartment deployment error occurs when a cutover team runs a deployment script (e.g., XML configuration deployment) against the wrong regional compartment. This overwrites the target region's configuration with values intended for a different region, corrupting system state.

## Details

### Incident Pattern
A cutover team ran an XML deployment script intended for the CN (China) compartment against the EU compartment instead. This corrupted the Service Order Manager's inventory module configuration for the EU region. As a result:
- Inventory data in the EU compartment became incorrect
- ATP checks ran against corrupted inventory state
- All EU orders were immediately marked as `backordered` despite physical inventory being available at EU distribution points (e.g., DP074, DP048)
- Customers saw orders stuck with no delivery date

### Root Cause Chain
```
Wrong compartment selected by cutover team
    |
XML deployment script runs against EU instead of CN
    |
Service Order Manager inventory module config corrupted for EU
    |
ATP checks return "no inventory" (correct logic, wrong data)
    |
Orders marked backordered across EU region
```

### Why This Is Hard to Detect
- The Service Order Manager and ATP logic function correctly — they faithfully check the (now-corrupted) inventory data
- Inventory physically exists at distribution points
- Symptoms look like an inventory shortage, not a deployment error
- Requires correlating the timing of backorder spike with recent deployment/cutover activity

### Missing Safeguards
- No compartment validation in deployment scripts (no "are you sure you want to deploy to EU?")
- No four-eyes principle enforcement — see `four-eyes-principle`
- No automated rollback or pre-deployment snapshot of inventory module configuration
- No post-deployment health check comparing inventory state before/after
