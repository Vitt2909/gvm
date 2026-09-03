/**
 * CAMPANHA TEMPORÁRIA — Conversão GVM (clínicas de estética, Manaus)
 *
 * Tudo que é específico desta campanha vive aqui e nos arquivos:
 *   src/components/CampaignBanner.jsx  (CTA na Home)
 *   src/pages/Campaign.jsx             (landing page da oferta)
 *   src/styles.css                     (bloco "Campanha temporária")
 *   clinicas/index.html                (shell estático para SEO / preview no WhatsApp)
 *
 * Para DESLIGAR a campanha: mude CAMPAIGN_ENABLED para false.
 * Isso remove o CTA da Home, o item do menu, a rota e as meta tags da oferta.
 * Para REMOVER de vez: apague os arquivos acima, as linhas marcadas com
 * "campanha" em App.jsx, content.js, seo.js, vite.config.js, vercel.json
 * e public/sitemap.xml.
 */
import {
  BarChart3,
  Bot,
  CalendarClock,
  CalendarCheck,
  ClipboardList,
  Globe,
  Headphones,
  Hourglass,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  TrendingDown,
  Wrench
} from "lucide-react";

export const CAMPAIGN_ENABLED = true;

export const CAMPAIGN_PATH = "/clinicas";

// className: o item some entre 821px e 1080px para não estourar a barra de navegação
export const campaignNavItem = { label: "Clínicas", path: CAMPAIGN_PATH, className: "campaign-nav-item" };

export const campaignSeo = {
  title: "Conversão GVM | Site, WhatsApp e agenda para clínicas de estética em Manaus",
  description:
    "Pacote mensal para clínicas de estética avançada em Vieiralves e Adrianópolis: site, integração com WhatsApp e agenda, formulário e automação de perguntas frequentes. Condição de lançamento para 3 clínicas.",
  priority: "0.9"
};

const whatsAppMessage =
  "Olá, GVM Digital. Tenho interesse no pacote Conversão GVM para clínicas (condição de lançamento). Quero saber se ainda há vaga.";

export const campaign = {
  name: "Conversão GVM",
  region: "Vieiralves e Adrianópolis, Manaus (AM)",
  whatsAppUrl: `https://wa.me/559284214298?text=${encodeURIComponent(whatsAppMessage)}`,
  pricing: {
    regular: "R$ 897",
    launch: "R$ 797",
    period: "/mês",
    slots: 3,
    minimumTerm: "3 meses",
    setup: "Gratuita, condicionada à permanência mínima de 3 meses",
    domain: "R$ 48/ano, cobrado à parte e registrado em nome do cliente (R$ 40 de registro + R$ 8 de configuração e gestão de DNS)"
  },
  audience: [
    { title: "Harmonização facial",         text: "Preenchimentos, toxina e protocolos faciais com agenda de avaliações.",     icon: Sparkles    },
    { title: "Biomedicina estética",        text: "Procedimentos injetáveis e tecnologias estéticas não cirúrgicas.",           icon: Syringe     },
    { title: "Medicina estética",           text: "Consultórios e clínicas médicas com foco em estética avançada.",             icon: Stethoscope },
    { title: "Odontologia com foco estético", text: "Lentes, clareamento, alinhadores e harmonização orofacial.",               icon: Smile       }
  ],
  problem: [
    { title: "O lead chega pelo direct ou WhatsApp", text: "A pessoa viu um post, se interessou e mandou mensagem. Até aqui, tudo certo.",                                    icon: MessageCircle },
    { title: "A resposta depende de alguém livre",   text: "Quem responde está em atendimento, em procedimento ou fora do expediente. A mensagem fica esperando.",              icon: Hourglass     },
    { title: "Fora do horário, ninguém agenda",      text: "À noite e no fim de semana não existe um caminho para consultar horários ou marcar uma avaliação.",                icon: CalendarClock },
    { title: "A oportunidade esfria no caminho",     text: "Sem resposta rápida e sem próximo passo claro, o interesse some antes de virar um agendamento.",                   icon: TrendingDown  }
  ],
  solution: [
    "Página profissional com o próximo passo claro para quem chega do Instagram",
    "Automação básica que responde às perguntas mais frequentes a qualquer hora",
    "Link de agenda integrado para marcar avaliação sem depender de alguém online",
    "Formulário de captação que organiza o contato para a sua equipe responder"
  ],
  included: [
    { text: "Site ou landing page de até 5 páginas",   icon: MonitorSmartphone },
    { text: "Hospedagem e certificado SSL",             icon: Globe             },
    { text: "Integração com WhatsApp",                  icon: MessageCircle     },
    { text: "Integração com agenda externa",            icon: CalendarCheck     },
    { text: "Formulário de captação",                   icon: ClipboardList     },
    { text: "Automação básica de perguntas frequentes", icon: Bot               },
    { text: "Duas pequenas alterações mensais",         icon: Wrench            },
    { text: "Monitoramento e suporte",                  icon: Headphones        },
    { text: "Relatório mensal simplificado",            icon: BarChart3         }
  ],
  excluded: [
    "WhatsApp Business API oficial",
    "Disparos de SMS ou e-mail em volume",
    "Assinatura de ferramenta de agendamento",
    "Banco de dados dedicado",
    "Sistema personalizado",
    "Consumo ilimitado de IA",
    "Tráfego pago"
  ],
  nextSteps: [
    { title: "Você chama no WhatsApp",     text: "Pelo formulário ou pelo botão direto. Sem compromisso.",                          icon: MessagesSquare },
    { title: "Conversa sobre a clínica",   text: "Entendemos como os contatos chegam hoje e alinhamos o escopo do pacote.",          icon: Stethoscope    },
    { title: "Confirmação da vaga",        text: "Se fizer sentido para os dois lados, confirmamos a condição de lançamento.",       icon: CalendarCheck  },
    { title: "Implantação e acompanhamento", text: "Colocamos tudo no ar e seguimos com suporte e relatório mensal.",               icon: Headphones     }
  ],
  faqs: [
    {
      question: "Vocês garantem uma quantidade de leads ou agendamentos?",
      answer: "Não. O pacote organiza o caminho entre o contato e o agendamento, mas o volume depende de fatores fora do nosso controle, como conteúdo, indicação e demanda da região. Não trabalhamos com promessa de resultado."
    },
    {
      question: "A automação atende 24 horas?",
      answer: "A automação responde a perguntas frequentes a qualquer hora e direciona para a agenda ou para o formulário. O atendimento humano continua sendo feito pela equipe da clínica, no horário de funcionamento."
    },
    {
      question: "Posso pedir alterações no site depois que estiver no ar?",
      answer: "O pacote inclui duas pequenas alterações por mês, como trocar um texto, uma imagem ou um horário. Mudanças maiores ou um sistema sob medida são orçados à parte."
    },
    {
      question: "O domínio fica em nome de quem?",
      answer: "Em nome da clínica. O domínio custa R$ 48 por ano, cobrado à parte: R$ 40 de registro e R$ 8 de configuração e gestão de DNS."
    },
    {
      question: "Tráfego pago está incluído?",
      answer: "Não. Anúncios, mídia paga e ferramentas de disparo em volume ficam fora do pacote. Se quiser, orçamos separadamente."
    }
  ]
};
