import React from 'react';
import { ReactFlow, MiniMap, Controls, Background, Handle, Position } from '@xyflow/react';

// Define the data structure for nodes
interface NodeData {
  label: string;
  type: 'hero' | 'movie' | 'starship';
}

// Define the shape of movie and starship objects
interface Movie {
  title: string;
}

interface Starship {
  id: number; // Assuming starships have an id
  name: string;
}

// Props for the Graph component
interface GraphProps {
  hero: {
    id: number;
    name: string;
  };
  movies: Movie[];
  starships: Starship[]; // Update to include id
}

// Custom node styles with explicit typing
const nodeStyles: { [key: string]: React.CSSProperties } = {
  hero: {
    background: 'rgba(255, 204, 0, 0.9)',
    color: '#000',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #ffd700',
    width: '150px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
  },
  movie: {
    background: 'rgba(76, 175, 80, 0.9)',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #388E3C',
    width: '150px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
  },
  starship: {
    background: 'rgba(33, 150, 243, 0.9)',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #1976D2',
    width: '150px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
  },
};

// Custom Node Component
const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div
      style={nodeStyles[data.type]}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {data.type === 'hero' && <i className="fas fa-user" />}
      {data.type === 'movie' && <i className="fas fa-film" />}
      {data.type === 'starship' && <i className="fas fa-space-shuttle" />}
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

const Graph: React.FC<GraphProps> = ({ hero, movies, starships }) => {
  // Calculate the number of movie and starship nodes
  const movieCount = movies.length;
  const starshipCount = starships.length;

  // Calculate the positions for movies and starships based on available counts
  const moviePositions = movies.map((_, index) => ({
    x: (index - (movieCount - 1) / 2) * 200, // Center movies
    y: -100, // Position movies above the hero
  }));

  const starshipPositions = starships.map((_, index) => ({
    x: (index - (starshipCount - 1) / 2) * 200, // Center starships
    y: 100, // Position starships below the hero
  }));

  const nodes = [
    {
      id: hero.id.toString(),
      data: { label: hero.name, type: 'hero' },
      position: { x: 0, y: 0 }, // Center hero in the middle
      type: 'custom',
    },
    ...movies.map((movie, index) => ({
      id: `movie-${index}`,
      data: { label: movie.title, type: 'movie' },
      position: moviePositions[index], // Use calculated position
      type: 'custom',
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${index}`,
      data: { label: starship.name, type: 'starship' },
      position: starshipPositions[index], // Use calculated position
      type: 'custom',
    })),
  ];

  const edges = [
    ...movies.map((_, index) => ({
      id: `edge-${hero.id}-${index}`,
      source: hero.id.toString(),
      target: `movie-${index}`,
      animated: true,
      style: { stroke: '#ffd700', strokeWidth: 2 },
    })),
    ...starships.map((starship, index) => ({
      id: `edge-movie-${index}-${starship.id}`,
      source: `movie-${index}`,
      target: `starship-${index}`,
      animated: true,
      style: { stroke: '#1976D2', strokeWidth: 2 },
    })),
  ];

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodeTypes={{ custom: CustomNode }}
      zoomOnScroll={false} // Disable zoom on scroll
      zoomOnPinch={false} // Disable zoom on pinch
    >
      <Background gap={12} size={1} />
    </ReactFlow>
  );
};

export default Graph;
