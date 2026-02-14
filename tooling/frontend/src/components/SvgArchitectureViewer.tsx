import { useEffect, useRef, useState } from 'react';

interface SvgMapping {
  svgElementId: string;
  entityId: string;
  label?: string;
}

interface SvgArchitectureViewerProps {
  svgContent: string;
  mappings?: SvgMapping[];
  onElementClick?: (entityId: string) => void;
  title?: string;
}

export default function SvgArchitectureViewer({
  svgContent,
  mappings = [],
  onElementClick,
  title,
}: SvgArchitectureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = useState<SvgMapping | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    // Parse and modify SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');

    if (!svgElement) return;

    // Add interactivity to mapped elements
    mappings.forEach((mapping) => {
      const element = svgElement.querySelector(`#${mapping.svgElementId}`);
      if (element) {
        // Add data attributes for identification
        element.setAttribute('data-entity-id', mapping.entityId);
        element.setAttribute('data-interactive', 'true');
        
        // Add visual styling class
        element.classList.add('svg-interactive-element');
        
        // Wrap text in tspan if it's a text element
        if (mapping.label) {
          element.setAttribute('data-label', mapping.label);
        }
      }
    });

    // Set SVG to fill container
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    svgElement.style.maxWidth = '100%';
    svgElement.style.height = 'auto';

    // Update container
    containerRef.current.innerHTML = svgElement.outerHTML;

    // Auto-fit: center and scale SVG to container
    const svgInDom = containerRef.current.querySelector('svg');
    if (svgInDom && containerRef.current) {
      const bbox = (svgInDom as SVGSVGElement).getBBox();
      const containerRect = containerRef.current.getBoundingClientRect();
      const scaleX = containerRect.width / (bbox.width || 1);
      const scaleY = containerRect.height / (bbox.height || 1);
      const scale = Math.min(scaleX, scaleY) * 0.95; // small padding
      setZoom(() => Math.min(Math.max(scale, 0.3), 3));
      // center content
      const offsetX = (containerRect.width - bbox.width * scale) / 2 - bbox.x * scale;
      const offsetY = (containerRect.height - bbox.height * scale) / 2 - bbox.y * scale;
      setPan({ x: offsetX, y: offsetY });
    }

    // Add event listeners to interactive elements
    const interactiveElements = containerRef.current.querySelectorAll('[data-interactive="true"]');
    
    interactiveElements.forEach((element) => {
      const entityId = element.getAttribute('data-entity-id');
      const label = element.getAttribute('data-label');

      // Click handler
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (entityId && onElementClick) {
          onElementClick(entityId);
        }
      });

      // Hover handlers
      element.addEventListener('mouseenter', () => {
        if (entityId) {
          setHoveredElement({ svgElementId: element.id, entityId, label: label || undefined });
          element.classList.add('svg-element-hovered');
        }
      });

      element.addEventListener('mouseleave', () => {
        setHoveredElement(null);
        element.classList.remove('svg-element-hovered');
      });
    });
  }, [svgContent, mappings, onElementClick]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.2, 0.3));
  const handleFitView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom via native wheel listener attached in effect

  // Attach a native wheel listener with passive: false to allow preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((z) => Math.min(Math.max(z * delta, 0.3), 3));
    };
    el.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheelNative as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          <p className="text-sm text-gray-500">
            Architecture Diagram • {mappings.length} linked elements
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
          <span className="text-sm text-gray-500 w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
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
            🔗 Click to view: <strong>{hoveredElement.label || hoveredElement.entityId}</strong>
          </span>
        </div>
      )}

      {/* SVG Container */}
      <div
        className="flex-1 overflow-hidden bg-gray-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center p-8"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        />
      </div>

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <span>🔗 = Linked to entity (clickable)</span>
          <span>|</span>
          <span>Drag to pan • Scroll to zoom</span>
        </div>
      </div>

      {/* Custom styles for interactive elements */}
      <style>{`
        .svg-interactive-element {
          cursor: pointer !important;
          transition: all 0.2s ease;
        }
        .svg-interactive-element:hover,
        .svg-element-hovered {
          filter: drop-shadow(0 0 4px #3b82f6);
        }
        .svg-interactive-element rect,
        .svg-interactive-element path,
        .svg-interactive-element circle,
        .svg-interactive-element ellipse {
          transition: stroke 0.2s ease, stroke-width 0.2s ease;
        }
        .svg-element-hovered rect,
        .svg-element-hovered path,
        .svg-element-hovered circle,
        .svg-element-hovered ellipse {
          stroke: #3b82f6 !important;
          stroke-width: 3px !important;
        }
      `}</style>
    </div>
  );
}
