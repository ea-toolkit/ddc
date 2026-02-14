from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os

from .parser import KnowledgeBaseParser
from .graph_builder import GraphBuilder
from .routes import entities
from .routes import diagrams

# Initialize FastAPI app
app_title = os.environ.get("DDC_APP_TITLE", "DDC Knowledge Base API")
app = FastAPI(
    title=app_title,
    description="API for exploring domain knowledge graph",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize parser and graph builder
# Knowledge base path is configurable via environment variable
knowledge_base_path = Path(os.environ.get(
    "DDC_KNOWLEDGE_BASE_PATH",
    str(Path(__file__).parent.parent.parent / "domain-knowledge")
))

if not knowledge_base_path.exists():
    print(f"Warning: Knowledge base not found at {knowledge_base_path}")
    print("Please create the domain-knowledge directory")
else:
    print(f"Loading knowledge base from {knowledge_base_path}")

parser = KnowledgeBaseParser(str(knowledge_base_path))
graph_builder = GraphBuilder(parser)

# Load data on startup
@app.on_event("startup")
async def startup_event():
    """Load knowledge base on startup"""
    print("Loading entity type definitions...")
    parser.load_meta_definitions()
    print(f"Loaded {len(parser.entity_types)} entity types")
    print(f"Loaded {len(parser.relationship_types)} relationship types")
    
    print("Loading entities...")
    parser.load_all_entities()
    print(f"Loaded {len(parser.entities)} entities")
    
    # Initialize routes with parser
    entities.init_routes(parser, graph_builder)
    print("API ready!")

# Include routers
app.include_router(entities.router)
app.include_router(diagrams.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": app_title,
        "version": "1.0.0",
        "status": "running",
        "entities_loaded": len(parser.entities) if parser else 0
    }

# Health check
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "entities": len(parser.entities) if parser else 0,
        "entity_types": len(parser.entity_types) if parser else 0
    }
