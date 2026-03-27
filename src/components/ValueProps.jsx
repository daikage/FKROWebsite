import React from 'react';
import './ValueProps.css';
import { FaMoneyBillWave, FaHandshake, FaLifeRing, FaGlobe, FaHeadset, FaMedal } from 'react-icons/fa';

const items = [
  {
    icon: <FaMoneyBillWave />,
    title: 'Cost-Effective & Efficient',
    text: 'Save time and money while meeting quality expectations.',
  },
  {
    icon: <FaHandshake />,
    title: 'Long-Term Partnerships',
    text: 'We become a strategic partner, not just a vendor.',
  },
  {
    icon: <FaLifeRing />,
    title: 'Aftersales Service',
    text: 'Ongoing support to keep solutions performing.',
  },
  {
    icon: <FaGlobe />,
    title: 'Global Experience',
    text: 'Deep understanding of the Nigerian market for multinationals & SMEs.',
  },
  {
    icon: <FaHeadset />,
    title: 'In-Project Support',
    text: 'Available 24/7 throughout your project.',
  },
  {
    icon: <FaMedal />,
    title: 'Beyond the Call of Duty',
    text: 'We’re deliberate with excellence and beat timelines.',
  },
];

const ValueProps = () => {
  return (
    <section className="valueprops">
      <div className="container">
        <div className="vp-header">
          <h2>Why Your Competitors Talk to Us</h2>
          <p>We pair secure processes with world‑class talent to help you scale.</p>
        </div>
        <div className="vp-grid">
          {items.map((item, idx) => (
            <div className="vp-card" key={idx}>
              <div className="vp-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
