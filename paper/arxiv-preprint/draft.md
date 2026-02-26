# Demand-Driven Context: A Methodology for Building Enterprise Knowledge Bases Through Agent Failure

**Authors:** Raj Navakoti

**Abstract:**

Large language model agents demonstrate expert-level reasoning and processing capabilities, yet consistently fail on enterprise-specific tasks due to missing domain knowledge — terminology, system descriptions, data models, and architectural decisions that exist only as tribal knowledge. Current approaches to this problem fall into two categories: top-down knowledge engineering (document everything, then test) and fully automated context optimization (let agents learn by themselves). Both have fundamental limitations: top-down efforts produce bloated, untested knowledge bases; automated approaches optimize execution strategies but cannot acquire domain knowledge that exists only in human heads. We present Demand-Driven Context (DDC), a methodology that uses agent failure on real problems as the primary signal for what domain knowledge to curate. Inspired by Test-Driven Development, DDC inverts the knowledge engineering process: instead of curating knowledge and hoping it's useful, DDC gives agents real problems, observes where they fail, and curates only the minimum context needed to succeed. We describe the methodology, its entity meta-model, and a convergence hypothesis suggesting that 20–30 problem cycles produce a knowledge base sufficient for a given domain role. We demonstrate DDC through a complete worked example in the healthcare claims domain, showing how five DDC cycles produce a reusable knowledge base of 41 entities. Finally, we propose a scaling architecture for enterprise adoption that introduces semi-automated curation with human governance, enabling parallel problem-solving across teams.

**Keywords:** context engineering, knowledge acquisition, LLM agents, enterprise AI, demand-driven curation, domain knowledge management

---

## 1. Introduction

<!-- ~1.5 pages -->
<!-- [IMAGE 1: The Memento Parallel — optional, a small figure showing Leonard's condition mapped to the agent's condition. Could be a simple 2-column comparison. Place near the opening paragraph if used.] -->

Give a large language model a problem in software architecture, medicine, or law, and it performs remarkably well. Give it a problem specific to *your* enterprise — one involving your systems, your terminology, your architectural decisions — and it performs like a new employee on their first day. Expert reasoning. Zero institutional memory.

This is not a model capability problem. Modern LLMs score 10/10 on general expertise (domain-driven design, integration patterns, architectural thinking) and 10/10 on processing power (reasoning, analysis, synthesis). They score 0/10 on enterprise domain knowledge — the terminology, system descriptions, data models, business rules, and architectural history that exist only as tribal knowledge distributed across wikis, Slack threads, and the heads of senior engineers.

The enterprise AI community has recognized this gap. Retrieval-Augmented Generation (RAG) attempts to bridge it by retrieving relevant documents at query time [cite]. But RAG retrieves — it does not curate. It surfaces existing documents without verifying their relevance, currency, or completeness. When the knowledge exists only as tribal knowledge — undocumented, fragmented, or outdated — RAG has nothing to retrieve.

More recently, agentic approaches have emerged. ACE [Zhang et al., 2025] treats LLM contexts as evolving "playbooks" that improve through automated feedback loops. Reflexion [Shinn et al., 2023] enables agents to learn from their own failures. ExpeL [Zhao et al., 2023] extracts reusable insights from agent experience. These systems optimize *how agents behave* — execution strategies, tool-use patterns, reasoning heuristics. But they cannot acquire the enterprise domain knowledge that makes those strategies meaningful. An agent that has learned excellent reasoning strategies still cannot answer "Why does our allocation system make two API calls instead of one?" without someone providing that context.

We propose **Demand-Driven Context (DDC)**, a methodology that treats agent failure as the primary signal for what enterprise knowledge to curate. The core insight is borrowed from Test-Driven Development: just as TDD writes a failing test before writing code, DDC gives an agent a failing problem before curating context. The agent's failure identifies precisely what domain knowledge is missing. A human expert then curates only the minimum context needed for the agent to succeed. This curated knowledge is structured using a typed entity meta-model, stored as version-controlled markdown files, and accumulated across cycles.

DDC makes three claims:

