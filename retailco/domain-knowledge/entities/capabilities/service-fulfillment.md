---
type: capability
id: service-fulfillment
name: Service Fulfillment
description: End-to-end orchestration of customer-booked service delivery including assembly, installation, delivery, and removal.
status: active
related_systems: [service-order-manager, provided-services-manager, external-routing-provider]
---

# Service Fulfillment

## Overview

Service Fulfillment is the business capability responsible for ensuring that services booked by customers (assembly, installation, delivery, removal) are assigned to providers and delivered as promised. It spans order capture, provider routing, appointment scheduling, service execution, and completion confirmation.

## Details

### Sub-Capabilities
1. **Service order capture** — recording what services a customer has booked
2. **Service provider routing** — matching orders to available TSPs via the External Routing Provider
3. **Appointment scheduling** — coordinating customer and provider availability
4. **Service execution tracking** — monitoring that services are performed
5. **Service completion confirmation** — closing the loop with the customer

### Domain
Part of the Fulfillment Services domain, which encompasses ~50+ Product Engineering teams organized in sub-domains.

### Key Risk
Service fulfillment failures are directly brand-damaging — customers have prepaid and expect someone to arrive. Unlike delivery delays which are visible, service failures can be silent (customer waits, no one comes).