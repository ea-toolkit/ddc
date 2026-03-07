---
type: jargon-tech
id: unit-conversion-bug
name: Unit Conversion Bug
description: A class of bug where data is sent in the wrong unit of measurement, causing values to be off by orders of magnitude.
status: active
related_systems: [picking-service, external-routing-provider]
---

# Unit Conversion Bug

## Overview

A unit conversion bug occurs when a system transmits a numeric value in a different unit than the receiver expects. In the absence of unit metadata or validation, these bugs cause values to be silently wrong by factors of 1000x or more.

## Details

### Pattern at RetailCo

The Picking Service receives weight data from upstream systems and must convert it to kilograms before sending to the External Routing Provider. Common failure modes:

- **No conversion applied**: Raw value forwarded without converting (e.g., grams sent as-is, interpreted as kg — a 2kg item becomes "2000kg")
- **Wrong multiplier**: Conversion uses the wrong factor (multiply instead of divide, or vice versa)
- **Wrong direction**: Converts kg to grams instead of grams to kg

The error can go either direction — weights can appear 1000x too large (grams interpreted as kg) or 1000x too small (kg interpreted as grams). Both are equally damaging for TSP pricing.

### Why It's Dangerous

- **No unit labels in the payload**: Weight is a bare number — the receiver assumes kg
- **No validation on either side**: Neither sender nor receiver checks for reasonable ranges
- **High blast radius**: Deployments roll out to entire regions, affecting thousands of orders within hours
- **Fast damage, slow detection**: Most orders ship before the error is caught; detection relies on human reports from internal ops or TSP complaints
- **Tiny correction window**: Even with fast detection (hours), most affected orders have already been dispatched. Manual correction is only possible for orders not yet handed off to TSPs
- **Regional rollout amplifies impact**: Picking Service deployments roll out by region (e.g., EU, Asia-Pacific), so the entire region's order volume is affected simultaneously

### Mitigation (Not Yet Implemented)

- Attach unit metadata to numeric fields
- Add min/max bounds validation (e.g., a single parcel cannot weigh 0.001kg or 50,000kg)
- Automated anomaly detection on weight distributions