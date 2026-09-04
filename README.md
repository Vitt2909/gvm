<div align="center">

<img src="assets/logos/gvm-logo-horizontal-color.png" alt="GVM Digital" width="260" />

# GVM Digital — Site Institucional

**Presença digital profissional para negócios que querem vender mais.**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://gvmdigital.vercel.app)
[![License](https://img.shields.io/badge/Licença-Privado-red?style=flat-square)]()

[🌐 Site ao vivo](https://gvmdigital.vercel.app) • [📸 Instagram](https://www.instagram.com/gvmdigital_/) • [💬 WhatsApp](https://wa.me/559284214298)

</div>

---

## 👥 Autoria

Projeto desenvolvido e mantido pelos fundadores da **GVM Digital**:

| Nome | Função | LinkedIn |
|------|--------|----------|
| **Gustavo** | Estratégia comercial | [linkedin.com/in/luís-gustavo](https://www.linkedin.com/in/lu%C3%ADs-gustavo-88a50b408/) |
| **Vítor** | Tecnologia e produto | [linkedin.com/in/vitorgrowth](https://www.linkedin.com/in/vitorgrowth/) |
| **Mayllon** | Design e operação | [linkedin.com/in/mayllon-mattos](https://www.linkedin.com/in/mayllon-mattos-336496268/) |

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 |
| Build | Vite 7 |
| Animações | Motion (Framer) |
| Ícones | Lucide React + SVGs oficiais (BrandIcons) |
| Estilo | CSS puro com variáveis customizadas |
| Roteamento | SPA client-side (history API) |
| Deploy | Vercel (`vercel.json`) |

---

## 📁 Estrutura do projeto

```
gvm-1/
├── assets/
│   ├── logos/               # Logos da GVM (horizontal, stacked, símbolo)
│   └── page/                # Imagens de página, portfólio e equipe
│
├── public/
│   ├── favicon.png          # Ícone do site (símbolo GVM)
│   ├── robots.txt           # Crawlers, incluindo os robôs de IA
│   └── 404.html             # Fallback SPA (GitHub Pages / compatibilidade)
│                            # sitemap.xml, llms.txt e llms-full.txt são
│                            # gerados no build, não ficam aqui
│
├── scripts/
│   ├── prerender.mjs        # Pré-renderização + sitemap + head do HTML
│   └── llms-txt.mjs         # Conteúdo do /llms.txt e /llms-full.txt
│
├── docs/
│   └── seo/
│       └── checklist-google.md  # ⭐ Correções no Google Meu Negócio e Search Console
│
├── src/
│   ├── components/
│   │   ├── BrandIcons.jsx   # SVGs oficiais: WhatsApp, Instagram, LinkedIn
│   │   ├── ButtonLink.jsx   # Botão com navegação interna
│   │   ├── CTASection.jsx   # Faixa de conversão (aparece em todas as páginas)
│   │   ├── Footer.jsx       # Rodapé global
│   │   ├── Header.jsx       # Navbar global
│   │   ├── Hero.jsx         # Hero da Home (com visual e proof)
│   │   ├── NavLink.jsx      # Link de navegação com estado ativo
│   │   ├── PageIntro.jsx    # Hero das páginas internas
│   │   ├── ProjectCard.jsx  # Card de projeto do portfólio
│   │   ├── Reveal.jsx       # Wrapper de animação scroll (IntersectionObserver)
│   │   ├── SectionHeader.jsx# Título + subtítulo de seção
│   │   ├── ServiceCard.jsx  # Card de serviço
│   │   └── Stepper.jsx      # Stepper animado (Motion) — reservado
│   │
│   ├── data/
│   │   ├── content.js       # ⭐ FONTE ÚNICA DE DADOS do site
│   │   └── seo.js           # ⭐ Títulos, canonical, schema.org e SITE_URL
│   │
│   ├── hooks/
│   │   └── useReveal.js     # Hook do IntersectionObserver para animações
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx        # Sobre — fundadores, história, valores
│   │   ├── Services.jsx     # Serviços — cards, detalhes, processo, FAQ
│   │   ├── Portfolio.jsx    # Portfólio — grid com filtros
│   │   ├── Contact.jsx      # Contato — formulário → WhatsApp
│   │   └── NotFound.jsx     # Página 404
│   │
│   ├── App.jsx              # Roteamento e shell da aplicação
│   ├── main.jsx             # Ponto de entrada no navegador (hidrata o HTML pronto)
│   ├── entry-server.jsx     # Ponto de entrada do build (pré-renderização)
│   └── styles.css           # Todos os estilos globais
│
└── index.html               # HTML raiz (meta tags, OG, favicon, fonte)
```

---

## 🚀 Rodar localmente

```bash
# Instalar dependências
npm install

# Subir servidor de desenvolvimento
npm run dev
# → http://127.0.0.1:5173

# Build de produção
npm run build

# Pré-visualizar build
npm run preview
```

O `npm run build` roda em três etapas: o build normal do Vite, um build para Node
(`src/entry-server.jsx`) e o `scripts/prerender.mjs`, que renderiza cada rota,
grava o HTML dentro do `<div id="root">` e gera `sitemap.xml`, `llms.txt` e
`llms-full.txt`.

Ao pré-visualizar, use a **barra final** nas rotas internas
(`http://127.0.0.1:4173/sobre/`). Sem ela o `vite preview` cai no fallback de SPA
e devolve a home; na Vercel os rewrites do `vercel.json` já entregam o arquivo
certo.

---

## 🔎 SEO e visibilidade em LLMs

Tudo que descreve o site para buscadores e modelos de linguagem nasce de duas
fontes: `src/data/content.js` (o conteúdo) e `src/data/seo.js` (títulos,
descrições, canonical e schema.org).

| Arquivo publicado | De onde vem |
| ----------------- | ----------- |
| `<title>`, meta tags e JSON-LD de cada página | `src/data/seo.js`, gravados no build |
| `/sitemap.xml` | gerado de `seoPages` (`scripts/prerender.mjs`) |
| `/llms.txt` e `/llms-full.txt` | gerados de `content.js` (`scripts/llms-txt.mjs`) |
| `/robots.txt` | `public/robots.txt` (arquivo manual) |

**Ao mudar de domínio**, altere apenas `SITE_URL` em `src/data/seo.js` — canonical,
sitemap, dados estruturados e llms.txt seguem junto. O `public/robots.txt` é o
único que precisa de ajuste manual.

As correções que **não são de código** — perfil do Google Meu Negócio, Search
Console, avaliações — estão em
[`docs/seo/checklist-google.md`](docs/seo/checklist-google.md).

---

## ✏️ Guia de mudanças comuns

> **Regra de ouro:** quase tudo que aparece no site está em `src/data/content.js`. Comece por lá.

### Alterar textos, serviços ou projetos

Abra `src/data/content.js` e edite o array correspondente:

| O que mudar | Array/objeto em `content.js` |
|-------------|------------------------------|
| Itens do menu | `navItems` |
| Cards de serviço | `services` |
| Cards do portfólio | `projects` |
| Fundadores | `founders` |
| Etapas do processo | `processSteps` |
| Diferenciais (proof points) | `proofPoints` |
| Perguntas frequentes | `faqs` |
| Métodos de contato | `contactMethods` |

### Alterar número de WhatsApp

Buscar e substituir em todo o projeto:

```
559284214298  →  55XXXXXXXXXXX
```

Ocorre em: `CTASection.jsx`, `Services.jsx`, `Contact.jsx`, `Footer.jsx`

### Alterar e-mail

Buscar e substituir:

```
contato.gvmdigital@gmail.com  →  novo@email.com
```

Ocorre em: `content.js` (contactMethods), `Footer.jsx`

### Adicionar/remover serviço

Em `content.js`, adicionar objeto ao array `services`:

```js
{
  title: "Nome do Serviço",
  icon: NomeDoIcone,       // importar de lucide-react
  summary: "Descrição curta exibida no card.",
  details: ["Item 1", "Item 2", "Item 3", "Item 4"]
}
```

### Adicionar projeto ao portfólio

1. Adicionar a imagem em `assets/page/portfolio-card-nome.png`
2. Registrar o asset em `content.js` → objeto `assets.projects`
3. Adicionar objeto ao array `projects`:

```js
{
  title: "Nome do Projeto",
  type: "Tipo exibido no card",
  category: "Projetos reais",  // usado no filtro
  tags: ["Tag1", "Tag2"],
  image: assets.projects.nome,
  description: "Descrição do projeto."
}
```

> Categorias de filtro disponíveis: `"Projetos reais"`, `"Protótipos"`, `"Plataformas"`, `"Automação"`

### Alterar foto de fundador

Substituir o arquivo correspondente em `assets/page/`:

```
founder-gustavo.png
founder-vitor.png
founder-mayllon.png
```

Manter o mesmo nome de arquivo — o asset é referenciado automaticamente.

### Adicionar ícone de rede social ao rodapé

Em `Footer.jsx`, adicionar um `<a>` na `.social-row`:

```jsx
<a href="https://..." target="_blank" rel="noreferrer" aria-label="Nome da rede">
  <NomeDoIcone size={18} />
</a>
```

Para redes com ícone oficial (Instagram, WhatsApp, LinkedIn) usar `BrandIcons.jsx`. Para outras, usar Lucide React.

### Alterar cores globais

Em `src/styles.css`, bloco `:root` no início do arquivo:

```css
:root {
  --blue-600: #005bff;   /* azul principal */
  --navy-900: #06123a;   /* azul escuro / fundo dark */
  --soft: #f5f7ff;       /* fundo suave */
  --white: #ffffff;
  --muted: #3d4b6b;      /* texto secundário */
  --line: #e4e9f5;       /* bordas */
}
```

---

## 🎯 Campanha temporária — Conversão GVM (clínicas de estética)

Campanha direcionada a clínicas de estética avançada em Vieiralves/Adrianópolis (Manaus). Ela adiciona um CTA na Home, um item "Clínicas" no menu e a rota `/clinicas` com a landing page da oferta.

**Para desligar a campanha (1 linha):** em `src/data/campaign.js`, mude

```js
export const CAMPAIGN_ENABLED = true;   // →  false
```

Isso remove o CTA da Home, o item do menu, a rota (passa a responder 404) e as meta tags da oferta. Todos os textos, valores e listas da oferta também ficam nesse arquivo.

**Para remover de vez**, apague os arquivos e as linhas marcadas com o comentário `campanha temporária`:

| Arquivo | O que remover |
|---------|---------------|
| `src/data/campaign.js` | arquivo inteiro |
| `src/components/CampaignBanner.jsx` | arquivo inteiro |
| `src/pages/Campaign.jsx` | arquivo inteiro |
| `clinicas/index.html` | pasta inteira |
| `src/styles.css` | bloco `Campanha temporária: Conversão GVM` |
| `src/App.jsx`, `src/pages/Home.jsx`, `src/data/content.js`, `src/data/seo.js` | linhas com `// campanha temporária` |
| `vite.config.js`, `vercel.json` | entrada `clinicas` |

---

## 📋 O que ainda está pendente

### 🔴 Prioritário

- [ ] **Corrigir o site no Google Meu Negócio** — o perfil da GVM aponta para `gvmdigital.com`, que é de uma agência americana homônima. É a causa principal de outras empresas aparecerem antes da GVM na busca. Passo a passo em [`docs/seo/checklist-google.md`](docs/seo/checklist-google.md)
- [ ] **Domínio próprio** — `gvmdigital.com.br` ou `gvm.digital`. O `.com` está ocupado pelo homônimo. Trocar exige alterar só `SITE_URL` em `src/data/seo.js`
- [x] **Meta tags dinâmicas por página** — cada rota tem título, descrição, canonical e dados estruturados próprios (`src/data/seo.js`), gravados no HTML durante o build
- [x] **Conteúdo legível sem JavaScript** — páginas pré-renderizadas no build (`scripts/prerender.mjs`); antes o HTML chegava vazio para buscadores e LLMs
- [ ] **Integração de formulário real** — o formulário monta a mensagem e abre o WhatsApp, mas não armazena os dados em nenhum lugar. Integrar com [Formspree](https://formspree.io), [EmailJS](https://emailjs.com) ou Supabase para receber os dados também por e-mail
- [ ] **LinkedIn da empresa** — não há perfil de empresa. Criar página no LinkedIn e adicionar ao rodapé

### 🟡 Importante

- [ ] **Depoimentos de clientes** — seção de `testimonials` na Home ou na página Sobre (reforça credibilidade)
- [x] **Preload das imagens hero** — o React 19 gera o `<link rel="preload">` das imagens com `fetchPriority="high"`, e a pré-renderização o grava no `<head>`
- [x] **OG image personalizada** — imagem 1200×630px criada em `public/og-image.png` para compartilhamento no WhatsApp/Instagram/LinkedIn
- [ ] **Google Analytics / Meta Pixel** — sem rastreamento de visitas ou conversões

### 🔵 Melhorias futuras

- [ ] **Blog / Conteúdo** — seção de artigos para SEO orgânico
- [x] **Domínio e HTTPS confirmados** — URL canônica `https://gvmdigital.vercel.app/` em produção na Vercel, usada no `sitemap.xml` e `robots.txt`
- [ ] **PWA / Manifest** — adicionar `manifest.json` para instalação como app no celular
- [ ] **Lazy loading dos assets de portfólio** — as imagens já têm `loading="lazy"`, mas pode ser otimizado com `srcset` responsivo

---

## 🌐 Deploy

O site é um SPA em React hospedado na **[Vercel](https://gvmdigital.vercel.app)**, com as páginas **pré-renderizadas no build**: o HTML entregue já contém todo o texto, e o React apenas hidrata essa marcação no navegador. Isso existe para que buscadores e modelos de linguagem consigam ler o conteúdo sem executar JavaScript.

O arquivo `vercel.json` na raiz do projeto configura os rewrites de rota, garantindo que caminhos como `/servicos` ou `/portfolio` funcionem corretamente ao serem acessados diretamente ou ao recarregar a página:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Para fazer deploy após alterações:

```bash
# Commitar e enviar para o GitHub
git add .
git commit -m "descrição das mudanças"
git push origin main
# A Vercel detecta o push e faz o deploy automaticamente
```

---

## 📞 Contato GVM Digital

| Canal | Endereço |
|-------|----------|
| E-mail | contato.gvmdigital@gmail.com |
| WhatsApp | +55 (92) 8421-4298 |
| Instagram | [@gvmdigital_](https://www.instagram.com/gvmdigital_/) |

---

<div align="center">

Feito com dedicação pela equipe **GVM Digital** · © 2026

</div>
