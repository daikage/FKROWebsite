import React from 'react';
import './Header.css';
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-container">
        <Link to="/" className="logo">
          Fortknox <span className="logo-alt">Outsourcing</span>
        </Link>
        <nav>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
        <Link to="/contact" className="cta-button header-cta">Get a Quote</Link>
      </div>
    </motion.header>
  );
};

export default Header;
