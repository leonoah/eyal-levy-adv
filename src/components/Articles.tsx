
import { Calendar, ArrowLeft } from 'lucide-react';

const Articles = () => {
  const articles = [
    {
      title: 'זכויות עובדים בישראל - מדריך מקיף',
      excerpt: 'הכירו את זכויותיכם כעובדים והבינו איך להגן עליהן. מדריך מפורט לזכויות עובדים בחוק העבודה הישראלי.',
      date: '15 במאי 2024',
      category: 'דיני עבודה'
    },
    {
      title: 'קניית דירה - מה חשוב לדעת לפני החתימה',
      excerpt: 'טיפים חשובים לקונים מתחילים ומנוסים. הכירו את החוזים, הבדיקות הנדרשות והמלכודות הנפוצות.',
      date: '8 במאי 2024',
      category: 'דיני נדל"ן'
    },
    {
      title: 'הליכי גירושין - מדריך שלב אחר שלב',
      excerpt: 'המדריך המלא להליכי גירושין בישראל. הכל על חלוקת רכוש, מזונות, משמורת ילדים והליכים משפטיים.',
      date: '1 במאי 2024',
      category: 'דיני משפחה'
    }
  ];

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
          {articles.map((article, index) => (
            <article key={index} className="lawyer-card group">
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

                <a 
                  href="#" 
                  className="flex items-center space-x-1 space-x-reverse text-lawyer-gold hover:text-lawyer-white transition-colors text-sm font-semibold"
                >
                  <span>למאמר המלא</span>
                  <ArrowLeft size={16} />
                </a>
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
