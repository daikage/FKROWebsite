import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import Tickers from '../components/Tickers.jsx';
import Services from '../components/Services.jsx';
import ValueProps from '../components/ValueProps.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <Tickers/>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Services />
      </motion.section>
      <ValueProps />
    </>
  );
};

export default Home;
