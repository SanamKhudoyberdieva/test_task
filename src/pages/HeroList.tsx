import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router
import Spinner from '../components/Spinner';
import GraphVisualization from '../components/GraphVisualization';
import HeroCard from '../components/HeroCard'; // New HeroCard component for better SRP
import { fetchHeroes } from '../services/api';
import { Node } from 'react-flow-renderer';

const HeroesList: React.FC = () => {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: Node<any>[]; edges: any[] }>({
    nodes: [],
    edges: [],
  });

  const navigate = useNavigate(); // Use navigate for routing

  const fetchHeroesData = async (url: string) => {
    try {
      const data = await fetchHeroes(url);
      setHeroes(prevHeroes => [...prevHeroes, ...data.results]); // Append new heroes for infinite scroll
      setNextPage(data.next);
    } catch (err) {
      setError('Failed to fetch heroes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroesData('https://sw-api.starnavi.io/people/');
  }, []);

  const handleHeroClick = (heroId: string) => {
    navigate(`/hero/${heroId}`); // Navigate to HeroDetail page
  };

  if (loading) return <Spinner loading={loading} />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="heroes-list">
      <h2 className="heroes-list-title">Star Wars Heroes</h2>
      <ul className="hero-list">
        {heroes.map((hero,index) => (
          <HeroCard
            key={index}
            name={hero.name}
            height={hero.height}
            mass={hero.mass}
            onClick={() => handleHeroClick(hero.id)} // Passing the click handler
          />
        ))}
      </ul>
      {nextPage && (
        <button className="load-more" onClick={() => fetchHeroesData(nextPage)} aria-label="Load more heroes">
          Load More
        </button>
      )}
      <GraphVisualization nodes={graphData.nodes} edges={graphData.edges} />
    </div>
  );
};

export default HeroesList;
