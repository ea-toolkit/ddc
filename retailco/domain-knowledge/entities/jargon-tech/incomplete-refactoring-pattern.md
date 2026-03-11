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
- 3 microservices within OrderCaptureAPI handle the store order path from store frontends to Service Order Manager
- A developer was consolidating duplicate parameters across the 3 services
- 2 of the 3 services were updated with the new parameter name
- The 3rd service still expected the old parameter name — orders passed through the first two services, then failed at the third
- **Failure mode**: Parameter name mismatch — the missed service couldn't find the parameter it needed
- **Scope**: Total store order failure, global (all markets except market-cn, which has its own stack)
- **Time to first alert**: 26 minutes — markets reported the issue before formal escalation
- **Resolution**: Rollback, took ~16 minutes once the decision was made
- Orders were captured correctly in the store app but stuck in "pending"/"read-only" state — not flowing to Service Order Manager

### Deployment Gaps That Enabled This
- **No canary deployment** — change went to all traffic immediately
- **No automated health checks** — no post-deployment validation of the store order path
- **No auto-rollback** — manual decision and manual rollback process
- **No integration test environment** — no test environment exists that mimics the full 3-service flow with real data; services were only tested locally in isolation

### Required Safeguards
1. **Dependency mapping** — maintain a registry of every service that calls shared endpoints like Service Order Manager's save order API
2. **Coordinated changes** — when refactoring shared integration points, update ALL callers, not just the ones the team knows about
3. **Integration tests** — end-to-end tests proving the complete flow works across all 3 microservices in the store order path
4. **Distributed tracing** — would show failed or missing calls from specific services to the shared endpoint
5. **Canary deployments** — roll out changes incrementally to catch failures before full rollout
6. **Automated health checks** — post-deployment validation that the store order path is functional