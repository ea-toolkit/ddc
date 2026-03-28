// Domain preset packages — each preset simulates a multi-file upload

export const PRESETS = {
  sre: {
    name: 'SRE / Platform Operations',
    files: [
      {
        name: 'knowledge-base.md',
        size: '4.2 KB',
        content: `# OrderFlow Platform — SRE Knowledge Base

## Architecture Overview
47 microservices on Kubernetes (GKE), 3 clusters (us-east1, eu-west1, ap-southeast1). Traffic routed via Cloudflare → Istio ingress → service mesh.

## Core Services
| Service | Owner | Criticality | Dependencies |
|---------|-------|-------------|--------------|
| order-gateway | Team Alpha | P0 | auth-service, inventory-api, payment-engine |
| payment-engine | Team Bravo | P0 | stripe-adapter, fraud-scorer, ledger-db |
| inventory-api | Team Charlie | P1 | warehouse-sync, catalog-db, redis-cache |
| fulfillment-orchestrator | Team Delta | P1 | shipping-adapter, warehouse-api, notification-service |
| notification-service | Team Echo | P2 | email-provider (SendGrid), sms-provider (Twilio), push-service (Firebase) |

## Known Failure Modes
- order-gateway timeout cascade: When payment-engine latency exceeds 5s, order-gateway retries 3x with no backoff, causing thundering herd. Circuit breaker threshold: 50% failure rate over 30s window.
- inventory-api cache stampede: Redis cache TTL is 5 minutes. High-traffic items expire simultaneously. Mitigation: jittered TTL added in v2.3.1 but not applied to catalog categories.
- fulfillment-orchestrator split-brain: During region failover, in-flight orders can be claimed by both regions. Resolution: manual reconciliation via kubectl exec into ledger-db. Only 2 people know this procedure.
- notification-service backpressure: SendGrid rate limit is 600 emails/minute. During flash sales, queue backs up. No dead letter queue — failed notifications are silently dropped.

## Monitoring
- Grafana dashboards: sre-overview (golden signals), payment-health, order-pipeline, regional-latency
- Alerting: PagerDuty integration. P0 = page immediately. P1 = page if not ack'd in 15min. P2 = Slack only.
- SLOs: order-gateway 99.95% availability, p99 < 500ms. payment-engine 99.99% success rate.

## Tribal Knowledge
- The warehouse-sync service has an undocumented 2-second sleep between batch syncs added as a "temporary fix" to avoid warehouse API rate limiting. Removing it causes 429 errors.
- The fraud-scorer model was retrained in January but the feature store schema changed. Old features are silently coerced to 0, reducing fraud detection accuracy. Only the ML team knows this.`
      },
      {
        name: 'runbooks.yaml',
        size: '1.1 KB',
        content: `# SRE Runbooks Index
runbooks:
  - id: RB-001
    title: Order gateway restart
    last_updated: 2026-01-15
    status: current
  - id: RB-002
    title: Payment engine failover
    last_updated: 2025-08-20
    status: outdated (pre-Stripe migration)
  - id: RB-003
    title: Database failover
    last_updated: 2025-11-03
    status: current
  - id: RB-004
    title: Redis cluster recovery
    last_updated: 2024-06-12
    status: outdated (pre-cluster upgrade)
  - id: RB-005
    title: Region failover
    last_updated: 2025-09-30
    status: current
  - id: RB-006
    title: Notification backpressure
    status: DOES NOT EXIST`
      },
      {
        name: 'recent-incidents.md',
        size: '0.8 KB',
        content: `# Recent Incidents (Last 90 Days)
- INC-2891 (Feb 28): payment-engine p99 spike to 12s during EU morning peak. Root cause: connection pool exhaustion on ledger-db. Fixed by increasing pool from 20 to 50.
- INC-2847 (Feb 15): 23-minute outage in ap-southeast1. Root cause: GKE node auto-repair killed 3 nodes simultaneously during memory pressure.
- INC-2803 (Jan 30): notification-service dropped 14,000 order confirmation emails during flash sale. No alert fired — failure was silent.`
      },
      {
        name: 'escalation-matrix.md',
        size: '0.6 KB',
        content: `# Escalation Matrix
| Severity | Response Time | Escalation Path |
|----------|--------------|-----------------|
| P0 | Immediate | On-call → SRE Lead → VP Engineering |
| P1 | 15 minutes | On-call → Team Lead |
| P2 | Next business day | Slack alert → Sprint backlog |

On-call rotation: Weekly, Mon-Mon. Current: Team Alpha.
Backup: Team Bravo (payment-engine expertise).`
      }
    ]
  },

  'customer-support': {
    name: 'Customer Support',
    files: [
      {
        name: 'knowledge-base.md',
        size: '3.8 KB',
        content: `# TechFlow SaaS — Customer Support Knowledge Base

## Product Overview
TechFlow is a project management SaaS with 3 tiers: Free, Pro ($29/mo), Enterprise (custom). 12,000 active customers, 340,000 end users.

## Common Issue Categories
| Category | Volume | Avg Resolution | Escalation Rate |
|----------|--------|----------------|-----------------|
| Billing & Subscriptions | 35% | 12 min | 5% |
| Feature Questions | 25% | 8 min | 2% |
| Bug Reports | 20% | 45 min | 30% |
| Account Access | 15% | 15 min | 8% |
| Data Export/Import | 5% | 60 min | 40% |

## Billing Policies
- Refunds: Full refund within 14 days of purchase. Pro-rated refund within 30 days. No refund after 30 days.
- Downgrades: Take effect at end of current billing cycle. Data over tier limits archived (not deleted) for 90 days.
- Enterprise contracts: Minimum 12 months. Early termination fee = remaining months at 50%.
- Payment failures: 3 retry attempts over 7 days. Account downgraded to Free after 3 failures. 15-day grace period to restore.

## Known Issues (Internal)
- The CSV export for projects with >10,000 tasks times out. Workaround: use the API endpoint /v2/export/async which queues a background job. Not documented publicly.
- SSO login fails intermittently for Okta customers using custom SAML assertions. Engineering says it's fixed in v4.2 (next release). Current workaround: clear browser cookies.
- The "duplicate project" feature doesn't copy custom field configurations. Known since v3.8, deprioritized. Customers report this as a bug — it's actually a limitation.

## Escalation Rules
- Tier 1: Standard agents. Handle billing, feature questions, known issues.
- Tier 2: Senior agents. Handle bugs, data issues, enterprise accounts.
- Tier 3: Engineering. API issues, data corruption, security incidents.
- Enterprise customers: Skip Tier 1, direct to Tier 2. Named account managers for top 50 accounts.`
      },
      {
        name: 'product-quirks.md',
        size: '1.2 KB',
        content: `# Product Quirks — Tribal Knowledge

- "Archive" and "Delete" do different things but customers confuse them. Archive retains data and can be restored. Delete is permanent after 30-day soft-delete window. Support gets 20+ tickets/week about this.
- The mobile app (v3.x) caches aggressively. Changes made on web don't appear on mobile for up to 15 minutes. Customers report it as "sync broken." Solution: force pull-to-refresh. App team says it's "by design."
- Enterprise SSO customers who also have personal Free accounts hit a routing bug where logging in via SSO sometimes lands them in their personal workspace. Only fix: log out completely, clear cookies, log back in via company SSO portal.
- When a project is shared with >50 collaborators, the activity feed stops real-time updates and switches to polling every 60s. Nobody documented the threshold. Engineers call it "the 50-person cliff."
- Free tier users who upgrade to Pro within 7 days of signup get a hidden 20% discount that was part of a 2024 growth experiment. The experiment ended but the code path was never removed. Finance knows about it. Product doesn't.`
      },
      {
        name: 'faq-database.json',
        size: '0.9 KB',
        content: `{
  "faqs": [
    {"q": "How do I cancel my subscription?", "a": "Go to Settings > Billing > Cancel Plan. Your access continues until the end of the billing period."},
    {"q": "Can I get a refund?", "a": "Full refund within 14 days. Pro-rated within 30 days. See billing policies."},
    {"q": "How do I export my data?", "a": "Project > Settings > Export. Choose CSV or JSON. For large projects, use the API async export."},
    {"q": "Why can't I see changes on mobile?", "a": "The mobile app caches data. Pull down to refresh, or wait up to 15 minutes for auto-sync."},
    {"q": "SSO login isn't working", "a": "Clear browser cookies and try again. If using Okta with custom SAML, contact support for a known issue workaround."}
  ]
}`
      }
    ]
  },

  healthcare: {
    name: 'Healthcare Claims',
    files: [
      {
        name: 'knowledge-base.md',
        size: '3.5 KB',
        content: `# MedClaim — Healthcare Claims Processing Knowledge Base

## System Architecture
Claims flow: Provider submits EDI 837 → Claims Gateway → Rules Engine (500+ rules) → Adjudication → Payment Engine (ERA 835 output). Member Eligibility Service and Provider Network Service are called during adjudication.

## Core Systems
| System | Purpose | Owner |
|--------|---------|-------|
| Claims Gateway | Receives/validates EDI 837 files | Intake Team |
| Rules Engine | Applies payer-specific adjudication rules | Rules Team |
| Member Eligibility | Verifies coverage, deductibles, copays | Member Services |
| Provider Network | Checks in-network status, negotiated rates | Network Team |
| Payment Engine | Generates ERA 835 remittance files | Finance IT |

## Adjudication Complexity
- Each payer has different rules. BlueCross rules differ from Aetna rules differ from Medicare rules.
- Some rules contradict each other. Resolution depends on which analyst configured them and when.
- Pre-authorization requirements vary by procedure code AND payer AND member plan type.
- The Rules Engine processes rules in order. Rule priority was set by an analyst who retired in 2024. Nobody has reviewed the ordering since.

## Known Problem Areas
- Claims with modifier codes 25 and 59 trigger different adjudication paths depending on payer. The logic is undocumented.
- Coordination of Benefits (COB) for dual-eligible members (Medicare + Medicaid) has 4 different calculation methods. Which one applies depends on state regulations that change annually.
- The appeals process requires institutional knowledge of payer-specific documentation requirements. Each payer wants different supporting documents.
- Claim type 837I (institutional) and 837P (professional) have overlapping procedure codes that adjudicate differently. The mapping table was last updated 18 months ago.`
      },
      {
        name: 'payer-exceptions.md',
        size: '1.0 KB',
        content: `# Payer-Specific Exceptions

## BlueCross BlueShield
- Modifier 25: Always requires documentation of separate E/M service. Auto-deny without it.
- Telehealth: Accepted for behavioral health only. Deny for all other specialties (policy change Jan 2026).

## Aetna
- Pre-auth required for ALL imaging over $500. No exceptions.
- Appeals must include peer-to-peer review request within 48 hours. After 48h, appeal is auto-denied.

## Medicare
- Dual-eligible: Use Medicaid rate if lower than Medicare rate (state-dependent).
- ABN (Advance Beneficiary Notice) required for any non-covered service. Without ABN, provider cannot bill patient.

## UnitedHealthcare
- Prior auth turnaround: 72 hours for urgent, 14 days for standard. Timeout = auto-approved.
- Out-of-network emergency claims: Process at in-network rate per No Surprises Act. But only for facility fees, NOT physician fees. This distinction trips up 30% of claims.`
      }
    ]
  },

  ecommerce: {
    name: 'E-commerce Fulfillment',
    files: [
      {
        name: 'knowledge-base.md',
        size: '3.2 KB',
        content: `# RetailMax — E-commerce Fulfillment Knowledge Base

## Platform Overview
Multi-channel retail platform. Customers order online (web/mobile) and in-store (POS). Orders flow through: Order Capture → Inventory Allocation → Fulfillment → Delivery.

## Core Systems
| System | Purpose |
|--------|---------|
| Order Capture API | Receives orders from all channels (web, mobile, POS, API partners) |
| Inventory Allocation Service | Checks stock across 12 distribution centers, reserves inventory |
| Fulfillment Engine | Orchestrates picking, packing, shipping per warehouse |
| Delivery Orchestrator | Routes to carriers (3 partners), calculates delivery slots |
| Returns Processing | Handles 7 different return paths depending on channel and item type |

## Delivery Slot Calculation
- Slots depend on warehouse capacity templates modified by operations directly in production
- Different calculation for standard delivery (parcel) vs large-item delivery vs click & collect
- The Delivery Orchestrator queries each carrier's availability API and merges results
- When a carrier API is slow (>3s), the orchestrator returns partial results without flagging it

## Known Operational Quirks
- Split orders (items from different warehouses) have special routing logic built during a holiday surge. Never properly documented. The logic lives in a 400-line config file that one engineer understands.
- Returns processing has 7 paths: in-store return of online order, in-store return of store order, mail return with label, mail return without label, exchange, damaged item, and warranty claim. The rules for which path to use are partially in code, partially in a spreadsheet maintained by the returns team.
- Warehouse capacity templates have no validation on values. Operations can enter negative numbers or dates in the past. The system processes them without error.
- The "holiday surge workaround" from 2024 is still active. It bypasses inventory reservation for orders under a certain value. The threshold was never reverted from the holiday setting.`
      },
      {
        name: 'carrier-integration.md',
        size: '0.7 KB',
        content: `# Carrier Integrations
| Carrier | API Version | Retry Policy | Known Issues |
|---------|------------|--------------|--------------|
| CarrierA | v3.2 | 3 retries, exponential backoff | Timeout after 5s returns empty slots (not error) |
| CarrierB | v2.1 (legacy) | No retry | Webhook delivery unreliable on weekends |
| CarrierC | v4.0 | 3 retries, fixed 2s delay | Rate limits at 100 req/min, no documentation on this |

Last integration audit: 8 months ago. CarrierB v2.1 is deprecated by the carrier but we haven't migrated.`
      }
    ]
  },

  'code-review': {
    name: 'Code Review Agent',
    files: [
      {
        name: 'knowledge-base.md',
        size: '2.8 KB',
        content: `# Engineering Team — Code Review Standards

## Architecture
Monorepo (Nx workspace). Frontend: Next.js + React. Backend: Node.js + Express. Database: PostgreSQL + Redis. CI/CD: GitHub Actions → Docker → Kubernetes.

## Review Checklist
1. Does the PR solve the stated problem? Check the linked issue.
2. Are there tests? Unit tests for business logic, integration tests for API endpoints.
3. Does it follow our patterns? Check against /docs/architecture-decisions/.
4. Security: No secrets in code, parameterized queries, input validation at boundaries.
5. Performance: No N+1 queries, pagination for list endpoints, Redis caching for hot paths.
6. Naming: camelCase for JS/TS, snake_case for DB columns, PascalCase for components.

## Architecture Conventions
- All API responses wrapped in { data, error, meta } envelope. No exceptions.
- Database migrations are forward-only. No down migrations. If you need to undo, write a new migration.
- Feature flags via LaunchDarkly. All new features behind a flag. No flags older than 90 days.
- Error handling: Custom error classes extending BaseError. Never throw raw strings.
- Logging: Structured JSON via Pino. Request ID propagated via X-Request-ID header.

## Known Tech Debt
- The user service still uses Sequelize ORM while everything else uses Prisma. Migration planned for Q3 but keeps slipping.
- There's a shared utility file (lib/helpers.ts) with 2,400 lines. Nobody wants to refactor it because 47 files import from it.
- The notification system uses polling instead of WebSocket. "Temporary" since 2024.
- Test coverage is 72% overall but 23% for the payment module. The payment module was written by a contractor who didn't write tests.`
      },
      {
        name: 'security-patterns.md',
        size: '0.6 KB',
        content: `# Security Patterns

## Authentication
- JWT tokens with 15-min access / 7-day refresh. Stored in httpOnly cookies, not localStorage.
- API keys for service-to-service: rotated quarterly via Vault. Last rotation: 6 weeks ago.
- Rate limiting: 100 req/min per user for API, 1000 req/min for service accounts.

## Data Protection
- PII encrypted at rest (AES-256) and in transit (TLS 1.3).
- Database row-level security for multi-tenant data. Tenant ID in every query WHERE clause.
- Audit log for all data mutations. Retention: 2 years. Stored in separate audit-db.
- GDPR: Data deletion request = soft delete + 30-day hard delete cron job. The cron job has failed silently twice this year.`
      }
    ]
  }
};
