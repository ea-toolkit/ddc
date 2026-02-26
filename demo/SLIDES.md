# DDC Presentation Slides — AI Builders Meetup

> ~15 min total: 5 min narrative + 10 min live demo
> Tool: Any slide tool (Google Slides, Keynote, Figma). Minimal text, big images.

---

## Slide 1: Title

**Text:**
```
Demand-Driven Context
Teaching AI Agents to Remember What Matters
```

**Subtitle:** `<Your Name> · AI Builders Meetup · Feb 2026`

**Image:** Dark, moody still of Leonard Shelby looking at his tattooed body in the mirror (from Memento). Or a silhouette of a person covered in Post-it notes.

**Speaker notes:** No talking here. Let the image land. 3 seconds of silence.

---

## Slide 2: "I Have This Condition"

**Text:**
```
"I have this condition."

Expert investigator. Sharp mind.
Zero memory of what happened ten minutes ago.
```

**Image:** Leonard's Polaroid wall from Memento — the motel room covered in photos, notes, and string. Chaotic but systematic.

**Speaker notes:**
> "Remember Memento? Leonard Shelby — the guy who can't form new memories. Every morning he wakes up in a motel room with no idea how he got there. Expert investigator. Sharp mind. But without his system of tattoos and Polaroid photos — he's just a confused man in a motel room."

---

## Slide 3: Your AI Agent is Leonard

**Text:**
```
Your AI agent is Leonard.

Skills: 10/10
Company context: 0/10
```

**Image:** Split screen — left: a brain icon or neural network (representing capability), right: an empty filing cabinet or blank whiteboard (representing zero context).

**Speaker notes:**
> "Give your agent a real enterprise problem and it wakes up like Leonard. Expert reasoning. Zero memory of your company. It doesn't know your acronyms, your team boundaries, or why the architecture works the way it does. And just like Leonard — it doesn't sit there helplessly. It confidently produces a beautifully structured, completely wrong answer."

---

## Slide 4: The IKEA Experience

**Text:**
```
Anyone who's shopped at IKEA knows this feeling.
```

**Image:** A beautiful, well-organized IKEA showroom — clear paths, numbered arrows on the floor, clear signage, everything findable.

**Speaker notes:**
> "Anyone who's shopped at IKEA knows how easy it is to navigate the store. Clear pathways, numbered sections, you walk in with a list and walk out with exactly what you need. The physical world is solved."

---

## Slide 5: Now Look at the Digital Side

**Text:**
```
The digital side of any enterprise.
```

**Image:** A chaotic, disorganized warehouse — boxes stacked randomly, no labels, dim lighting. OR a tangled mess of cables/wires in a server room. OR a whiteboard covered in incomprehensible architecture diagrams with arrows going everywhere.

**Speaker notes:**
> "But look at the digital side of any enterprise company. It's the opposite. Hundreds of systems, thousands of APIs, tribal knowledge locked in people's heads, docs scattered across Confluence, Notion, SharePoint, Slack threads. No clear path. No numbered arrows. Your AI agent walks into this warehouse on day one."

---

## Slide 6: We Have the Pipes, Not the Water

**Text:**
```
We have the pipes.
MCP servers · Context services · CLAUDE.md · .cursorrules
System prompts · RAG pipelines

But who curates what flows through them?
```

**Image:** Beautiful plumbing system / water pipes — but they're empty. Dry. Or a firehose spraying everywhere vs. a targeted stream.

**Speaker notes:**
> "Today we have many ways to expose context to agents. MCP servers, context services, prompt files like CLAUDE.md, RAG pipelines. The pipes are getting better every week. But there's a problem upstream that nobody's talking about: how do you actually curate the context in the first place? Who decides what goes into those pipes? Most teams either dump everything in — or guess. Both fail."

---

## Slide 7: The Curation Problem

**Text:**
```
Top-down: Document everything → 80% is never used
Bottom-up: Document nothing → agent guesses wrong
```

