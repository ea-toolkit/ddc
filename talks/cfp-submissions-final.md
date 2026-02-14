# CFP Submissions — AI Engineer Conference

---

## SUBMISSION 1: Stage Talk (20 min)

### Session Title

Demand-Driven Context: When Knowledge Is Too Large to Compress and Too Dense to Curate

### Session Description

London's black cab drivers don't learn "The Knowledge" by reading a map. They get on a moped, an examiner gives them a destination, and they try to find the route. They get lost. They discover which streets they didn't know. They go learn those streets. Next destination, less lost. Each run fills gaps the previous one revealed — and eventually they know the city. Not because they memorized a map, but because real destinations demanded the knowledge. Nobody told them what to learn. The journeys told them.

Enterprise AI agents need the same thing. The industry has built impressive solutions for context *management* — RAG pipelines, vector databases, skills.md files, structured prompts. But there's a harder problem nobody talks about: context *discovery*. How do you even know what to curate in the first place?

A skills.md works when context is small — coding patterns, API docs, tooling. But enterprise domain knowledge? Business processes, system integrations, vendor constraints, tribal conventions across multiple teams? Too large to compress, too dense to curate. Feed it all to the agent anyway and it drowns — hallucinating confidently with context it can't prioritize, like a lost kid in Disneyland who technically has a map but still ends up crying at the wrong ride. Without solving discovery, your enterprise agent is just an expensive autocomplete — great at generating code, incapable of generating decisions. We tried the top-down approach — a Miro board full of colourful stickies, three people arguing "no, THIS is the agent context," someone screenshots it into Confluence, and congratulations: you've built a beautifully organized knowledge base that no agent ever reads and goes stale before your next sprint.

So we did what the cab drivers do. At a large enterprise, across a domain with multiple engineering teams and a multi-year transformation, we stopped telling agents what to learn and started giving them destinations. We call the framework **Demand-Driven Context (DDC)**. Give a real problem to an agent with zero domain context. It confidently produces nonsense. It tells you exactly what's missing. Curate only that. Repeat. Think TDD for knowledge bases — failing tests drive code, failing agents drive curation. After 20-30 real problems you have a knowledge base that's sharper than months of top-down documentation. Discovery solved — by making it the agent's job, not yours.

In this talk, I'll share:

**Move to Bin** — Why we threw away our Miro-to-Confluence context curation pipeline, and why you should question yours too.

**The Flip** — "Tell the agent nothing. Let it ask everything." How DDC works in practice with real examples from a live enterprise domain.

**The Curator Agent** — An agent that identifies what other agents need. An agent for agents.

**Who Am I?** — How agents started asking identity and boundary questions before solving problems — unprompted self-discovery of role scope.

**Unexpected Emergences** — Learning paths, reasoning loops, and knowledge patterns that surfaced themselves rather than being designed by us.

**Not a Clickbait** — Why we call it DDC and not "TDD for Knowledge Bases" — and the philosophical difference between verification and discovery.

**Context as a Service** — When multiple knowledge bases exist, how to federate accumulated context as a platform offering and what happens when you start connecting context into graphs.

**Early Results** — We've been running DDC in production against real vendor integration problems, architecture decisions, and system design tasks. I'll share what we're measuring: context reuse across problems, knowledge base growth curves, agent accuracy progression from problem 1 to problem N, and how much curated context DDC produces versus our earlier top-down attempt — spoiler: less volume, more signal.

This talk includes a **live demonstration** of DDC in action — a real enterprise problem, an agent with zero context, the information checklist it generates, and the before/after of curated context applied.

One takeaway: stop memorizing the city. Give your agents destinations. The roads will build themselves.

---

## SUBMISSION 2: Workshop (1+ hour)

### Session Title

Build Your First Demand-Driven Context Base: Let AI Agents Tell You What They Need

### Session Description

London's black cab drivers don't learn "The Knowledge" by reading a map. An examiner gives them a destination, they get lost, they discover which streets they didn't know, they go learn those streets. Each run fills gaps the previous one revealed — until they know the city. Nobody told them what to learn. The journeys told them.

That's the opposite of what every enterprise team is doing with AI agents right now. We curate tribal knowledge into skills.md files and structured knowledge bases, three people argue over a Miro board about what the agent needs to know, someone screenshots it into Confluence, and we wonder why the agent still can't reason about anything domain-specific. The industry has great tools for context *management* — RAG, vector databases, prompt engineering. But the harder unsolved problem is context *discovery*: how do you even know what to curate? Without solving it, your enterprise agent is just an expensive autocomplete.

In this hands-on workshop, you'll do what the cab drivers do — give your agent destinations instead of maps. You'll build a **Demand-Driven Context (DDC)** base from scratch, where real problems drive what gets curated, not top-down guessing.

**The exercise is simple but the insight is profound:**

1. You'll get a realistic enterprise problem (we provide problem cards)
2. You'll give it to an AI agent with zero domain context
3. The agent will fail — and generate an information checklist of exactly what's missing
4. You'll fill the gaps using reference material we provide
5. The agent will try again — and succeed

