
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="section-spacing bg-lawyer-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold text-lawyer-gold mb-6 animate-fade-in">
            עו"ד אייל לוי
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-lawyer-silver mb-8 animate-fade-in">
            משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה
          </p>
          
          {/* Description */}
          <p className="text-lg text-lawyer-white mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים. 
            אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in">
            <a href="#contact">
              <Button className="lawyer-button-primary text-lg px-8 py-4">
                לתיאום פגישה
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-lawyer-gold rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-lawyer-silver rounded-full"></div>
        <div className="absolute top-1/2 right-1/2 w-16 h-16 border border-lawyer-gold rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
