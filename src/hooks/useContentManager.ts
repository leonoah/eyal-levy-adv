
import { useState, useEffect } from 'react';
import { SiteContent, defaultContent } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export const useContentManager = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContentFromDB = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('section_name, content');

      if (error) {
        console.error('Error fetching content:', error);
        return defaultContent;
      }

      if (data && data.length > 0) {
        const contentData: any = {};
        
        data.forEach((section) => {
          contentData[section.section_name] = section.content;
        });

        // וודא שכל המפתחות הנדרשים קיימים
        const mergedContent: SiteContent = {
          hero: contentData.hero || defaultContent.hero,
          about: contentData.about || defaultContent.about,
          contact: {
            ...defaultContent.contact,
            ...contentData.contact
          },
          achievements: contentData.achievements || defaultContent.achievements,
          services: contentData.services || defaultContent.services,
          articles: contentData.articles || defaultContent.articles,
          legalPages: contentData.legalPages || defaultContent.legalPages
        };

        setContent(mergedContent);
        return mergedContent;
      } else {
        setContent(defaultContent);
        return defaultContent;
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent(defaultContent);
      return defaultContent;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContentFromDB();

    // מאזין לאירועי עדכון תוכן
    const handleContentUpdate = (event: any) => {
      console.log('Content update event received:', event.type);
      fetchContentFromDB();
    };

    // האזנה לאירועים שונים שעלולים להדליק על עדכון
    window.addEventListener('contentUpdated', handleContentUpdate);
    window.addEventListener('refreshAll', handleContentUpdate);
    window.addEventListener('storage', handleContentUpdate);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
      window.removeEventListener('refreshAll', handleContentUpdate);
      window.removeEventListener('storage', handleContentUpdate);
    };
  }, []);

  return content;
};
