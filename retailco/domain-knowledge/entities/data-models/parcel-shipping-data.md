---
type: data-model
id: parcel-shipping-data
name: Parcel Shipping Data
description: Data structure containing weight, dimensions, and destination sent from the Picking Service to the External Routing Provider for each shipment.
status: active
related_systems: [picking-service, external-routing-provider]
---

# Parcel Shipping Data

## Overview

Parcel shipping data is the payload sent from the Picking Service to the External Routing Provider when an order has been picked and is ready for delivery dispatch. It contains the physical attributes needed for carrier selection, route planning, and pricing.

## Details

### Key Fields

- **Weight**: Numeric value, expected in kilograms. No unit label is transmitted — the External Routing Provider assumes kg.
- **Dimensions**: Length, width, height of the parcel
- **Destination**: Delivery address for the customer

### Weight Data Flow

```
Product master / upstream source (unit varies)
    |
Picking Service (converts to kg)
    |
External Routing Provider (assumes kg, no validation)
    |
Transport Service Providers (use for pricing)
```

### Critical Gap

The weight field is a bare number with no unit metadata. The implicit contract is "this is kilograms," but nothing enforces it. If the Picking Service sends grams, milligrams, or any other unit, the External Routing Provider treats it as kilograms.