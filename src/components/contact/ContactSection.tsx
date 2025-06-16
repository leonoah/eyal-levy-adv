
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

export const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing bg-lawyer-block">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
            יצירת קשר
          </h2>
          <p className="text-xl text-lawyer-silver max-w-2xl mx-auto">
            נשמח לעמוד לשירותכם ולסייע בכל נושא משפטי. צרו קשר עכשיו לקביעת פגישת ייעוץ
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};
