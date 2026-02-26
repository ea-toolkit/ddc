# DDC Live Demo Script — Claude Code (~10 minutes)

> **Tool**: Claude Code (terminal-based AI agent)
> **Audience**: AI builders meetup

## Pre-Demo Setup (do before the meetup)

1. Open a terminal (full-screen recommended for visibility)
2. Reset the demo KB to empty state:
   ```bash
   cd demo/demo-kb/domain-knowledge/entities
   find . -name "*.md" -delete
   cd ../../../..
   ```
3. Launch Claude Code from the demo-kb root:
   ```bash
   cd demo/demo-kb
   claude
   ```
4. Verify Claude Code loaded the CLAUDE.md — it auto-reads it from the working directory
5. **Font size**: bump terminal font to 18-20pt so the audience can read

## The Demo

### Intro (1 min — spoken, no screen)

> "I work on enterprise AI agents. The problem isn't model capability — it's that agents have zero institutional memory. They know architecture patterns, but not YOUR systems. I built a methodology called DDC — Demand-Driven Context — that fixes this. Let me show you."

---

### Part 1: The Failure (2 min)

**What you type into Claude Code:**

```
Our vendor is replacing our claims adjudication engine. They need answers to three integration questions:

1. Why does adjudication require a pre-authorization lookup before running rules?
2. What are the pre-auth decision codes and how does each one affect claim processing?
3. Should claims be processed in batch or real-time?

Answer these questions with specific system names, decision codes, and SLAs from our domain.
```

**What happens:**

Claude Code follows the CLAUDE.md instructions:
1. Uses Glob/Read tools to search `domain-knowledge/entities/` — finds only `.gitkeep` files
2. Says: "I searched the knowledge base but don't have enough domain-specific context to answer this accurately."
3. Produces a **Demand Checklist** — structured by type (terminology, systems, business logic)

> **Tip**: The audience will see Claude Code's tool calls in the terminal (Glob, Read) — this makes the "searching" visible and convincing.

**What you say to the audience:**

> "This is the RED phase — the agent failed. But it didn't just say 'I don't know.' It told us EXACTLY what domain knowledge is missing. That checklist is the demand signal."

---

### Part 2: The Human Fills Gaps (2 min)

**What you say:**

> "Now I play the domain expert. I have rough notes — not structured, just what I know off the top of my head."

**What you do:**

Paste the contents of `demo/rough-notes.md` directly into the Claude Code prompt. You can copy it beforehand or type `/read demo/rough-notes.md` if you set up a shortcut.

**What you say while pasting:**

> "These are messy, unstructured notes. The kind of thing a senior engineer scribbles on a whiteboard. Watch what the agent does with them."

---

### Part 3: The Agent Curates (2 min)

**What happens:**

Claude Code creates structured entity files using the **Write tool** — the audience sees each file being created in real-time in the terminal:

- `entities/jargon-business/adjudication.md` — YAML frontmatter + structured description
- `entities/jargon-business/pre-authorization.md` — decision codes, branching logic
- `entities/systems/claims-gateway.md` — ownership, EDI formats, SLAs
- `entities/systems/rules-engine.md` — vendor status, integration pattern
- `entities/systems/pre-auth-service.md` — auto-approval targets, validity periods

Claude Code confirms: "I've curated 5 entities from your input: [list]"

> **Tip**: The Write tool calls are visible in the terminal — the audience sees the file paths and can follow along. This is a major advantage over Copilot where file creation happens silently.

**What you say:**

> "Look at what just happened. Rough tribal knowledge went in. Structured, typed, version-controlled entities came out. Each file has YAML frontmatter — type, ID, relationships. Humans can read the prose. Machines can parse the metadata."

**Optionally show a file:**

Type into Claude Code:
```
Show me the contents of the pre-authorization entity you just created.
```

---

### Part 4: The Agent Answers (2 min)

**What you type into Claude Code:**

```
Now answer the original three vendor integration questions using the knowledge base.
```

**What happens:**

Claude Code re-reads the entities (visible Glob/Read tool calls) and answers all three questions with:
- Specific system names (Claims Gateway, Rules Engine, Pre-Auth Service)
- Exact decision codes (approved, denied, not-required) and branching logic
- Concrete SLAs (30s real-time for professional, 4-hour batch for institutional)
- Ownership info (claims-operations team)

**What you say:**

> "This is the GREEN phase. Same agent, same question — but now it has domain context. The vendor could design their integration from this answer alone.
>
> And here's the key: those entity files are permanent. Next time ANY agent asks about adjudication, pre-auth, or Claims Gateway — the knowledge is already there. It accumulates across cycles."

---

### Closing (1 min)

> "This is Demand-Driven Context. Like TDD for knowledge:
> - RED: Agent fails, tells you what's missing
> - GREEN: Human provides context, agent succeeds
> - REFACTOR: Knowledge is structured and graduated to the KB
>
> After 20-30 cycles, the KB converges — new problems need fewer new entities because most of the domain is already captured.
>
> It's not RAG — we're not retrieving existing docs. It's not fine-tuning — we're not retraining the model. It's context engineering: building the right knowledge base so any agent can do enterprise work."

---

## Why Claude Code (talking points if asked)

- **Visible tool calls**: audience sees Glob, Read, Write in the terminal — transparent agent behavior
- **CLAUDE.md auto-loading**: no setup needed, agent picks up instructions from the directory
- **File creation is real**: Write tool creates actual files on disk, not suggestions
- **Sub-agents**: Task tool can delegate to specialized explore/plan agents
- **Skills**: custom slash commands (e.g., `/ddc-cycle`) can encode the DDC workflow as reusable skills
- **Terminal-first**: feels more "live" and technical for a builder audience

## Troubleshooting

**If Claude Code doesn't follow the DDC workflow:**
- Make sure you launched `claude` from inside `demo/demo-kb/` so it picks up the local CLAUDE.md
- If needed, say: "Follow the DDC workflow described in your CLAUDE.md instructions."

**If Claude Code doesn't create files:**
- Say: "Create the entity files now using the Write tool."

**If Claude Code asks for permission:**
- Normal behavior — approve the Write tool calls. Mention to audience: "It asks permission before writing files — that's a safety feature."

**If the audience asks about RAG:**
- "RAG retrieves existing docs. DDC creates the docs that don't exist yet — it's upstream of RAG."

**If the audience asks about fine-tuning:**
- "Fine-tuning changes model weights. DDC changes the context window. You can version-control context; you can't version-control weights."

**If asked about scale:**
- "We propose a scaling architecture: agent drafts entities, humans review via PR. Like code review for knowledge."

## Reset Between Runs

```bash
cd demo/demo-kb/domain-knowledge/entities
find . -name "*.md" -delete
cd ../../../..
```

This deletes all entity markdown files but keeps the folders (via `.gitkeep`).