That moment — when the agent goes from confidently wrong to correctly reasoned — is when DDC clicks. You didn't document everything. You documented exactly what one problem demanded. Now multiply that by 30 problems and you have a better knowledge base than months of top-down curation.

**What you'll build:**

A working knowledge base repo with structured domain entities, a sandbox for problem exploration, and a repeatable process for growing the knowledge base problem-by-problem. Everything in Markdown — human-readable, machine-parseable, Git-friendly. You'll also see how to use **Claude Code sub-agents** to separate concerns — a curator agent that identifies what context is missing, a solver agent that uses the curated context to reason, and role-specific agents (architect, engineer, product owner) that share the same knowledge base but operate with different reasoning boundaries. No custom tooling required — just CLAUDE.md files, sub-agent task delegation, and the knowledge repo structure doing the heavy lifting.

**What you'll experience:**

- The "flip" moment — agents telling you what they need instead of you guessing what to give them
- How learning paths emerge from problems rather than being designed upfront
- How different problems reveal overlapping context needs — showing you where to invest curation effort
- The TDD parallel — DDC is to knowledge bases what TDD is to code

**What you'll see from real production use:**

We've been running DDC at a large enterprise against real vendor integration problems, architecture decisions, and system design tasks. The workshop includes a **live walkthrough** of actual DDC sessions — real enterprise problems, the information checklists agents generated, how context was curated, and the before/after of agent output quality. You'll see real numbers: knowledge base growth curves, context reuse across problems, and how agent accuracy improves from problem 1 to problem N.

**What you'll leave with:**

- A working DDC knowledge base you can extend with your own domain
- A repeatable process for demand-driven curation
- A template repo with structure, formats, and agent guidance
- Evidence from real production use that demand-driven curation produces less volume but more signal than top-down documentation
- The conviction that 30 real problems beat 6 months of documentation

No specific programming language required. Bring a laptop with Claude Code, Cursor, or any LLM-powered coding tool. All content is in Markdown — this is about knowledge, not code.

Whether you're an engineer building enterprise agents, an architect designing knowledge systems, or a team lead who's tried and failed to curate domain knowledge for LLMs — this workshop gives you a framework you can apply the week you get home.

---

## SUBMISSION 3: Stage Talk (20 min)

### Session Title

Agents as First-Class Citizens: From Copilot to Colleague

### Session Description

Most teams say "agents" but mean "a spicy autocomplete with a Slack integration." A sidecar bot here, a chat sidebar there, nothing you'd trust with a real architectural decision. Fair enough — we started there too. At a large enterprise's core services domain, we gave coding assistants to multiple engineering teams. Code generation went up. Business ROI? Barely moved. Because the hard work was never typing code. It was understanding why the system makes two API calls instead of one, which team owns the capacity decision, and what a vendor migration means for an integration you designed 18 months ago.

So we ran an experiment: what if we onboarded an AI agent like an actual senior Technology Architect? Not "here's a prompt, go code." Real onboarding — learning paths, domain context, reasoning frameworks, role boundaries. The same investment you'd make in a human hire, except the new joiner has infinite patience and never needs a coffee break.

This talk is the story of that experiment — the false starts, the surprises, and the places where we still don't trust it. Not a success story. Not a failure story. An honest story about what changes when you stop treating an agent as a tool and start treating it as a teammate.

In this talk, I'll share:

**The ROI Gap** — Why code generation went up but business impact didn't, and what that tells you about where agents actually need to operate.

**The Onboarding Experiment** — How we designed learning paths, skills, and reasoning loops for an AI Technology Architect — using real delivery and customer service problems, not abstract capability models.

**The Trust Spectrum** — Where the agent earned trust (drafting ADRs, navigating system dependencies), where it didn't (novel problems, cross-team politics), and how we designed human-in-the-loop without turning engineers into babysitters.

**The Identity Moment** — When the agent started asking "what's my role boundary?" and "should I decide this or recommend it?" before solving problems — without being told to. What that means for agent design.

**The Team Dynamic** — What changes when engineers start treating the agent as a colleague. Hint: the interesting shift isn't in the agent's output. It's in how humans change their own behaviour.

**The Playbook** — Which problems to start with, what context to invest in first, and how to go from "cute demo" to first-class citizen of your architecture.

One takeaway: the gap between copilot and colleague isn't intelligence. It's context, trust, and the willingness to invest in onboarding something that isn't human.

---

## SPEAKER PITCH

*Use for all submissions — adapt as needed per form.*

Principal Engineer at a large enterprise, responsible for technology and AI across multiple product teams. Part of the organization's AI initiative since day zero — back when "AI strategy" meant adding ChatGPT to the approved tools list and calling it transformation. Helped uplift AI adoption across the org, and now embedding AI agent workflows into real engineering delivery to prove — to the believers, the sceptics, and the guy who still thinks AI peaked at auto-complete — that there's actual ROI when agents get real domain context. Not demo-works. Production-works.

Not selling a product or pitching a startup. An engineer inside a large enterprise who got tired of the gap between AI hype and AI usefulness — and decided to build the bridge. Everything shared comes from a live experiment with real problems and real teams. Some of it worked. Some didn't. Both will be shared.