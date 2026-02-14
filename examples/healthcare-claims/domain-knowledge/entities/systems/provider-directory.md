---
type: system
id: provider-directory
name: Provider Directory
description: Master data source for all contracted providers including demographics, credentials, specialties, network status, and contract fee schedules.
status: active
owner_team: provider-network
make_or_buy: make
implements_capability: provider-management
related_systems: [rules-engine, eligibility-service, member-portal, fraud-detection]
---

# Provider Directory

## Overview

Master data for all contracted providers: demographics, credentials, specialties, locations, network status, and contract fee schedules. Source of truth for provider network status during adjudication.

## Responsibilities

- Maintain provider demographic and contact information
- Track provider credentials and credentialing status
- Store provider specialties and board certifications
- Manage provider practice locations and service areas
- Maintain network participation status by plan
- Store contract fee schedules for each provider/group
- Support provider search for member portal
- Provide network status lookup for claims adjudication

## Key Decisions / Logic

- Provider network status is evaluated as of the claim's date of service, not the processing date
- A provider can be in-network for some plans and out-of-network for others
- Re-credentialing is required every 3 years per NCQA standards
- Multi-location practices may have different network status per location

## Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| Rules Engine | Inbound | Provides network status and fee schedules for adjudication |
| Eligibility Service | Inbound | Provides provider data for eligibility responses |
| Member Portal | Inbound | Provides provider search and directory data |
| Fraud Detection | Inbound | Provides provider data for fraud pattern analysis |
