---
type: jargon-tech
id: migration-traffic-amplification
name: Migration Traffic Amplification
description: Failure pattern where migrating users between platform versions causes unexpected query load that throttles the shared database, blocking order processing.
status: active
related_systems: [external-routing-provider]
---

# Migration Traffic Amplification

## Overview

During the migration from RoutingPlatformV1 to RoutingPlatformV2, redirecting users to the new platform caused certain user query patterns to hammer the shared database. The database throttled under load, which blocked order processing and caused a growing backlog between the Picking Service and the External Routing Provider.

## Details

### Pattern
1. User migration begins (V1 users redirected to V2)
2. Certain users' query patterns on V2 generate disproportionate database load
3. Database throttles under combined V1 + V2 load
4. Order processing pipeline backs up — Picking Service calls to the routing API slow down or fail
5. Orders accumulate with growing delay

### Mitigation Applied
- **Pod scaling**: Pods were scaled up to absorb additional load
- **Rollback**: Migration was rolled back (users sent back to V1), but rollback took approximately 1 hour — far too slow for a critical path system

### Why the Rollback Was Slow
The 1-hour rollback duration suggests the migration was not designed with a fast rollback path. For a system on the critical order fulfillment path, migration cutover should have a rollback mechanism executable in minutes, not hours.

### Root Cause Category
This is a variant of the `orders-not-dropping` pattern, but the root cause is not a message queue issue — it's a database throughput bottleneck induced by user migration. The Picking Service's synchronous API calls to the External Routing Provider slowed or timed out because the routing platform's database was saturated.
