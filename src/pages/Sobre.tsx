import { Layout } from "@/components/layout/Layout";
import { Scale, Target, Eye, Users, Award, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Sobre = () => {
  return (
    <>
      <Helmet>
        <title>Sobre o Portal | Portal Justiça Sem Isenção</title>
        <meta
          name="description"
          content="Conheça o Portal Justiça Sem Isenção, sua fonte confiável de informações jurídicas em Angola. Nossa missão é promover o acesso à informação jurídica de qualidade."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="gradient-hero py-16 text-primary-foreground md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Sobre o Portal Justiça Sem Isenção
              </h1>
              <p className="mt-4 text-base opacity-90 md:text-lg">
                Sua fonte confiável de informações jurídicas em Angola desde 2024
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Mission */}
                <div className="rounded-2xl bg-card p-6 shadow-card md:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="mb-3 font-display text-xl font-bold">Nossa Missão</h2>
                  <p className="text-muted-foreground">
                    Promover o acesso à informação jurídica de qualidade para todos os 
                    cidadãos angolanos, contribuindo para uma sociedade mais justa e 
                    informada sobre seus direitos e deveres.
                  </p>
                </div>

                {/* Vision */}
                <div className="rounded-2xl bg-card p-6 shadow-card md:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="mb-3 font-display text-xl font-bold">Nossa Visão</h2>
                  <p className="text-muted-foreground">
                    Ser reconhecido como o principal portal de notícias jurídicas de 
                    Angola, referência em credibilidade, imparcialidade e qualidade 
                    de informação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-center font-display text-2xl font-bold md:text-3xl">
              Nossos Valores
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Credibilidade",
                  description:
                    "Compromisso com a veracidade e precisão das informações publicadas.",
                },
                {
                  icon: <Scale className="h-6 w-6" />,
                  title: "Imparcialidade",
                  description:
                    "Cobertura equilibrada e sem viés político ou ideológico.",
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Acessibilidade",
                  description:
                    "Linguagem clara e acessível para todos os públicos.",
                },
                {
                  icon: <Award className="h-6 w-6" />,
                  title: "Excelência",
                  description:
                    "Busca constante pela qualidade em tudo que fazemos.",
                },
                {
                  icon: <Eye className="h-6 w-6" />,
                  title: "Transparência",
                  description:
                    "Clareza nas fontes e processos de apuração das notícias.",
                },
                {
                  icon: <Target className="h-6 w-6" />,
                  title: "Responsabilidade",
                  description:
                    "Compromisso social com a educação jurídica da população.",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-xl bg-card p-6 shadow-soft transition-all hover:shadow-card animate-slide-up"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
                Nossa Equipe
              </h2>
              <p className="text-muted-foreground">
                O Portal Justiça Sem Isenção é composto por uma equipe de 
                profissionais qualificados, incluindo jornalistas especializados 
                em cobertura jurídica, advogados consultores e especialistas em 
                comunicação digital. Juntos, trabalhamos para levar informação 
                jurídica de qualidade a todo o território angolano.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 font-display text-2xl font-bold">
                Entre em Contato
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tem sugestões, dúvidas ou deseja colaborar com o portal? 
                Entre em contato connosco.
              </p>
              <a
                href="/contato"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Fale Connosco
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Sobre;
