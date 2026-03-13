# Demand-Driven Context (DDC) Methodology

> **Read [WHY.md](./WHY.md) first** to understand the hypothesis and goals.

This document explains the DDC methodology for building domain knowledge bases that serve both humans and AI agents.

---

## The Core Problem: Top-Down Doesn't Work

**What most teams try first:**
1. Collect all domain knowledge from wikis, diagrams, repositories, design tools
2. Curate and structure it
3. Then test if AI agents can use it

**Why it fails:**
- The knowledge is massive — it takes forever
- You don't know what's useful until you need it
- Lots of effort spent documenting things that never get used
- Hard to know when you're "done"

---

## The Solution: Demand-Driven Context Curation

Instead of top-down, go bottom-up — let realistic problems drive what gets documented.

### The Mental Model

Think of a Technology Architect as a black box:

```
+-------------------------------------------------------------+
|                  TECHNOLOGY ARCHITECT BOX                     |
|                                                               |
|   +-----------------------------------------------------+   |
|   |  Component 1: TA Expertise                           |   |
|   |  (DDD, event sourcing, integration patterns,         |   |
|   |   architectural thinking, industry experience)       |   |
|   |                                                      |   |
|   |  AI Agent Score: 10/10 (built into the model)        |   |
|   +-----------------------------------------------------+   |
|                                                               |
|   +-----------------------------------------------------+   |
|   |  Component 2: Enterprise Domain Knowledge            |   |
|   |  (business context, systems, integrations, jargon,   |   |
|   |   history, constraints, tribal knowledge)            |   |
|   |                                                      |   |
|   |  AI Agent Score: 0/10 initially  <-- THE GAP         |   |
|   +-----------------------------------------------------+   |
|                                                               |
|   +-----------------------------------------------------+   |
|   |  Component 3: Processing Power                       |   |
|   |  (reasoning, analysis, synthesis, artifact creation) |   |
|   |                                                      |   |
|   |  AI Agent Score: 10/10 (inference capability)        |   |
|   +-----------------------------------------------------+   |
|                                                               |
+-------------------------------------------------------------+
              ^                                    |
           INPUT                               OUTPUT
    (question, problem,                  (answer, solution,
     artifact request)                    design, artifact)
```

**The insight:** AI scores 10/10 on expertise and processing power. The only gap is domain knowledge. Fill that gap with curated context, and the agent performs at the level of a human domain expert.

---

## The DDC Loop

Every cycle follows the same structure. There is no sandbox phase, no staging area, no "collect first, curate later." The problem drives the work directly from the start.

### Step 1: Take a Representative Problem

A representative problem arrives — a production incident, an architectural question, a design task, a cross-team coordination challenge. The problem must be specific enough that you can tell when the agent has answered it correctly.

### Step 2: RED Phase — Attempt Without Context

Ask the agent to attempt the problem using only what already exists in the knowledge base.

The agent will do two things:
1. Search existing entities and assess how much is covered
2. Produce a Demand Checklist — the specific gaps that prevent a confident answer

The checklist is structured by entity type:
- Terminology to define
- Systems to document
- Processes to describe
- Data structures to explain
- Business logic to clarify

The agent rates its confidence (1-5) and explains what's missing. This is the honest baseline — not a warm-up exercise, but a real measure of where the knowledge base stands today.

### Step 3: GREEN Phase — Curate Entities

The domain expert provides the missing information: direct answers, an incident report, a design doc, or a combination.

The agent structures that information into typed entity files and places them in the correct location in the knowledge base. Each entity gets frontmatter (type, id, status, relationships) and a short prose body. Relationships are wired up to existing entities.

The key discipline here: one concept per file, placed correctly, connected deliberately. Not a dump of everything the expert said into a single document.

### Step 4: Answer the Problem (AFTER)

With the newly curated entities in place, the agent re-reads all relevant context — existing and new — and re-answers the original problem.

The answer should be specific: named systems, traced flows, identified failure mechanisms, concrete recommendations. Generic answers are a signal that curation was insufficient.

The agent rates confidence again and explains what improved.

### Step 5: Human Review

The domain expert reviews the answer. If it's wrong:
1. The agent records what it got wrong and why
2. The expert's correction is incorporated into entity files
3. The agent re-answers
4. Review repeats

