import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchHeroById } from '../api/getHeroById';
import Spinner from '../components/Spinner';
import { FaUserAlt, FaRulerVertical, FaWeight, FaBirthdayCake, FaGenderless, FaCheckCircle, FaCheck, FaRegCheckCircle } from 'react-icons/fa';

const HeroDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const [hero, setHero] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await fetchHeroById(id!);
        setHero(data);
      } catch (err) {
        setError('Failed to load hero data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;

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
              alt={`Image of ${hero.name}`}  
              className="ss-hero-detail-image" 
            />
            <div className="ss-hero-info">
              <div className="ss-hero-detail">
                <h2 className="ss-hero-name"><FaUserAlt /> {hero.name}</h2>
                <p><FaRegCheckCircle/> <strong>Height:</strong> {hero.height}</p>
                <p><FaRegCheckCircle/> <strong>Mass:</strong> {hero.mass}</p>
                <p><FaRegCheckCircle/> <strong>Birth Year:</strong> {hero.birth_year}</p>
                <p><FaRegCheckCircle/> <strong>Gender:</strong> {hero.gender}</p>
                <p><FaRegCheckCircle/> <strong>Hair Color:</strong> {hero.hair_color}</p>
                <p><FaRegCheckCircle/> <strong>Skin Color:</strong> {hero.skin_color}</p>
                <p><FaRegCheckCircle/> <strong>Eye Color:</strong> {hero.eye_color}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
