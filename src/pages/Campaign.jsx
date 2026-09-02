// CAMPANHA TEMPORÁRIA — landing page da oferta Conversão GVM.
// Rota registrada em App.jsx apenas quando CAMPAIGN_ENABLED (src/data/campaign.js).
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { WhatsAppIcon } from "../components/BrandIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { campaign } from "../data/campaign.js";

const initialForm = {
  name: "",
  clinic: "",
  whatsapp: "",
  specialty: "",
  message: ""
};

export default function Campaign() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { pricing } = campaign;

  const whatsAppUrl = useMemo(() => {
    const lines = [
      `Olá, GVM Digital. Tenho interesse no pacote ${campaign.name} (condição de lançamento).`,
      form.name      && `Nome: ${form.name}`,
      form.clinic    && `Clínica: ${form.clinic}`,
      form.whatsapp  && `WhatsApp: ${form.whatsapp}`,
      form.specialty && `Especialidade: ${form.specialty}`,
      form.message   && `Mensagem: ${form.message}`
    ].filter(Boolean);
    return `https://wa.me/559284214298?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim())      nextErrors.name      = "Informe seu nome.";
    if (!form.clinic.trim())    nextErrors.clinic    = "Informe o nome da clínica.";
    if (!form.whatsapp.trim())  nextErrors.whatsapp  = "Informe um WhatsApp para retorno.";
    if (!form.specialty)        nextErrors.specialty = "Escolha a especialidade.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.open(whatsAppUrl, "_blank", "noreferrer");
  };

  return (
    <>
      <section className="page-intro campaign-intro">
        <div className="container page-intro-grid">
          <div className="page-intro-copy">
            <span className="hero-label">{campaign.name} · Clínicas de estética em Manaus</span>
            <h1>Sua clínica sem perder contato <span>fora do horário.</span></h1>
            <p>
              Site, WhatsApp e agenda trabalhando juntos. Um pacote mensal para clínicas de estética
              avançada não cirúrgica em {campaign.region}: site ou landing page, integração com
              WhatsApp e agenda externa, formulário de captação e automação básica das perguntas mais frequentes.
            </p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href={campaign.whatsAppUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={19} />
                <span>Falar sobre a oferta no WhatsApp</span>
              </a>
              <a className="button button-ghost" href="#valores">
                <span>Ver valores e condições</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="page-intro-panel">
            <article className="campaign-offer-card" aria-label="Resumo da condição de lançamento">
              <span className="campaign-offer-label">Condição de lançamento</span>
              <strong className="campaign-price">
                {pricing.launch}<small>{pricing.period}</small>
              </strong>
              <p>Valor normal: {pricing.regular}{pricing.period}</p>
              <ul>
                <li><CheckCircle2 size={17} /> {pricing.slots} vagas nesta condição</li>
                <li><CheckCircle2 size={17} /> Implantação gratuita*</li>
                <li><CheckCircle2 size={17} /> Permanência mínima de {pricing.minimumTerm}</li>
              </ul>
              <small className="campaign-footnote">*Condicionada à permanência mínima. Domínio cobrado à parte.</small>
            </article>
          </div>
        </div>
      </section>

      <section className="section campaign-section" id="para-quem">
        <div className="container">
          <SectionHeader
            label="Para quem é"
            title={'Feito para clínicas de estética avançada <span>não cirúrgica</span>'}
            text="Se a sua clínica atende em Vieiralves ou Adrianópolis e recebe a maior parte dos contatos pelo Instagram e pelo WhatsApp, esta oferta foi desenhada para o seu dia a dia."
          />
          <div className="campaign-audience-grid">
            {campaign.audience.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="article" key={item.title} delay={i * 80}>
                  <div className="icon-box"><Icon size={24} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section campaign-section" id="problema">
        <div className="container">
          <SectionHeader
            invert
            label="O problema"
            title={'Onde o contato se perde <span>hoje</span>'}
            text="É um padrão comum no nicho, e não tem a ver com a qualidade do atendimento. Tem a ver com o caminho que o contato percorre até virar agendamento."
          />
          <div className="process-strip dark">
            {campaign.problem.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="article" key={step.title} delay={i * 80}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <Icon size={25} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="campaign-solution">
            <Reveal>
              <h3>O que o {campaign.name} coloca no lugar</h3>
            </Reveal>
            <Reveal delay={100}>
              <ul className="check-list">
                {campaign.solution.map((item) => (
                  <li key={item}><CheckCircle2 size={18} /> {item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section soft-section campaign-section" id="escopo">
        <div className="container">
          <SectionHeader
            centered
            label="Escopo"
            title={'O que entra e o que <span>não entra</span> no pacote'}
            text="Preferimos deixar claro desde o início. O que está fora da lista pode ser orçado à parte, como projeto separado."
          />
          <div className="campaign-scope-grid">
            <Reveal as="article">
              <h3><CheckCircle2 size={20} /> Incluído no pacote</h3>
              <ul>
                {campaign.included.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text}><Icon size={17} /> {item.text}</li>
                  );
                })}
              </ul>
              <p className="campaign-note">
                A automação responde perguntas frequentes; o atendimento humano continua com a equipe da clínica, no horário de funcionamento.
              </p>
            </Reveal>
            <Reveal as="article" className="is-excluded" delay={100}>
              <h3><XCircle size={20} /> Não incluído</h3>
              <ul>
                {campaign.excluded.map((item) => (
                  <li key={item}><XCircle size={17} /> {item}</li>
                ))}
              </ul>
              <p className="campaign-note">
                Precisa de algo desta lista? A gente orça separadamente, fora do valor mensal do pacote.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section campaign-section" id="valores">
        <div className="container">
          <SectionHeader
            label="Valores e condições"
            title={'Um valor mensal, sem <span>surpresas</span>'}
            text={`São ${pricing.slots} vagas na condição de lançamento. Quando forem preenchidas, o pacote passa a valer o valor normal.`}
          />
          <div className="campaign-pricing">
            <Reveal as="article" className="campaign-price-card">
              <span className="choice-label">Condição de lançamento</span>
              <span className="campaign-offer-label">{campaign.name}</span>
              <strong className="campaign-price">
                {pricing.launch}<small>{pricing.period}</small>
              </strong>
              <p>Valor normal: <s>{pricing.regular}{pricing.period}</s></p>
              <ul>
                <li><CheckCircle2 size={17} /> Implantação gratuita*</li>
                <li><CheckCircle2 size={17} /> Permanência mínima de {pricing.minimumTerm}</li>
                <li><CheckCircle2 size={17} /> {pricing.slots} vagas nesta condição</li>
              </ul>
              <a className="button button-whatsapp" href={campaign.whatsAppUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={19} />
                <span>Consultar vaga no WhatsApp</span>
              </a>
              <small className="campaign-footnote">*Condicionada à permanência mínima de {pricing.minimumTerm}.</small>
            </Reveal>
            <Reveal as="dl" className="campaign-terms" delay={100}>
              <div>
                <dt>Valor normal</dt>
                <dd>{pricing.regular}{pricing.period}</dd>
              </div>
              <div>
                <dt>Condição de lançamento</dt>
                <dd>{pricing.launch}{pricing.period}, válida para as {pricing.slots} primeiras clínicas que fecharem</dd>
              </div>
              <div>
                <dt>Permanência mínima</dt>
                <dd>{pricing.minimumTerm}</dd>
              </div>
              <div>
                <dt>Implantação</dt>
                <dd>{pricing.setup}</dd>
              </div>
              <div>
                <dt>Domínio</dt>
                <dd>{pricing.domain}</dd>
              </div>
              <div>
                <dt>Urgência real</dt>
                <dd>Sem contador e sem pressão artificial: quando as {pricing.slots} vagas forem preenchidas, a condição de lançamento deixa de valer.</dd>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section soft-section campaign-section" id="duvidas">
        <div className="container faq-grid">
          <SectionHeader
            label="Transparência"
            title={'O que perguntam antes de <span>fechar</span>'}
            text="Respostas diretas, inclusive sobre o que o pacote não faz."
          />
          <div>
            {campaign.faqs.map((faq, i) => (
              <Reveal as="details" key={faq.question} delay={i * 60}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section campaign-section" id="contato">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleWhatsApp} noValidate>
            <SectionHeader
              label="Próximo passo"
              title={'Quer uma das <span>vagas</span>?'}
              text="Preencha e a mensagem chega no nosso WhatsApp. Respondemos no horário comercial."
            />
            <div className="form-grid">
              <Field label="Seu nome *" error={errors.name}>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Nome completo" autoComplete="name" />
              </Field>
              <Field label="Clínica *" error={errors.clinic}>
                <input value={form.clinic} onChange={(e) => updateField("clinic", e.target.value)} placeholder="Nome da clínica" autoComplete="organization" />
              </Field>
              <Field label="WhatsApp *" error={errors.whatsapp}>
                <input type="tel" value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="(92) 99999-9999" autoComplete="tel" />
              </Field>
              <Field label="Especialidade *" error={errors.specialty}>
                <select value={form.specialty} onChange={(e) => updateField("specialty", e.target.value)}>
                  <option value="">Selecione</option>
                  {campaign.audience.map((item) => <option key={item.title}>{item.title}</option>)}
                </select>
              </Field>
              <Field label="Como os contatos chegam hoje?" wide>
                <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Ex.: a maioria chega pelo direct, e quem responde é a recepção." />
              </Field>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-whatsapp">
                <WhatsAppIcon size={18} />
                <span>Enviar pelo WhatsApp</span>
              </button>
            </div>
          </form>

          <aside className="contact-aside">
            <div className="help-card">
              <h2>Como funciona a partir daqui</h2>
              <ul className="campaign-steps">
                {campaign.nextSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <strong><Icon size={16} /> {step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <a className="button button-outline" href={campaign.whatsAppUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} />
                <span>Prefiro chamar direto</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
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
