# Demand-Driven Context: Teaching AI Agents to Remember What Matters

*A framework for enterprise AI agents that stops trying to document everything and starts letting problems drive what gets curated.*

---

## "I Have This Condition"

Remember Memento? Leonard Shelby — the guy who can't form new memories. Every morning he wakes up in a motel room with no idea how he got there. Expert investigator. Sharp mind. Zero memory of what happened ten minutes ago. Without his system of tattoos, Polaroid photos, and handwritten notes, he's just a confused man in a motel room.

Your AI agent is Leonard.

Give it a real enterprise problem and it wakes up like Leonard. Expert reasoning. Zero memory of your company. It doesn't know your acronyms, your team boundaries, or why the architecture works the way it does.

And just like Leonard, it doesn't sit there helplessly. It confidently produces a beautifully structured, completely wrong answer — reasoning from skills without context.

**How do you make Leonard ink his own tattoos?**

<!-- [Screenshot: Leonard examining his tattoos in the mirror] -->

---

## Leonard's Failed Systems (And Ours)

Leonard tries several systems to manage his condition. The enterprise AI world tried the same ones.

**The Whole-Wall Approach.** Leonard could wallpaper his room with every

note — and wake up drowning in information he can't prioritize. That's  
**context window stuffing**. Fitting it all in isn't the problem.       
Finding                                                                 
what's relevant is.

**The Filing Cabinet.** Leonard could sort notes into labelled          
envelopes.                                                              
But reasoning about *why* someone lied requires connecting notes across
envelopes. That's **RAG** — it retrieves documents, not understanding.

**Pre-Tattoo Everything.** What if Leonard inked everything he might    
ever                                                                    
need? He'd run out of skin before knowledge. That's **top-down          
curation** —                                                            
it took forever, half was never used, and it was stale before we        
finished.

**The Sticky Note.** Simple and fast, but 50 integrations and 200       
business                                                                
terms won't fit on Post-its. That's **skills.md** — great for guidance,
not for deep domain knowledge.

