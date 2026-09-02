// CAMPANHA TEMPORÁRIA — CTA da Home para a oferta Conversão GVM.
// Controlado por CAMPAIGN_ENABLED em src/data/campaign.js. Ver instruções lá.
import { MapPin } from "lucide-react";
import { CAMPAIGN_ENABLED, CAMPAIGN_PATH, campaign } from "../data/campaign.js";
import ButtonLink from "./ButtonLink.jsx";
import Reveal from "./Reveal.jsx";

export default function CampaignBanner({ onNavigate }) {
  if (!CAMPAIGN_ENABLED) return null;

  const { pricing } = campaign;

  return (
    <section className="campaign-banner" aria-labelledby="campaign-banner-title">
      <Reveal className="container campaign-banner-card">
        <div className="campaign-banner-copy">
          <span className="campaign-pill">
            <MapPin size={14} /> Clínicas de estética · Vieiralves e Adrianópolis
          </span>
          <h2 id="campaign-banner-title">
            {campaign.name}: site, WhatsApp e agenda trabalhando juntos pela sua clínica
          </h2>
          <p>
            Condição de lançamento para {pricing.slots} clínicas: {pricing.launch}{pricing.period} com implantação gratuita.
            Vagas limitadas, sem contador e sem letra miúda.
          </p>
        </div>
        <div className="campaign-banner-actions">
          <ButtonLink to={CAMPAIGN_PATH} onNavigate={onNavigate}>Ver a oferta</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
