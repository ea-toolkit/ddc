---
type: jargon-tech
id: infrastructure-permission-revocation
name: Infrastructure Permission Revocation
description: Anti-pattern where infrastructure security groups or queue permissions are accidentally removed during maintenance, silently breaking integrations.
status: active
related_systems: [customer-service-platform, message-broker]
---

# Infrastructure Permission Revocation

## Overview

A failure pattern where infrastructure-level permissions (security groups, queue ACLs, network rules) are accidentally removed during routine maintenance or "sanity checks", causing integrations between systems to silently break. Orders or messages are created but cannot reach downstream systems, getting stuck in draft or retry states.

## Details

### Pattern
1. Operations team performs infrastructure maintenance (e.g., "sanity check" of security groups)
2. A security group or permission is removed — either accidentally or because it's not recognized as actively used
3. The affected system can still create records locally but cannot publish to its downstream queue
4. Orders/messages accumulate in a draft/retry state
5. No monitoring alert fires because the infrastructure change itself is not instrumented

### Why It's Hard to Detect
- The upstream system (e.g., CustomerServicePlatform) continues to accept user input — staff don't see immediate failure
- Messages enter a retry loop silently
- Infrastructure permission changes are not covered by application-level monitoring
- The gap between "system looks up" and "integration is working" is invisible without end-to-end flow monitoring

### Known Instance
- CustomerServicePlatform → Service Order Manager queue in APAC region lost permissions when a security group was removed during maintenance
- Detection took ~3 hours; fix took ~12 minutes once identified
- See `customer-service-platform` for details

### Mitigation
- Monitor end-to-end message flow (not just application health)
- Alert on queue permission changes
- Require change tickets for security group modifications
- Tag security groups with dependent systems to prevent accidental removal
