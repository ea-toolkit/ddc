---
type: process
id: work-order-status-update-flow
name: Work Order Status Update Flow
description: Bidirectional flow of work order status between TSPs and internal systems via the ExternalRoutingProvider.
status: active
related_systems: [external-routing-provider, service-order-manager, provided-services-manager]
---

# Work Order Status Update Flow

## Overview

Work orders flow outbound from RetailCo systems to TSPs for execution, and status updates flow inbound from TSPs back to RetailCo systems. The ExternalRoutingProvider sits in the middle of both directions.

## Details

### Outbound (Order Assignment)

```
ServiceOrderManager → ExternalRoutingProvider → TSP sees job in RoutingPlatformV2 portal
```

### Inbound (Status Updates)

```
TSP updates status in RoutingPlatformV2 portal → ExternalRoutingProvider → ServiceOrderManager
```

TSPs update statuses such as: picked up, in transit, delivered, completed. These updates propagate back through ExternalRoutingProvider to ServiceOrderManager, which updates the overall order state.

### Failure Modes

1. **TSP cannot see orders**: If ExternalRoutingProvider access levels break (see `access-level-deployment-regression`), TSPs log in but see no jobs. No status updates happen because there's nothing to update.
2. **TSP can see but not update**: Permission misconfiguration where read access works but write access doesn't.
3. **Status update doesn't propagate**: TSP updates in the portal but the callback to ServiceOrderManager fails silently.

### Detection Gap

There is no monitoring on the inbound status update flow. When TSPs cannot update status:
- No alerts fire — the system doesn't monitor "status update success rate" or "TSP login success rate"
- TSPs often assume "no jobs today" rather than reporting a system issue
- Detection relies entirely on user reports, which can take 24+ hours
- The business impact accumulates silently: deliveries happen but aren't tracked, or TSPs skip jobs they can't see