1. **Agent failure is a reliable signal** for identifying knowledge gaps in enterprise domains.
2. **Human-curated, demand-driven knowledge** is more efficient and more accurate than top-down documentation or automated context optimization.
3. **Convergence**: after 20–30 DDC cycles for a given domain role, the knowledge base stabilizes — each new problem requires fewer new entities because previous cycles already curated overlapping knowledge.

In this paper, we describe the DDC methodology (Section 3), demonstrate it through a complete worked example in the healthcare claims domain (Section 4), present a scaling architecture for enterprise adoption (Section 5), and discuss limitations and future work (Sections 6–7).

---

## 2. Background and Related Work

<!-- ~1.5 pages -->

DDC sits at the intersection of three established research areas: knowledge acquisition, failure-driven learning for LLM agents, and context engineering.

### 2.1 Knowledge Acquisition and Engineering

The challenge of acquiring domain knowledge for intelligent systems has been studied since the 1980s. Pazzani [1986] demonstrated failure-driven knowledge base refinement, where system failures triggered targeted knowledge acquisition from human experts. This principle — failure as a signal for what to learn — is foundational to DDC, though DDC modernizes it for the era of LLM agents and structured markdown knowledge bases rather than expert systems and production rules.

More recently, the Agent-in-the-Loop (AITL) framework at Airbnb [Zhao et al., 2025] embedded human feedback directly into live customer support operations. AITL includes a "Missing Knowledge Identification" step where human agents flag knowledge gaps that feed back into a unified knowledge base. This shares DDC's insight that humans must identify certain knowledge gaps, but AITL is specific to customer support dialogue and does not generalize to a reusable methodology for arbitrary enterprise domains.

CUGA [IBM, 2025] similarly uses enterprise agent failures to inject targeted knowledge, demonstrating that failure-driven knowledge enrichment improves agent performance in enterprise settings. However, CUGA focuses on conversational agents and does not propose a systematic curation methodology.

### 2.2 Failure-Driven Learning for LLM Agents

Several recent works enable LLM agents to learn from their own failures. Reflexion [Shinn et al., 2023] introduces a verbal reinforcement loop where agents reflect on task failures and maintain a persistent memory of reflections. ExpeL [Zhao et al., 2023] extracts reusable insights from agent experiences, building a growing knowledge base of task-solving strategies. Both systems are fully automated — the agent generates, evaluates, and curates its own knowledge.

