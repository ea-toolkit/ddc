from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from ..parser import KnowledgeBaseParser
from ..graph_builder import GraphBuilder
from ..models import Entity, GraphData, EntityListResponse

router = APIRouter(prefix="/api", tags=["entities"])

# Global parser instance (will be initialized in main.py)
parser: Optional[KnowledgeBaseParser] = None
graph_builder: Optional[GraphBuilder] = None


def init_routes(kb_parser: KnowledgeBaseParser, gb: GraphBuilder):
    """Initialize routes with parser and graph builder"""
    global parser, graph_builder
    parser = kb_parser
    graph_builder = gb


@router.get("/entities", response_model=EntityListResponse)
async def list_entities(
    type: Optional[str] = Query(None, description="Filter by entity type"),
    limit: int = Query(500, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """List all entities with optional filtering"""
    if not parser:
        raise HTTPException(status_code=500, detail="Parser not initialized")
    
    entities = list(parser.entities.values())
    
    # Filter by type
    if type:
        entities = [e for e in entities if e.type == type]
    
    # Get all unique types
    all_types = list(set(e.type for e in parser.entities.values()))
    
    # Pagination
    total = len(entities)
    entities = entities[offset:offset + limit]
    
    # Convert to dict for response
    entity_dicts = []
    for entity in entities:
        entity_dict = {
            "id": entity.id,
            "type": entity.type,
            "name": entity.name,
            "description": entity.description,
            "metadata": entity.metadata,
            "relationships": entity.relationships,
            "folder_path": entity.folder_path
        }
        entity_dicts.append(entity_dict)
    
    return EntityListResponse(
        entities=entity_dicts,
        total=total,
        types=all_types
    )


@router.get("/entities/{entity_id}")
async def get_entity(entity_id: str):
    """Get a single entity by ID with related entities"""
    if not parser:
        raise HTTPException(status_code=500, detail="Parser not initialized")
    
    entity = parser.get_entity(entity_id)
    if not entity:
        raise HTTPException(status_code=404, detail=f"Entity {entity_id} not found")
    
    # Get related entities
    related_entities = parser.get_related_entities(entity_id)
    related_dicts = [
        {
            "id": e.id,
            "type": e.type,
            "name": e.name,
            "description": e.description
        }
        for e in related_entities
    ]
    
    return {
        "id": entity.id,
        "type": entity.type,
        "name": entity.name,
        "description": entity.description,
        "content": entity.content,
        "metadata": entity.metadata,
        "relationships": entity.relationships,
        "related_entities": related_dicts
    }


@router.get("/graph", response_model=GraphData)
async def get_graph(
    types: Optional[str] = Query(None, description="Comma-separated entity types to include"),
    center: Optional[str] = Query(None, description="Center node ID for subgraph"),
    depth: int = Query(2, ge=1, le=5, description="Depth for subgraph (when center is specified)")
):
    """Get graph data for visualization"""
    if not graph_builder:
        raise HTTPException(status_code=500, detail="Graph builder not initialized")
    
    # Build subgraph if center is specified
    if center:
        return graph_builder.build_subgraph(center, depth)
    
    # Filter by types if specified
    type_filter = None
    if types:
        type_filter = [t.strip() for t in types.split(",")]
    
    return graph_builder.build_graph(type_filter)


@router.get("/search")
async def search_entities(
    q: str = Query(..., description="Search query")
):
    """Search entities by name, description, or content"""
    if not parser:
        raise HTTPException(status_code=500, detail="Parser not initialized")
    
    results = parser.search_entities(q)
    
    return {
        "query": q,
        "results": results,
        "total": len(results)
    }


@router.get("/types")
async def get_entity_types():
    """Get all entity type definitions"""
    if not parser:
        raise HTTPException(status_code=500, detail="Parser not initialized")
    
    return {
        "entity_types": [et.dict() for et in parser.entity_types.values()],
        "relationship_types": [rt.dict() for rt in parser.relationship_types.values()]
    }
