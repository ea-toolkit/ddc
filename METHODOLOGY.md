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
- Lots of wasted effort documenting things that never get used
- Hard to know when you're "done"

---

## The Solution: Demand-Driven Context Curation

Instead of top-down, go **bottom-up** — let real problems drive what gets documented.

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

**The insight:** AI scores 10/10 on expertise and processing power. The only gap is domain knowledge. If you fill that gap with curated context, the AI agent should perform at the level of a human domain expert.

---

## The Methodology: Reverse Engineering Knowledge Needs

### The DDC Loop

**Step 1: Take a Real Problem**

A real problem arrives — a vendor document with integration questions, an architectural design task, a cross-team coordination challenge.

**Step 2: Create a Sandbox**

Create a folder in `sandbox/` for the problem:
```
sandbox/
+-- problem-name/
    |-- README.md              # Problem overview, questions to answer
    +-- information-checklist.md  # What context is needed
```

**Step 3: AI Attempts to Solve (Day 1 New Joiner Simulation)**

Ask the AI agent to solve the problem as if it were a new domain expert who just joined with zero domain knowledge.

The AI will say: *"I need X, Y, Z information to answer this."*

**Step 4: Document Information Needs**

Create an information checklist:
- What terminology needs defining?
- What systems need documenting?
- What reference data is needed?
- What business logic needs explaining?

**Step 5: Human Fills the Gaps**

The domain expert provides the information:
- Fill in definitions
- Point to existing docs
- Get info from subject matter experts
- Add to the checklist

**Step 6: AI Re-Attempts**

With the new context, the AI tries again.

If output is wrong or incomplete, identify what's still missing and repeat Step 5.

**Step 7: Problem Solved**

When the AI produces the expected output (validated by human), the problem is solved.

**Step 8: Graduate Content**

Move validated content from `sandbox/` to proper locations:
- Terminology -> `entities/jargon-business/` or `entities/jargon-tech/`
- Systems -> `entities/systems/`
- Reference data -> `entities/data-models/reference-data/`
- Diagrams -> `diagrams/`
- Decisions -> `decisions/`

**Step 9: Track Progress**

Log the cycle in a structured DDC cycle log. After multiple problems, patterns emerge — these become learning paths and reasoning paths.

---

## The Convergence Hypothesis

```
Problem 1  -> fills knowledge bucket to ~2%
Problem 2  -> fills to ~5%
Problem 3  -> fills to ~10%
...
Problem 20-30 -> fills to ~100% (for one role)
```

After 20-30 real problems, you have:
- Curated context covering what a domain expert actually needs
- Learning paths (what to read in what order)
- Reasoning paths (how to approach different problem types)

Each new problem requires less new context because previous cycles already curated overlapping knowledge.

---

## Sandbox Structure Template

For each new problem, create:

```
sandbox/
+-- <problem-name>/
    |-- README.md
    |   |-- Context (what triggered this problem)
    |   |-- Source documents (if any)
    |   |-- Questions to answer
    |   |-- Status tracking
    |   +-- Next steps
    |
    |-- information-checklist.md
    |   |-- Part 1: What AI already understood (needs confirmation)
    |   |-- Part 2: What AI still needs (organized by type)
    |   |-- Part 3: Priority order
    |   +-- Part 4: Format templates
    |
    |-- context-gathered.md (optional)
    |   +-- Information collected during exploration
    |
    +-- proposed-answers.md (optional)
        +-- Draft answers for stakeholder review
```

---

## For AI Agents: How to Work with DDC

When you receive a problem:

### If It's a New Problem

1. Check if a sandbox already exists for it
2. If not, create one following the template above
3. Read the problem, identify what context you need
4. Create an information checklist
5. Ask the human to fill the gaps
6. Iterate until you can solve the problem

### If It's a Continuing Problem

1. Go to the relevant `sandbox/` folder
2. Read `README.md` for context
3. Read `information-checklist.md` for what's been gathered vs. still needed
4. Continue from where you left off

### When Looking for Existing Knowledge

Follow this navigation pattern:
1. **Terminology unclear?** -> Check `entities/jargon-business/` or `entities/jargon-tech/`
2. **System question?** -> Check `entities/systems/`
3. **Data/reference question?** -> Check `entities/data-models/`
4. **Process question?** -> Check `diagrams/processes/` or `diagrams/sequences/`
5. **Past decisions?** -> Check `decisions/resolved/`

### When Adding New Content

1. Use the correct format (see entity file templates)
2. Place in the correct location based on content type
3. Add relationships in frontmatter
4. Commit with a clear message

---

## For Humans: How to Work with AI in DDC

### Starting a New Session

When you start a fresh AI session, tell it:

> "Read WHY.md, METHODOLOGY.md, and CLAUDE.md to understand this project. Then check the sandbox/ folder for any active problems we're working on."

This gives the AI all the context it needs to continue.

### When AI Asks for Information

The AI will create an information checklist. Your job:
1. Fill in what you know directly
2. Point to existing docs for things that exist
3. Note things that need to be obtained from others
4. Mark status: `[ ]` not started, `[~]` partial, `[x]` complete

### Validating AI Output

When AI proposes an answer/solution:
1. Check if it's correct based on your domain knowledge
2. If wrong, identify what context was missing
3. Add that context and have AI retry

---

## Success Metrics

**For a Single Cycle:**
- AI produces correct output that you would expect from a human domain expert
- No manual intervention needed beyond providing the context

**For the Overall Project:**
- After 20-30 problems, AI can solve new problems with minimal new context
- Learning paths exist for key roles
- Reasoning patterns documented for common problem types
- Human experts spend time on novel problems, AI handles routine reasoning

---

## The TDD Parallel

Engineers will recognize DDC's structure:

| TDD | DDC |
|-----|-----|
| Write a failing test | Give agent a failing problem |
| Write minimum code to pass | Curate minimum context to succeed |
| Test passes | Agent produces correct output |
| Refactor | Graduate content to proper locations |
| Next test | Next problem |

Just as TDD lets failing tests drive code design, DDC lets failing agent responses drive knowledge curation. You don't write all the tests upfront. You don't curate all the context upfront.