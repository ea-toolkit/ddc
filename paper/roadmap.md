# DDC Academic Paper — Roadmap

**Target venues:**
- **IEEE Software** (rolling submissions) — primary target
- **ICSE 2027 SEIP** (~August 2026 deadline) — secondary target

---

## Phase 0: Foundation (Feb 2026)

- [ ] **Create DDC cycle log template** — structured format for logging every DDC cycle (problem, before/after, gaps, time spent, reuse signal)
- [ ] **Log first cycle retroactively** — capture: problem input, agent's information checklist, what was curated, proposed answers, human review feedback, time spent
- [ ] **Log any previous DDC cycles** — if there were informal cycles, capture what you remember

---

## Phase 1: Validation Gates (Feb-Mar 2026)

### Gate 1: Literature Review (2-3 days)

- [ ] **Search Google Scholar, ACM DL, IEEE Xplore, arXiv** for:
  - "demand-driven knowledge base" + LLM
  - "agent-driven context curation"
  - "failure-driven knowledge acquisition"
  - "test-driven knowledge engineering"
  - "active context construction" + agents
  - "pull-based knowledge management"
  - "context engineering" + enterprise + agents
- [ ] **Document findings** — what exists, how DDC differs, what to cite
- [ ] **Go/No-Go decision** — if someone already published the same method, pivot to experience report

### Gate 2: Data Feasibility (ongoing, first check after 10 cycles)

- [ ] **Run 10 DDC cycles with structured logging**
- [ ] **Check coverage curve** — is the agent needing less new context per problem?
- [ ] **Check time-to-curate** — is each cycle taking 15-45 minutes?
- [ ] **Go/No-Go decision** — if no convergence signal after 10 cycles, reassess claims

### Gate 3: Framing Validation (1 day, after Gate 1 passes)

- [ ] **Write a 1-page abstract** summarizing the method, claims, and evidence
- [ ] **Show to 1 academic** — someone who publishes at ICSE/ICSA/IEEE Software
- [ ] **Show to 1 practitioner** — someone building enterprise AI agents
- [ ] **Go/No-Go decision** — academic says "this could be a paper" + practitioner says "I'd read this"

---

## Phase 2: Evidence Collection (Mar-Jun 2026)

- [ ] **Continue DDC cycles** — aim for 20-30 total logged cycles
- [ ] **Track metrics per cycle:**
  - Problem description
  - Agent output before context (screenshot/copy)
  - Information checklist generated
  - Entities curated (count and type)
  - Agent output after context
  - Time spent (minutes)
  - Context reuse in later problems (yes/no, which ones)
- [ ] **Plot coverage curve** — % of new problems answerable vs completed cycles
- [ ] **Run comparison experiment** — same 5 problems attempted with:
  - (a) no context
  - (b) top-down curated context (if available)
  - (c) DDC-curated context
  - Assessed by a domain expert (not you)
- [ ] **Consider second domain** — even a small one strengthens the generalization claim

---

## Phase 3: Co-Author & IP (Mar-Apr 2026)

### Find a Co-Author

- [ ] **Identify candidates** — someone with academic publishing experience:
  - Colleague with PhD background?
  - University contact in software engineering?
  - Someone from the AI Engineer conference network?
  - LinkedIn connection in software architecture research?
- [ ] **Pitch the paper** — share the blog + data + abstract
- [ ] **Agree on contribution split** — who writes what, authorship order

### IP Clearance

- [ ] **Talk to manager** — early conversation about publishing
- [ ] **Decide approach:**
  - Option A: Publish with employer affiliation — adds credibility, needs approval
  - Option B: Publish independently — simpler, weaker affiliation
- [ ] **Ensure zero company IP in paper** — use synthetic/anonymized examples only (healthcare claims example works)
- [ ] **Get written approval** if going with Option A

---

## Phase 4: Repo Cleanup (Apr-May 2026)

- [ ] **Create a public-facing version of the repo** (or a sanitized subset) — reviewers may want to see the structure
- [ ] **Clean up entity formats** — consistent frontmatter, no broken references
- [ ] **Document the meta structure** — entity-types.yaml, relationship-types.yaml should be complete
- [ ] **Ensure the FE works as a demo** — useful for conference presentation
- [ ] **Create a synthetic domain example** — so the paper can show DDC without any proprietary data
- [ ] **Remove all company-specific content** from any public-facing artifacts

---

## Phase 5: Write the Paper (May-Jul 2026)

### IEEE Software Format (8-12 pages, practitioner audience)

- [ ] **Section 1: Introduction** — the context problem for enterprise AI agents
- [ ] **Section 2: Background & Related Work** — RAG limitations, active learning, knowledge engineering, context engineering, lean/pull systems
- [ ] **Section 3: The DDC Method** — formalized loop with inputs/outputs/artifacts, information checklist artifact, convergence hypothesis, TDD structural mapping
- [ ] **Section 4: Evaluation** — setting, metrics (coverage curve, curation time, agent accuracy, context reuse), results
- [ ] **Section 5: Discussion** — when DDC works, when it doesn't, threats to validity, the curator agent pattern
- [ ] **Section 6: Conclusion & Future Work**
- [ ] **Internal review** — co-author reviews, 1-2 trusted readers
- [ ] **Format in LaTeX** — IEEE Software template

### Timeline

- May: Outline + Section 3 (method) + Section 4 (evaluation)
- June: Section 1-2 (intro + related work) + Section 5-6 (discussion + conclusion)
- July: Internal review, revisions, formatting
- Early August: Submit to IEEE Software (rolling)

### ICSE 2027 SEIP Backup

- [ ] **Check exact ICSE 2027 SEIP deadline** (typically August 2026)
- [ ] **Adapt IEEE Software draft to ICSE format** (6-10 pages, more industry-focused)
- [ ] **Submit to ICSE if IEEE Software timeline slips**

---

## Phase 6: Post-Submission (Aug 2026+)

- [ ] **IEEE Software review** — expect 3-6 months for response
- [ ] **Prepare for revise & resubmit** — most common outcome, not rejection
- [ ] **Continue logging DDC cycles** — more data strengthens revision
- [ ] **Prepare conference presentation** — if ICSE accepts, present June 2027
- [ ] **Consider follow-up paper** — multi-domain evaluation, the curator agent pattern, DDC tooling

---

## Key Risks to Monitor

| Risk | Check | Action |
|------|-------|--------|
| Someone already published this | Gate 1 literature review | Pivot to experience report |
| Convergence claim doesn't hold | Gate 2 after 10 cycles | Weaken claim or drop |
| No co-author found | By April 2026 | Submit to workshop (lower bar) instead of journal |
| IP clearance denied | Manager conversation | Use synthetic domain only, publish independently |
| Time pressure from day job | Monthly check | Prioritize data logging over writing — data is irreplaceable, writing can be rushed |

---

## The One Non-Negotiable

**Log every DDC cycle from today.** Everything else can be adjusted, delayed, or dropped. Without the structured log, there is no paper. With it, the paper writes itself.