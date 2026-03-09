---
type: system
id: store-selling-app
name: StoreSellingApp
description: Legacy in-store POS application used by store staff to create customer orders. Being replaced by ModernStoreSellingApp in some markets.
status: active
related_systems: [order-capture-api, service-order-manager, modern-store-selling-app]
implements_capability: order-capture
depends_on: []
---

# StoreSellingApp

## Overview

The StoreSellingApp is RetailCo's legacy in-store point-of-sale application used by store staff to create customer orders. It runs on terminals in stores and supports the same order types as online (delivery, click & collect, service bookings). It is being replaced by `modern-store-selling-app` in some markets, but both frontends use the same backend path through OrderCaptureAPI's 3 microservices. It is a legacy system with layers of accumulated code, owned across multiple teams.

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
- **Outbound**: Sends orders to **3 separate intermediate services** (names unknown), each of which calls `service-order-manager` to save the order. The routing logic that determines which service handles a given order is not documented.
- **Convergence point**: All 3 services call `service-order-manager` — this is where in-store orders enter the same pipeline as online orders.
- **Critical risk**: Because there are 3 services, a code change must be applied to all 3. Missing one causes partial failure — some store orders flow, others don't. See `in-store-order-flow`.

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