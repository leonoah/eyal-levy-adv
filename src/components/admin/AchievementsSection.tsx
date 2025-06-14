
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteContent } from '@/types/admin';

interface AchievementsSectionProps {
  content: SiteContent;
  updateAchievements: (achievements: SiteContent['achievements']) => void;
}

export const AchievementsSection = ({ content, updateAchievements }: AchievementsSectionProps) => {
  const handleAchievementChange = (index: number, text: string) => {
    if (!content.achievements) return;
    
    const updatedAchievements = [...content.achievements];
    updatedAchievements[index] = { ...updatedAchievements[index], text };
    updateAchievements(updatedAchievements);
  };

  // אם אין achievements, נציג הודעה
  if (!content.achievements || content.achievements.length === 0) {
    return (
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת הישגים</h2>
        <p className="text-lawyer-white">אין הישגים להצגה</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת הישגים</h2>
      <div className="space-y-6">
        {content.achievements.map((achievement, index) => (
          <div key={`achievement-edit-${index}`}>
            <Label htmlFor={`achievement-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
              הישג {index + 1}
            </Label>
            <Input
              id={`achievement-${index}`}
              value={achievement.text}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
