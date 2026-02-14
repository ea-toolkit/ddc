---
type: system
id: rules-engine
name: Rules Engine
description: Vendor product executing adjudication rules against benefit plans, provider contracts, fee schedules, and medical policies.
status: active
owner_team: claims-operations
make_or_buy: buy
implements_capability: claims-processing
related_systems: [claims-gateway, eligibility-service, pre-auth-service, payment-engine, provider-directory, fraud-detection]
---

# Rules Engine

## Overview

Vendor product (currently being replaced) that executes adjudication rules. Evaluates claims against benefit plan terms, provider contracts, fee schedules, medical policies, and regulatory requirements. Produces a claim disposition: pay, deny, or pend.

## Responsibilities

- Execute adjudication rules against incoming claims
- Evaluate member benefit plan cost-sharing (deductible, copay, coinsurance)
- Apply provider contract fee schedules to determine allowed amounts
- Enforce medical policy edits and clinical rules
- Check pre-authorization status for auth-required services
- Determine claim disposition (pay, deny, or pend for manual review)
- Calculate member responsibility and plan liability
- Route adjudicated claims to payment engine

## Key Decisions / Logic

- Pre-auth lookup is mandatory before adjudication — the decision code drives branching logic
- Vendor provides the execution platform; rules are maintained internally by the claims operations team
- Cost-sharing is calculated against the allowed amount, not the billed amount
- Pended claims are routed to manual review queue with specific pend reason codes

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Claims Gateway | Inbound | Receives validated claims for adjudication |
| Eligibility Service | Outbound | Queries member eligibility and accumulators |
| Pre-Auth Service | Outbound | Looks up authorization status and decision codes |
| Payment Engine | Outbound | Sends adjudicated claims for payment processing |
| Provider Directory | Outbound | Queries provider network status and fee schedules |
| Fraud Detection | Outbound | Feeds post-payment analysis with adjudication data |
