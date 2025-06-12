
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle } from 'lucide-react';
import { useContentManager } from '@/hooks/useContentManager';

const About = () => {
  const content = useContentManager();

  const achievements = [
    { icon: Award, text: 'יותר מ-15 שנות ניסיון' },
    { icon: Users, text: 'מאות לקוחות מרוצים' },
    { icon: CheckCircle, text: 'שיעור הצלחה גבוה' },
    { icon: Clock, text: 'זמינות 24/7' }
  ];

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
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 space-x-reverse justify-center">
                <achievement.icon size={20} className="text-lawyer-gold flex-shrink-0" />
                <span className="text-lawyer-silver text-sm">{achievement.text}</span>
              </div>
            ))}
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
