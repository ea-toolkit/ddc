---
cycle_id: "012"
problem_name: dc-migration-order-failures
date_started: 2026-03-09
date_completed: 2026-03-09
time_spent_minutes: 30
entities_created: 6
entities_updated: 1
entities_reused: 7
confidence_before: 2
confidence_after: 4
human_score: 5
checklist_size: 16
domain: retailco
---

# Cycle 012 — DC Migration Order Failures

## Problem Input

RetailCo is migrating a major distribution center to a new system version. During migration, orders to that DC are failing and falling into error states. What could be the reason?

## Agent Before (Zero Context)

The agent completely misunderstood the problem. "DC" was interpreted as "Distribution Center" (a warehouse) and "migration" was interpreted as a software/WMS version upgrade. The agent searched for application-layer entities (OrderIntegrationHub routing rules, cross-compartment deployment errors, consumer shutdowns) and proposed causes like:

1. OrderIntegrationHub routing rule misconfiguration for new WMS version
2. Consumer shutdown during WMS migration (planned-maintenance-communication-gap)
3. Cross-compartment deployment error corrupting configuration
4. WMS status transition failures from schema differences

**Confidence: 2/5** — the agent knew it was guessing. It had no knowledge base coverage for data center migrations or infrastructure-layer failures.

**What was wrong:** "DC" means **Data Center** (a physical facility housing servers), not Distribution Center. "Migration" means **decommissioning a physical data center** and moving infrastructure to other locations — DNS servers, authentication servers, network equipment. This is an infrastructure-layer problem, not an application-layer one.

## Information Checklist

### Terminology I Need Defined
- [x] What "DC migration" means — data center decommissioning, not software upgrade
- [x] What "error state" means — warehouse terminals can't reach the network at all

### Systems I Need Documented
- [x] NetworkAuthenticationPlatform — wireless auth infrastructure
- [x] MaterialHandlingSystem — warehouse management solution distinct from WarehouseManagementSystem

### Business Logic I Need Explained
- [x] How data center migration affects warehouse operations
- [x] What infrastructure services warehouses depend on (DNS, auth, network)
- [x] The two specific failure modes from the regional data center migration

### Infrastructure I Need Described
- [x] DNS redundancy (or lack thereof) at warehouse sites
- [x] Load balancer configuration for authentication servers
- [x] Infrastructure dependency mapping (or lack thereof)

### Failure Details I Need
- [x] DNS SPOF — multi-hour outage, multiple distribution points affected
- [x] LB stale member — multi-hour outage, stores and warehouses affected
- [x] Root cause chain for each failure
- [x] Missing safeguards

### Unmapped Terms
- [x] Data center identifier → referred to generically as "a regional data center"
- [x] Network auth vendor/product → NetworkAuthenticationPlatform
- [x] Warehouse handling solution → MaterialHandlingSystem

## Human Answers

The user corrected the fundamental misunderstanding and provided detailed incident data:

**DC = Data Center.** Physical facility being decommissioned. Infrastructure migration, not software.

**Two incidents during regional data center migration (same day):**

1. **DNS SPOF (multi-hour outage):** Multiple distribution points had primary DNS pointing to a physical DNS server in the data center being decommissioned. No secondary DNS configured. When the DC went offline, DNS failed at those sites. Warehouse terminals, forklifts, label printers — total network loss. Took hours because nobody knew those sites lacked DNS redundancy.

2. **LB stale member (multi-hour outage):** Authentication servers (NetworkAuthenticationPlatform) were being migrated. Procedure: shut down → disable in LB → move. Someone shut down the server but forgot to disable it in the load balancer. LB kept routing auth requests to the dead server. Stores lost ModernStoreSellingApp, MaterialHandlingSystem, websites. Warehouses lost WarehouseManagementSystem access. Resolved when someone manually disabled the stale member.

**Systemic pattern:** No infrastructure dependency mapping. Nobody knows which sites depend on which infrastructure in which data centers. No monitoring for DNS resolution rates or auth success rates. Manual procedures with no automated validation.

## Entities Curated

| Entity | Type | Action | File |
|--------|------|--------|------|
| Data Center Migration | jargon-tech | Created | `entities/jargon-tech/data-center-migration.md` |
| DNS Single Point of Failure | jargon-tech | Created | `entities/jargon-tech/dns-single-point-of-failure.md` |
| Load Balancer Stale Member | jargon-tech | Created | `entities/jargon-tech/load-balancer-stale-member.md` |
| Network Authentication Platform | platform | Created | `entities/platforms/network-authentication-platform.md` |
| Material Handling System | system | Created | `entities/systems/material-handling-system.md` |
| Infrastructure Dependency Mapping Gap | jargon-tech | Created | `entities/jargon-tech/infrastructure-dependency-mapping-gap.md` |
| Orders Not Dropping | jargon-tech | Updated | `entities/jargon-tech/orders-not-dropping.md` |

## Agent After — Attempt 1 (Rejected)

The agent's RED phase answer was entirely wrong. It assumed:
- DC = Distribution Center (warehouse), not Data Center (physical facility)
- Migration = software/WMS version upgrade, not physical infrastructure decommissioning
- Failures = application-layer (routing rules, queue consumers, schema mismatches)

The human rejected this completely: "You're way off track with your guesses. DC migration has nothing to do with software versions or WMS upgrades."

### Human Correction

The user explained that DC = Data Center, migration = physical decommissioning, and the failures are infrastructure-layer (DNS, authentication, network) not application-layer. Provided two specific incidents with root cause chains, durations, and systemic analysis.

## Agent After — Attempt 2 (Accepted)

After curation, the agent correctly identified:

1. **DNS Single Point of Failure** — distribution points with single DNS server in the decommissioned DC, no secondary. Total network loss at affected sites. Multi-hour outage to diagnose.

2. **Load Balancer Stale Member** — authentication server shut down but not disabled in LB. LB routes auth traffic to dead server. Stores and warehouses lose access to all authenticated services. Multi-hour outage.

3. **Systemic root cause: Infrastructure Dependency Mapping Gap** — no registry mapping sites to infrastructure components to data centers. No pre-migration impact assessment possible. Failures discovered reactively.

4. **Cross-layer insight**: Connected this infrastructure-layer pattern to the existing application-layer `planned-maintenance-communication-gap` — same root problem (teams don't know who depends on them) at a different layer of the stack.

**Confidence: 4/5** — accurate diagnosis of failure modes and systemic gap. Remaining uncertainty: current state of monitoring and checklists post-incident.

## Human Review

**Score: 5/5**

The human validated all entities and the diagnosis. Key feedback:
- Complete mental model shift from application-layer to infrastructure-layer was correct
- Both failure modes accurately described
- Pattern abstraction (not just memorizing incidents) was noted as a strength
- Cross-layer insight connecting to planned-maintenance-communication-gap called "brilliant"
- Confidence calibration of 4/5 assessed as exactly right
- All 6 new entities and 1 update assessed as excellent
