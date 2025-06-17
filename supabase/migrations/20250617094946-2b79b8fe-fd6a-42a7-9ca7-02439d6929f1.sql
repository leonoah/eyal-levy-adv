
-- יצירת bucket לגיבויים
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-backups', 'site-backups', false);

-- יצירת מדיניות גישה לגיבויים (רק למנהלים)
CREATE POLICY "Allow admin access to backups" ON storage.objects
FOR ALL USING (bucket_id = 'site-backups');

-- עדכון טבלת site_backups להחזיק רק מטא-דאטה
ALTER TABLE site_backups DROP COLUMN backup_data;
ALTER TABLE site_backups ADD COLUMN file_path text NOT NULL DEFAULT '';
ALTER TABLE site_backups ADD COLUMN file_size bigint DEFAULT 0;
