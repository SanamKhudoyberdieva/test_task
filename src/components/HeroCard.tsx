import React from 'react';

interface HeroCardProps {
  id: string;
  name: string;
  height: string;
  mass: string;
  onClick: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ id, name, height, mass, onClick }) => {
  return (
    <div className="ss-hero-item" onClick={onClick} role="button" tabIndex={0} aria-label={`View details for ${name}`}>
      <div className="ss-hero-image-container">
        <img 
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
          alt={`${name}'s image`} 
          className="ss-hero-image" 
        />
        <div className="ss-hero-info">
          <h3 className="ss-hero-name">{name}</h3>
          <p className="ss-hero-details">
            Height: <span>{height}</span> | Mass: <span>{mass}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
