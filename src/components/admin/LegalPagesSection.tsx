
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SiteContent } from '@/types/admin';

interface LegalPagesSectionProps {
  content: SiteContent;
  updateLegalPages: (legalPages: SiteContent['legalPages']) => void;
}

const LegalPagesSection = ({ content, updateLegalPages }: LegalPagesSectionProps) => {
  const handlePageUpdate = (
    page: 'privacyPolicy' | 'termsOfService' | 'accessibilityStatement',
    field: 'title' | 'content',
    value: string
  ) => {
    const updatedLegalPages = {
      ...content.legalPages,
      [page]: {
        ...content.legalPages?.[page],
        [field]: value
      }
    };
    updateLegalPages(updatedLegalPages);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-lawyer-gold mb-4">ניהול עמודי מידע משפטי</h2>
        <p className="text-lawyer-silver">ערוך את תוכן עמודי המידע המשפטי של האתר</p>
      </div>

      {/* Privacy Policy */}
      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold">מדיניות פרטיות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="privacy-title" className="text-lawyer-white">כותרת העמוד</Label>
            <Input
              id="privacy-title"
              value={content.legalPages?.privacyPolicy?.title || ''}
              onChange={(e) => handlePageUpdate('privacyPolicy', 'title', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white"
              placeholder="כותרת עמוד מדיניות הפרטיות"
            />
          </div>
          <div>
            <Label htmlFor="privacy-content" className="text-lawyer-white">תוכן העמוד (HTML מותר)</Label>
            <Textarea
              id="privacy-content"
              value={content.legalPages?.privacyPolicy?.content || ''}
              onChange={(e) => handlePageUpdate('privacyPolicy', 'content', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white min-h-[300px]"
              placeholder="תוכן מדיניות הפרטיות..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms of Service */}
      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold">תנאי שימוש</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="terms-title" className="text-lawyer-white">כותרת העמוד</Label>
            <Input
              id="terms-title"
              value={content.legalPages?.termsOfService?.title || ''}
              onChange={(e) => handlePageUpdate('termsOfService', 'title', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white"
              placeholder="כותרת עמוד תנאי השימוש"
            />
          </div>
          <div>
            <Label htmlFor="terms-content" className="text-lawyer-white">תוכן העמוד (HTML מותר)</Label>
            <Textarea
              id="terms-content"
              value={content.legalPages?.termsOfService?.content || ''}
              onChange={(e) => handlePageUpdate('termsOfService', 'content', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white min-h-[300px]"
              placeholder="תוכן תנאי השימוש..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Statement */}
      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold">הצהרת נגישות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="accessibility-title" className="text-lawyer-white">כותרת העמוד</Label>
            <Input
              id="accessibility-title"
              value={content.legalPages?.accessibilityStatement?.title || ''}
              onChange={(e) => handlePageUpdate('accessibilityStatement', 'title', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white"
              placeholder="כותרת עמוד הצהרת הנגישות"
            />
          </div>
          <div>
            <Label htmlFor="accessibility-content" className="text-lawyer-white">תוכן העמוד (HTML מותר)</Label>
            <Textarea
              id="accessibility-content"
              value={content.legalPages?.accessibilityStatement?.content || ''}
              onChange={(e) => handlePageUpdate('accessibilityStatement', 'content', e.target.value)}
              className="bg-lawyer-charcoal border-lawyer-divider text-lawyer-white min-h-[300px]"
              placeholder="תוכן הצהרת הנגישות..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalPagesSection;
