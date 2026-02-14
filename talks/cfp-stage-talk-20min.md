
# CFP: Stage Talk (20 minutes)

## Title

Demand-Driven Context: When Knowledge Is Too Large to Compress and Too Dense to Curate

## Abstract

Every enterprise building AI agents hits the same wall: the context problem. Not the "how do I fit it in a context window" problem — the "how do I even know what to curate" problem.

Your domain knowledge lives across Confluence, Miro, GitHub, Archimate, Slack threads, and the heads of people who've been there 10 years. You could spend months curating it top-down into structured knowledge bases. We tried. It doesn't work. You end up with a beautifully organized graveyard of information that no agent actually needs.

So we flipped it. Instead of telling agents everything, we let agents ask for everything. We call it **Demand-Driven Context (DDC)** — a framework where real problems drive what gets documented, not the other way around.

Think of it as TDD for knowledge bases: just as Test-Driven Development lets failing tests drive code design, DDC lets failing agent responses drive knowledge curation. You don't write all the tests upfront. You don't curate all the context upfront.

In this talk, I'll share how we applied DDC at an enterprise domain (multiple teams, multi-year transformation, vendor migration) to build an AI agent that performs Technology Architect cognitive work — and the surprising things we discovered along the way.

## Talk Outline

**1. The 3000 BCE Problem** (3 min)
Imagine Earth with no roads, no lanes — just tribal knowledge about how to get from A to B. That's enterprise knowledge today. It exists, but there are no curated paths for agents to follow.

**2. Move to Bin: What Doesn't Work** (3 min)
- Context window stuffing — too large to compress
- Top-down curation — too dense to curate, takes forever, documents things nobody needs
- RAG over Confluence — retrieves noise, misses relationships
- Skills.md and system prompts — good for general patterns, insufficient for deep domain reasoning

**3. The Flip: Tell Nothing, Let Agents Ask Everything** (4 min)
Introduce the DDC framework:
- Treat the agent as a Day 1 new joiner with zero domain knowledge
- Give it a real problem
- It says: "I need X, Y, Z to answer this"
- That becomes your curated context
- Repeat with 20-30 real problems -> organic knowledge base

**4. The TDD Analogy** (2 min)
- TDD: failing test -> write code -> test passes -> next test
- DDC: failing agent -> curate context -> agent succeeds -> next problem
- You don't pre-write all tests. You don't pre-curate all context.

**5. Unexpected Discoveries** (4 min)
- **Learning paths surface themselves** — after 10 problems, the reading order for a new TA becomes obvious
- **Reasoning loops emerge** — agents develop "when I see X, I first check Y" patterns without being told
- **The curator agent** — an agent that identifies what other agents need (an agent for agents)
- **Self-discovery** — agents start asking "who am I? what's my role boundary?" before solving problems

**6. What's Next: Context as a Service** (3 min)
- When multiple knowledge bases exist, how do you federate?
- Context graphs — connecting knowledge across domains
- Platform offering — accumulated context served to teams
- Trimming — knowing when context is stale or redundant

**7. One Takeaway** (1 min)
Stop curating. Start demanding. Let your problems build your knowledge base.

## Key Takeaways for Audience

1. **A practical framework** (DDC) they can apply Monday morning to their enterprise agent context problem
2. **Permission to stop** the exhausting top-down curation approach
3. **The TDD analogy** — a mental model that makes the approach intuitive
4. **Real numbers** — how 20-30 problems can build a comprehensive knowledge base

## Speaker Bio

Principal Engineer at a large enterprise, responsible for domain-level technology, engineering, and AI across multiple product teams. Currently leading an experiment to prove that AI agents with curated domain knowledge can perform 60%+ of cognitive work traditionally done by human architects and engineers.

## Why This Talk Matters Now

The AI Engineer community is obsessed with RAG, fine-tuning, and prompt engineering. But the hardest problem in enterprise AI isn't retrieval — it's knowing what to retrieve. Every company building agents will hit the context wall. This talk gives them a framework to climb it.

## Format

Stage talk, 20 minutes. Slides + live examples from actual DDC sessions.

## Target Audience

- Engineers building enterprise AI agents
- Architects designing knowledge systems for AI
- Team leads struggling with agent context at scale
- Anyone who's tried (and failed) to curate enterprise knowledge for LLMs