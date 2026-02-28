# CLAUDE.md - DDC Knowledge Base

<!-- CUSTOMIZE: Replace this description with your domain -->
> This is a DDC knowledge base for **[YOUR DOMAIN NAME]**.

## What This Is

<!-- CUSTOMIZE: Describe what this knowledge base covers -->
This folder is a domain knowledge base built using the DDC (Demand-Driven Context) methodology. It grows through problem-driven curation: an agent tries to answer a domain question, identifies what's missing, and curates structured knowledge from human input.

## Your Workflow (DDC Agent Behavior)

When the user asks a domain question, follow these steps IN ORDER:

### Step 1: Search the Knowledge Base

Look for relevant entity files in `domain-knowledge/entities/`. Check all subfolders:
- `entities/jargon-business/` for terminology
- `entities/systems/` for system descriptions
- `entities/capabilities/` for business capabilities
- `entities/data-models/` for data structures
- `entities/teams/` for team ownership
- `entities/apis/` for API contracts
- `entities/personas/` for user roles

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
| `jargon-business` | `entities/jargon-business/` | Business terminology and concepts |
| `system` | `entities/systems/` | Software systems and services |
| `capability` | `entities/capabilities/` | Business capabilities |
| `data-model` | `entities/data-models/` | Core data structures |
| `team` | `entities/teams/` | Organizational units |
| `api` | `entities/apis/` | API contracts |
| `persona` | `entities/personas/` | User roles |

<!-- CUSTOMIZE: Add domain-specific entity types if needed -->

## Important Rules

- NEVER make up domain-specific information. If you don't have it in the knowledge base, say so.
- ALWAYS search the knowledge base FIRST before answering domain questions.
- When curating, create SEPARATE files for each entity — don't combine multiple entities into one file.
- Use kebab-case for file names and IDs.
- Keep descriptions concise — minimum viable context, not encyclopedic.

<!-- CUSTOMIZE: Add domain-specific rules or constraints below -->
