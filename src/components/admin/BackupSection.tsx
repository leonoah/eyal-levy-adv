
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Backup {
  id: string;
  backup_name: string;
  created_at: string;
  created_by: string;
}

const BackupSection = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [backupName, setBackupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const { data, error } = await supabase
        .from('site_backups')
        .select('id, backup_name, created_at, created_by')
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

  const createBackup = async () => {
    if (!backupName.trim()) {
      toast({
        title: "שם גיבוי נדרש",
        description: "אנא הזן שם לגיבוי",
        variant: "destructive"
      });
      return;
    }

    if (backups.length >= 4) {
      toast({
        title: "מגבלת גיבויים",
        description: "ניתן לשמור עד 4 גיבויים בלבד. אנא מחק גיבוי קיים לפני יצירת גיבוי חדש.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // איסוף כל התוכן מהטבלאות השונות
      const [contentData, socialData, testimonialsData] = await Promise.all([
        supabase.from('site_content').select('*'),
        supabase.from('social_links').select('*'),
        supabase.from('admin_testimonials').select('*')
      ]);

      if (contentData.error || socialData.error || testimonialsData.error) {
        throw new Error('Failed to fetch site data');
      }

      const backupData = {
        site_content: contentData.data,
        social_links: socialData.data,
        testimonials: testimonialsData.data,
        backup_timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('site_backups')
        .insert({
          backup_name: backupName.trim(),
          backup_data: backupData,
          created_by: localStorage.getItem('adminUsername') || 'admin'
        });

      if (error) throw error;

      toast({
        title: "גיבוי נוצר בהצלחה",
        description: `הגיבוי "${backupName}" נשמר במערכת`,
      });

      setBackupName('');
      fetchBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
      toast({
        title: "שגיאה ביצירת גיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const restoreBackup = async (backupId: string, backupName: string) => {
    setIsLoading(true);
    try {
      const { data: backupData, error } = await supabase
        .from('site_backups')
        .select('backup_data')
        .eq('id', backupId)
        .single();

      if (error || !backupData) throw new Error('Failed to fetch backup data');

      const data = backupData.backup_data as any;

      // שחזור התוכן לטבלאות
      if (data.site_content) {
        // מחיקת תוכן קיים ושחזור מהגיבוי
        await supabase.from('site_content').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        for (const content of data.site_content) {
          const { id, created_at, updated_at, ...contentWithoutMeta } = content;
          await supabase.from('site_content').insert(contentWithoutMeta);
        }
      }

      if (data.social_links) {
        await supabase.from('social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        for (const link of data.social_links) {
          const { id, created_at, updated_at, ...linkWithoutMeta } = link;
          await supabase.from('social_links').insert(linkWithoutMeta);
        }
      }

      if (data.testimonials) {
        await supabase.from('admin_testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        for (const testimonial of data.testimonials) {
          const { id, created_at, updated_at, ...testimonialWithoutMeta } = testimonial;
          await supabase.from('admin_testimonials').insert(testimonialWithoutMeta);
        }
      }

      toast({
        title: "שחזור הושלם בהצלחה",
        description: `האתר שוחזר מהגיבוי "${backupName}"`,
      });

      // רענון העמוד כדי לטעון את התוכן החדש
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error restoring backup:', error);
      toast({
        title: "שגיאה בשחזור הגיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBackup = async (backupId: string, backupName: string) => {
    try {
      const { error } = await supabase
        .from('site_backups')
        .delete()
        .eq('id', backupId);

      if (error) throw error;

      toast({
        title: "גיבוי נמחק",
        description: `הגיבוי "${backupName}" נמחק מהמערכת`,
      });

      fetchBackups();
    } catch (error) {
      console.error('Error deleting backup:', error);
      toast({
        title: "שגיאה במחיקת גיבוי",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* יצירת גיבוי חדש */}
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">יצירת גיבוי חדש</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="backup-name" className="text-lawyer-white text-base font-medium mb-2 block">
              שם הגיבוי
            </Label>
            <Input
              id="backup-name"
              value={backupName}
              onChange={(e) => setBackupName(e.target.value)}
              className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
              placeholder="הזן שם לגיבוי..."
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={createBackup}
              disabled={isLoading || backups.length >= 4}
              className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6"
            >
              <Download size={16} className="ml-2" />
              {isLoading ? 'יוצר גיבוי...' : 'צור גיבוי'}
            </Button>
            {backups.length >= 4 && (
              <p className="text-orange-400 text-sm">
                הגעת למגבלת 4 גיבויים. מחק גיבוי קיים כדי ליצור חדש.
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* רשימת הגיבויים */}
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">גיבויים קיימים ({backups.length}/4)</h2>
        
        {backups.length === 0 ? (
          <div className="text-center py-8 text-lawyer-silver">
            <p>אין גיבויים במערכת</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-lawyer-divider">
                <TableHead className="text-lawyer-white text-right">שם הגיבוי</TableHead>
                <TableHead className="text-lawyer-white text-right">תאריך יצירה</TableHead>
                <TableHead className="text-lawyer-white text-right">נוצר על ידי</TableHead>
                <TableHead className="text-lawyer-white text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id} className="border-lawyer-divider">
                  <TableCell className="text-lawyer-white font-medium">
                    {backup.backup_name}
                  </TableCell>
                  <TableCell className="text-lawyer-silver">
                    {formatDate(backup.created_at)}
                  </TableCell>
                  <TableCell className="text-lawyer-silver">
                    {backup.created_by}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            disabled={isLoading}
                          >
                            <Upload size={14} className="ml-1" />
                            שחזר
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-lawyer-black border-lawyer-gold">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-lawyer-gold flex items-center gap-2">
                              <AlertTriangle size={20} />
                              שחזור גיבוי
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-lawyer-white">
                              האם אתה בטוח שאתה רוצה לשחזר את הגיבוי "{backup.backup_name}"?
                              <br />
                              <strong className="text-orange-400">פעולה זו תמחק את כל התוכן הנוכחי ותחליף אותו בתוכן מהגיבוי!</strong>
                              <br />
                              מומלץ לגבות את המצב הנוכחי לפני השחזור.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300">
                              ביטול
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => restoreBackup(backup.id, backup.backup_name)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              שחזר את הגיבוי
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={isLoading}
                          >
                            <Trash2 size={14} className="ml-1" />
                            מחק
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-lawyer-black border-lawyer-gold">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-lawyer-gold">מחיקת גיבוי</AlertDialogTitle>
                            <AlertDialogDescription className="text-lawyer-white">
                              האם אתה בטוח שאתה רוצה למחוק את הגיבוי "{backup.backup_name}"?
                              פעולה זו אינה ניתנת לביטול.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300">
                              ביטול
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteBackup(backup.id, backup.backup_name)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              מחק גיבוי
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default BackupSection;
