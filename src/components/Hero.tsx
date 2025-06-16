
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
    <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Logo at the top */}
        <div className="mb-12 text-center">
          <div className="inline-block border-2 border-[#c5a56d] p-4 rounded-lg">
            <span className="text-2xl font-bold text-[#c5a56d] tracking-widest">EL</span>
          </div>
        </div>

        {/* Main content - Image and Text side by side */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image with golden border */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#c5a56d] to-[#b89250] rounded-lg opacity-20"></div>
              <div className="relative rounded-lg border-4 border-[#c5a56d] shadow-[0_0_30px_rgba(197,165,109,0.3)] overflow-hidden">
                <img 
                  src="/lovable-uploads/d2067588-44d5-4d73-9db3-efed3373a95b.png"
                  alt="עו''ד אייל לוי" 
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 text-center lg:text-right space-y-8">
            {/* Main title */}
            <h1 className="text-5xl md:text-6xl font-bold text-[#c5a56d] leading-tight">
              Attorney Eyal Levy
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl text-[#e0e0e0] font-light">
              Law Offices - Labor, Real Estate & Litigation
            </h2>

            {/* Description */}
            <p className="text-[#bbbbbb] text-lg leading-relaxed max-w-2xl">
              A seasoned legal advisor with extensive experience, providing clients with effective and personalized solutions in various areas of law.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <a href="#contact">
                <button className="bg-[#c5a56d] text-[#121212] text-lg font-semibold px-12 py-4 rounded-lg hover:bg-[#b89250] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book a Consultation
                </button>
              </a>
            </div>

            {/* Hebrew version below */}
            <div className="pt-8 border-t border-[#333] mt-8">
              <h3 className="text-3xl font-bold text-[#c5a56d] mb-3">
                עו"ד אייל לוי
              </h3>
              <p className="text-[#bbbbbb] text-base">
                משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
