---
cycle_id: "003"
problem_name: weight-data-mispricing
date_started: 2026-03-07
date_completed: 2026-03-07
time_spent_minutes: 30
entities_created: 4
entities_updated: 3
entities_reused: 5
confidence_before: 2
confidence_after: 4
human_score: 4.5
checklist_size: 8
domain: retailco
---

# Cycle 003 — Weight Data Mispricing

## Problem Input

RetailCo's Picking Service sends weight data to the External Routing Provider, but delivery providers report that package weights are wildly incorrect — some packages listed at 1/1000th of actual weight. Thousands of shipments are mispriced.

## Agent Before (Zero Context)

The KB already contained hints — `picking-service` mentioned "weak interface validation" and "sent weight data in wrong units," `external-routing-provider` noted "weight data accuracy from upstream systems," and `order-to-delivery-flow` listed it as a known failure mode. However, the KB lacked specifics: what the API contract was, who does the conversion, what the data payload looks like, why there's no validation, and how pricing is affected.

**Confidence: 2/5** — Knew the symptom and the general area but couldn't explain the mechanism or recommend targeted fixes.

## Information Checklist

| # | Gap | Type | Resolved? |
|---|-----|------|-----------|
| 1 | API contract between Picking Service and External Routing Provider | api | Yes |
| 2 | Source of weight data for Picking Service | system | Partial — "upstream, probably product master or warehouse" |
| 3 | Who does the unit conversion | process | Yes — Picking Service |
| 4 | How TSPs use weight for pricing | jargon-business | Yes |
| 5 | How the error was detected | process | Yes — human reports, no automation |
| 6 | Which markets/fulfillment units affected | context | Yes — regional deployments, entire regions at once |
| 7 | Whether anyone validates weight ranges | system | Yes — nobody does |
| 8 | Product master data system | system | Partial — exists but not the root cause |

## Human Answers

Key facts provided by the domain expert:
- External Routing Provider expects weight in kilograms, no schema validation
- Picking Service is responsible for converting to kg from upstream source units
- Weight payload is a bare number — no unit metadata transmitted
- Neither Picking Service nor External Routing Provider validates ranges
- TSPs use weight (actual or volumetric) for pricing — wrong weights = wrong invoices
- Detection is human-driven (internal ops or TSP complaints), not automated
- Deployments roll out regionally, affecting thousands of orders within hours
- The actual known incident had weights 1000x too big (grams interpreted as kg), not 1000x too small as initially assumed — but both directions are possible

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| `picking-to-routing-parcel-api` | api | Created | `entities/apis/picking-to-routing-parcel-api.md` |
| `parcel-shipping-data` | data-model | Created | `entities/data-models/parcel-shipping-data.md` |
| `unit-conversion-bug` | jargon-tech | Created | `entities/jargon-tech/unit-conversion-bug.md` |
| `weight-based-pricing` | jargon-business | Created | `entities/jargon-business/weight-based-pricing.md` |
| `picking-service` | system | Updated | `entities/systems/picking-service.md` |
| `external-routing-provider` | system | Updated | `entities/systems/external-routing-provider.md` |
| `order-to-delivery-flow` | process | Updated | `entities/processes/order-to-delivery-flow.md` |

## Agent After (With Context)

With curated entities, the agent produced a clear 7-step causal chain from upstream weight source through Picking Service conversion failure to TSP mispricing. Key improvements over the RED phase:

1. **Identified the exact mechanism**: Picking Service converts to kg, sends bare number, External Routing Provider assumes kg — no validation on either side
2. **Named the pattern**: `unit-conversion-bug` as a reusable concept, with three failure modes (no conversion, wrong multiplier, wrong direction)
3. **Quantified the blast radius**: Regional deployments mean entire regions affected, thousands of orders within hours
4. **Explained the detection gap**: No automated anomaly detection, reliance on human reports
5. **Proposed layered fixes**: Immediate validation, short-term unit metadata, medium-term anomaly detection

**Confidence: 4/5** — Strong understanding of mechanism, validation gaps, and financial impact. Remaining gap: exact upstream weight source.

## Human Review

**Score: 4.5/5**

Corrections applied:
- The known incident had weights 1000x too BIG (grams as kg), not 1000x too small. Updated `unit-conversion-bug` and `weight-based-pricing` to reflect that the error can go either direction.
- Added notes about the tiny correction window (most orders ship before detection) and regional rollout amplification.

Remaining gaps:
- Exact upstream source of weight data (product master DB? warehouse scales?) still unclear
- Rollback procedures for the Picking Service not documented