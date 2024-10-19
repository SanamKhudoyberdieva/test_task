import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node } from 'react-flow-renderer';

interface NodeData {
  id: string;
  label: string;
}

interface GraphVisualizationProps {
  nodes: Node<any>[];
  edges: { id: string; source: string; target: string }[];
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ nodes, edges }) => {
  return (
    <div style={{ height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GraphVisualization;
