
import { Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { content } = useAdminContent();

  const menuItems = [
    { href: '#home', label: 'דף הבית' },
    { href: '#about', label: 'אודות' },
    { href: '#services', label: 'תחומי התמחות' },
    { href: '#articles', label: 'מאמרים' },
    { href: '#contact', label: 'יצירת קשר' },
  ];

  // פונקציה ליצירת קישור WhatsApp תקני
  const createWhatsAppLink = (phoneNumber: string, messageText?: string) => {
    // ניקוי המספר מכל תווים שאינם ספרות
    const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
    console.log('Header - Original phone number:', phoneNumber);
    console.log('Header - Cleaned phone number:', cleanNumber);

    // פורמט המספר עם קידומת בינלאומית
    let formattedNumber = cleanNumber;
    
    // אם המספר מתחיל ב-0 (מספר ישראלי מקומי), נחליף ל-972
    if (cleanNumber.startsWith('0')) {
      formattedNumber = '972' + cleanNumber.substring(1);
    } 
    // אם המספר לא מתחיל ב-972 ולא ב-0, נוסיף 972
    else if (!cleanNumber.startsWith('972')) {
      formattedNumber = '972' + cleanNumber;
    }

    console.log('Header - Formatted phone number:', formattedNumber);

    // השתמש בהודעה המותאמת אישית או ברירת מחדל
    const message = messageText || content.contact.whatsappMessage || `שלום, אני מעוניין לקבל ייעוץ משפטי מעו"ד ${content.hero.title.replace('עו"ד ', '')}`;
    console.log('Header - Message text:', message);
    
    const encodedMessage = encodeURIComponent(message);
    console.log('Header - Encoded message:', encodedMessage);

    // קישור תקני
    const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    console.log('Header - Final WhatsApp link:', whatsappLink);
    
    return whatsappLink;
  };

  const handleWhatsAppClick = () => {
    const link = createWhatsAppLink(content.contact.phone);
    window.open(link, '_blank');
  };

  return (
    <header className="bg-lawyer-black border-b border-lawyer-divider sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation - positioned first (will appear on right in RTL) */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
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
              className="text-lawyer-silver hover:text-lawyer-gold transition-colors duration-300"
              title="ניהול תוכן"
            >
              <Settings size={20} />
            </a>
          </nav>

          {/* Mobile menu button - positioned first (will appear on right in RTL) */}
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

          {/* Logo and WhatsApp button - positioned second (will appear on left in RTL) */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <h1 className="text-xl font-bold text-lawyer-gold">עו"ד אייל לוי</h1>
            <button
              onClick={handleWhatsAppClick}
              className="text-green-500 hover:text-green-400 transition-colors"
              title="שלח הודעה בוואטסאפ"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
              </svg>
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
