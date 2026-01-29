import { Helmet } from "react-helmet-async";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePublishedArticles, useCategories, useAuthors } from "@/hooks/useArticles";
import { FileText, FolderOpen, Users, Eye } from "lucide-react";

export default function AdminDashboard() {
  const { data: articles = [] } = usePublishedArticles();
  const { data: categories = [] } = useCategories();
  const { data: authors = [] } = useAuthors();

  const stats = [
    {
      title: "Total de Artigos",
      value: articles.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Autores",
      value: authors.length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Artigos em Destaque",
      value: articles.filter((a) => a.featured).length,
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin | Angola News</title>
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do seu portal de notícias
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Últimos Artigos</CardTitle>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Nenhum artigo publicado ainda.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {articles.slice(0, 5).map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div className="truncate flex-1 mr-4">
                          <p className="font-medium truncate">{article.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {article.category?.name || "Sem categoria"}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            article.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {article.published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                {categories.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Nenhuma categoria criada ainda.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {category.slug}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
