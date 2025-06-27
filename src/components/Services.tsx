
import { Scale, Home, FileText, Users, Briefcase, Shield, Building } from 'lucide-react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useEffect, useRef, useState } from 'react';

const Services = () => {
  const { content } = useAdminContent();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    Scale,
    Home,
    FileText,
    Users,
    Briefcase,
    Shield,
    Building
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
      id="services" 
      ref={sectionRef}
      className={`section-spacing bg-lawyer-black transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold mb-4 md:mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            תחומי התמחות
          </h2>
          <p className={`text-lg md:text-xl text-lawyer-silver max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            אנו מתמחים במגוון רחב של תחומי דין ומספקים שירות מקצועי ואמין
          </p>
        </div>

        {/* Services grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {content.services && content.services.length > 0 ? content.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Scale;
            return (
              <div 
                key={`service-${index}`} 
                className={`lawyer-card text-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="mb-4 md:mb-6">
                  <IconComponent 
                    size={40} 
                    className="text-lawyer-gold mx-auto group-hover:scale-110 transition-transform duration-300 md:w-12 md:h-12" 
                  />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-lawyer-gold mb-3 md:mb-4">
                  {service.title}
                </h3>
                
                <p className="text-lawyer-silver leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            );
          }) : null}
        </div>
      </div>
    </section>
  );
};

export default Services;
