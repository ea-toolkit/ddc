---
type: data-model
id: policy
name: Policy
description: An insurance policy defining coverage terms between the plan and an employer group or individual.
related_systems: [eligibility-service]
---

# Policy

## Overview

An insurance policy defining coverage terms between the plan and an employer group or individual. A policy contains one or more benefit plans and covers enrolled members.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| policy_id | string | Unique policy identifier |
| policy_holder | string | Employer group name or individual name |
| effective_date | date | Policy effective date |
| renewal_date | date | Next renewal date |
| policy_type | enum | Group, individual, Medicare, or Medicaid |
| benefit_plan_ids | list | Benefit plans offered under this policy |
| premium_amount | decimal | Monthly premium amount |
| policy_status | enum | Current policy status |

## Relationships

- Has one or more **Benefit Plans**
- Covers **Members** enrolled under the policy
- Held by an employer group or individual policyholder

## Lifecycle

Quoted -> Effective -> Renewed -> Terminated
