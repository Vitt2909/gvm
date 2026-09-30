// PLAQUINHA NFC + QR CODE — pré-venda até SALES_START, página de vendas depois.
// Configuração, textos e datas em src/data/placa.js.
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Store } from "lucide-react";
import { InstagramIcon } from "../components/BrandIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import {
  INSTAGRAM_DIRECT_URL,
  PHASES,
  SALES_START,
  getPlacaFaqs,
  getPlacaPhase,
  phaseCopy,
  placa
} from "../data/placa.js";
import {
  getLeadOrigin,
  isValidWhatsApp,
  normalizeWhatsApp,
  submitPlacaLead
} from "../lib/placaLeads.js";

const PAGE_ID = "placa-page";

/**
 * Fase atual da página.
 *
 * O HTML é pré-renderizado no build com a fase daquele momento e grava essa fase
 * em data-phase. A primeira renderização no navegador lê o mesmo valor, para a
 * hidratação casar; logo depois o efeito aplica a fase pela data real (e troca
 * sozinho se a página estiver aberta na hora da virada).
 */
function usePlacaPhase() {
  const [phase, setPhase] = useState(() => {
    if (typeof document === "undefined") return getPlacaPhase();
    return document.getElementById(PAGE_ID)?.dataset.phase ?? getPlacaPhase();
  });

  useEffect(() => {
    // Prévia: /placa?fase=venda mostra a página de vendas antes da data.
    const override = new URLSearchParams(window.location.search).get("fase");
    if (Object.values(PHASES).includes(override)) {
      setPhase(override);
      return undefined;
    }

    setPhase(getPlacaPhase());

    const wait = Date.parse(SALES_START) - Date.now();
    // setTimeout não aceita mais que ~24 dias; além disso a página será recarregada antes.
    if (wait <= 0 || wait > 2 ** 31 - 1) return undefined;

    const timer = window.setTimeout(() => setPhase(PHASES.sales), wait);
    return () => window.clearTimeout(timer);
  }, []);

  return phase;
}

