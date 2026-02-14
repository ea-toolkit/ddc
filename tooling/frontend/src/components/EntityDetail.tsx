import { marked } from 'marked';
import { useMemo } from 'react';
import { 
  X, 
  ExternalLink,
  User,
  Zap,
  Shield,
  Link2,
  FileText,
  Tag,
  Clock,
  Layers,
  Target,
  Users,
  Settings,
  Plug,
  Database,
  RefreshCw,
  MapPin,
  Briefcase,
  Cpu,
  Box,
  LucideIcon
} from 'lucide-react';
import type { Entity, EntityType } from '../types';

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

// Helper to get icon component
const getEntityIcon = (iconKey: string | undefined): LucideIcon => {
  if (!iconKey) return Box;
  return entityIcons[iconKey] || Box;
};

interface EntityDetailProps {
  entity: Entity;
  entityTypes: EntityType[];
  onClose: () => void;
  onEntityClick: (id: string) => void;
}

export default function EntityDetail({
  entity,
  entityTypes,
  onClose,
  onEntityClick,
}: EntityDetailProps) {
  const entityType = entityTypes.find((t) => t.id === entity.type);
  const accentColor = entityType?.color || '#6366f1';
  
  // Render markdown content synchronously
  const renderedContent = useMemo(() => {
    if (!entity.content) return '';
    return marked.parse(entity.content, { async: false }) as string;
  }, [entity.content]);

  // Get status badge style
  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'planned': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'deprecated': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Get icon for metadata key
  const getMetadataIcon = (key: string) => {
    switch (key) {
      case 'owner': return User;
      case 'status': return Tag;
      case 'business_value': return Zap;
      case 'complexity': return Layers;
      case 'group': return Shield;
      default: return Clock;
    }
  };

  const status = entity.metadata.status as string | undefined;

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-2xl overflow-hidden z-50 flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100">
        {/* Color accent */}
        <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {(() => {
                const IconComponent = getEntityIcon(entityType?.icon);
                return (
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                );
              })()}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {entityType?.display_name}
                  </span>
                  {status && (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyle(status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {status}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {entity.name}
                </h2>
                {entity.description && (
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {entity.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Metadata Grid */}
          {Object.entries(entity.metadata).some(([key]) => 
            !['type', 'id', 'name', 'description'].includes(key) && !Array.isArray(entity.metadata[key])
          ) && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Properties
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(entity.metadata).map(([key, value]) => {
                  if (
                    key === 'type' ||
                    key === 'id' ||
                    key === 'name' ||
                    key === 'description' ||
                    Array.isArray(value)
                  ) return null;

                  const Icon = getMetadataIcon(key);

                  return (
                    <div 
                      key={key}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-gray-400 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 truncate">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Relationships */}
          {entity.related_entities && entity.related_entities.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Related ({entity.related_entities.length})
              </h3>
              <div className="space-y-2">
                {entity.related_entities.map((related) => {
                  const relatedType = entityTypes.find((t) => t.id === related.type);
                  const relatedColor = relatedType?.color || '#6366f1';
                  const RelatedIcon = getEntityIcon(relatedType?.icon);
                  
                  return (
                    <button
                      key={related.id}
                      onClick={() => onEntityClick(related.id)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${relatedColor}15`, color: relatedColor }}
                        >
                          <RelatedIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {related.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {relatedType?.display_name}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Documentation Content */}
          {entity.content && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documentation
              </h3>
              <div 
                className="prose prose-sm max-w-none
                  prose-headings:text-gray-900 prose-headings:font-semibold
                  prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
                  prose-ul:text-gray-600 prose-ol:text-gray-600
                  prose-li:my-1
                  prose-table:text-sm
                  prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:border prose-th:border-gray-200
                  prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-gray-200"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-gray-100 px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>ID: {entity.id}</span>
          {entity.folder_path && (
            <span className="flex items-center gap-1">
              <span>📁</span>
              {entity.folder_path}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
