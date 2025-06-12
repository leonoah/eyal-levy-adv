
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
   <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4 py-16">
  <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
    
    {/* Image on the left */}
    <div className="order-1 lg:order-1">
      <div className="rounded-lg border-4 border-[#c5a56d] shadow-[0_0_15px_rgba(197,165,109,0.4)] overflow-hidden w-80 h-96 bg-[#1e1e1e]">
        <img 
          src={content.about.image} 
          alt="עו''ד אייל לוי" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Text on the right */}
    <div className="order-2 lg:order-2 text-center lg:text-right max-w-xl">
      {/* Logo */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
          alt="לוגו עו''ד אייל לוי" 
          className="h-24 mx-auto lg:mx-0"
        />
      </div>

      {/* Main title */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#c5a56d] mb-4 leading-tight">
        עו"ד אייל לוי
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl text-[#bbbbbb] mb-6 font-medium">
        משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה
      </h2>

      {/* Description */}
      <p className="text-[#e0e0e0] text-lg leading-relaxed mb-10">
        ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים.<br />
        אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.
      </p>

      {/* CTA Button */}
      <div className="flex justify-center lg:justify-start">
        <a href="#contact">
          <button className="bg-[#c5a56d] text-[#121212] text-lg font-semibold px-8 py-3 rounded-lg hover:bg-[#b89250] transition">
            לתיאום פגישה
          </button>
        </a>
      </div>
    </div>
  </div>
</section>

  );
};

export default Hero;
