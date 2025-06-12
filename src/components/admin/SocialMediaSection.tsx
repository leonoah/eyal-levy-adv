
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Facebook, Linkedin, Instagram } from 'lucide-react';
import { SocialLink } from '@/types/admin';

interface SocialMediaSectionProps {
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  updateSocialLink: (platform: string, url: string) => void;
}

export const SocialMediaSection = ({ socialLinks, setSocialLinks, updateSocialLink }: SocialMediaSectionProps) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return 'פייסבוק';
      case 'linkedin':
        return 'לינקדין';
      case 'instagram':
        return 'אינסטגרם';
      default:
        return platform;
    }
  };

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת קישורי מדיה חברתית</h2>
      <div className="space-y-6">
        {socialLinks.map((link) => (
          <div key={link.platform} className="space-y-2">
            <Label className="text-lawyer-white text-base font-medium mb-2 block flex items-center gap-2">
              {getSocialIcon(link.platform)}
              {getPlatformName(link.platform)}
            </Label>
            <div className="flex gap-2">
              <Input
                value={link.url}
                onChange={(e) => {
                  const newUrl = e.target.value;
                  setSocialLinks(prev => 
                    prev.map(item => 
                      item.platform === link.platform 
                        ? { ...item, url: newUrl }
                        : item
                    )
                  );
                }}
                className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                placeholder="הכניסו קישור..."
              />
              <Button
                onClick={() => updateSocialLink(link.platform, link.url)}
                className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 font-semibold"
              >
                <Save className="ml-2" size={16} />
                שמירה
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
