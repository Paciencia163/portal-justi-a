import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/api";
import { NewsCard } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface LatestNewsProps {
  articles: Article[];
  isLoading?: boolean;
}

export function LatestNews({ articles, isLoading }: LatestNewsProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Últimas Notícias
            </h2>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Acompanhe as principais atualizações do mundo jurídico
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/noticias" className="gap-2">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-card p-4">
                <Skeleton className="aspect-[16/10] w-full rounded-lg" />
                <Skeleton className="mt-4 h-4 w-20" />
                <Skeleton className="mt-3 h-6 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma notícia publicada ainda. Volte em breve!
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/noticias" className="gap-2">
              Ver todas as notícias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
