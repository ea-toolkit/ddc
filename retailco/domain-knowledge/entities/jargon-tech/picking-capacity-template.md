---
type: jargon-tech
id: picking-capacity-template
name: Picking Capacity Template
description: Configuration within the Service Order Manager that defines warehouse picking capacity thresholds and lead times per fulfillment unit, used to calculate dispatch dates.
status: active
related_systems: [service-order-manager, external-routing-provider]
---

# Picking Capacity Template

## Overview

A picking capacity template is a configuration object within the Service Order Manager that defines how much picking capacity a fulfillment unit (warehouse/store) has and what lead times apply for different delivery types. These templates drive dispatch date calculations — the date by which an order can be dispatched from the fulfillment unit.

## Details

### What It Contains
- **Capacity thresholds**: Maximum number of orders a fulfillment unit can pick per day
- **Lead times**: Days required to prepare an order for dispatch, varying by delivery type (truck, curbside, parcel)
- **Store/warehouse assignment**: Which fulfillment units the template applies to

### How It's Used
When the Service Order Manager calculates delivery availability for a customer's zip code, it:
1. Determines the eligible fulfillment unit(s) for that zip code
2. Reads the picking capacity template for those units
3. Calculates a dispatch date based on current load + lead time
4. Sends the dispatch date to the External Routing Provider, which returns available delivery slots

### Critical Risk: Undefined Template Scenarios
If a template is modified in a way that creates undefined or missing scenarios for certain store/delivery-type combinations, the dispatch date calculation produces nonsensical values (e.g., dates months in the future). The Service Order Manager does not validate whether the calculated dispatch date is reasonable before sending it downstream.

### Modification Access
Templates can be modified directly in production by authorized users. There is no staging environment preview, no validation of business impact, and no automated check that the new values produce sensible dispatch dates across all affected zip codes and delivery types.
