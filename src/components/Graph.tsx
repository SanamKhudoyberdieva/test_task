import React from 'react';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react'; // Correct import statement

interface GraphProps {
  hero: any;
  movies: any[];
  starships: any[];
}

const Graph: React.FC<GraphProps> = ({ hero, movies, starships }) => {
  const nodes = [
    { id: hero.id.toString(), data: { label: hero.name }, position: { x: 0, y: 0 } },
    ...movies.map((movie, index) => ({
      id: `movie-${index}`,
      data: { label: movie.title },
      position: { x: (index + 1) * 200, y: 0 }, // Adjust position as needed
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${index}`,
      data: { label: starship.name },
      position: { x: (index + 1) * 200, y: 100 }, // Adjust position as needed
    })),
  ];

  const edges = [
    ...movies.map((movie, index) => ({
      id: `edge-${hero.id}-${index}`,
      source: hero.id.toString(),
      target: `movie-${index}`,
    })),
    ...starships.map((starship, index) => ({
      id: `edge-movie-${index}-${starship.id}`,
      source: `movie-${index}`,
      target: `starship-${index}`,
    })),
  ];

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default Graph;
