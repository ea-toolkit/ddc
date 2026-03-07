---
type: jargon-business
id: backordered
name: Backordered
description: Order status indicating the system cannot find available inventory to fulfill the order, placing it in a queue until stock arrives.
status: active
related_systems: [service-order-manager]
---

# Backordered

## Overview

Backordered is an order status applied to product orders when the system determines there is no available inventory at any eligible fulfillment location to ship to the customer. The order enters a queue waiting for stock replenishment, and the customer is notified without a firm delivery date.

## Details

### Distinction from ReadyToAssign

These are different failure modes affecting different order types:
- **Backordered**: Affects **product orders** — the system believes no inventory is available to fulfill
- **ReadyToAssign stuck**: Affects **service orders** (assembly, installation) — service orders not reaching providers

Both result in customer-visible delays, but the root causes and resolution paths differ.

### Business Impact
- Customer sees order stuck with no delivery date
- Customer gets a "we'll ship when we have it" notification
- If inventory IS actually available but the system incorrectly marks backordered, customers wait unnecessarily while stock sits in warehouses

### Known Incident Pattern: False Backorders via Data Replication Error
Orders across the EU region were immediately backordered despite inventory being available at distribution points. The root cause was not in the inventory allocation logic itself — ATP worked correctly. The failure was at the **data layer**: a Change Data Capture pipeline was misconfigured with the wrong source region during a migration. This caused order data to be tagged with incorrect region metadata, so when ATP checked inventory, it looked in the wrong region and found nothing. See `change-data-capture`.