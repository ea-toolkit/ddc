---
type: jargon-tech
id: dead-letter-queue
name: Dead Letter Queue (DLQ)
description: A queue that captures messages that cannot be processed, preventing them from blocking other messages.
status: active
related_systems: [message-broker, picking-service]
---

# Dead Letter Queue (DLQ)

## Overview

A dead letter queue captures messages that fail processing — malformed data, missing fields, unrecognized formats — so they can be inspected and retried without blocking the main processing queue.

## Details

### Why It Matters at RetailCo
Several critical systems, including the Picking Service, lack dead letter queue implementations. This means a single "poison message" (e.g., a legacy order with bad data) can block the entire queue, halting all orders behind it.

### Incident Impact
In one major incident, a single legacy order from one market with missing configuration fields blocked the Picking Service's queue. All subsequent orders piled up, and fulfillment units could not pick or ship until the consumer lag was manually cleared.

### Recommended Implementation
- Route unprocessable messages to a DLQ after N retry attempts
- Alert on DLQ depth (messages landing there = something is wrong)
- Provide tooling to inspect and replay DLQ messages
- Never let one bad message block the entire pipeline