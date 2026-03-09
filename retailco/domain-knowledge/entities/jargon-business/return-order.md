---
type: jargon-business
id: return-order
name: Return Order
description: An order type representing a customer returning a previously purchased item for refund or exchange, processed through the CustomerServicePlatform.
status: active
related_systems: [customer-service-platform, service-order-manager]
---

# Return Order

## Overview

A return order is a distinct order type from a sales order. It represents a customer returning one or more items from a previous purchase, for either a refund or an exchange. Return orders are created and managed in the CustomerServicePlatform, not through the normal sales order path (OrderCaptureAPI).

## Details

- Created by store staff or customer service agents in CustomerServicePlatform
- Requires the original sales order number for reference
- Subject to eligibility validation (return window, product condition)
- Triggers refund processing and inventory return adjustments via Service Order Manager
- If the return is an exchange, a new sales order is created through the standard order capture flow
