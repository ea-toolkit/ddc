---
type: jargon-business
id: distribution-point
name: Distribution Point (DP)
description: Large dedicated fulfillment warehouse for customer order fulfillment, distinct from retail stores that also ship orders.
status: active
related_systems: [warehouse-management-system]
---

# Distribution Point (DP)

## Overview

A Distribution Point is a large dedicated warehouse used for customer order fulfillment. RetailCo operates a network of DPs across regions, with the EU having its own DP network separate from other regions.

## Details

### Role in Fulfillment
- DPs hold bulk inventory for customer delivery
- The Warehouse Management System manages operations within DPs
- Orders are routed to DPs based on market, product availability, and geographic proximity

### Regional Networks
- EU has its own DP network
- Other regions have separate networks
- The mapping between markets and DPs is critical — misconfiguration can cause orders to check inventory at the wrong locations

### Relationship to Fulfillment Unit
Distribution Point is a specific type of `fulfillment-unit`. Other fulfillment unit types include retail stores that ship from their own inventory.
