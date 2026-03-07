---
type: jargon-tech
id: planned-maintenance-communication-gap
name: Planned Maintenance Communication Gap
description: Recurring pattern where teams performing planned maintenance or LCM activities do not notify downstream dependent teams, causing silent service disruptions.
status: active
related_systems: [order-integration-hub, warehouse-management-system, service-order-manager]
---

# Planned Maintenance Communication Gap

## Overview

A planned maintenance communication gap occurs when a team performs scheduled work (lifecycle management, deployments, infrastructure changes) on a system without notifying teams that depend on it. The upstream system goes down or changes behavior, and downstream teams only discover the impact when users report missing data or broken flows.

## Details

### Pattern at RetailCo

This pattern has manifested in the OrderIntegrationHub → Warehouse Management System flow:
- OrderIntegrationHub team performs lifecycle management activity, shuts down consumers
- Warehouse operations teams are not notified
- Orders stop flowing to the WMS; fulfillment screens show no new orders
- Warehouse staff report the issue hours later
- Root cause investigation reveals the planned activity was the trigger

### Why It Happens
- **No dependency registry**: Teams don't know who depends on their systems. There's no central map of "if you change X, teams Y and Z are affected."
- **No pre-change impact assessment**: Change management doesn't require identifying downstream consumers before performing work.
- **Siloed team communication**: Platform teams and application teams operate independently with no shared notification channel for maintenance windows.

### Systemic Relationship
This is closely related to the `orders-not-dropping` pattern — planned maintenance is one of the root causes that produces the "orders disappearing" symptom. It's particularly insidious because the disruption is intentional (planned work) but the downstream impact is unintentional (nobody told the warehouse team).