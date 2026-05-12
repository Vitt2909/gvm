import { ArrowRight } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";

export default function PageIntro({ title, text, label, onNavigate, image, children, ctaLabel = "Solicitar proposta", secondaryCta, hideCta = false }) {
  return (
    <section className="page-intro">
      <div className="container page-intro-grid">
        <div className="page-intro-copy">
          {label ? <span className="hero-label">{label}</span> : null}
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p>{text}</p>
          {!hideCta ? (
            <div className="hero-actions">
              <ButtonLink to="/contato" onNavigate={onNavigate}>{ctaLabel}</ButtonLink>
              {secondaryCta ? (
                secondaryCta.external
                  ? <a className="button button-ghost" href={secondaryCta.href} target="_blank" rel="noreferrer"><span>{secondaryCta.label}</span><ArrowRight size={18} /></a>
                  : <ButtonLink to={secondaryCta.href} onNavigate={onNavigate} variant="ghost">{secondaryCta.label}</ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="page-intro-panel">
          {image ? <img src={image} alt="" /> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
