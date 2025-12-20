import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryBySlug,
  getAuthors,
  getPublishedArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  getArticleBySlug,
  getArticleById,
  searchArticles,
  getCategoriesWithCount,
} from "@/lib/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });
}

export function usePublishedArticles(limit?: number) {
  return useQuery({
    queryKey: ["articles", "published", limit],
    queryFn: () => getPublishedArticles(limit),
  });
}

export function useFeaturedArticles(limit: number = 2) {
  return useQuery({
    queryKey: ["articles", "featured", limit],
    queryFn: () => getFeaturedArticles(limit),
  });
}

export function useArticlesByCategory(categorySlug: string) {
  return useQuery({
    queryKey: ["articles", "category", categorySlug],
    queryFn: () => getArticlesByCategory(categorySlug),
    enabled: !!categorySlug,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
  });
}

export function useArticleById(id: string) {
  return useQuery({
    queryKey: ["article", "id", id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
}

export function useSearchArticles(searchTerm: string) {
  return useQuery({
    queryKey: ["articles", "search", searchTerm],
    queryFn: () => searchArticles(searchTerm),
    enabled: searchTerm.length > 2,
  });
}

export function useCategoriesWithCount() {
  return useQuery({
    queryKey: ["categories", "withCount"],
    queryFn: getCategoriesWithCount,
  });
}
