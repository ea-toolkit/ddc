---
type: system
id: eligibility-service
name: Eligibility Service
description: Authoritative source for member enrollment, benefit plan assignment, and accumulator tracking with real-time eligibility verification.
status: active
owner_team: member-services
make_or_buy: make
implements_capability: member-management
related_systems: [claims-gateway, rules-engine, pre-auth-service, member-portal, provider-directory, fraud-detection]
---

# Eligibility Service

## Overview

Authoritative source for member enrollment and benefits. Handles EDI 270/271 eligibility inquiry/response transactions. Tracks benefit accumulators (deductible, out-of-pocket maximum) with soft reservations for concurrent claims. Supports point-in-time eligibility queries.

## Responsibilities

- Maintain member enrollment records and status
- Process EDI 270/271 eligibility inquiry and response transactions
- Provide real-time eligibility verification for providers and internal systems
- Track benefit accumulators (deductible met, OOP max progress)
- Support point-in-time eligibility queries (as-of-date lookups)
- Manage coordination of benefits (COB) data
- Handle retroactive enrollment changes and trigger claim reprocessing
- Maintain benefit plan assignment for each member

## Key Decisions / Logic

- Retroactive enrollment changes (up to 60 days back) trigger automatic claim reprocessing
- Accumulators use soft reservations to prevent over-application during concurrent claim processing
- Point-in-time queries evaluate eligibility as of the claim's date of service
- COB other-payer information is maintained per member for coordination

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Claims Gateway | Inbound | Provides eligibility verification at claim intake |
| Rules Engine | Inbound | Provides eligibility and accumulator data during adjudication |
| Pre-Auth Service | Inbound | Verifies eligibility for authorization requests |
| Member Portal | Outbound | Displays eligibility status and benefit balances |
| Provider Directory | Outbound | Shares eligibility data for provider queries |
| Fraud Detection | Inbound | Provides member data for fraud analysis |
