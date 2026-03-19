import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an AI agent attempting to answer domain-specific questions using ONLY the context provided. You must be brutally honest about what you know and what you don't.

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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { description, probes } = JSON.parse(event.body);

    if (!description || !probes || !Array.isArray(probes)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing description or probes array' })
      };
    }

    const results = [];

    for (const probe of probes) {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `DOMAIN CONTEXT (this is ALL you know):\n\n${description}\n\nQUESTION: ${probe.question}\n\nAttempt to answer using ONLY the context above. Be honest about gaps.`
          }
        ]
      });

      const text = response.content[0].text;
      const result = JSON.parse(text);

      results.push({
        category: probe.category,
        question: probe.question,
        probeDescription: probe.description,
        attempt: result.attempt,
        confidence: result.confidence,
        gaps: result.gaps
      });
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ results })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to execute probes', detail: error.message })
    };
  }
}
