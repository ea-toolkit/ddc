# CFP: Workshop (1+ hour)

## Title

Build Your First Demand-Driven Context Base: A Hands-On Workshop for Enterprise AI Agents

## Subtitle

Stop curating everything. Start with one problem. Let the agent tell you what it needs.

## Abstract

You've built an AI agent. It can code, summarize, and chat. But when you ask it a real enterprise question — "Should we integrate via event streaming or API gateway given our current vendor migration?" — it hallucinates confidently. The problem isn't the model. It's the context.

In this hands-on workshop, participants will build a **Demand-Driven Context (DDC)** base from scratch. DDC is a framework where real problems — not top-down planning — drive what knowledge gets curated for AI agents.

Instead of spending months documenting your entire enterprise, you'll:
1. Take one real problem
2. Let an AI agent attempt to solve it (and fail)
3. Identify exactly what context was missing
4. Curate only that context
5. Watch the agent succeed

By the end, you'll have a working knowledge base, a repeatable process, and the insight that 20-30 real problems build a better context base than 6 months of top-down documentation.

No prior AI agent experience required. Bring a laptop with Claude Code, Cursor, or any LLM-powered coding tool installed.

## Workshop Structure (75 minutes)

### Part 1: The Problem (10 min)
**Format:** Presentation + group discussion

- Why enterprise context is the #1 blocker for useful AI agents
- Quick demo: same agent, same model — one with context, one without
- The top-down trap: why "document everything first" fails
- Introduce DDC: the TDD of knowledge bases

### Part 2: Set Up Your Knowledge Base (10 min)
**Format:** Hands-on coding

Participants create a structured repo:
```
my-domain-brain/
|-- CLAUDE.md              # Agent guidance
|-- sandbox/               # Problem exploration
+-- domain-knowledge/
    |-- meta/              # Entity types
    |-- entities/          # Domain knowledge
    +-- diagrams/          # Visual artifacts
```

We provide:
- A template repo to fork/clone
- A CLAUDE.md template
- Entity type definitions
- Sample entity format

### Part 3: The First Problem (20 min)
**Format:** Hands-on + pair work

Each participant (or pair) gets a **problem card** — a realistic enterprise scenario:

Example problem cards:
- *"A vendor asks: why does your system make two API calls instead of one for optimization-based allocation?"*
- *"A new team member asks: what happens to an order between payment and delivery?"*
- *"Product owner asks: can we support same-day delivery in a new market?"*

**Exercise:**
1. Give the problem to your AI agent (via Claude Code or similar)
2. Agent attempts to answer -> produces incomplete/wrong output
3. Agent generates an **information checklist** — what it needs to know
4. Document the checklist in `sandbox/<problem-name>/information-checklist.md`

**Key moment:** Participants experience the "flip" — instead of telling the agent what to know, the agent tells you what it needs.

### Part 4: Fill the Gaps (15 min)
**Format:** Hands-on

Using reference material we provide (simplified domain docs), participants:
1. Fill in the information checklist items
2. Create proper entity files (systems, terminology, reference data)
3. Place them in the correct repo locations
4. Re-run the agent on the same problem

**Key moment:** Participants see the agent go from wrong/incomplete to correct.

### Part 5: The Pattern Emerges (10 min)
**Format:** Group exercise

Groups compare their information checklists:
- What knowledge was needed across different problems?
- What overlaps? (These become your priority entities)
- What order would a new joiner read these? (This becomes your learning path)
- What reasoning did the agent follow? (These become reasoning patterns)

**Key insight:** Learning paths and reasoning patterns surface from the problems — you don't design them upfront.

### Part 6: Scale It — Context as a Service (10 min)
**Format:** Presentation + Q&A

- From one problem to 20-30: how the knowledge base grows
- The math: each problem fills ~2-5% of context needs
- When multiple domains exist: federated context, context graphs
- The curator agent: an agent that identifies what other agents need
- When to graduate sandbox content to production knowledge
- Trimming: detecting stale or redundant context

## Materials Provided

- **Template repository** (GitHub) with folder structure, CLAUDE.md, entity types
- **Problem cards** (6-8 realistic enterprise scenarios from different domains)
- **Reference material** (simplified domain docs to fill checklists from)
- **Cheat sheet** — entity file formats, checklist template, commit conventions

## Key Takeaways

1. **A working DDC knowledge base** — participants leave with a functional repo
2. **The DDC process** — repeatable steps they can apply at their company
3. **The TDD mental model** — DDC is to knowledge what TDD is to code
4. **The flip** — agents tell you what they need, not the other way around
5. **Emergent patterns** — learning paths and reasoning loops that surface themselves

## Technical Requirements

- Participants need a laptop with:
  - Git installed
  - An LLM-powered coding tool (Claude Code, Cursor, or similar)
  - A text editor
- Wifi access for LLM API calls
- No specific programming language required (knowledge is in Markdown)

## Speaker Bio

Principal Engineer at a large enterprise, responsible for domain-level technology, engineering, and AI across multiple product teams. Currently leading an experiment applying DDC to build AI agents that perform Technology Architect cognitive work across a multi-year enterprise transformation.

## Why This Workshop Matters

Every tutorial shows you how to build a RAG pipeline. Nobody shows you how to figure out what should go into it. This workshop fills that gap with a practical, repeatable framework that participants can apply immediately at their organizations.

## Ideal Audience Size

20-40 participants (enough for pair work, small enough for interaction)