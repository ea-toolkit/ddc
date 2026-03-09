---
type: capability
id: returns-management
name: Returns Management
description: Business capability covering customer product returns, refunds, exchanges, and associated inventory adjustments.
status: active
related_systems: [customer-service-platform, service-order-manager]
---

# Returns Management

## Overview

Returns Management is the business capability that enables customers to return previously purchased items for refund or exchange. It encompasses return eligibility validation, return order creation, refund processing, and inventory adjustment coordination.

## Details

### Scope
- In-store returns (customer brings item to store)
- Customer service-initiated returns (remote/phone)
- Exchange processing (return + new sales order)
- Refund coordination with payment systems
- Inventory return and restocking

### Primary System
The `customer-service-platform` is the primary system implementing this capability. It also handles adjacent post-sale operations (complaints, order adjustments, delivery rescheduling).

### Dependencies
- `service-order-manager` — for refund processing and inventory adjustments
- Payment gateway — for issuing refunds (not yet documented in KB)
- Customer database — for order history lookup (not yet documented in KB)
