---
type: jargon-tech
id: change-data-capture
name: Change Data Capture
description: Data replication pattern that captures row-level changes from source databases and propagates them to target systems, used to synchronize order and inventory data across regions.
status: active
related_systems: [service-order-manager]
---

# Change Data Capture

## Overview

Change Data Capture is a data replication mechanism used to synchronize data between systems and regions. In the order fulfillment context, it replicates order data, inventory records, and configuration between source and target environments by capturing row-level database changes and propagating them downstream.

## Details

### Role in Order Fulfillment
Change Data Capture pipelines replicate data that the order fulfillment chain depends on — including data that determines which region an order belongs to and where inventory availability is checked. If a pipeline is misconfigured, the replicated data can carry incorrect metadata.

### Critical Configuration: Region Selection
When setting up or migrating Change Data Capture pipelines, the operator must select the correct **source region**. This determines what data is replicated and how downstream systems interpret order metadata (e.g., region identifiers on orders).

### Known Failure Mode: Wrong Region Selection
If the wrong source region is selected during Change Data Capture setup or migration:
- Order data gets tagged with incorrect region metadata
- The fulfillment system interprets orders as belonging to the wrong region
- Inventory checks look for stock in the wrong region — a region that may have no inventory for the affected products
- Orders are immediately marked as `backordered` even though inventory exists in the correct region
- This produces EU-wide false backorders because the region tagging affects all orders flowing through the misconfigured pipeline

### Why This Is Hard to Detect
- The Available-to-Promise logic works correctly — it checks inventory for the region on the order
- The inventory data is correct — stock exists at the right distribution points
- The failure is in the **metadata tagging** — orders say they're from region X when they're actually from region Y
- Symptoms look like an inventory shortage, not a data replication error
- Requires checking Change Data Capture pipeline configuration and comparing order region tags against expected values
