import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  Node,
  Edge,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Movie, Starship } from '../types';

interface NodeData {
  label: string;
  type: 'hero' | 'movie' | 'starship';
}

interface GraphProps {
  hero: {
    id: number;
    name: string;
  };
  movies: Movie[];
  starships: Starship[];
}

const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className={`${data.type}-node`}>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

const Graph: React.FC<GraphProps> = ({ hero, movies, starships }) => {
  const nodes: Node[] = [
    {
      id: hero.id.toString(),
      data: { label: hero.name, type: 'hero' },
      position: { x: 0, y: 0 },
      type: 'default',
    },
    ...movies.map((movie, index) => ({
      id: `movie-${index}`,
      data: { label: movie.title, type: 'movie' },
      position: { x: 200 * (index - movies.length / 2), y: -200 },
      type: 'default',
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: starship.name, type: 'starship' },
      position: { x: 200 * (index - starships.length / 2), y: 200 },
      type: 'default',
    })),
  ];

  const edges: Edge[] = [
    ...movies.map((_, index) => ({
      id: `hero-movie-${index}`,
      source: hero.id.toString(),
      target: `movie-${index}`,
      type: ConnectionLineType.SmoothStep,
      animated: true,
      style: { stroke: '#ffd700', strokeWidth: 2 },
    })),
    ...starships.map((starship, index) => ({
      id: `movie-starship-${starship.id}`,
      source: `movie-${index % movies.length}`,
      target: `starship-${starship.id}`,
      type: ConnectionLineType.SmoothStep,
      animated: true,
      style: { stroke: '#1976D2', strokeWidth: 2 },
    })),
  ];

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ default: CustomNode }}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;