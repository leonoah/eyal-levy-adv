
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ThemeSettings {
  id: string;
  background_color: string;
  button_color: string;
  text_color: string;
}

const defaultTheme: ThemeSettings = {
  id: '',
  background_color: '#121212',
  button_color: '#D4AF37',
  text_color: '#FFFFFF'
};

export const useThemeSettings = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const fetchThemeSettings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching theme settings:', error);
        return;
      }

      if (data) {
        setThemeSettings(data);
        applyThemeToDOM(data);
      }
    } catch (error) {
      console.error('Error fetching theme settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateThemeSettings = async (newSettings: Partial<ThemeSettings>) => {
    try {
      const updatedSettings = { ...themeSettings, ...newSettings };
      
      const { error } = await supabase
        .from('theme_settings')
        .update({
          background_color: updatedSettings.background_color,
          button_color: updatedSettings.button_color,
          text_color: updatedSettings.text_color,
          updated_at: new Date().toISOString()
        })
        .eq('id', themeSettings.id);

      if (error) {
        console.error('Error updating theme settings:', error);
        throw error;
      }

      setThemeSettings(updatedSettings);
      applyThemeToDOM(updatedSettings);
    } catch (error) {
      console.error('Error updating theme settings:', error);
      throw error;
    }
  };

  const applyThemeToDOM = (settings: ThemeSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--lawyer-black', settings.background_color);
    root.style.setProperty('--lawyer-charcoal', adjustBrightness(settings.background_color, 10));
    root.style.setProperty('--lawyer-gold', settings.button_color);
    root.style.setProperty('--lawyer-soft-gold', adjustBrightness(settings.button_color, 15));
    root.style.setProperty('--lawyer-white', settings.text_color);
    root.style.setProperty('--lawyer-silver', adjustBrightness(settings.text_color, -20));
    root.style.setProperty('--lawyer-block', adjustBrightness(settings.background_color, 5));
    root.style.setProperty('--lawyer-divider', adjustBrightness(settings.background_color, 20));
  };

  const adjustBrightness = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  return {
    themeSettings,
    isLoading,
    updateThemeSettings,
    fetchThemeSettings
  };
};
