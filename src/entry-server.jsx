/**
 * Entrada usada apenas no build (Node), nunca no navegador.
 *
 * O site é uma SPA em React: o HTML publicado tinha só <div id="root"></div>, sem
 * texto nenhum. O Google até executa JavaScript, mas em uma fila separada e mais
 * lenta, e a maioria dos robôs de LLM não executa — para eles a página chegava em
 * branco.
 *
 * Aqui o React é renderizado para string durante o `npm run build`, e o
 * scripts/prerender.mjs grava esse HTML dentro de cada página do dist/.
 */
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import * as seo from "./data/seo.js";
import * as content from "./data/content.js";

const { getSeoForPath, getStructuredData, seoPages } = seo;

// Fonte única das rotas: o mesmo objeto que gera títulos, canonical e sitemap.
export const routes = Object.keys(seoPages);

export function render(path) {
  return renderToString(<App initialPath={path} />);
}

// Reexportados para o scripts/prerender.mjs gravar título, meta tags e dados
// estruturados no HTML a partir da mesma fonte que o site usa em tempo de
// execução, sem uma segunda cópia para desatualizar.
export { getSeoForPath, getStructuredData };

// Conteúdo e constantes do site, para o scripts/llms-txt.mjs montar /llms.txt e
// /llms-full.txt a partir da mesma fonte que alimenta as páginas.
export { seo as site, content };
