
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Palette } from 'lucide-react';
import { useThemeSettings } from '@/hooks/useThemeSettings';
import { useToast } from '@/hooks/use-toast';

const ThemeSettingsSection = () => {
  const { themeSettings, updateThemeSettings, isLoading } = useThemeSettings();
  const { toast } = useToast();

  const handleColorChange = async (colorType: 'background_color' | 'button_color' | 'text_color', value: string) => {
    try {
      await updateThemeSettings({ [colorType]: value });
      toast({
        title: "הצבע עודכן בהצלחה",
        description: "השינוי יוחל מייד באתר",
      });
    } catch (error) {
      toast({
        title: "שגיאה בעדכון הצבע",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-lawyer-block rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-lawyer-block rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="text-lawyer-gold" size={24} />
        <h2 className="text-2xl font-bold text-lawyer-gold">הגדרות עיצוב</h2>
      </div>

      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold">בחירת צבעים</CardTitle>
          <CardDescription className="text-lawyer-silver">
            התאם את צבעי האתר לפי טעמך האישי
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Background Color */}
            <div className="space-y-3">
              <Label className="text-lawyer-white font-medium">צבע רקע</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeSettings.background_color}
                  onChange={(e) => handleColorChange('background_color', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-lawyer-divider cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.background_color}
                    onChange={(e) => handleColorChange('background_color', e.target.value)}
                    className="lawyer-input w-full"
                    placeholder="#121212"
                  />
                </div>
              </div>
              <p className="text-sm text-lawyer-silver">צבע הרקע הראשי של האתר</p>
            </div>

            {/* Button Color */}
            <div className="space-y-3">
              <Label className="text-lawyer-white font-medium">צבע כפתורים</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeSettings.button_color}
                  onChange={(e) => handleColorChange('button_color', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-lawyer-divider cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.button_color}
                    onChange={(e) => handleColorChange('button_color', e.target.value)}
                    className="lawyer-input w-full"
                    placeholder="#D4AF37"
                  />
                </div>
              </div>
              <p className="text-sm text-lawyer-silver">צבע הכפתורים והאלמנטים הבולטים</p>
            </div>

            {/* Text Color */}
            <div className="space-y-3">
              <Label className="text-lawyer-white font-medium">צבע טקסט</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeSettings.text_color}
                  onChange={(e) => handleColorChange('text_color', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-lawyer-divider cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={themeSettings.text_color}
                    onChange={(e) => handleColorChange('text_color', e.target.value)}
                    className="lawyer-input w-full"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
              <p className="text-sm text-lawyer-silver">צבע הטקסט הראשי באתר</p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-8 p-6 rounded-lg border border-lawyer-divider" 
               style={{ 
                 backgroundColor: themeSettings.background_color,
                 color: themeSettings.text_color
               }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: themeSettings.button_color }}>
              תצוגה מקדימה
            </h3>
            <p className="mb-4">
              זהו דוגמא לטקסט באתר עם הצבעים החדשים שבחרת.
            </p>
            <Button 
              className="font-semibold"
              style={{ 
                backgroundColor: themeSettings.button_color,
                color: themeSettings.background_color
              }}
            >
              דוגמא לכפתור
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettingsSection;
