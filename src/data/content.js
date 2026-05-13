import {
  Bot,
  Code2,
  Compass,
  FileCode2,
  Flag,
  Headphones,
  LineChart,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  UsersRound
} from "lucide-react";

export const assets = {
  logoHorizontal: new URL("../../assets/logos/gvm-logo-horizontal-color.png", import.meta.url).href,
  logoStacked: new URL("../../assets/logos/gvm-logo-stacked-color.png", import.meta.url).href,
  symbol: new URL("../../assets/logos/gvm-symbol-geometric-color.png", import.meta.url).href,
  heroDevices: new URL("../../assets/generated/hero-devices.png", import.meta.url).href,
  office: new URL("../../assets/page/office-team.png", import.meta.url).href,
  founders: {
    gustavo: new URL("../../assets/page/founder-gustavo.png", import.meta.url).href,
    vitor: new URL("../../assets/page/founder-vitor.png", import.meta.url).href,
    mayllon: new URL("../../assets/page/founder-mayllon.png", import.meta.url).href
  },
  projects: {
    sj: new URL("../../assets/page/portfolio-card-sj-sports.png", import.meta.url).href,
    itesam: new URL("../../assets/page/portfolio-card-itesam.png", import.meta.url).href,
    facelog: new URL("../../assets/page/portfolio-card-facelog.png", import.meta.url).href,
    access: new URL("../../assets/page/portfolio-card-access.png", import.meta.url).href,
    gvm: new URL("../../assets/page/portfolio-card-gvm.png", import.meta.url).href,
    automation: new URL("../../assets/page/portfolio-card-automation.png", import.meta.url).href
  }
};

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Contato", path: "/contato" }
];

export const services = [
  {
    title: "Criação de Sites",
    icon: MonitorSmartphone,
    summary: "Sites institucionais rápidos, responsivos e preparados para transmitir confiança desde o primeiro acesso.",
    details: ["Design moderno e responsivo", "Estrutura orientada a conversão", "SEO técnico básico", "Integrações essenciais"]
  },
  {
    title: "Landing Pages",
    icon: FileCode2,
    summary: "Páginas estratégicas para campanhas, lançamentos e captação de leads qualificados.",
    details: ["Copy comercial clara", "Formulários e CTAs", "Alta performance", "Layout focado em conversão"]
  },
  {
    title: "Identidade Visual",
    icon: PenTool,
    summary: "Marcas profissionais com logotipo, paleta, tipografia e aplicações para presença consistente.",
    details: ["Logotipo e variações", "Paleta e tipografia", "Aplicações da marca", "Manual de uso básico"]
  },
  {
    title: "Automações",
    icon: Bot,
    summary: "Fluxos inteligentes para reduzir tarefas repetitivas, organizar dados e ganhar produtividade.",
    details: ["Mapeamento de processos", "Automação operacional", "Integrações entre ferramentas", "Redução de retrabalho"]
  },
  {
    title: "Prospecção Digital",
    icon: UsersRound,
    summary: "Estratégias para atrair, qualificar e transformar visitantes em oportunidades reais de negócio.",
    details: ["Definição de público", "Estratégia de canais", "Captação de contatos", "Acompanhamento de resultados"]
  },
  {
    title: "Consultoria Estratégica",
    icon: Compass,
    summary: "Planejamento para posicionamento digital, melhoria de presença online e decisões orientadas a dados.",
    details: ["Diagnóstico digital", "Plano de ação", "Priorização de canais", "Evolução contínua"]
  }
];

export const proofPoints = [
  { title: "Estratégia alinhada",  text: "Planejamento conectado aos objetivos do negócio.",                        icon: Target     },
  { title: "Design que vende",     text: "Interfaces bonitas, claras e pensadas para conversão.",                   icon: Palette    },
  { title: "Performance real",     text: "Experiências rápidas, responsivas e fáceis de usar.",                     icon: LineChart  },
  { title: "Atendimento próximo",  text: "Contato direto com quem entende e executa o projeto.",                    icon: Headphones },
  { title: "Entrega no prazo",     text: "Comprometimento com cronograma e transparência em cada etapa.",           icon: ShieldCheck}
];

