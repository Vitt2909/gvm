export const SITE_URL = "https://gvmdigital.vercel.app";
export const SITE_NAME = "GVM Digital";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/gvm-logo-horizontal-color.png`;
export const INSTAGRAM_URL = "https://www.instagram.com/gvmdigital_/";

export const seoPages = {
  "/": {
    title: "GVM Digital | Sites e Marketing em Manaus",
    description:
      "Agência em Manaus para sites, landing pages, identidade visual, automações e estratégias digitais que geram presença e vendas.",
    priority: "1.0"
  },
  "/sobre": {
    title: "Sobre a GVM Digital | Agência em Manaus",
    description:
      "Conheça a GVM Digital, estúdio de Manaus que une estratégia, design e tecnologia para fortalecer marcas e negócios online.",
    priority: "0.8"
  },
  "/servicos": {
    title: "Serviços Digitais | GVM Digital em Manaus",
    description:
      "Sites, landing pages, identidade visual, automações e prospecção digital para empresas que querem crescer com clareza e performance.",
    priority: "0.9"
  },
  "/portfolio": {
    title: "Portfólio de Projetos | GVM Digital",
    description:
      "Veja projetos, sistemas e protótipos da GVM Digital que demonstram estratégia, design e desenvolvimento web orientados a resultado.",
    priority: "0.8"
  },
  "/contato": {
    title: "Contato | Solicite Proposta à GVM Digital",
    description:
      "Fale com a GVM Digital em Manaus e solicite uma proposta para site, landing page, identidade visual, automação ou estratégia digital.",
    priority: "0.7"
  }
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

export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description:
      "Presença digital, sites, landing pages, identidade visual, automações e estratégias digitais.",
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
    image: OG_IMAGE_URL,
    areaServed: "Manaus, Amazonas, Brasil",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manaus",
      addressRegion: "AM",
      addressCountry: "BR"
    },
    sameAs: [INSTAGRAM_URL]
  };
}
