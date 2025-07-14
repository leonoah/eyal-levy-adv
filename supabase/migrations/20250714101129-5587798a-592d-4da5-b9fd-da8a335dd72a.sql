-- Add unique constraint on section_name and project_id for site_content table
ALTER TABLE public.site_content 
ADD CONSTRAINT site_content_section_project_unique 
UNIQUE (section_name, project_id);