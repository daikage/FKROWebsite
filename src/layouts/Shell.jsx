import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Shell.css';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Shell = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const { pathname } = useLocation();

  const titleMap = {
    '/': 'Overview',
    '/services': 'Services',
    '/news': 'News & Updates',
    '/ndpr-audit': 'NDPR Audit',
    '/about': 'About Us',
    '/contact': 'Contact',
  };
  const pageTitle =
    titleMap[pathname] ||
    (pathname.startsWith('/news/') ? 'News Details' : 'Fortknox');

  return (
    <div className="shell">
      <aside className={`shell-sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-inner">
          <Link to="/" className="sb-brand" onClick={close}>
            Fortknox <span>Outsourcing</span>
          </Link>

          <nav className="sb-nav">
            <NavLink to="/" end onClick={close}>
              <span className="dot" /> Overview
            </NavLink>
            <NavLink to="/services" onClick={close}>
              <span className="dot" /> Services
            </NavLink>
            <NavLink to="/news" onClick={close}>
              <span className="dot" /> News
            </NavLink>
            <NavLink to="/ndpr-audit" onClick={close}>
              <span className="dot" /> NDPR Audit
            </NavLink>
            <NavLink to="/about" onClick={close}>
              <span className="dot" /> About
            </NavLink>
            <NavLink to="/contact" onClick={close}>
              <span className="dot" /> Contact
            </NavLink>
          </nav>

          <div className="sb-cta">
            <Link to="/contact" className="cta-primary" onClick={close}>
              Get a Quote
            </Link>
            <div className="theme-switcher-wrapper">
              <ThemeSwitcher />
            </div>
            <p className="sb-legal">© {new Date().getFullYear()} Fortknox</p>
          </div>
        </div>
      </aside>

      <div className="shell-content">
        <header className="shell-topbar">
          <button className="hamburger" onClick={toggle} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
          <div className="topbar-title">{pageTitle}</div>
        </header>

        <main className="shell-main">{children}</main>

        <footer className="shell-footer">
          <div className="sf-inner">
            <div className="sf-brand">Fortknox <span>Outsourcing</span></div>
            <div className="sf-links">
              <Link to="/ndpr-audit">NDPR Audit</Link>
              <Link to="/news">News</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </div>

      <div className={`shell-overlay ${open ? 'show' : ''}`} onClick={close} />
    </div>
  );
};

export default Shell;
