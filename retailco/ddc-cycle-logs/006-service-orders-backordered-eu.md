---
cycle_id: "006"
problem_name: EU orders falsely backordered due to cross-compartment deployment error
date_started: 2026-03-07
date_completed: 2026-03-07
time_spent_minutes: 45
entities_created: 7
entities_updated: 4
entities_reused: 6
confidence_before: 1
confidence_after: 4
human_score: 4
checklist_size: 12
domain: retailco
---

# 006 — EU Orders Falsely Backordered Due to Cross-Compartment Deployment Error

## Problem Input

Orders placed through the Service Order Manager are immediately getting backordered across the EU region, even when inventory is available. Customers see their orders stuck with no delivery date.

## Agent Before (Zero Context)

The knowledge base had no coverage of inventory/availability systems, backorder logic, or the concept of "backordered" as an order status. The agent could identify that the Service Order Manager is central to order lifecycle and that "orders not dropping" is a recurring pattern, but had no vocabulary or entities to reason about inventory allocation, ATP checks, or backorder status.

**Attempt**: Guessed that "something in the Service Order Manager or a system it checks is returning incorrect inventory/availability data for EU markets." Could not go further.

**Confidence**: 1/5

**Demand Checklist** (12 items):
- [ ] What does "backordered" mean in RetailCo's systems?
- [ ] Difference between "backordered" and "ReadyToAssign stuck"?
- [ ] What system handles inventory/availability checks?
- [ ] What system assigns the "backordered" status?
- [ ] What is the backorder logic?
- [ ] Is backorder logic market-specific?
- [ ] What determines "inventory available" (real-time stock, ATP)?
- [ ] What data does the Service Order Manager use for availability decisions?
- [ ] Recent configuration changes affecting EU?
- [ ] All order types affected or specific channels?
- [ ] All EU markets or specific ones?
- [ ] When did this start?

## Human Answers

The domain expert provided partial answers:

- **Backordered** = inventory not available, order queued waiting for stock, customer gets no firm delivery date
- **Distinction from ReadyToAssign**: Backordered is for product orders (inventory), ReadyToAssign stuck is for service orders (assembly/installation)
- **Inventory system**: "There's definitely an inventory system... probably multiple. Warehouses track their own stock, there might be a central inventory service."
- **Backorder assignment**: "Probably ServiceOrderManager, or maybe something that talks to it about inventory allocation"
- **Backorder logic**: If system can't find available inventory at a fulfillment location that can ship to customer, marks backordered. Exact rules unknown.
- **ATP**: "Real-time stock levels for sure. Might also factor in reserved inventory, in-transit stock, safety stock thresholds."
- **Hint about root cause**: "I vaguely remember something about human error and wrong region selection but I don't have the full story"
- Expert acknowledged gaps in their own knowledge and suggested exploring distribution point configuration and recent change logs

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Backordered | jargon-business | Created | `entities/jargon-business/backordered.md` |
| Available-to-Promise (ATP) | jargon-business | Created | `entities/jargon-business/available-to-promise.md` |
| Distribution Point (DP) | jargon-business | Created | `entities/jargon-business/distribution-point.md` |
| Inventory Allocation | capability | Created | `entities/capabilities/inventory-allocation.md` |
| Compartment / Environment | jargon-tech | Created | `entities/jargon-tech/compartment-environment.md` |
| Cross-Compartment Deployment Error | jargon-tech | Created | `entities/jargon-tech/cross-compartment-deployment-error.md` |
| Four-Eyes Principle | jargon-tech | Created | `entities/jargon-tech/four-eyes-principle.md` |
| Service Order Manager | system | Updated | `entities/systems/service-order-manager.md` |
| Order to Delivery Flow | process | Updated | `entities/processes/order-to-delivery-flow.md` |
| Orders Not Dropping | jargon-tech | Updated | `entities/jargon-tech/orders-not-dropping.md` |
| Fulfillment Unit | jargon-business | Updated | `entities/jargon-business/fulfillment-unit.md` |

