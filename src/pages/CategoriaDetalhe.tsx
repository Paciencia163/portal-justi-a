import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NewsCard } from "@/components/news/NewsCard";
import { useArticlesByCategory, useCategoryBySlug } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CategoriaDetalhe = () => {
  const { slug } = useParams();
  const { data: category, isLoading: categoryLoading } = useCategoryBySlug(slug || "");
  const { data: articles = [], isLoading: articlesLoading } = useArticlesByCategory(slug || "");

  if (categoryLoading) {
    return (
      <Layout>
        <section className="gradient-hero py-10 text-primary-foreground md:py-14">
          <div className="container">
            <Skeleton className="mb-4 h-4 w-32 bg-primary-foreground/20" />
            <Skeleton className="h-10 w-48 bg-primary-foreground/20" />
            <Skeleton className="mt-2 h-5 w-64 bg-primary-foreground/20" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-2xl font-bold">Categoria não encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            A categoria que você procura não existe.
          </p>
          <Button asChild className="mt-6">
            <Link to="/categorias">Ver todas as categorias</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} | Portal Justiça Sem Isenção</title>
        <meta name="description" content={category.description || ""} />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="gradient-hero py-10 text-primary-foreground md:py-14">
          <div className="container">
            <Link
              to="/categorias"
              className="mb-4 inline-flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas as categorias
            </Link>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              {category.name}
            </h1>
            <p className="mt-2 text-sm opacity-90 md:text-base">
              {category.description}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {articlesLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
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
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  Nenhuma notícia encontrada nesta categoria. Volte em breve!
                </p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CategoriaDetalhe;
