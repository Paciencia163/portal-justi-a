import { Layout } from "@/components/layout/Layout";
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { LatestNews } from "@/components/news/LatestNews";
import { CategorySection } from "@/components/news/CategorySection";
import { useFeaturedArticles, usePublishedArticles, useCategoriesWithCount } from "@/hooks/useArticles";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { data: featuredArticles = [], isLoading: featuredLoading } = useFeaturedArticles(2);
  const { data: latestArticles = [], isLoading: latestLoading } = usePublishedArticles(6);
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesWithCount();

  return (
    <>
      <Helmet>
        <title>Portal Justiça Sem Isenção | Notícias Jurídicas de Angola</title>
        <meta
          name="description"
          content="Sua fonte confiável de informações jurídicas em Angola. Notícias, análises legais, decisões judiciais e orientações sobre direitos do cidadão."
        />
        <meta
          name="keywords"
          content="direito angola, notícias jurídicas, tribunal supremo, legislação angolana, direitos cidadão"
        />
      </Helmet>
      <Layout>
        {/* Hero Banner */}
        <section className="gradient-hero py-12 text-primary-foreground md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl animate-fade-in">
                Informação Jurídica de Qualidade para Angola
              </h1>
              <p className="mt-4 text-base opacity-90 md:text-lg lg:text-xl animate-slide-up">
                Notícias, análises e orientações sobre o mundo do Direito. 
                Credibilidade, transparência e imparcialidade.
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <FeaturedNews articles={featuredArticles} isLoading={featuredLoading} />

        {/* Latest News */}
        <LatestNews articles={latestArticles} isLoading={latestLoading} />

        {/* Categories */}
        <CategorySection categories={categories} isLoading={categoriesLoading} />

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Mantenha-se Informado
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 md:text-base">
                Receba as principais notícias jurídicas de Angola diretamente no seu email.
                Análises exclusivas e atualizações importantes.
              </p>
              <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="flex-1 rounded-lg bg-primary-foreground/10 px-4 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
