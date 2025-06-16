
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useAdminContent } from '@/hooks/useAdminContent';

export const ContactInfo = () => {
  const { content } = useAdminContent();

  const contactInfo = [
    { icon: Phone, text: content.contact.phone, label: 'טלפון' },
    { icon: Mail, text: content.contact.email, label: 'אימייל' },
    { icon: MapPin, text: content.contact.address, label: 'כתובת' },
    { icon: Clock, text: 'א-ה: 9:00-18:00', label: 'שעות פעילות' }
  ];

  return (
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
  );
};
