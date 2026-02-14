---
type: api
id: payment-api
name: Payment API
description: API for payment processing, status queries, remittance retrieval, and payment hold management.
owner_system: payment-engine
related_systems: [member-portal, fraud-detection, provider-directory]
---

# Payment API

## Overview

API for payment processing, status queries, and remittance advice retrieval. Used by the member portal for reimbursement status, by fraud detection for payment holds, and by provider portals for remittance information.

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /payments/provider/{tin} | Get payment history for a provider (by TIN) |
| GET | /payments/member/{memberId} | Get member reimbursement history |
| GET | /payments/{id}/remittance | Get ERA 835 remittance advice for a payment |
| POST | /payments/hold | Place a payment hold (used by fraud detection) |
| DELETE | /payments/hold/{id} | Release a payment hold |

## Usage Patterns

The member portal queries the member reimbursement endpoint to display payment status. Fraud detection issues holds via the hold endpoint when claims score above the fraud threshold. Provider portals retrieve remittance advice to reconcile payments. The hold/release endpoints are restricted to fraud detection and SIU users.
