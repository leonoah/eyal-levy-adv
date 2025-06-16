

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useAdminContent } from '@/hooks/useAdminContent';

export const ContactInfo = () => {
  const { content } = useAdminContent();

 // פונקציה ליצירת קישור WhatsApp תקני
const createWhatsAppLink = (phoneNumber: string, messageText?: string) => {
  // ניקוי המספר מכל תווים שאינם ספרות
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  console.log('Original phone number:', phoneNumber);
  console.log('Cleaned phone number:', cleanNumber);

  // פורמט המספר עם קידומת בינלאומית
  let formattedNumber = cleanNumber;
  
  // אם המספר מתחיל ב-0 (מספר ישראלי מקומי), נחליף ל-972
  if (cleanNumber.startsWith('0')) {
    formattedNumber = '972' + cleanNumber.substring(1);
  } 
  // אם המספר לא מתחיל ב-972 ולא ב-0, נוסיף 972
  else if (!cleanNumber.startsWith('972')) {
    formattedNumber = '972' + cleanNumber;
  }

  console.log('Formatted phone number:', formattedNumber);

  // הודעה ברירת מחדל או הודעה מותאמת
  const message = messageText || 'שלום, אשמח לקבל פרטים נוספים 🙏';
  console.log('Original message text:', message);
  
  const encodedMessage = encodeURIComponent(message);
  console.log('Encoded message text:', encodedMessage);

  // קישור תקני
  const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  console.log('Final WhatsApp link:', whatsappLink);
  
  return whatsappLink;
};

// אירוע לחיצה על כפתור וואטסאפ
const handleWhatsAppClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const link = createWhatsAppLink(content.contact.phone);
  console.log('פותח קישור וואטסאפ:', link);

  // פתיחה בלשונית חדשה בלי טעינת manifest
  window.open(link, '_blank', 'noopener,noreferrer');
};

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

      {/* כפתור WhatsApp מתוקן */}
      <div className="mt-8 p-6 border border-lawyer-divider rounded-lg">
        <h4 className="text-lg font-bold text-lawyer-gold mb-3">
          פגישת ייעוץ ללא התחייבות
        </h4>
        <p className="text-lawyer-silver mb-4">
          הפגישה הראשונה כוללת ייעוץ ראשוני והערכת המקרה ללא עלות נוספת
        </p>
        <p className="text-lawyer-white font-semibold mb-4">
          התקשרו עכשיו לקביעת תור: {content.contact.phone}
        </p>
        
        {/* כפתור WhatsApp מתוקן */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
          </svg>
          שלח הודעה בוואטסאפ
        </button>
      </div>
    </div>
  );
};

