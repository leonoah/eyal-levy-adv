
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle, Star, TrendingUp, Shield, Heart } from 'lucide-react';
import { useContentManager } from '@/hooks/useContentManager';
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const content = useContentManager();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    Award,
    Clock, 
    Users,
    CheckCircle,
    Star,
    TrendingUp,
    Shield,
    Heart
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`section-spacing bg-lawyer-block transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold mb-4 md:mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {content.about.title}
          </h2>
          
          <p className={`text-base md:text-lg text-lawyer-white mb-4 md:mb-6 leading-relaxed transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {content.about.description1}
          </p>
          
          <p className={`text-base md:text-lg text-lawyer-silver mb-6 md:mb-8 leading-relaxed transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {content.about.description2}
          </p>

          {/* Achievements - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 max-w-2xl mx-auto">
            {content.achievements && content.achievements.length > 0 ? content.achievements.map((achievement, index) => {
              const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
              return (
                <div 
                  key={`achievement-${index}`} 
                  className={`flex items-center space-x-3 space-x-reverse justify-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <IconComponent size={18} className="text-lawyer-gold flex-shrink-0 md:w-5 md:h-5" />
                  <span className="text-lawyer-silver text-xs sm:text-sm">{achievement.text}</span>
                </div>
              );
            }) : null}
          </div>

          <div className={`transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button className="lawyer-button-secondary text-sm md:text-base px-6 md:px-8 py-2 md:py-3">
              קראו עוד
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
