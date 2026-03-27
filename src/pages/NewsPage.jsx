import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaTag, FaClock, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import './NewsPage.css';
import './NewsPage.css';
import { newsPosts } from '../data/news';
import { loadFortknoxNews } from '../utils/fkNewsClient'; // NEW

const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const NewsPage = () => {
  const [liveNews, setLiveNews] = useState([]);
  const [loadingLive, setLoadingLive] = useState(true);
  const [liveError, setLiveError] = useState(null);

  // NEW: Fortknox remote news state
  const [fkNews, setFkNews] = useState([]);
  const [loadingFk, setLoadingFk] = useState(true);
  const [fkError, setFkError] = useState(null);

  // NEW: modal state (unchanged if already present)
  const [modal, setModal] = useState({ open: false, type: null, data: null });

  const openModalFortknox = (item) =>
    setModal({ open: true, type: 'fortknox', data: item });
  const openModalLive = (item) =>
    setModal({ open: true, type: 'live', data: item });
  const closeModal = () => setModal({ open: false, type: null, data: null });

  // Lock body scroll & ESC to close when modal open
  useEffect(() => {
    if (!modal.open) return;
    const handleKey = (e) => e.key === 'Escape' && closeModal();
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKey);
    };
  }, [modal.open]);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const RSS_URL =
          import.meta.env.VITE_NEWS_RSS_URL ||
          'https://news.google.com/rss/search?q=outsourcing+OR+BPO+Nigeria&hl=en&gl=NG&ceid=NG:en';
        const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
        const res = await fetch(API);
        const data = await res.json();
        if (!data || !data.items) throw new Error('Failed to load feed');
        const items = data.items.slice(0, 8).map((item) => ({
          title: item.title,
          link: item.link,
          date: item.pubDate || item.published || item.updated || new Date().toISOString(),
          source: item.author || data.feed?.title || 'News',
        }));
        setLiveNews(items);
      } catch (err) {
        setLiveError('Live feed temporarily unavailable.');
        console.error(err);
      } finally {
        setLoadingLive(false);
      }
    };

    fetchLive();
  }, []);

  // NEW: Load Fortknox news from API/RSS with optional polling
  useEffect(() => {
    let timer;
    const pollMs = Number(import.meta.env.VITE_FK_NEWS_POLL_MS || 0);

    const load = async () => {
      try {
        setLoadingFk(true);
        const posts = await loadFortknoxNews();
        if (Array.isArray(posts) && posts.length) {
          setFkNews(posts);
          setFkError(null);
        } else {
          setFkNews([]); // fallback handled in render
        }
      } catch (e) {
        console.error(e);
        setFkError('Unable to fetch Fortknox news. Showing latest available.');
      } finally {
        setLoadingFk(false);
      }
    };

    load();

    if (pollMs > 0) {
      timer = setInterval(load, pollMs);
    }
    return () => timer && clearInterval(timer);
  }, []);

  return (
    <section className="news">
      <div className="container">
        <div className="news-header">
          <FaNewspaper className="news-icon" />
          <div>
            <h1>News & Updates</h1>
            <p>Live industry headlines and Fortknox announcements in one place.</p>
          </div>
        </div>

        <div className="news-sections">
          <div className="news-section">
            <div className="news-section-head">
              <h2>Live Feed</h2>
              <p className="muted">Industry headlines (auto‑refreshed on load)</p>
            </div>

            {loadingLive && <p className="muted">Loading live headlines…</p>}
            {liveError && <p className="error">{liveError}</p>}

            <div className="news-grid">
              {liveNews.map((item, i) => (
                <motion.article
                  className="news-card"
                  key={`${item.link}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  onClick={() => openModalLive(item)}   // NEW: open modal on click
                >
                  <div className="news-meta">
                    <span className="news-date"><FaClock /> {formatDate(item.date)}</span>
                    <span className="news-tags"><FaTag />{item.source}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <div className="news-actions">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-secondary"
                      onClick={(e) => e.stopPropagation()} // prevent card click opening modal too
                    >
                      View source <FaExternalLinkAlt style={{ marginLeft: 6 }} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="news-section">
            <div className="news-section-head">
              <h2>Fortknox News</h2>
              <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {loadingFk ? 'Loading…' : 'Live'}
              </div>
            </div>

            {fkError && <p className="error">{fkError}</p>}

            <div className="news-grid">
              {(fkNews.length ? fkNews : newsPosts).map((item, i) => (
                <motion.article
                  className="news-card"
                  key={item.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  onClick={() => openModalFortknox(item)} // opens modal
                >
                  <div className="news-meta">
                    <span className="news-date"><FaClock /> {formatDate(item.date)}</span>
                    <span className="news-tags"><FaTag />{Array.isArray(item.tags) ? item.tags.join(' • ') : ''}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <div className="news-actions">
                    <a
                      href="#"
                      className="cta-secondary"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModalFortknox(item); }}
                    >
                      Read more
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: shows for both Live and Fortknox news */}
      {modal.open && (
        <div className="news-modal" role="dialog" aria-modal="true" aria-label="News details">
          <div className="news-modal-backdrop" onClick={closeModal} />
          <div className="news-modal-content" role="document">
            <button className="news-modal-close" aria-label="Close" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="news-modal-header">
              <h2>{modal.data?.title}</h2>
              <div className="news-modal-meta">
                <span><FaClock /> {formatDate(modal.data?.date || new Date())}</span>
                {modal.type === 'fortknox' && modal.data?.tags && (
                  <span><FaTag /> {modal.data.tags.join(' • ')}</span>
                )}
                {modal.type === 'live' && modal.data?.source && (
                  <span><FaTag /> {modal.data.source}</span>
                )}
              </div>
            </div>

            <div className="news-modal-body">
              {modal.type === 'fortknox' ? (
                <article dangerouslySetInnerHTML={{ __html: modal.data?.content || '' }} />
              ) : (
                <p>
                  This is a live headline from {modal.data?.source || 'News'}. Open the original article to read the full story.
                </p>
              )}
            </div>

            <div className="news-modal-actions">
              {modal.type === 'live' && modal.data?.link && (
                <a
                  href={modal.data.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button"
                >
                  Open original article <FaExternalLinkAlt style={{ marginLeft: 6 }} />
                </a>
              )}
              <button className="cta-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="news-bg" aria-hidden="true" />
    </section>
  );
};

export default NewsPage;
