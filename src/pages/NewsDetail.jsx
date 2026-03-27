import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaTag, FaArrowLeft } from 'react-icons/fa';
import { newsPosts } from '../data/news';
import './NewsDetail.css';

const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const NewsDetail = () => {
  const { slug } = useParams();
  const post = newsPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="news-detail">
        <div className="container">
          <p style={{ marginBottom: 12 }}>The requested news item was not found.</p>
          <Link className="cta-secondary" to="/news"><FaArrowLeft style={{ marginRight: 6 }} /> Back to News</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="news-detail">
      <div className="container">
        <div className="nd-header">
          <h1>{post.title}</h1>
          <div className="nd-meta">
            <span><FaClock /> {formatDate(post.date)}</span>
            <span><FaTag /> {post.tags.join(' • ')}</span>
          </div>
        </div>

        <article className="nd-body" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="nd-actions">
          <Link className="cta-secondary" to="/news"><FaArrowLeft style={{ marginRight: 6 }} /> Back to News</Link>
        </div>
      </div>
      <div className="news-bg" aria-hidden="true" />
    </section>
  );
};

export default NewsDetail;
