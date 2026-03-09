---
type: jargon-tech
id: access-level-deployment-regression
name: Access Level Deployment Regression
description: Recurring pattern where ExternalRoutingProvider deployments break user access permissions, particularly for multi-group TSP accounts.
status: active
related_systems: [external-routing-provider]
---

# Access Level Deployment Regression

## Overview

A recurring failure pattern where deployments to the ExternalRoutingProvider (specifically RoutingPlatformV2) break user access level calculations, causing Transport Service Providers to lose visibility of their assigned work orders.

## Details

### The Pattern

1. ExternalRoutingProvider deploys a new release to RoutingPlatformV2
2. The release contains a bug in how user access permissions are calculated
3. Users with complex permission setups (multi-group, multi-market) are disproportionately affected
4. Affected TSPs log in and see no jobs, or cannot update status on visible jobs
5. No monitoring alerts fire — detection depends on user reports
6. Time-to-detection is typically 24+ hours because TSPs assume "no jobs today"
7. Fix is usually a release rollback (~45 minutes once identified)

### Why It Recurs

- The ExternalRoutingProvider's permission model is inherently complex: multi-market, multi-group, different TSP roles
- Test environments do not replicate production-realistic user permission combinations
- Edge cases (users belonging to many groups, cross-market users) are not covered in pre-deployment testing
- Each deployment can introduce new permission calculation logic that works for simple users but breaks for complex ones

### Impact

- Deliveries continue physically but are not tracked in systems
- RetailCo loses visibility into fulfillment status
- Customer service cannot give accurate delivery updates
- Business impact scales silently with the number of affected TSPs and the duration before detection

### Mitigation

- Monitor TSP login success rates and status update volumes post-deployment
- Include multi-group, multi-market test accounts in pre-deployment validation
- Consider canary deployments that test with complex permission users first
