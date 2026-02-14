import { useState } from 'react';
import { 
  Brain,
  Network,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Box,
  GitBranch,
  Map,
  Building2,
  BookOpen,
  Minus,
  Plus,
  Target,
  Users,
  Settings,
  Plug,
  Database,
  RefreshCw,
  MapPin,
  Briefcase,
  Cpu,
  DollarSign,
  Share2,
  Compass,
  ScrollText,
  GraduationCap,
  LucideIcon
} from 'lucide-react';
import type { EntityType, DiagramGroup, SidebarSelection, SidebarCategory, Entity } from '../types';

// Map entity type icons to Lucide components
const entityIcons: Record<string, LucideIcon> = {
  'capability': Target,
  'team': Users,
  'system': Settings,
  'integration': Plug,
  'data-entity': Database,
  'process': RefreshCw,
  'journey': MapPin,
  'domain': Briefcase,
  'technology': Cpu,
};

interface SidebarProps {
  entityTypes: EntityType[];
  diagrams: {
    processes: DiagramGroup[];
    journeys: DiagramGroup[];
    architecture: DiagramGroup[];
    lifecycles: DiagramGroup[];
    sequences: DiagramGroup[];
  };
  selection: SidebarSelection;
  onSelectionChange: (selection: SidebarSelection) => void;
  entities?: Entity[];
}

// Folder tree node
interface FolderNode {
  name: string;
  path: string;
  count: number;
  children: FolderNode[];
}

// Build folder tree from entities
function buildFolderTree(entities: Entity[], typeId: string): FolderNode[] {
  const typeEntities = entities.filter(e => e.type === typeId);
  const folderMap: Record<string, FolderNode> = {};
  
  typeEntities.forEach(entity => {
    if (entity.folder_path) {
      const parts = entity.folder_path.split('/').filter(p => p);
      let currentPath = '';
      
      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!folderMap[currentPath]) {
          folderMap[currentPath] = {
            name: part,
            path: currentPath,
            count: 0,
            children: []
          };
        }
        
        if (parentPath && folderMap[parentPath]) {
          const parent = folderMap[parentPath];
          if (!parent.children.find((c: FolderNode) => c.path === currentPath)) {
            parent.children.push(folderMap[currentPath]);
          }
        }
        
        if (index === parts.length - 1) {
          folderMap[currentPath].count++;
        }
      });
    }
  });
  
  return Object.values(folderMap).filter((f: FolderNode) => !f.path.includes('/'));
}

