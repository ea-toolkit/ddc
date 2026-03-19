# Context Gap Scanner

Paste your company docs. See where your AI agents will fail.

Discover the tribal knowledge gaps that prevent AI agents from working on your domain. Built with DDC methodology — [arxiv:2603.14057](https://arxiv.org/abs/2603.14057).

## How it works

1. **Paste** a domain description — architecture docs, README, onboarding notes
2. **Probe** — AI agents attempt domain-specific questions (incidents, integrations, data flows)
3. **See** — get an AI-Readiness Score and a prioritized list of knowledge gaps

## Run locally

```bash
cd hackathon/context-gap-scanner
npm install
ANTHROPIC_API_KEY=your-key npx netlify dev
```

## Deploy to Netlify

1. Connect this repo to Netlify
2. Set base directory to `hackathon/context-gap-scanner`
3. Set build command to `npm install`
4. Set publish directory to `src`
5. Add `ANTHROPIC_API_KEY` as environment variable in Netlify dashboard

## Tech stack

- Frontend: vanilla HTML/CSS/JS with neo-brutalist design system
- Backend: Netlify Functions (serverless) with Anthropic Claude API
- No database — everything is session-based
