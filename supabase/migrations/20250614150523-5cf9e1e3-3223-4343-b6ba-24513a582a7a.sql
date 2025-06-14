
-- Create a table for theme settings
CREATE TABLE public.theme_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  background_color text NOT NULL DEFAULT '#121212',
  button_color text NOT NULL DEFAULT '#D4AF37',
  text_color text NOT NULL DEFAULT '#FFFFFF',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default theme settings
INSERT INTO public.theme_settings (background_color, button_color, text_color) VALUES
('#121212', '#D4AF37', '#FFFFFF');

-- Add Row Level Security (RLS)
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view theme settings" 
  ON public.theme_settings 
  FOR SELECT 
  USING (true);

-- Create policy for admin update access
CREATE POLICY "Allow all updates for theme settings" 
  ON public.theme_settings 
  FOR UPDATE 
  USING (true);
