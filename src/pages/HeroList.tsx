import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Spinner from '../components/Spinner';
import HeroCard from '../components/HeroCard'; 
import { fetchHeroes } from '../api/fetchHeroes';
import { Hero } from '../types/hero';

const HeroesList = () => {
  const navigate = useNavigate(); 
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchHeroesData = async (url: string) => {
    try {
      const data = await fetchHeroes(url);
      setHeroes(prevHeroes => [...prevHeroes, ...data.results]); 
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
    navigate(`/hero/${heroId}`); 
  };

  if (loading) return <Spinner loading={loading} />;
  if (error) return <p className="ss-error-message">{error}</p>;

  return (
    <div className="ss-main-background">
      <div className="container">
        <div className="ss-heroes-list">
          {heroes.map((hero, index) => (
            <HeroCard
              key={index}
              name={hero.name}
              height={hero.height}
              mass={hero.mass}
              onClick={() => handleHeroClick(hero.id)} 
              id={hero.id || index.toString()}  
            />
          ))}
        </div>
        {nextPage && (
          <button className="ss-primary-btn" onClick={() => fetchHeroesData(nextPage)} aria-label="Load more heroes">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroesList;