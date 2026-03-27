import React, { useEffect, useRef } from 'react';
import './GlobalRippleEffect.css';

const CLICKABLE_SELECTORS = [
  'a[href]',
  'button',
  '[role="button"]',
  '[onclick]',
  'input[type="button"]',
  'input[type="submit"]',
  'label',
  '.clickable', // optional: add this class to custom clickable elements
];

const GlobalRippleEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleClick = (e) => {
      // Check if clicked element or its parents match clickable selectors
      let el = e.target;
      let isClickable = false;
      while (el && el !== document.body) {
        if (
          CLICKABLE_SELECTORS.some((selector) => el.matches(selector)) ||
          el.getAttribute('onclick') !== null
        ) {
          isClickable = true;
          break;
        }
        el = el.parentElement;
      }
      if (!isClickable) return;

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.className = 'global-ripple';

      // Calculate size and position
      const rect = e.target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;

      // Position ripple relative to viewport
      ripple.style.left = `${e.clientX - size / 2}px`;
      ripple.style.top = `${e.clientY - size / 2}px`;

      container.appendChild(ripple);

      // Remove ripple after animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return <div ref={containerRef} className="global-ripple-container" />;
};

export default GlobalRippleEffect;
