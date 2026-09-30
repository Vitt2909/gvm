// Chamada da Home para a plaquinha NFC + QR Code. Some com PLACA_ENABLED = false.
import { Nfc } from "lucide-react";
import { PLACA_ENABLED, PLACA_PATH, placa } from "../data/placa.js";
import ButtonLink from "./ButtonLink.jsx";
import Reveal from "./Reveal.jsx";

export default function PlacaBanner({ onNavigate }) {
  if (!PLACA_ENABLED) return null;

  // Texto igual nas duas fases: o banner é pré-renderizado e não depende da data.
  return (
    <section className="placa-banner" aria-labelledby="placa-banner-title">
      <Reveal className="container placa-banner-card">
        <img src={placa.images.white} alt="" width="720" height="1008" loading="lazy" decoding="async" />
        <div className="placa-banner-copy">
          <span className="placa-pill"><Nfc size={14} /> Novo · {placa.name}</span>
          <h2 id="placa-banner-title">Facilite as avaliações do seu negócio no Google</h2>
          <p>
            Plaquinha de balcão com NFC e QR Code: o cliente aproxima o celular ou aponta a câmera
            e já cai na sua página de avaliações. {placa.price} {placa.unit}.
          </p>
        </div>
        <div className="placa-banner-actions">
          <ButtonLink to={PLACA_PATH} onNavigate={onNavigate}>Conhecer a plaquinha</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
