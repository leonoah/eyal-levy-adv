
import { useAdminContent } from '@/hooks/useAdminContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AccessibilityStatement = () => {
  const { content } = useAdminContent();

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-8">
            {content.legalPages?.accessibilityStatement?.title || 'הצהרת נגישות'}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-lawyer-silver leading-relaxed whitespace-pre-wrap">
              {content.legalPages?.accessibilityStatement?.content || 
                'תוכן הצהרת הנגישות יועלה בקרוב. אנא חזור מאוחר יותר.'}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccessibilityStatement;
