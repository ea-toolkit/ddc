---
cycle_id: "001"
problem_name: "Vendor Integration Questions"
date_started: 2025-09-02
date_completed: 2025-09-02
time_spent_minutes: 45
entities_created: 8
entities_updated: 0
domain: "healthcare-claims"
---

# Cycle 001: Vendor Integration Questions

## Problem Input

New claims engine vendor asked three integration questions during onboarding: (1) Why does adjudication require a pre-auth lookup? (2) Who owns eligibility decisions? (3) Should claim processing be batch or real-time?

## Agent Before (Zero Context)

Generic healthcare answers. Could not explain the pre-auth decision code branching logic. Conflated member eligibility with provider eligibility. Gave a non-committal batch vs real-time answer without referencing actual claim types or SLAs.

## Information Checklist

- Claims lifecycle stages and transitions
- Systems involved in adjudication
- Pre-authorization dependency and decision code branching
- Member vs provider eligibility ownership
- Claim formats (EDI 837 professional vs institutional)
- Processing modes (batch vs real-time) and SLAs

## Human Answers

Domain expert provided specific details on pre-auth branching logic (approved/denied/not-required), clarified that member eligibility is owned by Eligibility Service while provider eligibility (network status) is owned by Provider Directory, and explained that professional claims are real-time (30s SLA) while institutional are batch (4-hour window).

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Adjudication | jargon-business | created | entities/jargon-business/adjudication.md |
| Pre-Authorization | jargon-business | created | entities/jargon-business/pre-authorization.md |
| Claims Gateway | system | created | entities/systems/claims-gateway.md |
| Rules Engine | system | created | entities/systems/rules-engine.md |
| Eligibility Service | system | created | entities/systems/eligibility-service.md |
| Pre-Auth Service | system | created | entities/systems/pre-auth-service.md |
| Provider Directory | system | created | entities/systems/provider-directory.md |
| Claims Processing | capability | created | entities/capabilities/claims-processing.md |

## Agent After (With Context)

All three answers contained specific system names, ownership boundaries, branching logic, and SLAs. The vendor could design their integration from these answers alone without further clarification.

## Human Review

Domain expert validated all answers. Minor clarification added to pre-auth decision code terminology. No missing context identified.

## Context Reuse Notes

adjudication + pre-authorization reused in cycles 002, 004, 005. eligibility-service + provider-directory reused in 003. Batch/real-time context saved ~20 min in cycle 004.
