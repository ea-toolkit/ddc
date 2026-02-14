export interface EntityMetadata {
  type: string;
  id: string;
  name: string;
  description?: string;
  status?: string;
  owner?: string;
  [key: string]: any;
}

export interface Entity {
  id: string;
  type: string;
  name: string;
  description?: string;
  content: string;
  metadata: EntityMetadata;
  relationships: Record<string, string[]>;
  related_entities?: RelatedEntity[];
  folder_path?: string;  // Subfolder path within entity type
}

export interface RelatedEntity {
  id: string;
  type: string;
  name: string;
  description?: string;
}

export interface GraphNode {
  data: {
    id: string;
    label: string;
    type: string;
    description: string;
    color: string;
    icon: string;
  };
}

export interface GraphEdge {
  data: {
    source: string;
    target: string;
    label: string;
    color: string;
  };
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface EntityType {
  id: string;
  display_name: string;
  description: string;
  icon: string;
  color: string;
  supports_schema?: boolean;
  supports_diagram?: boolean;
}

export interface RelationshipType {
  id: string;
  display_name: string;
  description: string;
  color: string;
}

export interface EntityListResponse {
  entities: Entity[];
  total: number;
  types: string[];
}

export interface SearchResult {
  id: string;
  type: string;
  name: string;
  description?: string;
  score: number;
  matches: string[];
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}

export interface TypesResponse {
  entity_types: EntityType[];
  relationship_types: RelationshipType[];
}

// Diagram types
export interface DiagramInfo {
  id: string;
  name: string;
  type: 'bpmn' | 'mermaid' | 'svg';
  category: 'process' | 'journey' | 'architecture';
  subfolder?: string;  // For nested organization (e.g., 'as-is', 'to-be')
  path: string;
  mappingPath?: string;
}

export interface DiagramGroup {
  name: string | null;  // null = root level, otherwise subfolder display name
  diagrams: DiagramInfo[];
}

export interface DiagramMapping {
  elementId: string;
  entityId: string;
  label?: string;
}

export interface DiagramData {
  info: DiagramInfo;
  content: string;
  mappings: DiagramMapping[];
}

export interface DiagramsResponse {
  processes: DiagramGroup[];
  journeys: DiagramGroup[];
  architecture: DiagramGroup[];
  lifecycles: DiagramGroup[];
  sequences: DiagramGroup[];
}

// View types
export type ViewMode = 'list' | 'graph' | 'bpmn' | 'mermaid' | 'svg' | 'glossary' | 'learning-path';

// Sidebar selection types
export type SidebarCategory = 
  | 'graph'           // All Types graph
  | 'entity-type'     // Individual entity type (list view)
  | 'process'         // BPMN process diagram
  | 'journey'         // Mermaid journey diagram
  | 'architecture'    // SVG architecture diagram
  | 'lifecycle'       // Mermaid lifecycle (state) diagram
  | 'sequence'        // Mermaid sequence diagram
  | 'learning-path'   // Guided learning journey
  | 'glossary';       // Glossary table

export interface SidebarSelection {
  category: SidebarCategory;
  id: string | null;  // Entity type ID, diagram ID, or null for all
  folderPath?: string;  // Optional subfolder path for filtering
}
