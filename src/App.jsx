import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SEO from "./components/SEO.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Campaign from "./pages/Campaign.jsx"; // campanha temporária
import { CAMPAIGN_ENABLED, CAMPAIGN_PATH } from "./data/campaign.js"; // campanha temporária

const routes = {
  "/": Home,
  "/sobre": About,
  "/servicos": Services,
  "/portfolio": Portfolio,
  "/contato": Contact,
  ...(CAMPAIGN_ENABLED ? { [CAMPAIGN_PATH]: Campaign } : {}) // campanha temporária
};

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export default function App({ initialPath }) {
  // initialPath só é passado na pré-renderização (Node, sem window).
  const [path, setPath] = useState(
    () => initialPath ?? normalizePath(window.location.pathname)
  );

  // Fallback SPA (404.html): "?redirect=/rota" vira a rota real. Fica em efeito
  // para a primeira renderização ser igual à pré-renderizada e a hidratação casar.
  useEffect(() => {
    const redirectedPath = new URLSearchParams(window.location.search).get("redirect");
    if (!redirectedPath) return;

    const target = normalizePath(redirectedPath.split("?")[0]);
    window.history.replaceState({}, "", target);
    setPath(target);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);

  const navigate = (to) => {
    const target = normalizePath(to);
    if (target === path) return;
    window.history.pushState({}, "", target);
    setPath(target);
  };

  const Page = useMemo(() => routes[path] ?? NotFound, [path]);

  return (
    <div className="app-shell">
      <SEO path={path} />
      <Header currentPath={path} onNavigate={navigate} />
      <main>
        <Page onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
