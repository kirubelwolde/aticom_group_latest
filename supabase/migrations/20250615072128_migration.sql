
-- Create a proper admin authentication system using Supabase Auth
-- First, let's create a admin_profiles table to store admin-specific data
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy that allows authenticated admin users to read their own profile
CREATE POLICY "Admin users can view their own profile" 
  ON public.admin_profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy that allows authenticated admin users to update their own profile
CREATE POLICY "Admin users can update their own profile" 
  ON public.admin_profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create a function to handle new admin user creation
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Create trigger to automatically create admin profile when admin user signs up
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  WHEN (new.email LIKE '%@aticom.com')
  EXECUTE FUNCTION public.handle_new_admin_user();
