import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-switcher"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <FaSun className="sun-icon" />
      ) : (
        <FaMoon className="moon-icon" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
