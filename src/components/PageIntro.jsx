import ButtonLink from "./ButtonLink.jsx";

export default function PageIntro({ title, text, onNavigate, image, children, ctaLabel = "Solicitar proposta" }) {
  return (
    <section className="page-intro">
      <div className="container page-intro-grid">
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p>{text}</p>
          <div className="hero-actions">
            <ButtonLink to="/contato" onNavigate={onNavigate}>{ctaLabel}</ButtonLink>
            <ButtonLink to="/servicos" onNavigate={onNavigate} variant="ghost">Ver serviços</ButtonLink>
          </div>
        </div>
        <div className="page-intro-panel">
          {image ? <img src={image} alt="" /> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
