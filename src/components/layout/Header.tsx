import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/noticias", label: "Notícias" },
  { href: "/categorias", label: "Categorias" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary md:h-10 md:w-10">
            <Scale className="h-5 w-5 text-primary-foreground md:h-6 md:w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold leading-tight text-primary md:text-lg">
              Portal Justiça
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground md:text-xs">
              Sem Isenção
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input
                  type="search"
                  placeholder="Pesquisar notícias..."
                  className="w-64 bg-secondary/50"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Scale className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-display text-lg font-bold text-primary">
                    Portal Justiça
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        location.pathname === link.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="pt-4">
                  <Input
                    type="search"
                    placeholder="Pesquisar notícias..."
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
