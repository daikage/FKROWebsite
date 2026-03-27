import React, { useState, useRef } from 'react';
import './Services.css';
import { motion } from 'framer-motion';
import { FaMale, FaCode, FaDatabase, FaPenNib, FaMoneyBill } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaMale />,
    title: 'Personnel Outsourcing',
    description: 'Redefining outsourcing in Nigeria through strategic sourcing, recruitment, training, deployment, and professional management of a performance-driven workforce across various job roles.',
  },
  {
    icon: <FaCode />,
    title: 'Recruitment & Talent Management',
    description: 'Placing the right people, in the right jobs, at the right time, to do the right things, at the right cost.',
  },
  {
    icon: <FaMoneyBill />,
    title: 'Payroll Outsourcing',
    description: 'We solve cumbersome in-house payroll administration and errors with an efficient, secure system.',
  },
  {
    icon: <FaPenNib />,
    title: 'Assessment Services',
    description: 'Pre-assessment testing systems to identify high-potential talent, improve hire quality, and uncover proficiency gaps.',
  },
];

const Services = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  // Ripple state for card clicks
  const [ripples, setRipples] = useState([]);
  // Page transition ripple state
  const [pageRipple, setPageRipple] = useState(null);

  // Ref to container for relative positioning
  const containerRef = useRef(null);

  // Handle card click ripple
  const handleCardClick = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, id: Date.now() };
    setRipples((oldRipples) => [...oldRipples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((oldRipples) => oldRipples.filter(r => r.id !== newRipple.id));
    }, 600);

    // Trigger page transition ripple effect from click position relative to viewport
    triggerPageTransition(e.clientX, e.clientY);
  };

  // Trigger page transition ripple effect
  const triggerPageTransition = (x, y) => {
    setPageRipple({ x, y, id: Date.now() });

    // After animation, you can navigate or do other actions here
    setTimeout(() => {
      setPageRipple(null);
      // Example: window.location.href = '/nextpage';
      // or use react-router navigate here
    }, 800);
  };

  return (
    <>
      <section id="services" className="services" ref={containerRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>We provide a wide range of solutions to meet your business needs.</p>
          </div>
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <motion.div
                className="service-card"
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                onClick={(e) => handleCardClick(e, index)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {/* Ripples on card */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      top: ripple.y,
                      left: ripple.x,
                      width: ripple.size,
                      height: ripple.size,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page transition ripple overlay */}
      {pageRipple && (
        <div className="page-transition-overlay">
          <span
            className="page-transition-ripple"
            style={{
              top: pageRipple.y,
              left: pageRipple.x,
              width: 20,
              height: 20,
              marginTop: -10,
              marginLeft: -10,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Services;
