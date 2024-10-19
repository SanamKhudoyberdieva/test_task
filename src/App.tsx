import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroesList from './pages/HeroList';
import HeroDetail from './pages/HeroDetails'; 
import './styles/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Star Wars Heroes</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HeroesList />} />
            <Route path="/hero/:id" element={<HeroDetail />} /> 
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Star Wars Heroes</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;