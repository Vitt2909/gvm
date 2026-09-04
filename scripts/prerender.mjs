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

function injectIntoHead(html, snippet) {
  return html.replace("</head>", `    ${snippet}\n  </head>`);
}

async function main() {
  if (!existsSync(ssrEntry)) {
    throw new Error(
      `bundle SSR não encontrado em ${ssrEntry}. Rode o build completo com "npm run build".`
    );
  }

  const assetMap = buildAssetMap();
  const { render, routes } = await import(pathToFileURL(ssrEntry).href);

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

    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    html = injectIntoHead(html, `${head}${NOSCRIPT_REVEAL}`);

    writeFileSync(file, html);
    console.log(`  ✓ ${route} — ${(body.length / 1024).toFixed(1)} kB de HTML`);
    count += 1;
  }

  console.log(`\nPré-renderização concluída: ${count} página(s).`);
}

main().catch((error) => {
  console.error(`\nFalha na pré-renderização: ${error.message}`);
  process.exit(1);
});
