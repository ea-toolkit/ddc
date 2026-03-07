---
cycle_id: "009"
problem_name: apac-market-order-booking-outage
date_started: 2026-03-07
date_completed: 2026-03-07
time_spent_minutes: 25
entities_created: 2
entities_updated: 3
entities_reused: 6
confidence_before: 2
confidence_after: 5
human_score: 4.2
checklist_size: 15
domain: retailco
---

# 009 — APAC Market Order Booking Outage

## Problem Input

RetailCo's operations in one Asia-Pacific market (market-au) cannot book any orders or deliveries. Customers reaching checkout see no available delivery slots for truck/curbside delivery in certain zip codes. The entire market appears unable to process these order types.

## Agent Before (Zero Context)

Searched the knowledge base and found entities covering: order capture flow, in-store order flow, delivery options orchestrator, Service Order Manager, cross-compartment deployment errors, no-autoscaling pattern, and order integration hub routing issues.

**Best guesses:**
1. Cross-compartment deployment error corrupting APAC config (known pattern from EU incident)
2. Market-level configuration issue in Service Order Manager
3. OrderIntegrationHub routing rule misconfiguration for the market
4. DeliveryOptionsOrchestrator / AddressResolutionService failure for the market

**Confidence: 2/5** — Could hypothesize from known patterns but lacked knowledge of: picking capacity templates, how dispatch dates are calculated, the Service Order Manager → External Routing Provider delivery slot path for truck/curbside, and what "book" specifically means in this context.

**Key gaps:** No knowledge of picking capacity template system, no understanding of how truck/curbside delivery slots are calculated (distinct from parcel), no awareness that the Service Order Manager feeds dispatch dates to the External Routing Provider for slot calculation.

## Information Checklist

### Terminology
- [x] What does "book" mean — delivery slot selection at checkout
- [x] Which APAC market — market-au (Australia)
- [x] Delivery types affected — truck and curbside only, not parcel

### Systems
- [x] Picking capacity template system within Service Order Manager — defines warehouse picking capacity and lead times
- [x] How Service Order Manager calculates dispatch dates and sends them to External Routing Provider
- [x] External Routing Provider behavior when receiving absurd dispatch dates — returns empty slots

### Business Logic
- [x] How picking capacity templates drive dispatch date calculation
- [x] What happens when template has undefined scenarios — nonsensical dates produced

### Process
- [x] Root cause — someone modified picking capacity thresholds in production, creating undefined template scenarios
- [x] Detection — 3-hour investigation, no automated alerts fired
- [x] Impact — partial (specific zip codes + truck/curbside only)
- [x] Fix — reverted template configuration change (2-minute workaround)

### Missing Safeguards
- [x] No validation on config values
- [x] No impact preview
- [x] No post-change health monitoring
- [x] No four-eyes approval for production config changes

## Human Answers

The human provided all answers directly:

- **Market**: Australia (AU). Single market, not whole APAC.
- **"Book" means**: Customer reaches checkout, system queries delivery time slots, returns nothing for certain zip codes trying to book truck or curbside delivery.
- **System**: Service Order Manager has a picking capacity template system — configuration defining warehouse picking capacity and lead times per fulfillment unit. Modifiable directly in production.
- **Root cause**: Someone modified picking capacity thresholds in production. The change created undefined template scenarios for certain stores. Service Order Manager calculated dispatch dates months in the future. External Routing Provider received those absurd dates and correctly returned no delivery slots.
- **Impact**: Only specific zip codes and truck/curbside delivery types. Parcel unaffected. System-wide order counts looked normal. No alerts — technically nothing errored.
- **Investigation**: 3 hours. Subtle and partial, not a complete outage.
- **Fix**: Reverted the template configuration change. 2-minute workaround once identified.
- **Pattern**: Production configuration change without validation. No value bounds, no impact preview, no post-change alerting.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Picking Capacity Template | jargon-tech | Created | `entities/jargon-tech/picking-capacity-template.md` |
| Production Config Without Validation | jargon-tech | Created | `entities/jargon-tech/production-config-without-validation.md` |
| Service Order Manager | system | Updated | `entities/systems/service-order-manager.md` |
| External Routing Provider | system | Updated | `entities/systems/external-routing-provider.md` |
| Checkout Delivery Options Flow | process | Updated | `entities/processes/checkout-delivery-options-flow.md` |

## Agent After (With Context)

### Root Cause Chain
```
Someone modified picking capacity template thresholds in production (Service Order Manager)
    |
Change created undefined template scenarios for certain store/delivery-type combinations
    |
Service Order Manager calculated dispatch dates months in the future for affected stores
    |
Dispatch dates sent to External Routing Provider (RoutingPlatformV2)
    |
External Routing Provider correctly returned zero slots (can't deliver months out)
    |
DeliveryOptionsOrchestrator returned empty results to frontend
    |
Customer saw no delivery options for truck/curbside in affected zip codes
```

### Why It Was Hard to Find
1. **Partial impact**: Only specific zip codes + truck/curbside. Parcel unaffected. Aggregate metrics normal.
2. **No errors**: Every system behaved correctly given its inputs. No exceptions, no alerts.
3. **Config-driven**: Failure in data, not logic. Logs showed normal processing.

### Anti-Pattern
Same systemic pattern as `cross-compartment-deployment-error` — correct logic operating on bad configuration with no validation, no impact preview, and no post-change monitoring. Documented as `production-config-without-validation`.

**Confidence: 5/5**

## Human Review

Score: **4.2/5**. No corrections requested.
