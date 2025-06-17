
import { useAdminContent } from '@/hooks/useAdminContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  const { content } = useAdminContent();

  const formatContent = (text: string) => {
    if (!text) return '';
    
    return text
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim() === '') return '';
        
        // אם הפסקה מתחילה במילה בעברית ואחריה רווח, זה כנראה כותרת
        if (paragraph.match(/^[א-ת]+[\s]/)) {
          return `<h2 class="text-2xl font-bold text-lawyer-gold mb-4 mt-8">${paragraph.trim()}</h2>`;
        }
        
        // אם הפסקה מכילה נקודות רשימה (•)
        if (paragraph.includes('•')) {
          const items = paragraph.split('•').filter(item => item.trim());
          const listItems = items.map(item => `<li class="mb-2">${item.trim()}</li>`).join('');
          return `<ul class="list-disc list-inside mb-6 space-y-2">${listItems}</ul>`;
        }
        
        return `<p class="mb-4 leading-relaxed">${paragraph.trim()}</p>`;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-8">
            {content.legalPages?.termsOfService?.title || 'תנאי שימוש'}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-lawyer-silver leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatContent(content.legalPages?.termsOfService?.content || 
                  'תוכן תנאי השימוש יועלה בקרוב. אנא חזור מאוחר יותר.')
              }}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
