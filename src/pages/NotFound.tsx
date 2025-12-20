import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="font-display text-6xl font-bold text-primary md:text-8xl">
          404
        </h1>
        <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
          Página não encontrada
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button asChild className="mt-8">
          <Link to="/" className="gap-2">
            <Home className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
