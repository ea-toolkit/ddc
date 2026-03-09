---
type: jargon-tech
id: parallel-run-data-corruption
name: Parallel Run Data Corruption
description: Failure pattern where running two platform versions simultaneously against a shared database during cutover causes orders to appear in both systems, neither system, or in a corrupted state.
status: active
related_systems: [external-routing-provider, service-order-manager]
---

# Parallel Run Data Corruption

## Overview

During the RoutingPlatformV1 to RoutingPlatformV2 migration, both systems were run in parallel with routing logic determining which system handled which orders. Because both versions share the same backend database, the parallel run created data integrity issues: some orders were picked up by both systems (duplicates), while others fell through the cracks entirely (lost orders).

## Details

### Migration Strategy

The V1-to-V2 cutover used a parallel-run approach:
- Both RoutingPlatformV1 and RoutingPlatformV2 ran simultaneously during the cutover window
- Routing logic was supposed to direct orders to one system or the other
- The shared database backend meant both systems could read and write the same order data concurrently

### Failure Modes

1. **Orders in both systems (duplicates)**: Both V1 and V2 query the shared database and each pick up the same order for processing. The routing logic that was supposed to segregate traffic did not fully prevent both systems from seeing the same records.

2. **Orders in neither system (lost)**: Orders that were in-flight during the cutover moment — partially written by one system, not yet visible to the other — fell through the cracks. Possible causes include migration scripts corrupting in-flight data, or race conditions where V1 released ownership before V2 acquired it.

3. **Data corruption**: Migration scripts operating on the shared database while both systems were actively processing may have corrupted order records — fields overwritten, states inconsistent, or references broken.

### Compounding Factor: SaveWorkOrder Duplication

The ServiceOrderManager has a known issue of sending duplicate SaveWorkOrder requests at the exact same second (see `migration-traffic-amplification`). During the parallel run, these duplicates were processed by both V1 and V2 simultaneously, amplifying the duplication problem beyond what the routing logic could manage.

### Impact

- Multiple stores reported orders missing entirely
- Some orders appeared in both V1 and V2, creating duplicate fulfillment attempts
- Root cause ambiguity: unclear whether the primary cause was the migration script corrupting data, the routing logic failing to segregate, or in-flight orders during the exact cutover moment

### Root Cause Category

This is a variant of the `orders-not-dropping` pattern, but with a twist: orders didn't just disappear — they either duplicated or vanished depending on their state at the moment of cutover. The shared database architecture between V1 and V2 is the fundamental enabler of this failure. A clean migration would require either separate databases with a replication/sync mechanism, or a hard cutover with a quiesce period (no in-flight orders).