<!-- [Screenshot: Leonard's room covered in Polaroids and notes — chaos] -->

---

## How Leonard Actually Survives

Here's what everyone misses about Memento:

**Leonard's system works because it's demand-driven.**

He doesn't wake up and pre-tattoo everything he might need. He encounters a situation. Realizes he's missing critical information. Writes it down — a Polaroid, a note, a tattoo if it's important enough. Next time he wakes up, that context is there because a specific situation demanded it.

He never documents anything he doesn't need. Every tattoo exists because a real problem required it.

<!-- [Screenshot: Leonard writing on a Polaroid — "Don't believe his lies"] -->

---

## The 80/20 You Can't Guess

Roughly 20% of enterprise knowledge solves 80% of the problems your agent will face. Every top-down effort documents 100% and hopes the critical 20% is somewhere in there — buried, indistinguishable, equally weighted. Your agent drowns in completeness.

**The real question: how do you discover which 20% matters?**

You can't guess it. Three smart people in a room can't whiteboard it. The 20% is different for every domain, every team, every transformation phase. The only way to find it is to let real problems point at it.

That's what DDC does. Every problem your agent fails at is a finger pointing at the 20%. After 20-30 problems, you haven't documented everything — you've documented exactly the knowledge that matters. The 20% reveals itself.

---

## The Flip

**New joiners face the exact same condition as AI agents.**

When a senior architect joins your company on Day 1, they're Leonard. Expert skills — system design, integration patterns, architectural thinking. Skills: 10/10. Company context: 0/10.

What do they do? They don't read the entire wiki. They start working on real problems, and they ask questions:

*"What does that acronym mean in your context?"*
*"Who owns the eligibility rules?"*
*"Why does claim processing require two steps instead of one?"*

Each answer is a tattoo. After 20-30 real problems, they have a working understanding. Not everything — but everything they *need*.

**What if the AI agent did the same — but wrote its own tattoos?**

Not: "Here's everything you need to know."
But: "Here's a problem. Figure out what you need. Write it down. Solve it."

Leonard's system, applied to enterprise AI. We call it **Demand-Driven Context**.

---

## Demand-Driven Context (DDC)

DDC is a framework where real problems drive knowledge curation. Instead of curating first and solving later, the agent solves first and curates along the way.

### The Framework

<!-- DDC Flowchart — horizontal -->

```
┌──────────┐    ┌──────────────┐    ┌─────────────────┐    ┌──────────────┐
│  REAL     │───▶│  AGENT       │───▶│  ENOUGH         │───▶│  AGENT       │
│  PROBLEM  │    │  ANALYZES    │    │  CONTEXT?       │    │  PROPOSES    │
└──────────┘    └──────────────┘    └─────────────────┘    │  SOLUTION    │
                                      │ NO                  └──────┬───────┘
                                      ▼                            │
                                    ┌─────────────────┐            ▼
                                    │  AGENT ASKS:     │    ┌──────────────┐
                                    │  "I need to      │    │  HUMAN       │
                                    │  understand..."  │    │  REVIEWS     │
                                    └────────┬────────┘    └──────┬───────┘
                                             ▼                    │
                                    ┌─────────────────┐    NOT    │ CORRECT
                                    │  HUMAN PROVIDES  │  CORRECT │
                                    │  ANSWERS         │◀─────────┘
                                    └────────┬────────┘           │
                                             ▼                    ▼
                                    ┌─────────────────┐    ┌──────────────┐
                                    │  AGENT CURATES   │    │  CONTEXT     │
                                    │  INTO STRUCTURED │    │  ACCUMULATED │
                                    │  KNOWLEDGE BASE  │    │  DONE ✓      │
                                    └────────┬────────┘    └──────────────┘
                                             │
                                             └──── loops back to AGENT ANALYZES
```

### Step 1: Take a real problem

Not a hypothetical exercise. A real vendor document. A real architectural question. A real design task.

```
# Example: New claims engine vendor asks integration questions
vendor-questions.pdf:
  Q1: "Why does adjudication require a pre-auth lookup
       before evaluating the claim?"
  Q2: "Which system owns the provider eligibility decision?"
  Q3: "Can we batch claims or must each be real-time?"
  ...
```

### Step 2: Agent analyzes with zero context

The agent is Leonard waking up in the motel room. Expert skills, zero domain memory. It reads the problem and identifies what it doesn't know.

```
# Agent's information checklist (auto-generated)
gaps_identified:
  - "What does 'adjudication' mean in this domain?"
  - "Which system performs pre-authorization?"
  - "What is the relationship between provider network
     and eligibility checks?"
  - "Who owns the rules engine — internal team or vendor?"
  - "What regulatory constraints affect claim processing?"
```

### Step 3: Human fills the gaps

The domain expert answers the checklist. Not a brain dump — targeted answers to specific questions the problem revealed.

```
# Human provides targeted answers
- "Adjudication is the process of evaluating a claim against
   policy rules, provider contracts, and benefit limits to
   determine the payout amount."
- "Pre-auth is owned by the Benefits team. The rules engine
   is a vendor product (being replaced), but the rules
   themselves are maintained internally."
```

### Step 4: Agent curates into structured knowledge

This is the critical step. The agent doesn't just consume the answers — **it organizes them into its own structured memory.** Each answer becomes a curated entity: a terminology definition, a system description, a data model, a decision record. Placed in the right location, connected to related entities.

```
# Agent creates structured entities from the answers

# File: entities/jargon/adjudication.md
---
type: jargon-business
id: adjudication
related_terms: [pre-authorization, benefit-limit, provider-contract]
---
The process of evaluating a submitted claim against policy rules,
provider contracts, and benefit limits to determine payout.

# File: entities/systems/rules-engine.md
---
type: system
id: rules-engine
owner_team: benefits
related_systems: [pre-auth-service, claims-gateway]
---
Vendor product (currently being replaced). Executes adjudication
rules. Rules are maintained internally by the Benefits team —
the vendor provides the execution platform, not the logic.
```

This is Leonard inking his own tattoos. The agent decides what's important enough to remember, how to categorize it, and how it connects to what it already knows.

### Step 5: Agent tries again

With structured context now in its knowledge base, the agent re-analyzes the original problem. If gaps remain, it asks again (loop). If sufficient, it proposes a solution.

```
# Agent's proposed answer (with context)
Q1: "Why does adjudication require a pre-auth lookup?"
Answer: "Pre-authorization validates that the provider and
procedure are covered under the member's plan BEFORE the
claim is adjudicated. Without this, the rules engine would
evaluate claims against contracts that may not apply —
leading to incorrect payouts. The Benefits team owns
pre-auth; the rules engine consumes its output."

References: entities/jargon/adjudication.md,
            entities/systems/rules-engine.md
```

### Step 6: Human reviews, context accumulates

If the answer is correct — the knowledge is validated. It stays in the structured knowledge base permanently. If incorrect, the human corrects, the agent learns what it misunderstood, and the knowledge base gets refined.

**After 20-30 problems:** the knowledge base covers the territory that matters. Nothing documented is unused. Learning paths emerge naturally. The agent needs less new context per problem. Leonard's body tells the story of every case he's worked.

### The TDD Parallel

Engineers will recognize this: TDD writes a failing test, then the minimum code to pass. DDC gives the agent a failing problem, then the minimum context to succeed. Same principle — **let demand drive supply.**

---

## What Emerged

Applying DDC to a real enterprise domain produced patterns we didn't design.

### Learning Paths Surface Themselves

After 10 problems, the most-referenced knowledge naturally formed a reading order: domain scope first, then key systems, then integration patterns, then decision frameworks. Nobody designed this sequence. The problems revealed it — like Leonard looking at his tattoos after a year and realizing they tell a story from simple to complex.

### The Curator Pattern

An unexpected but powerful pattern: one agent identifies what another agent needs. A "curator agent" reads a problem and produces a structured information checklist. The human fills it. A "solver agent" uses the curated knowledge to answer. This separation — discovering context needs vs. using context — was more effective than a single agent doing both.

### Agent Self-Discovery

The most surprising finding. With enough accumulated context about roles and domain boundaries, agents started asking boundary questions *before* solving:

*"Am I acting as an architect or a product owner? What decisions am I authorized to make vs. recommend?"*

Unprompted identity discovery through accumulated context. Leonard checking his tattoo that says "remember what you are" before starting the investigation.

---

## The Structure That Works

After experimentation, a structure optimized for both human readability and agent parseability:

```
knowledge-base/
├── entities/           # What exists (systems, teams, terminology)
├── diagrams/           # How things connect (sequences, architecture)
├── decisions/          # What was decided and why
├── sandbox/            # Active problem exploration
└── meta/               # How this repo works
```

**Key choices:** Markdown with YAML frontmatter (human-readable, machine-parseable, LLM-native). Explicit relationships in frontmatter (agents can't afford implicit knowledge). Sandbox for exploration, separate from curated knowledge (don't ink until you're sure).

---

## From One Domain to Many

DDC starts with one domain. But enterprises have hundreds. What happens when multiple DDC knowledge bases exist?

**Federated context.** Each domain maintains its own knowledge base. Cross-domain queries are explicit. **Context graphs.** Relationships between domains form navigable edges. **Context trimming.** Not all knowledge stays relevant. Systems get decommissioned, decisions get superseded. A healthy practice includes retiring stale context — even Leonard crosses out tattoos that are no longer true.

---

## The Honest Part

This is an experiment. We're sharing what's working — one domain, real problems, measurable results.

What we can say:
- Top-down curation didn't work. DDC does — so far.
- Agents with DDC-curated context produce meaningfully better output than agents with ad-hoc context.
- The knowledge base is smaller, more relevant, and more maintainable than what top-down produces.
- Unexpected patterns emerge that we couldn't have designed upfront.

What we can't say yet:
- Whether it scales to 50 domains.
- Whether the patterns are domain-specific or universal.

We're sharing early because the enterprise AI community is stuck on the context problem, and DDC is worth trying.

---

## Try It

1. Create a knowledge base repo (markdown + YAML frontmatter, Git-managed)
2. Pick one real problem your team is working on right now
3. Give it to an AI agent with zero domain context
4. Capture its information checklist — what it says it needs
5. Fill the gaps, let the agent curate them into structured entities
6. Repeat with 2-3 more problems. Watch the 20% reveal itself.

---

## One Takeaway

If you remember nothing else — and unlike Leonard, you have no excuse:

**Stop trying to document everything. Give your agent a real problem. Let it tell you what's missing. Let it ink its own tattoos. Repeat 30 times.**

You'll have a better knowledge base than months of top-down documentation would have produced. And unlike Leonard, your agent's tattoos are version-controlled.

---

*If you're experimenting with enterprise AI agent context — whether with DDC or your own approach — I'd love to hear what you're finding. The context problem is the real frontier in enterprise AI, and we're all waking up in the same motel room.*
