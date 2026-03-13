---
type: platform
id: message-broker
name: MessageBroker
description: Message queue and event broker platform used for asynchronous service-to-service communication.
status: active
related_systems: [service-order-manager, provided-services-manager, order-integration-hub]
---

# MessageBroker

## Overview

MessageBroker is the primary message queuing platform for asynchronous communication between fulfillment services. It handles order routing messages between the Service Order Manager, Provided Services Manager, and other downstream systems.

## Details

### Usage Pattern
- Point-to-point messaging via named queues
- Services bind as consumers to specific queues
- Queue naming convention: `SOM_AP_som.order.SalesOrder1_CREATE_CONSUMER_QUEUE`

### Known Gaps
- **No queue registry**: No central record of which service owns which queue
- **No competing consumer detection**: Multiple services can bind to the same queue without alerts
- **No dead letter queue implementation**: Failed messages are lost rather than captured for retry
- **No queue depth monitoring**: Queue backlogs go undetected

### Incident Impact
The lack of a queue registry directly caused a major incident where a deployment made one service start consuming from another service's queue, splitting messages and causing thousands of orders to get stuck.

### Recommended Safeguards
1. Maintain a queue registry mapping queues to owning services
2. Validate queue bindings at deployment time
3. Alert on unexpected competing consumers
4. Monitor queue depths and consumer lag
5. Implement dead letter queues for failed messages