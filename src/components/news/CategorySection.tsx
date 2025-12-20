import { Link } from "react-router-dom";
import { ArrowRight, Scale, Briefcase, Users, BookOpen, Building, UserCheck } from "lucide-react";
import { Category } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface CategorySectionProps {
  categories: (Category & { articleCount: number })[];
  isLoading?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "direito-penal": <Scale className="h-6 w-6" />,
  "direito-civil": <BookOpen className="h-6 w-6" />,
  "direito-trabalhista": <Briefcase className="h-6 w-6" />,
  "direito-constitucional": <Building className="h-6 w-6" />,
  "direito-administrativo": <Users className="h-6 w-6" />,
  "direitos-cidadao": <UserCheck className="h-6 w-6" />,
};

export function CategorySection({ categories, isLoading }: CategorySectionProps) {
  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Categorias Jurídicas
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Explore conteúdos por área do Direito
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-card p-5">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-2 h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/categorias/${category.slug}`}
                className="group flex items-center gap-4 rounded-xl bg-card p-5 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {categoryIcons[category.slug] || <BookOpen className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.articleCount} artigos
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
