import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import type { GraphData } from '../types';

interface GraphViewProps {
  graphData: GraphData;
  onNodeClick: (nodeId: string) => void;
}

export default function GraphView({ graphData, onNodeClick }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: graphData.nodes,
        edges: graphData.edges,
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px',
            'text-wrap': 'wrap',
            'text-max-width': '100px',
            width: '60px',
            height: '60px',
            'border-width': 2,
            'border-color': '#fff',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '10px',
            'text-rotation': 'autorotate',
            'text-margin-y': -10,
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#0066cc',
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 500,
        padding: 50,
        nodeRepulsion: 4000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
      },
      wheelSensitivity: 0.2,
    });

    // Handle node clicks
    cy.on('tap', 'node', (event) => {
      const node = event.target;
      onNodeClick(node.id());
    });

    cyRef.current = cy;

    // Cleanup
    return () => {
      cy.destroy();
    };
  }, [graphData, onNodeClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
        <button
          onClick={() => cyRef.current?.fit(undefined, 50)}
          className="block w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          title="Fit to screen"
        >
          Fit
        </button>
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
          className="block w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
          className="block w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          title="Zoom out"
        >
          -
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-sm font-semibold mb-2">Graph Controls</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click a node to view details</li>
          <li>• Drag to pan the graph</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Drag nodes to reposition</li>
        </ul>
      </div>
    </div>
  );
}
