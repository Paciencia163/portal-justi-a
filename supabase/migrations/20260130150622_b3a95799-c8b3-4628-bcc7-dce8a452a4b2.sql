-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for ads
INSERT INTO storage.buckets (id, name, public)
VALUES ('ads', 'ads', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for article-images bucket
CREATE POLICY "Anyone can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Admins and editors can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can update article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can delete article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' 
  AND is_admin_or_editor(auth.uid())
);

-- RLS policies for ads bucket
CREATE POLICY "Anyone can view ads"
ON storage.objects FOR SELECT
USING (bucket_id = 'ads');

CREATE POLICY "Admins and editors can upload ads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ads' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can update ads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'ads' 
  AND is_admin_or_editor(auth.uid())
);

CREATE POLICY "Admins and editors can delete ads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ads' 
  AND is_admin_or_editor(auth.uid())
);

-- Create ads table
CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  position TEXT NOT NULL DEFAULT 'sidebar',
  active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ads
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- RLS policies for ads
CREATE POLICY "Anyone can view active ads"
ON public.ads FOR SELECT
USING (active = true);

CREATE POLICY "Admins and editors can view all ads"
ON public.ads FOR SELECT
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage ads"
ON public.ads FOR INSERT
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update ads"
ON public.ads FOR UPDATE
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can delete ads"
ON public.ads FOR DELETE
USING (is_admin_or_editor(auth.uid()));

-- Add updated_at trigger for ads
CREATE TRIGGER update_ads_updated_at
BEFORE UPDATE ON public.ads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();