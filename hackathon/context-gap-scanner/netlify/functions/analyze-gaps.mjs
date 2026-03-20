import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a gap analyzer for the Context Gap Scanner. Given the results of AI agent probes against a domain, you produce a structured analysis of knowledge gaps.

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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { results } = JSON.parse(event.body);

    if (!results || !Array.isArray(results)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing results array' })
      };
    }

    const probesSummary = results.map(r =>
      `[${r.category}] Q: ${r.question}\nConfidence: ${r.confidence}/5\nAttempt: ${r.attempt}\nGaps: ${r.gaps.join('; ')}`
    ).join('\n\n');

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here are the probe execution results:\n\n${probesSummary}\n\nAnalyze these results and produce the gap analysis.`
        }
      ]
    });

    const raw = response.content[0].text;
    const text = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '');
    const analysis = JSON.parse(text);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to analyze gaps', detail: error.message })
    };
  }
}
