import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCategoriesWithCount } from "@/hooks/useArticles";
import { Scale, Briefcase, Users, BookOpen, Building, UserCheck, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

const categoryIcons: Record<string, React.ReactNode> = {
  "direito-penal": <Scale className="h-8 w-8" />,
  "direito-civil": <BookOpen className="h-8 w-8" />,
  "direito-trabalhista": <Briefcase className="h-8 w-8" />,
  "direito-constitucional": <Building className="h-8 w-8" />,
  "direito-administrativo": <Users className="h-8 w-8" />,
  "direitos-cidadao": <UserCheck className="h-8 w-8" />,
};

const Categorias = () => {
  const { data: categories = [], isLoading } = useCategoriesWithCount();

  return (
    <>
      <Helmet>
        <title>Categorias Jurídicas | Portal Justiça Sem Isenção</title>
        <meta
          name="description"
          content="Explore notícias jurídicas por categoria: Direito Penal, Civil, Trabalhista, Constitucional, Administrativo e Direitos do Cidadão."
        />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="gradient-hero py-10 text-primary-foreground md:py-14">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Categorias Jurídicas
            </h1>
            <p className="mt-2 text-sm opacity-90 md:text-base">
              Explore conteúdos organizados por área do Direito
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-2xl bg-card p-6">
                    <Skeleton className="mb-4 h-14 w-14 rounded-xl" />
                    <Skeleton className="mb-2 h-6 w-32" />
                    <Skeleton className="mb-4 h-4 w-48" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    to={`/categorias/${category.slug}`}
                    className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated animate-slide-up"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {categoryIcons[category.slug] || <BookOpen className="h-8 w-8" />}
                    </div>
                    <h2 className="mb-2 font-display text-xl font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {category.articleCount} artigos
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Categorias;
