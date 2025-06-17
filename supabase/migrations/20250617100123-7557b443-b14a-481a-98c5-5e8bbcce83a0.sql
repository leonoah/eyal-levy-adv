
-- הוספת RLS policies לטבלת social_links (מידע ציבורי)
CREATE POLICY "Allow public read access to social_links" ON public.social_links
FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to social_links" ON public.social_links
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to social_links" ON public.social_links
FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to social_links" ON public.social_links
FOR DELETE USING (true);

-- הוספת RLS policies לטבלת theme_settings (מידע ציבורי)
CREATE POLICY "Allow public read access to theme_settings" ON public.theme_settings
FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to theme_settings" ON public.theme_settings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to theme_settings" ON public.theme_settings
FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to theme_settings" ON public.theme_settings
FOR DELETE USING (true);

-- הוספת RLS policies לטבלת site_content (מידע ציבורי)
CREATE POLICY "Allow public read access to site_content" ON public.site_content
FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to site_content" ON public.site_content
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to site_content" ON public.site_content
FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to site_content" ON public.site_content
FOR DELETE USING (true);
