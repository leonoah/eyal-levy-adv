
-- הפעלת RLS על טבלת site_backups
ALTER TABLE public.site_backups ENABLE ROW LEVEL SECURITY;

-- הוספת מדיניות שמאפשרת רק למנהלים לגשת לגיבויים
CREATE POLICY "Allow admin access to site_backups" ON public.site_backups
FOR ALL USING (true);

-- הערה: המדיניות כרגע מאפשרת גישה מלאה לכולם
-- במידה ויש לך מערכת אימות למנהלים, נוכל להחליף את true בתנאי מתאים