Each rejected attempt gets logged in the cycle log. The correction loop is not a failure state — it's where the most valuable learning happens. Skipping rejected attempts in the log makes the data dishonest.

### Step 6: Log the Cycle

Every cycle produces a structured log at `ddc-cycle-logs/<NNN>-<problem-slug>.md`.

The log captures: the problem, what the agent got wrong before, the demand checklist, what entities were curated, each attempt (including rejected ones), the accepted answer, and the human review score.

The logs are the research record. Without them, you can't measure convergence, identify recurring gaps, or build learning paths.

---

## The Convergence Hypothesis

```
Problem 1  -> fills knowledge bucket to ~2%
Problem 2  -> fills to ~5%
Problem 3  -> fills to ~10%
...
Problem 20-30 -> fills to ~100% (for one role)
```

After 20-30 representative problems in a role, you have curated context that covers what a domain expert actually needs. Each new problem requires less new curation because previous cycles already documented overlapping knowledge.

This is visible in the cycle logs. By cycle 5 in the RetailCo domain, the agent was reusing entities from previous cycles instead of producing a full demand checklist. By cycle 10, it was recognizing recurring failure patterns — "orders not dropping" as a symptom class, not just a specific incident.

The knowledge base converges toward completeness. The gap between agent and human closes.

---

## The TDD Parallel

Engineers will recognize this structure:

| TDD | DDC |
|-----|-----|
| Write a failing test | Give agent a failing problem |
| Write minimum code to pass | Curate minimum context to succeed |
| Test passes | Agent produces correct output |
| Refactor | Validate and tighten entity definitions |
| Next test | Next problem |

Just as TDD lets failing tests drive code design, DDC lets failing agent responses drive knowledge curation. You don't write all the tests upfront. You don't curate all the context upfront. You let failures tell you exactly what's missing.

---

## For AI Agents: How to Work with DDC

### When Receiving a New Problem

1. Search `domain-knowledge/entities/` for existing knowledge relevant to the problem
2. Read matching entity files and assess coverage honestly
3. Attempt to answer using only what exists in the KB
4. If coverage is insufficient, produce a Demand Checklist organized by entity type
5. Rate your confidence (1-5) and explain what's missing
6. Ask the human to fill the gaps

Do not speculate beyond what the knowledge base contains. If the knowledge base doesn't have it, say so. Confident wrong answers pollute the knowledge base when they get curated as facts.

### When Looking for Existing Knowledge

1. Terminology unclear? Start with `entities/jargon-business/` or `entities/jargon-tech/`
2. System question? Start with `entities/systems/`
3. Data or reference question? Start with `entities/data-models/`
4. Process question? Start with `diagrams/processes/` or `diagrams/sequences/`
5. Past decisions? Check `decisions/resolved/`

### When Adding New Content

1. Use the correct entity format (see entity-format rule)
2. Place in the correct location based on entity type
3. Wire up relationships in frontmatter — connect to existing entities
4. Commit each logical unit separately with a clear message

---

## For Humans: How to Work with AI in DDC

### Starting a New Session

When starting a fresh AI session, give it orientation:

> "Read WHY.md, METHODOLOGY.md, and CLAUDE.md to understand this project. Then read the ddc-cycle-logs/ folder to see what problems we've worked on."

This replaces the context the agent would otherwise be missing.

### When the Agent Produces a Demand Checklist

Your job is to answer it:
- Fill in what you know directly
- Point to existing documents for things that are already written
- Note what requires input from others
- Be specific — rough notes are fine, but vague answers produce vague entities

### Validating Agent Output

When the agent proposes an answer:
1. Check whether it's correct based on your domain knowledge
2. If it's wrong, explain what specifically is wrong and why
3. Don't just say "incorrect" — tell the agent what the right answer is, or at least what direction to explore
4. Corrections go into entity files immediately, not just into the conversation

---

## Success Metrics

**For a Single Cycle:**
- Agent produces a correct, specific answer that a domain expert would stand behind
- Entities curated are reusable — they contain knowledge that will help future problems, not just this one

**For the Overall Project:**
- After 20-30 problems, agent can answer new problems in the same domain with minimal new curation
- The demand checklist gets shorter each cycle as the knowledge base matures
- Learning paths exist for key roles — structured reading lists derived from cycle logs
- Reasoning patterns are documented for recurring problem types
- Domain experts spend time on novel problems; agents handle routine reasoning
