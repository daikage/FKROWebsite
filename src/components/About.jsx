import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <motion.div
          className="about-copy"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2 variants={item}>Why Fortknox Outsourcing?</motion.h2>
          <motion.p variants={item}>
            We combine security, performance, and world‑class talent to help you
            scale efficiently. From customer support to development and content,
            we deliver reliable outcomes with measurable impact.
          </motion.p>

          <motion.ul className="about-stats" variants={container}>
            <motion.li variants={item}>
              <span className="stat">24/7</span>
              Global Coverage
            </motion.li>
            <motion.li variants={item}>
              <span className="stat">+98%</span>
              CSAT Scores
            </motion.li>
            <motion.li variants={item}>
              <span className="stat">40%</span>
              Avg. Cost Savings
            </motion.li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="about-visual"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="orb orb-blue" />
          <div className="orb orb-green" />
          <div className="about-card">
            Secure. Scalable. Seamless.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
