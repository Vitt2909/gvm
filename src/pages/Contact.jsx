import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "../components/BrandIcons.jsx";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { assets, contactMethods, processSteps, services } from "../data/content.js";

const initialForm = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  service: "",
  budget: "",
  deadline: "",
  message: ""
};

export default function Contact({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const whatsAppUrl = useMemo(() => {
    const lines = [
      "Olá, GVM Digital. Quero solicitar uma proposta.",
      form.name     && `Nome: ${form.name}`,
      form.company  && `Empresa: ${form.company}`,
      form.email    && `E-mail: ${form.email}`,
      form.whatsapp && `WhatsApp: ${form.whatsapp}`,
      form.service  && `Serviço: ${form.service}`,
      form.budget   && `Orçamento: ${form.budget}`,
      form.deadline && `Prazo: ${form.deadline}`,
      form.message  && `Mensagem: ${form.message}`
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
    if (!form.name.trim())                    nextErrors.name    = "Informe seu nome.";
    if (!form.company.trim())                 nextErrors.company = "Informe sua empresa.";
    if (!/\S+@\S+\.\S+/.test(form.email))    nextErrors.email   = "Informe um e-mail válido.";
    if (!form.service)                        nextErrors.service = "Escolha um serviço.";
    if (!form.message.trim())                 nextErrors.message = "Conte um pouco sobre o projeto.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.open(whatsAppUrl, "_blank", "noreferrer");
  };

  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        title={'Solicite uma proposta para o <span>seu projeto</span>'}
        text="Conte sobre seu negócio e suas necessidades. Vamos analisar o cenário e indicar o melhor caminho para gerar resultados."
        image={assets.heroDevices}
        hideCta
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleWhatsApp} noValidate>
            <SectionHeader title={'Conte sobre o seu <span>projeto</span>'} />
            <div className="form-grid">
              <Field label="Nome completo *" error={errors.name}>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Seu nome completo" />
              </Field>
              <Field label="Empresa *" error={errors.company}>
                <input value={form.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Nome da sua empresa" />
              </Field>
              <Field label="E-mail *" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="seu@email.com" />
              </Field>
              <Field label="WhatsApp">
                <input value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="(92) 99999-9999" />
              </Field>
              <Field label="Serviço de interesse *" error={errors.service}>
                <select value={form.service} onChange={(e) => updateField("service", e.target.value)}>
                  <option value="">Selecione um serviço</option>
                  {services.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </Field>
              <Field label="Orçamento estimado">
                <select value={form.budget} onChange={(e) => updateField("budget", e.target.value)}>
                  <option value="">Selecione uma faixa</option>
                  <option>Até R$ 2.000</option>
                  <option>R$ 2.000 a R$ 5.000</option>
                  <option>Acima de R$ 5.000</option>
                </select>
              </Field>
              <Field label="Prazo desejado">
                <select value={form.deadline} onChange={(e) => updateField("deadline", e.target.value)}>
                  <option value="">Selecione o prazo</option>
                  <option>Até 30 dias</option>
                  <option>30 a 60 dias</option>
                  <option>Sem pressa definida</option>
                </select>
              </Field>
              <Field label="Mensagem *" error={errors.message} wide>
                <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Conte mais sobre seu projeto, objetivos e desafios." />
              </Field>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-whatsapp">
                <WhatsAppIcon size={18} />
                <span>Chamar no WhatsApp</span>
              </button>
            </div>
          </form>

          <aside className="contact-aside">
            <div className="help-card">
              <h2>Estamos aqui para ajudar</h2>
              <p>Nossa equipe está pronta para atender o seu negócio e criar soluções digitais que geram resultados.</p>
              <ul>
                <li><CheckCircle2 size={17} /> Análise cuidadosa das necessidades</li>
                <li><CheckCircle2 size={17} /> Proposta personalizada</li>
                <li><CheckCircle2 size={17} /> Estratégias orientadas a resultados</li>
              </ul>
            </div>
            <div className="contact-methods">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const isExternal = method.href?.startsWith("http");
                return method.href ? (
                  <a
                    key={method.title}
                    href={method.href}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <Icon size={21} />
                    <div>
                      <h3>{method.title}</h3>
                      <p>{method.text}</p>
                    </div>
                  </a>
                ) : (
                  <article key={method.title}>
                    <Icon size={21} />
                    <div>
                      <h3>{method.title}</h3>
                      <p>{method.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionHeader
            centered
            title={'Como funciona depois do <span>contato</span>'}
            text="Um processo simples, transparente e focado em entender o que sua empresa realmente precisa."
          />
          <div className="process-strip">
            {processSteps.map((step, i) => {
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
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
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
