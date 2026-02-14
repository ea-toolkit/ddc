---
type: api
id: eligibility-check-api
name: Eligibility Check API
description: Real-time eligibility verification API used by providers, claims processing, and pre-auth service.
owner_system: eligibility-service
related_systems: [claims-gateway, rules-engine, pre-auth-service, member-portal]
---

# Eligibility Check API

## Overview

Real-time eligibility verification API. Used by providers for point-of-service eligibility checks, by the claims gateway at intake, by the rules engine during adjudication, and by the pre-auth service for authorization requests.

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /eligibility/{memberId} | Check current eligibility and benefits |
| GET | /eligibility/{memberId}/asof/{date} | Point-in-time eligibility lookup |
| GET | /eligibility/{memberId}/accumulators | Get benefit balances (deductible, OOP max) |
| POST | /eligibility/batch | Batch eligibility verification (EDI 270) |

## Usage Patterns

The claims gateway calls the current eligibility endpoint at intake to verify member coverage. The rules engine calls the point-in-time endpoint during adjudication using the claim's date of service. Providers use the current eligibility endpoint for real-time verification before delivering services. The batch endpoint processes EDI 270 eligibility inquiry files from clearinghouses.
