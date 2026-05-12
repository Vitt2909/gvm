import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service, onNavigate, compact = false }) {
  const Icon = service.icon;

  return (
    <article className={`service-card ${compact ? "is-compact" : ""}`}>
      <div className="icon-box">
        <Icon size={26} />
      </div>
      <div>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
      </div>
      <button type="button" onClick={() => onNavigate("/servicos")}>
        Saiba mais <ArrowRight size={15} />
      </button>
    </article>
  );
}
