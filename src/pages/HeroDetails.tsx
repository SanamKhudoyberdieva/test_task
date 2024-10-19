import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchHeroById, fetchMoviesByHeroId, fetchStarshipsByMovieId } from '../services/api';
import Spinner from '../components/Spinner';
import ReactFlow, { Controls, Node, Edge } from 'react-flow-renderer';

interface Movie {
  id: string; 
  title: string; 
}

interface Starship {
  id: string; 
  name: string; 
}

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await fetchHeroById(id!); 
        console.log('Hero Data:', data); 
        setHero(data);
    
        const films = data.films; 
        console.log('Films:', films); 
    
        if (!Array.isArray(films)) {
          throw new Error('Films data is not an array');
        }
    
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
        setError('Failed to fetch hero details');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [id]);

  if (loading) return <Spinner loading={loading} />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="hero-detail">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h2>{hero.name}</h2>
      <p>Height: {hero.height}</p>
      <p>Mass: {hero.mass}</p>
      <p>Hair Color: {hero.hair_color}</p>
      <p>Skin Color: {hero.skin_color}</p>
      <p>Eye Color: {hero.eye_color}</p>
      <p>Birth Year: {hero.birth_year}</p>
      <p>Gender: {hero.gender}</p>

      <div style={{ height: '400px', width: '100%' }}>
        <ReactFlow nodes={nodes} edges={edges}>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HeroDetail;
