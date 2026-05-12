import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { assets, navItems, services } from "../data/content.js";

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assets.logoStacked} alt="GVM Digital" />
          <p>Sites, soluções digitais e prospecção de clientes para negócios que querem vender mais.</p>
          <div className="social-row" aria-label="Redes e contato">
            <span><Instagram size={18} /></span>
            <span><Linkedin size={18} /></span>
            <span><Mail size={18} /></span>
            <span><MessageCircle size={18} /></span>
          </div>
        </div>

        <div>
          <h3>Navegação</h3>
          {navItems.slice(1).map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h3>Serviços</h3>
          {services.slice(0, 5).map((service) => (
            <a
              key={service.title}
              href="/servicos"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/servicos");
              }}
            >
              {service.title}
            </a>
          ))}
        </div>

        <div className="footer-contact">
          <h3>Contato</h3>
          <p>contato@gvmdigital.com.br</p>
          <p>WhatsApp oficial</p>
          <p>Atendimento online para todo o Brasil</p>
          <button type="button" onClick={() => onNavigate("/contato")}>
            Solicitar proposta
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 GVM Digital. Todos os direitos reservados.</span>
        <span>Estratégia, tecnologia e presença digital.</span>
      </div>
    </footer>
  );
}
