-- Create app role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories RLS: Public read, admin/editor write
CREATE POLICY "Anyone can view categories"
  ON public.categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can manage categories"
  ON public.categories
  FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- Authors table
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Authors RLS: Public read, admin/editor write
CREATE POLICY "Anyone can view authors"
  ON public.authors
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can manage authors"
  ON public.authors
  FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- Articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Articles RLS: Public can read published, admin/editor can manage all
CREATE POLICY "Anyone can view published articles"
  ON public.articles
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admins and editors can view all articles"
  ON public.articles
  FOR SELECT
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage articles"
  ON public.articles
  FOR INSERT
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update articles"
  ON public.articles
  FOR UPDATE
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can delete articles"
  ON public.articles
  FOR DELETE
  USING (public.is_admin_or_editor(auth.uid()));

-- Article tags table (for multiple tags per article)
CREATE TABLE public.article_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (article_id, tag)
);

ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;

-- Article tags RLS
CREATE POLICY "Anyone can view tags of published articles"
  ON public.article_tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.articles 
      WHERE articles.id = article_tags.article_id 
      AND articles.published = true
    )
  );

CREATE POLICY "Admins and editors can view all tags"
  ON public.article_tags
  FOR SELECT
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage tags"
  ON public.article_tags
  FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON public.authors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories (legal categories for Angola)
INSERT INTO public.categories (name, slug, description) VALUES
  ('Direito Penal', 'direito-penal', 'Notícias sobre crimes, penas e processos criminais'),
  ('Direito Civil', 'direito-civil', 'Contratos, família, sucessões e obrigações'),
  ('Direito Trabalhista', 'direito-trabalhista', 'Relações de trabalho e direitos laborais'),
  ('Direito Constitucional', 'direito-constitucional', 'Constituição, direitos fundamentais e organização do Estado'),
  ('Direito Administrativo', 'direito-administrativo', 'Administração pública e serviços governamentais'),
  ('Direitos do Cidadão', 'direitos-cidadao', 'Informações sobre direitos e deveres dos cidadãos');

-- Create indexes for better performance
CREATE INDEX idx_articles_category_id ON public.articles(category_id);
CREATE INDEX idx_articles_author_id ON public.articles(author_id);
CREATE INDEX idx_articles_published ON public.articles(published);
CREATE INDEX idx_articles_featured ON public.articles(featured);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_article_tags_article_id ON public.article_tags(article_id);