/**
 * Pré-renderização (SSG) — roda no fim do `npm run build`.
 *
 * Pega o HTML gerado pelo React em Node (src/entry-server.jsx) e grava dentro do
 * <div id="root"> de cada página do dist/. Depois disso o conteúdo do site existe
 * no HTML entregue pelo servidor, sem depender de JavaScript: o Google indexa mais
 * rápido e os robôs de LLM, que não executam JS, passam a ler as páginas.
 *
 * O visitante não nota diferença — o React hidrata a marcação já pronta.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");
const ssrEntry = resolve(root, "dist-ssr/entry-server.js");
const manifestPath = resolve(distDir, ".vite/manifest.json");

/** CSS de escape para quem não executa JS. */
// As animações de entrada partem de `.reveal { opacity: 0 }` (src/styles.css) e só
// ganham `.is-visible` via IntersectionObserver. Sem JavaScript o texto
// pré-renderizado ficaria invisível — este <noscript> devolve a visibilidade.
const NOSCRIPT_REVEAL =
  "<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>";

/**
 * No build SSR o Vite resolve `new URL("../../assets/x.png", import.meta.url)`
 * (src/data/content.js) em relação ao bundle em dist-ssr/, produzindo caminhos
 * `file:///...` do disco da máquina de build. O manifest do build de cliente diz
 * qual é a URL pública e com hash de cada imagem; casamos as duas pelo nome do
 * arquivo.
 */
function buildAssetMap() {
  if (!existsSync(manifestPath)) {
    throw new Error(
      `manifest não encontrado em ${manifestPath}. O build de cliente precisa rodar com "--manifest".`
    );
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const map = new Map();

  for (const [source, entry] of Object.entries(manifest)) {
    if (!entry.file) continue;

    const name = basename(source);
    // Nomes duplicados tornariam a correspondência ambígua e poderiam publicar a
    // imagem errada em silêncio. Melhor quebrar o build.
    if (map.has(name) && map.get(name) !== `/${entry.file}`) {
      throw new Error(
        `dois assets com o mesmo nome de arquivo ("${name}"). Renomeie um deles para a pré-renderização conseguir distingui-los.`
      );
    }
    map.set(name, `/${entry.file}`);
  }

  return map;
}

/** Troca os `file:///...` do HTML renderizado pelas URLs públicas do site. */
function rewriteAssetUrls(html, assetMap) {
  const unresolved = new Set();

  const result = html.replace(/file:\/\/\/[^"'\s>]+/g, (fileUrl) => {
    const name = basename(fileURLToPath(fileUrl));
    const publicUrl = assetMap.get(name);

    if (!publicUrl) {
      unresolved.add(name);
      return fileUrl;
    }
    return publicUrl;
  });

  if (unresolved.size > 0) {
    throw new Error(
      `imagens sem correspondência no manifest: ${[...unresolved].join(", ")}`
    );
  }

  return result;
}

/**
 * O React 19 gera <link rel="preload"> para imagens com fetchPriority="high"
 * (src/components/Hero.jsx e PageIntro.jsx) e os coloca no início da string. No
 * navegador esses links vivem no <head>, então movemos para lá — assim a
 * hidratação encontra a mesma estrutura e o preload age mais cedo.
 */
function splitHoistedLinks(html) {
  const match = html.match(/^(?:<link\b[^>]*>)+/);
  if (!match) return { head: "", body: html };

  return { head: match[0], body: html.slice(match[0].length) };
}

/** "/" -> dist/index.html ; "/sobre" -> dist/sobre/index.html */
function htmlFileForRoute(route) {
  return route === "/"
    ? resolve(distDir, "index.html")
    : resolve(distDir, `.${route}/index.html`);
}

// O segundo argumento de String.replace é sempre uma função nestes utilitários:
// como string, sequências como "$$" ou "$&" seriam interpretadas como padrões de
// substituição e corromperiam o conteúdo (um preço "R$ 1.200" viraria outra coisa).
function injectIntoHead(html, snippet) {
  return html.replace("</head>", () => `    ${snippet}\n  </head>`);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Troca o content="" da meta identificada por `matcher`, ex.: 'name="description"'. */
function setMetaContent(html, matcher, value) {
  const tag = html.match(new RegExp(`<meta[^>]*${escapeRegExp(matcher)}[^>]*>`));
  if (!tag) return html;

  const updated = tag[0].replace(
    /content="[^"]*"/,
    () => `content="${escapeAttr(value)}"`
  );

  return html.replace(tag[0], () => updated);
}

const JSON_LD_ID = "structured-data-local-business";

/**
 * Alinha o <head> estático com src/data/seo.js.
 *
 * Título, descrição e dados estruturados estavam escritos à mão em cada shell
 * (index.html, sobre/index.html, ...) e só o da home tinha JSON-LD. Como esse é
 * exatamente o HTML que o robô lê antes de qualquer JavaScript, mantê-lo em duas
 * fontes significa publicar informação desatualizada. Aqui ele é reescrito no
 * build a partir da fonte única.
 */
function syncHead(html, route, { getSeoForPath, getStructuredData }) {
  const seo = getSeoForPath(route);

  let result = html.replace(
    /<title>[\s\S]*?<\/title>/,
    () => `<title>${escapeAttr(seo.title)}</title>`
  );

  result = setMetaContent(result, 'name="description"', seo.description);
  result = setMetaContent(result, 'property="og:title"', seo.title);
  result = setMetaContent(result, 'property="og:description"', seo.description);
  result = setMetaContent(result, 'property="og:url"', seo.canonical);
  result = setMetaContent(result, 'name="twitter:title"', seo.title);
  result = setMetaContent(result, 'name="twitter:description"', seo.description);

  result = result.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    () => `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`
  );

  const data = getStructuredData(route);
  if (data) {
    // "<" escapado para um valor de texto nunca poder fechar o <script>.
    const json = JSON.stringify(data).replace(/</g, "\\u003c");
    const script = `<script id="${JSON_LD_ID}" type="application/ld+json">${json}</script>`;
    const existing = result.match(
      new RegExp(`<script id="${JSON_LD_ID}"[\\s\\S]*?<\\/script>`)
    );

    result = existing
      ? result.replace(existing[0], () => script)
      : injectIntoHead(result, script);
  }

  return result;
}

