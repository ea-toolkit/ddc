# Context Gap Scanner

Paste your company docs. See where your AI agents will fail.

Discover the tribal knowledge gaps that prevent AI agents from working on your domain. Built with DDC methodology — [arxiv:2603.14057](https://arxiv.org/abs/2603.14057).

## How it works

1. **Load** a domain package or describe your own domain
2. **Probe** — AI agents attempt domain-specific questions (incidents, integrations, data flows)
3. **See** — get an AI-Readiness Score and a prioritized list of knowledge gaps

## Run locally

```bash
cd tools/context-gap-scanner
npm run install:functions
firebase emulators:start
```

Requires `ANTHROPIC_API_KEY` set in `functions/.env`.

## Deploy to Firebase

```bash
firebase deploy
```

Requires Firebase project setup and `ANTHROPIC_API_KEY` configured in Firebase Functions environment.

## Tech stack

- Frontend: vanilla HTML/CSS/JS with neo-brutalist design system
- Backend: Firebase Cloud Functions with Anthropic Claude API
- No database — everything is session-based
