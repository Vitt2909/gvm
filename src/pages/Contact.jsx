import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import CTASection from "../components/CTASection.jsx";
import PageIntro from "../components/PageIntro.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Stepper, { Step } from "../components/Stepper.jsx";
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
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [flowCompleted, setFlowCompleted] = useState(false);

  const whatsAppUrl = useMemo(() => {
    const text = [
      "Olá, GVM Digital. Quero solicitar uma proposta.",
      form.name ? `Nome: ${form.name}` : "",
      form.company ? `Empresa: ${form.company}` : "",
      form.service ? `Serviço: ${form.service}` : "",
      form.budget ? `Orçamento: ${form.budget}` : "",
      form.message ? `Mensagem: ${form.message}` : ""
    ].filter(Boolean).join("\n");

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!form.company.trim()) nextErrors.company = "Informe sua empresa.";
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (!form.service) nextErrors.service = "Escolha um serviço.";
    if (!form.message.trim()) nextErrors.message = "Conte um pouco sobre o projeto.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  return (
    <>
      <PageIntro
        onNavigate={onNavigate}
        title={'Solicite uma proposta para o <span>seu projeto</span>'}
        text="Conte sobre seu negócio e suas necessidades. Vamos analisar o cenário e indicar o melhor caminho para gerar resultados."
        image={assets.heroDevices}
        ctaLabel="Enviar proposta"
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <SectionHeader title={'Conte sobre o seu <span>projeto</span>'} />
            <div className="form-grid">
              <Field label="Nome completo *" error={errors.name}>
                <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Seu nome completo" />
              </Field>
              <Field label="Empresa *" error={errors.company}>
                <input value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Nome da sua empresa" />
              </Field>
              <Field label="E-mail *" error={errors.email}>
                <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="seu@email.com" />
              </Field>
              <Field label="WhatsApp">
                <input value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="(11) 99999-9999" />
              </Field>
              <Field label="Serviço de interesse *" error={errors.service}>
                <select value={form.service} onChange={(event) => updateField("service", event.target.value)}>
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => <option key={service.title}>{service.title}</option>)}
                </select>
              </Field>
              <Field label="Orçamento estimado">
                <select value={form.budget} onChange={(event) => updateField("budget", event.target.value)}>
                  <option value="">Selecione uma faixa</option>
                  <option>Até R$ 2.000</option>
                  <option>R$ 2.000 a R$ 5.000</option>
                  <option>Acima de R$ 5.000</option>
                </select>
              </Field>
              <Field label="Prazo desejado">
                <select value={form.deadline} onChange={(event) => updateField("deadline", event.target.value)}>
                  <option value="">Selecione o prazo</option>
                  <option>Até 30 dias</option>
                  <option>30 a 60 dias</option>
                  <option>Sem pressa definida</option>
                </select>
              </Field>
              <Field label="Mensagem *" error={errors.message} wide>
                <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Conte mais sobre seu projeto, objetivos e desafios." />
              </Field>
            </div>
            {submitted ? (
              <div className="success-message">
                <CheckCircle2 size={20} />
                Solicitação validada. Use o botão do WhatsApp para enviar sua mensagem preparada.
              </div>
            ) : null}
            <div className="form-actions">
              <button type="submit" className="button button-primary">
                <Send size={18} />
                <span>Enviar solicitação</span>
              </button>
              <a className="button button-whatsapp" href={whatsAppUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                <span>Chamar no WhatsApp</span>
              </a>
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
                return (
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
          <div className="contact-stepper-wrap">
            <Stepper
              initialStep={1}
              onStepChange={() => setFlowCompleted(false)}
              onFinalStepCompleted={() => setFlowCompleted(true)}
              backButtonText="Voltar"
              nextButtonText="Continuar"
              completeButtonText="Concluir"
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Step key={step.title}>
                    <div className="stepper-process-content">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Icon size={30} />
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </Step>
                );
              })}
            </Stepper>
            {flowCompleted ? (
              <div className="stepper-complete-message">
                <CheckCircle2 size={20} />
                Fluxo concluído. O próximo passo é enviar sua solicitação para recebermos o contexto do projeto.
              </div>
            ) : null}
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
