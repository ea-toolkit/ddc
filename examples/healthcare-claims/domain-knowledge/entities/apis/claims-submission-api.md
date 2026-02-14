---
type: api
id: claims-submission-api
name: Claims Submission API
description: REST API for submitting claims in EDI 837, JSON, and document upload formats.
owner_system: claims-gateway
related_systems: [rules-engine, eligibility-service]
---

# Claims Submission API

## Overview

REST API for submitting healthcare claims. Accepts EDI 837 (professional and institutional), JSON format, and document uploads for paper claims. Used by provider clearinghouses, provider portals, and internal systems.

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /claims | Submit a single claim (EDI 837 or JSON) |
| GET | /claims/{id} | Get claim status and details |
| GET | /claims/{id}/eob | Get EOB for a processed claim |
| POST | /claims/batch | Submit a batch of claims (EDI 837 file) |

## Usage Patterns

Providers typically submit claims through EDI clearinghouses using the batch endpoint with EDI 837 files. The member portal uses the single-claim endpoint for OON claim submissions in JSON format. Internal systems use JSON format for programmatic claim creation. The status endpoint is polled by provider portals and the member portal to display processing updates.
