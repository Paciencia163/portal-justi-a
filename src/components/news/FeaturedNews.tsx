import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Article } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface FeaturedNewsProps {
  articles: Article[];
  isLoading?: boolean;
}

export function FeaturedNews({ articles, isLoading }: FeaturedNewsProps) {
  if (isLoading) {
    return (
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  const [mainArticle, secondaryArticle] = articles;

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Main Featured Article */}
          {mainArticle && (
            <Link
              to={`/noticias/${mainArticle.id}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={mainArticle.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"}
                  alt={mainArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground md:p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground hover:bg-accent/90">
                  {mainArticle.category?.name || "Geral"}
                </Badge>
                <h2 className="mb-3 font-display text-xl font-bold leading-tight md:text-2xl lg:text-3xl">
                  {mainArticle.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm opacity-90 md:text-base">
                  {mainArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs opacity-80 md:text-sm">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {mainArticle.author?.name || "Redação"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {mainArticle.published_at
                      ? new Date(mainArticle.published_at).toLocaleDateString("pt-AO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Data não disponível"}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Featured Article */}
          {secondaryArticle && (
            <Link
              to={`/noticias/${secondaryArticle.id}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={secondaryArticle.image_url || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"}
                  alt={secondaryArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground md:p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground hover:bg-accent/90">
                  {secondaryArticle.category?.name || "Geral"}
                </Badge>
                <h2 className="mb-3 font-display text-xl font-bold leading-tight md:text-2xl">
                  {secondaryArticle.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm opacity-90">
                  {secondaryArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs opacity-80 md:text-sm">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {secondaryArticle.author?.name || "Redação"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {secondaryArticle.published_at
                      ? new Date(secondaryArticle.published_at).toLocaleDateString("pt-AO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Data não disponível"}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
