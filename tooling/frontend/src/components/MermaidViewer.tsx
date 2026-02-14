import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface HoveredElement {
  id: string;
  label: string;
  type: 'node' | 'edge' | 'actor';
}

interface MermaidViewerProps {
  chart: string;
  title?: string;
  onNodeClick?: (entityId: string) => void;
}

// Initialize mermaid with custom config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose', // Allows click callbacks
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
  journey: {
    useMaxWidth: true,
  },
});

export default function MermaidViewer({ chart, title, onNodeClick }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredElement, setHoveredElement] = useState<HoveredElement | null>(null);
  const [clickableCount, setClickableCount] = useState(0);

  useEffect(() => {
    if (!chart) return;

    const renderChart = async () => {
      try {
        // Generate unique ID for this render
        const id = `mermaid-${Date.now()}`;
        
        // Render the chart
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  // Set up click handlers after SVG is rendered
  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    let clickables = 0;

    // Helper to make element interactive
    const makeClickable = (
      element: Element, 
      entityId: string, 
      label: string, 
      type: 'node' | 'edge' | 'actor'
    ) => {
      clickables++;
      (element as HTMLElement).style.cursor = 'pointer';
      element.classList.add('mermaid-clickable');
      element.setAttribute('data-entity-id', entityId);
      element.setAttribute('data-label', label);
      element.setAttribute('data-type', type);

      element.addEventListener('mouseenter', () => {
        setHoveredElement({ id: entityId, label, type });
        element.classList.add('mermaid-hovered');
      });

      element.addEventListener('mouseleave', () => {
        setHoveredElement(null);
        element.classList.remove('mermaid-hovered');
      });

      element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onNodeClick) {
          onNodeClick(entityId);
        }
      });
    };

    // Handle flowchart nodes - these have IDs like "flowchart-NodeName-0"
    const flowchartNodes = containerRef.current.querySelectorAll('.node');
    flowchartNodes.forEach((node) => {
      const nodeId = node.id;
      if (nodeId) {
        const match = nodeId.match(/flowchart-(\w+)-\d+/);
        if (match) {
          const label = node.querySelector('.nodeLabel')?.textContent || match[1];
          // Convert label to entity ID format
          const entityId = label.replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
          makeClickable(node, entityId, label, 'node');
        }
      }
    });

    // Handle flowchart edges/arrows - these have class "edgePath" or contain path elements
    const edges = containerRef.current.querySelectorAll('.edgePath');
    edges.forEach((edge) => {
      // Get the edge label if available
      const edgeId = edge.id;
      // Find associated label
      const labelMatch = edgeId?.match(/L-(.+?)-(.+?)$/);
      if (labelMatch) {
        const fromNode = labelMatch[1];
        const toNode = labelMatch[2];
        const label = `${fromNode} → ${toNode}`;
        makeClickable(edge, `${fromNode}-to-${toNode}`, label, 'edge');
      } else {
        // Generic edge
        makeClickable(edge, 'flow-connection', 'Connection', 'edge');
      }
    });

    // Also make edge labels clickable
    const edgeLabels = containerRef.current.querySelectorAll('.edgeLabel');
    edgeLabels.forEach((label) => {
      const text = label.textContent?.trim() || 'Flow';
      const entityId = text.toLowerCase().replace(/\s+/g, '-');
      makeClickable(label, entityId, text, 'edge');
    });

    // Handle sequence diagram participants - they have class "actor"
    const actors = containerRef.current.querySelectorAll('.actor');
    actors.forEach((actor) => {
      const text = actor.querySelector('text')?.textContent || 
                   actor.textContent?.trim() || '';
      if (text) {
        const entityId = text.toLowerCase().replace(/\s+/g, '-');
        makeClickable(actor, entityId, text, 'actor');
      }
    });

    // Handle sequence diagram actor boxes (the rectangles)
    const actorBoxes = containerRef.current.querySelectorAll('.actor-box');
    actorBoxes.forEach((box, index) => {
      const actorTexts = containerRef.current?.querySelectorAll('.actor text');
      const text = actorTexts?.[index]?.textContent || '';
      if (text) {
        const entityId = text.toLowerCase().replace(/\s+/g, '-');
        makeClickable(box, entityId, text, 'actor');
      }
    });

    // Handle sequence diagram messages/arrows
    const messages = containerRef.current.querySelectorAll('.messageLine0, .messageLine1');
    messages.forEach((msg, index) => {
      const messageTexts = containerRef.current?.querySelectorAll('.messageText');
      const text = messageTexts?.[Math.floor(index / 2)]?.textContent || 'Message';
      const entityId = text.toLowerCase().replace(/\s+/g, '-');
      makeClickable(msg, entityId, text, 'edge');
    });

    setClickableCount(clickables);
  }, [svgContent, onNodeClick]);

  // Expose callback function globally for mermaid click handlers
  useEffect(() => {
    if (onNodeClick) {
      (window as any).mermaidCallback = (entityId: string) => {
        onNodeClick(entityId);
      };
    }
    return () => {
      delete (window as any).mermaidCallback;
    };
  }, [onNodeClick]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-50 p-8">
        <div className="text-red-600 mb-4">{error}</div>
        <pre className="text-xs text-gray-500 bg-gray-100 p-4 rounded max-w-full overflow-auto">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
        <p className="text-sm text-gray-500">
          {clickableCount} clickable elements • Hover to preview, click to view details
        </p>
      </div>

      {/* Mermaid Container */}
      <div className="flex-1 overflow-auto bg-white p-8 relative">
        <div 
          ref={containerRef}
          className="mermaid-container flex items-center justify-center min-h-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Hover tooltip - similar to SVG viewer */}
        {hoveredElement && (
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 max-w-xs">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${
                hoveredElement.type === 'node' ? 'bg-blue-500' :
                hoveredElement.type === 'actor' ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <span className="text-xs text-gray-500 uppercase">{hoveredElement.type}</span>
            </div>
            <div className="font-medium text-gray-900 mt-1">{hoveredElement.label}</div>
            <div className="text-xs text-gray-500 mt-1">Click to view entity details</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Nodes</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Actors</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Edges/Arrows</span>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .mermaid-container svg {
          max-width: 100%;
          height: auto;
        }
        .mermaid-clickable {
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .mermaid-hovered rect,
        .mermaid-hovered circle,
        .mermaid-hovered polygon,
        .mermaid-hovered path {
          stroke: #3b82f6 !important;
          stroke-width: 2.5px !important;
          filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4));
        }
        .mermaid-container .edgePath.mermaid-hovered path {
          stroke: #f97316 !important;
          stroke-width: 3px !important;
        }
        .mermaid-container .edgeLabel.mermaid-hovered {
          background: #fff7ed !important;
        }
        .mermaid-container .actor-box.mermaid-hovered,
        .mermaid-container .actor.mermaid-hovered rect {
          stroke: #22c55e !important;
          stroke-width: 2.5px !important;
          fill: #f0fdf4 !important;
        }
        .mermaid-container .messageLine0.mermaid-hovered,
        .mermaid-container .messageLine1.mermaid-hovered {
          stroke: #f97316 !important;
          stroke-width: 2.5px !important;
        }
      `}</style>
    </div>
  );
}
