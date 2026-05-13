import { useMemo, useState } from "react";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { assets, projects, proofPoints } from "../data/content.js";

const filters = ["Todos", "Sistemas", "Plataformas", "Protótipos", "Automação"];

export default function Portfolio({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filteredProjects = useMemo(
    () => activeFilter === "Todos" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        label="Portfólio"
        title={'Projetos internos, estudos e trabalhos <span>digitais</span>'}
        text="Uma seleção de projetos desenvolvidos para testar ideias, validar soluções e demonstrar capacidade técnica na prática."
        image={assets.projects.gvm}
        ctaLabel="Quero um projeto"
      />

      <section className="section">
        <div className="container">
          <div className="section-row">
            <SectionHeader
              title={'Projetos desenvolvidos com estratégia e foco em <span>resultados</span>'}
              text="Cada card mostra uma direção de solução que a GVM pode adaptar para o seu negócio."
            />
            <div className="filter-pills" aria-label="Filtros do portfólio">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={activeFilter === filter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} onNavigate={onNavigate} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionHeader
            centered
            title={'O que esse portfólio <span>demonstra</span>'}
            text="Mais do que imagens bonitas, os projetos mostram capacidade de planejar, criar e entregar soluções digitais."
          />
          <div className="proof-grid">
            {proofPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="article" key={item.title} delay={i * 80}>
                  <Icon size={26} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
}
