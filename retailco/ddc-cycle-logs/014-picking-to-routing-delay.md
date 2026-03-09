---
cycle_id: "014"
problem_name: picking-to-routing-delay
date_started: 2026-03-09
date_completed: 2026-03-09
time_spent_minutes: 25
entities_created: 1
entities_updated: 3
entities_reused: 6
confidence_before: 3
confidence_after: 5
human_score: 4
checklist_size: 10
domain: retailco
---

# 014 — Picking to Routing Delay

## Problem Input

Orders are being delayed between the Picking Service and the legacy routing platform (RoutingPlatformV1). The delay is growing and orders are backing up. What might be causing this?

## Agent Before (Zero Context)

The agent searched the knowledge base and found strong coverage on the Picking Service → External Routing Provider integration: `picking-service`, `external-routing-provider`, `picking-to-routing-parcel-api`, `message-broker`, `dead-letter-queue`, `orders-not-dropping`, `no-autoscaling-pattern`.

**Agent's initial answer (confidence 3/5):**

Proposed 5 possible causes:
1. Poison message blocking the queue (documented pattern)
2. Consumer lag with no autoscaling
3. Broken alerting (alerts fire but nobody paged)
4. Synchronous API — if routing platform is slow, Picking Service backs up
5. RoutingPlatformV1 degradation (barely documented in KB)

The agent correctly identified the synchronous API as a bottleneck amplifier and the broken alerting pipeline, but could not pinpoint the specific trigger. The KB had no information about the V1→V2 migration or its database impact.

## Information Checklist

- [ ] What does "delay is growing" mean specifically? Queue depth? API response times?
- [ ] Is the "legacy routing platform" RoutingPlatformV1?
- [ ] RoutingPlatformV1 current status, capacity, performance characteristics
- [ ] Is there a rate limiter/throttle on RoutingPlatformV1 API?
- [ ] What monitoring exists between Picking Service and legacy routing platform?
- [ ] When do orders go to V1 vs V2? Routing split?
- [ ] Retry mechanism in Picking Service for failed API calls?
- [ ] Batch vs real-time processing modes?
- [ ] Connection topology (direct API, load balancer, API gateway)?
- [ ] Recent deployments or config changes?

## Human Answers

The domain expert confirmed:
- It was the RoutingPlatformV1 decommission — migrating users from V1 to V2
- Certain users' queries started hammering the database
- The whole thing throttled and orders backed up
- Rollback took about an hour
- They bumped up pods (autoscaling/scaling intervention)

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| `migration-traffic-amplification` | jargon-tech | Created | `entities/jargon-tech/migration-traffic-amplification.md` |
| `external-routing-provider` | system | Updated | `entities/systems/external-routing-provider.md` |
| `orders-not-dropping` | jargon-tech | Updated | `entities/jargon-tech/orders-not-dropping.md` |
| `access-level-deployment-regression` | jargon-tech | Updated | `entities/jargon-tech/access-level-deployment-regression.md` |

## Agent After — Attempt 1 (Rejected)

**Confidence: 4/5**

The agent correctly identified:
- Core mechanism: V1→V2 migration → shared database throttled → synchronous API blocked → orders backed up
- No autoscaling on Picking Service prevents catch-up
- Broken alerting amplified the problem
- Slow rollback (~1 hour) was problematic
- Pattern abstraction (`migration-traffic-amplification`) was valid

**What the agent got wrong:**
- Said "certain users' query patterns generated disproportionate database load" — too vague
- Missed the specific root cause: RoutingPlatformV1 search shipment page had a buggy access level identification logic affecting users with historically modified access levels
- Missed that this is the second access level incident on this platform
- Missing mitigation details: didn't know about WOH/WOMGR pods (10→16), server restarts for connection pool exhaustion
- Missing secondary findings: duplicate SaveWorkOrder issue, UAT testing gap

## Human Correction

Human scored 4/5 and provided specifics:
- **Root cause precision**: The RoutingPlatformV1 search shipment page's user access level identification logic was buggy. Users whose access levels had changed historically (edited by IT help desk or External Routing Provider admin users) caused incorrect data fetches → expensive queries → throttling
- **Second access level incident**: This follows the RoutingPlatformV2 deployment regression — emerging pattern of access level fragility
- **Complete mitigation**: Rollback (70 minutes) + WOH/WOMGR pods scaled 10→16 + DSM team restarted WOH/WOMGR servers (connection pool exhaustion)
- **Secondary findings**: Duplicate SaveWorkOrder from ServiceOrderManager (separate ongoing issue), UAT didn't catch the bug (testing gap)
- **Detection gap**: User reported 24 minutes before official impact start

## Agent After — Attempt 2 (Accepted)

**Confidence: 5/5**

The root cause was a bug in RoutingPlatformV1's search shipment page access level identification logic. During the V1→V2 user migration, users whose access levels had been historically modified (by IT help desk or External Routing Provider admin users) triggered the bug, causing incorrect data retrieval and expensive database queries. The shared database throttled, WOH/WOMGR components exhausted their connection pools, and the Picking Service's synchronous API calls backed up. Orders accumulated with a growing delay.

This is the second access level incident on the External Routing Provider platform (first: `access-level-deployment-regression` on V2), establishing that the access level model is fragile across both platform versions.

Mitigation: Rollback (~70 minutes), WOH/WOMGR pods scaled 10→16, server restarts for connection pool recovery.

Secondary findings: Duplicate SaveWorkOrder requests from ServiceOrderManager (separate issue), UAT testing gap for access level edge cases.

## Human Review

Human score: 4/5. Corrections incorporated in Attempt 2. The 4 (not 5) likely reflects that some details (exact query patterns, database specifics, full timeline) remain undocumented — but the structural understanding is correct and the KB now captures the pattern accurately.
