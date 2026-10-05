---
name: demand-context
description: Run during incident triage. Don't diagnose — report the knowledge you'd need to triage, and mark what the knowledge base is missing.
allowed-tools: Read, Glob, Grep
---

# Demand context, don't guess

This skill changes the question. Instead of asking the agent to **solve** the incident, it
asks what the agent **would need to know** to solve it. The output stops being a guessed
diagnosis and becomes a ranked list of context — found or missing. The missing items are the
signal: they are what the knowledge base owes the next responder, surfaced by real demand
rather than imagined up front.

Triage this alert — do **not** attempt a root cause: `$ARGUMENTS`

## Steps

1. **List what you'd need to know** to decide which team owns this and where to look next.
   One line per item.
2. **Resolve each item against the knowledge base** (`domain-knowledge/entities/`, diagrams,
   decisions). Mark it:
   - `FOUND` — cite the exact source (`path#anchor` or entity `id`).
   - `MISSING` — the base does not answer it.
3. **Type every item** so it can be owned, using an id from
   `domain-knowledge/meta/entity-types.yaml` — e.g. `system · capability · process ·
   business-event · data-model · api · platform · domain-logic · reference-data ·
   external-party · persona · team · jargon-business · jargon-tech`.
4. **Never infer a cause from a MISSING item.** Name the gap and stop — a guess past a gap is
   the failure mode this skill exists to prevent.
5. **Rank the MISSING items** by what blocks triage first.

## Output

A single table — no root-cause claim:

| # | What you need to know | Type | Status | Source (if found) |
|---|-----------------------|------|--------|-------------------|
| 1 | …                     | system | FOUND | `entities/systems/order-service.md` |
| 2 | …                     | process | **MISSING** | — |

Then the MISSING items, ranked by triage impact. Those gaps are the deliverable.

> After the incident resolves, run [propose-knowledge](../propose-knowledge/SKILL.md) — it
> writes the MISSING items back as reviewable proposals, closing the loop.