export default function Placa() {
  const phase = usePlacaPhase();
  const copy = phaseCopy[phase];
  const faqs = getPlacaFaqs(phase);

  return (
    <div id={PAGE_ID} data-phase={phase}>
      <section className="page-intro placa-intro">
        <div className="container page-intro-grid">
          <div className="page-intro-copy">
            <span className="hero-label">{copy.pill} · {placa.name}</span>
            <h1>Facilite as avaliações do <span>seu negócio.</span></h1>
            <p>
              Uma plaquinha de balcão com NFC e QR Code que leva o cliente para avaliar a sua
              empresa no Google. {copy.lead}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#lista">
                <span>{copy.cta}</span>
                <ArrowRight size={18} />
              </a>
              <a className="button button-ghost" href="#como-funciona">
                <span>Como funciona</span>
              </a>
            </div>
          </div>
          <div className="page-intro-panel placa-intro-panel">
            <img
              src={placa.images.black}
              alt="Plaquinha preta de balcão com o convite Nos avalie no Google, QR Code e símbolo de NFC"
              width="720"
              height="1008"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="placa-price-chip">
              <strong>{placa.price}</strong>
              <span>{placa.unit} · {placa.sale}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section placa-section" id="como-funciona">
        <div className="container">
          <SectionHeader
            label="Como funciona"
            title={'Do seu balcão para o <span>Google</span>'}
            text="Sem aplicativo e sem cadastro para o cliente: ele usa a câmera ou o NFC do próprio celular."
          />
          <div className="placa-steps">
            {placa.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="article" key={step.title} delay={i * 80}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div className="icon-box"><Icon size={24} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section soft-section placa-section" id="versoes">
        <div className="container">
          <SectionHeader
            centered
            label="Duas versões"
            title={`${placa.price} <span>${placa.unit}</span>`}
            text="Escolha a cor que combina com o seu balcão. Mesma função, mesmo preço."
          />
          <div className="placa-versions">
            {placa.versions.map((version, i) => (
              <Reveal as="article" key={version.id} delay={i * 100}>
                <img
                  src={placa.images[version.image]}
                  alt={`Plaquinha ${version.title.toLowerCase()} com QR Code e NFC para avaliações no Google`}
                  width="720"
                  height="1008"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>{version.title}</h3>
                  <p>{version.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="ul" className="placa-highlights">
            {placa.highlights.map((item) => {
              const Icon = item.icon;
              return <li key={item.text}><Icon size={18} /> {item.text}</li>;
            })}
            <li><Store size={18} /> {placa.sale}</li>
          </Reveal>
          <p className="placa-disclaimer">Imagens ilustrativas.</p>
        </div>
      </section>

      <section className="section placa-section" id="duvidas">
        <div className="container faq-grid">
          <SectionHeader
            label="Dúvidas frequentes"
            title={'O que perguntam antes de <span>comprar</span>'}
            text="Respostas diretas sobre preço, funcionamento e disponibilidade."
          />
          <div>
            {faqs.map((faq, i) => (
              <Reveal as="details" key={faq.question} delay={i * 60}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </Reveal>
            ))}
            <div className="placa-faq-cta">
              <a className="button button-primary" href="#lista">
                <span>{copy.cta}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section placa-section" id="lista">
        <div className="container contact-grid">
          {/* key: trocar de fase recomeça o formulário com os textos certos */}
          <PlacaForm key={phase} phase={phase} copy={copy} />

          <aside className="contact-aside">
            <div className="help-card">
              <h2>Prefere pelo Instagram?</h2>
              <p>
                Envie <strong>PLACA</strong> no direct da GVM Digital e respondemos por lá.
              </p>
              <a className="button button-outline" href={INSTAGRAM_DIRECT_URL} target="_blank" rel="noreferrer">
                <InstagramIcon size={18} />
                <span>Mandar PLACA no direct</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

const initialForm = {
  nome: "",
  negocio: "",
  whatsapp: "",
  cor: "",
  quantidade: "1",
  observacao: "",
  consentimento: false,
  // Armadilha para robôs: campo invisível que pessoas não preenchem.
  site: ""
};

function PlacaForm({ phase, copy }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | created | duplicate | error

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = {};
    const quantidade = Number(form.quantidade);
    if (form.nome.trim().length < 2)        nextErrors.nome = "Informe seu nome.";
    if (form.negocio.trim().length < 2)     nextErrors.negocio = "Informe o nome do seu negócio.";
    if (!isValidWhatsApp(form.whatsapp))    nextErrors.whatsapp = "Informe um WhatsApp com DDD.";
    if (!form.cor)                          nextErrors.cor = "Escolha uma opção.";
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 50)
                                            nextErrors.quantidade = "De 1 a 50 unidades.";
    if (!form.consentimento)                nextErrors.consentimento = "Precisamos da sua autorização para entrar em contato.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (form.site) {
      setStatus("created");
      return;
    }

    setStatus("sending");
    try {
      const result = await submitPlacaLead({
        fase: phase,
        nome: form.nome.trim(),
        negocio: form.negocio.trim(),
        whatsapp: normalizeWhatsApp(form.whatsapp),
        cor: form.cor,
        quantidade,
        observacao: form.observacao.trim().slice(0, 500) || null,
        origem: getLeadOrigin(),
        consentimento: true
      });
      setStatus(result);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "created" || status === "duplicate") {
    return (
      <div className="contact-form placa-done" role="status">
        <CheckCircle2 size={44} />
        <h2>{status === "created" ? "Tudo certo!" : "Você já está com a gente"}</h2>
        <p>{status === "created" ? copy.success : copy.duplicate}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <SectionHeader label={copy.formLabel} title={copy.formTitle} text={copy.formText} />
      <div className="form-grid">
        <Field label="Seu nome *" error={errors.nome}>
          <input value={form.nome} maxLength={120} onChange={(e) => updateField("nome", e.target.value)} placeholder="Nome completo" autoComplete="name" />
        </Field>
        <Field label="Nome do negócio *" error={errors.negocio}>
          <input value={form.negocio} maxLength={120} onChange={(e) => updateField("negocio", e.target.value)} placeholder="Ex.: Café do Centro" autoComplete="organization" />
        </Field>
        <Field label="WhatsApp *" error={errors.whatsapp}>
          <input type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="(92) 99999-9999" autoComplete="tel" />
        </Field>
        <Field label="Cor *" error={errors.cor}>
          <select value={form.cor} onChange={(e) => updateField("cor", e.target.value)}>
            <option value="">Selecione</option>
            {placa.colorOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Quantidade *" error={errors.quantidade}>
          <input type="number" inputMode="numeric" min="1" max="50" value={form.quantidade} onChange={(e) => updateField("quantidade", e.target.value)} />
        </Field>
        <Field label={copy.notesLabel} wide>
          <textarea value={form.observacao} maxLength={500} onChange={(e) => updateField("observacao", e.target.value)} placeholder={copy.notesPlaceholder} />
        </Field>
        <label className="placa-hp" aria-hidden="true">
          Site
          <input tabIndex={-1} autoComplete="off" value={form.site} onChange={(e) => updateField("site", e.target.value)} />
        </label>
        <label className="placa-consent is-wide">
          <input type="checkbox" checked={form.consentimento} onChange={(e) => updateField("consentimento", e.target.checked)} />
          <span>Autorizo a GVM Digital a guardar estes dados e me chamar no WhatsApp sobre a plaquinha.</span>
          {errors.consentimento ? <small>{errors.consentimento}</small> : null}
        </label>
      </div>
      {status === "error" ? (
        <p className="placa-error" role="alert">
          <AlertCircle size={18} />
          <span>
            Não conseguimos enviar agora. Tente de novo em instantes ou{" "}
            <a href={INSTAGRAM_DIRECT_URL} target="_blank" rel="noreferrer">mande PLACA no direct</a>.
          </span>
        </p>
      ) : null}
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={status === "sending"}>
          <span>{status === "sending" ? "Enviando..." : copy.submit}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, children, wide = false }) {
  return (
    <label className={wide ? "is-wide" : ""}>
      <span>{label}</span>
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
