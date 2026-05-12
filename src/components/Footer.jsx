import { Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons.jsx";
import { assets, navItems, services } from "../data/content.js";

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assets.logoStacked} alt="GVM Digital" />
          <p>Sites, soluções digitais e prospecção de clientes para negócios que querem vender mais.</p>
          <div className="social-row" aria-label="Redes e contato">
            <a href="https://www.instagram.com/gvmdigital_/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="mailto:contato.gvmdigital@gmail.com" aria-label="E-mail"><Mail size={18} /></a>
            <a href="https://wa.me/559284214298" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
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
          <a href="mailto:contato.gvmdigital@gmail.com">contato.gvmdigital@gmail.com</a>
          <a href="https://wa.me/559284214298" target="_blank" rel="noreferrer">+55 (92) 8421-4298</a>
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
