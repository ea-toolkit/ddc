import { 
  ArrowRight, 
  User, 
  Zap, 
  Tag,
  Target,
  Users,
  Settings,
  Plug,
  Database,
  RefreshCw,
  MapPin,
  Briefcase,
  Cpu
} from 'lucide-react';
import type { Entity, EntityType } from '../types';

// Icon mapping for entity types
const entityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'capability': Target,
  'team': Users,
  'system': Settings,
  'api': Plug,
  'data-model': Database,
  'process': RefreshCw,
  'journey': MapPin,
  'jargon-business': Briefcase,
  'jargon-tech': Cpu,
};

interface EntityCardProps {
  entity: Entity;
  entityTypes: EntityType[];
  onClick: (id: string) => void;
}

function EntityCard({ entity, entityTypes, onClick }: EntityCardProps) {
  const entityType = entityTypes.find((t) => t.id === entity.type);
  const accentColor = entityType?.color || '#6366f1';

  // Get status badge color
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
      case 'existing': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'planned':
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'deprecated': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Check if this is a capability type
  const isCapability = entity.type === 'capability';
  
  // Get the Lucide icon component for this entity type
  const IconComponent = entityIcons[entity.type];

  const status = entity.metadata.status as string | undefined;
  const owner = entity.metadata.owner as string | undefined;
  const businessValue = entity.metadata.business_value as string | undefined;

  return (
    <button
      onClick={() => onClick(entity.id)}
      className="group w-full text-left bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Color accent bar */}
      <div 
        className="h-1 w-full"
        style={{ backgroundColor: accentColor }}
      />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              {IconComponent ? (
                <IconComponent className="w-5 h-5" style={{ color: accentColor }} />
              ) : (
                <span className="text-lg">{entityType?.icon || '•'}</span>
              )}
            </div>
            {/* For capabilities, show name inline. For others, show type label */}
            {isCapability ? (
              <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-700">
                {entity.name}
              </h3>
            ) : (
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {entityType?.display_name}
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Title - only show for non-capabilities since they show it inline */}
        {!isCapability && (
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-gray-700">
            {entity.name}
          </h3>
        )}

        {/* Description */}
        {entity.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {entity.description}
          </p>
        )}

        {/* Footer metadata */}
        <div className="flex items-center gap-3 flex-wrap">
          {status && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {status}
            </span>
          )}
          
          {businessValue && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Zap className="w-3 h-3" />
              {businessValue}
            </span>
          )}

          {owner && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <User className="w-3 h-3" />
              {owner}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

interface EntityListProps {
  entities: Entity[];
  entityTypes: EntityType[];
  onEntityClick: (id: string) => void;
}

export default function EntityList({
  entities,
  entityTypes,
  onEntityClick,
}: EntityListProps) {
  if (entities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Tag className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No entities found</h3>
        <p className="text-sm text-gray-500">Try selecting a different category or adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{entities.length}</span> items
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {entities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              entityTypes={entityTypes}
              onClick={onEntityClick}
            />
          ))}
      </div>
    </div>
  );
}
