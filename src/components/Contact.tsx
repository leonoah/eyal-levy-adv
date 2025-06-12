import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useContentManager } from '@/hooks/useContentManager';

const Contact = () => {
  const content = useContentManager();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    { icon: Phone, text: content.contact.phone, label: 'טלפון' },
    { icon: Mail, text: content.contact.email, label: 'אימייל' },
    { icon: MapPin, text: content.contact.address, label: 'כתובת' },
    { icon: Clock, text: 'א-ה: 9:00-18:00', label: 'שעות פעילות' }
  ];

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
          <div>
            <h3 className="text-2xl font-bold text-lawyer-gold mb-6">
              שלחו לנו הודעה
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lawyer-white mb-2 font-medium">
                  שם מלא *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="lawyer-input"
                  placeholder="הכניסו את שמכם המלא"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lawyer-white mb-2 font-medium">
                  טלפון *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="lawyer-input"
                  placeholder="הכניסו את מספר הטלפון"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lawyer-white mb-2 font-medium">
                  אימייל *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="lawyer-input"
                  placeholder="הכניסו את כתובת האימייל"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lawyer-white mb-2 font-medium">
                  הודעה *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="lawyer-input min-h-32"
                  placeholder="פרטו את הנושא שלשמו אתם פונים"
                />
                <p className="text-lawyer-silver text-sm mt-2">
                  אנא פרטו את הנושא שלשמו אתם פונים כדי שנוכל להכין את עצמנו לפגישה
                </p>
              </div>

              <Button type="submit" className="lawyer-button-primary w-full">
                שליחת הודעה
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-lawyer-gold mb-6">
              פרטי קשר
            </h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-lawyer-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} className="text-lawyer-black" />
                  </div>
                  <div>
                    <p className="text-lawyer-white font-medium">{info.label}</p>
                    <p className="text-lawyer-silver">{info.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-8 p-6 border border-lawyer-divider rounded-lg">
              <h4 className="text-lg font-bold text-lawyer-gold mb-3">
                פגישת ייעוץ ללא התחייבות
              </h4>
              <p className="text-lawyer-silver mb-4">
                הפגישה הראשונה כוללת ייעוץ ראשוני והערכת המקרה ללא עלות נוספת
              </p>
              <p className="text-lawyer-white font-semibold">
                התקשרו עכשיו לקביעת תור: {content.contact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
