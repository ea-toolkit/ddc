---
type: jargon-tech
id: dns-single-point-of-failure
name: DNS Single Point of Failure
description: Failure pattern where warehouse sites have only one DNS server configured with no secondary, causing total network loss when that server becomes unreachable.
status: active
related_systems: [warehouse-management-system, material-handling-system]
---

# DNS Single Point of Failure

## Overview

A DNS single point of failure occurs when a site (warehouse, store) has its primary DNS pointing to a single physical DNS server with no secondary DNS configured. If that server becomes unreachable — for example, during a data center migration — all DNS lookups fail and nothing on the network works.

## Details

### Incident Pattern

During a regional data center migration, multiple distribution points had their primary DNS pointing to a physical DNS server located in the data center being decommissioned. No secondary DNS was configured at these sites.

When the data center migration proceeded and the DNS server became unreachable:
- All DNS lookups at the affected distribution points failed
- Warehouse terminals, forklifts, and label printers lost network connectivity
- Staff could not access WarehouseManagementSystem or any network-dependent application
- **Duration: multi-hour outage** to diagnose and fix

### Why It Took So Long

Nobody realized these sites lacked DNS redundancy. The dependency between specific warehouse sites and specific DNS servers in specific data centers was not mapped. Investigation had to work backwards from "nothing works at these warehouses" to "DNS is failing" to "their DNS server is in the DC we just migrated."

### Root Cause Chain

```
Data center migration proceeds
    |
Physical DNS server in that DC becomes unreachable
    |
Affected sites have no secondary DNS configured
    |
All DNS lookups fail at those sites
    |
Warehouse terminals, forklifts, printers lose connectivity
    |
Orders cannot be processed physically (exist upstream but unactionable)
```

### Missing Safeguards

- No inventory of which sites depend on which DNS servers
- No pre-migration audit of DNS redundancy at dependent sites
- No monitoring for DNS resolution success rate per site
- No secondary DNS configured as standard practice at all sites
