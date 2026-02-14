from typing import Dict, List, Any
from .parser import KnowledgeBaseParser
from .models import GraphData, GraphNode, GraphEdge


class GraphBuilder:
    """Builds graph data from parsed entities"""
    
    def __init__(self, parser: KnowledgeBaseParser):
        self.parser = parser
    
    def build_graph(self, entity_type_filter: List[str] = None) -> GraphData:
        """Build complete graph from all entities"""
        nodes = []
        edges = []
        
        entities = self.parser.entities.values()
        
        # Filter by type if specified
        if entity_type_filter:
            entities = [e for e in entities if e.type in entity_type_filter]
        
        # Create nodes
        for entity in entities:
            # Get entity type config for color
            entity_type_config = self.parser.entity_types.get(entity.type, {})
            
            node = {
                "data": {
                    "id": entity.id,
                    "label": entity.name,
                    "type": entity.type,
                    "description": entity.description or "",
                    "color": getattr(entity_type_config, 'color', '#888888'),
                    "icon": getattr(entity_type_config, 'icon', '•')
                }
            }
            nodes.append(node)
        
        # Create edges from relationships
        for entity in entities:
            edges.extend(self._create_edges_for_entity(entity))
        
        # Deduplicate edges
        unique_edges = self._deduplicate_edges(edges)
        
        return GraphData(nodes=nodes, edges=unique_edges)
    
    def _create_edges_for_entity(self, entity) -> List[Dict[str, Any]]:
        """Create edges for an entity's relationships"""
        edges = []
        
        # Mapping of relationship fields to edge labels
        relationship_map = {
            'implements': 'implements',
            'uses_apis': 'uses',
            'owns_systems': 'owns',
            'owns_capabilities': 'owns',
            'integrates_with': 'integrates_with',
            'used_by': 'used_by',
            'depends_on': 'depends_on',
            'data_models': 'uses_data',
            'uses_data': 'uses_data',
            'related_processes': 'related_to',
            'owner': 'owned_by',
            'implemented_by': 'implemented_by',
            'related_capabilities': 'related_to',
            'parent_capability': 'child_of',
            'child_capabilities': 'parent_of'
        }
        
        for rel_field, rel_type in relationship_map.items():
            target_ids = entity.relationships.get(rel_field, [])
            
            for target_id in target_ids:
                # Check if target entity exists
                if self.parser.get_entity(target_id):
                    # Get relationship type config for color
                    rel_type_config = self.parser.relationship_types.get(rel_type, {})
                    
                    edge = {
                        "data": {
                            "source": entity.id,
                            "target": target_id,
                            "label": rel_type,
                            "color": getattr(rel_type_config, 'color', '#999999')
                        }
                    }
                    edges.append(edge)
        
        return edges
    
    def _deduplicate_edges(self, edges: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Remove duplicate and redundant edges"""
        seen_keys = set()
        unique_edges = []
        
        for edge in edges:
            edge_data = edge['data']
            source = edge_data['source']
            target = edge_data['target']
            label = edge_data['label']
            
            # For related_to: treat A→B and B→A as the same (use sorted key)
            if label == 'related_to':
                key = (min(source, target), max(source, target), 'related_to')
            # For parent_of/child_of: these are inverses, only keep parent_of
            elif label == 'child_of':
                # Skip child_of entirely - we'll get parent_of from the parent entity
                continue
            elif label == 'parent_of':
                # Use canonical key to avoid duplicates
                key = (source, target, 'parent_of')
            else:
                # For other relationships, use directional key
                key = (source, target, label)
            
            if key not in seen_keys:
                seen_keys.add(key)
                unique_edges.append(edge)
        
        return unique_edges
    
    def build_subgraph(self, center_id: str, depth: int = 2) -> GraphData:
        """Build a subgraph centered on a specific entity"""
        if depth < 1:
            depth = 1
        
        # Start with center entity
        center_entity = self.parser.get_entity(center_id)
        if not center_entity:
            return GraphData(nodes=[], edges=[])
        
        # BFS to find entities within depth
        visited = set()
        current_level = {center_id}
        
        for _ in range(depth):
            next_level = set()
            for entity_id in current_level:
                if entity_id in visited:
                    continue
                
                visited.add(entity_id)
                entity = self.parser.get_entity(entity_id)
                
                if entity:
                    # Add all related entities to next level
                    for rel_list in entity.relationships.values():
                        next_level.update(rel_list)
            
            current_level = next_level
        
        # Build graph with only visited entities
        nodes = []
        edges = []
        
        for entity_id in visited:
            entity = self.parser.get_entity(entity_id)
            if entity:
                entity_type_config = self.parser.entity_types.get(entity.type, {})
                
                node = {
                    "data": {
                        "id": entity.id,
                        "label": entity.name,
                        "type": entity.type,
                        "description": entity.description or "",
                        "color": getattr(entity_type_config, 'color', '#888888'),
                        "icon": getattr(entity_type_config, 'icon', '•')
                    }
                }
                nodes.append(node)
                
                # Add edges only if both source and target are in visited
                entity_edges = self._create_edges_for_entity(entity)
                for edge in entity_edges:
                    if edge['data']['target'] in visited:
                        edges.append(edge)
        
        unique_edges = self._deduplicate_edges(edges)
        
        return GraphData(nodes=nodes, edges=unique_edges)