// Format folder name
function formatName(name: string): string {
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function Sidebar({
  entityTypes,
  diagrams,
  selection,
  onSelectionChange,
  entities = [],
}: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    learningPaths: true,
    northStar: true,
    constitution: true,
    entityTypes: true,
    processes: true,
    journeys: true,
    architecture: true,
    lifecycles: true,
    sequences: true,
    personas: true,
    costs: true,
    common: true,
    glossary: true,
  });

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSelected = (category: SidebarCategory, id: string | null, folderPath?: string) => {
    return selection.category === category && 
           selection.id === id && 
           selection.folderPath === folderPath;
  };

  // Types to exclude from regular Entities section (shown in their own sections)
  const excludedFromEntities = [
    'jargon-', // Glossary section
    'process', // Processes section
    'journey', // Journeys section
    'vision', // North Star section
    'five-year-plan', // North Star section
    'roadmap', // North Star section
    'constitution-', // Constitution section
    'lifecycle', // Lifecycles section
    'sequence', // Sequences section
    'persona', // Personas section
    'learning-path', // Learning Paths section
  ];

  const regularTypes = entityTypes.filter(
    t => !excludedFromEntities.some(excluded => 
      excluded.endsWith('-') ? t.id.startsWith(excluded) : t.id === excluded
    )
  );
  const jargonTypes = entityTypes.filter(t => t.id.startsWith('jargon-'));

  const hasSubfolders = (typeId: string) => entities.some(e => e.type === typeId && e.folder_path);

  // Render folder tree recursively
  const renderFolders = (folders: FolderNode[], typeId: string, depth: number = 0): JSX.Element[] => {
    return folders.map(folder => {
      const key = `folder-${typeId}-${folder.path}`;
      const isExpanded = expanded[key] ?? false;
      const hasChildren = folder.children.length > 0;
      const isActive = isSelected('entity-type', typeId, folder.path);
      
      return (
        <div key={folder.path}>
          <div 
            className="flex items-center group"
            style={{ paddingLeft: `${20 + depth * 16}px` }}
          >
            {hasChildren ? (
              <button
                onClick={() => toggle(key)}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? (
                  <Minus className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <button
              onClick={() => onSelectionChange({ category: 'entity-type', id: typeId, folderPath: folder.path })}
              className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-gray-400" />
              ) : (
                <Folder className="w-4 h-4 text-gray-400" />
              )}
              <span className="truncate">{formatName(folder.name)}</span>
              <span className="ml-auto text-xs text-gray-400 tabular-nums">{folder.count}</span>
            </button>
          </div>
          {hasChildren && isExpanded && renderFolders(folder.children, typeId, depth + 1)}
        </div>
      );
    });
  };

  // Render diagram groups
  const renderDiagrams = (groups: DiagramGroup[], category: SidebarCategory) => {
    const hasAny = groups.some(g => g.diagrams.length > 0);
    if (!hasAny) {
      return (
        <p className="px-4 py-2 text-xs text-gray-400 italic">No diagrams yet</p>
      );
    }

    return groups.map((group, i) => (
      <div key={i}>
        {group.name && (
          <div className="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
            {group.name}
          </div>
        )}
        {group.diagrams.map(diagram => (
          <button
            key={diagram.id}
            onClick={() => onSelectionChange({ category, id: diagram.id })}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              group.name ? 'pl-8' : ''
            } ${
              isSelected(category, diagram.id)
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {diagram.name}
          </button>
        ))}
      </div>
    ));
  };

  // Section header component
  const SectionHeader = ({ 
    label, 
    sectionKey, 
    icon: Icon 
  }: { 
    label: string; 
    sectionKey: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <button
      onClick={() => toggle(sectionKey)}
      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {expanded[sectionKey] ? (
        <ChevronDown className="w-4 h-4 text-gray-400" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">DDC</h1>
            <p className="text-xs text-gray-500">DDC Knowledge Base</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Knowledge Graph */}
        <div className="px-3 mb-2">
          <button
            onClick={() => onSelectionChange({ category: 'graph', id: null })}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              isSelected('graph', null)
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isSelected('graph', null) 
                ? 'bg-indigo-100' 
                : 'bg-gray-100'
            }`}>
              <Network className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">Knowledge Graph</div>
              <div className="text-xs text-gray-500">Visualize connections</div>
            </div>
          </button>
        </div>

        <div className="h-px bg-gray-100 mx-4 my-2" />

        {/* Learning Paths - Guided reading journeys */}
        <div>
          <SectionHeader label="Learning Paths" sectionKey="learningPaths" icon={GraduationCap} />
          {expanded.learningPaths && (
            <div className="py-1">
              {entities.filter(e => e.type === 'learning-path').length > 0 ? (
                entities.filter(e => e.type === 'learning-path').map(path => (
                  <button
                    key={path.id}
                    onClick={() => onSelectionChange({ category: 'learning-path', id: path.id })}
                    className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                      isSelected('learning-path', path.id)
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span>{path.metadata?.icon || '📚'}</span>
                    {path.name.replace(' Path', '')}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-xs text-gray-400 italic">No learning paths yet</p>
              )}
            </div>
          )}
        </div>

        {/* North Star - Vision, Mission, Strategy */}
        <div>
          <SectionHeader label="North Star" sectionKey="northStar" icon={Compass} />
          {expanded.northStar && (
            <div className="py-1">
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'vision' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'vision')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Compass className="w-4 h-4" />
                Vision & Mission
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'five-year-plan' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'five-year-plan')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Target className="w-4 h-4" />
                5-Year Plan
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'roadmap' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'roadmap')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Map className="w-4 h-4" />
                Roadmap
              </button>
            </div>
          )}
        </div>

        {/* Constitution - Business, Technology, Data principles */}
        <div>
          <SectionHeader label="Constitution" sectionKey="constitution" icon={ScrollText} />
          {expanded.constitution && (
            <div className="py-1">
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'constitution-business' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'constitution-business')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Business
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'constitution-technology' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'constitution-technology')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Cpu className="w-4 h-4" />
                Technology
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'constitution-data' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'constitution-data')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Database className="w-4 h-4" />
                Data
              </button>
            </div>
          )}
        </div>

        {/* Entity Types */}
        <div>
          <SectionHeader label="Entities" sectionKey="entityTypes" icon={Box} />
          {expanded.entityTypes && (
            <div className="py-1">
              {regularTypes.map(type => {
                const typeKey = `type-${type.id}`;
                const hasFolders = hasSubfolders(type.id);
                const isTypeExpanded = expanded[typeKey] ?? false;
                const folders = hasFolders ? buildFolderTree(entities, type.id) : [];
                const isActive = isSelected('entity-type', type.id, undefined);
                
                return (
                  <div key={type.id}>
                    <div className="flex items-center px-4">
                      {hasFolders ? (
                        <button
                          onClick={() => toggle(typeKey)}
                          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                          {isTypeExpanded ? (
                            <Minus className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </button>
                      ) : (
                        <span className="w-5" />
                      )}
                      <button
                        onClick={() => onSelectionChange({ category: 'entity-type', id: type.id, folderPath: undefined })}
                        className={`flex-1 flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {(() => {
                          const IconComponent = entityIcons[type.icon] || Box;
                          return <IconComponent className="w-4 h-4" />;
                        })()}
                        <span>{type.display_name}</span>
                      </button>
                    </div>
                    {hasFolders && isTypeExpanded && (
                      <div className="py-1">{renderFolders(folders, type.id)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Business Processes */}
        <div>
          <SectionHeader label="Processes" sectionKey="processes" icon={GitBranch} />
          {expanded.processes && (
            <div className="py-1">
              {renderDiagrams(diagrams.processes, 'process')}
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'process' })}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  isSelected('entity-type', 'process')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                View All
              </button>
            </div>
          )}
        </div>

        {/* Customer Journeys */}
        <div>
          <SectionHeader label="Journeys" sectionKey="journeys" icon={Map} />
          {expanded.journeys && (
            <div className="py-1">
              {renderDiagrams(diagrams.journeys, 'journey')}
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'journey' })}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  isSelected('entity-type', 'journey')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                View All
              </button>
            </div>
          )}
        </div>

        {/* Architecture Views */}
        <div>
          <SectionHeader label="Architecture" sectionKey="architecture" icon={Building2} />
          {expanded.architecture && (
            <div className="py-1">
              {renderDiagrams(diagrams.architecture, 'architecture')}
            </div>
          )}
        </div>

        {/* Lifecycles - State flow diagrams */}
        <div>
          <SectionHeader label="Lifecycles" sectionKey="lifecycles" icon={RefreshCw} />
          {expanded.lifecycles && (
            <div className="py-1">
              {diagrams.lifecycles && diagrams.lifecycles.length > 0 ? (
                renderDiagrams(diagrams.lifecycles, 'lifecycle')
              ) : (
                <button
                  onClick={() => onSelectionChange({ category: 'entity-type', id: 'lifecycle' })}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                    isSelected('entity-type', 'lifecycle')
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  All Lifecycles
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sequences - Sequence diagrams */}
        <div>
          <SectionHeader label="Sequences" sectionKey="sequences" icon={GitBranch} />
          {expanded.sequences && (
            <div className="py-1">
              {diagrams.sequences && diagrams.sequences.length > 0 ? (
                renderDiagrams(diagrams.sequences, 'sequence')
              ) : (
                <button
                  onClick={() => onSelectionChange({ category: 'entity-type', id: 'sequence' })}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                    isSelected('entity-type', 'sequence')
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <GitBranch className="w-4 h-4" />
                  All Sequences
                </button>
              )}
            </div>
          )}
        </div>

        {/* Personas - User roles and stakeholders */}
        <div>
          <SectionHeader label="Personas" sectionKey="personas" icon={Users} />
          {expanded.personas && (
            <div className="py-1">
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'persona' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'persona')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                All Personas
              </button>
            </div>
          )}
        </div>

        {/* Costs - Domain running and operational costs */}
        <div>
          <SectionHeader label="Costs" sectionKey="costs" icon={DollarSign} />
          {expanded.costs && (
            <div className="py-1">
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'cost' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'cost')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Operational Costs
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'running-cost' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'running-cost')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Running Costs
              </button>
            </div>
          )}
        </div>

        {/* Common - Commonly applicable items used across the domain */}
        <div>
          <SectionHeader label="Common" sectionKey="common" icon={Share2} />
          {expanded.common && (
            <div className="py-1">
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'common-pattern' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'common-pattern')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Share2 className="w-4 h-4" />
                Common Patterns
              </button>
              <button
                onClick={() => onSelectionChange({ category: 'entity-type', id: 'shared-service' })}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  isSelected('entity-type', 'shared-service')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Plug className="w-4 h-4" />
                Shared Services
              </button>
            </div>
          )}
        </div>

        {/* Glossary */}
        <div>
          <SectionHeader label="Glossary" sectionKey="glossary" icon={BookOpen} />
          {expanded.glossary && (
            <div className="py-1">
              {jargonTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => onSelectionChange({ category: 'glossary', id: type.id })}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                    isSelected('glossary', type.id)
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{type.icon}</span>
                  {type.display_name}
                </button>
              ))}
              <button
                onClick={() => onSelectionChange({ category: 'glossary', id: 'all' })}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  isSelected('glossary', 'all')
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                All Terms
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>v1.0.0</span>
          <span>{entities.length} entities</span>
        </div>
      </div>
    </div>
  );
}
