
import { useState, useEffect } from 'react';
import { SiteContent, defaultContent } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export const useAdminContent = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContentFromDB = async () => {
    try {
      setIsLoading(true);
      console.log('useAdminContent: Fetching content from database...');
      
      const { data, error } = await supabase
        .from('site_content')
        .select('section_name, content');

      if (error) {
        console.error('useAdminContent: Error fetching content:', error);
        setContent(defaultContent);
        return;
      }

      if (data && data.length > 0) {
        console.log('useAdminContent: Content data received:', data.length, 'sections');
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

        console.log('useAdminContent: Merged content:', mergedContent);
        setContent(mergedContent);
      } else {
        console.log('useAdminContent: No content data found, using defaults');
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('useAdminContent: Error fetching content:', error);
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContentFromDB();

    // מאזין לאירועי עדכון תוכן
    const handleContentUpdate = (event: any) => {
      console.log('useAdminContent: Content update event received:', event.type);
      // כפיית רענון מיידי
      setTimeout(() => {
        fetchContentFromDB();
      }, 50);
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

  const saveContent = async () => {
    try {
      console.log('Saving content to database...');
      
      // שמירת כל קטע בנפרד
      const sections = [
        { name: 'hero', data: content.hero },
        { name: 'about', data: content.about },
        { name: 'contact', data: content.contact },
        { name: 'achievements', data: content.achievements },
        { name: 'services', data: content.services },
        { name: 'articles', data: content.articles },
        { name: 'legalPages', data: content.legalPages }
      ];

      for (const section of sections) {
        const { error } = await supabase
          .from('site_content')
          .upsert({
            section_name: section.name,
            content: section.data,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'section_name'
          });

        if (error) {
          console.error(`Error saving ${section.name}:`, error);
          throw error;
        }
      }

      console.log('Content saved successfully to database');
      
      // שליחת אירוע עדכון
      window.dispatchEvent(new CustomEvent('contentUpdated', { detail: content }));
      
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  };

  const updateHero = (field: keyof SiteContent['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAbout = (field: keyof SiteContent['about'], value: string) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const updateContact = (field: keyof SiteContent['contact'], value: string) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const updateAchievements = (achievements: SiteContent['achievements']) => {
    setContent(prev => ({
      ...prev,
      achievements
    }));
  };

  const updateServices = (services: SiteContent['services']) => {
    setContent(prev => ({
      ...prev,
      services
    }));
  };

  const updateLegalPages = (legalPages: SiteContent['legalPages']) => {
    setContent(prev => ({
      ...prev,
      legalPages
    }));
  };

  const addArticle = (newArticle: { title: string; excerpt: string; date: string; category: string }) => {
    const article = {
      ...newArticle,
      id: Date.now().toString(),
      date: newArticle.date || new Date().toLocaleDateString('he-IL')
    };

    setContent(prev => ({
      ...prev,
      articles: [article, ...prev.articles]
    }));
  };

  const deleteArticle = (id: string) => {
    setContent(prev => ({
      ...prev,
      articles: prev.articles.filter(article => article.id !== id)
    }));
  };

  return {
    content,
    isLoading,
    saveContent,
    updateHero,
    updateAbout,
    updateContact,
    updateAchievements,
    updateServices,
    updateLegalPages,
    addArticle,
    deleteArticle
  };
};
