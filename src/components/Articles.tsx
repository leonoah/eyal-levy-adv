
import { Calendar, ArrowLeft } from 'lucide-react';
import { useContentManager } from '@/hooks/useContentManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const Articles = () => {
  const content = useContentManager();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
  };

  return (
    <section id="articles" className="section-spacing bg-lawyer-black">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-6">
            מאמרים ועדכונים
          </h2>
          <p className="text-xl text-lawyer-silver max-w-2xl mx-auto">
            עדכונים משפטיים, מדריכים וטיפים שימושיים בתחומי הדין השונים
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.articles.map((article, index) => (
            <article key={article.id} className="lawyer-card group">
              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-block bg-lawyer-gold text-lawyer-black px-3 py-1 rounded-full text-sm font-semibold">
                  {article.category}
                </span>
              </div>

              {/* Article title */}
              <h3 className="text-xl font-bold text-lawyer-gold mb-3 group-hover:text-yellow-400 transition-colors">
                {article.title}
              </h3>

              {/* Article excerpt */}
              <p className="text-lawyer-silver mb-4 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Article meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse text-lawyer-silver text-sm">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      onClick={() => handleArticleClick(article)}
                      className="flex items-center space-x-1 space-x-reverse text-lawyer-gold hover:text-lawyer-white transition-colors text-sm font-semibold"
                    >
                      <span>למאמר המלא</span>
                      <ArrowLeft size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-lawyer-black border border-lawyer-gold">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-lawyer-gold text-right">
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
                        <p className="text-lg leading-relaxed mb-6">
                          {selectedArticle?.excerpt}
                        </p>
                        <div className="space-y-4 text-base leading-relaxed">
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
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block lawyer-button-secondary"
          >
            צפייה בכל המאמרים
          </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
