
import { Button } from '@/components/ui/button';
import { useContentManager } from '@/hooks/useContentManager';

const Hero = () => {
  const content = useContentManager();

  return (
    <section id="home" className="section-spacing bg-lawyer-black relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Title together */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png" 
              alt="לוגו עו&quot;ד אייל לוי" 
              className="h-16 w-auto ml-4"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold">
              {content.hero.title}
            </h2>
          </div>
          
          {/* Eyal's image below the name */}
          <div className="mb-6">
            {content.about.image ? (
              <div className="w-52 h-52 mx-auto rounded-lg border-2 border-lawyer-gold overflow-hidden">
                <img 
                  src={content.about.image} 
                  alt="עו&quot;ד אייל לוי" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-52 h-52 mx-auto rounded-lg border-2 border-lawyer-gold bg-lawyer-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-26 h-26 bg-lawyer-gold rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-3xl font-bold text-lawyer-black">א.ל</span>
                  </div>
                  <p className="text-lawyer-gold font-semibold text-base">עו&quot;ד אייל לוי</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-lawyer-silver mb-8 animate-fade-in">
            {content.hero.subtitle}
          </p>
          
          {/* Description */}
          <p className="text-lg text-lawyer-white mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {content.hero.description}
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center animate-fade-in">
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
