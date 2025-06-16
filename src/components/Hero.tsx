
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
   <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4 py-16">
  <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
    
    {/* Logo at the top */}
    <div className="mb-8 text-center">
      <img 
        src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
        alt="לוגו עו''ד אייל לוי" 
        className="h-24 mx-auto"
      />
    </div>

    {/* Main content - Image and Text side by side, centered */}
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-8 w-full">
      
      {/* Image */}
      <div className="flex-shrink-0">
        <div className="rounded-lg border-4 border-[#c5a56d] shadow-[0_0_15px_rgba(197,165,109,0.4)] overflow-hidden w-80 h-96 bg-[#1e1e1e]">
          <img 
            src={content.about.image} 
            alt="עו''ד אייל לוי" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1 max-w-lg text-center lg:text-right">
        {/* Main title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#c5a56d] mb-4 leading-tight">
          עו"ד אייל לוי
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl text-[#bbbbbb] mb-6 font-medium">
          משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה
        </h2>

        {/* Description */}
        <p className="text-[#e0e0e0] text-lg leading-relaxed">
          ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים.<br />
          אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.
        </p>
      </div>
    </div>

    {/* CTA Button at the bottom */}
    <div className="text-center">
      <a href="#contact">
        <button className="bg-[#c5a56d] text-[#121212] text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#b89250] transition">
          לתיאום פגישה
        </button>
      </a>
    </div>
  </div>
</section>
  );
};

export default Hero;
