# Demand-Driven Context (DDC) Framework

> **DDC is TDD for knowledge bases** — failing agents drive curation, not failing tests.

**A methodology for building enterprise AI agent knowledge bases through problem-driven curation.**

Stop trying to document everything. Give your agent a real problem. Let it tell you what's missing. Repeat 30 times.

---

## The Problem

Enterprise AI agents excel at reasoning but lack the domain-specific context to make accurate decisions. Current approaches fail because they try to anticipate what an agent needs:

- **Context window stuffing** — too large to compress, agent can't prioritize
- **RAG over wikis** — retrieves documents, not understanding
- **Top-down curation** — takes months, half is never used, stale before you finish
- **Skills.md** — great for patterns, insufficient for deep domain knowledge

## The Solution: DDC

DDC flips the approach: instead of telling agents what to know, let problems reveal what to curate.

```
Real Problem -> Agent Attempts (fails) -> Information Checklist
     -> Human Fills Gaps -> Agent Curates -> Agent Succeeds
                                              |
                              Repeat 20-30x --+-- Knowledge Base Emerges
```

Think **TDD for knowledge bases**: failing tests drive code, failing agents drive curation.

## What's In This Repo

| Directory | Contents |
|-----------|----------|
| `METHODOLOGY.md` | The DDC framework — how it works |
| `WHY.md` | The hypothesis and motivation |
| `CLAUDE.md` | AI agent guidance for DDC knowledge bases |
| `meta/` | Entity and relationship type definitions |
| `templates/` | Starter kit — domain skeleton, entity templates, cycle log template |
| `tooling/` | Web UI for exploring knowledge bases (FastAPI + React) |
| `examples/healthcare-claims/` | Synthetic domain with ~40 entities and 5 DDC cycle logs |
| `demo/` | Empty knowledge base + script for trying DDC yourself |
| `ddc-cycle-log/` | Cycle log format spec and analysis scripts |

## Try DDC in 5 Minutes

Have Claude Code (or any AI coding agent) installed? Try a DDC cycle right now:

```bash
# 1. Clone and open the demo knowledge base
git clone https://github.com/user/ddc-framework.git
cd ddc-framework/demo/demo-kb

# 2. Give your agent a problem (see demo/rough-notes.md for a sample)
#    Open Claude Code and paste a domain problem
#    Watch the agent attempt it, fail, and tell you what's missing

# 3. Fill the gaps — add entity files to domain-knowledge/entities/
#    The agent will help you curate them in the right format
```

See [demo/DEMO-SCRIPT.md](./demo/DEMO-SCRIPT.md) for a full walkthrough.

## Quick Start

### 1. Explore the Example Domain

```bash
cd tooling
DDC_KNOWLEDGE_BASE_PATH=../examples/healthcare-claims/domain-knowledge ./start.sh
```

Open http://localhost:3000 to browse the healthcare claims knowledge base.

### 2. Start Your Own DDC Knowledge Base

```bash
cp -r templates/domain-skeleton my-domain/
# Edit CLAUDE.md with your domain scope
# Create your first sandbox problem
# Run your first DDC cycle
```

### 3. Read the Methodology

1. [WHY.md](./WHY.md) — The hypothesis
2. [METHODOLOGY.md](./METHODOLOGY.md) — The DDC framework
3. [examples/healthcare-claims/ddc-cycle-logs/](./examples/healthcare-claims/ddc-cycle-logs/) — See it in action

## The Convergence Hypothesis

After 20-30 real problems:
- Each new problem requires fewer new entities (knowledge converges)
- Learning paths emerge naturally from most-referenced entities
- The knowledge base is smaller, more relevant, and more maintainable than top-down

Track convergence with the analysis script:

```bash
python ddc-cycle-log/analysis/coverage-curve.py examples/healthcare-claims/ddc-cycle-logs/
```

## Contributing

This is an active research project. If you're experimenting with enterprise AI agent context — whether with DDC or your own approach — contributions and experience reports are welcome.

## License

MIT License. See [LICENSE](./LICENSE).