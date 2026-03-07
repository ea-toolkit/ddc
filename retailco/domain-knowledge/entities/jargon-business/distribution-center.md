---
type: jargon-business
id: distribution-center
name: Distribution Center (DC)
description: Large dedicated fulfillment warehouse for customer order fulfillment, distinct from retail stores that also ship orders.
status: active
related_systems: [warehouse-management-system]
---

# Distribution Center (DC)

## Overview

A Distribution Center is a large dedicated warehouse used for customer order fulfillment. RetailCo operates a network of DCs across regions, with the EU having its own DC network separate from other regions like Asia.

## Details

### Role in Fulfillment
- DCs hold bulk inventory for customer delivery
- The Warehouse Management System manages operations within DCs
- Orders are routed to DCs based on market, product availability, and geographic proximity

### Regional Networks
- EU has its own DC network
- Other regions (Asia, etc.) have separate networks
- Market-to-DC mapping is a critical configuration — errors in this mapping can cause orders to be backordered even when inventory exists at a DC that could serve the customer

### Relationship to Fulfillment Unit
Distribution Center is a specific type of `fulfillment-unit`. Other fulfillment unit types include retail stores that ship from their own inventory.
