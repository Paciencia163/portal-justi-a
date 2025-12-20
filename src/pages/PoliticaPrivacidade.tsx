import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const PoliticaPrivacidade = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Portal Justiça Sem Isenção</title>
        <meta
          name="description"
          content="Política de Privacidade do Portal Justiça Sem Isenção. Saiba como coletamos, usamos e protegemos suas informações pessoais."
        />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="gradient-hero py-10 text-primary-foreground md:py-14">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Política de Privacidade
            </h1>
            <p className="mt-2 text-sm opacity-90 md:text-base">
              Última atualização: Janeiro de 2024
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="prose prose-lg mx-auto max-w-4xl">
              <h2>1. Introdução</h2>
              <p>
                O Portal Justiça Sem Isenção ("nós", "nosso" ou "Portal") está 
                comprometido em proteger a privacidade dos nossos usuários. Esta 
                Política de Privacidade explica como coletamos, usamos, divulgamos 
                e protegemos suas informações quando você visita nosso website.
              </p>

              <h2>2. Informações que Coletamos</h2>
              <p>Podemos coletar as seguintes informações:</p>
              <ul>
                <li>
                  <strong>Informações pessoais:</strong> nome, endereço de email, 
                  telefone e outras informações que você fornece voluntariamente 
                  ao preencher formulários em nosso site.
                </li>
                <li>
                  <strong>Informações de uso:</strong> dados sobre como você 
                  interage com nosso site, incluindo páginas visitadas, tempo de 
                  permanência e ações realizadas.
                </li>
                <li>
                  <strong>Informações técnicas:</strong> endereço IP, tipo de 
                  navegador, dispositivo utilizado e sistema operacional.
                </li>
              </ul>

              <h2>3. Como Usamos Suas Informações</h2>
              <p>Utilizamos as informações coletadas para:</p>
              <ul>
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Enviar newsletters e atualizações (com seu consentimento)</li>
                <li>Responder a suas perguntas e solicitações</li>
                <li>Analisar o uso do site para melhorias</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2>4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais 
                com terceiros, exceto:
              </p>
              <ul>
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>
                  Com prestadores de serviços que nos auxiliam na operação do site 
                  (sob acordos de confidencialidade)
                </li>
              </ul>

              <h2>5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para 
                proteger suas informações pessoais contra acesso não autorizado, 
                alteração, divulgação ou destruição.
              </p>

              <h2>6. Cookies</h2>
              <p>
                Nosso site utiliza cookies para melhorar sua experiência de navegação. 
                Você pode configurar seu navegador para recusar cookies, mas isso pode 
                afetar algumas funcionalidades do site.
              </p>

              <h2>7. Seus Direitos</h2>
              <p>Você tem o direito de:</p>
              <ul>
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Retirar seu consentimento a qualquer momento</li>
                <li>Receber suas informações em formato portável</li>
              </ul>

              <h2>8. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para cumprir 
                os propósitos descritos nesta política, a menos que um período de 
                retenção mais longo seja exigido por lei.
              </p>

              <h2>9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Notificaremos sobre alterações significativas publicando a nova 
                política nesta página.
              </p>

              <h2>10. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em 
                contato connosco:
              </p>
              <ul>
                <li>Email: privacidade@justicasemisencao.ao</li>
                <li>Telefone: +244 947 408 021</li>
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PoliticaPrivacidade;
