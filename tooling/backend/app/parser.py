import os
import frontmatter
import yaml
from pathlib import Path
from typing import Dict, List, Optional, Any
from .models import Entity, EntityMetadata, EntityType, RelationshipType


class KnowledgeBaseParser:
    """Parses markdown files and builds entity index"""
    
    def __init__(self, knowledge_base_path: str):
        self.knowledge_base_path = Path(knowledge_base_path)
        self.entities_path = self.knowledge_base_path / "entities"
        self.meta_path = self.knowledge_base_path / "meta"
        
        self.entities: Dict[str, Entity] = {}
        self.entity_types: Dict[str, EntityType] = {}
        self.relationship_types: Dict[str, RelationshipType] = {}
        
    def load_meta_definitions(self):
        """Load entity and relationship type definitions"""
        # Load entity types
        entity_types_file = self.meta_path / "entity-types.yaml"
        if entity_types_file.exists():
            with open(entity_types_file, 'r') as f:
                data = yaml.safe_load(f)
                for et in data.get('entity_types', []):
                    entity_type = EntityType(**et)
                    self.entity_types[entity_type.id] = entity_type
        
        # Load relationship types
        rel_types_file = self.meta_path / "relationship-types.yaml"
        if rel_types_file.exists():
            with open(rel_types_file, 'r') as f:
                data = yaml.safe_load(f)
                for rt in data.get('relationship_types', []):
                    rel_type = RelationshipType(**rt)
                    self.relationship_types[rel_type.id] = rel_type
    
    def parse_markdown_file(self, file_path: Path, folder_path: str = None) -> Optional[Entity]:
        """Parse a single markdown file with YAML frontmatter"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
                
            metadata = post.metadata
            content = post.content
            
            # Extract required fields
            entity_id = metadata.get('id')
            entity_type = metadata.get('type')
            entity_name = metadata.get('name')
            
            if not all([entity_id, entity_type, entity_name]):
                print(f"Warning: Missing required fields in {file_path}")
                return None
            
            # Extract relationships
            relationships = self._extract_relationships(metadata)
            
            entity = Entity(
                id=entity_id,
                type=entity_type,
                name=entity_name,
                description=metadata.get('description'),
                content=content,
                metadata=metadata,
                relationships=relationships,
                file_path=str(file_path),
                folder_path=folder_path
            )
            
            return entity
            
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None
    
    def _extract_relationships(self, metadata: Dict[str, Any]) -> Dict[str, List[str]]:
        """Extract all relationship fields from metadata"""
        relationship_fields = [
            'implements', 'uses_apis', 'owns_systems', 'owns_capabilities',
            'integrates_with', 'used_by', 'depends_on', 'data_models',
            'uses_data', 'related_processes', 'owner', 'implemented_by',
            'related_capabilities', 'parent_capability', 'child_capabilities'
        ]
        
        relationships = {}
        for field in relationship_fields:
            value = metadata.get(field)
            if value:
                # Ensure it's a list
                if isinstance(value, str):
                    relationships[field] = [value]
                elif isinstance(value, list):
                    relationships[field] = value
        
        return relationships
    
    def load_all_entities(self):
        """Load all entity markdown files"""
        self.entities = {}
        
        # Iterate through all subdirectories in entities/
        for entity_type_dir in self.entities_path.iterdir():
            if entity_type_dir.is_dir():
                entity_type_name = entity_type_dir.name
                # Parse all .md files in this directory and subdirectories (recursive)
                for md_file in entity_type_dir.glob("**/*.md"):
                    # Calculate folder path relative to entity type directory
                    relative_path = md_file.parent.relative_to(entity_type_dir)
                    folder_path = str(relative_path) if str(relative_path) != "." else None
                    
                    entity = self.parse_markdown_file(md_file, folder_path)
                    if entity:
                        self.entities[entity.id] = entity
        
        print(f"Loaded {len(self.entities)} entities")
        return self.entities
    
    def get_entity(self, entity_id: str) -> Optional[Entity]:
        """Get a single entity by ID"""
        return self.entities.get(entity_id)
    
    def get_entities_by_type(self, entity_type: str) -> List[Entity]:
        """Get all entities of a specific type"""
        return [e for e in self.entities.values() if e.type == entity_type]
    
    def search_entities(self, query: str) -> List[Dict[str, Any]]:
        """Simple search across entity names and descriptions"""
        query_lower = query.lower()
        results = []
        
        for entity in self.entities.values():
            score = 0.0
            matches = []
            
            # Check name
            if query_lower in entity.name.lower():
                score += 1.0
                matches.append("name")
            
            # Check description
            if entity.description and query_lower in entity.description.lower():
                score += 0.5
                matches.append("description")
            
            # Check content
            if query_lower in entity.content.lower():
                score += 0.2
                matches.append("content")
            
            if score > 0:
                results.append({
                    "id": entity.id,
                    "type": entity.type,
                    "name": entity.name,
                    "description": entity.description,
                    "score": score,
                    "matches": matches
                })
        
        # Sort by score descending
        results.sort(key=lambda x: x['score'], reverse=True)
        return results
    
    def get_related_entities(self, entity_id: str) -> List[Entity]:
        """Get all entities related to a given entity"""
        entity = self.get_entity(entity_id)
        if not entity:
            return []
        
        related_ids = set()
        for rel_list in entity.relationships.values():
            related_ids.update(rel_list)
        
        related_entities = []
        for rel_id in related_ids:
            rel_entity = self.get_entity(rel_id)
            if rel_entity:
                related_entities.append(rel_entity)
        
        return related_entities