/**
 * Data da última alteração do conteúdo. O commit mais recente descreve melhor a
 * realidade do que a data do build, que mudaria a cada deploy sem o site ter
 * mudado — e um lastmod sempre "hoje" é ignorado pelo Google.
 */
function getLastModified() {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs"], {
      cwd: root,
      encoding: "utf8"
    }).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // Sem git disponível (ou repositório ausente): cai para a data do build.
  }

  return new Date().toISOString().slice(0, 10);
}

/**
 * O sitemap era um arquivo estático em public/, com URLs e datas escritas à mão.
 * Agora sai de seoPages, a mesma fonte das rotas e prioridades, para não existir
 * uma página no site que falte no sitemap (ou o contrário).
 */
function writeSitemap({ routes, getSeoForPath }) {
  const lastmod = getLastModified();

  const urls = routes.map((route) => {
    const seo = getSeoForPath(route);
    const changefreq = route === "/" ? "weekly" : "monthly";

    return [
      "  <url>",
      `    <loc>${seo.canonical}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${seo.priority}</priority>`,
      "  </url>"
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    ""
  ].join("\n");

  writeFileSync(resolve(distDir, "sitemap.xml"), xml);
  console.log(`  ✓ sitemap.xml — ${routes.length} URLs (lastmod ${lastmod})`);
}

async function main() {
  if (!existsSync(ssrEntry)) {
    throw new Error(
      `bundle SSR não encontrado em ${ssrEntry}. Rode o build completo com "npm run build".`
    );
  }

  const assetMap = buildAssetMap();
  const { render, routes, getSeoForPath, getStructuredData } = await import(
    pathToFileURL(ssrEntry).href
  );

  let count = 0;

  for (const route of routes) {
    const file = htmlFileForRoute(route);

    if (!existsSync(file)) {
      // Rota conhecida pelo SEO mas sem página no vite.config.js — avisa em vez de
      // falhar, para uma campanha desligada não quebrar o build.
      console.warn(`  ! ${route} — sem HTML correspondente em dist/, ignorado`);
      continue;
    }

    const rendered = rewriteAssetUrls(render(route), assetMap);
    const { head, body } = splitHoistedLinks(rendered);

    let html = readFileSync(file, "utf8");

    if (!html.includes('<div id="root"></div>')) {
      throw new Error(`${file} não tem <div id="root"></div> para receber o conteúdo.`);
    }

    html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    html = injectIntoHead(html, `${head}${NOSCRIPT_REVEAL}`);
    html = syncHead(html, route, { getSeoForPath, getStructuredData });

    writeFileSync(file, html);
    console.log(`  ✓ ${route} — ${(body.length / 1024).toFixed(1)} kB de HTML`);
    count += 1;
  }

  writeSitemap({ routes, getSeoForPath });

  console.log(`\nPré-renderização concluída: ${count} página(s).`);
}

main().catch((error) => {
  console.error(`\nFalha na pré-renderização: ${error.message}`);
  process.exit(1);
});
