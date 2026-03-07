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
Inventory Allocation check (ATP against SOM inventory module)
    |
  [Available?]
   YES -> proceed to fulfillment (picking, routing, delivery)
   NO  -> mark order as backordered
```

### Inventory State
The ATP check runs against inventory state held within the Service Order Manager's inventory module. If that module's configuration or data is corrupted, ATP produces incorrect results even though the logic itself is correct. See `cross-compartment-deployment-error`.

### Market-Specific Configuration
Different markets (EU, Asia, etc.) have their own distribution point networks. The allocation logic considers:
- Which fulfillment units serve a given market/region
- Geographic proximity to the delivery address
- Fulfillment unit capabilities (not all warehouses ship all product types)
