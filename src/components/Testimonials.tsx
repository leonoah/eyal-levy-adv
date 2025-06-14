
import { Star, Shield, Award, Users } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useEffect, useState } from 'react';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();
  const [activeTestimonials, setActiveTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (testimonials.length > 0) {
      setActiveTestimonials(testimonials.filter(t => t.is_active));
    }
  }, [testimonials]);

  const trustBadges = [
    { icon: Shield, text: "לשכת עורכי הדין" },
    { icon: Award, text: "15+ שנות ניסיון" },
    { icon: Users, text: "500+ לקוחות מרוצים" },
    { icon: Star, text: "דירוג 5 כוכבים" }
  ];

  if (isLoading) {
    return (
      <section className="section-spacing bg-lawyer-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
              המלצות לקוחות
            </h2>
            <p className="text-xl text-lawyer-silver max-w-2xl mx-auto elegant-text">
              טוען המלצות...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-lawyer-charcoal">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
            המלצות לקוחות
          </h2>
          <p className="text-xl text-lawyer-silver max-w-2xl mx-auto elegant-text">
            לקוחותינו מעידים על השירות המקצועי והמסור שלנו
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {activeTestimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-lawyer-gold fill-current" />
                ))}
              </div>
              
              <p className="text-lawyer-white mb-6 elegant-text leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-lawyer-divider pt-4">
                <p className="font-semibold text-lawyer-white">{testimonial.name}</p>
                {testimonial.image_url && (
                  <img 
                    src={testimonial.image_url} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {trustBadges.map((badge, index) => (
            <div key={index} className="trust-badge">
              <badge.icon size={20} className="legal-icon" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
