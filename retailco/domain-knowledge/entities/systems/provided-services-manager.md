---
type: system
id: provided-services-manager
name: Provided Services Manager
description: Manages customer-booked services (assembly, installation, delivery) and routes them to external service providers.
status: active
related_systems: [service-order-manager, external-routing-provider]
implements_capability: service-fulfillment
depends_on: [message-broker]
---

# Provided Services Manager

## Overview

The Provided Services Manager handles the ServiceBooking domain — managing services that customers book, confirm, and pay for alongside product orders. It receives service orders from the Service Order Manager via MessageBroker queues and routes them to the External Routing Provider for dispatch to Transport Service Providers (TSPs).

## Details

### Service Types Managed
- Kitchen assembly and installation
- Product installations (various)
- Delivery and in-home placement of new products
- Removal of old products

### Pricing
- Advanced assembly: ~€200-300 per service
- Other services: varies (generally lower cost)

### Integration
- **Inbound**: Receives service orders from `service-order-manager` via MessageBroker queue
- **Outbound**: Routes to `external-routing-provider` (RoutingPlatformV2/V1) for TSP dispatch

### Known Incident (INC-001)
A deployment to a related attachment service (`attachment-service`) accidentally started consuming messages from the Provided Services Manager's MessageBroker queue. This caused message splitting — some orders reached this system, others were consumed by the wrong service. Result: 8,000-9,000 services stuck in ReadyToAssign status.