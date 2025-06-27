
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteContent, defaultContent } from '@/types/admin';

const Articles = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    fetchContentFromDB();
    
    // Listen for content updates from admin
    const handleContentUpdate = (event: CustomEvent) => {
      console.log('Articles: Content updated from admin', event.detail);
      setContent(event.detail);
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  const fetchContentFromDB = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('section_name, content')
        .eq('section_name', 'articles');

      if (error) {
        console.error('Error fetching articles content:', error);
        return;
      }

      if (data && data.length > 0) {
        const articlesData = data[0].content;
        console.log('Raw articles data from DB:', articlesData);
        
        // Ensure articlesData is an array and has the correct structure
        let validArticles: SiteContent['articles'] = [];
        
        if (Array.isArray(articlesData)) {
          validArticles = articlesData.filter((article: any) => 
            article && 
            typeof article === 'object' && 
            'id' in article && 
            'title' in article &&
            'excerpt' in article &&
            'date' in article &&
            'category' in article
          ) as SiteContent['articles'];
        }

        setContent(prev => ({
          ...prev,
          articles: validArticles.length > 0 ? validArticles : defaultContent.articles
        }));
      }
    } catch (error) {
      console.error('Error fetching articles content:', error);
    }
  };

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };

  const truncateText = (text: string, maxLines: number = 10) => {
    const words = text.split(' ');
    // Approximate 8-10 words per line for Hebrew text
    const maxWords = maxLines * 8;
    
    if (words.length <= maxWords) {
      return { text, isTruncated: false };
    }
    
    return {
      text: words.slice(0, maxWords).join(' ') + '...',
      isTruncated: true
    };
  };

  const openArticleInNewWindow = (article: any) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${article.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .article-header {
              background: linear-gradient(135deg, #D4AF37, #B8941F);
              color: white;
              padding: 30px;
              border-radius: 10px;
              margin-bottom: 30px;
              text-align: center;
            }
            .article-title {
              font-size: 2.5em;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .article-meta {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin-bottom: 15px;
            }
            .article-category {
              background: rgba(255,255,255,0.2);
              padding: 5px 15px;
              border-radius: 20px;
              font-size: 0.9em;
            }
            .article-content {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              font-size: 1.1em;
              line-height: 1.8;
            }
            .article-excerpt {
              font-size: 1.2em;
              color: #666;
              margin-bottom: 30px;
              padding: 20px;
              background: #f0f0f0;
              border-radius: 8px;
              border-right: 4px solid #D4AF37;
            }
          </style>
        </head>
        <body>
          <div class="article-header">
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
              <span>${article.date}</span>
              <span class="article-category">${article.category}</span>
            </div>
          </div>
          
          <div class="article-content">
            <div class="article-excerpt">
              ${article.excerpt}
            </div>
            
            <div>
              <p>זהו התוכן המלא של המאמר. כאן ניתן להציג את המידע המפורט, הסברים משפטיים מעמיקים, דוגמאות רלוונטיות ומידע נוסף שיעזור לקוראים להבין את הנושא בצורה מקיפה.</p>
              
              <p>המאמר יכול לכלול מספר פסקאות עם מידע מקצועי, הפניות לחוקים רלוונטיים, הסברים על תהליכים משפטיים ועצות מעשיות ללקוחות.</p>
              
              <p>בנוסף, ניתן להוסיף דוגמאות מעשיות, מקרי בוחן, וטיפים חשובים שיעזרו לקוראים להבין את הנושא ביתר עומק.</p>
              
              <p>לסיום, חשוב לזכור שמידע זה הוא לצרכי הדרכה בלבד ואינו מהווה ייעוץ משפטי. לקבלת ייעוץ מותאם אישית, מומלץ לפנות למשרד עורכי דין מקצועי.</p>
            </div>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <section id="articles" className="section-spacing bg-lawyer-black">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lawyer-gold mb-4 md:mb-6">
            מאמרים ועדכונים
          </h2>
          <p className="text-lg md:text-xl text-lawyer-silver max-w-2xl mx-auto">
            עדכונים משפטיים, מדריכים וטיפים שימושיים בתחומי הדין השונים
          </p>
        </div>

        {/* Articles grid - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {content.articles.map((article, index) => {
            const { text: truncatedExcerpt, isTruncated } = truncateText(article.excerpt);
            
            return (
              <article key={article.id} className="lawyer-card group">
                {/* Category badge */}
                <div className="mb-3 md:mb-4">
                  <span className="inline-block bg-lawyer-gold text-lawyer-black px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                    {article.category}
                  </span>
                </div>

                {/* Article title */}
                <h3 className="text-lg md:text-xl font-bold text-lawyer-gold mb-2 md:mb-3 group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h3>

                {/* Article excerpt - truncated */}
                <div className="text-lawyer-silver mb-3 md:mb-4 leading-relaxed">
                  <p className="mb-2 text-sm md:text-base">{truncatedExcerpt}</p>
                </div>

                {/* Article meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-lawyer-silver text-xs md:text-sm">
                    <Calendar size={14} className="md:w-4 md:h-4" />
                    <span>{article.date}</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        onClick={() => handleArticleClick(article)}
                        className="flex items-center space-x-1 space-x-reverse text-lawyer-gold hover:text-lawyer-white transition-colors text-xs md:text-sm font-semibold"
                      >
                        <span>למאמר המלא</span>
                        <ArrowLeft size={14} className="md:w-4 md:h-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-lawyer-black border border-lawyer-gold mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl font-bold text-lawyer-gold text-right">
                          {selectedArticle?.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-right">
                        <div className="flex items-center justify-end space-x-4 space-x-reverse text-lawyer-silver text-sm">
                          <span>{selectedArticle?.date}</span>
                          <span className="bg-lawyer-gold text-lawyer-black px-2 py-1 rounded text-xs">
                            {selectedArticle?.category}
                          </span>
                        </div>
                        <div className="prose prose-invert max-w-none text-lawyer-white text-right">
                          <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                            {selectedArticle?.excerpt}
                          </p>
                          <div className="space-y-4 text-sm md:text-base leading-relaxed">
                            <p>
                              זהו התוכן המלא של המאמר. כאן ניתן להציג את המידע המפורט, 
                              הסברים משפטיים מעמיקים, דוגמאות רלוונטיות ומידע נוסף שיעזור 
                              לקוראים להבין את הנושא בצורה מקיפה.
                            </p>
                            <p>
                              המאמר יכול לכלול מספר פסקאות עם מידע מקצועי, הפניות לחוקים 
                              רלוונטיים, הסברים על תהליכים משפטיים ועצות מעשיות ללקוחות.
                            </p>
                            <p>
                              לסיום, חשוב לזכור שמידע זה הוא לצרכי הדרכה בלבד ואינו מהווה 
                              ייעוץ משפטי. לקבלת ייעוץ מותאם אישית, מומלץ לפנות למשרד עורכי דין.
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all button */}
        <div className="text-center mt-8 md:mt-12">
          <a 
            href="#" 
            className="inline-block lawyer-button-secondary text-sm md:text-base px-6 md:px-8 py-2 md:py-3"
          >
            צפייה בכל המאמרים
          </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
