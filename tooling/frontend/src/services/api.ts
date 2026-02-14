import type {
  Entity,
  EntityListResponse,
  GraphData,
  SearchResponse,
  TypesResponse,
  DiagramsResponse,
  DiagramData,
} from '../types';

const API_BASE_URL = '/api';

export const api = {
  // Get all entities
  async getEntities(type?: string, limit = 500, offset = 0): Promise<EntityListResponse> {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());

    const response = await fetch(`${API_BASE_URL}/entities?${params}`);
    if (!response.ok) throw new Error('Failed to fetch entities');
    return response.json();
  },

  // Get single entity
  async getEntity(id: string): Promise<Entity> {
    const response = await fetch(`${API_BASE_URL}/entities/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch entity ${id}`);
    return response.json();
  },

  // Get graph data
  async getGraph(types?: string, center?: string, depth = 2): Promise<GraphData> {
    const params = new URLSearchParams();
    if (types) params.append('types', types);
    if (center) params.append('center', center);
    params.append('depth', depth.toString());

    const response = await fetch(`${API_BASE_URL}/graph?${params}`);
    if (!response.ok) throw new Error('Failed to fetch graph');
    return response.json();
  },

  // Search entities
  async search(query: string): Promise<SearchResponse> {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`${API_BASE_URL}/search?${params}`);
    if (!response.ok) throw new Error('Failed to search');
    return response.json();
  },

  // Get entity and relationship types
  async getTypes(): Promise<TypesResponse> {
    const response = await fetch(`${API_BASE_URL}/types`);
    if (!response.ok) throw new Error('Failed to fetch types');
    return response.json();
  },

  // Get all diagrams
  async getDiagrams(): Promise<DiagramsResponse> {
    const response = await fetch(`${API_BASE_URL}/diagrams`);
    if (!response.ok) throw new Error('Failed to fetch diagrams');
    return response.json();
  },

  // Get single diagram with content and mappings
  async getDiagram(category: string, id: string): Promise<DiagramData> {
    const response = await fetch(`${API_BASE_URL}/diagrams/${category}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch diagram ${id}`);
    return response.json();
  },
};
