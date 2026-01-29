import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Noticias from "./pages/Noticias";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Categorias from "./pages/Categorias";
import CategoriaDetalhe from "./pages/CategoriaDetalhe";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminArtigos from "./pages/admin/Artigos";
import ArtigoForm from "./pages/admin/ArtigoForm";
import AdminCategorias from "./pages/admin/Categorias";
import AdminAutores from "./pages/admin/Autores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:slug" element={<CategoriaDetalhe />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/artigos" element={<ProtectedRoute><AdminArtigos /></ProtectedRoute>} />
              <Route path="/admin/artigos/novo" element={<ProtectedRoute><ArtigoForm /></ProtectedRoute>} />
              <Route path="/admin/artigos/:id" element={<ProtectedRoute><ArtigoForm /></ProtectedRoute>} />
              <Route path="/admin/categorias" element={<ProtectedRoute><AdminCategorias /></ProtectedRoute>} />
              <Route path="/admin/autores" element={<ProtectedRoute><AdminAutores /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
