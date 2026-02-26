---
name: ddc-entity
description: Add a single entity to the DDC knowledge base from a description or rough notes.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Add DDC Entity

Create a structured entity from: $ARGUMENTS

## Steps

1. **Check for duplicates** — search `domain-knowledge/entities/` for existing entities with similar names or IDs
2. **Determine entity type** — classify as one of: jargon-business, jargon-tech, system, capability, data-model, team, api, persona
3. **Determine file path** — `domain-knowledge/entities/<type>/<kebab-case-id>.md`
4. **Create the entity file** with YAML frontmatter:
   ```yaml
   ---
   type: <entity-type>
   id: <kebab-case-id>
   name: <Display Name>
   description: <One-line description>
   status: active
   related_systems: [ids]  # if applicable
   implements_capability: id  # if applicable
   depends_on: [ids]  # if applicable
   ---

   # Display Name

   ## Overview
   <2-3 sentence description>

   ## Details
   <Structured details>
   ```
5. **Cross-reference** — if the new entity relates to existing entities, update those entities' frontmatter to include the new relationship
6. **Confirm** — show the file path and a summary of what was created