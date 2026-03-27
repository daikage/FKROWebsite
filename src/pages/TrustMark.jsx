import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaLock, FaFileAlt, FaUserShield } from 'react-icons/fa';
import './TrustMark.css';

const checks = [
  { icon: <FaCheckCircle />, text: 'Regular third‑party NDPR audits and gap assessments' },
  { icon: <FaLock />, text: 'Encryption in transit and at rest for sensitive data' },
  { icon: <FaUserShield />, text: 'Role‑based access control and audit logging' },
  { icon: <FaFileAlt />, text: 'Data retention, disposal, and subject access processes' },
  { icon: <FaCheckCircle />, text: 'Incident response and DPA liaison procedures' },
];

const TrustMark = () => {
  return (
    <section className="trustmark">
      <div className="container">
        <motion.div
          className="tm-hero"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="tm-badge">
            <FaShieldAlt className="tm-badge-icon" />
            <div className="tm-badge-copy">
              <h1>NDPR Audit</h1>
              <p>Certified data privacy compliance you can trust.</p>
            </div>
          </div>

          <p className="tm-intro">
            We maintain strict compliance with the Nigeria Data Protection Regulation (NDPR).
            Our controls are independently assessed, and we continuously improve our policies,
            training, and security posture to safeguard personal data.
          </p>
        </motion.div>

        <div className="tm-grid">
          <motion.div
            className="tm-card tm-card--accent"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Commitment</h2>
            <p>
              We align our privacy program with NDPR principles: lawfulness, fairness,
              purpose limitation, data minimization, accuracy, storage limitation, and integrity.
            </p>
            <ul className="tm-list">
              {checks.map((c, i) => (
                <li key={i}><span className="tm-ic">{c.icon}</span>{c.text}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="tm-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>Documentation & Evidence</h3>
            <p>
              Policies, data maps, DPIAs, training records, vendor assessments, and incident drills are
              available for review under NDA.
            </p>
            <div className="tm-actions">
              <a className="cta-button" href="#" onClick={(e) => e.preventDefault()}>Request Statement of Compliance (PDF)</a>
            </div>
            <div className="tm-seals">
              <div className="tm-seal">
                <FaShieldAlt />
                <span>Privacy by Design</span>
              </div>
              <div className="tm-seal">
                <FaUserShield />
                <span>Data Protection Office</span>
              </div>
              <div className="tm-seal">
                <FaLock />
                <span>Security Controls</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="tm-bg" aria-hidden="true" />
    </section>
  );
};

export default TrustMark;
