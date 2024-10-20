import React from 'react';
import { ReactFlow, MiniMap, Controls, Background, Handle, Position } from '@xyflow/react';

// Custom node styles with explicit typing
const nodeStyles: { [key: string]: React.CSSProperties } = {
  hero: {
    background: '#ffcc00',
    color: '#000',
    padding: 10,
    borderRadius: 5,
    border: '2px solid #ffd700',
    width: 120,
    textAlign: 'center' as 'center', // Explicitly cast to 'center' to match types
  },
  movie: {
    background: '#4CAF50',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    border: '2px solid #388E3C',
    width: 120,
    textAlign: 'center' as 'center',
  },
  starship: {
    background: '#2196F3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    border: '2px solid #1976D2',
    width: 120,
    textAlign: 'center' as 'center',
  },
};

// Define the data structure for nodes
interface NodeData {
  label: string;
  type: 'hero' | 'movie' | 'starship';
}

// Custom Node Component
const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div style={nodeStyles[data.type]}>
      {data.label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

interface GraphProps {
  hero: any;
  movies: any[];
  starships: any[];
}

const Graph: React.FC<GraphProps> = ({ hero, movies, starships }) => {
  const nodes = [
    {
      id: hero.id.toString(),
      data: { label: hero.name, type: 'hero' },
      position: { x: 0, y: 0 },
      type: 'custom', // Use custom type for the hero node
    },
    ...movies.map((movie, index) => ({
      id: `movie-${index}`,
      data: { label: movie.title, type: 'movie' },
      position: { x: (index + 1) * 200, y: 0 },
      type: 'custom', // Use custom type for movie nodes
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${index}`,
      data: { label: starship.name, type: 'starship' },
      position: { x: (index + 1) * 200, y: 100 },
      type: 'custom', // Use custom type for starship nodes
    })),
  ];

  const edges = [
    ...movies.map((_, index) => ({
      id: `edge-${hero.id}-${index}`,
      source: hero.id.toString(),
      target: `movie-${index}`,
      animated: true, // Add animation to edges
      style: { stroke: '#ffd700', strokeWidth: 2 }, // Custom edge style
    })),
    ...starships.map((_, index) => ({
      id: `edge-movie-${index}-${starships[index].id}`,
      source: `movie-${index}`,
      target: `starship-${index}`,
      animated: true,
      style: { stroke: '#1976D2', strokeWidth: 2 },
    })),
  ];

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={{ custom: CustomNode }}>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default Graph;
