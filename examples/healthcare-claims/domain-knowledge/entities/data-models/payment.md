---
type: data-model
id: payment
name: Payment
description: A payment record representing funds disbursed for one or more adjudicated claims.
related_systems: [payment-engine, rules-engine]
---

# Payment

## Overview

A payment record representing funds disbursed for one or more adjudicated claims. Payments are batched by payee (provider TIN or member ID) and include associated remittance advice.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| payment_id | string | Unique payment identifier |
| payee_type | enum | Provider or member |
| payee_id | string | TIN (provider) or member_id (member) |
| payment_amount | decimal | Total payment amount |
| payment_method | enum | EFT, check, or virtual card |
| payment_date | date | Date payment was issued |
| payment_status | enum | Current payment status |
| claim_ids | list | Claims settled by this payment |
| remittance_id | string | Associated remittance advice ID |
| recoupment_amount | decimal | Amount recouped from overpayments |

## Relationships

- Settles one or more **Claims**
- Sent to a **Provider** (via TIN) or **Member** (via member_id)
- Has associated **Remittance Advice** (ERA 835)

## Lifecycle

Authorized -> Batched -> Issued -> Cleared (or Voided / Returned)
