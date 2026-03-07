---
type: capability
id: delivery-arrangement
name: Delivery Arrangement
description: Business capability for determining and presenting available delivery options to customers during checkout.
status: active
related_systems: [delivery-options-orchestrator, capacity-controller, address-resolution-service, collection-point-controller]
---

# Delivery Arrangement

## Overview

Delivery Arrangement is the business capability responsible for resolving what delivery options are available for a customer's order and presenting them during checkout. It sits between the e-commerce frontend and the fulfillment/logistics backend.

## Details

### Sub-Capabilities
1. **Address resolution** — validating the delivery address and determining serviceability zone
2. **Capacity determination** — checking what delivery methods and time slots have available capacity
3. **Collection point lookup** — finding nearby pickup locations for click & collect
4. **Option presentation** — aggregating results and returning a structured set of options to the frontend

### Position in the Value Chain
This capability sits at the boundary between customer experience and operations. It is the last step before order placement — if it fails, no orders are created. This makes it arguably the highest-impact single point of failure in the e-commerce flow.

### Key Risk
No graceful degradation exists. The architecture is all-or-nothing: if any backend service in the chain fails, the customer sees zero delivery options. There is no caching, no partial results, no fallback to "call us for delivery options."
