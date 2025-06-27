
import { Button } from '@/components/ui/button';
import { useAdminContent } from '@/hooks/useAdminContent';
import { MessageCircle } from 'lucide-react';
import AchievementsDisplay from '@/components/shared/AchievementsDisplay';
import { useThemeSettings } from '@/hooks/useThemeSettings';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { content } = useAdminContent();
  const { themeSettings } = useThemeSettings();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // פונקציה ליצירת קישור WhatsApp תקני
  const createWhatsAppLink = (phoneNumber: string, messageText?: string) => {
    // ניקוי המספר מכל תווים שאינם ספרות
    const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
    console.log('Hero - Original phone number:', phoneNumber);
    console.log('Hero - Cleaned phone number:', cleanNumber);

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

    console.log('Hero - Formatted phone number:', formattedNumber);

    // השתמש בהודעה המותאמת אישית או ברירת מחדל
    const message = messageText || content.contact.whatsappMessage || `שלום, אני מעוניין לקבל ייעוץ משפטי מעו"ד ${content.hero.title.replace('עו"ד ', '')}`;
    console.log('Hero - Message text:', message);
    
    const encodedMessage = encodeURIComponent(message);
    console.log('Hero - Encoded message:', encodedMessage);

    // קישור תקני
    const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    console.log('Hero - Final WhatsApp link:', whatsappLink);
    
    return whatsappLink;
  };

  const handleWhatsAppClick = () => {
    const link = createWhatsAppLink(content.contact.phone);
    window.open(link, '_blank');
  };

  const backgroundStyle = {
    backgroundColor: themeSettings?.background_color || 'var(--lawyer-black)',
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 py-8 md:py-16 transition-all duration-1000"
      style={backgroundStyle}
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Two-column layout - responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* Right Column - Image */}
          <div className="flex justify-center order-2 lg:order-1 transition-all duration-1000 delay-300">
            <div className="rounded-lg border-4 border-lawyer-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] overflow-hidden bg-lawyer-black max-w-sm md:max-w-md lg:max-w-none" 
                 style={{ width: '100%', maxWidth: '544px', aspectRatio: '544/653' }}>
              {content.about.image ? (
                <img 
                  src={content.about.image} 
                  alt="עו''ד אייל לוי" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', content.about.image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-lawyer-black flex items-center justify-center">
                  <span className="text-lawyer-gold text-sm">לא הועלתה תמונה</span>
                </div>
              )}
            </div>
          </div>

          {/* Left Column - Content */}
          <div className="flex flex-col h-full justify-between text-center order-1 lg:order-2 transition-all duration-1000 space-y-4 md:space-y-6">
            
            {/* Row 1: Logo */}
            <div className="flex justify-center transition-all duration-700 delay-200">
              <img 
                src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
                alt="לוגו עו''ד אייל לוי" 
                className="h-16 md:h-20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Row 2: Name */}
            <div className="transition-all duration-700 delay-300">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold leading-tight">
                {content.hero.title}
              </h1>
            </div>

            {/* Row 3: Subtitle */}
            <div className="transition-all duration-700 delay-400">
              <h2 className="text-lg md:text-xl text-lawyer-silver font-medium">
                {content.hero.subtitle}
              </h2>
            </div>

            {/* Row 4: Description */}
            <div className="flex-grow transition-all duration-700 delay-500">
              <p className="text-lawyer-white text-base md:text-lg leading-relaxed">
                {content.hero.description}
              </p>
            </div>

            {/* New Section: About */}
            <div className="transition-all duration-700 delay-600">
              <h3 className="text-xl md:text-2xl font-bold text-lawyer-gold mb-3 md:mb-4">
                {content.about.title}
              </h3>
              <p className="text-lawyer-white text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                {content.about.description1}
              </p>
              <p className="text-lawyer-white text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                {content.about.description2}
              </p>
              
              {/* Achievement badges using shared component */}
              <AchievementsDisplay achievements={content.achievements} variant="hero" />
            </div>

            {/* Row 5: CTA Buttons */}
            <div className="mt-auto flex justify-center gap-4 transition-all duration-700 delay-700">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-[#25d366] text-white text-base md:text-lg font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-[#20c55a] transition flex items-center gap-2 hover:scale-105 transform"
              >
                <MessageCircle size={18} className="md:w-5 md:h-5" />
                צור קשר
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
