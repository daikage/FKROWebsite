import React from 'react';
import './ServicesPage.css';
import { motion } from 'framer-motion'; // added for subtle entry animations;

const blocks = [
  {
    id: 'personnel',
    title: 'Personnel Outsourcing',
    desc:
      'Redefining outsourcing in Nigeria through strategic sourcing, recruitment, training, deployment, and professional management of a performance-driven workforce across various job roles.',
    scope:
      'We manage professional, skilled, semi-skilled, unskilled, and technical personnel on short- to long-term engagements.',
    img: 'https://i.ibb.co/cSpyp1BC/3491167.jpg',
  },
  {
    id: 'recruitment',
    title: 'Recruitment & Talent Management',
    desc:
      'Placing the right people, in the right jobs, at the right time, to do the right things, at the right cost.',
    scope:
      'We use a robust database of ready-to-deploy candidates and a rigorous, innovative recruitment platform.',
    img: 'https://i.ibb.co/svQncrDd/jobinterview-1.jpg',
    
  },
  {
    id: 'payroll',
    title: 'Payroll Outsourcing',
    desc:
      'We solve cumbersome in-house payroll administration and errors with an efficient, secure system.',
    scope:
      'Timely payment execution, correct holdings, tax deductions/remittances, plus seamless payslips and periodic reports.',
    img: 'https://i.ibb.co/BK768y24/2202-i402-020-S-m004-c13-Devops-engineer-flat-composition.jpg',
  },
  {
    id: 'assessment',
    title: 'Assessment Services',
    desc:
      'Pre-assessment testing systems to identify high-potential talent, improve hire quality, and uncover proficiency gaps.',
    scope: '',
    img: 'https://i.ibb.co/0pJd2cGb/gradient-career-cushioning-concept.png',
  },
  {
    id: 'background',
    title: 'Background Check & Candidate Verification',
    desc:
      'Minimize risk and eliminate losses due to fraud, theft, industrial espionage, operational disruption, and reputation damage.',
    scope: '',
    img: 'https://i.ibb.co/chhX47g2/19826.jpg',
  },
  {
    id: 'learning',
    title: 'Learning & Development',
    desc:
      'Training and development solutions that enable more effective and efficient business management.',
    scope: '',
    img: 'https://i.ibb.co/7JK2Gksz/5869496.jpg',
  },
];

const ServicesPage = () => {
  return (
    <section className="services-page services-page--revamp">
      <div className="container">
        <div className="sp-header">
          <h1>Our Services</h1>
          <p>Secure, scalable solutions built around your goals.</p>
        </div>

        {/* revamped card grid */}
        <div className="sp-grid sp-grid--cards">
          {blocks.map((b) => (
            <motion.article
              className="sp-card"
              id={b.id}
              key={b.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="sp-media">
                <img src={b.img} alt={`${b.title} illustration`} loading="lazy" />
              </div>
              <div className="sp-body">
                <div className="sp-chip">Featured</div>
                <h2>{b.title}</h2>
                <p className="sp-desc">{b.desc}</p>
                {b.scope && <p className="sp-scope">{b.scope}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
