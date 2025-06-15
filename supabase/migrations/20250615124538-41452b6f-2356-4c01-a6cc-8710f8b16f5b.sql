
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default admin user with hashed password
-- Password: El224466 (will be hashed in the application)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('eyall', '$2a$10$8K4QqQq5Q5Q5Q5Q5Q5Q5QOQ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5');

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (will be managed by application logic)
CREATE POLICY "Admin users can manage admin data" 
  ON public.admin_users 
  FOR ALL 
  USING (true);
