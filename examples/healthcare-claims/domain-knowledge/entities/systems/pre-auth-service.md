---
type: system
id: pre-auth-service
name: Pre-Auth Service
description: Manages the prior authorization lifecycle from request submission through clinical evaluation to determination.
status: active
owner_team: claims-operations
make_or_buy: make
implements_capability: claims-processing
related_systems: [claims-gateway, rules-engine, eligibility-service, provider-directory, member-portal]
---

# Pre-Auth Service

## Overview

Manages the prior authorization lifecycle. Accepts authorization requests from providers, evaluates them against clinical criteria, and issues determinations (approved, denied, pended for clinical review). Target 60% auto-approval rate for routine requests.

## Responsibilities

- Accept pre-authorization requests from providers
- Auto-evaluate requests against clinical criteria
- Route complex cases to clinical reviewers
- Issue authorization determinations with approval codes
- Track authorization validity periods
- Provide authorization status to claims gateway during adjudication
- Support authorization appeals and reconsiderations
- Maintain auth-required service lists per benefit plan

## Key Decisions / Logic

- Standard authorizations are valid for 90 days
- Surgical authorizations are valid for 60 days
- Target auto-approval rate is 60% for routine, low-complexity requests
- Auth-required service lists are updated quarterly per benefit plan

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Claims Gateway | Inbound | Provides authorization status for claim validation |
| Rules Engine | Inbound | Provides authorization decision codes for adjudication |
| Eligibility Service | Outbound | Verifies member eligibility for authorization requests |
| Provider Directory | Outbound | Validates requesting provider credentials |
| Member Portal | Outbound | Displays authorization request status to members |
