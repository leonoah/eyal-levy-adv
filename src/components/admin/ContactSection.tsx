
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SiteContent } from '@/types/admin';

interface ContactSectionProps {
  content: SiteContent;
  updateContact: (field: keyof SiteContent['contact'], value: string) => void;
}

export const ContactSection = ({ content, updateContact }: ContactSectionProps) => {
  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת פרטי יצירת קשר</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="contact-phone" className="text-lawyer-white text-base font-medium mb-2 block">טלפון</Label>
          <Input
            id="contact-phone"
            value={content.contact.phone}
            onChange={(e) => updateContact('phone', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="contact-email" className="text-lawyer-white text-base font-medium mb-2 block">אימייל</Label>
          <Input
            id="contact-email"
            value={content.contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="contact-address" className="text-lawyer-white text-base font-medium mb-2 block">כתובת</Label>
          <Input
            id="contact-address"
            value={content.contact.address}
            onChange={(e) => updateContact('address', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="contact-whatsapp" className="text-lawyer-white text-base font-medium mb-2 block">וואטסאפ</Label>
          <Input
            id="contact-whatsapp"
            value={content.contact.whatsapp || ''}
            onChange={(e) => updateContact('whatsapp', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            placeholder="972501234567"
          />
        </div>
        <div>
          <Label htmlFor="contact-whatsapp-message" className="text-lawyer-white text-base font-medium mb-2 block">הודעת וואטסאפ ברירת מחדל</Label>
          <Textarea
            id="contact-whatsapp-message"
            value={content.contact.whatsappMessage || ''}
            onChange={(e) => updateContact('whatsappMessage', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            rows={3}
            placeholder="שלום, אני מעוניין לקבל ייעוץ משפטי מעו&quot;ד אייל לוי"
          />
          <p className="text-sm text-lawyer-silver mt-2">
            הודעה זו תישלח אוטומטית כשמישהו לוחץ על כפתור הוואטסאפ באתר
          </p>
        </div>
      </div>
    </Card>
  );
};
