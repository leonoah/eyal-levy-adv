
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle } from 'lucide-react';
import { useContentManager } from '@/hooks/useContentManager';

const About = () => {
  const content = useContentManager();

  const iconMap = {
    Award,
    Clock, 
    Users,
    CheckCircle
  };

  return (
    <section id="about" className="section-spacing bg-lawyer-block">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
            {content.about.title}
          </h2>
          
          <p className="text-lg text-lawyer-white mb-6 leading-relaxed">
            {content.about.description1}
          </p>
          
          <p className="text-lg text-lawyer-silver mb-8 leading-relaxed">
            {content.about.description2}
          </p>

          {/* Achievements */}
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {content.achievements && content.achievements.length > 0 ? content.achievements.map((achievement, index) => {
              const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
              return (
                <div key={`achievement-${index}`} className="flex items-center space-x-3 space-x-reverse justify-center">
                  <IconComponent size={20} className="text-lawyer-gold flex-shrink-0" />
                  <span className="text-lawyer-silver text-sm">{achievement.text}</span>
                </div>
              );
            }) : null}
          </div>

          <Button className="lawyer-button-secondary">
            קראו עוד
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
