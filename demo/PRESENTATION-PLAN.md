# DDC Presentation Plan — Claude Code Demo

> **Purpose**: Full context document so a new Claude Code session can pick up this plan and help execute the demo.

---

## Background: What is DDC?

**Demand-Driven Context (DDC)** is a methodology for building enterprise AI agent knowledge bases. The core idea: instead of documenting everything upfront, you give an agent a real problem, let it fail, observe what domain knowledge is missing, and curate only what's needed. Like TDD for knowledge:

- **RED**: Agent fails on the problem — produces a "Demand Checklist" of what's missing
- **GREEN**: Human provides rough domain info — agent structures it into typed entities and answers the question
- **REFACTOR**: Curated knowledge is graduated to the permanent KB

After 20-30 cycles, the KB converges — new problems reuse existing entities instead of needing new ones.

---

## The Demo Plan (~10 minutes)

### Format

- **Tool**: Claude Code (terminal-based AI agent)
- **Workspace**: Open Claude Code in `/demo/demo-kb/` — a self-contained folder with an empty knowledge base
- **Key file**: `demo/demo-kb/CLAUDE.md` contains the DDC agent instructions (Claude Code reads CLAUDE.md automatically)
- **Human role**: The presenter (you) plays the domain expert who fills in rough notes when the agent asks

### Pre-Demo Setup

1. **Reset the demo KB** — make sure all entity folders under `demo/demo-kb/domain-knowledge/entities/` are empty (only `.gitkeep` files). If leftovers from a previous run exist, delete them.
2. Open a terminal
3. `cd` into `demo/demo-kb/`
4. Launch Claude Code: `claude`
5. Verify Claude Code loaded the CLAUDE.md (it will show in its context)

### Part 1: The Failure (~2 min)

**What you type into Claude Code:**

```
Our vendor is replacing our claims adjudication engine. They need answers to three integration questions:

1. Why does adjudication require a pre-authorization lookup before running rules?
2. What are the pre-auth decision codes and how does each one affect claim processing?
3. Should claims be processed in batch or real-time?

Answer these questions with specific system names, decision codes, and SLAs from our domain.
```

**What should happen:**

Claude Code follows the CLAUDE.md instructions:
1. Searches `domain-knowledge/entities/` — finds only `.gitkeep` files (empty)
2. Says: "I searched the knowledge base but don't have enough domain-specific context to answer this accurately."
3. Produces a **Demand Checklist** organized by type (terminology, systems, business logic)

**What you say to the audience:**

> "This is the RED phase — the agent failed. But it didn't just say 'I don't know.' It told us EXACTLY what domain knowledge is missing. That checklist is the demand signal."

### Part 2: The Human Fills Gaps (~2 min)

**What you say:**

> "Now I play the domain expert. I have rough notes — not structured, just what I know off the top of my head."

**What you paste into Claude Code:**

Copy-paste this (the contents of `demo/rough-notes.md`):

```
here's what I know about our claims processing:

adjudication is when we evaluate a submitted claim against the members benefit plan rules, fee schedules and regulatory requirements to figure out how much to pay. the rules engine does this. its a vendor product we bought, currently being replaced. the claims ops team maintains the rules even though vendor provides the platform.

the key thing is pre-auth. before adjudication can run, the rules engine MUST look up the pre-authorization decision. there are 3 decision codes:
- approved = apply normal in-network cost sharing rules (deductible, copay, coinsurance)
- denied = auto-deny the claim with reason code PA-DENY
- not-required = skip pre-auth check entirely, go straight to normal adjudication

this branching is critical because the wrong path means wrong payment.

the systems involved:
1. claims gateway - single entry point for all claims. takes EDI 837 professional and institutional. professional claims (CMS-1500) process real-time with 30 second SLA. institutional (UB-04) are batch with 4 hour window. owned by claims-operations team.
2. rules engine - the adjudication engine. vendor product. evaluates claims against benefit plans, provider contracts, fee schedules, medical policies. produces pay/deny/pend disposition.
3. pre-auth service - manages prior authorization lifecycle. accepts requests, evaluates against clinical criteria, issues determinations. target 60% auto-approval. standard auth valid 90 days, surgical 60 days.

claims gateway sends validated claims to rules engine. rules engine calls pre-auth service to get the decision code before running adjudication rules.
```

**What you say while pasting:**

> "These are messy, unstructured notes. The kind of thing a senior engineer scribbles on a whiteboard. Watch what the agent does with them."

### Part 3: The Agent Curates (~2 min)

**What should happen:**

