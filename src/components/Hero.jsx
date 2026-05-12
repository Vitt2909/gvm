import { ArrowRight, BadgeCheck, BarChart3, Globe2, Target } from "lucide-react";
import { assets } from "../data/content.js";
import ButtonLink from "./ButtonLink.jsx";

const heroProof = [
  { label: "Estratégia", text: "Planejamento orientado a dados", icon: Target },
  { label: "Performance", text: "Execução com foco em conversão", icon: BarChart3 },
  { label: "Resultados", text: "Métricas e relatórios que importam", icon: Globe2 }
];

export default function Hero({ onNavigate, compact = false, label, title, text, visual = true, children }) {
  return (
    <section className={`hero-section ${compact ? "is-compact" : ""}`}>
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="hero-copy-text">
            {label ? <span className="hero-label">{label}</span> : null}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <p>{text}</p>
          </div>
          {children ? (
            children
          ) : (
            <div className="hero-actions">
              <ButtonLink to="/contato" onNavigate={onNavigate}>Solicitar proposta</ButtonLink>
              <ButtonLink to="/servicos" onNavigate={onNavigate} variant="ghost">
                Ver serviços
              </ButtonLink>
            </div>
          )}

          <div className="hero-proof">
            <BadgeCheck size={18} />
            <span>Compromisso com presença digital, transparência e crescimento.</span>
          </div>
        </div>

        {visual ? (
          <div className="hero-visual-wrap">
            <div className="hero-geometry geometry-one" />
            <img className="hero-devices" src={assets.heroDevices} alt="Mockup de site e painel GVM Digital" />
            <div className="floating-card lead-card">
              <span>Leads prontos</span>
              <strong>+127%</strong>
              <ArrowRight size={16} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="container hero-proof-row">
        {heroProof.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label}>
              <Icon size={22} />
              <div>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
