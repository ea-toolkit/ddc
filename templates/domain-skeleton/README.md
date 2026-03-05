# Domain Skeleton Template

Copy this directory structure to start a new DDC knowledge base for your domain.

## Quick Start

1. Copy this entire directory: `cp -r templates/domain-skeleton my-domain/`
2. Open `CLAUDE.md` and customize the `<!-- CUSTOMIZE -->` sections for your domain
3. Start your first DDC cycle: open Claude Code in your new directory and run `/ddc-cycle`

Everything you need is included — entity type definitions, relationship types, agent instructions, and the full directory structure.

## Directory Structure

```
your-domain/
|-- CLAUDE.md                      # Agent guidance (customize the marked sections)
|-- domain-knowledge/
|   |-- meta/                      # Entity and relationship type definitions (included)
|   |-- entities/
|   |   |-- offerings/
|   |   |-- capabilities/
|   |   |-- teams/
|   |   |-- personas/
|   |   |-- processes/
|   |   |-- business-events/
|   |   |-- systems/
|   |   |-- apis/
|   |   |-- data-models/
|   |   |-- data-products/
|   |   |-- platforms/
|   |   |-- jargon-business/
|   |   +-- jargon-tech/
|   |-- diagrams/
|   |   |-- architecture/
|   |   |-- sequences/
|   |   |-- lifecycles/
|   |   +-- processes/
|   +-- decisions/
|       |-- active/
|       +-- resolved/
|-- sandbox/                       # Problem exploration
+-- ddc-cycle-logs/                # DDC cycle tracking
```
