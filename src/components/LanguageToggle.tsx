
import { useState, useEffect } from 'react';

const LanguageToggle = () => {
  const [isHebrew, setIsHebrew] = useState(true);

  useEffect(() => {
    // Check for saved language preference or default to Hebrew
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsHebrew(savedLanguage === 'he');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = !isHebrew;
    setIsHebrew(newLanguage);
    localStorage.setItem('language', newLanguage ? 'he' : 'en');
    
    // Here you would implement the actual translation logic
    console.log(`Language changed to: ${newLanguage ? 'Hebrew' : 'English'}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 left-20 z-[100] p-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center space-x-2 space-x-reverse"
      style={{
        background: 'linear-gradient(135deg, var(--lawyer-gold), var(--lawyer-soft-gold))',
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
      }}
      aria-label={`Switch to ${isHebrew ? 'English' : 'Hebrew'}`}
      title={`Switch to ${isHebrew ? 'English' : 'Hebrew'}`}
    >
      <span className="text-lg">
        {isHebrew ? '🇺🇸' : '🇮🇱'}
      </span>
      <span className="text-sm font-medium text-lawyer-black">
        {isHebrew ? 'EN' : 'עב'}
      </span>
    </button>
  );
};

export default LanguageToggle;
