
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SiteContent } from '@/types/admin';

interface HeroSectionProps {
  content: SiteContent;
  updateHero: (field: keyof SiteContent['hero'], value: string) => void;
}

export const HeroSection = ({ content, updateHero }: HeroSectionProps) => {
  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת עמוד ראשי</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="hero-title" className="text-lawyer-white text-base font-medium mb-2 block">כותרת ראשית</Label>
          <Input
            id="hero-title"
            value={content.hero.title}
            onChange={(e) => updateHero('title', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="hero-subtitle" className="text-lawyer-white text-base font-medium mb-2 block">כותרת משנה</Label>
          <Input
            id="hero-subtitle"
            value={content.hero.subtitle}
            onChange={(e) => updateHero('subtitle', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
          />
        </div>
        <div>
          <Label htmlFor="hero-description" className="text-lawyer-white text-base font-medium mb-2 block">תיאור</Label>
          <Textarea
            id="hero-description"
            value={content.hero.description}
            onChange={(e) => updateHero('description', e.target.value)}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            rows={4}
          />
        </div>
      </div>
    </Card>
  );
};
