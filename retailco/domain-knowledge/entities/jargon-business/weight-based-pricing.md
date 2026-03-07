---
type: jargon-business
id: weight-based-pricing
name: Weight-Based Pricing
description: Carrier pricing model where shipment cost is determined by actual or volumetric weight of the parcel.
status: active
related_systems: [external-routing-provider]
---

# Weight-Based Pricing

## Overview

Transport Service Providers (TSPs) use weight as a primary input for shipment pricing. Depending on the carrier, pricing is based on actual weight, volumetric weight, or whichever is greater. Incorrect weight data directly causes incorrect invoicing.

## Details

### Pricing Methods

- **Actual weight**: Physical weight of the parcel as measured or declared
- **Volumetric weight**: Calculated from parcel dimensions (L x W x H / divisor), used when the parcel is large but light
- **Chargeable weight**: The greater of actual and volumetric weight — most carriers use this

### Impact of Weight Errors

When the Picking Service sends weight values off by 1000x (e.g., a 2kg parcel reported as 2000kg, or vice versa):
- TSPs misprice the shipment dramatically (overprice if too heavy, underprice if too light)
- Invoices from TSPs will not match expected costs
- Reconciliation between RetailCo and TSPs surfaces discrepancies, but only after the fact
- Financial impact scales with the number of affected shipments (typically thousands per incident)