
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { SiteContent } from '@/types/admin';

interface AchievementsSectionProps {
  content: SiteContent;
  updateAchievements: (achievements: SiteContent['achievements']) => void;
}

export const AchievementsSection = ({ content, updateAchievements }: AchievementsSectionProps) => {
  const handleAchievementChange = (index: number, field: 'text' | 'icon', value: string) => {
    if (!content.achievements) return;
    
    const updatedAchievements = [...content.achievements];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    updateAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    const newAchievement = { icon: 'Award', text: 'הישג חדש' };
    const updatedAchievements = content.achievements ? [...content.achievements, newAchievement] : [newAchievement];
    updateAchievements(updatedAchievements);
  };

  const removeAchievement = (index: number) => {
    if (!content.achievements) return;
    const updatedAchievements = content.achievements.filter((_, i) => i !== index);
    updateAchievements(updatedAchievements);
  };

  // אם אין achievements, נציג הודעה
  if (!content.achievements || content.achievements.length === 0) {
    return (
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-lawyer-gold">עריכת הישגים וסטטיסטיקות</h2>
          <Button onClick={addAchievement} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400">
            <Plus className="ml-2 h-4 w-4" />
            הוסף הישג
          </Button>
        </div>
        <p className="text-lawyer-white">אין הישגים להצגה. לחץ על "הוסף הישג" כדי להתחיל.</p>
      </Card>
    );
  }

  const iconOptions = [
    { value: 'Award', label: 'פרס' },
    { value: 'Clock', label: 'שעון' },
    { value: 'Users', label: 'משתמשים' },
    { value: 'CheckCircle', label: 'וי' },
    { value: 'Star', label: 'כוכב' },
    { value: 'TrendingUp', label: 'גרף עולה' },
    { value: 'Shield', label: 'מגן' },
    { value: 'Heart', label: 'לב' }
  ];

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-lawyer-gold">עריכת הישגים וסטטיסטיקות</h2>
        <Button onClick={addAchievement} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400">
          <Plus className="ml-2 h-4 w-4" />
          הוסף הישג
        </Button>
      </div>
      
      <div className="space-y-6">
        {content.achievements.map((achievement, index) => (
          <div key={`achievement-edit-${index}`} className="p-4 bg-lawyer-black border border-lawyer-divider rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-lawyer-white">הישג {index + 1}</h3>
              <Button 
                onClick={() => removeAchievement(index)}
                variant="destructive"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`achievement-icon-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
                  סמל
                </Label>
                <select
                  id={`achievement-icon-${index}`}
                  value={achievement.icon}
                  onChange={(e) => handleAchievementChange(index, 'icon', e.target.value)}
                  className="w-full bg-lawyer-black border border-lawyer-silver text-lawyer-white rounded-md px-3 py-2 focus:border-lawyer-gold focus:outline-none"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-lawyer-black">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor={`achievement-text-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
                  טקסט ההישג
                </Label>
                <Input
                  id={`achievement-text-${index}`}
                  value={achievement.text}
                  onChange={(e) => handleAchievementChange(index, 'text', e.target.value)}
                  className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  placeholder="לדוגמה: 15+ שנות ניסיון"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-lawyer-black/50 rounded-lg">
        <h3 className="text-lawyer-gold font-medium mb-2">דוגמאות לטקסטים:</h3>
        <ul className="text-lawyer-silver text-sm space-y-1">
          <li>• 15+ שנות ניסיון</li>
          <li>• 500+ לקוחות מרוצים</li>
          <li>• דירוג 5 כוכבים</li>
          <li>• זמינות 24/7</li>
        </ul>
      </div>
    </Card>
  );
};
