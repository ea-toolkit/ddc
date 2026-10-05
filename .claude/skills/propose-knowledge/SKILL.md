---
name: propose-knowledge
description: Run after an incident resolves. Write back what was MISSING as proposed entities, stamp what you used, and open a PR — never merge your own.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Propose, never publish

The loop closes here. After an incident resolves, the agent writes back the context it **had
to ask for** — the `MISSING` items from [demand-context](../demand-context/SKILL.md) — as
**proposed** entities, and refreshes what it relied on. It proposes; a human merges. An agent
that publishes its own knowledge into the base is how the base rots; the review gate is the
point, not an obstacle.

Close the loop for this resolved incident and its demand list: `$ARGUMENTS`

## Steps

1. **One entity per MISSING item.** Draft it under the same type you demanded it under, in the
   format from `.claude/rules/entity-format.md` (`type · id · name · description · status`),
   filed at `domain-knowledge/entities/<type>/<id>.md`.
2. **Provenance is mandatory.** No entity without, in its frontmatter:
   - `source:` — where the answer came from (the human who answered, a ticket, a doc).
   - `owned_by:` — the team id that owns this knowledge going forward.
3. **Freshness is mandatory.** Nothing is true forever:
   - `last_verified:` — today's date, since the incident just confirmed it.
   - `stale_after:` — when it must be re-checked (e.g. 90 days out).
4. **Refresh what you read.** For every existing entity you relied on during triage, stamp its
   `last_verified` — or, if the incident proved it wrong, open a correction instead of silently
   editing it.
5. **Open a PR. Never merge your own.** Branch, commit the proposals + refreshes, push, open
   the PR. A human reviews and merges.

## Output

One PR containing: a new entity file per MISSING item (each carrying `source`, `owned_by`,
`last_verified`, `stale_after`), plus `last_verified` stamps or corrections on the entities
that were read. The agent stops at *proposed* — the merge is a human decision.

> Provenance + freshness are what make a proposal trustworthy enough to review. An entity with
> no source can't be verified; one with no `stale_after` silently becomes the next incident's
> wrong answer.
