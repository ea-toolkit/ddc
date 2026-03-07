---
type: api
id: picking-to-routing-parcel-api
name: Picking to Routing Parcel API
description: Direct API interface through which the Picking Service sends parcel data (weight, dimensions, destination) to the External Routing Provider.
status: active
related_systems: [picking-service, external-routing-provider]
---

# Picking to Routing Parcel API

## Overview

The Picking Service sends parcel shipping data to the External Routing Provider via direct API calls. The API accepts weight in kilograms, dimensions, and destination information. The External Routing Provider uses this data to dispatch orders to Transport Service Providers (TSPs) and calculate shipping costs.

## Details

### Contract

- **Direction**: Picking Service → External Routing Provider
- **Protocol**: Direct API call (synchronous)
- **Weight unit**: Kilograms (kg) expected by the External Routing Provider

### Validation

- **Sender (Picking Service)**: No outbound validation. Sends whatever value it computes, with no min/max bounds or reasonableness checks.
- **Receiver (External Routing Provider)**: No schema validation or sanity checks. Accepts any numeric value and uses it as-is for routing and pricing.

### Known Failure Mode: Unit Mismatch

The Picking Service is responsible for converting weight from its upstream source units into kilograms before sending. When the conversion logic breaks — wrong multiplier, missing conversion, or reversed direction — the External Routing Provider receives values off by orders of magnitude (e.g., grams sent as kilograms, making a 20kg item appear as 0.02kg). Neither side validates, so incorrect values propagate silently to TSP pricing.

### Impact of Incorrect Weight

- TSPs price shipments based on weight (actual or volumetric)
- Thousands of shipments can be mispriced before detection
- No automated monitoring catches weight anomalies proactively