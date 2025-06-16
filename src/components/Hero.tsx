
import { Button } from '@/components/ui/button';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Award, Users, TrendingUp, Clock, CheckCircle, Star, Shield, Heart, MessageCircle } from 'lucide-react';

const Hero = () => {
  const { content } = useAdminContent();

  const iconMap = {
    Award,
    Users,
    TrendingUp,
    Clock,
    CheckCircle,
    Star,
    Shield,
    Heart
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = content.contact.phone;
    const message = encodeURIComponent(`שלום, אני מעוניין לקבל ייעוץ משפטי מעו"ד ${content.hero.title.replace('עו"ד ', '')}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Two-column layout - swapped order */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Right Column - Image (now first in order for RTL) */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="rounded-lg border-4 border-[#c5a56d] shadow-[0_0_15px_rgba(197,165,109,0.4)] overflow-hidden bg-[#121212]" 
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
                <div className="w-full h-full bg-[#121212] flex items-center justify-center">
                  <span className="text-[#c5a56d] text-sm">לא הועלתה תמונה</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#c5a56d] leading-tight">
                {content.hero.title}
              </h1>
            </div>

            {/* Row 3: Subtitle */}
            <div className="mb-6">
              <h2 className="text-xl text-[#bbbbbb] font-medium">
                {content.hero.subtitle}
              </h2>
            </div>

            {/* Row 4: Description */}
            <div className="mb-8 flex-grow">
              <p className="text-[#e0e0e0] text-lg leading-relaxed">
                {content.hero.description}
              </p>
            </div>

            {/* New Section: About */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#c5a56d] mb-4">
                {content.about.title}
              </h3>
              <p className="text-[#e0e0e0] text-base leading-relaxed mb-4">
                {content.about.description1}
              </p>
              <p className="text-[#e0e0e0] text-base leading-relaxed mb-6">
                {content.about.description2}
              </p>
              
              {/* Achievement badges with icons from admin */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {content.achievements && content.achievements.length > 0 ? content.achievements.map((achievement, index) => {
                  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
                  return (
                    <div key={`achievement-${index}`} className="flex items-center justify-center gap-2 text-[#c5a56d] font-semibold">
                      <IconComponent size={16} />
                      <span>{achievement.text}</span>
                    </div>
                  );
                }) : (
                  // Fallback if no achievements are set
                  <>
                    <div className="flex items-center justify-center gap-2 text-[#c5a56d] font-semibold">
                      <Award size={16} />
                      <span>ניסיון עשיר +15 שנים</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#c5a56d] font-semibold">
                      <Users size={16} />
                      <span>לקוחות מרוצים</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#c5a56d] font-semibold">
                      <TrendingUp size={16} />
                      <span>שיעור הצלחה גבוה</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#c5a56d] font-semibold">
                      <Clock size={16} />
                      <span>זמינות 24/7</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Row 5: CTA Buttons */}
            <div className="mt-auto flex justify-center gap-4">

              
              <button 
                onClick={handleWhatsAppClick}
                className="bg-[#25d366] text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#20c55a] transition flex items-center gap-2"
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
