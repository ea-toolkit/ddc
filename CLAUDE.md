# CLAUDE.md - AI Agent Guidance for DDC Knowledge Bases

> **Read [WHY.md](./WHY.md) and [METHODOLOGY.md](./METHODOLOGY.md) first** to understand the framework.

## What This Repository Is

This is the **Demand-Driven Context (DDC) framework** — a methodology and toolkit for building domain knowledge bases that serve both humans and AI agents.

It contains:
1. **The DDC methodology** — how demand-driven context curation works
2. **Tooling** — a web UI for exploring knowledge bases
3. **A synthetic example domain** — healthcare claims processing (for demos and testing)
4. **Templates** — starter kit for applying DDC to your own domain

## Core Principles

### 1. Slow, Incremental, Curated

Knowledge bases grow **slowly and deliberately**. Every addition should be:
- **Curated**: Reviewed, structured, and placed correctly
- **Incremental**: Small commits, one concept at a time
- **Non-bloating**: No duplicate information, no "dump and forget"

### 2. Commit Early, Commit Often

**Do NOT accumulate large uncommitted changes.**
- Commit after completing each logical unit of work
- A "logical unit" = one entity added, one diagram updated, one decision documented

### 3. Human + Machine Readable

All content must be:
- **Human readable**: Clear prose, good formatting, visual diagrams
- **Machine parseable**: Structured frontmatter, consistent relationships, predictable locations

**Format choices:**
- Markdown with YAML frontmatter for entities
- PlantUML or Mermaid for diagrams
- YAML for configuration and reference data

### 4. Everything Has a Place

Don't create files randomly. Every piece of content has a designated location based on its type. See the structure below.

---

## Knowledge Base Structure

```
<domain-name>/
|-- domain-knowledge/
|   |-- meta/                      # Configuration and guidelines
|   |   |-- entity-types.yaml      # What entity types exist
|   |   +-- relationship-types.yaml # How things connect
|   |
|   |-- entities/                  # Domain entities (13 types)
|   |   |-- offerings/             # Products and services delivered
|   |   |-- capabilities/          # Business capabilities
|   |   |-- teams/                 # Product teams
|   |   |-- personas/              # User roles
|   |   |-- processes/             # Business processes and workflows
|   |   |-- business-events/       # Domain events that trigger actions
|   |   |-- systems/               # Software systems
|   |   |-- apis/                  # API documentation
|   |   |-- data-models/           # Data structures and schemas
|   |   |-- data-products/         # Curated data assets for consumption
|   |   |-- platforms/             # Infrastructure and platform services
|   |   |-- jargon-business/       # Business terminology
|   |   +-- jargon-tech/           # Technical terminology
|   |
|   |-- diagrams/                  # Visual representations
|   |   |-- architecture/          # Architecture views
|   |   |-- sequences/             # Sequence diagrams
|   |   |-- lifecycles/            # State machine diagrams
|   |   +-- processes/             # Process diagrams
|   |
|   +-- decisions/                 # Architecture decisions
|       |-- active/                # Problems being worked on
|       +-- resolved/              # Completed ADRs
|
|-- sandbox/                       # Problem exploration (NOT production knowledge)
|   +-- <problem-name>/            # One folder per active problem
|
+-- ddc-cycle-logs/                # Structured logs of each DDC cycle
```

---

## How to Navigate (For AI Agents)

When you receive a problem or question, follow this navigation pattern:

### Step 1: Identify the Problem Type
- **Integration question?** -> Start with `entities/systems/`, `entities/apis/`, and `diagrams/sequences/`
- **Data question?** -> Start with `entities/data-models/` and `entities/data-products/`
- **Terminology confusion?** -> Start with `entities/jargon-business/` or `entities/jargon-tech/`
- **Process question?** -> Start with `entities/processes/` and `entities/business-events/`
- **Infrastructure question?** -> Start with `entities/platforms/` and `entities/systems/`
- **Product/offering question?** -> Start with `entities/offerings/` and `entities/capabilities/`
- **Architecture decision?** -> Check `decisions/` for similar past decisions

### Step 2: Gather Context
Follow relationships in entity frontmatter:
- `related_systems` -> Read those system files
- `implements_capability` -> Understand the business capability
- `depends_on` -> Understand dependencies

### Step 3: Look for Patterns
- Check `decisions/resolved/` for similar problems
- Check for reusable integration or design patterns

### Step 4: Propose Solution
- Reference specific entities and diagrams
- Explain reasoning based on domain knowledge
- Identify gaps if information is missing

---

## How to Add Content (For AI Agents)

### Before Adding Anything
1. Check if similar content already exists
2. Identify the correct location based on content type
3. Use the appropriate format (see below)

### Entity File Format
```yaml
---
type: <entity-type-id>
id: <unique-kebab-case-id>
name: <Human Readable Name>
description: <One-line description>
status: active | deprecated | planned
related_systems: [system-id-1, system-id-2]
implements_capability: capability-id
depends_on: [entity-id-1, entity-id-2]
---

# Human Readable Name

## Overview
<Prose description>

## Details
<More details, diagrams, etc.>
```

### Decision Record Format
```yaml
---
type: decision
id: <decision-id>
name: <Decision Title>
status: active | resolved
date_opened: YYYY-MM-DD
date_resolved: YYYY-MM-DD (if resolved)
participants: [person1, person2]
related_systems: [system-id-1]
---

# Decision Title

## Context
<What is the situation?>

## Problem
<What needs to be decided?>

## Options Considered
1. Option A - description
2. Option B - description

## Decision
<What was decided and why?>

## Consequences
<What are the implications?>
```

---

## Agent Architecture (North Star)

The goal is to create specialized sub-agents that can perform domain-specific cognitive work:

| Agent | Role | Key Skills |
|-------|------|------------|
| `ta-agent` | Technology Architect | Integration design, system reasoning, ADR drafting |
| `po-agent` | Product Owner | Requirements analysis, journey mapping, prioritization |
| `se-agent` | Senior Engineer | Code review, solution design, technical mentorship |
| `da-agent` | Data Architect | Data model design, flow analysis, governance |
| `sa-agent` | Security Architect | Security review, compliance checking, threat modeling |

Each agent has:

1. **Learning Path** — ordered reading list to build domain context
2. **Skills** — specific capabilities the agent can perform
3. **Reasoning Patterns** — how to approach different problem types

---

## Important: Sandbox vs Production Knowledge

- **Production knowledge** (`entities/`, `diagrams/`, etc.): Curated, validated, navigable
- **Sandbox** (`sandbox/`): Experiments, work-in-progress, problem exploration

Never mix them. Sandbox content may be incomplete or incorrect. It's for exploration.