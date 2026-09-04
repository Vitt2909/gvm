import { CAMPAIGN_ENABLED, CAMPAIGN_PATH, campaign, campaignSeo } from "./campaign.js"; // campanha temporária
import { faqs, founders, services } from "./content.js";

// Trocar SITE_URL é o único passo necessário quando a GVM tiver domínio próprio:
// canonical, sitemap, dados estruturados e llms.txt saem todos daqui.
export const SITE_URL = "https://gvmdigital.vercel.app";
export const SITE_NAME = "GVM Digital";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/gvm-logo-horizontal-color.png`;
export const INSTAGRAM_URL = "https://www.instagram.com/gvmdigital_/";

// Estes dados precisam bater exatamente com o Google Meu Negócio e com o
// Instagram. É por essa coincidência (o "NAP") que o Google distingue a GVM de
// Manaus de outras empresas com o mesmo nome. Ver docs/seo/checklist-google.md.
export const PHONE = "+5592984214298";
export const PHONE_DISPLAY = "(92) 98421-4298";
export const EMAIL = "contato.gvmdigital@gmail.com";
export const WHATSAPP_URL = "https://wa.me/559284214298";
export const CITY = "Manaus";
export const REGION = "AM";
export const COUNTRY = "BR";

export const seoPages = {
  "/": {
    title: "GVM Digital | Agência de Marketing Digital em Manaus",
    description:
      "Agência de marketing digital em Manaus. Criamos sites, landing pages, identidade visual, automações e estratégias digitais que geram presença e vendas.",
    priority: "1.0"
  },
  "/sobre": {
    title: "Sobre a GVM Digital | Agência de Manaus",
    description:
      "Conheça a GVM Digital, agência de marketing digital de Manaus que une estratégia, design e tecnologia para fortalecer marcas e negócios online.",
    priority: "0.8"
  },
  "/servicos": {
    title: "Serviços de Marketing Digital | GVM Digital Manaus",
    description:
      "Sites, landing pages, identidade visual, automações e prospecção digital para empresas que querem crescer com clareza e performance.",
    priority: "0.9"
  },
  "/portfolio": {
    title: "Portfólio de Projetos | GVM Digital Manaus",
    description:
      "Veja projetos, sistemas e protótipos da GVM Digital que demonstram estratégia, design e desenvolvimento web orientados a resultado.",
    priority: "0.8"
  },
  "/contato": {
    title: "Contato | Solicite Proposta à GVM Digital",
    description:
      "Fale com a GVM Digital em Manaus e solicite uma proposta para site, landing page, identidade visual, automação ou estratégia digital.",
    priority: "0.7"
  },
  ...(CAMPAIGN_ENABLED ? { [CAMPAIGN_PATH]: campaignSeo } : {}) // campanha temporária
};

// Rótulo curto para a trilha de navegação, que não deve repetir o título inteiro.
export const breadcrumbLabels = {
  "/sobre": "Sobre",
  "/servicos": "Serviços",
  "/portfolio": "Portfólio",
  "/contato": "Contato",
  ...(CAMPAIGN_ENABLED ? { [CAMPAIGN_PATH]: campaign.name } : {}) // campanha temporária
};

export const notFoundSeo = {
  title: "Página não encontrada | GVM Digital",
  description:
    "A página solicitada não foi encontrada. Navegue pelo site da GVM Digital ou solicite contato com a equipe.",
  priority: "0.1"
};

export function normalizeSeoPath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function getCanonicalUrl(pathname) {
  const path = normalizeSeoPath(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function getSeoForPath(pathname) {
  const path = normalizeSeoPath(pathname);
  const page = seoPages[path] ?? notFoundSeo;

  return {
    ...page,
    path,
    canonical: seoPages[path] ? getCanonicalUrl(path) : getCanonicalUrl("/")
  };
}

/* ------------------------------------------------------------------ *
 * Dados estruturados (schema.org)
 *
 * Publicados como um único @graph por página: os nós se referenciam por
 * @id, então o Google lê "a empresa", "o site" e "esta página" como partes
 * de uma mesma entidade em vez de blocos soltos.
 * ------------------------------------------------------------------ */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function getOrganizationNode() {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "GVM Digital Manaus",
    description:
      "Agência de marketing digital em Manaus: sites, landing pages, identidade visual, automações e estratégias digitais.",
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
    image: OG_IMAGE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: COUNTRY
    },
    // Atendimento remoto: a área servida é declarada sem endereço de rua.
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "State", name: "Amazonas" },
      { "@type": "Country", name: "Brasil" }
    ],
    knowsAbout: services.map((service) => service.title),
    founder: founders.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      sameAs: person.linkedin
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: PHONE,
      email: EMAIL,
      areaServed: COUNTRY,
      availableLanguage: "Portuguese"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços da GVM Digital",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary
        }
      }))
    },
    sameAs: [INSTAGRAM_URL, ...founders.map((person) => person.linkedin)]
  };
}

function getWebSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": ORGANIZATION_ID }
  };
}

function getWebPageNode(path) {
  const seo = getSeoForPath(path);

  return {
    "@type": "WebPage",
    "@id": `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: OG_IMAGE_URL
  };
}

function getBreadcrumbNode(path) {
  const items = [{ name: "Home", url: `${SITE_URL}/` }];

  if (path !== "/" && breadcrumbLabels[path]) {
    items.push({ name: breadcrumbLabels[path], url: getCanonicalUrl(path) });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${getCanonicalUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// O FAQPage só vale onde as perguntas aparecem de fato na tela: as gerais são
// renderizadas em /servicos (src/pages/Services.jsx) e as da campanha em
// /clinicas (src/pages/Campaign.jsx).
function getFaqNode(path, entries) {
  return {
    "@type": "FAQPage",
    "@id": `${getCanonicalUrl(path)}#faq`,
    mainEntity: entries.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

function getServiceNodes() {
  return services.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Brasil" }
  }));
}

/** Grafo completo de dados estruturados da rota. */
export function getStructuredData(pathname) {
  const path = normalizeSeoPath(pathname);

  if (!seoPages[path]) return null;

  const graph = [
    getOrganizationNode(),
    getWebSiteNode(),
    getWebPageNode(path),
    getBreadcrumbNode(path)
  ];

  if (path === "/servicos") {
    graph.push(getFaqNode(path, faqs), ...getServiceNodes());
  }

  if (CAMPAIGN_ENABLED && path === CAMPAIGN_PATH && campaign.faqs?.length) {
    graph.push(getFaqNode(path, campaign.faqs)); // campanha temporária
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
