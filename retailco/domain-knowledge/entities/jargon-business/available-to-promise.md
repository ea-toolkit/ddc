---
type: jargon-business
id: available-to-promise
name: Available-to-Promise (ATP)
description: The calculated quantity of inventory that can be committed to a customer order, factoring in current stock, reservations, in-transit goods, and safety stock thresholds.
status: active
related_systems: [service-order-manager]
---

# Available-to-Promise (ATP)

## Overview

Available-to-Promise is the inventory availability calculation that determines whether a customer order can be fulfilled. It goes beyond raw stock counts to consider reserved inventory, in-transit stock, and safety stock thresholds.

## Details

### Factors in ATP Calculation
- **On-hand stock**: Physical inventory at fulfillment locations
- **Reserved inventory**: Stock already allocated to other orders
- **In-transit stock**: Inventory being shipped to the fulfillment location
- **Safety stock thresholds**: Minimum inventory levels that should not be allocated

### Role in Order Flow
When an order is placed, the system checks ATP to determine if inventory is available. If ATP returns zero or negative for all eligible fulfillment locations, the order is marked as `backordered`. If ATP is positive, the order proceeds to fulfillment.

### Knowledge Gaps
- Exact system or service that performs the ATP calculation is not documented
- Whether ATP checks all warehouses or only geographically eligible ones is unknown
- How ATP interacts with market-specific warehouse configurations is unclear
