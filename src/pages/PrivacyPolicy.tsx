
import { useAdminContent } from '@/hooks/useAdminContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const { content } = useAdminContent();

  // Parse the content to convert line breaks and structure to HTML
  const parseContent = (text: string) => {
    // Split by double line breaks to create paragraphs
    const sections = text.split('\n\n');
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const firstLine = lines[0];
      
      // Check if this is a title (contains "מדיניות פרטיות")
      if (firstLine.includes('מדיניות פרטיות')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-lawyer-gold mb-6">
            {firstLine}
          </h2>
        );
      }
      
      // Check if this is a section header (ends with colon)
      if (firstLine.endsWith(':')) {
        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-lawyer-gold mb-3">
              {firstLine.replace(':', '')}
            </h3>
            {lines.slice(1).length > 0 && (
              <div className="space-y-2">
                {lines.slice(1).map((line, lineIndex) => {
                  if (line.startsWith('• ') || line.startsWith('- ')) {
                    return (
                      <div key={lineIndex} className="flex items-start space-x-2 space-x-reverse">
                        <span className="text-lawyer-gold mt-1">•</span>
                        <span>{line.replace(/^[•-]\s*/, '')}</span>
                      </div>
                    );
                  }
                  return line ? <p key={lineIndex}>{line}</p> : null;
                })}
              </div>
            )}
          </div>
        );
      }
      
      // Regular paragraph
      if (section.trim()) {
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {section}
          </p>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-lawyer-gold mb-8">
            {content.legalPages?.privacyPolicy?.title || 'מדיניות פרטיות'}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-lawyer-silver leading-relaxed">
              {content.legalPages?.privacyPolicy?.content ? 
                parseContent(content.legalPages.privacyPolicy.content) :
                'תוכן מדיניות הפרטיות יועלה בקרוב. אנא חזור מאוחר יותר.'
              }
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
