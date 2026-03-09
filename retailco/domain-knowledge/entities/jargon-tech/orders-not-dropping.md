---
type: jargon-tech
id: orders-not-dropping
name: Orders Not Dropping
description: Recurring failure pattern where orders stop flowing from one system to the next in the fulfillment chain, causing them to silently disappear.
status: active
related_systems: [service-order-manager, picking-service, warehouse-management-system, order-integration-hub]
---

# Orders Not Dropping

## Overview

"Orders not dropping" is RetailCo's recurring failure pattern where orders stop flowing between systems in the fulfillment chain. The same symptom — orders disappearing between systems — has occurred repeatedly across different systems and with different root causes over 2+ years.

## Details

### Affected Systems (Known)
- **Service Order Manager → Provided Services Manager**: Competing queue consumers (INC-001)
- **Picking Service → External Routing Provider**: Poison messages blocking queue (no DLQ)
- **Service Order Manager → Warehouse Management System**: Orders received but not visible on fulfillment screens (via OrderIntegrationHub)

### Common Root Causes
1. **Competing queue consumers** — deployment makes wrong service consume from another's queue
2. **Poison messages** — malformed order blocks entire queue (no dead letter queue)
3. **Misconfigured routing rules** — integration layer silently drops orders that don't match criteria
4. **Consumer shutdown during planned maintenance** — LCM activities on integration platforms shut down consumers without notifying downstream teams. See `planned-maintenance-communication-gap`.
5. **Deployment breaking consumers** — OrderIntegrationHub deployment breaks message flow to WMS
6. **Status transition failures** — order reaches the database but fails internal processing to become actionable
7. **Incomplete refactoring across store order services** — 3 services handle store order creation, each calling Service Order Manager. Code refactoring applied to 2 of 3, missed the 3rd. Orders through the missed service never reached Service Order Manager. Global impact (~2 hours, all markets except China). See `in-store-order-flow`.
8. **Cross-compartment deployment corrupting inventory** — cutover team ran XML deployment script intended for CN compartment on EU compartment, corrupting Service Order Manager's inventory module. Orders didn't "not drop" in the traditional sense — they flowed correctly but were immediately marked `backordered` due to corrupted inventory data. EU-wide impact. See `cross-compartment-deployment-error`.

9. **External Routing Provider internal processing failure** — Service Order Manager successfully sends SaveWorkOrder messages, External Routing Provider receives and stores them in its database, but fails to generate picking instructions for warehouse systems. Orders exist upstream but warehouses see no pick tasks. This is a subtler variant: messages were *delivered* but the recipient failed to *act* on them. See `work-order-release`, `work-order-to-picking-flow`.

### Why It Recurs
- No centralized order flow monitoring across the fulfillment chain
- Each system boundary is a potential drop point with no end-to-end tracing
- Detection relies on humans noticing (warehouse staff, customer complaints), not automated alerts
- Different root causes produce the identical symptom, making pattern recognition difficult

10. **Infrastructure-layer failure during data center migration** — physical infrastructure (DNS servers, authentication servers) hosted in a data center being decommissioned becomes unreachable. Warehouse terminals, forklifts, and printers lose network connectivity entirely. Orders exist upstream but cannot be acted upon physically. This is not an application-level failure — it's the infrastructure layer beneath all applications. See `data-center-migration`, `dns-single-point-of-failure`, `load-balancer-stale-member`.

11. **Migration-induced database throttling via access level bug** — during RoutingPlatformV1 to V2 user migration, a bug in RoutingPlatformV1's search shipment page caused users with historically modified access levels to trigger expensive database queries. Shared database throttled, connection pools on WOH/WOMGR exhausted. Picking Service's synchronous API calls backed up. User reported 24 minutes before system detection. Rollback took ~70 minutes; WOH/WOMGR pods scaled 10→16 and servers restarted. Second access level incident on this platform. See `migration-traffic-amplification`.

12. **Parallel-run data corruption during routing platform migration** — during the RoutingPlatformV1 to V2 data cutover, both systems ran simultaneously against a shared database. Routing logic was supposed to segregate orders, but some were picked up by both systems (duplicates) while others in-flight during the cutover moment were lost entirely. The ServiceOrderManager's SaveWorkOrder duplication compounded the issue. Unlike other variants, this produced both duplicate AND missing orders simultaneously. See `parallel-run-data-corruption`.

### Systemic Nature
This is not individual bugs — it's a systemic design gap. The fulfillment chain has multiple asynchronous hops (queues, middleware, APIs) with no end-to-end delivery guarantees or monitoring. Additionally, infrastructure-layer failures (DNS, authentication, network) can produce identical symptoms to application-level failures, making diagnosis harder.