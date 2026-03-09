---
type: jargon-tech
id: load-balancer-stale-member
name: Load Balancer Stale Member
description: Failure pattern where a server is shut down during migration but not disabled in the load balancer, causing the LB to route traffic to a dead backend.
status: active
related_systems: [network-authentication-platform]
---

# Load Balancer Stale Member

## Overview

A load balancer stale member failure occurs when a server is shut down (e.g., during data center migration) but is not disabled or removed from the load balancer pool. The load balancer continues routing requests to the dead server, causing failures for a portion of traffic.

## Details

### Incident Pattern

During a North American data center migration, the planned procedure for authentication server migration was:
1. Shut down the authentication server
2. Disable it in the load balancer
3. Physically move it to the new location

Someone executed step 1 (shut down the server) but **forgot step 2** (disable in load balancer). The load balancer continued routing authentication requests to the dead server.

### Impact

- Stores could not use ModernStoreSellingApp (POS)
- Stores could not access MaterialHandlingSystem or websites
- Warehouse staff could not log into WarehouseManagementSystem
- **Duration: 2.5 hours** — auto-resolved when someone noticed and disabled the dead server in the load balancer

### Why This Happens

- **Manual procedures**: Migration checklists are executed by humans. Steps get skipped.
- **No validation**: Nothing checks that a server being shut down has been removed from all load balancer pools first.
- **No health checks (or ignored)**: Load balancers typically have health checks, but if not configured or if the check interval is too long, stale members persist.

### Root Cause Chain

```
Migration procedure: shut down auth server → disable in LB → move
    |
Step 1 executed (server shut down)
    |
Step 2 missed (not disabled in load balancer)
    |
Load balancer routes auth requests to dead server
    |
Authentication fails for affected requests
    |
Stores and warehouses lose access to all authenticated services
```

### Relationship to Other Patterns

This is a specific instance of the broader `data-center-migration` failure pattern. It also relates to `infrastructure-dependency-mapping-gap` — the procedure existed but had no automated enforcement or validation.