**Image:** Two extremes side by side:
- Left: An encyclopedia / massive stack of paper (top-down, overwhelming)
- Right: An empty notebook / blank page (bottom-up, nothing there)

**Speaker notes:**
> "Top-down curation means documenting everything before the agent needs it. Takes months, 80% is never referenced, and it's stale before you finish. Bottom-up means document nothing and let the agent figure it out — which means it guesses, hallucinates, and gets things wrong. Both extremes fail. There's a third way."

---

## Slide 8: What if the Agent Told You What's Missing?

**Text:**
```
What if you treated your AI agent
like a new joiner on Day 1?
```

**Image:** A person on their first day at work — sitting at a desk with a laptop, empty desk, maybe a "Welcome!" note. Looking slightly overwhelmed but ready.

**Speaker notes:**
> "When a senior architect joins your company on Day 1, they're Leonard. Expert skills, zero company context. What do they do? They don't read the entire wiki. They start working on real problems and ask questions: 'What does that acronym mean here?' 'Who owns eligibility?' 'Why two steps instead of one?' Each answer builds their mental model. After 20-30 problems — they're productive. What if the AI agent did the same?"

---

## Slide 9: Demand-Driven Context

**Text:**
```
DDC: Demand-Driven Context

Give the agent a real problem.
Let it fail.
Let it tell you what's missing.
Fill the gaps.
Let it ink its own tattoos.
```

**Image:** The DDC loop diagram — simple circular flow:
```
PROBLEM → AGENT FAILS → DEMAND CHECKLIST → HUMAN FILLS GAPS → AGENT CURATES → AGENT SUCCEEDS
   ↑                                                                                    |
   └────────────────────── next problem ──────────────────────────────────────────────────┘
```

**Speaker notes:**
> "That's what I've been experimenting with. DDC — Demand-Driven Context. It's problem-driven. You give a real problem to an agent. The agent attempts it, fails, and produces a demand checklist — exactly what domain knowledge is missing. A human provides that information. The agent structures it into typed, version-controlled entities. Then it answers the question. Like TDD for knowledge — RED, GREEN, REFACTOR."

---

## Slide 10: The TDD Parallel

**Text:**
```
TDD                          DDC
───                          ───
Write failing test     →     Give agent a problem
Write minimum code     →     Provide minimum context
Test passes            →     Agent succeeds
Refactor               →     Curate into KB
Accumulates coverage   →     Accumulates context
```

**Image:** Side-by-side comparison, clean and minimal. Red/green color coding.

**Speaker notes:**
> "Engineers in the room will recognize this. TDD writes a failing test, then the minimum code to pass. DDC gives the agent a failing problem, then the minimum context to succeed. Same principle — let demand drive supply. And just like test coverage grows over time, context coverage grows. After 20-30 cycles, the knowledge base converges."

---

## Slide 11: Let Me Show You

**Text:**
```
Live Demo
```

**Image:** Terminal/CLI screenshot or just a clean black screen with a blinking cursor.

**Speaker notes:**
> "Enough slides. Let me show you."

**→ Switch to terminal. Follow DEMO-SCRIPT.md.**

---

## Slide 12: What Just Happened (post-demo)

**Text:**
```
5 structured entities created from rough notes.
3 vendor questions answered with specific details.
0 hallucination. 0 pre-existing documentation.

The knowledge base grew by exactly what the problem demanded.
```

**Image:** Before/after — empty folder → folder with 5 files. Or empty whiteboard → whiteboard with structured diagrams.

**Speaker notes:**
> "In 5 minutes, the agent went from zero domain knowledge to answering vendor integration questions with specific system names, decision codes, and SLAs. No hallucination. No pre-existing docs. The knowledge base grew by exactly what the problem demanded — nothing more, nothing less."

---

## Slide 13: Convergence

**Text:**
```
Cycle 1:  8 new entities needed
Cycle 2:  5 new entities needed
Cycle 5:  2 new entities, 6 reused
Cycle 20: 0 new entities, all reused

The 20% reveals itself.
```

