---
type: system
id: member-portal
name: Member Portal
description: Self-service web and mobile application for members to view claims, benefits, EOBs, and find providers.
status: active
owner_team: member-services
make_or_buy: make
implements_capability: member-management
related_systems: [claims-gateway, eligibility-service, provider-directory, payment-engine, pre-auth-service]
---

# Member Portal

## Overview

Self-service web and mobile application for plan members. Provides access to claims status, benefit balances, provider search, EOB documents, out-of-network claim submission, pre-authorization status, and digital ID cards.

## Responsibilities

- Display claims status and history
- Show benefit balances and accumulator progress (deductible, OOP max)
- Provide provider search with network status filtering
- Display and download EOB documents
- Allow members to submit out-of-network claims
- Show pre-authorization request status
- Provide digital insurance ID cards
- Support secure messaging with member services

## Key Decisions / Logic

- Claims data reflects adjudication results within 15 minutes of processing
- All member data access is HIPAA-scoped — members only see their own data
- Provider search results include real-time network status
- EOB documents are available digitally before physical mail delivery

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Claims Gateway | Outbound | Submits OON claims on behalf of members |
| Eligibility Service | Inbound | Retrieves benefit balances and eligibility status |
| Provider Directory | Inbound | Powers provider search functionality |
| Payment Engine | Inbound | Retrieves member reimbursement status |
| Pre-Auth Service | Inbound | Displays pre-authorization request status |
