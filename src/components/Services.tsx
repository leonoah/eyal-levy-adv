
import { Scale, Home, FileText, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Scale,
      title: 'דיני עבודה',
      description: 'ייצוג עובדים ומעסיקים, הסכמי עבודה, פיטורים ותביעות עבודה'
    },
    {
      icon: Home,
      title: 'דיני נדל"ן',
      description: 'עסקאות קנייה ומכירה, חוזי שכירות, יעוץ במקרקעין והסכמי בנייה'
    },
    {
      icon: FileText,
      title: 'ליטיגציה',
      description: 'ייצוג בבתי משפט, הגשת תביעות אזרחיות וטיפול בסכסוכים משפטיים'
    },
    {
      icon: Users,
      title: 'דיני משפחה',
      description: 'גירושין, הסכמי מזונות, משמורת ילדים וחלוקת רכוש משותף'
    }
  ];

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
          {services.map((service, index) => (
            <div key={index} className="lawyer-card text-center group">
              <div className="mb-6">
                <service.icon 
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
