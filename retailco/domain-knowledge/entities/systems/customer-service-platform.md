---
type: system
id: customer-service-platform
name: CustomerServicePlatform
description: Post-sale customer service system handling returns, complaints, order adjustments, and manual order corrections.
status: active
related_systems: [service-order-manager, store-selling-app]
implements_capability: returns-management
depends_on: [message-broker]
---

# CustomerServicePlatform

## Overview

The CustomerServicePlatform is RetailCo's primary system for post-sale customer service operations. Store staff use it to process returns, handle complaints, reschedule deliveries, and manually fix backorder issues. It creates return order records, coordinates refunds with the Service Order Manager, and triggers inventory return flows.

## Details

### Key Responsibilities
- Return order creation and lifecycle management
- Customer complaint handling and resolution
- Order adjustments and manual corrections
- Delivery rescheduling for problem orders
- Backorder manual intervention

### Integration Points
- **Outbound to order management**: Coordinates with `service-order-manager` for refund processing and inventory adjustments via MessageBroker queues
- **Inbound**: Staff access directly through a dedicated UI (not through StoreSellingApp)
- **Regional variation (Asia-Pacific)**: In APAC markets, CustomerServicePlatform also creates forward orders that flow through `store-selling-app` → `service-order-manager`

### Return Order Processing
When staff create a return:
1. Staff enters the customer's original order number
2. Selects items being returned
3. System validates return eligibility (time since purchase, product condition rules)
4. Saves the return order record
5. Record triggers refund process and inventory return flow
6. If exchange: new sales order created through the normal order path

### Known Incidents

#### APAC Queue Permission Revocation (March, previous year)
- **Symptom**: No orders from CustomerServicePlatform could reach Service Order Manager in APAC markets
- **Root cause**: A security group was accidentally removed during infrastructure "sanity checks". The MessageBroker queue that CustomerServicePlatform uses to send orders to Service Order Manager lost its permissions.
- **Impact**: Orders created in CustomerServicePlatform but stuck in draft/retry state
- **Detection time**: several hours — no monitoring alerted on the infrastructure permission change
- **Fix**: Re-add the security group to the queue (quick fix once identified)
- **Pattern**: See `infrastructure-permission-revocation`

### Global Outage Indicators
When ALL markets cannot create returns simultaneously, the likely causes are:
1. CustomerServicePlatform itself is down (app/API unreachable, database issue, service crash)
2. Authentication/authorization failure (staff credentials cannot be validated)
3. Integration failure (dependent system — Service Order Manager, payment gateway, customer database — is down or unreachable)
4. Infrastructure issue (network connectivity, security group removal, queue permissions broken)

### Knowledge Gaps
- Exact tech stack and hosting infrastructure
- Authentication mechanism (SSO, LDAP, other)
- Payment gateway integration details for refund processing
- Monitoring and alerting coverage
