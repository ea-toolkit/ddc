---
type: process
id: return-order-flow
name: Return Order Creation Flow
description: The process by which store staff or customers initiate product returns through the CustomerServicePlatform, triggering refunds and inventory adjustments.
status: active
related_systems: [customer-service-platform, service-order-manager]
implements_capability: returns-management
---

# Return Order Creation Flow

## Overview

Customers requesting a return (refund or exchange) are handled through the CustomerServicePlatform. Staff capture return details, the system validates eligibility, and a return order record is created that triggers downstream refund and inventory return processing via the Service Order Manager.

## Details

### Flow
```
Customer requests return (in-store or via customer service)
    ↓
Staff opens CustomerServicePlatform
    ↓
Enters original order number + items being returned
    ↓
CustomerServicePlatform validates return eligibility
  (time since purchase, product condition rules)
    ↓
Return order record saved
    ↓
CustomerServicePlatform → Service Order Manager
  (via MessageBroker queue — refund + inventory adjustment)
    ↓
Refund processed / Inventory updated
    ↓
[If exchange] New sales order created via normal order path
```

### Return vs Sales Order
- Return orders are a distinct order type from sales orders
- They have their own workflow within CustomerServicePlatform
- They do NOT flow through `order-capture-api` — CustomerServicePlatform communicates directly with `service-order-manager`

### Failure Modes
- **CustomerServicePlatform down**: No returns can be initiated at all
- **Queue permissions broken**: Return orders created but stuck in draft/retry — never reach Service Order Manager for refund processing
- **Service Order Manager down**: Return records saved but refunds and inventory adjustments not processed
- **Authentication failure**: Staff locked out of CustomerServicePlatform entirely
