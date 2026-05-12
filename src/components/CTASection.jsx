import { MessageCircle } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";

export default function CTASection({ onNavigate }) {
  return (
    <section className="cta-band">
      <div className="container cta-grid">
        <div>
          <h2>Pronto para impulsionar sua presença digital e vender mais?</h2>
          <p>Fale com a GVM Digital e receba uma proposta personalizada para o seu negócio.</p>
        </div>
        <div className="cta-actions">
          <a className="button button-whatsapp" href="https://wa.me/?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20GVM%20Digital%20sobre%20um%20projeto." target="_blank" rel="noreferrer">
            <MessageCircle size={19} />
            <span>Falar no WhatsApp</span>
          </a>
          <ButtonLink to="/contato" onNavigate={onNavigate} variant="light">
            Solicitar proposta
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
