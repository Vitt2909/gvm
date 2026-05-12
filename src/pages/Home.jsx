import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import CTASection from "../components/CTASection.jsx";
import Hero from "../components/Hero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { assets, processSteps, projects, proofPoints, services } from "../data/content.js";

export default function Home({ onNavigate }) {
  return (
    <>
      <Hero
        onNavigate={onNavigate}
        title={'Presença digital profissional para negócios que querem <span>vender mais.</span>'}
        text="Criamos sites, landing pages e soluções digitais que fortalecem sua presença online, geram autoridade e abrem caminho para mais oportunidades."
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            title={'Soluções digitais que <span>impulsionam</span> seu negócio'}
            text="Tudo que sua empresa precisa para aparecer melhor, comunicar valor e transformar interesse em oportunidade."
          />
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="brand-proof-section">
        <div className="container brand-proof-grid">
          <div>
            <SectionHeader
              invert
              title={'Por que empresas escolhem a <span>GVM Digital</span>'}
              text="Unimos posicionamento, design e tecnologia para construir uma presença digital que parece profissional e trabalha por resultados."
            />
            <ul className="check-list">
              <li><CheckCircle2 size={18} /> Estratégias alinhadas aos seus objetivos</li>
              <li><CheckCircle2 size={18} /> Projetos claros, organizados e mensuráveis</li>
              <li><CheckCircle2 size={18} /> Foco em performance, conversão e confiança</li>
              <li><CheckCircle2 size={18} /> Acompanhamento próximo e relatórios reais</li>
            </ul>
          </div>
          <img className="brand-symbol" src={assets.symbol} alt="" aria-hidden="true" />
          <div className="proof-mini-grid">
            {proofPoints.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon size={22} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            title={'Como transformamos presença digital em <span>crescimento</span>'}
            text="Um processo simples, consultivo e organizado para sair da ideia e chegar em uma entrega profissional."
          />
          <div className="process-strip">
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

      <section className="section portfolio-preview">
        <div className="container">
          <div className="section-row">
            <SectionHeader
              title={'Projetos que geram <span>resultados</span>'}
              text="Cases, protótipos e soluções internas que demonstram nossa capacidade técnica e criativa."
            />
            <ButtonLink to="/portfolio" onNavigate={onNavigate} variant="outline">Ver todos</ButtonLink>
          </div>
          <div className="project-grid compact">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="section asset-section">
        <div className="container asset-grid">
          <div>
            <SectionHeader
              title={'Uma marca digital com presença <span>memorável</span>'}
              text="A identidade da GVM combina azul profundo, contraste, ícones precisos e geometria angular para criar uma experiência forte em todos os pontos de contato."
            />
            <button className="text-action" type="button" onClick={() => onNavigate("/sobre")}>
              Conhecer a GVM <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="brand-board">
            <img src={assets.logoHorizontal} alt="Logo GVM Digital" />
            <div className="color-line">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>Estratégia. Performance. Resultados.</p>
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
}
