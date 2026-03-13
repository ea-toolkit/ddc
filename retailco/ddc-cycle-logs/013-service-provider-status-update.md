---
cycle_id: "013"
problem_name: service-provider-status-update
date_started: 2026-03-09
date_completed: 2026-03-09
time_spent_minutes: 30
entities_created: 3
entities_updated: 1
entities_reused: 4
confidence_before: 2
confidence_after: 5
human_score: 5
checklist_size: 8
domain: retailco
---

# 013 — Service Provider Status Update

## Problem Input

Service providers cannot update the status of their work orders in the routing platform. They can see assigned jobs but cannot mark them as completed or in-progress. What might be the issue?

## Agent Before (Zero Context)

Searched the knowledge base and found 6 relevant entities covering the inbound order flow (ServiceOrderManager → ExternalRoutingProvider → warehouses). However, the KB had **zero documentation** of:

- Who service providers are and how they interact with the system
- The outbound status update flow (TSP → ExternalRoutingProvider → ServiceOrderManager)
- What authentication/access model exists for external users
- Any recurring failure patterns related to provider access

Best attempt was 4 vague hypotheses:
1. Access/permission issue in RoutingPlatformV2
2. Platform migration issue (V1 → V2)
3. API/integration issue with status callbacks
4. Missing status update flow entirely

**Confidence: 2/5** — could hypothesize but had no domain-specific knowledge to diagnose.

## Information Checklist

| # | Gap | Entity Type | Question |
|---|-----|------------|----------|
| 1 | Who are service providers? | personas | External company? Person? What tool do they use? |
| 2 | Status update mechanism | processes | How does a provider mark a job as in-progress or completed? |
| 3 | Work order status transitions | jargon-tech | What are the valid statuses? |
| 4 | Authentication/authorization model | systems | Individual logins? Role-based access? Recent changes? |
| 5 | Market scope | jargon-business | Global or market-specific issue? |
| 6 | Error behavior | — | Error message or missing UI option? |
| 7 | Recent changes | — | Sudden or gradual? Deployment-related? |
| 8 | Status propagation back to ServiceOrderManager | processes | Callback/webhook from routing platform back upstream? |

## Human Answers

**TSPs = Transport Service Providers.** External delivery companies (logistics firms, local couriers, assembly teams) that perform physical delivery. Not RetailCo employees.

**Access method:** TSPs use RoutingPlatformV2 (the ExternalRoutingProvider's web portal) with individual accounts. They see assigned jobs and update status: picked up, in transit, delivered, completed.

**The routing platform = ExternalRoutingProvider.** RoutingPlatformV2 is the frontend portal. Flow is bidirectional:
- Outbound: ServiceOrderManager → ExternalRoutingProvider → TSPs see jobs in portal
- Inbound: TSPs update status in portal → ExternalRoutingProvider → updates flow back to ServiceOrderManager

**What broke:** ExternalRoutingProvider deployed a release that broke access levels in RoutingPlatformV2. Users with access to multiple groups (multi-region or multi-client TSPs) couldn't see their service orders. The UI loaded but showed no jobs, or they couldn't update status because orders weren't visible.

**Root cause:** Deployment bug in how RoutingPlatformV2 calculated user access permissions. Multi-group users got filtered out incorrectly.

**Detection gap:** Took over a day before anyone reported it. TSPs assumed "no jobs today" or worked around it. No monitoring on TSP login success or status update volumes.

**Fix:** Rollback the ExternalRoutingProvider release. ~45 minutes once identified.

**The pattern:** This is recurring. ExternalRoutingProvider has had multiple access level bugs. Their permission model is complex (multi-market, multi-group, different TSP roles), and deployments keep breaking edge cases. Test environments don't have production-realistic user permission combinations.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Transport Service Provider | persona | created | `domain-knowledge/entities/personas/transport-service-provider.md` |
| Work Order Status Update Flow | process | created | `domain-knowledge/entities/processes/work-order-status-update-flow.md` |
| Access Level Deployment Regression | jargon-tech | created | `domain-knowledge/entities/jargon-tech/access-level-deployment-regression.md` |
| External Routing Provider | system | updated | `domain-knowledge/entities/systems/external-routing-provider.md` |

## Agent After (With Context)

**Confidence: 5/5**

The issue is an **access level deployment regression** in the ExternalRoutingProvider (RoutingPlatformV2). A recent deployment broke the access permission calculation, causing TSPs with multi-group or multi-market accounts to either see no jobs or be unable to update status.

Recommended actions:
1. Check recent ExternalRoutingProvider deployments for a RoutingPlatformV2 release
2. Test with a multi-group TSP account (single-group users may be unaffected)
3. If confirmed, rollback the release (~45 minutes)
4. Post-incident: implement TSP status update volume monitoring and require multi-group test accounts in pre-deployment validation

Key improvements over RED phase:
- Root cause: from 4 vague hypotheses → specific pattern match (access level deployment regression)
- TSP persona: from unknown → fully documented (external companies, individual logins, multi-group access)
- Status flow: from undocumented → bidirectional flow fully mapped
- Detection gap: from unknown → documented (no monitoring, over a day detection time)
- Fix: from unknown → rollback release (~45 min)

## Human Review

**Score: 5/5** — Textbook DDC execution.

Strengths noted by reviewer:
- Correct root cause diagnosis with actionable diagnostic steps
- SRE-ready answer — could be handed directly to an on-call engineer
- Comprehensive entity work covering persona, process, and failure pattern
- Honest confidence calibration (2/5 → 5/5)

Minor notes (did not affect score):
- Could have used the specific portal name (RoutingPlatformV2 portal vs the internal codename)
- Could have emphasized more strongly that this is a recurring ExternalRoutingProvider pattern, not a one-off
