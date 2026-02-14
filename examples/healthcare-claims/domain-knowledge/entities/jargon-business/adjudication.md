---
type: jargon-business
id: adjudication
name: Adjudication
description: The process of evaluating a submitted claim against policy rules, provider contracts, and benefit limits to determine the payout amount.
related_terms: [pre-authorization, deductible, copay, allowed-amount, eob]
---

# Adjudication

## Definition

The process of evaluating a submitted healthcare claim against the member's benefit plan rules, provider contract terms, fee schedules, and regulatory requirements to determine the correct payment amount and claim disposition (pay, deny, or pend).

## Context

Adjudication is the core processing step in the claims lifecycle. The rules engine checks: member eligibility, provider network status, pre-authorization validation, benefit plan rules (deductible, copay, coinsurance), coordination of benefits, and medical policy edits.

Pre-authorization lookup is mandatory before adjudication because the rules engine uses the pre-auth decision code to determine which cost-sharing branch to execute. The three-way branching logic works as follows: if approved, apply in-network cost-sharing rules; if denied, auto-deny the claim; if not required, skip pre-auth validation and proceed to standard adjudication.

## Example

Member visits in-network physician. Claim submitted with procedure code 99213. Rules engine checks eligibility (yes), network status (in-network), pre-auth (not required for office visits), copay ($30), deductible (already met). Result: pay provider the allowed amount minus $30 copay.
