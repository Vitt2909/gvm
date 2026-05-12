import { Menu, X } from "lucide-react";
import { useState } from "react";
import { assets, navItems } from "../data/content.js";
import NavLink from "./NavLink.jsx";

export default function Header({ currentPath, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => {
    setMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a
          href="/"
          className="brand-link"
          aria-label="GVM Digital"
          onClick={(event) => {
            event.preventDefault();
            goTo("/");
          }}
        >
          <img src={assets.logoHorizontal} alt="GVM Digital" />
        </a>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} currentPath={currentPath} onNavigate={goTo}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta-wrap desktop-only">
          <NavLink to="/contato" currentPath={currentPath} onNavigate={goTo} className="nav-cta">
            Solicitar proposta
          </NavLink>
          <span className="nav-cta-sub">Resposta em 24h</span>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
