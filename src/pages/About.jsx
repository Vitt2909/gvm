import { CheckCircle2 } from "lucide-react";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { LinkedInIcon } from "../components/BrandIcons.jsx";
import { assets, founders, processSteps } from "../data/content.js";

export default function About({ onNavigate }) {
  const values = [
    "Transparência em cada decisão",
    "Comprometimento com entrega",
    "Excelência técnica e visual",
    "Foco no crescimento do cliente"
  ];

  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        label="Sobre nós"
        title={'Sobre a <span>GVM Digital</span>'}
        text="Somos um estúdio digital liderado por fundadores, especializado em criar presença online, gerar autoridade e impulsionar o crescimento de negócios."
        image={assets.office}
      />

      <section className="section">
        <div className="container split-section">
          <div>
            <SectionHeader
              title={'Um estúdio digital liderado por <span>fundadores.</span>'}
              text="Atuamos lado a lado com nossos clientes, unindo estratégia, design, tecnologia e dados para construir projetos claros, eficientes e prontos para crescer."
            />
          </div>
          <Reveal className="copy-panel" delay={120}>
            <p>Aqui você não fala com intermediários: você fala com quem pensa, decide e executa.</p>
            <p>Isso torna o processo mais próximo, rápido e responsável, com cada entrega conectada ao objetivo real do negócio.</p>
          </Reveal>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionHeader
            centered
            title={'Nossa história em <span>movimento</span>'}
            text="A GVM nasce da prática: construir, validar, melhorar e transformar soluções digitais em presença profissional."
          />
          <div className="timeline">
            {["A ideia nasce", "Primeiros projetos próprios", "Estruturação da GVM Digital", "Expansão e próximos clientes"].map((item, index) => (
              <Reveal as="article" key={item} delay={index * 80}>
                <span>{index + 1}</span>
                <h3>{item}</h3>
                <p>
                  {index === 0 && "Identificamos a necessidade de soluções digitais mais estratégicas e eficientes para empresas que querem crescer."}
                  {index === 1 && "Construímos projetos para validar método, processos e ferramentas com qualidade real de entrega."}
                  {index === 2 && "Formalizamos processos, metodologia e um padrão visual consistente para escalar a operação."}
                  {index === 3 && "Iniciamos parcerias de longo prazo com clientes que querem crescer com estratégia e presença digital."}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pillars-grid">
          {[
            ["Missão", "Ajudar empresários a conquistarem presença digital estratégica e resultados consistentes."],
            ["Visão", "Ser referência em soluções digitais para pequenas e médias empresas no Brasil."],
            ["Valores", "Transparência, comprometimento, excelência técnica e foco no cliente."]
          ].map(([title, text], i) => (
            <Reveal as="article" key={title} delay={i * 80}>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {values.slice(0, 2).map((value) => (
                  <li key={value}><CheckCircle2 size={17} /> {value}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionHeader
            invert
            centered
            title={'Nosso processo é direto, claro e <span>orientado a resultado</span>'}
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
        <div className="container">
          <SectionHeader
            title={'Nossos <span>fundadores</span>'}
            text="Uma operação enxuta, próxima e com responsabilidade direta sobre cada projeto."
          />
          <div className="founders-grid">
            {founders.map((founder, i) => (
              <Reveal as="article" key={founder.name} delay={i * 80}>
                <img src={founder.image} alt={founder.name} />
                <div>
                  <h3>{founder.name}</h3>
                  <strong>{founder.role}</strong>
                  <p>{founder.text}</p>
                  <a href={founder.linkedin} target="_blank" rel="noreferrer" className="founder-linkedin" aria-label={`LinkedIn de ${founder.name}`}>
                    <LinkedInIcon size={16} /> LinkedIn
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
    </>
  );
}
