import { useState, useMemo } from 'react';
import type { Entity, EntityType } from '../types';

interface GlossaryTableProps {
  entities: Entity[];
  entityTypes: EntityType[];
  onEntityClick: (entityId: string) => void;
  title?: string;
  category?: 'business' | 'tech' | 'all';
}

export default function GlossaryTable({
  entities,
  entityTypes,
  onEntityClick,
  title = 'Glossary',
  category = 'all',
}: GlossaryTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'type'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort entities
  const filteredEntities = useMemo(() => {
    let filtered = entities;

    // Filter by category if specified
    if (category !== 'all') {
      filtered = filtered.filter((e) => {
        if (category === 'business') return e.type === 'jargon-business';
        if (category === 'tech') return e.type === 'jargon-tech';
        return true;
      });
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(search) ||
          e.description?.toLowerCase().includes(search) ||
          e.content?.toLowerCase().includes(search)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        comparison = a.type.localeCompare(b.type);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [entities, category, searchTerm, sortBy, sortOrder]);

  const handleSort = (column: 'name' | 'type') => {
    if (sortBy === column) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getTypeInfo = (typeId: string) => {
    return entityTypes.find((t) => t.id === typeId);
  };

  const getSortIcon = (column: 'name' | 'type') => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  // Extract first paragraph as definition
  const getDefinition = (entity: Entity): string => {
    if (entity.description) return entity.description;
    if (entity.content) {
      // Get first paragraph after any heading
      const lines = entity.content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-')) {
          return trimmed.length > 200 ? trimmed.slice(0, 200) + '...' : trimmed;
        }
      }
    }
    return 'No definition available';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">
              {filteredEntities.length} terms • Click a term to view full definition
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <span className="flex items-center">
                  Term {getSortIcon('name')}
                </span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-32"
                onClick={() => handleSort('type')}
              >
                <span className="flex items-center">
                  Category {getSortIcon('type')}
                </span>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Definition
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntities.map((entity) => {
              const typeInfo = getTypeInfo(entity.type);
              return (
                <tr
                  key={entity.id}
                  onClick={() => onEntityClick(entity.id)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{typeInfo?.icon || '📖'}</span>
                      <span className="font-medium text-gray-900">{entity.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${typeInfo?.color}20`,
                        color: typeInfo?.color,
                      }}
                    >
                      {typeInfo?.display_name || entity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {getDefinition(entity)}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredEntities.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>No terms found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Footer with alphabet quick navigation */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex flex-wrap gap-1 justify-center">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
            const hasTerms = filteredEntities.some((e) =>
              e.name.toUpperCase().startsWith(letter)
            );
            return (
              <button
                key={letter}
                onClick={() => setSearchTerm(letter)}
                disabled={!hasTerms}
                className={`w-7 h-7 text-xs font-medium rounded ${
                  hasTerms
                    ? 'text-gray-700 hover:bg-gray-200'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
          <button
            onClick={() => setSearchTerm('')}
            className="px-2 h-7 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
