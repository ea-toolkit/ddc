---
type: jargon-business
id: deductible
name: Deductible
description: The fixed dollar amount a member must pay out-of-pocket for covered services before the health plan begins paying its share.
related_terms: [copay, adjudication, allowed-amount, eob]
---

# Deductible

## Definition

Annual amount a member must pay for covered healthcare services before insurance starts paying. Resets annually. Applies to the allowed amount, not the billed amount.

## Context

Deductibles are tracked as accumulators in the eligibility system. During adjudication, the rules engine checks how much deductible has been met. If unmet, the allowed amount (or remaining portion) is applied to member responsibility. Preventive care is typically exempt under ACA.

Accumulators are updated transactionally with soft reservations for concurrent claims to prevent over-application of deductible when multiple claims process simultaneously.

## Example

Member has $1,500 annual deductible. January lab test has $200 allowed amount. Deductible unmet, so member pays full $200. Accumulator moves to $200/$1,500. After $1,500 in charges, plan begins paying its share.