**Image:** A convergence curve — steep at first, flattening out. X-axis: DDC cycles. Y-axis: new entities needed. The curve flattens toward zero.

**Speaker notes:**
> "Here's the hypothesis we're testing. Each cycle needs fewer new entities because previous cycles already captured most of the domain. After 20-30 cycles, the knowledge base converges. You haven't documented everything — you've documented the 20% that solves 80% of problems. And you didn't have to guess which 20%. The problems told you."

---

## Slide 14: What's Next — Agent Architecture

**Text:**
```
ta-agent    Technology Architect
po-agent    Product Owner
se-agent    Senior Engineer
da-agent    Data Architect
sa-agent    Security Architect

Same KB. Different lenses. Different skills.
```

**Image:** Five agent icons arranged around a central knowledge base icon. Each agent has a different color/symbol. Think Avengers assembled, but for enterprise architecture.

**Speaker notes:**
> "The north star is specialized agents. Same knowledge base, different roles. A Technology Architect agent reasons about integrations. A Product Owner agent maps user journeys. A Security Architect agent does threat modeling. Each reads the same curated entities but brings different reasoning. We've built the first versions of these as Claude Code sub-agents — they're in the repo."

---

## Slide 15: Try It

**Text:**
```
1. Create a KB repo (markdown + YAML frontmatter)
2. Pick one real problem your team has right now
3. Give it to an AI agent with zero context
4. Capture what it says it needs
5. Fill the gaps, let it curate
6. Repeat. Watch the 20% reveal itself.

github.com/<your-repo>
```

**Image:** Clean, minimal. Maybe the DDC loop diagram again, small, in the corner.

**Speaker notes:**
> "You can try this today. Create a markdown repo. Pick one real problem. Give it to an agent. Let it fail. Fill the gaps. Repeat. The framework, tooling, templates, and a worked example are all open source."

---

## Slide 16: One Takeaway

**Text:**
```
Stop documenting everything.
Give your agent a real problem.
Let it tell you what's missing.

Let it ink its own tattoos.
```

**Image:** Close-up of Leonard's hand writing on a Polaroid photo. Or a tattoo being inked.

**Speaker notes:**
> "If you remember nothing else: stop trying to document everything. Give your agent a real problem. Let it tell you what's missing. Let it ink its own tattoos. Repeat 30 times. You'll have a better knowledge base than months of top-down documentation. And unlike Leonard — your agent's tattoos are version-controlled."

---

# Image Sourcing Guide

| Slide | Image | Where to Find |
|-------|-------|---------------|
| 1, 2, 16 | Memento stills (Leonard, Polaroid wall, tattoos) | Google Images "memento movie polaroid wall", "leonard shelby tattoos mirror". Fair use for educational presentation. |
| 4 | IKEA showroom | Unsplash search "IKEA store" or use your own photo from an IKEA visit |
| 5 | Chaotic warehouse / messy server room | Unsplash "messy warehouse" or "server room cables tangled" |
| 6 | Empty pipes / plumbing | Unsplash "industrial pipes" or "empty water pipes" |
| 7 | Encyclopedia vs empty notebook | Unsplash "stack of books" + "empty notebook" |
| 8 | First day at work | Unsplash "first day job" or "new employee desk" |
| 9 | DDC loop diagram | Create in Figma/draw.io — use the ASCII version above as reference |
| 10 | TDD comparison | Create as a simple table graphic |
| 11 | Terminal cursor | Screenshot your own terminal |
| 13 | Convergence curve | Create in any charting tool or hand-draw for authentic feel |
| 14 | Agent architecture | Create in Figma — 5 icons around a central KB |

---

# Timing Guide

| Section | Slides | Time |
|---------|--------|------|
| Memento hook | 1-3 | 1 min |
| IKEA vs enterprise | 4-5 | 1 min |
| The curation problem | 6-8 | 1.5 min |
| DDC introduction | 9-10 | 1.5 min |
| Live demo | 11 | 8-10 min |
| Wrap-up | 12-16 | 2 min |
| **Total** | | **~15 min** |