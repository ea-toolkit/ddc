---
globs: "**/ddc-cycle-logs/**"
---

# DDC Cycle Log Format

## File naming
- Pattern: `<NNN>-<problem-name>.md` (e.g., `001-vendor-integration-questions.md`)
- Cycle numbers are zero-padded to 3 digits, sequential, never reused

## Frontmatter (required)
- `cycle_id`: zero-padded string ("001", "042")
- `problem_name`: short description matching filename
- `date_started`, `date_completed`: YYYY-MM-DD
- `time_spent_minutes`: integer — total time including agent + human + curation
- `entities_created`, `entities_updated`: integer counts — feeds the coverage curve
- `domain`: the domain name (e.g., "retailco")

## Required sections (in order)
1. **Problem Input** — what triggered this cycle
2. **Agent Before (Zero Context)** — what the agent got wrong without domain context
3. **Information Checklist** — gaps the agent identified, organized by type
4. **Human Answers** — domain expert's responses to the checklist
5. **Entities Curated** — table of entities created/updated (Entity, Type, Action, File)
6. **Agent After (With Context)** — improved output after curation
7. **Human Review** — expert validation, corrections needed, remaining gaps

## Rules
- Log every cycle, even quick ones. Data is irreplaceable for the research.
- Be honest about failures. If the agent still got it wrong, say why.
- The "Entities Curated" table must list actual file paths, not just names.