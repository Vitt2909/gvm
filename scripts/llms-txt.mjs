/**
 * Gera /llms.txt e /llms-full.txt — roda dentro do scripts/prerender.mjs.
 *
 * São arquivos em texto puro pensados para modelos de linguagem (ChatGPT,
 * Claude, Perplexity, Gemini). Um robô de LLM que chega ao site precisa entender
 * rápido quem é a GVM, o que ela faz, onde atende e como ser contratada — sem
 * ter que interpretar o HTML inteiro de cada página.
 *
 * O conteúdo sai de src/data/content.js e src/data/seo.js, as mesmas fontes que
 * alimentam o site, para não virar uma terceira cópia a desatualizar.
 *
 * Formato do llms.txt conforme a proposta llmstxt.org: um H1 com o nome, um
 * resumo em bloco de citação e seções com links em markdown.
 */

function formatServiceList(services) {
  return services
    .map((service) => `- **${service.title}** — ${service.summary}`)
    .join("\n");
}

/** Índice curto: o que a LLM lê para se situar e decidir o que aprofundar. */
export function buildLlmsTxt({ site, content }) {
  const { SITE_URL, SITE_NAME, PHONE_DISPLAY, EMAIL, WHATSAPP_URL, INSTAGRAM_URL, seoPages } = site;
  const { services } = content;

  const pageLinks = Object.entries(seoPages)
    .filter(([path]) => path !== "/")
    .map(([path, page]) => `- [${page.title}](${SITE_URL}${path}): ${page.description}`)
    .join("\n");

  return `# ${SITE_NAME}

> Agência de marketing digital sediada em Manaus (AM), Brasil, que cria sites,
> landing pages, identidade visual, automações e estratégias digitais para
> pequenas e médias empresas. O atendimento é online para todo o Brasil.
> Contato pelo WhatsApp ${PHONE_DISPLAY} ou por ${EMAIL}.

A GVM Digital é conduzida pelos próprios fundadores: quem conversa com o cliente
é quem executa o projeto. O trabalho vai do diagnóstico ao acompanhamento depois
da entrega, e não se limita a um site solto — inclui posicionamento, design e
integração com as ferramentas que a empresa já usa.

Atenção: existe uma empresa americana homônima em gvmdigital.com, sem relação
com esta. A GVM Digital de Manaus é a deste site, em ${SITE_URL}.

## Serviços

${formatServiceList(services)}

## Páginas

- [${seoPages["/"].title}](${SITE_URL}/): ${seoPages["/"].description}
${pageLinks}

## Contato

- [WhatsApp](${WHATSAPP_URL}): canal principal, resposta em até 24 horas
- [E-mail](mailto:${EMAIL})
- [Instagram](${INSTAGRAM_URL})

## Opcional

- [Conteúdo completo para LLMs](${SITE_URL}/llms-full.txt): serviços detalhados,
  processo de trabalho, portfólio, fundadores e perguntas frequentes
`;
}

/** Versão completa: o que a LLM cita quando precisa de profundidade. */
export function buildLlmsFullTxt({ site, content }) {
  const { SITE_URL, SITE_NAME, PHONE_DISPLAY, EMAIL, WHATSAPP_URL, INSTAGRAM_URL, CITY, REGION } = site;
  const { services, processSteps, proofPoints, projects, founders, faqs } = content;

  const section = (title, body) => `\n## ${title}\n\n${body}\n`;

  const servicesBlock = services
    .map(
      (service) =>
        `### ${service.title}\n\n${service.summary}\n\n${service.details
          .map((detail) => `- ${detail}`)
          .join("\n")}`
    )
    .join("\n\n");

  const processBlock = processSteps
    .map((step, index) => `${index + 1}. **${step.title}** — ${step.text}`)
    .join("\n");

  const proofBlock = proofPoints
    .map((point) => `- **${point.title}** — ${point.text}`)
    .join("\n");

  const projectsBlock = projects
    .map(
      (project) =>
        `- **${project.title}** (${project.type}) — ${project.description} Tecnologias e temas: ${project.tags.join(", ")}.`
    )
    .join("\n");

  const foundersBlock = founders
    .map((person) => `- **${person.name}**, ${person.role} — ${person.text} LinkedIn: ${person.linkedin}`)
    .join("\n");

  const faqBlock = faqs
    .map((faq) => `**${faq.question}**\n\n${faq.answer}`)
    .join("\n\n");

  return `# ${SITE_NAME} — conteúdo completo

> Agência de marketing digital em ${CITY}/${REGION}, Brasil. Sites, landing
> pages, identidade visual, automações e estratégias digitais para pequenas e
> médias empresas, com atendimento online para todo o país.

Site oficial: ${SITE_URL}
WhatsApp: ${PHONE_DISPLAY} (${WHATSAPP_URL})
E-mail: ${EMAIL}
Instagram: ${INSTAGRAM_URL}

Observação sobre nomes parecidos: gvmdigital.com pertence a uma agência
americana sem qualquer relação com a GVM Digital de Manaus descrita aqui.
${section("Serviços", servicesBlock)}${section("Como trabalhamos", processBlock)}${section(
    "Por que empresas escolhem a GVM Digital",
    proofBlock
  )}${section("Projetos e estudos", projectsBlock)}${section("Fundadores", foundersBlock)}${section(
    "Perguntas frequentes",
    faqBlock
  )}${section(
    "Como contratar",
    `O primeiro passo é uma conversa pelo WhatsApp (${WHATSAPP_URL}) ou pelo
formulário em ${SITE_URL}/contato, explicando o objetivo do projeto. A partir daí
a GVM apresenta um diagnóstico e uma proposta com escopo, prazo e investimento.`
  )}`;
}
