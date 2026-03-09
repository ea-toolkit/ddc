---
cycle_id: "015"
problem_name: routing-platform-migration-data-corruption
date_started: 2026-03-09
date_completed: 2026-03-09
time_spent_minutes: 30
entities_created: 1
entities_updated: 2
entities_reused: 5
confidence_before: 2
confidence_after: 2
human_score: 3
checklist_size: 13
domain: retailco
---

# 015 — Routing Platform Migration Data Corruption

## Problem Input

User reported: "During a data migration from the legacy routing platform to the new version, order data is getting corrupted. Some orders appear in both systems, others in neither."

## Agent Before (Zero Context)

Searched the knowledge base and found relevant entities:
- `external-routing-provider` — documents V1/V2 shared database architecture
- `migration-traffic-amplification` — documented V1→V2 incident (access level bug)
- `orders-not-dropping` — 11 documented variants of orders disappearing
- `order-to-delivery-flow` — end-to-end order flow
- `service-order-manager` — SaveWorkOrder duplication known issue

**Attempt**: Hypothesized three possible causes: (1) shared database concurrent access during parallel run, (2) SaveWorkOrder duplication amplified during migration, (3) migration-induced DB throttling causing silent transaction failures.

**Confidence: 2/5** — Could identify architectural risks but had no information about the actual migration mechanism, cutover strategy, or whether this was a real incident.

## Information Checklist

### Terminology Needed
- [ ] What "data migration" means specifically — data ETL, user traffic migration, or configuration migration?
- [ ] What "corrupted" means — garbled fields, wrong states, or wrong system assignment?

### Systems Needed
- [ ] Migration mechanism (tool, script, replication, dual-write?)
- [ ] Whether V1 and V2 have one shared DB or separate DBs needing sync
- [ ] Cutover strategy (big bang, gradual, feature flags?)

### Business Logic Needed
- [ ] Source of truth during migration
- [ ] Reconciliation process between V1 and V2
- [ ] Which order states/lifecycle phases affected

### Data Needed
- [ ] Order data fields being migrated
- [ ] Foreign key / reference integrity during migration
- [ ] Order ID mapping between V1 and V2

### Process Needed
- [ ] Migration runbook / cutover steps
- [ ] Rollback plan
- [ ] Real-time monitoring during migration
- [ ] Whether this is a documented incident or hypothetical concern

## Human Answers

User provided vague, speculative input:
- "I think they were running both systems in parallel for a while?"
- "Orders were supposed to flow through one or the other based on some routing logic"
- "They share the same database backend" (confirmed existing KB knowledge)
- "Some orders got picked up by both systems" (unverified claim)
- "Could've been the script corrupting data, or maybe orders were in-flight" (speculation)
- Mentioned SaveWorkOrder duplication as compounding factor (confirmed existing KB knowledge)
- "Some stores reported orders missing entirely" (unverified claim)

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Parallel Run Data Corruption | jargon-tech | Created (as theoretical risk) | `entities/jargon-tech/parallel-run-data-corruption.md` |
| External Routing Provider | system | Updated (added theoretical migration risk) | `entities/systems/external-routing-provider.md` |
| Orders Not Dropping | jargon-tech | Updated then reverted (variant #12 removed — not documented) | `entities/jargon-tech/orders-not-dropping.md` |

## Agent After — Attempt 1 (Rejected)

Treated the user's vague, speculative input as confirmed facts. Created `parallel-run-data-corruption` entity as `status: active` with definitive language ("both systems were run in parallel", "created data integrity issues"). Added variant #12 to `orders-not-dropping` as a documented incident. Rated confidence 4/5.

**What was wrong**: The agent accepted speculation as fact. The user's language was hedging ("I think", "could've been"), indicating uncertainty, not confirmed knowledge. The agent should have:
1. Challenged vague input with follow-up questions
2. Distinguished between confirmed architecture (shared DB) and unverified claims (parallel run causing corruption)
3. Asked for incident tickets, post-mortems, or other evidence
4. Not added an undocumented variant to the `orders-not-dropping` pattern as if it were real

## Human Correction

Human scored 3/5. Key feedback:
- Pattern recognition and architectural reasoning were good
- **Critical failure**: Agent did not challenge vague, misleading information
- Agent should distinguish between: documented facts, synthesized patterns, and accepted speculation
- The parallel-run data corruption entity should be marked as theoretical/hypothetical, not as a documented incident
- Variant #12 in `orders-not-dropping` should be removed — not a documented incident
- "When domain expert gives vague answer, CHALLENGE IT. Real experts expect follow-up questions."

## Agent After — Attempt 2 (Accepted)

Corrected all three entities:
1. `parallel-run-data-corruption.md` — rewritten as theoretical risk (`status: planned`), explicit sections for "What IS documented" vs "What is NOT documented", confidence disclaimer
2. `orders-not-dropping.md` — removed variant #12 entirely
3. `external-routing-provider.md` — reframed migration risk #2 as "(theoretical risk)"

**Confidence: 2/5** — correctly recalibrated. The vague human input did not provide verified new knowledge. What's documented remains unchanged: the access level bug incident (variant #11) and the shared database architecture.

## Human Review

Score: 3/5. The agent demonstrated good architectural reasoning and pattern recognition but failed a critical DDC skill: challenging vague input. Key lesson for future cycles:

- Vague expert input ("I think...", "could've been...") is a signal to ask follow-up questions, NOT to curate entities
- Always ask: "Is this a documented incident or are you speculating?"
- Confidence should not increase just because a human said something — it should increase when a human provides *specific, verifiable* information
- The correction loop itself was valuable: the agent learned to distinguish documented facts from synthesized reasoning from accepted speculation