export const processSteps = [
  { title: "Descoberta",   text: "Entendemos seu negócio, objetivos, público e desafios.",                          icon: Search },
  { title: "Estratégia",  text: "Definimos estrutura, prioridades e plano de execução.",                           icon: Flag   },
  { title: "Execução",    text: "Criamos design, desenvolvimento e integrações com foco em resultado.",             icon: Code2  },
  { title: "Crescimento", text: "Acompanhamos, ajustamos e evoluímos sua presença digital.",                       icon: Rocket }
];

export const projects = [
  {
    title: "SJ Sports",
    type: "E-commerce",
    category: "Projetos reais",
    tags: ["Site", "Vendas", "Performance"],
    image: assets.projects.sj,
    description: "E-commerce para loja de artigos esportivos com jornada de compra, frete e painel administrativo."
  },
  {
    title: "ITESAM",
    type: "Site institucional",
    category: "Projetos reais",
    tags: ["Institucional", "Educação", "Portal"],
    image: assets.projects.itesam,
    description: "Site institucional para faculdade com cursos, vestibular online, blog e portal do aluno."
  },
  {
    title: "FaceLog",
    type: "Plataforma",
    category: "Plataformas",
    tags: ["Sistema", "Gestão", "Relatórios"],
    image: assets.projects.facelog,
    description: "Sistema de controle de ponto facial e gestão de equipes com relatórios e geolocalização."
  },
  {
    title: "Access Platform",
    type: "Sistema interno",
    category: "Plataformas",
    tags: ["Acessos", "Auditoria", "Segurança"],
    image: assets.projects.access,
    description: "Plataforma para gestão de acessos, permissões e auditoria de sistemas."
  },
  {
    title: "GVM Digital",
    type: "Protótipo",
    category: "Protótipos",
    tags: ["Branding", "Site", "Conversão"],
    image: assets.projects.gvm,
    description: "Protótipo do novo site institucional com foco em presença digital, conversão e performance."
  },
  {
    title: "Automação Interna",
    type: "Automação",
    category: "Automação",
    tags: ["Fluxos", "Integração", "Produtividade"],
    image: assets.projects.automation,
    description: "Automações e integrações entre ferramentas para otimizar tarefas e reduzir retrabalho."
  }
];

export const founders = [
  {
    name: "Gustavo",
    role: "Estratégia comercial",
    image: assets.founders.gustavo,
    text: "Responsável por posicionamento, relacionamento com clientes e oportunidades comerciais.",
    linkedin: "https://www.linkedin.com/in/lu%C3%ADs-gustavo-88a50b408/"
  },
  {
    name: "Vítor",
    role: "Tecnologia e produto",
    image: assets.founders.vitor,
    text: "Conduz arquitetura, desenvolvimento e experiência digital dos projetos.",
    linkedin: "https://www.linkedin.com/in/vitorgrowth/"
  },
  {
    name: "Mayllon",
    role: "Design e operação",
    image: assets.founders.mayllon,
    text: "Cuida da consistência visual, organização de entregas e qualidade operacional.",
    linkedin: "https://www.linkedin.com/in/mayllon-mattos-336496268/"
  }
];

export const contactMethods = [
  { title: "WhatsApp oficial",    text: "Fale com a equipe e explique seu projeto em poucos minutos.", icon: MessageCircle, href: "https://wa.me/559284214298" },
  { title: "E-mail",              text: "contato.gvmdigital@gmail.com",                                icon: Mail,          href: "mailto:contato.gvmdigital@gmail.com" },
  { title: "Atendimento online",  text: "Reuniões remotas para empresas de todo o Brasil.",            icon: MapPin }
];

export const faqs = [
  {
    question: "A GVM Digital atende empresas de qualquer cidade?",
    answer: "Sim. O atendimento é online, com reuniões, alinhamentos e entregas digitais para todo o Brasil."
  },
  {
    question: "O site já fica pronto para celular?",
    answer: "Sim. A estrutura é responsiva desde o início para funcionar bem em desktop, tablet e smartphone."
  },
  {
    question: "Vocês também criam identidade visual?",
    answer: "Sim. Podemos criar logotipo, paleta, tipografia e aplicações para manter a presença da marca consistente."
  },
  {
    question: "Como funciona o processo de contato?",
    answer: "Você preenche o formulário com os dados do projeto e a mensagem é enviada diretamente para nosso WhatsApp. Respondemos em até 24 horas."
  }
];
