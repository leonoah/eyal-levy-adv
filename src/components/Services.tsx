
import { Scale, Home, FileText, Users, Briefcase, Shield, Building } from 'lucide-react';
import { useAdminContent } from '@/hooks/useAdminContent';

const Services = () => {
  const { content } = useAdminContent();

  const iconMap = {
    Scale,
    Home,
    FileText,
    Users,
    Briefcase,
    Shield,
    Building
  };

  return (
    <section id="services" className="section-spacing bg-lawyer-black">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
            תחומי התמחות
          </h2>
          <p className="text-xl text-lawyer-silver max-w-2xl mx-auto">
            אנו מתמחים במגוון רחב של תחומי דין ומספקים שירות מקצועי ואמין
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.services && content.services.length > 0 ? content.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Scale;
            return (
              <div key={`service-${index}`} className="lawyer-card text-center group">
                <div className="mb-6">
                  <IconComponent 
                    size={48} 
                    className="text-lawyer-gold mx-auto group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                
                <h3 className="text-xl font-bold text-lawyer-gold mb-4">
                  {service.title}
                </h3>
                
                <p className="text-lawyer-silver leading-relaxed">
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
