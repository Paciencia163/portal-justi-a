import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Article } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "horizontal";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        to={`/noticias/${article.id}`}
        className="group flex gap-4 rounded-xl bg-card p-3 shadow-soft transition-all hover:shadow-card"
      >
        <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={article.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <Badge variant="secondary" className="mb-2 w-fit text-xs">
            {article.category?.name || "Geral"}
          </Badge>
          <h3 className="mb-1 line-clamp-2 font-display text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <span className="text-xs text-muted-foreground">
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString("pt-AO", {
                  day: "numeric",
                  month: "short",
                })
              : ""}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/noticias/${article.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all hover:shadow-card"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="mb-3 w-fit">
          {article.category?.name || "Geral"}
        </Badge>
        <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {article.author?.name || "Redação"}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString("pt-AO", {
                  day: "numeric",
                  month: "short",
                })
              : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
