---
cycle_id: "004"
problem_name: "Batch vs Real-Time Claims Processing"
date_started: 2025-09-22
date_completed: 2025-09-22
time_spent_minutes: 40
entities_created: 2
entities_updated: 2
domain: "healthcare-claims"
---

# Cycle 004: Batch vs Real-Time Claims Processing

## Problem Input

Architecture decision: should the new claims engine process individual claims in real-time or batch them overnight? Need a formal ADR with recommendation.

## Agent Before (Zero Context)

Generic pros/cons list for batch vs real-time processing. No understanding of actual claim volumes, SLAs, downstream dependencies, or regulatory constraints (14-day clean claim payment requirement).

## Information Checklist

- Current processing modes by claim type
- Volume and throughput requirements
- Downstream system dependencies
- Regulatory constraints on payment timeliness
- SLA requirements

## Human Answers

Domain expert provided volumes, SLAs, and the key insight that professional claims (CMS-1500) are already real-time with 30-second SLA while institutional claims (UB-04) are batch with 4-hour windows. Regulatory requirement: clean claims must be paid within 14 days.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Payment Engine | system | created | entities/systems/payment-engine.md |
| Batch vs Real-Time Decision | decision | created | decisions/active/batch-vs-realtime.md |
| Claims Gateway | system | updated | entities/systems/claims-gateway.md |
| Rules Engine | system | updated | entities/systems/rules-engine.md |

## Agent After (With Context)

Produced a proper ADR recommending maintaining dual-mode processing (real-time for professional, batch for institutional) with a migration path to near-real-time for institutional claims in 2026. Referenced specific regulatory requirements (14-day clean claim payment).

## Human Review

Validated. ADR accepted by architecture review board. Convergence signal: only 2 new entities — strongest reuse yet.

## Context Reuse Notes

Heavy reuse from cycles 001-003. Payment engine reused in cycle 005.
