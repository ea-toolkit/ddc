---
type: jargon-business
id: fulfillment-screens
name: Fulfillment Screens
description: The UI where warehouse staff see and action picking tasks. May be part of the WMS or a separate application depending on the fulfillment unit.
status: active
related_systems: [warehouse-management-system]
---

# Fulfillment Screens

## Overview

Fulfillment screens are the user interface through which warehouse staff (pickers) see which orders need to be picked, packed, and shipped. This is where "orders appearing" or "not appearing" is first noticed by operational staff.

## Details

### Ownership
- Not consistently owned by a single system
- May be the Warehouse Management System's built-in UI, or a separate application
- Different fulfillment units (distribution centers, stores) may use different screen implementations

### Significance
- Fulfillment screens are the human-visible boundary of order flow — if an order doesn't appear here, it doesn't get picked
- "Orders not showing on fulfillment screens" is the most common way fulfillment failures are reported (by warehouse staff, not automated monitoring)
- The gap between "order received in WMS database" and "order visible on fulfillment screens" is a known failure zone