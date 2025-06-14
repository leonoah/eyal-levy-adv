
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    image?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  achievements: Array<{
    icon: string;
    text: string;
  }>;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
  }>;
}

const defaultContent: SiteContent = {
  hero: {
    title: 'עו"ד אייל לוי',
    subtitle: 'משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה',
    description: 'ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים. אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.'
  },
  about: {
    title: 'אודות עו"ד אייל לוי',
    description1: 'עו"ד אייל לוי הוא עורך דין מנוסה עם ניסיון רב שנים בתחומי הדין השונים. הוא מתמחה במתן ייעוץ משפטי מקצועי ומסור, תוך הקפדה על שירות אישי ומותאם לכל לקוח.',
    description2: 'המשרד מתמחה בדיני עבודה, נדל"ן, ליטיגציה ודיני משפחה. אנו גאים בשירות המקצועי והאמין שאנו מעניקים ללקוחותינו ובשיעור ההצלחה הגבוה שלנו בתיקים השונים.',
    image: '/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png'
  },
  contact: {
    phone: '03-1234567',
    email: 'eyal@lawyer.co.il',
    address: 'תל אביב, ישראל'
  },
  achievements: [
    { icon: 'Award', text: 'יותר מ-15 שנות ניסיון' },
    { icon: 'Users', text: 'מאות לקוחות מרוצים' },
    { icon: 'CheckCircle', text: 'שיעור הצלחה גבוה' },
    { icon: 'Clock', text: 'זמינות 24/7' }
  ],
  services: [
    { icon: 'Scale', title: 'דיני עבודה', description: 'ייצוג עובדים ומעסיקים, הסכמי עבודה, פיטורים ותביעות עבודה' },
    { icon: 'Home', title: 'דיני נדל"ן', description: 'עסקאות קנייה ומכירה, חוזי שכירות, יעוץ במקרקעין והסכמי בנייה' },
    { icon: 'FileText', title: 'ליטיגציה', description: 'ייצוג בבתי משפט, הגשת תביעות אזרחיות וטיפול בסכסוכים משפטיים' },
    { icon: 'Users', title: 'דיני משפחה', description: 'גירושין, הסכמי מזונות, משמורת ילדים וחלוקת רכוש משותף' }
  ],
  articles: [
    {
      id: '1',
      title: 'זכויות עובדים בישראל - מדריך מקיף',
      excerpt: 'הכירו את זכויותיכם כעובדים והבינו איך להגן עליהן. מדריך מפורט לזכויות עובדים בחוק העבודה הישראלי.',
      date: '15 במאי 2024',
      category: 'דיני עבודה'
    },
    {
      id: '2',
      title: 'קניית דירה - מה חשוב לדעת לפני החתימה',
      excerpt: 'טיפים חשובים לקונים מתחילים ומנוסים. הכירו את החוזים, הבדיקות הנדרשות והמלכודות הנפוצות.',
      date: '8 במאי 2024',
      category: 'דיני נדל"ן'
    },
    {
      id: '3',
      title: 'הליכי גירושין - מדריך שלב אחר שלב',
      excerpt: 'המדריך המלא להליכי גירושין בישראל. הכל על חלוקת רכוש, מזונות, משמורת ילדים והליכים משפטיים.',
      date: '1 במאי 2024',
      category: 'דיני משפחה'
    }
  ]
};

export const useContentManager = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContentFromDB();
  }, []);

  const fetchContentFromDB = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('section_name, content');

      if (error) {
        console.error('Error fetching content:', error);
        setContent(defaultContent);
        return;
      }

      if (data && data.length > 0) {
        const contentData: any = {};
        
        data.forEach((section) => {
          contentData[section.section_name] = section.content;
        });

        // וודא שכל המפתחות הנדרשים קיימים
        const mergedContent = {
          hero: contentData.hero || defaultContent.hero,
          about: contentData.about || defaultContent.about,
          contact: contentData.contact || defaultContent.contact,
          achievements: contentData.achievements || defaultContent.achievements,
          services: contentData.services || defaultContent.services,
          articles: contentData.articles || defaultContent.articles
        };

        setContent(mergedContent);
      } else {
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  // האזנה לשינויים בזמן אמת
  useEffect(() => {
    const handleContentUpdate = (event: CustomEvent) => {
      fetchContentFromDB();
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  if (isLoading) {
    return defaultContent;
  }

  return content;
};
