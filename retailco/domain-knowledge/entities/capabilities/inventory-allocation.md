---
type: capability
id: inventory-allocation
name: Inventory Allocation
description: Business capability for determining which fulfillment location has available inventory to fulfill a customer order and reserving that stock.
status: active
related_systems: [service-order-manager, warehouse-management-system]
---

# Inventory Allocation

## Overview

Inventory Allocation is the business capability responsible for matching customer orders to available inventory at fulfillment locations. It determines where stock exists, whether it can be promised to a customer, and reserves it for fulfillment.

## Details

### How It Fits in the Order Flow
```
Order placed (online or in-store)
    |
Order Capture -> Service Order Manager
    |
Inventory Allocation check (ATP)
    |
  [Available?]
   YES -> proceed to fulfillment (picking, routing, delivery)
   NO  -> mark order as backordered
```

### Market-Specific Configuration
Different markets (EU, Asia, etc.) have their own distribution center networks. The allocation logic likely considers:
- Which fulfillment units serve a given market/region
- Geographic proximity to the delivery address
- Fulfillment unit capabilities (not all warehouses ship all product types)

### Known Failure Mode: Correct Logic, Wrong Data
EU orders were mass-backordered despite available inventory. The allocation logic itself was correct — it checked inventory for the region specified on the order. The problem was upstream: a Change Data Capture pipeline misconfiguration tagged orders with the wrong region metadata. The allocation system faithfully checked inventory for a region that had none, producing correct-but-wrong backorder decisions. See `change-data-capture`.

This pattern — **correct logic operating on corrupted data** — is particularly hard to diagnose because every system appears to be working correctly in isolation.

### Knowledge Gaps
- The exact system performing inventory allocation is undocumented — may be part of Service Order Manager, a separate inventory service, or the warehouse systems themselves
- The configuration model (how markets map to fulfillment units) is not documented
- Whether allocation is done at order time or asynchronously is unknown
- How order region metadata flows from Change Data Capture into the allocation decision is not documented
