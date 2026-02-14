import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { api } from './services/api';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import EntityList from './components/EntityList';
import GraphView from './components/GraphView';
import EntityDetail from './components/EntityDetail';
import BpmnViewer from './components/BpmnViewer';
import MermaidViewer from './components/MermaidViewer';
import SvgArchitectureViewer from './components/SvgArchitectureViewer';
import GlossaryTable from './components/GlossaryTable';
import LearningPathViewer from './components/LearningPathViewer';
import type { Entity, SidebarSelection, DiagramsResponse } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Empty diagrams response for initial state
const emptyDiagrams: DiagramsResponse = {
  processes: [],
  journeys: [],
  architecture: [],
  lifecycles: [],
  sequences: [],
};

function App() {
  const [selection, setSelection] = useState<SidebarSelection>({
    category: 'graph',
    id: null,
  });
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch entity types
  const { data: typesData } = useQuery({
    queryKey: ['types'],
    queryFn: () => api.getTypes(),
  });

  // Fetch diagrams list
  const { data: diagramsData } = useQuery({
    queryKey: ['diagrams'],
    queryFn: () => api.getDiagrams(),
  });

  // Determine what entity type to fetch based on selection
  const entityTypeToFetch = 
    selection.category === 'entity-type' ? selection.id :
    selection.category === 'glossary' && selection.id !== 'all' ? selection.id :
    selection.category === 'glossary' && selection.id === 'all' ? undefined :
    undefined;

  // Fetch entities based on selection
  const { data: entitiesData, isLoading: entitiesLoading } = useQuery({
    queryKey: ['entities', entityTypeToFetch],
    queryFn: () => api.getEntities(entityTypeToFetch || undefined),
    enabled: selection.category === 'entity-type' || selection.category === 'glossary',
  });

  // Fetch all entities for graph view and sidebar folder tree
  const { data: allEntitiesData } = useQuery({
    queryKey: ['entities', 'all'],
    queryFn: () => api.getEntities(),
    // Always fetch - needed for sidebar folder tree display
  });

  // Fetch graph data
  const { data: graphData } = useQuery({
    queryKey: ['graph'],
    queryFn: () => api.getGraph(),
    enabled: selection.category === 'graph',
  });

  // Fetch specific diagram when selected
  const diagramCategory = 
    selection.category === 'process' ? 'processes' :
    selection.category === 'journey' ? 'journeys' :
    selection.category === 'architecture' ? 'architecture' :
    selection.category === 'lifecycle' ? 'lifecycles' :
    selection.category === 'sequence' ? 'sequences' : null;

  const { data: diagramData } = useQuery({
    queryKey: ['diagram', diagramCategory, selection.id],
    queryFn: () => api.getDiagram(diagramCategory!, selection.id!),
    enabled: !!diagramCategory && !!selection.id,
  });

  // Search
  const { refetch: performSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => api.search(searchQuery),
    enabled: false,
  });

  // Handle entity selection
  const handleEntityClick = async (entityId: string) => {
    console.log('Entity clicked:', entityId);
    try {
      const entity = await api.getEntity(entityId);
      setSelectedEntity(entity);
    } catch (error) {
      console.error('Failed to fetch entity:', error);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    performSearch();
  };

  // Filter entities for glossary
  const getGlossaryEntities = () => {
    const entities = allEntitiesData?.entities || [];
    if (selection.id === 'all') {
      return entities.filter(e => e.type.startsWith('jargon-'));
    }
    return entities.filter(e => e.type === selection.id);
  };

  // Render the appropriate view based on selection
  const renderContent = () => {
    // Loading state
    if (entitiesLoading && (selection.category === 'entity-type' || selection.category === 'glossary')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    switch (selection.category) {
      case 'graph':
        return graphData ? (
          <GraphView graphData={graphData} onNodeClick={handleEntityClick} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading graph...</div>
          </div>
        );

      case 'entity-type': {
        // Filter entities by folder path if specified
        let displayEntities = entitiesData?.entities || [];
        if (selection.folderPath) {
          displayEntities = displayEntities.filter(e => 
            e.folder_path?.startsWith(selection.folderPath!)
          );
        }
        return (
          <div className="h-full overflow-y-auto">
            <EntityList
              entities={displayEntities}
              entityTypes={typesData?.entity_types || []}
              onEntityClick={handleEntityClick}
            />
          </div>
        );
      }

      case 'process':
        if (!diagramData) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">📋</span>
              <h3 className="text-xl font-medium">No BPMN Diagram Available</h3>
              <p className="text-sm mt-2">Add a .bpmn file to domain-knowledge/diagrams/processes/</p>
            </div>
          );
        }
        return (
          <BpmnViewer
            bpmnXml={diagramData.content}
            mappings={diagramData.mappings.map(m => ({
              bpmnElementId: m.elementId,
              entityId: m.entityId,
              label: m.label,
            }))}
            onElementClick={handleEntityClick}
            title={diagramData.info.name}
          />
        );

      case 'journey':
        if (!diagramData) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🗺️</span>
              <h3 className="text-xl font-medium">No Journey Diagram Available</h3>
              <p className="text-sm mt-2">Add a mermaid diagram to domain-knowledge/diagrams/journeys/</p>
            </div>
          );
        }
        return (
          <MermaidViewer
            chart={diagramData.content}
            onNodeClick={handleEntityClick}
            title={diagramData.info.name}
          />
        );

      case 'architecture':
        if (!diagramData) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🏗️</span>
              <h3 className="text-xl font-medium">No Architecture Diagram Available</h3>
              <p className="text-sm mt-2">Add an SVG file to domain-knowledge/diagrams/architecture/</p>
            </div>
          );
        }
        return (
          <SvgArchitectureViewer
            svgContent={diagramData.content}
            mappings={diagramData.mappings.map(m => ({
              svgElementId: m.elementId,
              entityId: m.entityId,
              label: m.label,
            }))}
            onElementClick={handleEntityClick}
            title={diagramData.info.name}
          />
        );

      case 'lifecycle':
        if (!diagramData) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🔁</span>
              <h3 className="text-xl font-medium">No Lifecycle Diagram Available</h3>
              <p className="text-sm mt-2">Add a mermaid state diagram to domain-knowledge/diagrams/lifecycles/</p>
            </div>
          );
        }
        return (
          <MermaidViewer
            chart={diagramData.content}
            onNodeClick={handleEntityClick}
            title={diagramData.info.name}
          />
        );

      case 'sequence':
        if (!diagramData) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">📋</span>
              <h3 className="text-xl font-medium">No Sequence Diagram Available</h3>
              <p className="text-sm mt-2">Add a mermaid sequence diagram to domain-knowledge/diagrams/sequences/</p>
            </div>
          );
        }
        return (
          <MermaidViewer
            chart={diagramData.content}
            onNodeClick={handleEntityClick}
            title={diagramData.info.name}
          />
        );

      case 'glossary':
        return (
          <GlossaryTable
            entities={getGlossaryEntities()}
            entityTypes={typesData?.entity_types || []}
            onEntityClick={handleEntityClick}
            title={
              selection.id === 'all' ? 'All Glossary Terms' :
              selection.id === 'jargon-business' ? 'Business Jargon' :
              selection.id === 'jargon-tech' ? 'Technical Jargon' :
              'Glossary'
            }
            category={
              selection.id === 'jargon-business' ? 'business' :
              selection.id === 'jargon-tech' ? 'tech' :
              'all'
            }
          />
        );

      case 'learning-path': {
        const learningPathEntity = allEntitiesData?.entities.find(
          e => e.type === 'learning-path' && e.id === selection.id
        );
        if (!learningPathEntity) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🎓</span>
              <h3 className="text-xl font-medium">Learning Path Not Found</h3>
              <p className="text-sm mt-2">Select a learning path from the sidebar</p>
            </div>
          );
        }
        return (
          <LearningPathViewer
            entity={learningPathEntity}
            onEntityClick={handleEntityClick}
            onDiagramClick={(diagramId) => {
              // Try to navigate to the diagram
              setSelection({ category: 'process', id: diagramId });
            }}
          />
        );
      }

      default:
        return null;
    }
  };

  // Get title for current view
  const getViewTitle = () => {
    switch (selection.category) {
      case 'graph':
        return 'Knowledge Graph';
      case 'entity-type':
        const entityType = typesData?.entity_types.find(t => t.id === selection.id);
        let title = entityType?.display_name || 'Entities';
        if (selection.folderPath) {
          const folderName = selection.folderPath.split('/').pop() || '';
          title += ' / ' + folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
        return title;
      case 'process':
        return diagramData?.info.name || 'Business Process';
      case 'journey':
        return diagramData?.info.name || 'Customer Journey';
      case 'architecture':
        return diagramData?.info.name || 'Architecture View';
      case 'lifecycle':
        return diagramData?.info.name || 'Lifecycle Diagram';
      case 'sequence':
        return diagramData?.info.name || 'Sequence Diagram';
      case 'glossary':
        return selection.id === 'all' ? 'All Glossary Terms' :
               selection.id === 'jargon-business' ? 'Business Jargon' :
               'Technical Jargon';
      case 'learning-path': {
        const learningPath = allEntitiesData?.entities.find(
          e => e.type === 'learning-path' && e.id === selection.id
        );
        return learningPath?.name || 'Learning Path';
      }
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        entityTypes={typesData?.entity_types || []}
        diagrams={diagramsData || emptyDiagrams}
        selection={selection}
        onSelectionChange={setSelection}
        entities={allEntitiesData?.entities || []}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{getViewTitle()}</h2>
              {selection.category === 'entity-type' && entitiesData && (
                <p className="text-sm text-gray-500">
                  {entitiesData.entities.length} items
                </p>
              )}
            </div>
            <div className="w-96">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-600">
              Showing results for "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Entity Detail Panel */}
      {selectedEntity && (
        <EntityDetail
          entity={selectedEntity}
          entityTypes={typesData?.entity_types || []}
          onClose={() => setSelectedEntity(null)}
          onEntityClick={handleEntityClick}
        />
      )}

    </div>
  );
}

export default function AppWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
