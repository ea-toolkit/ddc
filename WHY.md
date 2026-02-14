# WHY This Framework Exists

## The Hypothesis

**If you treat AI agents as first-class citizens — providing them with curated knowledge the same way you onboard a new joiner — they can perform at least 60% of the cognitive and construction work that human engineers do.**

This framework is a method and toolkit for proving (or disproving) this hypothesis in your domain.

---

## The Problem

In any large enterprise:

- You have **Product Managers, Data Architects, Technology Architects, Business Architects, Security Architects** at the domain level
- You have **multiple product teams**, each with a Product Owner, Senior Engineer, and several Software Engineers
- You deal with the same enterprise problems everyone has: massive context, tribal knowledge, siloed information, slow onboarding

Many organizations adopted coding assistants — **code generation increased massively, but business ROI didn't follow**. Why? Because coding is only a fraction of what teams do. The real work is:

- Understanding business context
- Making architectural decisions
- Designing integrations
- Reasoning about trade-offs
- Creating non-code artifacts (diagrams, ADRs, data models)

**AI can generate code. But can AI do the thinking that decides WHAT code to write?**

---

## The Insight

Why can't an AI agent be more than a coding assistant? Why can't it be:

- A **Product Owner assistant** that understands customer journeys and requirements?
- A **Technology Architect** that reasons about system integrations?
- A **Senior Engineer** that reviews designs against principles?

The answer everyone gives: *"The context is too large. There's too much to know — enterprise goals, business processes, data models, integrations, systems, APIs..."*

But here's the thing: **new joiners face the same problem**. And we solve it with:

1. **Learning paths** — structured journeys through the knowledge
2. **Documentation** — curated, organized information
3. **Mentorship** — reasoning patterns, not just facts

What if we did the same for AI agents?

---

## What DDC Produces

A DDC knowledge base is the **brain** of a domain.

Think of it like construction:
- To build a building, multiple teams create **blueprints, designs, and artifacts**
- The actual building is constructed in a different place, using those artifacts as reference

Similarly:
- The knowledge base is the **artifacts container** — blueprints, knowledge, reasoning patterns
- Actual source code lives in **separate repositories**
- Problems are answered, solved, designed, and modeled here
- Designs and solutions are transferred to product teams who work on actual codebases

### For Humans
- Onboarding resource for new joiners
- Single source of truth for domain knowledge
- Reference for architectural decisions

### For AI Agents
- Context source for reasoning about problems
- Learning paths to build domain understanding
- Reasoning paths for problem-solving approaches
- Skills and sub-agents that can perform domain-specific tasks

---

## The North Star

Create AI sub-agents for key domain roles:

| Agent | Scope |
|-------|-------|
| **Product Owner Agent** | Cognitive and construction work to support Product Owners |
| **Technology Architect Agent** | Cognitive and construction work to support Technology Architects |
| **Senior Software Engineer Agent** | Cognitive and construction work to support Senior Engineers |
| **Data Architect Agent** | Cognitive and construction work to support Data Architects |
| **Security Architect Agent** | Cognitive and construction work to support Security Architects |

Each agent has:
- **Learning paths** — structured knowledge to build context
- **Skills** — specific capabilities (e.g., "design an integration", "review an ADR")
- **Reasoning patterns** — how to approach different problem types

---

## Proving the Hypothesis

Start with **one role**: Technology Architect.

Why Technology Architect first?
1. It's cognitive-heavy — lots of reasoning, less coding
2. It touches many areas — systems, integrations, decisions, principles
3. Clear success criteria are measurable

If a curated knowledge base + learning paths + reasoning paths can enable an AI agent to offload significant TA work, the hypothesis holds.

**Success criteria:**
- Agent can navigate the domain knowledge to answer architectural questions
- Agent can reason about integration problems using documented patterns
- Agent can draft ADRs based on principles and constraints
- Agent reduces time-to-decision for architectural questions by 60%+

---

## Key Principles

### 1. AI-First, Human-Readable
Everything must be:
- **Machine-parseable** — structured frontmatter, consistent relationships
- **Human-readable** — clear prose, good formatting, visual diagrams

### 2. Curated, Not Dumped
Every piece of knowledge must be:
- **Placed correctly** — in the right location based on type
- **Connected** — relationships to other entities explicit
- **Maintained** — updated when things change

### 3. Slow and Deliberate
Quality over quantity. Small commits. One concept at a time. If adding data doesn't enable reasoning, it's just noise.

### 4. Prove, Then Scale
Get one agent working well before building more. Technology Architect first, then expand.

---

## The Bigger Picture

If this works, it changes how domain teams operate:

- **Faster onboarding** — new joiners (human AND AI) ramp up quicker
- **Democratized expertise** — architectural reasoning available to all teams
- **Scalable knowledge** — one brain that serves many teams
- **Amplified capacity** — domain experts' knowledge serves all teams through AI agents