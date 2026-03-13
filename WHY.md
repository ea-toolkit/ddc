# WHY This Framework Exists

## The Hypothesis

**If you treat AI agents as first-class citizens — providing them with curated knowledge the same way you onboard a new joiner — they can perform at least 60% of the cognitive and construction work that human domain experts do.**

This is no longer purely a hypothesis. After 15 real DDC cycles across a production domain, the pattern holds: agents that start with zero domain knowledge and produce generic, wrong, or incomplete answers consistently reach expert-level output once structured context is in place. The framework exists to make that process repeatable and measurable.

---

## The Problem

In any large enterprise:

- You have Product Managers, Data Architects, Technology Architects, Business Architects, Security Architects at the domain level
- You have multiple product teams, each with a Product Owner, Senior Engineer, and several Software Engineers
- You deal with the same problems everyone has: massive context, tribal knowledge, siloed information, slow onboarding

Many organizations adopted coding assistants — code generation increased, but business ROI didn't follow. Why? Because coding is a fraction of what teams actually do. The real work is:

- Understanding business context
- Making architectural decisions
- Designing integrations
- Reasoning about trade-offs
- Creating non-code artifacts: diagrams, ADRs, incident analyses, data models

**AI can generate code. But can AI do the thinking that decides what code to write?**

---

## The Insight

Why can't an AI agent be more than a coding assistant? Why can't it be:

- A Product Owner assistant that understands customer journeys and requirements?
- A Technology Architect that reasons about system integrations?
- A Senior Engineer that reviews designs against domain principles?
- An SRE analyst that traces incident root causes through a real system landscape?

The answer everyone gives: *"The context is too large. There's too much to know — enterprise goals, business processes, data models, integrations, systems, APIs..."*

But new joiners face the same problem. And we solve it with:

1. Learning paths — structured journeys through the knowledge
2. Documentation — curated, organized information
3. Reasoning patterns — not just facts, but how to think

What if we did the same for AI agents?

---

## What DDC Produces

A DDC knowledge base is the brain of a domain.

Think of it like construction:
- To build a building, multiple teams create blueprints, designs, and artifacts
- The actual construction happens in a different place, using those artifacts as reference

Similarly:
- The knowledge base is the artifacts container — blueprints, knowledge, reasoning patterns
- Actual source code lives in separate repositories
- Problems are answered, solved, designed, and analyzed here
- Outputs are transferred to the product teams doing the actual work

### For Humans
- Onboarding resource for new joiners
- Single source of truth for domain knowledge
- Reference for architectural decisions

### For AI Agents
- Context source for reasoning about domain problems
- Learning paths to build domain understanding
- Reasoning patterns for different problem types
- Skills and sub-agents that can perform domain-specific cognitive work

---

## The North Star

Create AI sub-agents for key domain roles. The agent definitions exist. The knowledge base to power them is what the DDC cycles are building.

| Agent | Scope | Status |
|-------|-------|--------|
| `ta-agent` | Technology Architect — integration design, system reasoning, ADR drafting | Defined |
| `po-agent` | Product Owner — requirements analysis, journey mapping, prioritization | Defined |
| `se-agent` | Senior Engineer — solution design, code review, technical mentorship | Defined |
| `da-agent` | Data Architect — data model design, flow analysis, governance | Defined |
| `sa-agent` | Security Architect — security review, compliance, threat modeling | Defined |

Each agent needs:
- A knowledge base that covers its domain deeply enough to reason from
- Learning paths — structured reading lists to build context before tackling a problem
- Reasoning patterns — how to approach different problem types in this domain

The agents are defined. The knowledge base is growing. The DDC cycles are what fill the gap between a capable agent and a knowledgeable one.

---

## What We Learned First

The first 15 cycles didn't start with Technology Architecture. They started with SRE incident analysis — real production failures with known root causes and a domain expert who could validate the output.

That turned out to be the right place to start:
- Clear success criteria: the agent either finds the root cause or it doesn't
- Rich context requirements: systems, terminology, process flows, business impact all matter
- Honest failure signal: a generic answer is visibly wrong, not just imprecise
- Fast feedback loops: cycles complete in 30-60 minutes

The insight from those cycles confirmed the core hypothesis. By cycle 5, the agent was reusing entities from previous cycles instead of starting from scratch. By cycle 10, it was recognizing recurring failure patterns and routing to relevant prior context automatically.

---

## Key Principles

### 1. AI-First, Human-Readable
Everything must be machine-parseable — structured frontmatter, consistent relationships — and human-readable — clear prose, good formatting, visual diagrams.

### 2. Curated, Not Dumped
Every piece of knowledge must be placed correctly, connected to related entities, and maintained when things change. A dump of unstructured notes is noise, not context.

### 3. Slow and Deliberate
Quality over quantity. Small commits. One concept at a time. If adding information doesn't enable better reasoning on a real problem, it's probably not worth adding yet.

### 4. Prove, Then Scale
Get one problem type working well before expanding to others. Incident analysis first. Architecture reasoning next. Then the full set of domain roles.

---

## The Bigger Picture

If this works — and the early evidence says it does — it changes how domain teams operate:

- Faster onboarding: new joiners, human and AI, ramp up on the same curated knowledge base
- Democratized expertise: architectural and domain reasoning available to all teams, not just senior staff
- Scalable knowledge: one brain that serves many teams
- Amplified capacity: domain experts spend time on novel problems; agents handle routine reasoning
