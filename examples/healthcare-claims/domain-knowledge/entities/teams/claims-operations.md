---
type: team
id: claims-operations
name: Claims Operations
description: Owns the end-to-end claims processing pipeline including intake, adjudication, payment, fraud prevention, and pre-authorization.
owns_systems: [claims-gateway, rules-engine, payment-engine, fraud-detection, pre-auth-service]
implements_capability: [claims-processing, payment-processing, compliance]
---

# Claims Operations

## Overview

Owns the end-to-end claims processing pipeline: intake, adjudication rules, payment, fraud prevention, and pre-authorization. Responsible for claims processing accuracy, timeliness, and regulatory compliance.

## Responsibilities

- Manage claim intake and validation processes
- Maintain and configure adjudication rules in the rules engine
- Oversee payment processing and reconciliation
- Operate fraud detection models and manage SIU workflow
- Manage prior authorization processing and clinical review
- Monitor claims processing SLAs and auto-adjudication rates
- Handle claim appeals and disputes

## Systems Owned

- **Claims Gateway** — claim intake, validation, and routing
- **Rules Engine** — adjudication rule execution (vendor product)
- **Payment Engine** — payment processing and remittance
- **Fraud Detection** — FWA detection and SIU support
- **Pre-Auth Service** — prior authorization lifecycle management
