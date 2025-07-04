import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PROJECT_ID = 'eyal_levi_adv';

interface Backup {
  id: string;
  backup_name: string;
  created_at: string;
  file_path: string;
  file_size: number;
  project_id: string;
}

const BackupSection = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backupName, setBackupName] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingAction, setPendingAction] = useState<{ type: 'create' | 'restore' | 'delete', data?: any }>({ type: 'create' });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const { data, error } = await supabase
        .from('site_backups')
        .select('id, backup_name, created_at, file_path, file_size, project_id')
        .eq('project_id', PROJECT_ID)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBackups(data || []);
    } catch (error) {
      console.error('Error fetching backups:', error);
      toast({
        title: "שגיאה בטעינת הגיבויים",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const verifyPassword = async (enteredPassword: string) => {
    try {
      const username = localStorage.getItem('adminUsername');
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { username, password: enteredPassword },
      });

      if (error) throw error;
      return data && data.success;
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      toast({
        title: "שגיאה",
        description: "אנא הזן סיסמה",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const isValid = await verifyPassword(password);
    
    if (!isValid) {
      toast({
        title: "שגיאה",
        description: "סיסמה שגויה",
        variant: "destructive"
      });
      setIsLoading(false);
      setPassword('');
      return;
    }

    setShowPasswordDialog(false);
    setPassword('');
    
    // ביצוע הפעולה שהתבקשה
    switch (pendingAction.type) {
      case 'create':
        await executeCreateBackup();
        break;
      case 'restore':
        await executeRestoreBackup(pendingAction.data);
        break;
      case 'delete':
        await executeDeleteBackup(pendingAction.data);
        break;
    }
    
    setIsLoading(false);
  };

  const createBackup = async () => {
    if (!backupName.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הזן שם לגיבוי",
        variant: "destructive"
      });
      return;
    }

    if (backups.length >= 4) {
      toast({
        title: "הגעת למגבלת הגיבויים",
        description: "ניתן לשמור עד 4 גיבויים. אנא מחק גיבוי קיים לפני יצירת גיבוי חדש.",
        variant: "destructive"
      });
      return;
    }

    setPendingAction({ type: 'create' });
    setShowPasswordDialog(true);
  };

  const executeCreateBackup = async () => {
    try {
      console.log('Starting backup creation...');
      
      // איסוף כל הנתונים מהטבלאות השונות עם פילטר project_id
      const [
        contentData, 
        socialLinksData, 
        testimonialsData, 
        themeSettingsData
      ] = await Promise.all([
        supabase.from('site_content').select('*').eq('project_id', PROJECT_ID),
        supabase.from('social_links').select('*').eq('project_id', PROJECT_ID),
        supabase.from('admin_testimonials').select('*').eq('project_id', PROJECT_ID),
        supabase.from('theme_settings').select('*').eq('project_id', PROJECT_ID)
      ]);

      console.log('Backup data collected:', {
        content: contentData.data?.length || 0,
        socialLinks: socialLinksData.data?.length || 0,
        testimonials: testimonialsData.data?.length || 0,
        themeSettings: themeSettingsData.data?.length || 0
      });

      const backupData = {
        content: contentData.data || [],
        socialLinks: socialLinksData.data || [],
        testimonials: testimonialsData.data || [],
        themeSettings: themeSettingsData.data || [],
        timestamp: new Date().toISOString(),
        version: '2.0',
        project_id: PROJECT_ID
      };

      // יצירת קובץ JSON
      const backupJson = JSON.stringify(backupData, null, 2);
      const fileName = `backup_${backupName}_${new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')}.json`;
      const file = new File([backupJson], fileName, { type: 'application/json' });

      // העלאה ל-Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('site-backups')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // שמירת מטא-דאטה בטבלה עם project_id
      const { error: dbError } = await supabase
        .from('site_backups')
        .insert({
          backup_name: backupName,
          file_path: uploadData.path,
          file_size: file.size,
          project_id: PROJECT_ID
        });

      if (dbError) throw dbError;

      console.log('Backup created successfully in storage:', uploadData.path);
      toast({
        title: "הגיבוי נוצר בהצלחה",
        description: `הגיבוי "${backupName}" נשמר ב-Storage`,
      });

      setBackupName('');
      fetchBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
      toast({
        title: "שגיאה ביצירת הגיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const restoreBackup = (backup: Backup) => {
    setPendingAction({ type: 'restore', data: backup });
    setConfirmMessage(`האם אתה בטוח שאתה רוצה לשחזר את הגיבוי "${backup.backup_name}"? פעולה זו תמחק את כל הנתונים הנוכחיים ותחליף אותם בנתוני הגיבוי.`);
    setShowConfirmDialog(true);
  };

  const executeRestoreBackup = async (backup: Backup) => {
    try {
      console.log('Starting backup restoration for:', backup.backup_name);
      
      // קבלת קובץ הגיבוי מ-Storage
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('site-backups')
        .download(backup.file_path);

      if (downloadError) throw downloadError;

      // קריאת תוכן הקובץ
      const fileText = await fileData.text();
      const data = JSON.parse(fileText);
      
      console.log('Backup data to restore:', {
        hasContent: !!data.content,
        contentLength: data.content?.length || 0,
        hasSocialLinks: !!data.socialLinks,
        socialLinksLength: data.socialLinks?.length || 0,
        hasTestimonials: !!data.testimonials,
        testimonialsLength: data.testimonials?.length || 0,
        hasThemeSettings: !!data.themeSettings,
        themeSettingsLength: data.themeSettings?.length || 0,
        version: data.version || 'legacy'
      });

      // מחיקת נתונים קיימים לפרויקט הנוכחי בלבד
      console.log('Deleting existing data for project:', PROJECT_ID);
      const deletePromises = [
        supabase.from('site_content').delete().eq('project_id', PROJECT_ID),
        supabase.from('social_links').delete().eq('project_id', PROJECT_ID),
        supabase.from('admin_testimonials').delete().eq('project_id', PROJECT_ID),
        supabase.from('theme_settings').delete().eq('project_id', PROJECT_ID)
      ];

      const deleteResults = await Promise.allSettled(deletePromises);
      deleteResults.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Delete operation ${index} failed:`, result.reason);
        }
      });

      console.log('Existing data deleted, inserting backup data...');

      // הוספת נתונים מהגיבוי עם project_id נכון
      const insertResults = [];

      if (data.content && data.content.length > 0) {
        console.log('Restoring site_content...', data.content.length, 'records');
        for (const item of data.content) {
          try {
            const { error } = await supabase
              .from('site_content')
              .upsert({
                section_name: item.section_name,
                content: item.content,
                project_id: PROJECT_ID,
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'section_name,project_id'
              });
            
            if (error) {
              console.error(`Error upserting content item ${item.section_name}:`, error);
            } else {
              console.log(`Successfully restored content: ${item.section_name}`);
            }
          } catch (error) {
            console.error(`Failed to restore content item ${item.section_name}:`, error);
          }
        }
        insertResults.push('content');
      }

      if (data.socialLinks && data.socialLinks.length > 0) {
        console.log('Restoring social_links...', data.socialLinks.length, 'records');
        for (const item of data.socialLinks) {
          try {
            const { error } = await supabase
              .from('social_links')
              .upsert({
                platform: item.platform,
                url: item.url,
                is_active: item.is_active !== undefined ? item.is_active : true,
                project_id: PROJECT_ID,
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'platform,project_id'
              });
            
            if (error) {
              console.error(`Error upserting social link ${item.platform}:`, error);
            } else {
              console.log(`Successfully restored social link: ${item.platform}`);
            }
          } catch (error) {
            console.error(`Failed to restore social link ${item.platform}:`, error);
          }
        }
        insertResults.push('socialLinks');
      }

      if (data.testimonials && data.testimonials.length > 0) {
        console.log('Restoring admin_testimonials...', data.testimonials.length, 'records');
        for (const item of data.testimonials) {
          try {
            const { error } = await supabase
              .from('admin_testimonials')
              .insert({
                name: item.name,
                text: item.text,
                rating: item.rating || 5,
                image_url: item.image_url,
                display_order: item.display_order || 0,
                is_active: item.is_active !== undefined ? item.is_active : true,
                project_id: PROJECT_ID,
                updated_at: new Date().toISOString()
              });
            
            if (error) {
              console.error(`Error inserting testimonial ${item.name}:`, error);
            } else {
              console.log(`Successfully restored testimonial: ${item.name}`);
            }
          } catch (error) {
            console.error(`Failed to restore testimonial ${item.name}:`, error);
          }
        }
        insertResults.push('testimonials');
      }

      if (data.themeSettings && data.themeSettings.length > 0) {
        console.log('Restoring theme_settings...', data.themeSettings.length, 'records');
        for (const item of data.themeSettings) {
          try {
            const { error } = await supabase
              .from('theme_settings')
              .insert({
                background_color: item.background_color || '#121212',
                button_color: item.button_color || '#D4AF37',
                text_color: item.text_color || '#FFFFFF',
                project_id: PROJECT_ID,
                updated_at: new Date().toISOString()
              });
            
            if (error) {
              console.error(`Error inserting theme settings:`, error);
            } else {
              console.log(`Successfully restored theme settings`);
            }
          } catch (error) {
            console.error(`Failed to restore theme settings:`, error);
          }
        }
        insertResults.push('themeSettings');
      }

      console.log('Backup restoration completed, forcing comprehensive refresh...');
      
      // כפיית רענון מיידי וחזק של כל הנתונים
      const forceSystemWideRefresh = () => {
        // שליחת אירועים ספציפיים לכל רכיב
        const events = [
          'contentUpdated',
          'socialLinksUpdated', 
          'testimonialsUpdated',
          'themeUpdated',
          'refreshAll',
          'storage',
          'resize',
          'popstate',
          'focus',
          'visibilitychange'
        ];

        events.forEach(eventType => {
          window.dispatchEvent(new CustomEvent(eventType, { 
            detail: { 
              forceRefresh: true, 
              timestamp: Date.now(),
              source: 'backup-restore' 
            } 
          }));
          window.dispatchEvent(new Event(eventType));
        });

        console.log('Comprehensive refresh events dispatched');
      };

      // רענון מיידי ומרובה עם השהיות שונות
      forceSystemWideRefresh();
      setTimeout(forceSystemWideRefresh, 50);
      setTimeout(forceSystemWideRefresh, 100);
      setTimeout(forceSystemWideRefresh, 250);
      setTimeout(forceSystemWideRefresh, 500);
      setTimeout(forceSystemWideRefresh, 1000);

      // רענון נוסף של החלון כולו
      setTimeout(() => {
        if (window.location.pathname.includes('/admin')) {
          window.location.reload();
        }
      }, 1500);

      toast({
        title: "השחזור הושלם בהצלחה",
        description: `האתר שוחזר לגיבוי "${backup.backup_name}". הדף ירוענן כעת...`,
      });

      console.log('Backup restoration completed successfully. Restored:', insertResults.join(', '));
      
    } catch (error) {
      console.error('Error restoring backup:', error);
      toast({
        title: "שגיאה בשחזור הגיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const deleteBackup = (backup: Backup) => {
    setPendingAction({ type: 'delete', data: backup });
    setConfirmMessage(`האם אתה בטוח שאתה רוצה למחוק את הגיבוי "${backup.backup_name}"? פעולה זו אינה הפיכה.`);
    setShowConfirmDialog(true);
  };

  const executeDeleteBackup = async (backup: Backup) => {
    try {
      // מחיקת הקובץ מ-Storage
      const { error: storageError } = await supabase.storage
        .from('site-backups')
        .remove([backup.file_path]);

      if (storageError) {
        console.warn('Storage delete warning (file may not exist):', storageError);
      }

      // מחיקת הרשומה מהטבלה
      const { error: dbError } = await supabase
        .from('site_backups')
        .delete()
        .eq('id', backup.id)
        .eq('project_id', PROJECT_ID);

      if (dbError) throw dbError;

      toast({
        title: "הגיבוי נמחק בהצלחה",
        description: `הגיבוי "${backup.backup_name}" נמחק מהמערכת`,
      });

      fetchBackups();
    } catch (error) {
      console.error('Error deleting backup:', error);
      toast({
        title: "שגיאה במחיקת הגיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const handleConfirmAction = () => {
    setShowConfirmDialog(false);
    setShowPasswordDialog(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold flex items-center gap-2">
            <Download size={20} />
            ניהול גיבויים (Storage) - פרויקט: {PROJECT_ID}
          </CardTitle>
          <CardDescription className="text-lawyer-white">
            צור וניהל גיבויים של תוכן האתר עבור פרויקט {PROJECT_ID}. הגיבויים נשמרים ב-Supabase Storage (מקסימום 4 גיבויים)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="backupName" className="text-lawyer-white">שם הגיבוי</Label>
              <Input
                id="backupName"
                value={backupName}
                onChange={(e) => setBackupName(e.target.value)}
                placeholder="הזן שם לגיבוי..."
                className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={createBackup}
                className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
                disabled={isLoading || !backupName.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    יוצר גיבוי...
                  </>
                ) : (
                  <>
                    <Upload className="ml-2" size={16} />
                    צור גיבוי
                  </>
                )}
              </Button>
            </div>
          </div>

          {backups.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lawyer-gold font-semibold">גיבויים קיימים ({backups.length}/4)</h3>
              <div className="space-y-2">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-3 bg-lawyer-black rounded border border-lawyer-divider">
                    <div>
                      <p className="text-lawyer-white font-medium">{backup.backup_name}</p>
                      <p className="text-lawyer-silver text-sm">
                        {new Date(backup.created_at).toLocaleDateString('he-IL')} - {new Date(backup.created_at).toLocaleTimeString('he-IL')}
                        {backup.file_size > 0 && (
                          <span className="ml-2">({formatFileSize(backup.file_size)})</span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => restoreBackup(backup)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                        size="sm"
                      >
                        <Download className="ml-1" size={14} />
                        שחזר
                      </Button>
                      <Button
                        onClick={() => deleteBackup(backup)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={isLoading}
                        size="sm"
                      >
                        <Trash2 className="ml-1" size={14} />
                        מחק
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* דיאלוג אישור פעולה */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-lawyer-block border-lawyer-divider">
          <DialogHeader>
            <DialogTitle className="text-lawyer-gold flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" size={20} />
              אישור פעולה
            </DialogTitle>
            <DialogDescription className="text-lawyer-white">
              {confirmMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              onClick={() => setShowConfirmDialog(false)}
              className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300"
            >
              ביטול
            </Button>
            <Button
              onClick={handleConfirmAction}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              כן, המשך
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* דיאלוג אימות סיסמה */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-lawyer-block border-lawyer-divider">
          <DialogHeader>
            <DialogTitle className="text-lawyer-gold">אימות סיסמה</DialogTitle>
            <DialogDescription className="text-lawyer-white">
              אנא הזן את הסיסמה שלך כדי לאשר את הפעולה
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-lawyer-white">סיסמה</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
                placeholder="הזן סיסמה..."
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              onClick={() => {
                setShowPasswordDialog(false);
                setPassword('');
              }}
              className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300"
              disabled={isLoading}
            >
              ביטול
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  מאמת...
                </>
              ) : (
                'אשר'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackupSection;
