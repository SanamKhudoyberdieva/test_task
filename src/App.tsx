import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import './styles/index.css';
import './styles/media.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroesList from './pages/HeroList';
import HeroDetail from './pages/HeroDetails'; 
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTopButton />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HeroesList />} />
            <Route path="/hero/:id" element={<HeroDetail />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;