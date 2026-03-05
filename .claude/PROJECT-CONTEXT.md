# DDC Project Context

> Key decisions and context from the project setup phase. This file exists so context survives repo moves.

## Repository

- **Org**: ea-toolkit
- **Repo**: ddc (https://github.com/ea-toolkit/ddc)
- **Git author**: rajnavakoti <rajnavakoti@gmail.com>
- **History was rewritten** on 2026-03-02 to remove IKEA corporate email from all commits

## Research Context

- **Goal**: IEEE submission + arxiv paper on DDC methodology
- **Proof of concept**: This repo, with real DDC cycles demonstrating convergence
- **Participants**: Raj (author), arxiv/IEEE paper, this repo as PoC, readers/reviewers

## Domain Decision

- **Chosen approach**: Option 1 — Use IKEA domain knowledge but **abstracted/anonymized**
- **Public name**: "RetailCo" or similar — "a large European retailer"
- **Rule**: If someone from IKEA reads it, they should think "this could be us, or any large retailer"
- **Private mapping**: Keep real→anonymized name mapping in `.private/` (gitignored)
- **Why this approach**: Raj is the domain expert, can evaluate agent answer quality, real complexity

## Meta Model — Simplified DDC Version (13 entities)

Derived from IKEA's enterprise meta model (32 entities), simplified for general use:

| Layer | Entity | Origin | Notes |
|-------|--------|--------|-------|
| **What** | Offering | Product + Business Service merged | What the org delivers |
| **Who** | Team | NEW (missing from IKEA) | Who owns things |
| **Who** | Persona | NEW | User roles |
| **Why/What** | Business Capability | Kept as-is | Core architecture concept |
| **How** | Business Process | E2E + Module + Task merged | One level is enough |
| **How** | Business Event | Kept | What triggers what (Raj was lukewarm — may drop) |
| **With** | System | Software System + Subsystem merged | Software that runs things |
| **With** | API | Logical + Physical API merged | How systems talk |
| **With** | Data Model | Concept + Aggregate + Entity merged | What data exists |
| **With** | Data Product | NEW | Curated, governed data for consumption |
| **With** | Platform | Entire infra layer collapsed | Where systems run |
| **Context** | Jargon | NEW (business + tech) | Domain terminology |
| **Context** | Decision | NEW | Architecture decisions (ADRs) |

### What was cut from IKEA model and why:
- **Products & Services layer**: Collapsed to single "Offering" — too granular for most orgs
- **Value Stream, Org Unit, Business Role, Actor, Business Information Object**: Process layer was over-decomposed
- **Process Task**: Merged into Business Process — one level enough
- **Architecture Area Domain, Logical Component**: Architecture governance concepts, unnecessary overhead
- **Software Component, Software Code**: Too granular — belongs in codebase, not KB
- **Domain Event**: Replaced by publishes/consumes relationships on API
- **Entire infra layer (7 entities)**: Collapsed to single "Platform" concept
- **Data Concept, Data Aggregate, Data Entity**: Three levels merged into one "Data Model"

### Open question:
- Business Event: keep or drop? If dropped, stays at 12 entities.

## DDC Cycle Execution Plan

- **Target**: ~200-250 cycles over 20 days
- **Schedule**: Daily 5:30 AM - 8:30 AM
- **Ramp-up plan**:
  - Week 1 (empty KB): 5-8 cycles/day — heavy curation
  - Week 2 (building): 10-15 cycles/day — KB has a base
  - Week 3 (converging): 15-20 cycles/day — most entities exist
  - Week 4 (stress test): 20+ cycles/day — proving convergence

### Problem generation strategy (not pre-written questions):
- Problems, not trivia questions — scenarios requiring cross-entity reasoning
- Source from real IKEA work history, anonymized
- Each morning: pick 1-2 systems/capabilities, run through 3-4 agent lenses
- Mix agent types across cycles (TA, PO, SE, DA, SA)
- Phase strategy:
  - Cycles 1-5: Breadth — hit different entity types
  - Cycles 6-15: Depth — integration/cross-cutting questions
  - Cycles 16-20: Stress test — measure convergence

### What to track per cycle:
- New entities created vs reused
- Agent answer correctness (Raj judges)
- Demand checklist size (should shrink over time)

### Q&A vs Tasks:
- Cycles 1-10: Q&A (easier to evaluate)
- Cycles 11-20: Mix of Q&A and tasks

## Curation Model

- One curator per cycle, not per file
- Whichever agent runs the cycle curates what it needs
- No separate curator agent needed — `/ddc-cycle` skill handles it
- If conflicts arise (contradictory info from two agents), document as a paper finding

## TODO (next steps when resuming)

1. ~~Create the DDC meta model drawio diagram (13 entities)~~ DONE
2. ~~Update entity-types.yaml and relationship-types.yaml to match new meta model~~ DONE
3. ~~Set up auto-commit Claude Code hook for DDC cycles~~ DONE
4. ~~Create the anonymized RetailCo domain knowledge base from template~~ DONE
5. Start DDC cycles