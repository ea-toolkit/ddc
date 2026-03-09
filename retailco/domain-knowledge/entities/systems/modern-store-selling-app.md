---
type: system
id: modern-store-selling-app
name: ModernStoreSellingApp
description: Newer in-store selling application replacing StoreSellingApp in some markets, used by store staff to create customer orders.
status: active
related_systems: [order-capture-api, service-order-manager]
implements_capability: order-capture
depends_on: []
---

# ModernStoreSellingApp

## Overview

ModernStoreSellingApp is RetailCo's newer in-store selling application, deployed in some markets as a replacement for the legacy StoreSellingApp. Despite being a different frontend, it uses the same backend path — orders go through OrderCaptureAPI's 3 microservices to reach the Service Order Manager.

## Details

### Relationship to StoreSellingApp
- Both apps serve the same purpose: store staff creating customer orders
- Market-dependent which app is used — some markets still on StoreSellingApp, others migrated
- Both frontends submit orders to OrderCaptureAPI, so backend failures affect both equally

### Error Behavior
When order submission fails downstream (e.g., in OrderCaptureAPI's microservices), the app shows an error to the store staff and the order gets stuck in a "pending" or "read-only" state — captured locally but not flowing to Service Order Manager.

### Knowledge Gaps
- Which markets use ModernStoreSellingApp vs StoreSellingApp
- Whether there are any differences in the order payload or submission path between the two apps
- Technology stack (web-based, native, hybrid)
