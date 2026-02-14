---
type: system
id: payment-engine
name: Payment Engine
description: Translates adjudicated claims into financial transactions including provider payments, member reimbursements, and remittance advice.
status: active
owner_team: claims-operations
make_or_buy: make
implements_capability: payment-processing
related_systems: [rules-engine, provider-directory, member-portal, fraud-detection]
---

# Payment Engine

## Overview

Translates adjudicated claims into financial transactions. Handles provider payment batches, member reimbursements, ERA 835 remittance advice generation, and void/reissue workflows.

## Responsibilities

- Batch adjudicated claims into provider payment runs
- Generate provider payments via EFT, check, or virtual card
- Process member reimbursements for OON claims
- Generate ERA 835 electronic remittance advice
- Generate EOB documents for members
- Handle void and reissue workflows for incorrect payments
- Manage payment holds for fraud investigation
- Execute recoupment for overpayments

## Key Decisions / Logic

- Payments are batched per TIN (Tax Identification Number) per payment cycle
- Minimum payment threshold is $5 — amounts below are held until threshold is met
- Recoupments exceeding 50% of a payment are spread across multiple cycles
- Member reimbursements are processed within 10 business days

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Rules Engine | Inbound | Receives adjudicated claims for payment processing |
| Provider Directory | Inbound | Retrieves provider payment preferences and TIN |
| Member Portal | Outbound | Provides payment status and EOB data |
| Fraud Detection | Inbound | Receives payment hold/release instructions |
