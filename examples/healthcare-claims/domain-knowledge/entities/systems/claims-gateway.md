---
type: system
id: claims-gateway
name: Claims Gateway
description: Single entry point for all claim submissions, handling format validation, duplicate detection, and routing.
status: active
owner_team: claims-operations
make_or_buy: make
implements_capability: claims-processing
related_systems: [rules-engine, eligibility-service, fraud-detection, pre-auth-service]
---

# Claims Gateway

## Overview

Single entry point for all claim submissions. Accepts EDI 837 (professional and institutional), API (JSON), and paper/OCR submissions. Validates format, detects duplicates, and routes claims to the processing pipeline.

## Responsibilities

- Accept and parse EDI 837 professional (CMS-1500) and institutional (UB-04) claim formats
- Accept JSON-format claims via REST API
- Process paper claims via OCR pipeline
- Validate claim format and required fields
- Detect and reject duplicate submissions
- Route validated claims to the rules engine for adjudication
- Route high-risk claims to fraud detection for pre-payment scoring
- Query pre-auth service for authorization status on auth-required services

## Key Decisions / Logic

- Professional claims (CMS-1500) are processed real-time with a 30-second SLA
- Institutional claims (UB-04) are processed in batch with a 4-hour window
- Duplicate detection uses a composite key of member ID, provider NPI, date of service, and procedure codes
- Claims with fraud score >0.82 at intake are held for SIU review before proceeding

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Rules Engine | Outbound | Sends validated claims for adjudication |
| Eligibility Service | Outbound | Verifies member eligibility at intake |
| Fraud Detection | Outbound | Sends high-risk claims for pre-payment scoring |
| Pre-Auth Service | Outbound | Queries authorization status for auth-required services |
