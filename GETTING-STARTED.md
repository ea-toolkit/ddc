# Getting Started with DDC

> **Goal**: Go from "cloned the repo" to "ran my first DDC cycle on my own domain" in under 30 minutes.

You need [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (or another AI coding agent) installed.

---

## Phase 1: See DDC in Action (10 min)

### Browse the example knowledge base

The repo includes a synthetic healthcare claims domain with ~40 entities and 5 cycle logs.

```bash
cd tooling
DDC_KNOWLEDGE_BASE_PATH=../examples/healthcare-claims/domain-knowledge ./start.sh
```

Open http://localhost:3000. Click around — look at entities, relationships, and how they connect.

### Read one cycle log

Open `examples/healthcare-claims/ddc-cycle-logs/001-vendor-integration-questions.md`. This is what a DDC cycle produces:

1. A real problem came in
2. The agent tried to answer it, couldn't (knowledge base was too thin)
3. A demand checklist was generated — exactly what was missing
4. A human filled the gaps with rough notes
5. The agent curated those notes into structured entities

That's DDC. The knowledge base grew because a real problem demanded it.

---

## Phase 2: Start Your Own Knowledge Base (5 min)

### Copy the template

```bash
cp -r templates/domain-skeleton my-domain/
cd my-domain
```

That's it. The template includes:
- All entity type and relationship type definitions (no copying needed)
- A `CLAUDE.md` with agent instructions (customize the marked sections)
- The full directory structure for entities, diagrams, decisions, and cycle logs

### Customize CLAUDE.md

Open `CLAUDE.md` and replace the `<!-- CUSTOMIZE -->` sections:
- Your domain name and description
- Any domain-specific rules or constraints

### Which entity types to start with

You have 20+ entity types available, but start with just these 5:

| Type | What to put here | Example |
|------|-----------------|---------|
| `jargon-business` | Terms your team uses that outsiders wouldn't know | "SKU", "backlog refinement", "P0 incident" |
| `system` | Software your team builds or depends on | "Order Service", "Salesforce", "Jenkins" |
| `capability` | Business functions your systems support | "Order Management", "User Authentication" |
| `data-model` | Core data structures | "Order", "Customer", "Invoice" |
| `team` | Teams that own systems | "Platform Team", "Checkout Squad" |

Don't worry about the other types yet. They'll get added naturally as problems demand them.

---

## Phase 3: Run Your First DDC Cycle (15 min)

### Pick your first problem

Think: **"What question did your team answer on Slack last week?"**

Good first problems:
- "How does [System A] integrate with [System B]?"
- "What happens when a [business event] occurs?"
- "Which team owns [this thing] and what are the dependencies?"

Bad first problems (too broad):
- "Document our entire architecture"
- "How does everything work?"

### Run the cycle

Open Claude Code in your `my-domain/` directory and run:

```
/ddc-cycle
```

The agent will:
1. Ask for your problem
2. Search the knowledge base (it's empty — that's the point)
3. Generate a **demand checklist** of exactly what it needs to know
4. Ask you to fill the gaps — paste rough notes, Slack messages, whatever you have
5. Curate your input into structured entity files
6. Answer the original question using the new knowledge

### Check results

After the cycle, see what was created:

```
/ddc-status
```

This shows entity counts by type, recent changes, and coverage. Your knowledge base just went from empty to having its first real entities — driven by a real problem.

### Run another cycle

Pick another problem. Notice that this time, the agent already knows some things. The demand checklist is shorter. That's convergence — and it's the core of DDC.

---

## What NOT to Do

**Don't draw a meta-model first.**
The entity and relationship types in the template work for any domain. You don't need to design your own ontology.

**Don't customize `entity-types.yaml`.**
The defaults cover business jargon, systems, capabilities, data models, teams, APIs, personas, decisions, and more. Start with them as-is.

**Don't try to document everything up front.**
That's the exact anti-pattern DDC solves. Let real problems pull knowledge into the base. After 20-30 cycles, you'll have a focused, relevant knowledge base — not a stale wiki.

---

## Next Steps

- Read [METHODOLOGY.md](./METHODOLOGY.md) for the full DDC framework
- Read [WHY.md](./WHY.md) for the hypothesis and motivation
- Browse more [cycle logs](./examples/healthcare-claims/ddc-cycle-logs/) to see convergence in action
- Use the [tooling UI](./tooling/) to visualize your growing knowledge base
