# Half-Life Regression for Agent Domain Memory — Mathematical Draft

> Working draft from sparring session (March 15, 2026). Not a paper yet — raw thinking to revisit after IEEE submission.

---

## Problem Statement

Current LLM agents treat domain knowledge as binary — either loaded in context or not. No concept of how well the agent "knows" a domain concept, whether it's decaying, or what to prioritize when context is limited.

## Core Model (adapted from Settles & Meeder 2016)

### Recall Probability

```
p = 2^(-Δ/h)

p = probability the agent correctly applies a domain concept
Δ = sessions (or tasks) since concept was last in context
h = half-life of that domain concept for this agent
```

### Half-Life Function

```
h = 2^(Θ·x)

Θ = learned weight vector
x = feature vector per domain concept
```

### Feature Vector (x)

| Feature | What it captures |
|---------|-----------------|
| concept_complexity | Simple fact ("we use PostgreSQL") vs complex pattern ("our event sourcing uses X because Y") |
| dependency_count | How many other concepts depend on this one |
| usage_frequency | How often the concept is needed across tasks |
| embedding_distance | Semantic similarity to current task context |
| reinforcement_count | How many sessions this concept was loaded |
| last_accuracy | Did the agent apply it correctly last time? |
| abstraction_level | Concrete (file path) vs abstract (architectural principle) |
| contradiction_risk | Does this concept conflict with general pre-training? |

### Key Hypothesis: Contradiction Risk

Not all domain concepts decay equally:

- **Long half-life**: Concepts aligned with pre-training (standard patterns, common tools)
- **Short half-life**: Company-specific terminology, non-standard patterns
- **Shortest half-life**: Concepts that CONTRADICT pre-training — agent actively "forgets" these

This is where DDC matters most — DDC captures exactly the knowledge with the shortest half-lives.

---

## Quality Model

### Per-response quality

```
q(p, s) = Σ [wᵢ × recall(conceptᵢ, s)]

wᵢ = importance weight of concept i for prompt p
recall(conceptᵢ, s) = probability agent correctly applies concept i in session s
```

### Without HLR (binary recall)

```
recall(conceptᵢ, s) = { 1.0  if concept in context
                       { ???  if concept NOT in context (unknown, unmanaged)
```

### With HLR (predicted recall)

```
recall(conceptᵢ, s) = 2^(-Δᵢ/hᵢ)
```

### Cumulative Quality (User Experience)

```
Q = Σᵐ [Σⁿ q(pⱼ, sₖ) / n]  across m sessions, n prompts per session
```

### Value Delta

```
Value = Σᵐ [Q_hlr(sⱼ) - Q_static(sⱼ)]

Value grows with:
  - m (more sessions → more decay → more value from prediction)
  - domain size (more concepts → harder to fit all → more value from prioritization)
  - domain specificity (more contradictions with pre-training → faster decay → more value)

Value shrinks with:
  - Small domains (everything fits in context)
  - Short engagements (no time for decay)
  - Generic domains (pre-training covers it)
```

---

## Projected Quality Curves

Domain: 100 concepts. Context window fits 40.

### Without HLR (static loading)

```
Session 1:  q = 0.95
Session 5:  q = 0.80
Session 10: q = 0.65
Session 20: q = 0.55
Average Q ≈ 0.72
```

### With HLR (adaptive loading)

```
Session 1:  q = 0.95
Session 5:  q = 0.92
Session 10: q = 0.88
Session 20: q = 0.85
Average Q ≈ 0.90
```

**Projected delta: ~25% improvement in sustained domain accuracy.**

---

## Probability Map (The 20-80 Solution)

```
concept_map = {
  "bounded context":        p=0.92  ← agent retains, skip loading
  "our custom auth flow":   p=0.31  ← decaying, RELOAD
  "event schema v2 format": p=0.15  ← nearly forgotten, CRITICAL RELOAD
  "PostgreSQL usage":       p=0.97  ← pre-training covers this, skip
}
```

The concepts with half-lives under 3 sessions = the 20% critical domain knowledge. If an engineer leaves, THIS is what walks out the door. If an agent loses context, THIS is what breaks.

---

## Experiment Design

```
Phase 1: Baseline — Load 50 concepts, test accuracy (~100%)
Phase 2: Decay — Remove concepts in batches, test across sessions, track decay curves
Phase 3: Model — Fit HLR to decay data, learn Θ weight vector
Phase 4: Validate — Adaptive loading vs static loading vs random, measure accuracy
```

Sample size: 50 concepts × 20 sessions × 3 models = 3,000 data points.

---

## Positioning vs Existing Work

```
Spec-driven / B-MAD  → what to store       (solved — templates and structure)
RAG                  → how to retrieve      (solved — search and rank)
This paper           → what's decaying      (unsolved — predictive memory management)
```

Key defense against "just make context windows bigger":
> Liu et al. (2023) "Lost in the Middle" proved LLMs don't attend equally to all context. More context ≠ better understanding. Strategic context loading beats brute force context stuffing.

---

## IEEE DDC Paper — Suggested Reference

Don't combine full experiment into IEEE paper. Add theoretical foundation:

> "Domain concepts exhibit variable retention half-lives in LLM agents. Knowledge aligned with pre-training persists across sessions, while domain-specific overrides decay rapidly. This decay pattern motivates the need for structured domain capture (DDC) — the concepts most critical to capture are precisely those with the shortest agent retention half-lives. A full experimental treatment of agent domain memory decay is the subject of forthcoming work."

Strategy: Two papers from one research line > one bloated paper.

---

## Publication Targets

| Venue | Angle |
|-------|-------|
| AAAI | AI + cognitive science intersection |
| ACL | Language/knowledge representation |
| NeurIPS workshop | Agent systems track |
| IEEE Software | Practical engineering (pairs with DDC) |
| AAMAS | Autonomous agents and multi-agent systems |

---

## References

- Settles & Meeder (2016) — Half-life regression for Duolingo
- Pimsleur (1967) — Graduated interval recall
- SM-2 — SuperMemo spaced repetition algorithm
- Anderson — ACT-R: An integrated theory of mind (READ NEXT)
- Liu et al. (2023) — Lost in the Middle: How Language Models Use Long Contexts
- DDC Framework — Raj Navakoti (2026, arxiv)
