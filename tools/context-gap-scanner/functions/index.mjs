import { onRequest } from 'firebase-functions/v2/https';
import { ask, parseJSON } from './lib/claude.mjs';

// --- Probe Generator ---
const GENERATE_PROMPT = `You are a probe generator for the Context Gap Scanner. Given a domain description, you generate targeted questions that an AI agent would need to answer when working in that domain.

Generate exactly 6 probes across these categories:
1. INCIDENT — A realistic production incident to diagnose
2. INTEGRATION — A system integration question requiring knowledge of how components connect
3. DATA_FLOW — A question about how data moves through the domain
4. TERMINOLOGY — A question requiring domain-specific terminology knowledge
5. PROCESS — A question about a business process or operational workflow
6. ARCHITECTURE — A question requiring understanding of architectural decisions and trade-offs

Each probe should be:
- Specific enough that a generic answer would be visibly wrong
- Realistic — something a real team member would actually encounter
- Answerable only with domain knowledge, not general CS knowledge

Return a JSON array of objects with fields: category, question, description (one line explaining what this probe tests).
Return ONLY the JSON array, no other text.`;

export const generateProbes = onRequest(
  { cors: true, timeoutSeconds: 120 },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { description } = req.body;
      if (!description || description.length < 50) {
        res.status(400).json({ error: 'Domain description must be at least 50 characters' });
        return;
      }

      const raw = await ask(GENERATE_PROMPT, `Here is the domain description:\n\n${description}\n\nGenerate 6 targeted probes for this domain.`);
      const probes = parseJSON(raw);
      res.json({ probes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate probes', detail: error.message });
    }
  }
);

// --- Probe Executor ---
const EXECUTE_PROMPT = `You are an AI agent attempting to answer domain-specific questions using ONLY the context provided. You must be brutally honest about what you know and what you don't.

For each question:
1. Attempt to answer using ONLY the provided domain description. Do not use general knowledge to fill gaps.
2. Rate your confidence from 1-5:
   - 1: Cannot answer — critical knowledge missing
   - 2: Mostly guessing — major gaps
   - 3: Partial answer — some key details missing
   - 4: Good answer — minor gaps
   - 5: Confident answer — sufficient context available
3. List the SPECIFIC knowledge gaps that prevent a confident answer. Be precise — name the missing systems, processes, terminology, or data structures.

Return a JSON object with fields:
- attempt: your best attempt at answering (2-3 sentences)
- confidence: number 1-5
- gaps: array of strings, each describing a specific knowledge gap

Return ONLY the JSON object, no other text.`;

async function executeProbe(description, probe) {
  const raw = await ask(
    EXECUTE_PROMPT,
    `DOMAIN CONTEXT (this is ALL you know):\n\n${description}\n\nQUESTION: ${probe.question}\n\nAttempt to answer using ONLY the context above. Be honest about gaps.`,
    1024
  );
  const result = parseJSON(raw);
  return {
    category: probe.category,
    question: probe.question,
    probeDescription: probe.description,
    attempt: result.attempt,
    confidence: result.confidence,
    gaps: result.gaps
  };
}

export const executeProbes = onRequest(
  { cors: true, timeoutSeconds: 300 },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { description, probes } = req.body;
      if (!description || !probes || !Array.isArray(probes)) {
        res.status(400).json({ error: 'Missing description or probes array' });
        return;
      }

      const results = await Promise.all(
        probes.map(probe => executeProbe(description, probe))
      );
      res.json({ results });
    } catch (error) {
      res.status(500).json({ error: 'Failed to execute probes', detail: error.message });
    }
  }
);

// --- Gap Analyzer ---
const ANALYZE_PROMPT = `You are a gap analyzer for the Context Gap Scanner. Given the results of AI agent probes against a domain, you produce a structured analysis of knowledge gaps.

Analyze the probe results and produce:

1. CATEGORY SCORES — Rate coverage (0-100) for each DDC entity type:
   - systems: Knowledge of systems, services, and infrastructure
   - processes: Knowledge of business processes and operational workflows
   - terminology: Knowledge of domain-specific jargon and concepts
   - data_models: Knowledge of data structures, schemas, and flows
   - integrations: Knowledge of how systems connect and communicate
   - tribal_knowledge: Undocumented operational wisdom, workarounds, and institutional memory

2. OVERALL SCORE — Weighted average (0-100). Tribal knowledge weighs 2x because it's the hardest to acquire.

3. TOP GAPS — The 10 most important knowledge gaps to fill, ordered by impact. Each gap should specify:
   - what: What specific knowledge is missing
   - category: Which DDC entity type it belongs to
   - impact: Why this gap matters (one sentence)
   - severity: "critical", "high", or "medium"

4. INTERPRETATION — One paragraph summarizing the domain's AI-readiness and what it means.

Return ONLY a JSON object with fields: categories (object with scores), overallScore (number), topGaps (array), interpretation (string).`;

export const analyzeGaps = onRequest(
  { cors: true, timeoutSeconds: 120 },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { results } = req.body;
      if (!results || !Array.isArray(results)) {
        res.status(400).json({ error: 'Missing results array' });
        return;
      }

      const probesSummary = results.map(r =>
        `[${r.category}] Q: ${r.question}\nConfidence: ${r.confidence}/5\nAttempt: ${r.attempt}\nGaps: ${r.gaps.join('; ')}`
      ).join('\n\n');

      const raw = await ask(ANALYZE_PROMPT, `Here are the probe execution results:\n\n${probesSummary}\n\nAnalyze these results and produce the gap analysis.`);
      const analysis = parseJSON(raw);
      res.json({ analysis });
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze gaps', detail: error.message });
    }
  }
);
