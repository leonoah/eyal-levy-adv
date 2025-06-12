
import { Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '#home', label: 'דף הבית' },
    { href: '#about', label: 'אודות' },
    { href: '#services', label: 'תחומי התמחות' },
    { href: '#articles', label: 'מאמרים' },
    { href: '#contact', label: 'יצירת קשר' },
  ];

  return (
    <header className="bg-lawyer-black border-b border-lawyer-divider sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 space-x-reverse">
            <img 
              src="https://lovable.dev/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
              alt="לוגו עו&quot;ד אייל לוי" 
              className="h-10 w-auto"
              onError={(e) => {
                console.log('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="text-2xl font-bold text-lawyer-gold">עו"ד אייל לוי</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse items-center">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lawyer-white hover:text-lawyer-gold transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/admin"
              className="text-lawyer-silver hover:text-lawyer-gold transition-colors duration-300 ml-4"
              title="ניהול תוכן"
            >
              <Settings size={20} />
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 space-x-reverse">
            <a
              href="/admin"
              className="text-lawyer-silver hover:text-lawyer-gold transition-colors"
              title="ניהול תוכן"
            >
              <Settings size={20} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-lawyer-white hover:text-lawyer-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-lawyer-divider">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-lawyer-white hover:text-lawyer-gold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/admin"
                className="block px-3 py-2 text-lawyer-silver hover:text-lawyer-gold transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ניהול תוכן
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
