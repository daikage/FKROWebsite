import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Services from './components/Services';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <PageTransition>
        {({ onLinkClick }) => (
          <>
            <nav>
              <a href="/" onClick={(e) => onLinkClick(e, '/')}>Home</a>
              <a href="/services" onClick={(e) => onLinkClick(e, '/services')}>Services</a>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </>
        )}
      </PageTransition>
    </Router>
  );
};

export default App;
