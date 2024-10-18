import React, { useEffect, useState } from 'react';
import { fetchHeroes } from '../services/api';
import GraphVisualization from './GraphVisualization';
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

  const fetchHeroesData = async (url: string) => {
    try {
      const data = await fetchHeroes(url);
      setHeroes(data.results);
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

  useEffect(() => {
    // Prepare graph data
    const nodes = heroes.map((hero, index) => ({
      id: hero.id.toString(),
      type: 'default',
      position: { x: index * 100, y: index * 50 }, 
      data: { label: hero.name },
    }));

    const edges = heroes.flatMap((hero) => {
      if (Array.isArray(hero.movies)) {
        return hero.movies.map((movieId: number) => ({
          id: `e${hero.id}-${movieId}`,
          source: hero.id.toString(),
          target: movieId.toString(), 
        }));
      }
      return [];
    });

    setGraphData({ nodes, edges });
  }, [heroes]);

  const handleNextPage = () => {
    if (nextPage) {
      fetchHeroesData(nextPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            {hero.name} - Height: {hero.height} - Mass: {hero.mass}
          </li>
        ))}
      </ul>
      {nextPage && <button onClick={handleNextPage}>Load More</button>}
      <GraphVisualization nodes={graphData.nodes} edges={graphData.edges} />
    </div>
  );
};

export default HeroesList;
