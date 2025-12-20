export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Direito Penal",
    slug: "direito-penal",
    description: "Notícias sobre crimes, penas e processos criminais",
    articleCount: 45,
  },
  {
    id: "2",
    name: "Direito Civil",
    slug: "direito-civil",
    description: "Contratos, família, sucessões e obrigações",
    articleCount: 38,
  },
  {
    id: "3",
    name: "Direito Trabalhista",
    slug: "direito-trabalhista",
    description: "Relações de trabalho e direitos laborais",
    articleCount: 32,
  },
  {
    id: "4",
    name: "Direito Constitucional",
    slug: "direito-constitucional",
    description: "Constituição, direitos fundamentais e organização do Estado",
    articleCount: 28,
  },
  {
    id: "5",
    name: "Direito Administrativo",
    slug: "direito-administrativo",
    description: "Administração pública e serviços governamentais",
    articleCount: 24,
  },
  {
    id: "6",
    name: "Direitos do Cidadão",
    slug: "direitos-cidadao",
    description: "Informações sobre direitos e deveres dos cidadãos",
    articleCount: 56,
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Tribunal Supremo Estabelece Novo Precedente em Matéria de Direitos Fundamentais",
    excerpt: "Decisão histórica reforça garantias constitucionais e estabelece diretrizes para casos futuros envolvendo liberdades individuais em Angola.",
    content: "O Tribunal Supremo de Angola proferiu uma decisão que marca um novo capítulo na jurisprudência nacional...",
    category: "Direito Constitucional",
    author: "Dr. António Fernandes",
    publishedAt: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    featured: true,
    tags: ["Tribunal Supremo", "Direitos Fundamentais", "Jurisprudência"],
  },
  {
    id: "2",
    title: "Nova Lei do Trabalho Entra em Vigor com Mudanças Significativas",
    excerpt: "Alterações incluem novos direitos para trabalhadores e regras mais claras sobre contratos temporários e demissões.",
    content: "A partir deste mês, entra em vigor a nova legislação trabalhista que promete modernizar as relações de trabalho...",
    category: "Direito Trabalhista",
    author: "Dra. Maria Santos",
    publishedAt: "2024-01-14",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    featured: true,
    tags: ["Lei do Trabalho", "Direitos Laborais", "Legislação"],
  },
  {
    id: "3",
    title: "Tribunal Provincial de Luanda Julga Caso de Grande Repercussão",
    excerpt: "Processo envolve questões complexas de direito penal económico e aguarda sentença que pode criar precedente.",
    content: "O Tribunal Provincial de Luanda deu início ao julgamento de um dos casos mais complexos dos últimos anos...",
    category: "Direito Penal",
    author: "Dr. José Cardoso",
    publishedAt: "2024-01-13",
    imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80",
    tags: ["Tribunal Provincial", "Direito Penal", "Julgamento"],
  },
  {
    id: "4",
    title: "Guia Completo: Como Registar uma Empresa em Angola",
    excerpt: "Passo a passo detalhado sobre os procedimentos legais necessários para constituir uma sociedade comercial.",
    content: "O processo de registo de uma empresa em Angola envolve várias etapas que devem ser cumpridas com rigor...",
    category: "Direito Civil",
    author: "Dra. Ana Luísa Mendes",
    publishedAt: "2024-01-12",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    tags: ["Registo Empresarial", "Sociedades", "Guia Prático"],
  },
  {
    id: "5",
    title: "Direitos do Consumidor: O Que Fazer em Caso de Produto Defeituoso",
    excerpt: "Especialistas explicam os passos legais para reclamar e obter ressarcimento quando um produto não atende às expectativas.",
    content: "Quando um produto apresenta defeitos, o consumidor angolano tem direitos garantidos por lei...",
    category: "Direitos do Cidadão",
    author: "Dr. Pedro Neto",
    publishedAt: "2024-01-11",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["Direitos do Consumidor", "Reclamação", "Defesa do Consumidor"],
  },
  {
    id: "6",
    title: "Concurso Público: Novas Regras para Contratação de Servidores",
    excerpt: "Governo anuncia alterações nos procedimentos de seleção para cargos públicos visando maior transparência.",
    content: "As novas regras para concursos públicos em Angola trazem mudanças importantes no processo de seleção...",
    category: "Direito Administrativo",
    author: "Dra. Carla Ferreira",
    publishedAt: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    tags: ["Concurso Público", "Administração Pública", "Contratação"],
  },
  {
    id: "7",
    title: "Análise: Impacto das Recentes Reformas no Sistema Judicial Angolano",
    excerpt: "Especialistas avaliam as mudanças implementadas e seus efeitos na celeridade processual e acesso à justiça.",
    content: "As reformas judiciais implementadas nos últimos meses começam a mostrar resultados significativos...",
    category: "Direito Constitucional",
    author: "Dr. António Fernandes",
    publishedAt: "2024-01-09",
    imageUrl: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&q=80",
    tags: ["Reforma Judicial", "Sistema de Justiça", "Análise"],
  },
  {
    id: "8",
    title: "Herança e Sucessões: Entenda Seus Direitos",
    excerpt: "Advogado especialista esclarece dúvidas comuns sobre partilha de bens e testamentos no direito angolano.",
    content: "O tema das heranças e sucessões gera muitas dúvidas entre os cidadãos angolanos...",
    category: "Direito Civil",
    author: "Dr. Manuel Costa",
    publishedAt: "2024-01-08",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    tags: ["Herança", "Sucessões", "Testamento"],
  },
];

export const getFeaturedArticles = () => articles.filter(a => a.featured);
export const getLatestArticles = (limit: number = 6) => articles.slice(0, limit);
export const getArticlesByCategory = (categorySlug: string) => 
  articles.filter(a => a.category.toLowerCase().replace(/ /g, '-') === categorySlug);
export const getArticleById = (id: string) => articles.find(a => a.id === id);
