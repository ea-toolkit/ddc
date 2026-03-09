---
type: jargon-tech
id: parallel-run-data-corruption
name: Parallel Run Data Corruption
description: Theoretical failure pattern where running two platform versions simultaneously against a shared database during cutover could cause orders to duplicate or vanish.
status: planned
related_systems: [external-routing-provider, service-order-manager]
---

# Parallel Run Data Corruption

## Overview

A theoretical failure mode for the RoutingPlatformV1 to RoutingPlatformV2 migration. Because both versions share the same backend database, running them in parallel during a cutover creates architectural risk of data integrity issues. This has NOT been confirmed as a documented incident — it is a synthesized risk based on the known shared-database architecture.

## Details

### Architectural Risk

The shared database between RoutingPlatformV1 and RoutingPlatformV2 (`external-routing-provider`) creates a class of risks if both systems operate simultaneously during any cutover:

1. **Duplicate processing risk**: Both V1 and V2 could read the same order records from the shared database and each attempt to process them, creating duplicate fulfillment attempts.

2. **Lost order risk**: Orders in-flight during a cutover moment — partially committed by one system — could become invisible to the other system if ownership handoff is not atomic.

3. **Data corruption risk**: Migration scripts operating on the shared database while either system is actively processing could corrupt in-flight records.

### Known Compounding Factor

The ServiceOrderManager has a documented issue of sending duplicate SaveWorkOrder requests at the exact same second (see `migration-traffic-amplification`). Any parallel-run scenario would be compounded by this existing duplication.

### What IS Documented

- The shared database architecture is confirmed (`external-routing-provider`)
- The SaveWorkOrder duplication is confirmed (`migration-traffic-amplification`)
- A migration-induced DB throttling incident DID occur (variant #11 in `orders-not-dropping`), but that was caused by an access level bug, not a parallel-run data integrity issue

### What Is NOT Documented

- Whether a parallel-run cutover strategy was actually used
- Whether orders were actually duplicated or lost due to concurrent database access
- The specific migration mechanism (script, replication, dual-write, etc.)

### Confidence Level

This is **synthesized architectural reasoning**, not a documented incident. The risk is plausible given the shared-database architecture, but unverified. Before treating this as fact, confirm with the platform team: What was the actual V1→V2 data cutover strategy?
