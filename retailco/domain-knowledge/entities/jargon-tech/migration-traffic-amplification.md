---
type: jargon-tech
id: migration-traffic-amplification
name: Migration Traffic Amplification
description: Failure pattern where migrating users between platform versions triggers an access level identification bug, causing expensive database queries that throttle order processing.
status: active
related_systems: [external-routing-provider]
---

# Migration Traffic Amplification

## Overview

During the migration from RoutingPlatformV1 to RoutingPlatformV2, the RoutingPlatformV1 search shipment page's user access level identification logic contained a bug. Users whose access levels had been historically modified (edited by IT help desk or External Routing Provider admin users) triggered incorrect data fetches, generating expensive database queries that throttled the shared database and blocked order processing.

## Details

### Specific Root Cause
The RoutingPlatformV1 search shipment page had buggy access level identification logic. When users with historical access level changes (modified by IT help desk or External Routing Provider admin users) queried the page, the system fetched incorrect data, producing expensive database queries. This is the **second access level incident** on the External Routing Provider platform — the first was a RoutingPlatformV2 deployment regression (see `access-level-deployment-regression`).

### Failure Sequence
1. User migration begins (V1 users redirected to V2)
2. Users with historically modified access levels trigger buggy access level identification logic on RoutingPlatformV1's search shipment page
3. Bug causes incorrect data retrieval, generating expensive database queries
4. Shared database throttles under query load
5. Connection pools exhaust on WOH/WOMGR components
6. Order processing pipeline backs up — Picking Service synchronous API calls to the routing API slow down or fail
7. Orders accumulate with growing delay
8. User reported the issue 24 minutes before official impact start — system monitoring did not detect first

### Mitigation Applied
- **Rollback**: Migration rolled back (users sent back to V1) — took approximately 70 minutes, far too slow for a critical path system
- **Pod scaling**: WOH/WOMGR pods scaled from 10 to 16
- **Server restart**: DSM team restarted WOH/WOMGR servers to recover from connection pool exhaustion

### Secondary Findings
- **Duplicate SaveWorkOrder issue**: ServiceOrderManager sends duplicate SaveWorkOrder requests at the exact same second, causing data duplication in the External Routing Provider. This is a separate ongoing issue discovered during investigation.
- **Testing gap**: UAT did not catch the access level bug — users with historically modified access levels were not represented in test scenarios

### Root Cause Category
This is a variant of the `orders-not-dropping` pattern. The root cause is a data quality bug in user access level identification that, when triggered by migration traffic, produces database-level throttling. The Picking Service's synchronous API calls to the External Routing Provider backed up because the routing platform's database was saturated.

### Emerging Pattern: Access Level Fragility
This is the second incident involving External Routing Provider access levels. The first (`access-level-deployment-regression`) was a RoutingPlatformV2 deployment breaking permission calculations. This one is a RoutingPlatformV1 access level identification bug triggered by migration. The access level model across both platform versions is fragile and prone to failure when user configurations deviate from the simple case.
