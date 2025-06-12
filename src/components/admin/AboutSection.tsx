
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SiteContent } from '@/types/admin';

interface AboutSectionProps {
  content: SiteContent;
  updateAbout: (field: keyof SiteContent['about'], value: string) => void;
}

export const AboutSection = ({ content, updateAbout }: AboutSectionProps) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateAbout('image', result);
        toast({
          title: "התמונה הועלתה בהצלחה",
          description: "התמונה נשמרה ותופיע בסקשן האודות"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת עמוד אודות</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="about-title" className="text-lawyer-white text-base font-medium mb-2 block">כותרת</Label>
          <Input
            id="about-title"
            value={content.about.title}
            onChange={(e) => updateAbout('title', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="about-desc1" className="text-lawyer-white text-base font-medium mb-2 block">פסקה ראשונה</Label>
          <Textarea
            id="about-desc1"
            value={content.about.description1}
            onChange={(e) => updateAbout('description1', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="about-desc2" className="text-lawyer-white text-base font-medium mb-2 block">פסקה שנייה</Label>
          <Textarea
            id="about-desc2"
            value={content.about.description2}
            onChange={(e) => updateAbout('description2', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            rows={4}
          />
        </div>
        <div>
          <Label className="text-lawyer-white text-base font-medium mb-2 block">תמונה אישית</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => document.getElementById('image-upload')?.click()}
                className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold"
              >
                <Upload className="ml-2" size={20} />
                העלאת תמונה
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {content.about.image && (
                <span className="text-lawyer-silver text-sm">תמונה הועלתה בהצלחה</span>
              )}
            </div>
            {content.about.image && (
              <div>
                <p className="text-lawyer-silver text-sm mb-2">תצוגה מקדימה:</p>
                <img 
                  src={content.about.image} 
                  alt="תצוגה מקדימה" 
                  className="w-32 h-32 object-cover rounded border border-lawyer-gold"
                />
                <Button 
                  onClick={() => updateAbout('image', '')}
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                >
                  הסרת תמונה
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
