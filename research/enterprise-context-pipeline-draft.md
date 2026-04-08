# Enterprise Context Pipeline — Research Draft

> From sparring session (March 26, 2026). Triggered by studying neuroscience concepts (encoding, 1/f noise separation, kernel functions, HLR decay) and seeing connections to enterprise documentation problems.

---

## The Core Insight: The Middle Man Problem

Enterprise knowledge is trapped in tools designed for humans reading HTML (Confluence, SharePoint, Notion), not agents reading structured data. No matter how good your RAG or agents are, if the source documentation is unstructured, inconsistent, and noisy — the output will be unreliable.

The biggest bottleneck isn't the agent or the retrieval method. It's the **middle man** — the documentation platform that forces knowledge through a format that's neither human-optimal nor machine-readable.

**The thesis:** Organizations need to move from legacy documentation SaaS to structured, version-controlled, Git-based documentation that's simultaneously human-readable AND agent-queryable.

---

## The Pipeline Vision

```
Input:
  500 unstructured Confluence pages (messy, outdated, contradictory)
  + 500 work items (Jira tickets, incidents, support tickets, architecture decisions)

Process:
  Step 1: DDC-style test generation from work items
          "Can an agent solve these 500 real problems using this documentation?"
          (validates coverage, finds gaps)

  Step 2: Signal separation using framework concepts
          - 1/f noise removal: separate real knowledge from boilerplate/noise
          - HLR decay: identify which docs are fresh vs outdated
          - Kernel similarity: discover relationships between disconnected docs
          - Encoding prediction: which docs will agents actually retain/use?

  Step 3: Segregation + labeling + cleanup
          (like EEG preprocessing before ML training —
          filter noise, normalize formats, structure entities)

  Step 4: Output structured GitHub documentation
          (meta-model markdown + PlantUML + Mermaid,
          architecture-catalog style structure)

  Step 5: Auto-generate MCP servers, RAG configs,
          agent extensions from the structured data

Output:
  Clean, structured, version-controlled knowledge base
  + Generated agent infrastructure (MCP, RAG, extensions)
  + Coverage report (what's documented vs tribal vs missing)
```

---

## Neuroscience Concepts → Documentation Analogs

These aren't metaphors — they're the same mathematical operations applied to a different domain.

| Neuroscience concept | What it does | Documentation analog |
|---|---|---|
| **1/f noise separation (specparam)** | Separates real brain oscillations from background noise | Separates real domain knowledge from documentation noise (boilerplate, outdated, redundant) |
| **Encoding / Subsequent Memory Effect** | Predicts at encoding time what will be remembered later | Predicts which documentation will actually be USED by agents (high-value vs dead docs) |
| **Kernel function (RBF)** | Maps low-dimensional data into high-dimensional space where patterns become separable | Maps flat, unstructured docs into a structured space where relationships become visible |
| **Half-Life Regression (HLR)** | Models how memory decays over time with predictable half-lives | Models how documentation freshness decays — which docs have short half-lives and need constant updating |
| **ICA (Independent Component Analysis)** | Unmixes overlapping signals into independent sources | Unmixes overlapping/contradictory documentation into clean, independent knowledge entities |
| **Band-pass filtering** | Removes frequencies outside the range of interest | Removes documentation outside the relevant domain scope |

---

## The Three-Purpose Dataset

One synthetic dataset designed to serve three purposes simultaneously:

### Purpose 1: DDC IEEE Paper Proof
Test the convergence hypothesis — does DDC produce sufficient context in 20-30 problem cycles?

### Purpose 2: HuggingFace Public Dataset
First public enterprise domain knowledge dataset. Others can benchmark their RAG systems, agent frameworks, and knowledge management tools.

### Purpose 3: Pipeline Experiment
Test the documentation → structured context pipeline idea. Validate whether the neuroscience-inspired framework actually separates signal from noise in enterprise docs.

### Dataset Design (4 Layers)

