import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  published: boolean;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  author?: Author;
  tags?: string[];
}

export interface ArticleTag {
  id: string;
  article_id: string;
  tag: string;
  created_at: string;
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  
  return data;
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
  
  return data || [];
}

// Fetch published articles with category and author
export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  // Fetch tags for each article
  const articlesWithTags = await Promise.all(
    (data || []).map(async (article) => {
      const { data: tags } = await supabase
        .from('article_tags')
        .select('tag')
        .eq('article_id', article.id);
      
      return {
        ...article,
        tags: tags?.map(t => t.tag) || []
      };
    })
  );
  
  return articlesWithTags;
}

// Fetch featured articles
export async function getFeaturedArticles(limit: number = 2): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
  
  return data || [];
}

// Fetch articles by category
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) return [];
  
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('published', true)
    .eq('category_id', category.id)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
  
  return data || [];
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }
  
  if (!data) return null;
  
  // Fetch tags
  const { data: tags } = await supabase
    .from('article_tags')
    .select('tag')
    .eq('article_id', data.id);
  
  return {
    ...data,
    tags: tags?.map(t => t.tag) || []
  };
}

// Fetch single article by ID
export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }
  
  if (!data) return null;
  
  // Fetch tags
  const { data: tags } = await supabase
    .from('article_tags')
    .select('tag')
    .eq('article_id', data.id);
  
  return {
    ...data,
    tags: tags?.map(t => t.tag) || []
  };
}

// Search articles
export async function searchArticles(searchTerm: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq('published', true)
    .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }
  
  return data || [];
}

// Get categories with article count
export async function getCategoriesWithCount(): Promise<(Category & { articleCount: number })[]> {
  const categories = await getCategories();
  
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const { count, error } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
        .eq('category_id', category.id);
      
      return {
        ...category,
        articleCount: error ? 0 : (count || 0)
      };
    })
  );
  
  return categoriesWithCount;
}
