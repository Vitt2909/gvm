import ButtonLink from "../components/ButtonLink.jsx";

export default function NotFound({ onNavigate }) {
  return (
    <section className="hero-section">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="hero-copy-text">
            <span className="hero-label">Erro 404</span>
            <h1>Página não encontrada</h1>
            <p>O endereço que você acessou não existe ou foi removido. Navegue pelo menu ou volte para a home.</p>
          </div>
          <div className="hero-actions">
            <ButtonLink to="/" onNavigate={onNavigate}>Voltar para a Home</ButtonLink>
            <ButtonLink to="/contato" onNavigate={onNavigate} variant="ghost">Falar com a GVM</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
