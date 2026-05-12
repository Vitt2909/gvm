import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = {
  "/": Home,
  "/sobre": About,
  "/servicos": Services,
  "/portfolio": Portfolio,
  "/contato": Contact
};

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [path, setPath] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectedPath = params.get("redirect");

    if (redirectedPath) {
      const target = normalizePath(redirectedPath.split("?")[0]);
      window.history.replaceState({}, "", target);
      return target;
    }

    return normalizePath(window.location.pathname);
  });

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
      <Header currentPath={path} onNavigate={navigate} />
      <main>
        <Page onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
