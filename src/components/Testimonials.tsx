
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useEffect, useState, useRef } from 'react';
import AchievementsDisplay from '@/components/shared/AchievementsDisplay';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();
  const { content } = useAdminContent();
  const [activeTestimonials, setActiveTestimonials] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testimonials.length > 0) {
      setActiveTestimonials(testimonials.filter(t => t.is_active));
    }
  }, [testimonials]);

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
    <section 
      ref={sectionRef}
      className={`section-spacing bg-lawyer-charcoal transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-lawyer-gold mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            המלצות לקוחות
          </h2>
          <p className={`text-xl text-lawyer-silver max-w-2xl mx-auto elegant-text transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            לקוחותינו מעידים על השירות המקצועי והמסור שלנו
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {activeTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`testimonial-card transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
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

        {/* Trust Badges - now using achievements from admin content */}
        <div className={`transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <AchievementsDisplay achievements={content.achievements} variant="testimonials" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
