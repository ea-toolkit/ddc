---
name: ddc-cycle
description: Run a full DDC (Demand-Driven Context) cycle — give the agent a problem, let it fail, fill gaps, curate entities.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

# DDC Cycle

Execute a full Demand-Driven Context cycle for: $ARGUMENTS

## Step 1: Identify the Knowledge Base

Find the nearest `domain-knowledge/` directory by searching upward from the current working directory. If multiple exist, ask which one to use.

## Step 2: RED Phase — Attempt and Fail

1. Search `domain-knowledge/entities/` for any existing knowledge relevant to the problem
2. Read any matching entity files and assess coverage
3. If the knowledge base has insufficient context to answer accurately:
   - Say: "I searched the knowledge base but don't have enough domain-specific context."
   - Produce a **Demand Checklist** organized by type:
     - Terminology needed (→ jargon-business or jargon-tech)
     - Systems needed (→ systems)
     - Business logic needed (→ capabilities or data-models)
     - Data structures needed (→ data-models)
   - Ask the user to provide this information

## Step 3: GREEN Phase — Curate from Human Input

When the user provides rough notes or answers:

1. Parse the unstructured input into discrete concepts
2. For each concept, create a typed entity file in the correct folder:
   ```
   domain-knowledge/entities/<type>/<kebab-case-id>.md
   ```
3. Use this format:
   ```yaml
   ---
   type: <entity-type>
   id: <kebab-case-id>
   name: <Display Name>
   description: <One-line description>
   status: active
   related_systems: [ids]
   ---

   # Display Name

   ## Overview
   <2-3 sentences>

   ## Details
   <Structured details>
   ```
4. Confirm: "I've curated N entities: [list with file paths]"

## Step 4: Answer the Original Problem

Re-read the entities you just created and answer the original problem using SPECIFIC information — system names, codes, SLAs, ownership, relationships.

## Step 5: Log the Cycle

Create a cycle log entry at `ddc-cycle-logs/cycle-NNN.md` with:
- Problem input
- Demand checklist (what was missing)
- Entities created
- How the answer improved