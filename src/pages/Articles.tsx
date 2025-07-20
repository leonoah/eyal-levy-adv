import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Home } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { SiteContent, defaultContent } from '@/types/admin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PROJECT_ID = 'eyal_levi_adv';

const ArticlesPage = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchContentFromDB();
    
    // Listen for content updates from admin
    const handleContentUpdate = (event: CustomEvent) => {
      console.log('Articles page: Content updated from admin', event.detail);
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
        .eq('section_name', 'articles')
        .eq('project_id', PROJECT_ID);

      if (error) {
        console.error('Error fetching articles content:', error);
        return;
      }

      if (data && data.length > 0) {
        const articlesData = data[0].content;
        
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

  // Get unique categories for filtering
  const categories = ['all', ...Array.from(new Set(content.articles.map(article => article.category)))];

  // Filter articles by category
  const filteredArticles = selectedCategory === 'all' 
    ? content.articles 
    : content.articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-lawyer-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-lawyer-gold to-yellow-600 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lawyer-black mb-4">
                מאמרים ועדכונים משפטיים
              </h1>
              <p className="text-lg md:text-xl text-lawyer-black/80 max-w-3xl mx-auto mb-8">
                מידע מקצועי, עדכונים חקיקתיים ומדריכים שימושיים בתחומי הדין השונים
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 space-x-reverse text-lawyer-black hover:text-lawyer-black/80 transition-colors"
              >
                <Home size={20} />
                <span>חזרה לעמוד הבית</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Articles Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-lawyer-gold mb-6 text-center">
                סינון לפי קטגוריה
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-lawyer-gold text-lawyer-black'
                        : 'bg-lawyer-block text-lawyer-white hover:bg-lawyer-gold hover:text-lawyer-black border border-lawyer-divider'
                    }`}
                  >
                    {category === 'all' ? 'כל הקטגוריות' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Count */}
            <div className="text-center mb-8">
              <p className="text-lawyer-silver">
                מציג {filteredArticles.length} מאמרים
                {selectedCategory !== 'all' && ` בקטגוריית "${selectedCategory}"`}
              </p>
            </div>

            {/* Articles as Rounded Rectangles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="bg-lawyer-block rounded-2xl p-6 border border-lawyer-divider hover:border-lawyer-gold transition-all duration-300 group hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-lawyer-gold text-lawyer-black px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold text-lawyer-gold mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Article Excerpt */}
                  <p className="text-lawyer-silver mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Date and Read More */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2 space-x-reverse text-lawyer-silver text-sm">
                      <Calendar size={16} />
                      <span>{article.date}</span>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <button 
                          onClick={() => handleArticleClick(article)}
                          className="flex items-center space-x-1 space-x-reverse text-lawyer-gold hover:text-lawyer-white transition-colors text-sm font-semibold group"
                        >
                          <span>קרא עוד</span>
                          <ArrowLeft size={16} className="group-hover:translate-x-1 transition-transform" />
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
                </div>
              ))}
            </div>

            {/* No Articles Message */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lawyer-silver text-lg">
                  לא נמצאו מאמרים בקטגוריה זו
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesPage;