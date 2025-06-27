
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useEffect, useState } from 'react';
import AchievementsDisplay from '@/components/shared/AchievementsDisplay';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();
  const { content } = useAdminContent();
  const [activeTestimonials, setActiveTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (testimonials.length > 0) {
      setActiveTestimonials(testimonials.filter(t => t.is_active));
    }
  }, [testimonials]);

  if (isLoading) {
    return (
      <section className="section-spacing bg-lawyer-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold mb-4 md:mb-6">
              המלצות לקוחות
            </h2>
            <p className="text-lg md:text-xl text-lawyer-silver max-w-2xl mx-auto elegant-text">
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
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold mb-4 md:mb-6">
            המלצות לקוחות
          </h2>
          <p className="text-lg md:text-xl text-lawyer-silver max-w-2xl mx-auto elegant-text">
            לקוחותינו מעידים על השירות המקצועי והמסור שלנו
          </p>
        </div>

        {/* Testimonials Grid - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {activeTestimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-lawyer-gold fill-current md:w-5 md:h-5" />
                ))}
              </div>
              
              <p className="text-lawyer-white mb-4 md:mb-6 elegant-text leading-relaxed text-sm md:text-base">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-lawyer-divider pt-3 md:pt-4">
                <p className="font-semibold text-lawyer-white text-sm md:text-base">{testimonial.name}</p>
                {testimonial.image_url && (
                  <img 
                    src={testimonial.image_url} 
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges - now using achievements from admin content */}
        <AchievementsDisplay achievements={content.achievements} variant="testimonials" />
      </div>
    </section>
  );
};

export default Testimonials;
