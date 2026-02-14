# DDC Knowledge Base - Backend

FastAPI backend for the DDC Knowledge Base application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### GET /api/entities
List all entities with optional filtering
- Query params: `type`, `limit`, `offset`

### GET /api/entities/{id}
Get a single entity with full details and related entities

### GET /api/graph
Get graph data for visualization
- Query params: `types` (filter), `center` (subgraph center), `depth`

### GET /api/search
Search entities
- Query params: `q` (search query)

### GET /api/types
Get entity and relationship type definitions

### GET /health
Health check endpoint
