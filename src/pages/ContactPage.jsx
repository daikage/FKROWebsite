import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaFacebookSquare, FaTwitter } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <section className="container" style={{ padding: '80px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h2>Contact Us</h2>
          <p style={{ marginTop: 10, maxWidth: 720 }}>
            Let’s talk about your goals—we’ll tailor an outsourcing plan that fits your growth and budget.
          </p>

          <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
            <div><FaMapMarkerAlt /> Lagos Office: 3 Murphy Atsepoyi St, Off Ramat Crescent, Ogudu GRA, Lagos, Nigeria.</div>
            <div><FaMapMarkerAlt /> Abuja HQ: Plot 302, Cadastral Zone B02, Behind American International School, Durunmi, Abuja, FCT.</div>
            <div><FaPhone /> +234(0) 902 000 9999</div>
            <div><FaEnvelope /> info@fortknoxoutsourcing.com</div>
            <div><FaEnvelope /> recruitment@fortknoxoutsourcing.com</div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookSquare size={22} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter size={22} /></a>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <img
            alt="Contact us illustration"
            loading="lazy"
            style={{ maxWidth: 520, width: '100%' }}
            src="https://i.ibb.co/TBFCXBp4/5124556.png"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
