
-- Create a table for social media links
CREATE TABLE public.social_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL UNIQUE,
  url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default social media platforms
INSERT INTO public.social_links (platform, url, is_active) VALUES
('facebook', '#', true),
('linkedin', '#', true),
('instagram', '#', true);

-- Add Row Level Security (RLS)
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view social links" 
  ON public.social_links 
  FOR SELECT 
  USING (true);

-- Create policy for admin update access (assuming admin functionality will be added later)
CREATE POLICY "Allow all updates for now" 
  ON public.social_links 
  FOR UPDATE 
  USING (true);
