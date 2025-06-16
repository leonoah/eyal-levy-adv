
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
    <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Image (70% larger) */}
          <div className="flex justify-center">
            <div className="rounded-lg border-4 border-[#c5a56d] shadow-[0_0_15px_rgba(197,165,109,0.4)] overflow-hidden bg-[#1e1e1e]" 
                 style={{ width: '544px', height: '653px' }}>
              <img 
                src={content.about.image} 
                alt="עו''ד אייל לוי" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col h-full justify-between text-center">
            
            {/* Row 1: Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
                alt="לוגו עו''ד אייל לוי" 
                className="h-20"
              />
            </div>

            {/* Row 2: Name */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#c5a56d] leading-tight">
                עו"ד אייל לוי
              </h1>
            </div>

            {/* Row 3: Subtitle */}
            <div className="mb-6">
              <h2 className="text-xl text-[#bbbbbb] font-medium">
                משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה
              </h2>
            </div>

            {/* Row 4: Description */}
            <div className="mb-8 flex-grow">
              <p className="text-[#e0e0e0] text-lg leading-relaxed">
                ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים.<br />
                אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.
              </p>
            </div>

            {/* New Section: About */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#c5a56d] mb-4">
                אודות
              </h3>
              <p className="text-[#e0e0e0] text-base leading-relaxed mb-4">
                עו"ד אייל לוי הוא עורך דין מנוסה עם ניסיון רב שנים בתחומי הדין השונים. הוא מתמחה במתן ייעוץ משפטי מקצועי ומסור, תוך הקפדה על שירות אישי ומותאם לכל לקוח.
              </p>
              <p className="text-[#e0e0e0] text-base leading-relaxed mb-6">
                המשרד מתמחה בדיני עבודה, נדל"ן, ליטיגציה ייפוי כוח וצוואות. אנו גאים בשירות המקצועי והאמין שאנו מעניקים ללקוחותינו ובשיעור ההצלחה הגבוה שלנו בתיקים השונים.
              </p>
              
              {/* Achievement badges */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-[#c5a56d] font-semibold">
                  ניסיון עשיר +15 שנים
                </div>
                <div className="text-[#c5a56d] font-semibold">
                  לקוחות מרוצים
                </div>
                <div className="text-[#c5a56d] font-semibold">
                  שיעור הצלחה גבוה
                </div>
                <div className="text-[#c5a56d] font-semibold">
                  זמינות 24/7
                </div>
              </div>
            </div>

            {/* Row 5: CTA Button */}
            <div className="mt-auto flex justify-center">
              <a href="#contact">
                <button className="bg-[#c5a56d] text-[#121212] text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#b89250] transition">
                  לתיאום פגישה
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
