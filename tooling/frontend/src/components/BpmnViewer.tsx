import { useEffect, useRef, useState, useCallback } from 'react';

interface BpmnMapping {
  bpmnElementId: string;
  entityId: string;
  label?: string;
}

interface BpmnViewerProps {
  bpmnXml: string;
  mappings?: BpmnMapping[];
  onElementClick?: (entityId: string) => void;
  title?: string;
}

export default function BpmnViewer({ 
  bpmnXml, 
  mappings = [], 
  onElementClick,
  title 
}: BpmnViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const initViewer = useCallback(async () => {
    if (!containerRef.current || !bpmnXml) return;

    setIsLoading(true);
    setError(null);

    try {
      // Dynamically import bpmn-js to avoid SSR issues
      const BpmnViewer = (await import('bpmn-js/lib/Viewer')).default;
      
      // Clean up existing viewer
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }

      // Create new viewer
      const viewer = new BpmnViewer({
        container: containerRef.current,
      });

      viewerRef.current = viewer;

      // Import the BPMN XML
      await viewer.importXML(bpmnXml);

      // Get canvas and fit to viewport
      const canvas = viewer.get('canvas');
      canvas.zoom('fit-viewport');

      // Set up click handlers for mapped elements
      const eventBus = viewer.get('eventBus');
      const elementRegistry = viewer.get('elementRegistry');

      eventBus.on('element.click', (event: any) => {
        const elementId = event.element.id;
        const mapping = mappings.find((m) => m.bpmnElementId === elementId);
        if (mapping && onElementClick) {
          onElementClick(mapping.entityId);
        }
      });

      eventBus.on('element.hover', (event: any) => {
        const elementId = event.element.id;
        const mapping = mappings.find((m) => m.bpmnElementId === elementId);
        if (mapping) {
          setHoveredElement(mapping.label || mapping.entityId);
        }
      });

      eventBus.on('element.out', () => {
        setHoveredElement(null);
      });

      // Add overlays for mapped elements
      try {
        const overlays = viewer.get('overlays');
        mappings.forEach((mapping) => {
          const element = elementRegistry.get(mapping.bpmnElementId);
          if (element) {
            overlays.add(mapping.bpmnElementId, {
              position: { top: -12, right: -12 },
              html: `<div style="cursor:pointer;font-size:12px;background:white;border-radius:50%;padding:2px 4px;box-shadow:0 1px 3px rgba(0,0,0,0.3);" title="${mapping.label || mapping.entityId}">🔗</div>`,
            });
          }
        });
      } catch (overlayError) {
        console.warn('Could not add overlays:', overlayError);
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Failed to render BPMN:', err);
      setError(`Failed to render BPMN diagram: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [bpmnXml, mappings, onElementClick]);

  useEffect(() => {
    initViewer();

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
        viewerRef.current = null;
      }
    };
  }, [initViewer]);

  // Zoom controls
  const handleZoomIn = () => {
    try {
      const canvas = viewerRef.current?.get('canvas');
      if (canvas) {
        const currentZoom = canvas.zoom();
        canvas.zoom(currentZoom * 1.2);
      }
    } catch (e) {
      console.warn('Zoom error:', e);
    }
  };

  const handleZoomOut = () => {
    try {
      const canvas = viewerRef.current?.get('canvas');
      if (canvas) {
        const currentZoom = canvas.zoom();
        canvas.zoom(currentZoom / 1.2);
      }
    } catch (e) {
      console.warn('Zoom error:', e);
    }
  };

  const handleFitView = () => {
    try {
      const canvas = viewerRef.current?.get('canvas');
      if (canvas) {
        canvas.zoom('fit-viewport');
      }
    } catch (e) {
      console.warn('Fit view error:', e);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-50 p-8">
        <span className="text-4xl mb-4">⚠️</span>
        <div className="text-red-600 text-center">{error}</div>
        <button 
          onClick={initViewer}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          <p className="text-sm text-gray-500">
            BPMN Process Diagram • {mappings.length} linked elements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            title="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            title="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={handleFitView}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            title="Fit to View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hovered element info */}
      {hoveredElement && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm">
          <span className="text-blue-700">
            🔗 Click to view: <strong>{hoveredElement}</strong>
          </span>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="text-gray-500">Loading BPMN diagram...</div>
        </div>
      )}

      {/* BPMN Container */}
      <div 
        ref={containerRef} 
        className="flex-1 bg-white relative"
        style={{ minHeight: '500px' }}
      />

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <span>🔗 = Linked to entity (clickable)</span>
          <span>|</span>
          <span>Drag to pan • Scroll to zoom</span>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .bjs-powered-by {
          display: none !important;
        }
        .djs-element:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
