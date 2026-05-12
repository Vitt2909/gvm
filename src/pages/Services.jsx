import { CheckCircle2, FileCheck, MessageCircle, Search } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { assets, faqs, processSteps, services } from "../data/content.js";

export default function Services({ onNavigate }) {
  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        label="Nossos Serviços"
        title={'Soluções digitais para posicionar melhor o <span>seu negócio</span>'}
        text="Ajudamos empresas a ganhar visibilidade, gerar autoridade e converter mais com estratégia, design e tecnologia."
        image={assets.heroDevices}
        secondaryCta={{ label: "Falar no WhatsApp", href: "https://wa.me/559284214298?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20GVM%20Digital%20sobre%20um%20projeto.", external: true }}
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            title={'Serviços para cada etapa do seu <span>crescimento</span>'}
            text="De uma primeira presença online a uma operação digital mais completa, a GVM estrutura o caminho com clareza."
          />
          <div className="services-grid">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} compact onNavigate={onNavigate} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionHeader
            centered
            title={'Nossos serviços em <span>detalhes</span>'}
            text="Cada entrega combina estratégia, design e execução técnica para criar valor real para sua empresa."
          />
          <div className="service-detail-grid">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal as="article" key={service.title} delay={i * 80}>
                  <Icon size={26} />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <ul>
                      {service.details.map((detail) => (
                        <li key={detail}><CheckCircle2 size={16} /> {detail}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionHeader
            invert
            centered
            label="Sem pacotes. Sem tabela."
            title={'Cada projeto começa com uma <span>conversa real</span>'}
            text="Não acreditamos em soluções prontas. Cada negócio tem um contexto único — e é isso que a gente quer entender antes de propor qualquer coisa."
          />
          <div className="journey-grid">
            <Reveal as="article" delay={0}>
              <span className="journey-num">01</span>
              <MessageCircle size={26} />
              <h3>Você conta</h3>
              <p>Compartilhe seus objetivos, desafios e o que espera alcançar. Sem formulário longo — só uma conversa direta com quem vai executar.</p>
            </Reveal>
            <Reveal as="article" delay={100}>
              <span className="journey-num">02</span>
              <Search size={26} />
              <h3>A gente mapeia</h3>
              <p>Analisamos seu cenário, identificamos as melhores soluções e estruturamos um plano claro com escopo, prazo e entregas definidas.</p>
            </Reveal>
            <Reveal as="article" delay={200}>
              <span className="journey-num">03</span>
              <FileCheck size={26} />
              <h3>Você decide</h3>
              <p>Recebe uma proposta personalizada, sem surpresas. Só avançamos quando você estiver seguro e alinhado com cada detalhe.</p>
            </Reveal>
          </div>
          <div className="journey-cta">
            <ButtonLink to="/contato" onNavigate={onNavigate}>Solicitar diagnóstico gratuito</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionHeader
            invert
            centered
            title={'Da primeira conversa ao lançamento com <span>processo claro</span>'}
          />
          <div className="process-strip dark">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="article" key={step.title} delay={i * 80}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <Icon size={25} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <SectionHeader
            title={'Dúvidas comuns antes de <span>começar</span>'}
            text="Respostas diretas para facilitar sua decisão."
          />
          <div>
            {faqs.map((faq, i) => (
              <Reveal as="details" key={faq.question} delay={i * 60}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
}
