---
type: jargon-tech
id: data-center-migration
name: Data Center Migration
description: Physical decommissioning of a data center facility, requiring migration of all hosted infrastructure (servers, DNS, authentication, networking) to other locations.
status: active
related_systems: [warehouse-management-system, material-handling-system, modern-store-selling-app]
---

# Data Center Migration

## Overview

A data center migration is the physical shutdown and decommissioning of a data center facility. This involves moving or replacing all infrastructure hosted in that building — physical servers, DNS servers, authentication servers, network equipment, load balancers — to other data center locations. This is an infrastructure-layer concern, not an application-layer one.

## Details

### What It Is NOT

Data center migration is not:
- A software upgrade or version change
- An application deployment or cutover
- A message queue or middleware change
- An order routing configuration change

It is the physical/virtual infrastructure layer — the stuff that must exist before any application can run.

### Why It Breaks Applications

When a data center is decommissioned, every service hosted there must be migrated or replaced. If any critical infrastructure service is missed or improperly cut over, all applications depending on it fail. Common failure points:

1. **DNS servers** — warehouse terminals, printers, forklifts all need DNS to resolve hostnames. If the DNS server was physically in the decommissioned DC with no secondary configured, everything loses network connectivity.
2. **Authentication servers** — wireless network authentication (see `network-authentication-platform`). If authentication servers are migrated incorrectly, devices can't join the network.
3. **Network routing** — physical network paths that traverse the decommissioned facility.
4. **Load balancer configuration** — stale entries pointing to migrated/shut-down servers. See `load-balancer-stale-member`.

### Impact on Warehouses

When infrastructure fails at a distribution point:
- Warehouse terminals cannot connect to the network
- Forklifts with mounted terminals lose connectivity
- Label printers stop working
- Staff cannot log into WarehouseManagementSystem or MaterialHandlingSystem
- Orders exist in upstream systems but cannot be acted upon physically

This manifests as "orders failing" or "orders in error state" but the root cause is infrastructure, not application logic.

### Known Incident

During a North American data center migration, two infrastructure failures occurred on the same day affecting multiple distribution points:
1. **DNS failure (6 hours)** — see `dns-single-point-of-failure`
2. **Authentication failure (2.5 hours)** — see `load-balancer-stale-member`
