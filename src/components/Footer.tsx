
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useContentManager } from '@/hooks/useContentManager';

const Footer = () => {
  const content = useContentManager();

  const quickLinks = [
    { href: '#home', label: 'דף הבית' },
    { href: '#about', label: 'אודות' },
    { href: '#services', label: 'תחומי התמחות' },
    { href: '#articles', label: 'מאמרים' },
    { href: '#contact', label: 'יצירת קשר' },
  ];

  const legalLinks = [
    { href: '#', label: 'מדיניות פרטיות' },
    { href: '#', label: 'תנאי שימוש' },
    { href: '#', label: 'הצהרת נגישות' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-lawyer-black border-t border-lawyer-divider">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-lawyer-gold mb-4">
              עו"ד אייל לוי
            </h3>
            <p className="text-lawyer-silver mb-6 leading-relaxed">
              משרד עורכי דין מקצועי המתמחה בדיני עבודה, נדל"ן, ליטיגציה ודיני משפחה. 
              אנו מעניקים שירות אישי ומקצועי לכל לקוח.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone size={18} className="text-lawyer-gold" />
                <span className="text-lawyer-white">{content.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail size={18} className="text-lawyer-gold" />
                <span className="text-lawyer-white">{content.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin size={18} className="text-lawyer-gold" />
                <span className="text-lawyer-white">{content.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-lawyer-gold mb-4">
              קישורים מהירים
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-lawyer-silver hover:text-lawyer-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-bold text-lawyer-gold mb-4">
              מידע משפטי
            </h4>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-lawyer-silver hover:text-lawyer-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-lawyer-gold font-semibold mb-3">עקבו אחרינו</h5>
              <div className="flex space-x-3 space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-lawyer-divider rounded-lg flex items-center justify-center text-lawyer-silver hover:bg-lawyer-gold hover:text-lawyer-black transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-lawyer-divider mt-8 pt-8 text-center">
          <p className="text-lawyer-silver">
            © 2024 עו"ד אייל לוי. כל הזכויות שמורות.
          </p>
          <p className="text-lawyer-gold text-sm mt-2">
            האתר נבנה על ידי Lovable
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
