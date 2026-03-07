---
type: process
id: service-fulfillment-flow
name: Service Fulfillment Flow
description: End-to-end process from customer service booking through provider assignment and service delivery.
status: active
related_systems: [order-capture-api, service-order-manager, provided-services-manager, external-routing-provider]
implements_capability: service-fulfillment
---

# Service Fulfillment Flow

## Overview

The service fulfillment flow orchestrates the journey of a customer-booked service (assembly, installation, delivery, removal) from order capture through to service delivery. It spans multiple systems connected via Kafka and MessageBroker queues.

## Details

### Flow Steps

```
Customer places order with services
    ↓
OrderCaptureAPI (via Kafka)
    ↓
Service Order Manager (order lifecycle management)
    ↓ [If service order]
Provided Services Manager (via MessageBroker queue)
    ↓
External Routing Provider (RoutingPlatformV2)
    ↓
Transport Service Providers (TSPs)
    ↓
Service delivered to customer
```

### Alternative Path (Picking/Delivery)

```
Picking Service → External Routing Provider → TSPs
```

### Order States
1. **Order Created** — order captured in system
2. **ReadyToAssign** — order waiting for provider assignment
3. **Assigned to Provider** — sent to External Routing Provider
4. **Provider Confirmed** — TSP accepted the job
5. **Service Delivered** — service completed at customer location

### Critical Integration Points
- **OrderCaptureAPI → Service Order Manager**: Kafka event streaming
- **Service Order Manager → Provided Services Manager**: MessageBroker queue
- **Service Order Manager → External Routing Provider**: SaveWorkOrder API
- **Picking Service → External Routing Provider**: Order weight/dimension data

### Failure Modes
- Messages split between competing queue consumers → orders stuck in ReadyToAssign
- Queue configuration conflicts during deployments
- No monitoring on order state transitions → silent failures for 24+ hours