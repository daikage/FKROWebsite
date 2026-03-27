import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
    <h2>Page not found</h2>
    <p style={{ marginTop: 8 }}>The page you’re looking for doesn’t exist.</p>
    <div style={{ marginTop: 24 }}>
      <Link to="/" className="cta-button">Back to Home</Link>
    </div>
  </section>
);

export default NotFound;
