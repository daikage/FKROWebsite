import React from 'react';
import { FaLinkedin, FaFacebookSquare, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand">
          Fortknox <span>Outsourcing</span>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookSquare /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