<!-- [IMAGE 2: Related Work Positioning Diagram — A 2x2 or Venn diagram showing DDC's position relative to ACE, Reflexion/ExpeL, AITL, and RAG. Axes could be "Automated ↔ Human-Curated" and "Strategy Knowledge ↔ Domain Knowledge". DDC occupies the Human-Curated × Domain Knowledge quadrant. Place after the ACE discussion.] -->

ACE (Agentic Context Engineering) [Zhang et al., 2025] is the closest related work. ACE treats LLM contexts as evolving "playbooks" improved through a three-role architecture: Generator (attempts tasks), Reflector (analyzes failures), and Curator (synthesizes insights into persistent context). ACE achieves +10.6% on agent benchmarks and +8.6% on domain-specific finance tasks through fully automated context evolution.

DDC and ACE share the principle of iterative, feedback-driven context improvement. However, they differ in three fundamental ways:

1. **Knowledge type.** ACE optimizes execution strategies — how the agent should behave (tool-use patterns, reasoning heuristics). DDC curates domain knowledge — what the enterprise knows (system descriptions, terminology, data models, architectural decisions). These are complementary: ACE could optimize an agent's reasoning strategy while DDC provides the domain knowledge that strategy operates on.

2. **Human role.** ACE is fully automated. DDC requires a human domain expert to provide answers that exist only as tribal knowledge. No amount of automated reflection can discover that "our allocation system makes two API calls because the first call explores multi-warehouse options without weight data, and the second call confirms with full item details" — this knowledge exists only in human heads.

3. **Output structure.** ACE produces "playbook bullets" — unstructured text appended to context. DDC produces typed, version-controlled knowledge entities with YAML frontmatter, explicit relationships, and a defined meta-model. This structure enables navigation, validation, and reuse across agents and humans.

### 2.3 Context Engineering

The term "context engineering" has gained prominence through recent work by Karpathy [2025] and Anthropic [2025], describing the practice of systematically determining what information an LLM agent needs in its context window. DDC can be understood as a *methodology for context engineering* — it provides a systematic process for determining what context should exist, not just how to retrieve or arrange existing context.

Karidi et al. [2025] describe a demand-driven curation feedback loop in digital archives, where user search frequency drives metadata enrichment priorities. While applied to archival science rather than software agents, this work independently validates the core DDC principle: let demand (actual usage patterns) drive curation effort rather than attempting comprehensive coverage upfront.

### 2.4 Novelty of DDC

No existing work combines all four of DDC's core components: (a) agent failure as the primary signal for knowledge gaps, (b) human-curated structured knowledge entities with a typed meta-model, (c) a convergence hypothesis for knowledge base completeness, and (d) a formalized methodology with defined artifacts, analogous to TDD. Table 1 summarizes the gap.

<!-- [TABLE 1: Novelty gap matrix — rows are (a), (b), (c), (d), (a+b), (a+b+c), (a+b+c+d). Columns: "Found in literature?" with Yes/Partial/No. Final row (a+b+c+d) = No — DDC is novel. Place here.] -->

| Component | Description | Found in Literature? |
|-----------|-------------|---------------------|
| (a) Agent failure as signal | Agent fails, identifies gaps | Yes — ACE, Reflexion, ExpeL |
| (b) Human-curated structured knowledge | Typed entities, YAML frontmatter, meta-model | Partial — AITL |
| (c) Convergence hypothesis | 20–30 cycles → coverage stabilizes | No |
| (d) Formalized named methodology | DDC loop, TDD analogy, defined artifacts | Partial — ACE |
| (a+b) | Failure-driven + human-curated structured KB | **No** |
| (a+b+c) | Above + convergence claim | **No** |
| (a+b+c+d) | Full DDC synthesis | **No — DDC is novel** |

---

## 3. The DDC Methodology

<!-- ~2.5 pages -->

### 3.1 Overview

DDC is a cyclic methodology for building enterprise knowledge bases. Each cycle is triggered by a real problem — a vendor integration question, an architectural design task, a cross-team coordination challenge. The agent attempts the problem with its current knowledge, fails, identifies what's missing, and the human curates only what's needed.

<!-- [IMAGE 3: The DDC Loop — This is the key figure of the paper. A circular/flowchart diagram showing the 9 steps of the DDC cycle. Should be prominent, roughly half-page width. Steps: (1) Real Problem Arrives → (2) Create Sandbox → (3) Agent Attempts (zero context) → (4) Agent Identifies Gaps (information checklist) → (5) Human Fills Gaps → (6) Agent Re-Attempts → (7) Human Validates Output → (8) Graduate Content to Knowledge Base → (9) Log Cycle. Arrow from (7) back to (5) labeled "If incomplete". Arrow from (9) forward to next cycle. Place at the start of Section 3.] -->

### 3.2 The DDC Cycle

A single DDC cycle proceeds through nine steps:

**Step 1: Real Problem Arrives.** A concrete problem requiring domain expertise enters the system. This is not a synthetic exercise — it is a real question that needs answering for business operations to proceed. Examples include: a vendor asking integration questions, a design review requiring architectural reasoning, or a data model review requiring understanding of business rules.

**Step 2: Create Sandbox.** A workspace is created for the problem, containing the problem description and source documents. This isolation prevents work-in-progress from contaminating the curated knowledge base.

**Step 3: Agent Attempts (Zero/Current Context).** The agent attempts to solve the problem using only its general capabilities and whatever domain knowledge has been curated in previous cycles. In the first cycle, this means zero domain context.

**Step 4: Agent Identifies Gaps.** The agent produces an *information checklist* — a structured list of what it needs to answer the problem. This checklist is organized by knowledge type: terminology needing definition, systems needing documentation, reference data needed, business logic needing explanation.

**Step 5: Human Fills Gaps.** A domain expert provides targeted answers for each checklist item. This is the critical human-in-the-loop step. The expert provides only what's needed — not a comprehensive brain dump, but minimum viable context for the specific problem.

**Step 6: Agent Re-Attempts.** With the new context, the agent attempts the problem again. If the output is still incorrect or incomplete, the cycle returns to Step 4.

**Step 7: Human Validates Output.** The domain expert reviews the agent's output for correctness. Minor corrections are incorporated. This validation step ensures that curated knowledge produces correct reasoning.

**Step 8: Graduate Content.** Validated knowledge is structured as typed entities (see Section 3.3) and moved from the sandbox to the permanent knowledge base in the correct location based on entity type.

**Step 9: Log Cycle.** The cycle is recorded as a structured log entry containing: problem input, agent's initial performance, information checklist, entities created/updated, agent's final performance, and human review notes. These logs provide the data for convergence analysis.

### 3.3 The Entity Meta-Model

DDC knowledge is organized as typed entities stored as markdown files with YAML frontmatter. The meta-model defines the following entity types:

<!-- [TABLE 2: Entity types table — columns: Type, Description, Example. Rows for each entity type: jargon-business, jargon-tech, system, capability, data-model, api, team, persona, decision, reference-data. Place here.] -->

| Type | Description | Example |
|------|-------------|---------|
| `jargon-business` | Business terminology specific to the domain | "Adjudication", "Pre-Authorization" |
| `jargon-tech` | Technical terminology and acronyms | "EDI 837", "HL7 FHIR" |
| `system` | Software systems with ownership and purpose | "Claims Gateway", "Rules Engine" |
| `capability` | Business capabilities the domain provides | "Claims Processing", "Provider Management" |
| `data-model` | Core data structures and their relationships | "Claim", "Member", "Provider" |
| `api` | API contracts and integration points | "Claims Submission API" |
| `team` | Organizational units with ownership boundaries | "Claims Operations" |
| `persona` | User roles and their needs | "Claims Adjudicator" |
| `decision` | Architectural decisions (ADR format) | "Batch vs Real-Time Processing" |
| `reference-data` | Enumerations and lookup values | "Claim Statuses", "Service Types" |

Each entity file follows a consistent format:

```yaml
---
type: system
id: claims-gateway
name: Claims Gateway
description: Ingests and validates incoming claims from providers
status: active
related_systems: [rules-engine, eligibility-service]
implements_capability: claims-processing
---

# Claims Gateway

## Overview
[Prose description of the system, its purpose, and ownership]

## Key Details
[Technical details, integration patterns, constraints]
```

This structure serves dual purposes: humans read the prose; machines parse the frontmatter for navigation, relationship traversal, and validation.

### 3.4 The TDD Parallel

Engineers will recognize DDC's structure in Test-Driven Development. TDD writes a failing test, then the minimum code to pass. DDC gives the agent a failing problem, then the minimum context to succeed. Both methodologies share the principle of letting demand drive supply — you don't write all the tests upfront, and you don't curate all the context upfront.

This parallel extends to the development lifecycle:

- **Red** (TDD) = Agent fails on problem (DDC)
- **Green** (TDD) = Agent succeeds with new context (DDC)
- **Refactor** (TDD) = Graduate content to proper knowledge base locations (DDC)

### 3.5 The Convergence Hypothesis

We hypothesize that DDC exhibits convergence behavior: as more cycles are completed for a given domain role, each subsequent cycle requires fewer new entities because previous cycles have already curated overlapping knowledge.

<!-- [IMAGE 4: Convergence Curve — A line chart showing "New entities per cycle" (y-axis) vs "Cycle number" (x-axis). The curve should show a power-law decay — high entity creation in early cycles, diminishing returns in later cycles. Annotate with "coverage %" on a secondary y-axis showing cumulative coverage approaching an asymptote. This is a key figure for the convergence claim. Place here.] -->

Formally, if $e_n$ is the number of new entities created in cycle $n$, and $r_n$ is the number of entities reused from previous cycles, we expect:

- $e_n$ follows a power-law decay: $e_n \propto n^{-\alpha}$ for some $\alpha > 0$
- $r_n / (e_n + r_n)$ increases monotonically — each cycle reuses a larger fraction of existing knowledge
- After approximately 20–30 cycles, $e_n \approx 0$ for most problems within the domain role's scope

This convergence is a hypothesis, not yet validated at scale. Section 4 presents preliminary evidence from synthetic cycles. Full validation with real enterprise data is ongoing work.

---

## 4. Worked Example: Healthcare Claims

<!-- ~2 pages -->

To demonstrate DDC in practice, we present a complete worked example in the healthcare claims processing domain. This is a synthetic but realistic domain — entities, systems, and business rules are representative of real healthcare claims operations but do not reflect any specific organization.

### 4.1 Domain Setup

The healthcare claims domain involves processing insurance claims from healthcare providers. Key activities include claim submission, eligibility verification, pre-authorization checks, adjudication (determining payment), and payment processing. The domain has multiple systems, complex business rules, and specialized terminology — characteristics shared with most enterprise domains.

We start with an empty knowledge base and run five DDC cycles triggered by realistic problems.

### 4.2 Cycle 1: Vendor Integration Questions

**Problem:** A new claims engine vendor asked three integration questions: (1) Why does adjudication require a pre-authorization lookup? (2) Who owns eligibility decisions — member eligibility vs. provider eligibility? (3) Should claim processing be batch or real-time?

**Agent Before (Zero Context):** The agent produced generic healthcare answers. It could not explain the pre-authorization decision code branching logic. It conflated member eligibility with provider eligibility. It gave a non-committal batch vs. real-time answer without referencing actual claim types or SLAs.

**Information Checklist Generated:**
- Claims lifecycle stages and transitions
- Systems involved in adjudication
- Pre-authorization dependency and decision code branching
- Member vs. provider eligibility ownership
- Claim formats (EDI 837 professional vs. institutional)
- Processing modes and SLAs

**Human Input:** Domain expert provided specific details on pre-auth branching logic (approved/denied/not-required), clarified that member eligibility is owned by Eligibility Service while provider eligibility (network status) is owned by Provider Directory, and explained that professional claims are real-time (30s SLA) while institutional are batch (4-hour window).

**Entities Created:** 8 — adjudication, pre-authorization (jargon-business); claims-gateway, rules-engine, eligibility-service, pre-auth-service, provider-directory (system); claims-processing (capability).

**Agent After:** All three answers contained specific system names, ownership boundaries, branching logic, and SLAs. The vendor could design their integration from these answers alone.

### 4.3 Cycles 2–5: Accumulating Knowledge

<!-- [TABLE 3: Cycle summary table — columns: Cycle, Problem, New Entities, Reused Entities, Total KB Size. Show all 5 cycles. Place here.] -->

| Cycle | Problem | New Entities | Reused Entities | Total KB Size |
|-------|---------|-------------|-----------------|---------------|
| 001 | Vendor integration questions | 8 | 0 | 8 |
| 002 | Pre-auth adjudication dependency | 7 | 3 | 15 |
| 003 | Provider eligibility ownership | 6 | 4 | 21 |
| 004 | Batch vs real-time claims | 5 | 6 | 26 |
| 005 | Fraud detection integration | 5 | 8 | 31 |

Two patterns emerge from these five cycles:

1. **New entities per cycle decrease:** From 8 in cycle 1 to 5 in cycles 4–5. The agent requires less new knowledge because foundational entities (adjudication, claims-gateway, rules-engine) were already curated.

2. **Reused entities per cycle increase:** From 0 in cycle 1 to 8 in cycle 5. Each new problem benefits from knowledge curated for previous problems.

<!-- [IMAGE 5: Healthcare Claims Convergence — A dual-axis chart. Left axis: "New entities" (bars, decreasing). Right axis: "Reused entities" (line, increasing). X-axis: cycle number 1–5. This is the empirical evidence for convergence in the worked example. Place here.] -->

While five cycles are insufficient to validate full convergence, the trend is consistent with the hypothesis. The reuse ratio ($r_n / (e_n + r_n)$) increases from 0.0 to 0.62 across five cycles.

### 4.4 Knowledge Base Structure

After five cycles, the healthcare claims knowledge base contains 41 entities organized across the DDC meta-model:

<!-- [TABLE 4: Entity breakdown by type — columns: Entity Type, Count, Examples. Place here.] -->

| Entity Type | Count | Examples |
|-------------|-------|---------|
| `jargon-business` | 12 | adjudication, pre-authorization, deductible, copay, EOB |
| `system` | 8 | claims-gateway, rules-engine, provider-directory, fraud-detection |
| `capability` | 6 | claims-processing, provider-management, payment-processing |
| `data-model` | 6 | claim, member, provider, policy, benefit-plan, payment |
| `team` | 3 | claims-operations, provider-network, member-services |
| `persona` | 3 | claims-adjudicator, provider-relations-manager, member-services-rep |
| `api` | 3 | claims-submission-api, eligibility-check-api, payment-api |
| **Total** | **41** | |

The full knowledge base, including all entity files, cycle logs, and meta-model definitions, is available as a reproducible artifact at [repository URL].

---

## 5. Scaling DDC: A Proposed Architecture

<!-- ~1.5 pages -->

The DDC methodology as described in Section 3 requires a human domain expert to manually curate every entity. While effective for proving the concept, this creates a bottleneck in enterprise environments where multiple teams encounter problems simultaneously and domain experts' time is scarce.

We propose a scaling architecture that introduces semi-automated curation while preserving human governance as a quality gate.

<!-- [IMAGE 6: Scaling Architecture Diagram — The key figure for this section. Show: Multiple "Problem Sources" (Team A, Team B, Team C) feeding into parallel DDC cycles. Each cycle has an "Agent Curator" that does initial structuring. All curated entities flow into a "PR Review Queue" where human domain experts approve/reject/refine. Approved entities merge into the centralized Knowledge Base. Show the 20/80 split: 20% deep-curated entities, 80% lightweight stubs with links. Place at the start of Section 5.] -->

### 5.1 The Manual Curation Bottleneck

In the base DDC methodology, the human performs three roles:
1. **Information Provider** — answering the agent's checklist questions
2. **Entity Author** — structuring answers as typed entities with frontmatter
3. **Validator** — reviewing the agent's output for correctness

Roles 2 and 3 can be partially automated. The agent can draft entity files from human-provided answers (structured according to the meta-model), and validation can be decomposed into automated checks (schema validation, relationship consistency) and human judgment (domain correctness).

### 5.2 Semi-Automated Curation

In the proposed architecture, the DDC cycle is augmented:

- **Steps 1–5** remain unchanged — real problems drive the cycle, agents identify gaps, humans provide domain answers.
- **Step 6 (Enhanced):** The agent drafts structured entities from the human's answers, following the meta-model templates. The human reviews and corrects rather than authors from scratch.
- **Step 8 (Enhanced):** Graduated content is submitted as a pull request to the centralized knowledge base. Automated checks validate schema, relationships, and naming conventions. A human domain expert reviews for correctness and approves.

### 5.3 The 20/80 Curation Strategy

Not all domain knowledge requires deep curation. We propose a 20/80 strategy:

- **Deep curation (20%):** Entities that the agent needs to reason about — systems, business logic, architectural decisions, key terminology. These get full prose descriptions, explicit relationships, and detailed metadata.
- **Lightweight stubs (80%):** Entities that exist for reference but aren't central to reasoning — peripheral systems, rarely-used terminology, edge-case reference data. These get a one-line description and links to external sources.

The problem determines what falls in the 20%. Whatever the agent needs to answer the immediate question gets deep curation. Everything else gets a stub. Over time, stubs that are repeatedly referenced across cycles get promoted to deep curation — another form of demand-driven prioritization.

### 5.4 Parallel Problem-Solving with Centralized Governance

In an enterprise with multiple teams, DDC cycles can run in parallel:

- Team A encounters a claims processing question → triggers cycle A
- Team B encounters a provider eligibility question → triggers cycle B
- Both cycles produce curated entities that are submitted as pull requests to the same centralized knowledge base
- A domain steward reviews PRs for consistency, deduplication, and correctness
- Merge conflicts (two teams curating the same entity differently) are resolved through the PR review process

This architecture mirrors how software teams manage shared codebases through version control and code review. The knowledge base is treated as a shared codebase with the same governance — branching, pull requests, review, and merge.

### 5.5 Limitations of the Proposed Architecture

This scaling architecture is proposed but not yet validated. Key open questions include:

- **PR review bottleneck:** Does human review become the new bottleneck at scale?
- **Consistency at scale:** Can centralized governance maintain entity quality across dozens of parallel contributors?
- **20/80 threshold:** Is the ratio stable across domains, or domain-dependent?

Validating this architecture is planned future work.

---

## 6. Discussion

<!-- ~1 page -->

### 6.1 What DDC Claims vs. What Needs Validation

DDC makes claims at three levels of evidence:

1. **Demonstrated:** The DDC methodology (Section 3) has been applied in both synthetic (Section 4) and real enterprise settings. The cycle mechanics work: agents do identify knowledge gaps, human-curated context does improve agent performance, and entities are reused across cycles.

2. **Preliminary evidence:** The convergence trend (decreasing new entities, increasing reuse) is observed in five synthetic cycles. This is suggestive but not statistically significant. Validation with 20+ real enterprise cycles is ongoing.

3. **Proposed:** The scaling architecture (Section 5) is a design, not an implementation. Its effectiveness is hypothetical.

### 6.2 Relationship to Reinforcement Learning

DDC can be understood through a reinforcement learning lens. The agent's attempt is a policy execution. The human's validation is a reward signal. The knowledge base update is a policy update — not through weight modification but through context modification. The convergence hypothesis parallels the decreasing loss in RL training. This framing is conceptual rather than formal, but it suggests connections to the reward shaping and curriculum learning literature that may prove productive.

### 6.3 Limitations

**Human dependency.** DDC requires access to domain experts willing to answer agent-generated checklists. In organizations where expert time is scarce, this may limit adoption. The semi-automated architecture (Section 5) partially addresses this by reducing human effort from authoring to reviewing.

**Single-domain validation.** The healthcare claims example, while realistic, is synthetic. The convergence hypothesis requires validation across multiple real enterprise domains.

**Subjectivity of curation.** Different humans may curate different entities for the same problem. DDC does not prescribe how to resolve disagreements in curation, beyond the PR review process proposed in Section 5.

**No formal convergence proof.** The convergence hypothesis is empirically motivated but lacks formal analysis. Establishing theoretical bounds on convergence rates is future work.

---

## 7. Conclusion and Future Work

<!-- ~0.5 page -->

We have presented Demand-Driven Context (DDC), a methodology for building enterprise knowledge bases by using agent failure on real problems as the primary signal for what to curate. DDC combines failure-driven knowledge acquisition, human-curated structured entities, a convergence hypothesis, and a formalized development methodology analogous to TDD. Through a worked example in healthcare claims, we demonstrated that five DDC cycles produce a reusable knowledge base of 41 entities with increasing reuse across cycles.

DDC contributes a missing piece to the context engineering landscape: while existing work focuses on *retrieving* existing context (RAG) or *optimizing* agent execution strategies (ACE, Reflexion), DDC addresses the upstream question of *what context should exist in the first place*.

### Future Work

**Convergence validation.** Ongoing work is collecting DDC cycle data from a real enterprise domain to validate the convergence hypothesis with 20+ cycles. We aim to characterize the convergence curve and determine whether the 20–30 cycle threshold holds across domains.

**Scaling architecture implementation.** The semi-automated architecture with PR governance (Section 5) will be implemented and evaluated in a multi-team enterprise setting.

**Multi-agent knowledge sharing.** DDC currently targets one domain role at a time. Investigating how knowledge bases for different roles (architect, product owner, engineer) overlap and can be shared is an open question.

**Formal convergence analysis.** Establishing theoretical bounds on DDC convergence rates, potentially through connections to curriculum learning and active learning theory.

**Automated curation quality metrics.** Developing metrics to assess the quality of curated entities beyond human review — measuring coherence, completeness, and consistency programmatically.

---

## References

<!-- To be filled with proper citations when porting to LaTeX -->

[Zhang et al., 2025] Q. Zhang, C. Hu, S. Upasani, et al. "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models." ICLR 2026. arXiv:2510.04618.

[Shinn et al., 2023] N. Shinn, F. Cassano, A. Gopinath, et al. "Reflexion: Language Agents with Verbal Reinforcement Learning." NeurIPS 2023.

[Zhao et al., 2023] A. Zhao, D. Huang, Q. Xu, et al. "ExpeL: LLM Agents Are Experiential Learners." arXiv:2308.10144.

[Zhao et al., 2025] C. M. Zhao, T. Zhang, H. Su, et al. "Agent-in-the-Loop: A Data Flywheel for Continuous Improvement in LLM-based Customer Support." EMNLP 2025 Industry Track.

[IBM, 2025] "CUGA: Conversational Understanding with Grounded Actions." IBM Research.

[Karidi et al., 2025] T. Karidi et al. "KG-Driven Active Archives." arXiv.

[Pazzani, 1986] M. J. Pazzani. "Failure-Driven Learning of Diagnosis Heuristics." AAAI 1986.

[Karpathy, 2025] A. Karpathy. "Context Engineering." Blog post / talk.

[Anthropic, 2025] Anthropic. "Building Effective Agents." Anthropic Research Blog.

---

## Appendix A: Entity Meta-Model Specification

<!-- [TABLE A1: Complete entity type specification from meta/entity-types.yaml. Include all types, required fields, optional fields, and relationship types. Place here.] -->

The complete entity meta-model, including all type definitions, relationship types, and file format specifications, is available in the accompanying repository under `meta/entity-types.yaml` and `meta/relationship-types.yaml`.

## Appendix B: DDC Cycle Log Format

Each DDC cycle is logged using the following structured format:

```yaml
---
cycle_id: "NNN"
problem_name: "Short problem description"
date_started: YYYY-MM-DD
date_completed: YYYY-MM-DD
time_spent_minutes: N  # approximate
entities_created: N
entities_updated: N
domain: "domain-name"
---

# Cycle NNN: Problem Name

## Problem Input
## Agent Before (Zero/Current Context)
## Information Checklist
## Human Answers
## Entities Curated
## Agent After (With Context)
## Human Review
## Context Reuse Notes
```

---

## Figure List (for Overleaf)

Summary of all images/figures to create:

| Figure | Description | Placement | Format Suggestion |
|--------|-------------|-----------|-------------------|
| **Fig. 1** | Memento Parallel (optional) | Section 1, near opening | Simple 2-column comparison diagram |
| **Fig. 2** | Related Work Positioning | Section 2.2, after ACE discussion | 2×2 quadrant: (Automated↔Human) × (Strategy↔Domain Knowledge) |
| **Fig. 3** | The DDC Loop | Section 3.1, start of methodology | Circular flowchart, 9 steps, ~half page |
| **Fig. 4** | Convergence Curve | Section 3.5, with hypothesis | Line chart: new entities decaying, coverage rising |
| **Fig. 5** | Healthcare Convergence Data | Section 4.3, after cycle table | Dual-axis bar+line chart from 5 cycles |
| **Fig. 6** | Scaling Architecture | Section 5, start of scaling | Architecture diagram: parallel teams → PR queue → central KB |
| **Table 1** | Novelty Gap Matrix | Section 2.4 | Already in text |
| **Table 2** | Entity Types | Section 3.3 | Already in text |
| **Table 3** | Cycle Summary | Section 4.3 | Already in text |
| **Table 4** | Entity Breakdown | Section 4.4 | Already in text |