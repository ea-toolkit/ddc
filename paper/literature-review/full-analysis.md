# DDC Literature Review — Full Analysis

**Date:** February 16, 2026
**Sources:** Google Scholar (manual search), Perplexity AI (automated search), 20+ downloaded papers
**Verdict:** GO — DDC's synthesis is novel

---

## Threat Level: Requires Careful Differentiation

### 1. ACE — Agentic Context Engineering

- **Paper:** "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models"
- **Authors:** Qizheng Zhang, Changran Hu, Shubhangi Upasani, Boyuan Ma, et al.
- **Affiliation:** Stanford University, SambaNova Systems, UC Berkeley
- **Venue:** ICLR 2026 (arXiv:2510.04618)
- **Year:** 2025

**Core claim:** Treats LLM contexts as evolving "playbooks" that accumulate, refine, and organize strategies through a three-role architecture (Generator → Reflector → Curator). Execution feedback — not labeled supervision — drives improvements. +10.6% on agent benchmarks, +8.6% on finance tasks.

**DDC overlap:**
- Feedback-driven iterative loop (component a)
- Structured incremental knowledge output (partial b)
- Self-improvement convergence (partial c)
- Named formalized methodology (d)

**Critical differences from DDC:**
- **Fully automated** — no human-in-the-loop. ACE's Curator is an LLM agent, not a human expert
- **Strategy knowledge, not domain knowledge** — ACE learns *how to behave* (execution strategies, tool-use patterns). DDC curates *what the enterprise knows* (terminology, system descriptions, data models, architectural decisions)
- **No enterprise KB artifacts** — ACE produces "playbook bullets." DDC produces structured markdown files with YAML frontmatter organized by knowledge type
- **No explicit convergence claim** — no 20-30 cycle threshold, no power law analysis
- **No TDD analogy** — ACE is framed as prompt/context optimization, not as a development methodology
- **Brevity bias concern** — ACE paper itself notes that compression-based approaches lose domain-specific heuristics. DDC avoids this by design through structured, typed entities

**Paper action:** Must cite. Differentiate explicitly in Related Work. DDC answers "what domain knowledge should exist?" while ACE answers "what execution strategies should the agent use?" They are complementary.

**Differentiation argument for DDC paper:**
> "ACE (Zhang et al., 2025) is the closest related work. Both frameworks use iterative feedback to evolve persistent context. However, ACE is fully automated and focuses on execution strategy optimization (tool-use patterns, reasoning heuristics), while DDC is human-in-the-loop and targets enterprise domain knowledge curation (system descriptions, terminology, data models, architectural decisions). ACE's output is strategy bullets; DDC's output is structured knowledge entities with typed relationships. The two are complementary: ACE could optimize an agent's reasoning strategy, while DDC provides the domain knowledge that strategy operates on."

---

### 2. Agent-in-the-Loop / AITL

- **Paper:** "Agent-in-the-Loop: A Data Flywheel for Continuous Improvement in LLM-based Customer Support"
- **Authors:** Cen Mia Zhao, Tiantian Zhang, Hanchen Su, et al.
- **Affiliation:** Airbnb
- **Venue:** EMNLP 2025 Industry Track (arXiv:2510.06674)
- **Year:** 2025

**Core claim:** Embeds human feedback directly into live customer support operations, including a "Missing Knowledge Identification" step where human agents flag knowledge gaps that feed back into the unified knowledge base.

**DDC overlap:**
- Humans identifying knowledge gaps during live operations (components a+b)
- Iterative improvement of a knowledge base

**Critical differences:**
- AITL is a **data flywheel for model retraining**, not a methodology for curating a standalone knowledge base
- The "missing knowledge" step is one of four annotation types, not the primary driver
- No structured knowledge artifacts (markdown, YAML). Missing knowledge feeds into retrieval training data
- No convergence claim, no TDD analogy, no formalized methodology
- Enterprise customer support focus, not general enterprise architecture/domain knowledge

**Paper action:** Cite as related work. AITL validates the idea that human identification of knowledge gaps improves AI systems, but targets model improvement rather than KB construction.

---

## Threat Level: Cite as Important Related Work

### 3. Reflexion

- **Paper:** "Reflexion: Language Agents with Verbal Reinforcement Learning"
- **Authors:** Noah Shinn, Federico Cassano, Ashwin Gopinath, et al.
- **Venue:** NeurIPS 2023 (arXiv:2303.11366)
- **Year:** 2023

