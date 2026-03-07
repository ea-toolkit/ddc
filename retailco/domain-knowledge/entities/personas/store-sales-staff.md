---
type: persona
id: store-sales-staff
name: Store Sales Staff
description: Retail store employees who use the StoreSellingApp to create customer orders for delivery, pickup, and services.
status: active
related_systems: [store-selling-app]
---

# Store Sales Staff

## Overview

Store sales staff are the front-line employees in RetailCo stores who help walk-in customers place orders. They use the StoreSellingApp on in-store terminals to look up products, create orders, select fulfillment options, and process payments.

## Details

### Key Activities
- Product lookup and order creation via StoreSellingApp
- Advising customers on delivery vs pickup options
- Processing payments
- Handling order issues when the system doesn't respond as expected

### Impact of Failures
When the StoreSellingApp or order flow fails, store staff are the first to notice — they have a customer standing in front of them. Unlike backend failures detected by monitoring, in-store failures are immediately visible and directly impact customer experience. Staff may resort to manual workarounds (paper orders, calling support) when systems are down.