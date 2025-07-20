
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useSocialLinks } from '@/hooks/useSocialLinks';
import AdminHeader from './AdminHeader';
import AdminTabs from './AdminTabs';

interface AdminContentProps {
  onLogout: () => void;
}

const AdminContent = ({ onLogout }: AdminContentProps) => {
  const { toast } = useToast();
  const {
    content,
    isLoading,
    saveContent,
    updateHero,
    updateAbout,
    updateContact,
    updateAchievements,
    updateServices,
    updateLegalPages,
    addArticle,
    deleteArticle,
    updateArticle
  } = useAdminContent();
  
  const {
    socialLinks,
    setSocialLinks,
    updateSocialLink
  } = useSocialLinks();

  const handleSaveContent = async () => {
    try {
      await saveContent();
      toast({
        title: "התוכן נשמר בהצלחה",
        description: "השינויים נשמרו במסד הנתונים ויופיעו באתר",
      });
    } catch (error) {
      toast({
        title: "שגיאה בשמירת התוכן",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lawyer-black text-lawyer-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span>טוען...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <div className="container mx-auto px-4 py-8">
        <AdminHeader onSaveContent={handleSaveContent} onLogout={onLogout} />
        <AdminTabs
          content={content}
          socialLinks={socialLinks}
          updateHero={updateHero}
          updateAbout={updateAbout}
          updateContact={updateContact}
          updateAchievements={updateAchievements}
          updateServices={updateServices}
          updateLegalPages={updateLegalPages}
          addArticle={addArticle}
          deleteArticle={deleteArticle}
          updateArticle={updateArticle}
          setSocialLinks={setSocialLinks}
          updateSocialLink={updateSocialLink}
        />
      </div>
    </div>
  );
};

export default AdminContent;
