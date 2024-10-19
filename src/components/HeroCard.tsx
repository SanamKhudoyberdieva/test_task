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
    <div className="ss-hero-item" onClick={onClick}>
      <img 
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
        alt={name} 
        className="ss-hero-image" 
      />
      <h3 className="ss-hero-name">{name}</h3>
      <p className="ss-hero-details">
        Height: <span>{height}</span> | Mass: <span>{mass}</span>
      </p>
    </div>
  );
};

export default HeroCard;
