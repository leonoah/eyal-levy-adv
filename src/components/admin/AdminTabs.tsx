
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSection } from '@/components/admin/HeroSection';
import { AboutSection } from '@/components/admin/AboutSection';
import { ArticlesSection } from '@/components/admin/ArticlesSection';
import { ContactSection } from '@/components/admin/ContactSection';
import { SocialMediaSection } from '@/components/admin/SocialMediaSection';
import { AchievementsSection } from '@/components/admin/AchievementsSection';
import { ServicesSection } from '@/components/admin/ServicesSection';
import LegalPagesSection from '@/components/admin/LegalPagesSection';
import ThemeSettingsSection from '@/components/admin/ThemeSettingsSection';
import TestimonialsSection from '@/components/admin/TestimonialsSection';
import BackupSection from '@/components/admin/BackupSection';
import PasswordChangeSection from '@/components/admin/PasswordChangeSection';
import { SiteContent, SocialLink } from '@/types/admin';

interface AdminTabsProps {
  content: SiteContent;
  socialLinks: SocialLink[];
  updateHero: (field: keyof SiteContent['hero'], value: string) => void;
  updateAbout: (field: keyof SiteContent['about'], value: string) => void;
  updateContact: (field: keyof SiteContent['contact'], value: string) => void;
  updateAchievements: (achievements: SiteContent['achievements']) => void;
  updateServices: (services: SiteContent['services']) => void;
  updateLegalPages: (legalPages: SiteContent['legalPages']) => void;
  addArticle: (data: any) => void;
  deleteArticle: (id: string) => void;
  updateArticle: (id: string, article: { title: string; excerpt: string; date: string; category: string }) => void;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  updateSocialLink: (platform: string, url: string) => Promise<void>;
}

const AdminTabs = ({
  content,
  socialLinks,
  updateHero,
  updateAbout,
  updateContact,
  updateAchievements,
  updateServices,
  updateLegalPages,
  addArticle,
  deleteArticle,
  updateArticle,
  setSocialLinks,
  updateSocialLink
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="hero" className="w-full">
      <TabsList className="grid w-full grid-cols-12 mb-8 bg-lawyer-block border border-lawyer-divider">
        <TabsTrigger value="hero" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">עמוד ראשי</TabsTrigger>
        <TabsTrigger value="about" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">אודות</TabsTrigger>
        <TabsTrigger value="achievements" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">הישגים</TabsTrigger>
        <TabsTrigger value="services" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">תחומי התמחות</TabsTrigger>
        <TabsTrigger value="testimonials" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">המלצות</TabsTrigger>
        <TabsTrigger value="articles" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מאמרים</TabsTrigger>
        <TabsTrigger value="contact" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">יצירת קשר</TabsTrigger>
        <TabsTrigger value="legal" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מידע משפטי</TabsTrigger>
        <TabsTrigger value="social" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מדיה חברתית</TabsTrigger>
        <TabsTrigger value="theme" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">עיצוב</TabsTrigger>
        <TabsTrigger value="backup" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">גיבוי</TabsTrigger>
        <TabsTrigger value="settings" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">הגדרות</TabsTrigger>
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

      <TabsContent value="services">
        <ServicesSection content={content} updateServices={updateServices} />
      </TabsContent>

      <TabsContent value="testimonials">
        <TestimonialsSection />
      </TabsContent>

      <TabsContent value="articles">
            <ArticlesSection 
              content={content} 
              addArticle={addArticle}
              deleteArticle={deleteArticle}
              updateArticle={updateArticle}
            />
      </TabsContent>

      <TabsContent value="contact">
        <ContactSection content={content} updateContact={updateContact} />
      </TabsContent>

      <TabsContent value="legal">
        <LegalPagesSection content={content} updateLegalPages={updateLegalPages} />
      </TabsContent>

      <TabsContent value="social">
        <SocialMediaSection 
          socialLinks={socialLinks} 
          setSocialLinks={setSocialLinks} 
          updateSocialLink={updateSocialLink} 
        />
      </TabsContent>

      <TabsContent value="theme">
        <ThemeSettingsSection />
      </TabsContent>

      <TabsContent value="backup">
        <BackupSection />
      </TabsContent>

      <TabsContent value="settings">
        <div className="space-y-6">
          <PasswordChangeSection />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