Claude Code creates structured entity files using the Write tool:

- `domain-knowledge/entities/jargon-business/adjudication.md` — with YAML frontmatter and structured description
- `domain-knowledge/entities/jargon-business/pre-authorization.md` — with decision codes, branching logic
- `domain-knowledge/entities/systems/claims-gateway.md` — with ownership, formats, SLAs
- `domain-knowledge/entities/systems/rules-engine.md` — with vendor status, integration pattern
- `domain-knowledge/entities/systems/pre-auth-service.md` — with auto-approval targets, validity periods

Claude Code will confirm: "I've curated 5 entities from your input: [list]"

**What you say:**

> "Look at what just happened. Rough tribal knowledge went in. Structured, typed, version-controlled entities came out. Each file has YAML frontmatter — type, ID, relationships. Humans can read the prose. Machines can parse the metadata."

**Optionally**: Ask Claude Code to `cat` one of the created files to show the audience the structure.

### Part 4: The Agent Answers (~2 min)

**What should happen:**

Claude Code re-reads the entities and answers all three vendor questions with:
- Specific system names (Claims Gateway, Rules Engine, Pre-Auth Service)
- Exact decision codes (approved, denied, not-required) and their branching logic
- Concrete SLAs (30s real-time for professional, 4-hour batch for institutional)
- Ownership info (claims-operations team)

**What you say:**

> "This is the GREEN phase. Same agent, same question — but now it has domain context. The vendor could design their integration from this answer alone.
>
> And here's the key: those entity files are permanent. Next time ANY agent asks about adjudication, pre-auth, or Claims Gateway — the knowledge is already there. It accumulates across cycles."

### Closing (~1 min)

> "This is Demand-Driven Context. Like TDD for knowledge:
> - RED: Agent fails, tells you what's missing
> - GREEN: Human provides context, agent succeeds
> - REFACTOR: Knowledge is structured and graduated to the KB
>
> After 20-30 cycles, the KB converges — new problems need fewer new entities because most of the domain is already captured.
>
> It's not RAG — we're not retrieving existing docs. It's not fine-tuning — we're not retraining the model. It's context engineering: building the right knowledge base so any agent can do enterprise work."

---

## File Inventory

| File | Purpose |
|------|---------|
| `demo/demo-kb/CLAUDE.md` | DDC agent instructions — Claude Code reads this automatically |
| `demo/demo-kb/.github/copilot-instructions.md` | Same instructions for GitHub Copilot (backup option) |
| `demo/demo-kb/domain-knowledge/meta/entity-types.yaml` | 9 entity types (trimmed, no vision/roadmap clutter) |
| `demo/demo-kb/domain-knowledge/meta/relationship-types.yaml` | 5 relationship types |
| `demo/demo-kb/domain-knowledge/entities/*/` | 8 empty entity folders with `.gitkeep` |
| `demo/rough-notes.md` | The rough notes you paste as the "domain expert" |
| `demo/DEMO-SCRIPT.md` | Original demo script (Copilot version) |
| `demo/PRESENTATION-PLAN.md` | This file |

## Reset Between Runs

If you need to reset the demo KB back to empty:

```bash
cd demo/demo-kb/domain-knowledge/entities
find . -name "*.md" -delete
```

This deletes all entity markdown files but keeps the folders (via `.gitkeep`).

---

## Why Claude Code Over Copilot

- Claude Code creates files directly with the Write tool — no ambiguity about whether files were actually created
- Visible tool calls show the audience what the agent is doing (searching, reading, writing)
- Sub-agent support via the Task tool — could use Explore agent to search the KB
- Terminal-based — feels more "live" and technical for a builder audience
- CLAUDE.md is automatically loaded — no need to explain custom instructions setup

---

## Troubleshooting

**If Claude Code doesn't follow the DDC workflow:**
- Make sure you launched claude from inside `demo/demo-kb/` so it picks up the local CLAUDE.md
- If needed, say: "Follow the DDC workflow described in your CLAUDE.md instructions."

**If Claude Code doesn't create files:**
- Say: "Create the entity files now using the Write tool."

**If the audience asks about RAG:**
- "RAG retrieves existing docs. DDC creates the docs that don't exist yet — it's upstream of RAG."

**If the audience asks about fine-tuning:**
- "Fine-tuning changes model weights. DDC changes the context window. You can version-control context; you can't version-control weights."

**If asked about scale:**
- "We propose a scaling architecture: agent drafts entities, humans review via PR. Like code review for knowledge. Paper is on arXiv."
