// components/HeroCard.tsx
import React from 'react';

interface HeroCardProps {
  name: string;
  height: string;
  mass: string;
  onClick: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, height, mass, onClick }) => {
  return (
    <li className="hero-item" onClick={onClick}>
      <h3 className="hero-name">{name}</h3>
      <p className="hero-details">
        Height: <span>{height}</span> | Mass: <span>{mass}</span>
      </p>
    </li>
  );
};

export default HeroCard;
