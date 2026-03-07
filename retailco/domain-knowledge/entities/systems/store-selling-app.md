---
type: system
id: store-selling-app
name: StoreSellingApp
description: In-store POS application used by store staff to create customer orders for delivery, pickup, and services.
status: active
related_systems: [order-capture-api, service-order-manager]
implements_capability: order-capture
depends_on: []
---

# StoreSellingApp

## Overview

The StoreSellingApp is RetailCo's in-store point-of-sale application used by store staff to create customer orders. It runs on terminals in stores and supports the same order types as online (delivery, click & collect, service bookings). It is a legacy system with layers of accumulated code, owned across multiple teams.

## Details

### Key Responsibilities
- Product lookup and order creation for walk-in customers
- Delivery/pickup option selection
- Payment processing
- Submitting orders to downstream order capture services

### Order Types Supported
- Delivery orders (ship to customer)
- Click & collect (customer picks up)
- Service bookings (assembly, installation — same types as online)

### Integration Points
- **Outbound**: Sends created orders to downstream order capture services. The exact integration path is unclear — may go through `order-capture-api` (Selling API) or through other intermediate services. Multiple services may be involved in store order ingestion.
- **Convergence point**: In-store orders should eventually reach `service-order-manager`, but the path to get there likely differs from the online channel path.

### Known Characteristics
- Legacy system — has been around for many years with accumulated technical debt
- Ownership is split across multiple teams (different teams own different parts)
- Runs on in-store terminals — network topology differs from cloud services, may involve network bridges or gateways
- Regional differences may exist — some markets may use different configurations or paths

### Knowledge Gaps
- Web-based vs native application — unknown
- Exact authentication/authorization model — unknown
- Network architecture between store terminals and cloud services — unknown
- Whether the store order path shares infrastructure with online orders or is completely separate — unclear