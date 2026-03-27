import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="contact-wrap"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="contact-copy">
            <h2>Let’s build something great together</h2>
            <p>
              Tell us your goals and we’ll tailor an outsourcing plan that fits
              your growth and budget.
            </p>
          </div>
          <div className="contact-actions">
            <a href="mailto:hello@fortknox.com" className="cta-button">Get a Quote</a>
            <a href="#services" className="cta-secondary">Explore Services</a>
          </div>
        </motion.div>
      </div>
      <div className="contact-bg" />
    </section>
  );
};

export default Contact;
