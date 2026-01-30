import { Link } from "react-router-dom";
import { Scale, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useCategories } from "@/hooks/useArticles";

const portalLinks = [
  { href: "/sobre", label: "Sobre o Portal" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-privacidade", label: "Política de Privacidade" },
];

export function Footer() {
  const { data: categories = [] } = useCategories();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Scale className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold leading-tight">
                  Portal Justiça
                </span>
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                  Sem Isenção
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Sua fonte confiável de informações jurídicas em Angola. 
              Notícias, análises e orientações sobre o mundo do Direito.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Portal Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">
              O Portal
            </h3>
            <ul className="space-y-2">
              {portalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - Dynamic */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categorias/${category.slug}`}
                    className="text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mb-4 text-sm opacity-80">
              Receba as principais notícias jurídicas diretamente no seu email.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="rounded-lg bg-primary-foreground/10 px-4 py-2.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary-foreground px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-center text-sm opacity-70">
            © {new Date().getFullYear()} Portal Justiça Sem Isenção. Todos os direitos reservados.
          </p>
          <p className="text-center text-sm opacity-70">
            Angola • Informação Jurídica de Qualidade
          </p>
        </div>
      </div>
    </footer>
  );
}
