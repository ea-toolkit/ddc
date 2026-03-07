---
type: jargon-tech
id: no-autoscaling-pattern
name: No Autoscaling Pattern
description: Anti-pattern where critical services run with static pod counts and no horizontal pod autoscaler, causing complete failure during traffic spikes.
status: active
related_systems: [delivery-options-orchestrator, address-resolution-service]
---

# No Autoscaling Pattern

## Overview

Multiple critical services in the checkout flow run with statically configured pod counts and no horizontal pod autoscaler (HPA). When traffic spikes beyond the static capacity, services become overloaded and fail completely rather than scaling to meet demand.

## Details

### Pattern
- Services deployed with a fixed number of pods (e.g., 2 pods for nginx-ingress-controller)
- No HPA configured to scale based on CPU/memory/request metrics
- No capacity headroom — sized for average traffic, not peak
- When traffic exceeds capacity: service crashes or becomes unresponsive
- Impact is total — no partial degradation, just complete failure

### Observed Instances
- **nginx-ingress-controller**: 2 static pods, ran out of memory during 3-5x traffic spike. Thousands of orders lost in ~30 minutes.
- **AddressResolutionService**: Not load tested before migration cutover, overloaded under production traffic.

### Why It Matters
The checkout delivery options flow has no graceful degradation. Combined with no autoscaling, any traffic spike beyond baseline capacity = global checkout outage.
