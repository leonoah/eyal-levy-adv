import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useSocialLinks } from '@/hooks/useSocialLinks';
import { HeroSection } from '@/components/admin/HeroSection';
import { AboutSection } from '@/components/admin/AboutSection';
import { ArticlesSection } from '@/components/admin/ArticlesSection';
import { ContactSection } from '@/components/admin/ContactSection';
import { SocialMediaSection } from '@/components/admin/SocialMediaSection';
import { AchievementsSection } from '@/components/admin/AchievementsSection';

const Admin = () => {
  const { toast } = useToast();
  const {
    content,
    saveContent,
    updateHero,
    updateAbout,
    updateContact,
    updateAchievements,
    addArticle,
    deleteArticle
  } = useAdminContent();
  
  const {
    socialLinks,
    setSocialLinks,
    updateSocialLink
  } = useSocialLinks();

  const handleSaveContent = () => {
    saveContent();
    toast({
      title: "התוכן נשמר בהצלחה",
      description: "השינויים יופיעו באתר אחרי רענון העמוד",
    });
  };

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-lawyer-gold">ניהול תוכן האתר</h1>
          <div className="flex gap-4">
            <Button 
              onClick={handleSaveContent}
              className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold"
            >
              <Save className="ml-2" size={20} />
              שמירת שינויים
            </Button>
            <Button 
              onClick={() => window.open('/', '_blank')}
              className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300 px-6 py-3 font-semibold"
            >
              <Eye className="ml-2" size={20} />
              צפייה באתר
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-lawyer-block border border-lawyer-divider">
            <TabsTrigger value="hero" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">עמוד ראשי</TabsTrigger>
            <TabsTrigger value="about" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">אודות</TabsTrigger>
            <TabsTrigger value="achievements" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">הישגים</TabsTrigger>
            <TabsTrigger value="articles" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מאמרים</TabsTrigger>
            <TabsTrigger value="contact" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">יצירת קשר</TabsTrigger>
            <TabsTrigger value="social" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מדיה חברתית</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroSection content={content} updateHero={updateHero} />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection content={content} updateAbout={updateAbout} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsSection content={content} updateAchievements={updateAchievements} />
          </TabsContent>

          <TabsContent value="articles">
            <ArticlesSection 
              content={content} 
              addArticle={addArticle} 
              deleteArticle={deleteArticle} 
            />
          </TabsContent>

          <TabsContent value="contact">
            <ContactSection content={content} updateContact={updateContact} />
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaSection 
              socialLinks={socialLinks} 
              setSocialLinks={setSocialLinks} 
              updateSocialLink={updateSocialLink} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
