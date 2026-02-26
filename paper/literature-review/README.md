# Literature Review — Gate 1 Assessment

**Date completed:** February 16, 2026
**Verdict: GO.** DDC's full synthesis is novel. No published work combines all four core components.

See [full-analysis.md](./full-analysis.md) for the detailed paper-by-paper review.

## DDC's Four Core Components

| Component | Description |
|-----------|-------------|
| (a) Agent failure as primary signal | Agent attempts, fails, identifies knowledge gaps |
| (b) Human-curated structured knowledge | Markdown + YAML frontmatter entities, organized by type |
| (c) Convergence claim | 20-30 cycles → power law, coverage stabilizes |
| (d) Formalized named methodology | DDC loop, TDD analogy, defined artifacts |

## Novelty Gap

| Combination | Found in literature? |
|-------------|---------------------|
| (a) alone | Yes — ACE, Reflexion, ExpeL |
| (b) alone | Partial — AITL |
| (c) alone | No |
| (d) alone | Partial — ACE |
| (a+b) combined | **No** |
| (a+b+c) combined | **No** |
| (a+b+c+d) combined | **No — DDC is novel** |

## Must-Cite Papers

1. **ACE** (Zhang et al., 2025) — closest automated analog
2. **Reflexion** (Shinn et al., 2023) — failure-driven learning in agents
3. **ExpeL** (Zhao et al., 2023) — experiential learning from agent experience
4. **AITL** (Zhao/Airbnb, 2025) — human identification of missing knowledge
5. **CUGA** (IBM, 2025) — enterprise agent failure → knowledge injection
6. **KG-Driven Active Archives** (Karidi et al., 2025) — demand-driven curation feedback loop
7. **Pazzani** (1986) — historical: failure-driven KB refinement
8. **Context Engineering** (Karpathy/Anthropic, 2025) — DDC as methodology for CE

## Positioning Strategy

DDC sits at the intersection of three established areas:
1. **Knowledge Acquisition** (1980s–present) → DDC modernizes for LLM agents
2. **Failure-Driven Learning** (Pazzani 1986, Reflexion 2023, ExpeL 2023) → DDC extends from agent self-improvement to human-curated domain knowledge
3. **Context Engineering** (Karpathy/Anthropic 2025, ACE 2025) → DDC provides a systematic methodology for determining what context should exist