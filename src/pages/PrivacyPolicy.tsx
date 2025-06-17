
import { useAdminContent } from '@/hooks/useAdminContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const { content } = useAdminContent();

  // Parse the content to convert line breaks and structure to proper display
  const parseContent = (text: string) => {
    // Split by double line breaks to create sections
    const sections = text.split('\n\n');
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const firstLine = lines[0].trim();
      
      // Skip empty sections
      if (!firstLine) return null;
      
      // Check if this is a main title (contains "מדיניות פרטיות")
      if (firstLine.includes('מדיניות פרטיות')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-lawyer-gold mb-6">
            {firstLine}
          </h2>
        );
      }
      
      // Check if this is a section header (ends with colon)
      if (firstLine.endsWith(':')) {
        const headerText = firstLine.replace(':', '');
        const remainingLines = lines.slice(1).filter(line => line.trim());
        
        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-lawyer-gold mb-3">
              {headerText}
            </h3>
            {remainingLines.length > 0 && (
              <div className="space-y-2">
                {remainingLines.map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;
                  
                  // Check if it's a bullet point
                  if (trimmedLine.startsWith('• ') || trimmedLine.startsWith('- ')) {
                    return (
                      <div key={lineIndex} className="flex items-start space-x-2 space-x-reverse">
                        <span className="text-lawyer-gold mt-1">•</span>
                        <span>{trimmedLine.replace(/^[•-]\s*/, '')}</span>
                      </div>
                    );
                  }
                  
                  // Regular line under a header
                  return (
                    <p key={lineIndex} className="mb-2">
                      {trimmedLine}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
      
      // Check if this is a single line that should be a paragraph
      if (lines.length === 1) {
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {firstLine}
          </p>
        );
      }
      
      // Multiple lines - treat as a paragraph with line breaks
      return (
        <div key={index} className="mb-4">
          {lines.map((line, lineIndex) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return null;
            
            return (
              <p key={lineIndex} className="mb-2 leading-relaxed">
                {trimmedLine}
              </p>
            );
          })}
        </div>
      );
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