**Core claim:** LLM agents learn from failure through self-reflection — agent attempts task, fails, generates verbal feedback, retries with improved strategy. 97% on AlfWorld, SOTA on HumanEval.

**DDC overlap:** Shares component (a) — failure as the signal for learning. The attempt→fail→reflect→retry loop is structurally similar to DDC's outer loop.

**Critical differences:**
- Reflections are **ephemeral within-session** (not persistent)
- **Agent-generated** (not human-curated)
- Focuses on **execution strategy** (not domain knowledge)
- No persistent KB, no structured artifacts, no convergence claim

**Paper action:** Cite as key precursor. Reflexion established that agent failure is a productive learning signal. DDC extends this from execution strategy to domain knowledge curation.

**RL connection:** Reflexion is literally subtitled "Verbal Reinforcement Learning." This supports framing DDC as "reinforcement learning for context" in the paper — where the reward signal is human validation and the policy update is a knowledge base change rather than a weight update.

---

### 4. ExpeL — Experiential Learning Agent

- **Paper:** "ExpeL: LLM Agents Are Experiential Learners"
- **Authors:** Andrew Zhao, Daniel Huang, Quentin Xu, et al.
- **Venue:** AAAI 2024 (arXiv:2308.10144, 446+ citations)
- **Year:** 2023

**Core claim:** Agent autonomously gathers experiences from successes and failures, extracts cross-task knowledge as natural language "insights," and applies them to future tasks. Performance improves as experiences accumulate.

**DDC overlap:**
- Persistent natural language knowledge from task experience (components a + partial b + partial c)
- Lifecycle: gather experience → extract insights → apply to new tasks resembles DDC's outer loop

**Critical differences:**
- **Fully automated** (no human curation)
- Insights are about **task-solving strategies**, not enterprise domain knowledge
- No structured knowledge artifacts (markdown/YAML)
- No convergence claim or TDD analogy

**Paper action:** Cite as important related work. ExpeL demonstrates that persistent knowledge extracted from experience improves performance. DDC differs by insisting on human curation and targeting domain knowledge.

---

### 5. Voyager

- **Paper:** "Voyager: An Open-Ended Embodied Agent with Large Language Models"
- **Authors:** Guanzhi Wang et al.
- **Affiliation:** NVIDIA, Caltech, Stanford, UT Austin
- **Venue:** NeurIPS 2023
- **Year:** 2023

**Core claim:** First LLM-powered lifelong learning agent in Minecraft. Builds an ever-growing skill library of executable code. Uses environment feedback, execution errors, and self-verification for iterative improvement.

**DDC overlap:** Growing persistent library, iterative improvement driven by execution feedback, library persists for future problems.

**Critical differences:** Embodied agent in Minecraft, fully automated, skills are executable code (not human-curated domain knowledge), no enterprise context, no convergence claim.

**Paper action:** Cite as related work. Demonstrates value of persistent, growing libraries built from iterative execution.

---

### 6. Dynamic Cheatsheet

- **Paper:** "Dynamic Cheatsheet: Test-Time Learning with Adaptive Memory"
- **Authors:** Mirac Suzgun, Mert Yuksekgonul, Federico Bianchi, Dan Jurafsky, James Zou
- **Affiliation:** Stanford
- **Venue:** arXiv, April 2025 (precursor to ACE)
- **Year:** 2025

**Core claim:** LLMs autonomously maintain a "cheatsheet" — a non-parametric memory that evolves by recording insights. Claude 3.5 Sonnet's AIME score more than doubled.

**DDC overlap:** Evolving persistent memory, iterative improvement from problem-solving, curated knowledge reuse.

**Critical differences:** Fully automated, math/reasoning strategies, no human curation, no enterprise domain, no structured artifacts.

**Paper action:** Cite as related work. Part of the ACE lineage.

---

### 7. STARS — Knowledge Extraction from LLMs for Task Learning

- **Paper:** "Improving Knowledge Extraction from LLMs for Task Learning through Agent Analysis"
- **Authors:** James R. Kirk, Robert E. Wray, Peter Lindes, John E. Laird
- **Venue:** AAAI 2024 (arXiv:2306.06770)
- **Year:** 2023

**Core claim:** Cognitive-agent approach where the agent extracts task knowledge from LLMs, evaluates and repairs it, with optional human oversight. 100% task completion with human oversight.

