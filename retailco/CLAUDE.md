# CLAUDE.md - DDC Knowledge Base

> This is a DDC knowledge base for **RetailCo** — a synthetic example domain for a large-scale retail operation.

## What This Is

This folder is a domain knowledge base for RetailCo, built using the DDC (Demand-Driven Context) methodology. It covers RetailCo's enterprise architecture — systems, capabilities, data models, integrations, and domain terminology across retail, supply chain, e-commerce, and store operations.

The knowledge base grows through problem-driven curation: an agent tries to answer a domain question, identifies what's missing, and curates structured knowledge from human input.

## Your Workflow (DDC Agent Behavior)

When the user asks a domain question, follow these steps IN ORDER:

### Step 1: Search the Knowledge Base

Look for relevant entity files in `domain-knowledge/entities/`. Check all subfolders:
- `entities/offerings/` for products and services
- `entities/capabilities/` for business capabilities
- `entities/teams/` for team ownership
- `entities/personas/` for user roles
- `entities/processes/` for business processes
- `entities/business-events/` for domain events
- `entities/systems/` for system descriptions
- `entities/apis/` for API contracts
- `entities/data-models/` for data structures
- `entities/data-products/` for curated data assets
- `entities/platforms/` for infrastructure
- `entities/jargon-business/` for terminology
- `entities/jargon-tech/` for technical terminology

### Step 2: If Knowledge is Insufficient — Create a Demand Checklist

If you cannot find enough structured domain knowledge to answer the question accurately, you MUST:

1. Say: **"I searched the knowledge base but don't have enough domain-specific context to answer this accurately."**
2. Explain what you found (if anything) and what's missing
3. Create a **Demand Checklist** — a structured list of exactly what information you need:

```
## Demand Checklist

### Terminology I Need Defined
- [ ] Term 1 — what does this mean in YOUR domain?

### Systems I Need Documented
- [ ] System name — what does it do? who owns it? what does it integrate with?

### Business Logic I Need Explained
- [ ] Rule/process — how exactly does this work?

### Data I Need Described
- [ ] Data model — what are the key fields and relationships?
```

4. Ask the user to provide this information

### Step 3: When the User Provides Information — Curate It

When the user provides answers (even rough, unstructured notes), you MUST:

1. **Structure the information as typed entity files** following the meta-model
2. Each entity file goes in the correct folder based on its type
3. Use this format for every entity file:

```yaml
---
type: <entity-type>
id: <kebab-case-id>
name: <Display Name>
description: <One-line description>
status: active
related_systems: [id-1, id-2]  # if applicable
---

# Display Name

## Overview
<2-3 sentence description>

## Details
<Structured details from the user's input>
```

4. Create the files in the knowledge base under `domain-knowledge/entities/<type>/`
5. Confirm what you created: "I've curated N entities from your input: [list them]"

### Step 4: Answer the Question

Now re-read the entity files you just created and answer the original question using SPECIFIC information from the knowledge base — system names, decision codes, SLAs, ownership, relationships.

## Entity Type Reference

| Type | Folder | Use For |
|------|--------|---------|
| `offering` | `entities/offerings/` | Products and services delivered to customers |
| `capability` | `entities/capabilities/` | Business capabilities |
| `team` | `entities/teams/` | Organizational units |
| `persona` | `entities/personas/` | User roles |
| `process` | `entities/processes/` | Business processes and workflows |
| `business-event` | `entities/business-events/` | Domain events that trigger actions |
| `system` | `entities/systems/` | Software systems and services |
| `api` | `entities/apis/` | API contracts |
| `data-model` | `entities/data-models/` | Core data structures |
| `data-product` | `entities/data-products/` | Curated data assets for consumption |
| `platform` | `entities/platforms/` | Infrastructure and platform services |
| `jargon-business` | `entities/jargon-business/` | Business terminology and concepts |
| `jargon-tech` | `entities/jargon-tech/` | Technical terminology |
| `decision` | `decisions/` | Architecture Decision Records |

<!-- CUSTOMIZE: Add domain-specific entity types if needed -->

## Domain-Specific Rules

- RetailCo is a synthetic example domain representing a large-scale retail operation. All system names, team names, and terminology are fictional, designed to reflect realistic enterprise architecture patterns.
- When documenting systems, always capture: make_or_buy status, owning team, key integrations, and the business capability it implements.
- Retail domain has distinct areas: **store operations**, **e-commerce**, **supply chain**, **range & product**, **customer engagement**, and **corporate functions**. Use these as top-level capability groupings.
- All entity descriptions should be precise enough for an enterprise architect to reason about integration design.

## Important Rules

- NEVER make up domain-specific information. If you don't have it in the knowledge base, say so.
- ALWAYS search the knowledge base FIRST before answering domain questions.
- When curating, create SEPARATE files for each entity — don't combine multiple entities into one file.
- Use kebab-case for file names and IDs.
- Keep descriptions concise — minimum viable context, not encyclopedic.
