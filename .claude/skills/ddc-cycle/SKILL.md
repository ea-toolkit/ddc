---
name: ddc-cycle
description: Run a full DDC (Demand-Driven Context) cycle — give the agent a problem, let it fail, fill gaps, curate entities.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
argument-hint: <problem description OR path to source document>
---

# DDC Cycle

Execute a full Demand-Driven Context cycle for: $ARGUMENTS

## Step 0: Setup

1. Find the nearest `domain-knowledge/` directory. If multiple exist, ask which one to use.
2. Determine the next cycle number by checking existing files in `ddc-cycle-logs/`.
3. Check if `.private/anonymization-map.yaml` exists. If yes, load it — all entity names, system names, and domain-specific terms MUST be mapped through it before writing any public entity files.

## Step 1: Source Document (optional)

If the user provides a path to a source document (incident report, deep-dive analysis, design doc):
1. Read the document
2. Extract the core architectural/domain problem from it
3. Present the extracted problem to the user for confirmation before proceeding
4. The document content becomes the "human knowledge source" for Step 3

If no source document is provided, use the problem description from $ARGUMENTS directly.

## Step 2: RED Phase — Attempt and Fail

1. Search `domain-knowledge/entities/` for any existing knowledge relevant to the problem
2. Read any matching entity files and assess coverage
3. Attempt to answer the problem using ONLY what exists in the KB
4. Produce a **Demand Checklist** — what you need to know but don't:
   - Terminology needed (-> jargon-business or jargon-tech)
   - Systems/platforms needed (-> systems, platforms)
   - Processes/events needed (-> processes, business-events)
   - Data structures needed (-> data-models, data-products)
   - Business logic needed (-> capabilities, offerings)
   - People/teams needed (-> teams, personas)
5. Rate your confidence in your answer (1-5) and explain what's missing
6. Ask the user: "Should I proceed with curation? Point me to a source document, answer directly, or both."

## Step 3: GREEN Phase — Curate Entities

From the user's input (direct answers, source documents, or both):

1. Parse the information into discrete concepts
2. **Apply anonymization**: If `.private/anonymization-map.yaml` exists, replace all mapped terms before writing files. If you encounter a new real-world term not in the map, ask the user for the anonymized name and note it for adding to the map.
3. For each concept, create a typed entity file:
   ```
   domain-knowledge/entities/<type>/<kebab-case-id>.md
   ```
4. Use the standard entity format (see entity-format rule)
5. Wire up relationships — set `related_systems`, `depends_on`, etc. to connect new entities to existing ones
6. Confirm: "I've curated N entities: [list with file paths]"

## Step 4: Answer the Original Problem (AFTER)

Re-read ALL relevant entities (existing + newly created) and re-answer the problem.
- Use SPECIFIC entity names, IDs, and relationships
- Rate your confidence again (1-5)
- Highlight what improved vs the RED phase answer

## Step 5: Human Review

Ask the user to review:
- "Is my answer correct now? Score 1-5."
- "Anything I'm still getting wrong?"
- "Any entities need correction?"

Apply any corrections to entity files immediately.

## Step 6: Log the Cycle

Create a cycle log at `ddc-cycle-logs/<NNN>-<problem-slug>.md` using the cycle-log-format rule.

Include these metrics in the frontmatter:
- `entities_created`: count of new entity files
- `entities_updated`: count of modified entity files
- `entities_reused`: count of existing entities that were relevant and used
- `confidence_before`: your RED phase confidence (1-5)
- `confidence_after`: your GREEN phase confidence (1-5)
- `human_score`: the user's review score (1-5)
- `checklist_size`: number of items in the demand checklist