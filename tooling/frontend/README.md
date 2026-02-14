# DDC Knowledge Base - Frontend

React + TypeScript frontend for visualizing domain knowledge.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

- **List View**: Browse entities in a grid/card layout
- **Graph View**: Visualize relationships using Cytoscape.js
- **Entity Detail**: View full entity details with related entities
- **Search**: Search across all entities
- **Type Filtering**: Filter entities by type
- **Adaptive Views**: UI adapts based on entity type and context

## Tech Stack

- React 18
- TypeScript
- Vite (build tool)
- TanStack Query (data fetching)
- Cytoscape.js (graph visualization)
- Tailwind CSS (styling)

## Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.
