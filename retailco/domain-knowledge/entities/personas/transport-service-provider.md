---
type: persona
id: transport-service-provider
name: Transport Service Provider (TSP)
description: External delivery and service companies that perform physical delivery, installation, and assembly for RetailCo customers.
status: active
related_systems: [external-routing-provider]
---

# Transport Service Provider (TSP)

## Overview

Transport Service Providers are external companies contracted to perform last-mile delivery and customer services (assembly, installation, removal). They are not RetailCo employees — they work for logistics firms, courier services, and specialist service companies.

## Details

### How They Work

- TSPs log into RoutingPlatformV2 (the ExternalRoutingProvider's web portal) with individual user accounts
- They see their assigned work orders (jobs) and update status as work progresses
- Status updates flow: TSP updates in RoutingPlatformV2 portal → ExternalRoutingProvider → ServiceOrderManager

### Status Transitions

TSPs update work orders through statuses such as: picked up, in transit, delivered, completed.

### Access Model

- Individual login accounts per TSP user
- Users can belong to multiple groups (regions, clients, service types)
- Multi-group and multi-market users have complex permission configurations
- The ExternalRoutingProvider manages access levels — this is a known fragile area (see `access-level-deployment-regression`)

### Why They Matter

TSPs are the only actors who can confirm physical delivery/service completion. If they cannot access or update work orders, RetailCo has no visibility into whether customers received their goods or services. There is no automated alternative — status updates are human-driven.