**DDC overlap:** Human oversight + agent knowledge extraction + iterative refinement.

**Critical differences:** Extracts knowledge *from* LLMs (not from human experts), for embodied task learning (not enterprise KB), no persistent structured KB, no convergence claim.

**Paper action:** Cite for human-in-the-loop knowledge refinement value. The 100% completion with human oversight vs lower without is strong evidence for DDC's design choice.

---

### 8. CUGA — IBM Enterprise Agent

- **Paper:** "Towards Enterprise-Ready Computer Using Generalist Agent"
- **Authors:** Sami Marreed, Alon Oved, Avi Yaeli, et al.
- **Affiliation:** IBM Research
- **Venue:** IAAI-26 (arXiv:2503.01861)
- **Year:** 2025

**Core claim:** IBM's enterprise agent uses iterative failure analysis → knowledge injection → context enrichment → retry. Section 3.4: "Planner Alignment through Context Enrichment, Learning, and Knowledge Injection" where failure analysis reveals knowledge deficits.

**DDC overlap:** Enterprise context, failure analysis driving knowledge injection, iterative improvement.

**Critical differences:**
- Knowledge injection is **developer-driven prompt engineering**, not a formalized methodology
- No structured knowledge artifacts, no named methodology, no convergence claim, no TDD analogy
- CUGA is an engineering system, DDC is a methodology

**Paper action:** Cite as related work. CUGA validates the enterprise reality DDC addresses — agents fail due to missing domain knowledge — but doesn't formalize a methodology for solving it. CUGA is the problem; DDC is the systematic solution.

**Key insight from paper:** IBM's iterative evaluate→analyze→enhance cycle (Figure 1 in their paper) is structurally similar to DDC but operates at the system engineering level, not the knowledge curation level. They identify failure categories and inject fixes as prompt changes. DDC identifies knowledge gaps and injects fixes as structured entities.

---

### 9. KG-Driven RAG for Active Archives (NEW — not in Perplexity analysis)

- **Paper:** "Towards a Knowledge-Graph-Driven Retrieval-Augmented Generation for Exploring and Curating Active Archives"
- **Authors:** Danae Pla Karidi, Christos Chrysanthopoulos, Ioannis Triantafyllou
- **Affiliation:** Archimedes/Athena Research Center, University of West Attica
- **Venue:** SEMANTiCS 2025
- **Year:** 2025

**Core claim:** Proposes a feedback loop between exploration and curation — when a topic is searched frequently, the system flags it for archivists who add/refine metadata. Updates appear in user-facing exploration in real-time, creating a "living archive."

