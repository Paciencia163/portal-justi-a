import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NewsCard } from "@/components/news/NewsCard";
import { useArticleById, usePublishedArticles } from "@/hooks/useArticles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useArticleById(id || "");
  const { data: allArticles = [] } = usePublishedArticles();

  const relatedArticles = allArticles
    .filter((a) => a.category?.id === article?.category?.id && a.id !== article?.id)
    .slice(0, 3);

  if (isLoading) {
    return (
      <Layout>
        <article className="py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <Skeleton className="mb-6 h-4 w-32" />
              <Skeleton className="mb-4 h-6 w-20" />
              <Skeleton className="mb-4 h-10 w-full" />
              <Skeleton className="mb-4 h-6 w-3/4" />
              <Skeleton className="mb-8 aspect-[16/9] w-full rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </article>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-2xl font-bold">Notícia não encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            A notícia que você procura não existe ou foi removida.
          </p>
          <Button asChild className="mt-6">
            <Link to="/noticias">Voltar às notícias</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Portal Justiça Sem Isenção</title>
        <meta name="description" content={article.excerpt || ""} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || ""} />
        <meta property="og:image" content={article.image_url || ""} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Layout>
        <article className="py-8 md:py-12">
          <div className="container">
            {/* Back Link */}
            <Link
              to="/noticias"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às notícias
            </Link>

            <div className="mx-auto max-w-4xl">
              {/* Header */}
              <header className="mb-8">
                <Badge className="mb-4">{article.category?.name || "Geral"}</Badge>
                <h1 className="font-display text-2xl font-bold leading-tight text-foreground md:text-3xl lg:text-4xl">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="mt-4 text-lg text-muted-foreground">
                    {article.excerpt}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {article.author?.name || "Redação"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString("pt-AO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Data não disponível"}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              {article.image_url && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p className="text-muted-foreground">Conteúdo não disponível.</p>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-8">
                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  Compartilhar:
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-12">
            <div className="container">
              <h2 className="mb-8 font-display text-2xl font-bold">
                Notícias Relacionadas
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export default NoticiaDetalhe;
