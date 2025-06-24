
-- Create ideas table
CREATE TABLE public.ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create thoughts table  
CREATE TABLE public.thoughts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ideas
CREATE POLICY "Users can view their own ideas" 
  ON public.ideas 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ideas" 
  ON public.ideas 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" 
  ON public.ideas 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" 
  ON public.ideas 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for thoughts
CREATE POLICY "Users can view their own thoughts" 
  ON public.thoughts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own thoughts" 
  ON public.thoughts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own thoughts" 
  ON public.thoughts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own thoughts" 
  ON public.thoughts 
  FOR DELETE 
  USING (auth.uid() = user_id);
