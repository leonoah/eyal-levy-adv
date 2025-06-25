
import { Button } from '@/components/ui/button';
import { useAdminContent } from '@/hooks/useAdminContent';
import { MessageCircle } from 'lucide-react';
import AchievementsDisplay from '@/components/shared/AchievementsDisplay';
import { useThemeSettings } from '@/hooks/useThemeSettings';

const Hero = () => {
  const { content } = useAdminContent();
  const { themeSettings } = useThemeSettings();

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
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={backgroundStyle}
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Two-column layout - swapped order */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Right Column - Image (now first in order for RTL) */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="rounded-lg border-4 border-lawyer-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] overflow-hidden bg-lawyer-black" 
                 style={{ width: '544px', height: '653px' }}>
              {content.about.image ? (
                <img 
                  src={content.about.image} 
                  alt="עו''ד אייל לוי" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', content.about.image);
                    // במקרה של שגיאה בטעינת התמונה, הצג רקע שחור
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                // אם אין תמונה, הצג רקע שחור
                <div className="w-full h-full bg-lawyer-black flex items-center justify-center">
                  <span className="text-lawyer-gold text-sm">לא הועלתה תמונה</span>
                </div>
              )}
            </div>
          </div>

          {/* Left Column - Content (now second in order for RTL) */}
          <div className="flex flex-col h-full justify-between text-center order-1 lg:order-2">
            
            {/* Row 1: Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
                alt="לוגו עו''ד אייל לוי" 
                className="h-20"
                onError={(e) => {
                  // במקרה של שגיאה בטעינת הלוגו, הסתר אותו
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Row 2: Name */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-lawyer-gold leading-tight">
                {content.hero.title}
              </h1>
            </div>

            {/* Row 3: Subtitle */}
            <div className="mb-6">
              <h2 className="text-xl text-lawyer-silver font-medium">
                {content.hero.subtitle}
              </h2>
            </div>

            {/* Row 4: Description */}
            <div className="mb-8 flex-grow">
              <p className="text-lawyer-white text-lg leading-relaxed">
                {content.hero.description}
              </p>
            </div>

            {/* New Section: About */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-lawyer-gold mb-4">
                {content.about.title}
              </h3>
              <p className="text-lawyer-white text-base leading-relaxed mb-4">
                {content.about.description1}
              </p>
              <p className="text-lawyer-white text-base leading-relaxed mb-6">
                {content.about.description2}
              </p>
              
              {/* Achievement badges using shared component */}
              <AchievementsDisplay achievements={content.achievements} variant="hero" />
            </div>

            {/* Row 5: CTA Buttons */}
            <div className="mt-auto flex justify-center gap-4">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-[#25d366] text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#20c55a] transition flex items-center gap-2 hover:scale-105 transform"
              >
                <MessageCircle size={20} />
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
