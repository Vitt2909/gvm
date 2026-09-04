import { useEffect } from "react";
import {
  getSeoForPath,
  getStructuredData,
  OG_IMAGE_URL,
  SITE_NAME
} from "../data/seo.js";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

// Cada rota publica o próprio grafo (empresa + site + página + trilha, mais
// FAQ onde as perguntas aparecem na tela). Antes só a home tinha dados
// estruturados, e as demais páginas ficavam sem nenhum.
function syncStructuredData(path) {
  const id = "structured-data-local-business";
  const existing = document.getElementById(id);
  const data = getStructuredData(path);

  if (!data) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("script");
  element.id = id;
  element.type = "application/ld+json";
  element.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(element);
  }
}

export default function SEO({ path }) {
  useEffect(() => {
    const seo = getSeoForPath(path);
    const isKnownPage = seo.path === "/" || seo.canonical.endsWith(seo.path);

    document.documentElement.lang = "pt-BR";
    document.title = seo.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: isKnownPage ? "index, follow" : "noindex, follow"
    });

    upsertCanonical(seo.canonical);

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website"
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: seo.canonical
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "pt_BR"
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: OG_IMAGE_URL
    });
    upsertMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200"
    });
    upsertMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630"
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: "GVM Digital - presenca digital, sites e estrategias digitais"
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: OG_IMAGE_URL
    });

    syncStructuredData(seo.path);
  }, [path]);

  return null;
}
