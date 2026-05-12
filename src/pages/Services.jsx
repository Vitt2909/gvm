import { CheckCircle2 } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { assets, faqs, plans, processSteps, services } from "../data/content.js";

export default function Services({ onNavigate }) {
  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        title={'Soluções digitais para posicionar melhor o <span>seu negócio</span>'}
        text="Ajudamos empresas a ganhar visibilidade, gerar autoridade e converter mais com estratégia, design e tecnologia."
        image={assets.heroDevices}
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            title={'Serviços para cada etapa do seu <span>crescimento</span>'}
            text="De uma primeira presença online a uma operação digital mais completa, a GVM estrutura o caminho com clareza."
          />
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} compact onNavigate={onNavigate} />
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
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title}>
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
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            centered
            title={'Planos e serviços para cada etapa do seu <span>crescimento</span>'}
            text="Valores de referência para começar com clareza. Projetos sob medida são ajustados após diagnóstico."
          />
          <div className="pricing-grid">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <article className={plan.featured ? "is-featured" : ""} key={plan.name}>
                  {plan.featured ? <span className="choice-label">Mais escolhido</span> : null}
                  <Icon size={34} />
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <strong>{plan.price}</strong>
                  {plan.price !== "Sob consulta" ? <small>à vista</small> : null}
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}><CheckCircle2 size={16} /> {feature}</li>
                    ))}
                  </ul>
                  <ButtonLink to="/contato" onNavigate={onNavigate} variant={plan.featured ? "primary" : "outline"}>
                    {plan.cta}
                  </ButtonLink>
                </article>
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
            title={'Da primeira conversa ao lançamento com <span>processo claro</span>'}
          />
          <div className="process-strip dark">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={25} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
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
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
}
