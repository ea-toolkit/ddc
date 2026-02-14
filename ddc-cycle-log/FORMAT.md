# DDC Cycle Log Format

Each DDC cycle is logged as a single Markdown file with YAML frontmatter. Cycle logs capture the full demand-driven context loop: what the agent needed, what the human provided, and what was curated.

## File Naming

```
<cycle-number>-<problem-name>.md
```

Example: `001-vendor-integration-questions.md`

## Format

```yaml
---
cycle_id: "001"
problem_name: "Short problem description"
date_started: YYYY-MM-DD
date_completed: YYYY-MM-DD
time_spent_minutes: N
entities_created: N
entities_updated: N
domain: "domain-name"
---

# Cycle NNN: Problem Name

## Problem Input

What triggered this cycle? Source document, question, design task.

## Agent Before (Zero Context)

What did the agent produce with no domain context? Capture the output
or a summary of what it got wrong / couldn't answer.

## Information Checklist

What did the agent say it needed? List the gaps it identified,
organized by type (terminology, systems, data models, etc.).

## Human Answers

What did the domain expert provide? Targeted answers to the
checklist items.

## Entities Curated

What structured entities were created or updated as a result?

| Entity | Type | Action | File |
|--------|------|--------|------|
| ... | jargon-business | created | entities/jargon-business/... |

## Agent After (With Context)

What did the agent produce after receiving curated context?
How did output quality change?

## Human Review

Did the domain expert validate the output? What corrections
were needed? What context was still missing?

## Context Reuse Notes

Which entities from this cycle were reused in later cycles?
(Fill in retrospectively as more cycles are completed.)
```

## Guidelines

- **Log every cycle.** Even quick ones. Data is irreplaceable.
- **Be honest about failures.** If the agent still got it wrong after context, note why.
- **Track time.** Minutes spent on the full cycle (agent + human + curation).
- **Count entities.** Both created and updated — this feeds the coverage curve.
- **Note reuse.** When a later cycle benefits from entities curated here, update the reuse notes.