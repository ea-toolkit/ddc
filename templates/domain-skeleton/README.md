# Domain Skeleton Template

Copy this directory structure to start a new DDC knowledge base for your domain.

## Quick Start

1. Copy this entire directory to your new repo
2. Copy `entity-types.yaml` and `relationship-types.yaml` from `ddc-framework/meta/` into `domain-knowledge/meta/`
3. Copy `CLAUDE.md` from `ddc-framework/` and customize the domain scope section
4. Start your first DDC cycle: create a problem in `sandbox/`

## Directory Structure

```
your-domain/
|-- CLAUDE.md                      # Agent guidance (customize from template)
|-- domain-knowledge/
|   |-- meta/                      # Entity and relationship type definitions
|   |-- entities/
|   |   |-- capabilities/
|   |   |-- systems/
|   |   |-- teams/
|   |   |-- apis/
|   |   |-- data-models/
|   |   |-- personas/
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
