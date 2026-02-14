from pydantic import BaseModel
from typing import Optional, Dict, List, Any
from datetime import datetime


class EntityMetadata(BaseModel):
    """Entity metadata from YAML frontmatter"""
    type: str
    id: str
    name: str
    description: Optional[str] = None
    status: Optional[str] = None
    owner: Optional[str] = None
    
    # Relationships (stored as lists of IDs)
    implements: Optional[List[str]] = None
    uses_apis: Optional[List[str]] = None
    owns_systems: Optional[List[str]] = None
    owns_capabilities: Optional[List[str]] = None
    integrates_with: Optional[List[str]] = None
    used_by: Optional[List[str]] = None
    depends_on: Optional[List[str]] = None
    data_models: Optional[List[str]] = None
    uses_data: Optional[List[str]] = None
    related_processes: Optional[List[str]] = None
    
    # Additional flexible metadata
    extra: Optional[Dict[str, Any]] = None
    
    class Config:
        extra = "allow"  # Allow additional fields


class Entity(BaseModel):
    """Complete entity with content"""
    id: str
    type: str
    name: str
    description: Optional[str] = None
    content: str  # Markdown content
    metadata: Dict[str, Any]  # All frontmatter data
    relationships: Dict[str, List[str]]  # Extracted relationships
    file_path: str
    folder_path: Optional[str] = None  # Subfolder path within entity type (e.g., "planning-and-optimization")
    

class GraphNode(BaseModel):
    """Node in the knowledge graph"""
    id: str
    label: str
    type: str
    description: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class GraphEdge(BaseModel):
    """Edge in the knowledge graph"""
    source: str
    target: str
    label: str
    type: str


class GraphData(BaseModel):
    """Complete graph data"""
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


class EntityListResponse(BaseModel):
    """Response for entity list endpoint"""
    entities: List[Dict[str, Any]]
    total: int
    types: List[str]


class SearchResult(BaseModel):
    """Search result item"""
    id: str
    type: str
    name: str
    description: Optional[str] = None
    score: float
    matches: List[str]


class EntityType(BaseModel):
    """Entity type definition"""
    id: str
    display_name: str
    description: str
    icon: str
    color: str
    supports_schema: Optional[bool] = False
    supports_diagram: Optional[bool] = False


class RelationshipType(BaseModel):
    """Relationship type definition"""
    id: str
    display_name: str
    description: str
    color: str
