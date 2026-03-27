import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Parallax tilt for the right-side visual
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2); // -1 to 1
    const y = (e.clientY - cy) / (rect.height / 2); // -1 to 1
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const tiltStyle = {
    transform: `rotateX(${(-tilt.y * 9).toFixed(2)}deg) rotateY(${(tilt.x * 12).toFixed(2)}deg) translateZ(0)`,
  };

  // XMB "Dynamic Wave" canvas ref + animation
  const waveRef = useRef(null);

  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = 0, height = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let rafId = null;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      width = clientWidth;
      height = clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) draw(performance.now());
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Make the ribbon strokes a touch bolder for an eye‑catching "silk" sheen
    const ribbons = [
      { amp: 18, wl: 220, spd: 0.40, lw: 140, y: 0.28, h: 260 },
      { amp: 14, wl: 280, spd: 0.32, lw: 112, y: 0.38, h: 210 },
      { amp: 12, wl: 320, spd: 0.26, lw: 100, y: 0.48, h: 165 },
      { amp: 10, wl: 420, spd: 0.20, lw: 84,  y: 0.58, h: 300 },
    ];

    function draw(t) {
      const time = t * 0.001;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.imageSmoothingEnabled = true;

      for (let i = 0; i < ribbons.length; i++) {
        const r = ribbons[i];
        const baseY = height * r.y;

        // Soft hue drift over time
        const h1 = (r.h + Math.sin(time * 6) * 3) % 360;
        const h2 = (r.h + 20 + Math.cos(time * 4) * 4) % 360;
        const h3 = (r.h + 40 + Math.sin(time * 5) * 3) % 360;
        const hMid = (h1 + h2 + h3) / 3;

        // Gradient stroke across the ribbon
        const grad = ctx.createLinearGradient(0, baseY, width, baseY);
        grad.addColorStop(0.0, `hsla(${h1}, 80%, 60%, 0.9)`);
        grad.addColorStop(0.5, `hsla(${h2}, 75%, 62%, 0.9)`);
        grad.addColorStop(1.0, `hsla(${h3}, 70%, 64%, 0.9)`);

        // Primary ribbon pass with glow
        ctx.save();
        ctx.lineWidth = r.lw;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.10 + i * 0.045;
        ctx.strokeStyle = grad;
        ctx.shadowBlur = 24;
        ctx.shadowColor = `hsla(${hMid}, 80%, 62%, 0.55)`;

        ctx.beginPath();
        const startX = -r.lw;
        const endX = width + r.lw;
        const step = 6;
        for (let x = startX; x <= endX; x += step) {
          const p = (x / r.wl) * Math.PI * 2;
          const y =
            baseY +
            r.amp * Math.sin(p + time * r.spd * 2.0) +
            r.amp * 0.35 * Math.sin(p * 0.5 + time * r.spd * 1.4) +
            r.amp * 0.2 * Math.cos(p * 0.9 - time * r.spd * 1.1);
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Sheen pass: finer, white-ish highlight for "silk" effect
        ctx.shadowBlur = 0;
        ctx.globalAlpha *= 0.55;
        ctx.lineWidth = Math.max(1, r.lw * 0.32);
        ctx.strokeStyle = 'rgba(255,255,255,0.20)';
        ctx.stroke();

        ctx.restore();
      }
    }

    function loop(t) {
      draw(t);
      rafId = requestAnimationFrame(loop);
    }

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero hero--new"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Company gradient defs (available to any SVG on the page) */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        className="company-gradient-defs"
        style={{ position: 'absolute' }}
      >
        <defs>
          <linearGradient id="company-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--primary-blue)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--primary-green)' }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Background: XMB Wave only (aurora fully removed) */}
      <div className="hero-bg" aria-hidden="true">
        <div className="xmb-wave" aria-hidden="true">
          <canvas ref={waveRef} className="xmb-wave-canvas" />
        </div>
        {/* removed: aurora, grid-overlay, noise, glow-orb */}
      </div>

      <div className="container">
        <motion.div
          className="hero-inner"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-copy">
            <motion.div variants={itemVariants} className="eyebrow">
              Fort Knox Outsourcing
            </motion.div>
            <motion.h1 variants={itemVariants} className="headline">
              Build faster. Outsource smarter.
              <span className="headline-accent"> Scale without the overhead.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="subtext">
              We source, select, and second employment‑ready talent so you can focus on growth. 
              Flexible engagement. Enterprise reliability. Results you can measure.
            </motion.p>
            <motion.div variants={itemVariants} className="cta-row">
              <Link to="/services" className="btn btn-primary">Explore Solutions</Link>
              <Link to="/contact" className="btn btn-ghost">Get a Free Consult</Link>
            </motion.div>

            <motion.div variants={itemVariants} className="stats-row">
              <div className="stat">
                <span className="stat-value">150+</span>
                <span className="stat-label">Placements</span>
              </div>
              <div className="stat">
                <span className="stat-value">98%</span>
                <span className="stat-label">Client Retention</span>
              </div>
              <div className="stat">
                <span className="stat-value">24h</span>
                <span className="stat-label">Kickoff Time</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="hero-visual">
            <div className="visual-tilt" style={tiltStyle}>
              <div className="glass-card card-1">
                <div className="card-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="card-body">
                  <div className="chip">Talent Pipeline</div>
                  <div className="meter">
                    <span className="meter-fill" />
                  </div>
                  <ul className="list">
                    <li>Screened candidates</li>
                    <li>Role fit & culture fit</li>
                    <li>Fast onboarding</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card card-2">
                <div className="image-wrap">
                  <img
                    alt="Outsourcing illustration"
                    loading="lazy"
                    src="https://i.ibb.co/Nvx9L2H/Gemini-Generated-Image-pe3u3spe3u3spe3u.png"
                  />
                </div>
              </div>

              <div className="glass-card card-3">
                <div className="badge">SLA Backed</div>
                <div className="rings" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
