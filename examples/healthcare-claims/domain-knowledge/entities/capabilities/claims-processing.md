---
type: capability
id: claims-processing
name: Claims Processing
description: End-to-end claim lifecycle from submission through adjudication to payment.
related_capabilities: [payment-processing, compliance, utilization-management]
child_capabilities: [claim-intake, claim-validation, claim-adjudication, claim-appeal]
---

# Claims Processing

## Overview

End-to-end claim lifecycle from submission through adjudication to payment. Handles professional, institutional, dental, and pharmacy claim types across multiple submission channels (EDI, API, paper/OCR).

## Sub-Capabilities

- **Claim Intake** — Receiving and parsing claim submissions from all channels
- **Claim Validation** — Format validation, duplicate detection, and eligibility verification
- **Claim Adjudication** — Evaluating claims against benefit rules, contracts, and policies to determine disposition
- **Claim Appeal** — Processing member and provider appeals of denied or underpaid claims

## Key Systems

- Claims Gateway — intake, validation, and routing
- Rules Engine — adjudication rule execution
- Pre-Auth Service — authorization validation during adjudication
