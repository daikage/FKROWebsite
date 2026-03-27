import React, { useEffect, useState } from 'react';
import './Tickers.css';
import { FaExternalLinkAlt, FaNewspaper } from 'react-icons/fa';
import { loadFortknoxNews } from '../utils/fkNewsClient';
import { newsPosts } from '../data/news';

const companyNames = [
  'MTN', 'Airtel', 'Zenith Bank', 'Access Bank', 'UBA',
  'Dangote', 'Nestlé', 'Innoson', 'Flutterwave', 'Konga',
];

const Tickers = () => {
  // Load Fortknox news (fallback to local)
  const [items, setItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fetched = await loadFortknoxNews();
        if (mounted && Array.isArray(fetched) && fetched.length) {
          setItems(fetched);
        } else if (mounted) {
          setItems(newsPosts);
        }
      } catch {
        if (mounted) setItems(newsPosts);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Duplicate arrays for seamless looping
  const logosLoop = [...companyNames, ...companyNames];
  const newsLoop = [...items, ...items];

  return (
    <section className="tickers" aria-label="Company logos and latest news">
      {/* Company auto-scroller */}
      <div className="ticker ticker--logos" role="list" aria-label="Companies that trust Fortknox">
        <div className="ticker-head">
          <span className="dot" />
          <span className="label">Trusted by leading companies</span>
        </div>
        <ul className="track" style={{ ['--speed']: '38s' }}>
          {logosLoop.map((name, i) => (
            <li className="item item--logo" role="listitem" key={`${name}-${i}`}>
              <span className="logo-pill" title={name}>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* News auto-scroller */}
      <div className="ticker ticker--news" role="list" aria-label="Fortknox latest news">
        <div className="ticker-head">
          <FaNewspaper className="news-icon" />
          <span className="label">Latest from Fortknox</span>
        </div>
        <ul className="track" style={{ ['--speed']: '52s' }}>
          {newsLoop.map((n, i) => (
            <li className="item item--news" role="listitem" key={`${n.slug || n.title}-${i}`}>
              <a
                className="news-chip"
                href={`/news/${n.slug || ''}`}
                onClick={(e) => {
                  // allow normal navigation if slug exists; otherwise prevent
                  if (!n.slug) e.preventDefault();
                }}
                title={n.title}
              >
                <span className="title">{n.title}</span>
                <FaExternalLinkAlt className="ext" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tickers;