**DDC overlap:** This is the closest conceptual match to DDC's demand-driven principle outside the LLM agent space:
- Demand (user searches) drives curation decisions
- Human curators (archivists) perform the actual curation
- Curation is incremental and targeted, not top-down
- Output is structured metadata (comparable to DDC's structured entities)
- Feedback loop: exploration reveals gaps → curator enriches → exploration improves

**Critical differences:**
- Signal is **search frequency**, not agent failure
- Domain is **digital archives**, not enterprise AI agents
- No LLM agent attempting to solve problems
- No convergence claim
- No formalized methodology or TDD analogy
- Vision paper (not yet implemented/evaluated)

**Paper action:** Must cite. This paper independently arrived at a demand-driven curation principle from a completely different field (digital humanities/archival science). This strengthens DDC's theoretical grounding — the principle is domain-agnostic.

**Differentiation argument:**
> "Karidi et al. (2025) propose a similar demand-driven principle for digital archive curation, where user search frequency signals what metadata to enrich. DDC differs in three ways: (1) the signal is agent failure, not search frequency — a stronger, more specific indicator of what knowledge is missing; (2) the output is a structured knowledge base designed for LLM consumption, not metadata tags; (3) DDC formalizes the process as a named methodology with defined artifacts and a convergence claim."

---

### 10. Knowledge Engineering using Large Language Models

- **Paper:** "Knowledge Engineering using Large Language Models"
- **Authors:** Bradley P. Allen, Lise Stork, Paul Groth
- **Venue:** Transactions on Graph Data and Knowledge (arXiv:2310.00637)
- **Year:** 2023

**Core claim:** Outlines LLMs' role in knowledge engineering. Two directions: hybrid neuro-symbolic systems and natural language knowledge engineering. "Knowledge elicitation could be conducted entirely within natural language."

**Paper action:** Cite as framing. Sets the stage for DDC by arguing LLMs transform knowledge engineering.

---

## Threat Level: Cite as Historical/Conceptual Precursors

### 11. Failure-Driven Learning in Expert Systems

- **Paper:** "Refining the Knowledge Base of a Diagnostic Expert System: An Application of Failure-Driven Learning"
- **Authors:** Michael J. Pazzani
- **Venue:** AAAI-86
- **Year:** 1986

**Core claim:** System failures (incorrect diagnoses) as signals to refine the expert system's KB through explanation-based learning.

**Paper action:** Cite as historical precursor. DDC claims lineage from Pazzani's failure-driven learning principle, updated for the LLM agent era.

---

### 12. Second-Generation Expert Systems

- **Paper:** "Methods for knowledge acquisition and refinement in second generation expert systems"
- **Authors:** Nada Lavrač, Igor Mozetič
- **Venue:** ACM, 1989
- **Year:** 1989

**Core claim:** "Both man and machine learn through repeated knowledge refinement cycles" — the man-machine process of acquiring and refining knowledge.

**Paper action:** Cite as historical precursor. Validates DDC's iterative human-machine loop has roots in established KE methodology from 35+ years ago.

---

### 13. Knowledge Acquisition Bottleneck

- **Key references:** Tom Gruber's ASK system (1988, 1989)
- **Core idea:** The fundamental difficulty of capturing expert knowledge for AI systems.

**Paper action:** Cite as historical foundation. DDC is a modern solution to the classic knowledge acquisition bottleneck, reimagined for LLM agents.

---

### 14. Lean/Pull Systems (Toyota Production System)

- **Core idea:** Work is triggered only by real demand, not anticipated need. "Stop doing work that 'might' be needed."

**Paper action:** Cite as conceptual ancestor. DDC applies pull-based thinking to knowledge management. Strengthens theoretical grounding.

---

### 15. Context Engineering as a Discipline

- **Key references:** Andrej Karpathy (June 2025), Anthropic engineering blog (September 2025)
- **Core idea:** "The delicate art and science of filling the context window with just the right information for the next step."

**Paper action:** Cite as framing. DDC is a methodology that operates within the broader context engineering discipline.

**Key quote from Anthropic piece:** "Context rot" — as tokens increase, model recall decreases. This directly supports DDC's argument against context stuffing and for curated, minimal context.

---

## Threat Level: Cite for Completeness (Components Only)

### 16. Knowledge-Aware Iterative Retrieval (Song, 2025)
Maintains "What is Known" and "What Remains Unknown" dynamically. Shares gap-identification concept. **Difference:** Retrieval optimization, not KB construction.

### 17. LATS — Language Agent Tree Search (Zhou et al., 2023)
Self-reflection + tree search + external feedback. **Difference:** Search/planning framework, not knowledge curation.

### 18. SENATOR (Wei et al., 2025)
Detects knowledge deficiencies using structural entropy, generates targeted data. **Difference:** Synthetic data + fine-tuning, not external KB curation.

### 19. Agent KB (2025)
Builds shared KB from agent execution traces for cross-domain transfer. **Difference:** Automated construction, not human-curated.

---

## Papers Reviewed But Not Relevant to DDC

### SEED (Chen et al., MIT, 2024) — arXiv:2310.00749
LLM-as-compiler for data curation pipelines. About data cleaning/transformation, not knowledge curation for agents. **No need to cite.**

### Agent Laboratory (Schmidgall et al., AMD/JHU, 2025) — arXiv:2501.04227
LLM agents doing entire research process. Not relevant to DDC's core claims. However, their finding that "human involvement significantly improves quality" supports DDC's human-in-the-loop design. **Optional cite for human-in-the-loop evidence.**

### Agentic Workflows for Economic Research (Dawid et al., 2025) — arXiv:2504.09736
Multi-agent workflows for economics with human checkpoints. Validates agentic workflows with human oversight. **Not close enough to cite in main related work.**

### Agentic Web (Yang et al., 2025) — arXiv:2507.21206
Survey/vision paper about agents interacting at scale. Relevant to multi-agent governance idea (future work). **Not relevant to DDC core.**

### Incremental Knowledge Enrichment in GPTs (Kowalczyk et al., 2024)
Dynamic linking for real-time knowledge integration. About model weight updates, not external KB. **Not relevant.**

### Active Learning by Cooperative Multi-Agent Systems (Dato et al., 2021)
Multi-agent cooperative learning. Different domain (ML training). **Not relevant to DDC core.**

---

## Reinforcement Learning Connection

Several papers reveal a strong RL parallel worth framing in the paper:

| RL Concept | DDC Equivalent |
|-----------|---------------|
| Environment | Enterprise domain |
| Action | Agent attempts to solve a problem |
| Reward signal | Human review (correct/incorrect) |
| Policy update | Knowledge base update (new entities) |
| Episode | One DDC cycle |
| Convergence | Coverage curve stabilizing after 20-30 cycles |

DDC is essentially **human-in-the-loop reinforcement learning where the "policy update" is a knowledge base change instead of a weight update.** Reflexion (Shinn et al., 2023) calls this "verbal reinforcement learning." DDC extends it from within-session strategy to persistent cross-session domain knowledge.

**Recommendation:** Use RL as a framing device in the Related Work section. Do not implement RL mechanisms — the analogy is structural, not mechanical.

---

## Future Research Ideas (From Paper Review)

### 1. Enterprise Deep Research Agent
Deep research (Perplexity/ChatGPT) works over unstructured web data. An enterprise version would work over internal systems (Confluence, Jira, Slack, repos). DDC could be the curated knowledge layer these agents query. **Future Work section.**

### 2. Multi-Agent Centralized DDC Governance
Multiple agents working on different problems simultaneously, contributing to a centralized knowledge base with a governance agent that handles deduplication, quality, and PR-like review process. Git provides versioning and audit trail natively. **Follow-up paper.**

### 3. RL Formalization
Formalize DDC using RL notation: state space (knowledge base contents), action space (entity CRUD operations), reward function (human validation score), transition function (problem → gaps → curation → updated KB). Could enable theoretical convergence proofs. **Follow-up paper.**

---

## Citation Priority for DDC Paper

### Must-Cite (Essential Related Work)

| # | Paper | Year | Why |
|---|-------|------|-----|
| 1 | ACE (Zhang et al.) | 2025 | Closest automated analog — differentiate explicitly |
| 2 | Reflexion (Shinn et al.) | 2023 | Failure-driven learning, RL framing |
| 3 | ExpeL (Zhao et al.) | 2023 | Experiential learning, persistent knowledge |
| 4 | AITL (Zhao/Airbnb) | 2025 | Human identification of missing knowledge |
| 5 | CUGA (IBM) | 2025 | Enterprise agent failure → knowledge injection |
| 6 | KG-Driven Active Archives (Karidi et al.) | 2025 | Demand-driven curation feedback loop |
| 7 | Pazzani | 1986 | Historical: failure-driven KB refinement |
| 8 | Gruber/ASK | 1988 | Historical: knowledge acquisition bottleneck |

### Should-Cite (Strengthen Positioning)

| # | Paper | Year | Why |
|---|-------|------|-----|
| 9 | Dynamic Cheatsheet (Suzgun et al.) | 2025 | ACE's precursor |
| 10 | Voyager (Wang et al.) | 2023 | Persistent skill library |
| 11 | STARS (Kirk et al.) | 2023 | Human-in-the-loop knowledge refinement |
| 12 | Allen, Stork & Groth | 2023 | LLMs in knowledge engineering |
| 13 | Lavrač & Mozetič | 1989 | Historical: man-machine KB refinement cycles |
| 14 | Context Engineering (Karpathy/Anthropic) | 2025 | DDC as methodology for CE |
| 15 | Lean/Pull Systems (Toyota) | — | Conceptual ancestor |

### Optional-Cite (Completeness)

| # | Paper | Year | Why |
|---|-------|------|-----|
| 16 | Knowledge-Aware Iterative Retrieval (Song) | 2025 | Gap identification concept |
| 17 | Agent Laboratory (Schmidgall et al.) | 2025 | Human feedback improves quality |
| 18 | SENATOR (Wei et al.) | 2025 | Knowledge gap detection |
| 19 | Agent KB | 2025 | Persistent agent KB |
| 20 | TDD as Backbone of AI-Assisted Dev | 2025 | Supports TDD analogy |

---

## Key Risk

The ACE paper (ICLR 2026) is gaining traction rapidly (~52 citations in 4 months). The field of "context engineering" is moving fast. Starting the DDC paper soon is advisable to establish its distinct position before the space becomes more crowded.