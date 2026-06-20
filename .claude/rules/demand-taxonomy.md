# Demand Classification Taxonomy

Binding definitions for the five quality classes used when classifying ticket demands against a knowledge corpus. Applies to the IEEE experiment extractions and all DDC cycle logs.

## CLEAN
The corpus documents this concept correctly and completely. An engineer could answer the demand from the docs alone.

## STALE
The corpus mentions the concept, but the information is outdated, contradicts current ticket reality, or uses old naming. The doc actively misleads.

## INCOMPLETE
The corpus partially covers the concept. Useful context is present, but key specifics are missing. Cannot answer fully from docs alone.

## MISSING
Concept is **absent from the corpus entirely** AND **not captured elsewhere** the team would reach for. Nobody has written it down. Lives only in individual heads.

## TRIBAL
Concept is **not in the corpus**, but **IS captured somewhere non-canonical** — ticket comments, Slack, meeting notes, chat threads, code comments. Retrievable if you know where to look or who to ask.

## The MISSING vs TRIBAL line

Ask: **"Where does this knowledge actually live?"**

- Nobody has written it down at all → **MISSING**
- Written down somewhere other than the canonical KB → **TRIBAL**

## Why separate them
MISSING and TRIBAL imply different remediation strategies:
- **MISSING** → new documentation needed (creation)
- **TRIBAL** → capture + curation needed (migration from non-canonical source)

Collapsing them would hide this distinction.
