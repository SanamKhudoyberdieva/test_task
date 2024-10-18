// src/App.tsx
import React from 'react';
import HeroesList from './components/HeroList';
import '../src/styles/index.css'; 

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Star Wars Heroes</h1>
      </header>
      <main>
        <HeroesList />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Star Wars Heroes</p>
      </footer>
    </div>
  );
};

export default App;
