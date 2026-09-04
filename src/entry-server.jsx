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
import { seoPages } from "./data/seo.js";

// Fonte única das rotas: o mesmo objeto que gera títulos, canonical e sitemap.
export const routes = Object.keys(seoPages);

export function render(path) {
  return renderToString(<App initialPath={path} />);
}
