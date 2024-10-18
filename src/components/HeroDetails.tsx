import React, { useEffect, useState } from 'react';
import { fetchHeroes } from '../services/api';

interface HeroDetailsProps {
  heroId: number;
  onClose: () => void; 
}

const HeroDetails: React.FC<HeroDetailsProps> = ({ heroId, onClose }) => {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const data = await fetchHeroes(`https://sw-api.starnavi.io/people/${heroId}/`);
        setHero(data);
      } catch (err) {
        setError('Failed to fetch hero details');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [heroId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hero-details">
      <h2>{hero.name}</h2>
      <p>Height: {hero.height}</p>
      <p>Mass: {hero.mass}</p>
      <p>Hair Color: {hero.hair_color}</p>
      <p>Skin Color: {hero.skin_color}</p>
      <p>Eye Color: {hero.eye_color}</p>
      <p>Birth Year: {hero.birth_year}</p>
      <p>Gender: {hero.gender}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default HeroDetails;
