here's what I know about our claims processing:

adjudication is when we evaluate a submitted claim against the members benefit plan rules, fee schedules and regulatory requirements to figure out how much to pay. the rules engine does this. its a vendor product we bought, currently being replaced. the claims ops team maintains the rules even though vendor provides the platform.

the key thing is pre-auth. before adjudication can run, the rules engine MUST look up the pre-authorization decision. there are 3 decision codes:
- approved = apply normal in-network cost sharing rules (deductible, copay, coinsurance)
- denied = auto-deny the claim with reason code PA-DENY
- not-required = skip pre-auth check entirely, go straight to normal adjudication

this branching is critical because the wrong path means wrong payment.

the systems involved:
1. claims gateway - single entry point for all claims. takes EDI 837 professional and institutional. professional claims (CMS-1500) process real-time with 30 second SLA. institutional (UB-04) are batch with 4 hour window. owned by claims-operations team.
2. rules engine - the adjudication engine. vendor product. evaluates claims against benefit plans, provider contracts, fee schedules, medical policies. produces pay/deny/pend disposition.
3. pre-auth service - manages prior authorization lifecycle. accepts requests, evaluates against clinical criteria, issues determinations. target 60% auto-approval. standard auth valid 90 days, surgical 60 days.

claims gateway sends validated claims to rules engine. rules engine calls pre-auth service to get the decision code before running adjudication rules.
