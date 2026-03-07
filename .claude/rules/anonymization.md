# Anonymization Rules

Apply when writing ANY file in `domain-knowledge/` or `ddc-cycle-logs/`.

## Hard Rule

All content in `domain-knowledge/` and `ddc-cycle-logs/` is PUBLIC. Real company names, system names, team names, and internal terminology MUST NOT appear.

## Before Every Write

1. Check `.private/anonymization-map.yaml` for the real-to-public name mapping
2. Scan your content for ANY real name from the map before writing
3. Replace every occurrence with the anonymized equivalent
4. If you encounter a real-world term NOT in the map, ask the user for the anonymized name BEFORE writing

## What Gets Anonymized

- Company name (e.g., the real company behind "RetailCo")
- System names (internal codenames, acronyms)
- Team names (internal org names)
- Platform names (vendor products used internally)
- Market codes (country/region identifiers)
- Jargon (internal acronyms and shorthand)

## Common Mistakes

- Forgetting to anonymize in cycle logs (they're public too, not just entities)
- Using real acronyms in parenthetical references like "WMS (REALNAME)"
- Leaking real names in "Human Answers" sections of cycle logs when quoting user input
- Short acronyms slipping through — check the map even for 3-4 letter terms

## The Hook Catches Most Leaks

A PreToolUse hook (`anonymization-guard.sh`) blocks writes containing real names 3+ chars. Only 2-char market codes (`NL`, `SE`) bypass the hook — manually check those.