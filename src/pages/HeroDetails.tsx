import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchHeroById } from '../api/getHeroById';
import Spinner from '../components/Spinner';
import ReactFlow, { Controls, Node, Edge } from 'react-flow-renderer';

const HeroDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const [hero, setHero] = useState<any>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await fetchHeroById(id!); 
        console.log('Hero Data:', data); 
        setHero(data);
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [id]);

  if (loading) return <Spinner loading={loading} />;

  return (
    <div className="ss-main-background">
      <div className="container">
        <nav className="breadcrumb">
          <ul>
            <li onClick={() => navigate('/')} className="breadcrumb-item">Heroes</li>
            <li className="breadcrumb-item active">{hero.name}</li>
          </ul>
        </nav>

        <div className="ss-hero-detail-container">
          <div className="ss-hero-detail-content">
            <img 
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
              alt={hero.name} 
              className="ss-hero-detail-image" 
            />
            <div className="ss-hero-info">
              <h2>{hero.name}</h2>
              <div className="ss-hero-detail">
                <p><strong>Height:</strong> {hero.height}</p>
                <p><strong>Mass:</strong> {hero.mass}</p>
                <p><strong>Birth Year:</strong> {hero.birth_year}</p>
                <p><strong>Gender:</strong> {hero.gender}</p>
                <p><strong>Hair Color:</strong> {hero.hair_color}</p>
                <p><strong>Skin Color:</strong> {hero.skin_color}</p>
                <p><strong>Eye Color:</strong> {hero.eye_color}</p>
              </div>
            </div>
          </div>

          {/* Optional: Uncomment this if you want to use React Flow */}
          {/* <div style={{ height: '400px', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges}>
              <Controls />
            </ReactFlow>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
