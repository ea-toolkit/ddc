# Anonymization Rules

Apply when writing ANY file in `domain-knowledge/` or `ddc-cycle-logs/`.

## Rule

RetailCo is an anonymized domain. All entities use anonymized names (RetailCo, ServiceOrderManager, ExternalRoutingProvider, etc.). When adding new entities or cycle logs, use only the anonymized names from the knowledge base. Do not introduce real company names, product names, or internal terminology.

## When Adding New Content

- Use names consistent with existing entities in the knowledge base
- If you need to reference a new system, team, or term not yet in the KB, ask the user for the appropriate anonymized name
- Market references should use the format `market-xx` (e.g., market-nl, market-cn)

## Common Mistakes

- Using real acronyms in parenthetical references like "WMS (REALNAME)"
- Leaking real names in "Human Answers" sections of cycle logs when quoting user input
- Short acronyms slipping through — check existing entity names for consistency