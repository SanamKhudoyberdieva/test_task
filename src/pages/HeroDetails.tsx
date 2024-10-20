import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchHeroById } from '../api/fetchHeroById';
import { fetchStarshipsByIds } from '../api/fetchStarshipsByIds';
import { fetchFilmsByIds } from '../api/fetchFilmsByIds'; 
import Spinner from '../components/Spinner';
import Graph from '../components/Graph'; 
import { Hero, Movie, Starship } from '../types';

const HeroDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const [hero, setHero] = useState<Hero | null>(null); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await fetchHeroById(id!);
        setHero(data);
        const films = await fetchFilmsByIds(data.films); 
        setMovies(films);
        const starshipsData = await fetchStarshipsByIds(data.starships); 
        setStarships(starshipsData);
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [id]);

  if (loading) return <Spinner loading={loading} />;

  if (!hero) return <p className="ss-error-message">Hero not found.</p>;

  return (
    <div className="ss-main-background">
      <div className="container">
        <nav className="breadcrumb">
          <ul>
            <li onClick={() => navigate('/')} className="breadcrumb-item">
              Heroes
            </li>
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
              <div className="ss-hero-detail">
                <h2 className="ss-hero-name">{hero.name}</h2>
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
          <div className='ss-graph'>
            <Graph hero={hero} movies={movies} starships={starships} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
