---
type: data-model
id: member
name: Member
description: An enrolled individual covered by a health insurance plan.
related_systems: [eligibility-service, member-portal]
---

# Member

## Overview

An enrolled individual covered by a health insurance plan. Members may be subscribers (primary policyholders) or dependents (spouse, children). The member record is the basis for eligibility verification and benefit determination.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| member_id | string | Unique member identifier |
| subscriber_id | string | Subscriber (policyholder) identifier |
| first_name | string | Member's first name |
| last_name | string | Member's last name |
| date_of_birth | date | Member's date of birth |
| gender | enum | Member's gender |
| relationship_to_subscriber | enum | Self, spouse, or child |
| enrollment_effective_date | date | Coverage start date |
| enrollment_term_date | date | Coverage end date (null if active) |
| plan_id | string | Assigned benefit plan identifier |
| pcp_provider_npi | string | Primary care provider NPI (for HMO/POS plans) |
| cob_other_payer_info | object | Other insurance information for COB |

## Relationships

- Enrolled in a **Policy**
- Assigned to a **Benefit Plan**
- May have dependent **Members** (if subscriber)
- Has **Claims** submitted on their behalf
- May have a PCP assignment (**Provider**)

## Lifecycle

Enrolled -> Active -> (COBRA/Continuation) -> Terminated
