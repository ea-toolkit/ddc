---
type: data-model
id: claim
name: Claim
description: A submitted request for payment for healthcare services rendered to a member.
related_systems: [claims-gateway, rules-engine, payment-engine]
---

# Claim

## Overview

A submitted request for payment for healthcare services rendered to a member. The core transactional entity in the claims processing domain, flowing through intake, validation, adjudication, and payment.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| claim_id | string | Unique claim identifier |
| member_id | string | Reference to the enrolled member |
| provider_npi | string | National Provider Identifier of the rendering provider |
| date_of_service | date | Date the service was rendered |
| procedure_codes | list | CPT/HCPCS procedure codes for services performed |
| diagnosis_codes | list | ICD-10 diagnosis codes |
| billed_amount | decimal | Amount billed by the provider |
| allowed_amount | decimal | Maximum payable amount per contract/fee schedule |
| plan_paid_amount | decimal | Amount paid by the health plan |
| member_responsibility | decimal | Amount owed by the member (deductible + copay + coinsurance) |
| claim_status | enum | Current status (received, validated, eligible, adjudicated, paid, denied, pended) |
| claim_type | enum | Professional or institutional |
| submission_date | date | Date the claim was submitted |
| adjudication_date | date | Date the claim was adjudicated |

## Relationships

- Belongs to a **Member** (via member_id)
- Submitted by a **Provider** (via provider_npi)
- Processed under a **Policy/Benefit Plan**
- May generate a **Payment** record
- May reference a **Pre-Authorization**

## Lifecycle

Received -> Validated -> Eligible -> Adjudicated (Paid / Denied / Pended) -> Payment Issued
