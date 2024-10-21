import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  Node,
  Edge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Movie, Starship } from "../types";

interface NodeData {
  episode_id?: number; 
  release_date?: string; 
  director?: string; 
  producer?: string; 
  model?: string; 
  label: string;
  cargo_capacity?: string;
  id?: number;
  type: "hero" | "movie" | "starship";
  manufacturer?: string; 
  cost_in_credits?: string; 
  crew?: string; 
  length?: string; 
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
      {data.type === "movie" && (
        <>
          <div>Episode: {data.episode_id}</div>
          <div>Release Date: {data.release_date}</div>
          <div>Director: {data.director}</div>
          {data.producer && <div>Producer: {data.producer}</div>}
        </>
      )}
      {data.cargo_capacity && data.cargo_capacity !== "unknown" && (
        <div style={{ whiteSpace: "nowrap" }}>
          Cargo capacity: {data.cargo_capacity}
        </div>
      )}
      {data.model && <div>Model: {data.model}</div>}
      {data.manufacturer && <div>Manufacturer: {data.manufacturer}</div>}
      {data.length && <div>Length: {data.length} meters</div>}
      {data.id && data.type === "starship" && (
        <img
          className="ss-starship-image"
          src={`https://starwars-visualguide.com/assets/img/starships/${data.id}.jpg`}
          alt={data.label}
        />
      )}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

const nodeTypes = { default: CustomNode };

const Graph: React.FC<GraphProps> = ({ hero, movies, starships }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: hero.id.toString(),
      data: { label: hero.name, type: "hero" } as NodeData, 
      position: { x: 0, y: 0 },
      type: "default",
    },
    ...movies.map((movie, index) => ({
      id: `movie-${index}`,
      data: { 
        label: movie.title, 
        episode_id: movie.episode_id,
        release_date: movie.release_date,
        director: movie.director,
        producer: movie.producer,
        type: "movie",
      } as NodeData, 
      position: { x: 200 * (index - movies.length / 2), y: -200 },
      type: "default",
    })),
    ...starships.map((starship) => ({
      id: `starship-${starship.id}`,
      data: {
        label: starship.name,
        type: "starship",
        cargo_capacity: starship.cargo_capacity,
        model: starship.model,
        manufacturer: starship.manufacturer,
        cost_in_credits: starship.cost_in_credits,
        crew: starship.crew,
        length: starship.length,
        id: starship.id,
      } as NodeData, 
      position: { x: 200 * (0 - starships.length / 2), y: 200 },
      type: "default",
    })),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...movies.map((_, index) => ({
      id: `hero-movie-${index}`,
      source: hero.id.toString(),
      target: `movie-${index}`,
      type: ConnectionLineType.SmoothStep,
      animated: true,
      style: { stroke: "#ffd700", strokeWidth: 2 },
    })),
    ...starships.map((starship, index) => ({
      id: `movie-starship-${starship.id}`,
      source: `movie-${index % movies.length}`,
      target: `starship-${starship.id}`,
      type: ConnectionLineType.SmoothStep,
      animated: true,
      style: { stroke: "#1976D2", strokeWidth: 2 },
    })),
  ]);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
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