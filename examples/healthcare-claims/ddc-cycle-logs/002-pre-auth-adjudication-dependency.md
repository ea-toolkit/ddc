---
cycle_id: "002"
problem_name: "Pre-Auth Adjudication Dependency"
date_started: 2025-09-08
date_completed: 2025-09-08
time_spent_minutes: 30
entities_created: 3
entities_updated: 2
domain: "healthcare-claims"
---

# Cycle 002: Pre-Auth Adjudication Dependency

## Problem Input

Product Owner asks why pre-authorization must complete before adjudication starts. Needs to understand the dependency for sprint planning of the new claims engine.

## Agent Before (Zero Context)

Generic "best practice" answer about pre-authorization. Could not explain the specific three-way branching dependency: approved -> in-network cost-sharing rules, denied -> auto-deny the claim, not-required -> skip pre-auth validation.

## Information Checklist

- Pre-auth decision codes and their meaning
- How decision codes drive adjudication branching
- Impact on EOB generation
- Cost-sharing calculation dependencies

## Human Answers

Domain expert explained the three-way branching in detail: the pre-auth decision code (approved/denied/not-required) determines which adjudication rule path executes. Also explained how deductible and allowed amount calculations feed into EOB generation.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| EOB | jargon-business | created | entities/jargon-business/eob.md |
| Allowed Amount | jargon-business | created | entities/jargon-business/allowed-amount.md |
| Deductible | jargon-business | created | entities/jargon-business/deductible.md |
| Adjudication | jargon-business | updated | entities/jargon-business/adjudication.md |
| Pre-Authorization | jargon-business | updated | entities/jargon-business/pre-authorization.md |

## Agent After (With Context)

Fully explained the dependency chain with specific decision codes, branching logic, and downstream impact on EOB generation. PO could make informed sprint planning decisions.

## Human Review

Validated. Key insight noted: convergence signal — only 3 new entities needed because 4 entities from cycle 001 were directly reusable.

## Context Reuse Notes

Reused adjudication, pre-authorization, claims-gateway, rules-engine from cycle 001 (saved ~15 minutes). EOB and allowed-amount reused in cycles 004, 005.
