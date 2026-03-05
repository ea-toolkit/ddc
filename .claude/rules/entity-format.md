---
globs: "**/domain-knowledge/entities/**"
---

# DDC Entity Format

## Frontmatter (required fields)
- `type`: must match the parent directory name (file in `systems/` → `type: system`)
- `id`: kebab-case, unique within type, must match filename without `.md`
- `name`: human-readable display name
- `description`: one-line summary
- `status`: one of `active`, `deprecated`, `planned`

## Relationships (in frontmatter, flat fields)
- `related_systems: [system-id-1, system-id-2]`
- `implements_capability: capability-id`
- `depends_on: [entity-id-1, entity-id-2]`
- `owned_by: team-id`
- Values are entity IDs (kebab-case), never display names
- Only add relationships you are confident about — do not fabricate connections

## Body (markdown)
- One concept per file. If you're writing more than ~150 lines, split or trim.
- Start with `## Overview` (2-3 sentences), then `## Details`.
- Skip sections that add no value — empty sections are worse than missing ones.
- Reference other entities by their `id`, not by prose description.
- No duplicate information — if it's documented in another entity, link to it.