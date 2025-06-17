
-- יצירת טבלה לשמירת גיבויים של האתר
CREATE TABLE public.site_backups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  backup_name text NOT NULL,
  backup_data jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by text DEFAULT 'admin'
);

-- הוספת אינדקס על תאריך היצירה לביצועים טובים יותר
CREATE INDEX idx_site_backups_created_at ON public.site_backups(created_at DESC);

-- הוספת פונקציה לניקוי גיבויים ישנים אוטומטית כשיש יותר מ-4
CREATE OR REPLACE FUNCTION public.cleanup_old_backups()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- מחיקת גיבויים עודפים אם יש יותר מ-4
  DELETE FROM public.site_backups 
  WHERE id NOT IN (
    SELECT id FROM public.site_backups 
    ORDER BY created_at DESC 
    LIMIT 4
  );
  RETURN NEW;
END;
$$;

-- יצירת טריגר שיפעל אחרי הוספת גיבוי חדש
CREATE TRIGGER trigger_cleanup_backups
  AFTER INSERT ON public.site_backups
  FOR EACH ROW
  EXECUTE FUNCTION public.cleanup_old_backups();
