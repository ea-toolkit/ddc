---
type: jargon-tech
id: incomplete-refactoring-pattern
name: Incomplete Refactoring Pattern
description: Anti-pattern where a shared integration point is refactored but not all calling services are updated, causing partial failures.
status: active
related_systems: [service-order-manager, store-selling-app]
---

# Incomplete Refactoring Pattern

## Overview

The incomplete refactoring pattern occurs when a shared integration point (e.g., an API endpoint) is changed, but not all services that call it are updated. This causes partial failures — some callers work, others break — which are harder to detect than total outages.

## Details

### How It Happens
1. A shared service exposes an API (e.g., Service Order Manager's save order endpoint)
2. Multiple services call that API (e.g., 3 store order services)
3. A team refactors the API or the calling code
4. They update some callers but miss others — often because no dependency map exists
5. Orders through the missed service silently fail

### Why It's Different from Other "Orders Not Dropping" Causes
- **Not infrastructure** — no network, queue, or consumer issue
- **Not a bad deployment** — the deployment itself succeeded; it was incomplete
- **Partial failure** — some orders still flow, masking the problem
- **Silent** — no errors at the calling service level if the refactoring changed something the missed service still sends (e.g., changed field names, removed endpoints)

### Known Incident
- 3 services handle store order creation from StoreSellingApp to Service Order Manager
- Code refactoring updated 2 of 3 services
- The 3rd service was missed — its orders never reached Service Order Manager
- **Duration**: 2 hours 8 minutes
- **Scope**: Global (all markets except China)
- Orders were captured correctly in StoreSellingApp — the failure was between the store order services and Service Order Manager's save order endpoint
- Detected relatively fast compared to other "orders not dropping" incidents

### Required Safeguards
1. **Dependency mapping** — maintain a registry of every service that calls shared endpoints like Service Order Manager's save order API
2. **Coordinated changes** — when refactoring shared integration points, update ALL callers, not just the ones the team knows about
3. **Integration tests** — end-to-end tests proving the complete flow works across all calling services
4. **Distributed tracing** — would show failed or missing calls from specific services to the shared endpoint