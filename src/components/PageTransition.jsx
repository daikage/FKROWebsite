import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const [ripple, setRipple] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle click to trigger ripple and navigation
  const handleClick = (e, to) => {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    setRipple({ x, y, id: Date.now() });
    setIsTransitioning(true);

    // Delay navigation until ripple animation finishes
    setTimeout(() => {
      navigate(to);
      setIsTransitioning(false);
      setRipple(null);
    }, 800); // match animation duration
  };

  // Optional: reset ripple on location change (page load)
  useEffect(() => {
    setRipple(null);
    setIsTransitioning(false);
  }, [location]);

  return (
    <>
      {/* Wrap children with a div to disable clicks during transition */}
      <div style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}>
        {/* Example usage: children should use handleClick for links */}
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { onLinkClick: handleClick })
        )}
      </div>

      {/* Ripple overlay */}
      {ripple && (
        <div className="page-transition-overlay">
          <span
            className="page-transition-ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
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

export default PageTransition;
