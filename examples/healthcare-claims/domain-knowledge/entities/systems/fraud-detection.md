---
type: system
id: fraud-detection
name: Fraud Detection
description: ML-based fraud, waste, and abuse detection system performing pre-payment scoring and post-payment pattern analysis.
status: active
owner_team: claims-operations
make_or_buy: make
implements_capability: compliance
related_systems: [claims-gateway, rules-engine, payment-engine, provider-directory, eligibility-service]
---

# Fraud Detection

## Overview

ML-based fraud, waste, and abuse (FWA) detection system. Performs pre-payment scoring (before adjudication) and post-payment analysis (historical patterns). Models detect aberrant billing, upcoding, unbundling, and phantom billing.

## Responsibilities

- Score incoming claims for fraud risk at intake (pre-payment)
- Analyze historical claim patterns for post-payment fraud detection
- Maintain and retrain ML models for fraud detection
- Generate alerts for Special Investigations Unit (SIU) review
- Issue payment holds for suspected fraudulent claims
- Track false positive rates and model performance
- Support provider audit case management

## Key Decisions / Logic

- Pre-payment fraud score >0.82 triggers automatic hold for SIU review
- Score between 0.65 and 0.82 proceeds to adjudication with a post-payment analysis tag
- ML models are retrained monthly on updated claim and investigation data
- Target false positive rate is below 8%

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Claims Gateway | Inbound | Receives claims for pre-payment fraud scoring |
| Rules Engine | Inbound | Receives adjudication data for post-payment analysis |
| Payment Engine | Outbound | Issues payment holds and releases |
| Provider Directory | Inbound | Retrieves provider data for pattern analysis |
| Eligibility Service | Inbound | Retrieves member data for fraud pattern detection |
