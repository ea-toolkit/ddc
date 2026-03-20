import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a probe generator for the Context Gap Scanner. Given a domain description, you generate targeted questions that an AI agent would need to answer when working in that domain.

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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { description } = JSON.parse(event.body);

    if (!description || description.length < 50) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Domain description must be at least 50 characters' })
      };
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here is the domain description:\n\n${description}\n\nGenerate 6 targeted probes for this domain.`
        }
      ]
    });

    const raw = response.content[0].text;
    const text = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '');
    const probes = JSON.parse(text);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ probes })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate probes', detail: error.message })
    };
  }
}
