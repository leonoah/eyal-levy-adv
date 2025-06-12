
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
    <section id="home" className="section-spacing bg-lawyer-black relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Logo centered at the top */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
              alt="לוגו עו&quot;ד אייל לוי" 
              className="h-24 w-auto mx-auto"
            />
          </div>

          {/* Main content with image on left and text on right */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            
            {/* Image on the left with gold border frame */}
            <div className="lg:order-1 order-1">
              {content.about.image ? (
                <div className="relative">
                  <div className="w-80 h-96 rounded-lg border-4 border-lawyer-gold overflow-hidden bg-lawyer-charcoal">
                    <img 
                      src={content.about.image} 
                      alt="עו&quot;ד אייל לוי" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-80 h-96 rounded-lg border-4 border-lawyer-gold bg-lawyer-charcoal flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-40 h-40 bg-lawyer-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                        <span className="text-5xl font-bold text-lawyer-black">א.ל</span>
                      </div>
                      <p className="text-lawyer-gold font-semibold text-xl">עו&quot;ד אייל לוי</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Text content on the right */}
            <div className="lg:order-2 order-2 text-center lg:text-right flex-1 max-w-2xl">
              {/* Main title */}
              <h1 className="text-5xl md:text-6xl font-bold text-lawyer-gold mb-8 leading-tight">
                {content.hero.title}
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-2xl md:text-3xl text-lawyer-silver mb-8 font-medium leading-relaxed">
                {content.hero.subtitle}
              </h2>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-lawyer-white mb-12 leading-relaxed">
                {content.hero.description}
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-center lg:justify-end">
                <a href="#contact">
                  <Button className="lawyer-button-primary text-xl px-12 py-4 rounded-lg">
                    לתיאום פגישה
                  </Button>
                </a>
              </div>
            </div>
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
