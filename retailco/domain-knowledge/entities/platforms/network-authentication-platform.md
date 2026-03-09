---
type: platform
id: network-authentication-platform
name: Network Authentication Platform
description: Wireless network authentication infrastructure that controls device access to the corporate network at stores and warehouses.
status: active
related_systems: [warehouse-management-system, material-handling-system, modern-store-selling-app]
---

# Network Authentication Platform

## Overview

The Network Authentication Platform provides wireless network authentication for devices at RetailCo stores and warehouses. All wireless devices — warehouse terminals, forklifts, handheld scanners, POS terminals — must authenticate through this platform to access the network.

## Details

### Role in Infrastructure

This is a foundational infrastructure service. If it fails:
- No device can join the wireless network
- All wireless-dependent applications become unreachable
- WarehouseManagementSystem, MaterialHandlingSystem, ModernStoreSellingApp all become inaccessible

### Architecture

- Authentication servers sit behind a load balancer
- Multiple servers provide redundancy — but only if the load balancer configuration is correct
- Servers may be physically located in specific data centers, creating a dependency on those facilities

### Known Vulnerability

During data center migrations, authentication servers must be migrated carefully. The correct procedure is:
1. Disable the server in the load balancer
2. Shut down the server
3. Migrate to new location
4. Bring up and verify
5. Re-enable in load balancer

If steps are executed out of order (e.g., shut down before disabling in LB), the load balancer routes traffic to a dead server. See `load-balancer-stale-member`.
