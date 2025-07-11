
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data via Resend:', formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      console.log('Form submitted successfully via Resend:', data);
      
      toast({
        title: "הודעה נשלחה בהצלחה!",
        description: "תודה שפניתם אלינו. נחזור אליכם בהקדם האפשרי.",
      });
      
      // איפוס הטופס
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "שגיאה בשליחת ההודעה",
        description: "אנא נסו שוב או צרו קשר טלפונית",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

        <Button 
          type="submit" 
          className="lawyer-button-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "שולח..." : "שליחת הודעה"}
        </Button>
      </form>
    </div>
  );
};
