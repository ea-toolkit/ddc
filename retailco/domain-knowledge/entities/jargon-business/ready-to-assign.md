---
type: jargon-business
id: ready-to-assign
name: ReadyToAssign (RTA)
description: Order status indicating a service order has been captured but not yet assigned to a service provider.
status: active
related_systems: [service-order-manager, provided-services-manager]
---

# ReadyToAssign (RTA)

## Overview

ReadyToAssign is a critical intermediate state in the service order lifecycle. An order in RTA status has been captured by the Service Order Manager but has not yet been routed to a service provider via the Provided Services Manager and External Routing Provider.

## Details

### Position in Lifecycle
Order Created → **ReadyToAssign** → Assigned to Provider → Provider Confirmed → Service Delivered

### Known Chronic Issue
Orders getting stuck in ReadyToAssign is a recurring problem that has persisted for 2+ years. Multiple different root causes have produced the same symptom over time:
- Competing queue consumers (deployment conflicts)
- Message routing failures
- Integration issues between Service Order Manager and downstream systems

This recurring pattern with different root causes suggests a **systemic design issue** rather than individual bugs.

### Business Impact When Stuck
- Customers have confirmed appointments but no provider is dispatched
- Products are delivered but services (assembly, installation) never happen
- Leads to customer dissatisfaction, cancellations, and brand damage