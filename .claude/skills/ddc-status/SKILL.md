---
name: ddc-status
description: Show the current state of a DDC knowledge base — entity counts, coverage, recent changes.
allowed-tools: Read, Glob, Grep, Bash
---

# DDC Knowledge Base Status

Report on the current state of the DDC knowledge base.

## What to Report

1. **Entity counts by type** — count .md files (excluding .gitkeep) in each entities/ subfolder:
   - !`find . -path "*/domain-knowledge/entities/*/*.md" | sed 's|.*/entities/||' | cut -d'/' -f1 | sort | uniq -c | sort -rn`

2. **Total entities**: !`find . -path "*/domain-knowledge/entities/*/*.md" | wc -l`

3. **Recent changes**: !`git log --oneline -10 2>/dev/null || echo "not a git repo"`

4. **Cycle logs**: !`ls ddc-cycle-logs/ 2>/dev/null || find . -name "cycle-*.md" 2>/dev/null || echo "none found"`

5. **Empty areas** — which entity type folders have zero entities? These are knowledge gaps.

6. **Relationship density** — how many entities reference other entities in their frontmatter?

## Format

Present as a concise dashboard. Highlight areas that need attention (empty folders, low coverage).