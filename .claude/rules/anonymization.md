# Naming Consistency Rules

Apply when writing ANY file in `domain-knowledge/` or `ddc-cycle-logs/`.

## Rule

RetailCo is a synthetic example domain. All entities use fictional names (RetailCo, ServiceOrderManager, ExternalRoutingProvider, etc.). When adding new entities or cycle logs, use only the established fictional names from the knowledge base. Do not introduce names from external sources that break the synthetic naming scheme.

## When Adding New Content

- Use names consistent with existing entities in the knowledge base
- If you need to reference a new system, team, or term not yet in the KB, ask the user for the appropriate fictional name
- Market references should use the format `market-xx` (e.g., market-nl, market-cn)

## Common Mistakes

- Introducing external names in parenthetical references like "WMS (EXTERNALNAME)"
- Leaking external names in "Human Answers" sections of cycle logs when quoting user input
- Short acronyms slipping through — check existing entity names for consistency
