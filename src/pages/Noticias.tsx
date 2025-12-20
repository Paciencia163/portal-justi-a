import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { NewsCard } from "@/components/news/NewsCard";
import { usePublishedArticles, useCategories } from "@/hooks/useArticles";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";

const Noticias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: articles = [], isLoading: articlesLoading } = usePublishedArticles();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory =
      !selectedCategory || article.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Notícias Jurídicas | Portal Justiça Sem Isenção</title>
        <meta
          name="description"
          content="Acompanhe as últimas notícias jurídicas de Angola. Decisões judiciais, análises legais e atualizações sobre o mundo do Direito."
        />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="gradient-hero py-10 text-primary-foreground md:py-14">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Notícias Jurídicas
            </h1>
            <p className="mt-2 text-sm opacity-90 md:text-base">
              Acompanhe as últimas atualizações do mundo do Direito em Angola
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categoriesLoading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </>
                ) : (
                  <>
                    <Badge
                      variant={selectedCategory === null ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todas
                    </Badge>
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={
                          selectedCategory === category.name ? "default" : "secondary"
                        }
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Results */}
            {articlesLoading ? (
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
            ) : filteredArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
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
                  {articles.length === 0 
                    ? "Nenhuma notícia publicada ainda. Volte em breve!"
                    : "Nenhuma notícia encontrada para sua pesquisa."}
                </p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Noticias;
