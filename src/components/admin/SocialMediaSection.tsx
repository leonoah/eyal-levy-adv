
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLink } from '@/types/admin';

interface SocialMediaSectionProps {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  updateSocialLink: (platform: string, url: string) => Promise<void>;
}

export const SocialMediaSection = ({ 
  socialLinks, 
  setSocialLinks, 
  updateSocialLink 
}: SocialMediaSectionProps) => {
  const handleUrlChange = (platform: string, url: string) => {
    setSocialLinks(prev => 
      prev.map(link => 
        link.platform === platform 
          ? { ...link, url } 
          : link
      )
    );
  };

  const handleSave = async (platform: string, url: string) => {
    await updateSocialLink(platform, url);
  };

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת קישורי מדיה חברתית</h2>
      <div className="space-y-6">
        {socialLinks.map((link) => (
          <div key={link.id}>
            <Label htmlFor={`social-${link.platform}`} className="text-lawyer-white text-base font-medium mb-2 block capitalize">
              {link.platform === 'facebook' ? 'פייסבוק' : 
               link.platform === 'linkedin' ? 'לינקדין' : 
               link.platform === 'instagram' ? 'אינסטגרם' : link.platform}
            </Label>
            <div className="flex gap-2">
              <Input
                id={`social-${link.platform}`}
                value={link.url}
                onChange={(e) => handleUrlChange(link.platform, e.target.value)}
                className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                placeholder={`קישור ל${link.platform === 'facebook' ? 'פייסבוק' : 
                           link.platform === 'linkedin' ? 'לינקדין' : 
                           link.platform === 'instagram' ? 'אינסטגרם' : link.platform}`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
