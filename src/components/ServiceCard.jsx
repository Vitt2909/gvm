import { ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal.js";

export default function ServiceCard({ service, onNavigate, compact = false, delay = 0 }) {
  const { ref, revealClass, revealStyle } = useReveal(delay);
  const Icon = service.icon;

  return (
    <article ref={ref} className={`service-card ${compact ? "is-compact" : ""} ${revealClass}`} style={revealStyle}>
      <div className="icon-box">
        <Icon size={26} />
      </div>
      <div>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
      </div>
      <button type="button" onClick={() => onNavigate("/servicos")}>
        <span>Saiba mais</span> <ArrowRight size={15} />
      </button>
    </article>
  );
}
