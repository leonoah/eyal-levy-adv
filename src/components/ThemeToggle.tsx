
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Update CSS custom properties for immediate effect
    if (newTheme) {
      document.documentElement.style.setProperty('--lawyer-black', '#121212');
      document.documentElement.style.setProperty('--lawyer-charcoal', '#222222');
    } else {
      document.documentElement.style.setProperty('--lawyer-black', '#ffffff');
      document.documentElement.style.setProperty('--lawyer-charcoal', '#f8f9fa');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, var(--lawyer-gold), var(--lawyer-soft-gold))'
          : 'linear-gradient(135deg, var(--lawyer-charcoal), var(--lawyer-black))',
        color: isDark ? 'var(--lawyer-black)' : 'var(--lawyer-white)',
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
