---
type: jargon-business
id: delivery-arrangement
name: Delivery Arrangement
description: The combination of available delivery methods, time windows, costs, and pickup locations presented to a customer during checkout.
status: active
related_systems: [delivery-options-orchestrator, capacity-controller, address-resolution-service, collection-point-controller]
---

# Delivery Arrangement

## Overview

A delivery arrangement is the full set of delivery options presented to a customer during the checkout flow. It encompasses the available delivery methods (home delivery, parcel, truck, click & collect), time windows/slots for each method, associated costs and service levels, and pickup point locations for click & collect.

## Details

### Components
- **Delivery methods**: Home delivery (truck), parcel delivery, click & collect
- **Time windows**: Available date/time slots per method
- **Costs**: Delivery fees per method and time slot
- **Service levels**: Standard, express, etc.
- **Pickup points**: Available collection locations (for click & collect)

### Where It Appears
The delivery arrangement is resolved during checkout step 4 — the "delivery options page." The customer enters their address, the system queries backend services to determine what's available, and presents the options. If this step fails, checkout is blocked — the customer cannot proceed to payment.

### Business Impact
When delivery arrangements fail to load, customers cannot complete orders. Unlike post-order failures (which affect individual orders), this blocks ALL customers attempting to check out — impact is immediate and global.
