
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SocialLink } from '@/types/admin';

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const { toast } = useToast();

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('platform');
      
      if (error) throw error;
      setSocialLinks(data || []);
    } catch (error) {
      console.error('Error fetching social links:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את קישורי המדיה החברתית",
        variant: "destructive"
      });
    }
  };

  const updateSocialLink = async (platform: string, url: string) => {
    try {
      const { error } = await supabase
        .from('social_links')
        .update({ url, updated_at: new Date().toISOString() })
        .eq('platform', platform);
      
      if (error) throw error;
      
      await fetchSocialLinks();
      toast({
        title: "קישור עודכן בהצלחה",
        description: `קישור ${platform} נשמר`
      });
    } catch (error) {
      console.error('Error updating social link:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לעדכן את הקישור",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return {
    socialLinks,
    setSocialLinks,
    updateSocialLink,
    fetchSocialLinks
  };
};
