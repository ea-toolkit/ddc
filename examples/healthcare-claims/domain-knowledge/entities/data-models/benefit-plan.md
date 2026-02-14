---
type: data-model
id: benefit-plan
name: Benefit Plan
description: Specific benefits and coverage levels within a policy, defining cost-sharing and coverage rules.
related_systems: [eligibility-service, rules-engine]
---

# Benefit Plan

## Overview

Specific benefits and coverage levels within a policy, defining cost-sharing rules, coverage limits, and network tiers. The benefit plan is the primary reference during adjudication for determining member responsibility.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| plan_id | string | Unique plan identifier |
| plan_name | string | Display name for the plan |
| plan_type | enum | HMO, PPO, EPO, or POS |
| deductible_individual | decimal | Annual individual deductible amount |
| deductible_family | decimal | Annual family deductible amount |
| oop_max_individual | decimal | Annual individual out-of-pocket maximum |
| oop_max_family | decimal | Annual family out-of-pocket maximum |
| copay_schedule | map | Service type to copay amount mapping |
| coinsurance_in_network | decimal | In-network coinsurance percentage |
| coinsurance_out_of_network | decimal | Out-of-network coinsurance percentage |
| auth_required_services | list | Services requiring prior authorization |
| formulary_id | string | Reference to prescription drug formulary |

## Relationships

- Belongs to a **Policy**
- Assigned to **Members** upon enrollment
- Referenced by the **Rules Engine** during adjudication

## Lifecycle

Designed -> Filed (with regulator) -> Active -> Discontinued
