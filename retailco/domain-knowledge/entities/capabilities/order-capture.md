---
type: capability
id: order-capture
name: Order Capture
description: Business capability for receiving and validating customer orders from all channels (online, in-store) and routing them into the fulfillment pipeline.
status: active
related_systems: [store-selling-app, order-capture-api, service-order-manager]
---

# Order Capture

## Overview

Order Capture is the business capability responsible for accepting customer orders from all channels — e-commerce, in-store (via StoreSellingApp), and potentially other touchpoints — validating them, and routing them into the fulfillment pipeline via the Service Order Manager.

## Details

### Channels
- **Online**: E-commerce website and mobile app
- **In-Store**: StoreSellingApp on store terminals
- Both channels should produce equivalent orders that converge at the Service Order Manager

### Key Risk
The in-store channel has a less well-understood technical path than the online channel. Multiple services may be involved in store order ingestion, and the integration pattern between StoreSellingApp and the order capture services is not fully documented. This makes diagnosing in-store-specific failures harder than online failures.