---
type: jargon-tech
id: production-config-without-validation
name: Production Config Without Validation
description: Anti-pattern where production configuration can be changed directly without value validation, impact preview, or business-level sanity checks.
status: active
related_systems: [service-order-manager]
---

# Production Config Without Validation

## Overview

A recurring failure pattern at RetailCo where production configuration values can be modified directly by users without any automated validation that the new values are reasonable, no preview of downstream impact, and no alerts when the change breaks business flows. The system accepts garbage input and propagates it downstream as if it were valid.

## Details

### Pattern
```
User modifies config value in production
    |
No validation: value accepted regardless of business sense
    |
System calculates derived data from bad config (e.g., dispatch dates)
    |
Derived data is nonsensical but passes no sanity check
    |
Downstream system receives nonsense, returns empty/error
    |
Customer sees broken experience (no delivery options, etc.)
    |
No alert fires — technically no system error occurred
```

### Why It's Hard to Detect
- No system throws an error — each component does exactly what it's told
- The bad data is "valid" from a type/format perspective (it's a date, just an absurd one)
- Impact is partial — only affects specific zip codes, stores, or delivery types served by the modified config
- Aggregate order counts may look normal if the affected segment is small
- Requires correlating "no delivery slots for zip code X" with "config change at time T"

### Observed Instances
- **Picking capacity template change** (market-au): Modified thresholds created undefined template scenarios, producing dispatch dates months in the future. External Routing Provider returned no slots. Affected scheduled delivery for specific zip codes. Multi-hour investigation time, quick fix once found.
- **Cross-compartment deployment** (EU): Different mechanism (wrong deployment target) but same pattern — bad config, correct logic, garbage output. See `cross-compartment-deployment-error`.

### Missing Safeguards
- No validation rules on config values (min/max bounds, reasonableness checks)
- No impact preview ("if you change this, these zip codes will lose scheduled delivery")
- No post-change health check (did delivery slot availability change dramatically?)
- No alerting on sudden drops in delivery option availability per market/zip/delivery-type
- No change approval workflow (four-eyes principle not enforced for config changes)
