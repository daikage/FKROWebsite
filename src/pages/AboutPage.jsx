import React from 'react';

const AboutPage = () => {
  return (
    <section className="container" style={{ padding: '80px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'center' }}>
        <div>
          <h2>Our Mission</h2>
          <p style={{ marginTop: 10, maxWidth: 760 }}>
            Fort Knox Outsourcing was set up to cater to the growing need of businesses in Nigeria to reap the
            economic, strategic and operational benefits offered by outsourcing. We act as a ‘Third Party Service Provider’
            that Source, Select, and Second employment ready workforce in line with client specifications to meet their
            talent needs as quickly as possible!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 18 }}>
            <div className="about-stat-card">
              <strong>183+</strong><span>Outsourced staff across all 36 states</span>
            </div>
            <div className="about-stat-card">
              <strong>Pan‑Nigeria</strong><span>Regional offices & infrastructure</span>
            </div>
            <div className="about-stat-card">
              <strong>Exec Team</strong><span>Ex‑corporate leaders in finance & telecoms</span>
            </div>
            <div className="about-stat-card">
              <strong>Sectors</strong><span>FMCG, Telco, Oil & Gas, Insurance, Banking</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            alt="Team spirit illustration"
            loading="lazy"
            style={{ maxWidth: 520, width: '100%' }}
            src="https://i.ibb.co/h125xyg5/6520.png"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
