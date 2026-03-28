import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const MODEL = 'claude-sonnet-4-20250514';

export function parseJSON(raw) {
  const text = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '');
  return JSON.parse(text);
}

export async function ask(system, userMessage, maxTokens = 2048) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: userMessage }]
  });
  return response.content[0].text;
}
