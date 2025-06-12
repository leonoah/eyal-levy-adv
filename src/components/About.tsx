
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Award, text: 'יותר מ-15 שנות ניסיון' },
    { icon: Users, text: 'מאות לקוחות מרוצים' },
    { icon: CheckCircle, text: 'שיעור הצלחה גבוה' },
    { icon: Clock, text: 'זמינות 24/7' }
  ];

  return (
    <section id="about" className="section-spacing bg-lawyer-block">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="lg:order-2">
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-lg border-2 border-lawyer-gold bg-lawyer-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-lawyer-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-lawyer-black">א.ל</span>
                  </div>
                  <p className="text-lawyer-gold font-semibold">עו"ד אייל לוי</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
              אודות עו"ד אייל לוי
            </h2>
            
            <p className="text-lg text-lawyer-white mb-6 leading-relaxed">
              עו"ד אייל לוי הוא עורך דין מנוסה עם ניסיון רב שנים בתחומי הדין השונים. 
              הוא מתמחה במתן ייעוץ משפטי מקצועי ומסור, תוך הקפדה על שירות אישי ומותאם לכל לקוח.
            </p>
            
            <p className="text-lg text-lawyer-silver mb-8 leading-relaxed">
              המשרד מתמחה בדיני עבודה, נדל"ן, ליטיגציה ודיני משפחה. אנו גאים בשירות המקצועי 
              והאמין שאנו מעניקים ללקוחותינו ובשיעור ההצלחה הגבוה שלנו בתיקים השונים.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
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
      </div>
    </section>
  );
};

export default About;
