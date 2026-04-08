
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  ward TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'citizen',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Other' CHECK (category IN ('Road', 'Water', 'Sanitation', 'Electricity', 'Other')),
  ward TEXT,
  status TEXT NOT NULL DEFAULT 'Reported' CHECK (status IN ('Reported', 'In Progress', 'Completed')),
  location_text TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creator can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Creator can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = created_by);

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project flags table
CREATE TABLE public.project_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  flagged_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, flagged_by)
);

ALTER TABLE public.project_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own flags" ON public.project_flags FOR INSERT TO authenticated WITH CHECK (auth.uid() = flagged_by);
CREATE POLICY "Users can read own flags" ON public.project_flags FOR SELECT TO authenticated USING (auth.uid() = flagged_by);

-- Upvotes table
CREATE TABLE public.upvotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE public.upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read upvote counts" ON public.upvotes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert own upvotes" ON public.upvotes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own upvotes" ON public.upvotes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Seed 6 sample projects across 3 wards
INSERT INTO public.projects (title, description, category, ward, status, location_text, latitude, longitude) VALUES
('Pothole Repair on MG Road', 'Major potholes causing traffic issues near Trinity Circle. Multiple accidents reported.', 'Road', 'Ward 12 - Shivajinagar', 'Reported', 'MG Road, Bengaluru', 12.9758, 77.6065),
('Water Pipeline Replacement', 'Replacing aging water pipelines in Jayanagar to fix contamination and low pressure issues.', 'Water', 'Ward 34 - Jayanagar', 'In Progress', 'Jayanagar 4th Block, Bengaluru', 12.9279, 77.5810),
('Street Light Installation', 'Installing LED street lights along the outer ring road stretch between Marathahalli and Bellandur.', 'Electricity', 'Ward 12 - Shivajinagar', 'Completed', 'ORR Marathahalli, Bengaluru', 12.9502, 77.6984),
('Drainage System Upgrade', 'Upgrading storm water drains in Whitefield to prevent monsoon flooding.', 'Sanitation', 'Ward 85 - Whitefield', 'In Progress', 'Whitefield Main Road, Bengaluru', 12.9698, 77.7500),
('Public Toilet Construction', 'Building 10 new public toilet blocks in high-traffic areas of Jayanagar and surrounding wards.', 'Sanitation', 'Ward 34 - Jayanagar', 'Reported', 'Jayanagar, Bengaluru', 12.9250, 77.5830),
('Solar-Powered Traffic Signals', 'Replacing conventional traffic signals with solar-powered ones at 15 major junctions.', 'Electricity', 'Ward 85 - Whitefield', 'Reported', 'Whitefield Junction, Bengaluru', 12.9720, 77.7480);
