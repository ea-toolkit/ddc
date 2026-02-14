---
type: data-model
id: provider
name: Provider
description: A healthcare professional or facility contracted to deliver services to plan members.
related_systems: [provider-directory, rules-engine]
---

# Provider

## Overview

A healthcare professional or facility contracted to deliver services to plan members. Provider records include credentials, specialties, practice locations, network participation, and contract terms.

## Key Fields

| Field | Type | Description |
|-------|------|-------------|
| provider_npi | string | National Provider Identifier (unique) |
| tax_id | string | Tax Identification Number (TIN) |
| provider_name | string | Individual or organization name |
| provider_type | enum | Individual or organization |
| specialty_codes | list | Medical specialty codes |
| practice_locations | list | Addresses of practice locations |
| network_status_by_plan | map | Network participation status per plan |
| credential_status | enum | Current credentialing status |
| contract_effective_date | date | Contract start date |
| fee_schedule_id | string | Reference to contracted fee schedule |

## Relationships

- Submits **Claims** for services rendered
- Has a **Contract** with associated fee schedule
- Belongs to one or more **Networks** (by plan)
- May be PCP for **Members** (HMO/POS plans)

## Lifecycle

Applicant -> Credentialed -> Contracted -> Active -> (Terminated / Suspended)