### Deleted (fabricated during cycle, reverted)
| Entity | Type | Reason |
|--------|------|--------|
| Change Data Capture | jargon-tech | Fabricated — agent treated unverified hypothesis as confirmed fact |
| Distribution Center | jargon-business | Replaced with Distribution Point (DP) due to anonymization collision |

## Agent After — Attempt 1 (Rejected)

The agent hypothesized that a "market-to-DP mapping" misconfiguration caused the ATP logic to check the wrong fulfillment locations. This was wrong because:
- It focused on the **logic layer** (ATP checking wrong DPs) rather than the **data layer**
- It created generic vocabulary entities without insight into the actual incident
- The agent glossed over the "migration" hint without exploring what was being migrated
- Confidence claimed: 3/5 (overconfident for a guess)

### Human Correction (Round 1)

The expert pointed out:
- The agent was looking at the wrong layer — the ATP logic itself was fine
- The agent built "vocabulary without insight"
- The expert posed diagnostic questions about data replication, region tagging, and data capture mechanisms
- These were **questions to explore**, not confirmed answers
- The expert explicitly said "your confidence should still be 1.5/5"

## Agent After — Attempt 2 (Rejected)

The agent treated the expert's diagnostic questions as confirmed root cause. It:
- Created a fabricated entity describing a data replication pipeline that does not exist in this incident
- Wrote detailed incident narratives into multiple entities claiming data capture misconfiguration was the confirmed cause
- Went from "guessing the wrong layer" to "confidently documenting a wrong root cause"
- This was **worse** than Attempt 1 — it polluted the knowledge base with fabricated facts presented as truth
- Confused an abbreviation for distribution points (physical warehouse codes like DP-XXX, DP-YYY) with a data replication technology
- Confidence claimed: 3/5 (confidently wrong)

### Human Correction (Round 2)

The expert revealed the actual root cause:
- A cutover team ran an XML deployment script intended for the CN (China) compartment on the EU compartment
- This corrupted the Service Order Manager's inventory module configuration for EU
- ATP ran correctly against corrupted data — producing false backorders
- The abbreviation used in the incident report referred to physical distribution point warehouse codes, NOT a data replication technology
- The fabricated entity was entirely wrong and needed to be deleted
- The expert also provided the pattern name (cross-compartment deployment error) and missing safeguards (four-eyes principle)

## Agent After — Attempt 3 (Accepted)

With the confirmed root cause, the agent correctly identified:
- **Root cause**: Cutover team ran XML deployment script intended for CN compartment against EU compartment
- **Mechanism**: Corrupted Service Order Manager's inventory module configuration — ATP checked corrupted data — false backorders
- **Pattern**: "Correct logic, corrupted configuration" — every system works correctly in isolation, the failure is in the data/config
- **Missing safeguards**: No compartment validation, no four-eyes principle, no pre/post deployment health checks
- **Classification**: Added as root cause #8 to the "orders not dropping" pattern

**Confidence**: 4/5 (confirmed by domain expert, some operational details still unknown)

## Human Review

Expert confirmed Attempt 3 as correct.

### Key Lessons from This Cycle

1. **Never treat diagnostic questions as confirmed facts.** When a human says "what if X?", that's an invitation to explore, not a confirmation of X.
2. **Ask for the incident report.** The agent should have asked "can you point me to the specific incident?" instead of building theories.
3. **Vocabulary without insight is noise.** Generic definitions are useful, but entities must capture domain-specific patterns and real incident details to be actionable.
4. **Acronym disambiguation matters.** An abbreviation for distribution point warehouses was confused with a data replication technology. The agent assumed the wrong meaning and built an entire fabricated entity around it.
5. **Confidence scores must reflect actual certainty.** Claiming 3/5 while guessing is dishonest. The agent should have stayed at 1/5 until the root cause was confirmed.
