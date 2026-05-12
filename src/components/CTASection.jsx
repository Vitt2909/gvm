import ButtonLink from "./ButtonLink.jsx";
import Reveal from "./Reveal.jsx";
import { WhatsAppIcon } from "./BrandIcons.jsx";

export default function CTASection({ onNavigate }) {
  return (
    <section className="cta-band">
      <div className="container cta-grid">
        <Reveal>
          <h2>Pronto para impulsionar sua presença digital e vender mais?</h2>
          <p>Fale com a GVM Digital e receba uma proposta personalizada para o seu negócio.</p>
        </Reveal>
        <Reveal className="cta-actions" delay={100}>
          <a className="button button-whatsapp" href="https://wa.me/559284214298?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20GVM%20Digital%20sobre%20um%20projeto." target="_blank" rel="noreferrer">
            <WhatsAppIcon size={19} />
            <span>Falar no WhatsApp</span>
          </a>
          <ButtonLink to="/contato" onNavigate={onNavigate} variant="light">
            Solicitar proposta
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