```
Layer 1: The "messy" enterprise (raw input)
  - 500 Confluence-style pages per domain
  - Inconsistent formatting, outdated info, duplicates,
    contradictions, tribal knowledge gaps
  - This is what enterprises actually have
  - Serves: Pipeline experiment (input), HuggingFace (raw split)

Layer 2: The problems (work items)
  - 100 Jira tickets (dev tasks, bugs, feature requests)
  - 100 architecture decisions
  - 100 incidents with resolutions
  - 100 customer support tickets
  - 100 product requirements
  - Serves: DDC testing (problem cards), HuggingFace (benchmark split)

Layer 3: The "clean" ground truth
  - Same knowledge but structured: meta-model markdown,
    PlantUML diagrams, labeled entities, relationships mapped
  - What the output SHOULD look like after processing
  - Serves: DDC validation (expected output),
    Pipeline validation target, HuggingFace (clean split)

Layer 4: Gap annotations
  - For each problem in Layer 2, annotated:
    which docs from Layer 1 are needed,
    which knowledge is MISSING (tribal),
    which docs contradict each other,
    which docs are outdated
  - Serves: DDC convergence proof, HuggingFace (labeled gaps),
    Pipeline signal vs noise ground truth
```

### Domains (3, realistic but not company-specific)

1. **E-commerce fulfillment** — order processing, warehouse management, delivery orchestration, returns handling
2. **SRE / platform engineering** — incident management, service topology, runbooks, deployment pipelines
3. **Healthcare claims processing** — claims adjudication, eligibility verification, provider networks, appeals

### Generation Strategy (cost-efficient)

```
Step 1: Create 10 "seed" documents per domain manually (high quality templates)
Step 2: Use Claude to generate variations — different styles, quality levels,
        deliberate inconsistencies, tribal gaps
Step 3: Generate work items that reference the docs (with gap annotations)
Step 4: Generate the clean structured output (ground truth)
```

Seed docs control quality. Claude scales the volume. Gap annotations may need manual review.

### HuggingFace Dataset Card

> "Enterprise Domain Knowledge Benchmark (EDKB) — 1,500 unstructured enterprise documents + 1,500 work items + structured ground truth + gap annotations across 3 domains. First public dataset for testing AI agent domain readiness, RAG quality, and knowledge management frameworks."

Nobody has this. No public enterprise knowledge dataset exists for benchmarking AI agents on real domain work.

---

## Potential Paper

**Title:** "Applying Signal Processing and Memory Science to Enterprise Knowledge Curation: A Framework for Separating Signal from Noise in Organizational Documentation"

**or more practically:**

**Title:** "From Confluence to Context: A Framework for Transforming Unstructured Enterprise Documentation into Agent-Ready Knowledge Bases"

**Connects to:**
- DDC (methodology for what to curate)
- HLR agent memory paper (what decays, what to prioritize)
- AgentReady (validation — does the cleaned context pass the battle test?)
- Architecture Catalog (output format — structured markdown + diagrams)

---

## Connection to Current Work

This is NOT a new project. It's a convergence point:

```
DDC (methodology) — tells you WHAT to curate
HLR (math) — tells you what DECAYS and what to prioritize
Architecture Catalog (format) — the OUTPUT structure
AgentReady (validation) — tests if the result is READY
This pipeline (process) — the TRANSFORMATION from messy → structured
Neuroscience concepts (theory) — the mathematical FOUNDATION
```

All roads lead here. But the road itself starts with DDC IEEE → then HLR paper → then this.

---

## Rules

1. **Don't start building this.** DDC IEEE first. AI.Engineer workshop first. London first.
2. **The dataset is the bridge.** Design it for three purposes now, even if building happens later.
3. **Not a product.** If it works, product is a side effect. The goal is the research.
4. **The neuroscience concepts are the differentiation.** Anyone can build a Confluence-to-Markdown converter. Nobody is applying signal processing theory to documentation quality.
