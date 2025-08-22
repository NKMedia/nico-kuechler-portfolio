import React, { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
    </button>
  );
}

export default ThemeToggle;
