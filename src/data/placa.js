/**
 * PLAQUINHA NFC + QR CODE — pré-venda que vira página de vendas sozinha.
 *
 * Tudo que é específico da plaquinha vive aqui e nos arquivos:
 *   src/pages/Placa.jsx              (a página, nas duas fases)
 *   src/components/PlacaBanner.jsx   (chamada na Home)
 *   src/lib/placaLeads.js            (envio do formulário para o Supabase)
 *   src/styles.css                   (bloco "Plaquinha NFC")
 *   placa/index.html                 (shell estático para SEO / preview no WhatsApp)
 *   supabase/migrations/             (tabela plaquinha_leads)
 *
 * Fases:
 *   "pre-venda"  até SALES_START — formulário da lista de interesse.
 *   "venda"      a partir de SALES_START — o mesmo formulário vira pedido.
 * A troca acontece no navegador, pela data, sem precisar de novo deploy.
 * Para conferir a fase de vendas antes da data: /placa?fase=venda
 *
 * Os cadastros ficam na tabela plaquinha_leads do projeto "gvm-digital" no
 * Supabase (Table Editor). Detalhes no README, seção "Plaquinha NFC".
 */
import { MonitorSmartphone, Nfc, QrCode, Star } from "lucide-react";

export const PLACA_ENABLED = true;

export const PLACA_PATH = "/placa";

// Horário de Manaus (UTC-4). Mude aqui para antecipar ou adiar a abertura das vendas.
export const SALES_START = "2026-10-14T08:00:00-04:00";

export const PHASES = { presale: "pre-venda", sales: "venda" };

export function getPlacaPhase(date = new Date()) {
  return date.getTime() >= Date.parse(SALES_START) ? PHASES.sales : PHASES.presale;
}

// Chave publicável: feita para ficar no navegador. A tabela só aceita INSERT
// dessa chave (RLS); ler, alterar ou apagar exige entrar no painel do Supabase.
export const placaSupabase = {
  url: "https://ijvaccyksfxstomnhztz.supabase.co",
  publishableKey: "sb_publishable_5R_bwgIhktQP09vgon6SAQ_BPht256K",
  table: "plaquinha_leads"
};

export const INSTAGRAM_DIRECT_URL = "https://ig.me/m/gvmdigital_";

export const placaSeo = {
  title: "Plaquinha NFC + QR Code para avaliações no Google | GVM Digital",
  description:
    "Plaquinha de balcão com NFC e QR Code que leva o cliente para avaliar o seu negócio no Google. R$ 70 por unidade, venda presencial em Manaus.",
  priority: "0.8"
};

export const placa = {
  name: "Plaquinha NFC + QR Code",
  shortName: "Plaquinha NFC",
  price: "R$ 70",
  priceValue: "70.00",
  unit: "por unidade",
  sale: "Venda presencial",
  images: {
    black: new URL("../../assets/page/placa-nfc-preta.webp", import.meta.url).href,
    white: new URL("../../assets/page/placa-nfc-branca.webp", import.meta.url).href
  },
  steps: [
    { title: "Aproxime ou aponte",   text: "O cliente encosta um celular com NFC na plaquinha ou aponta a câmera para o QR Code.", icon: Nfc               },
    { title: "Abre a sua página",    text: "Configurada com o link do seu negócio, ela leva direto para as avaliações, sem precisar buscar o nome.", icon: MonitorSmartphone },
    { title: "O cliente avalia",     text: "Com a conta Google conectada, é só escolher as estrelas e escrever. A avaliação continua sendo escolha dele.", icon: Star              }
  ],
  versions: [
    { id: "branca", title: "Branca", text: "Fundo claro com faixas coloridas. Combina com balcões claros e ambientes iluminados.", image: "white" },
    { id: "preta",  title: "Preta",  text: "Fundo escuro com faixas coloridas. Destaca em balcões de madeira e ambientes escuros.", image: "black" }
  ],
  highlights: [
    { text: "NFC e QR Code na mesma peça", icon: QrCode },
    { text: "Suporte de balcão, visível durante o atendimento", icon: MonitorSmartphone },
    { text: "Funciona em celulares sem NFC, pelo QR Code", icon: Nfc }
  ],
  colorOptions: [
    { value: "branca", label: "Branca" },
    { value: "preta", label: "Preta" },
    { value: "indeciso", label: "Ainda não sei" }
  ],
  faqs: [
    {
      question: "Quanto custa a plaquinha? Tem mensalidade?",
      answer:
        "A plaquinha custa R$ 70 por unidade, com venda presencial. Fale com a gente para confirmar o que está incluído e se existe algum custo adicional."
    },
    {
      question: "Como funciona? Meu cliente precisa ter NFC?",
      answer:
        "O cliente aproxima um celular compatível com NFC ou escaneia o QR Code com a câmera. Quem não tem NFC pode usar o QR Code. Para publicar a avaliação, precisa de internet e estar conectado a uma conta Google."
    },
    {
      question: "A plaquinha abre as avaliações da minha empresa?",
      answer:
        "Quando configurada com o link correto, ela direciona o cliente às avaliações do seu negócio, evitando a busca pelo nome. Antes da compra, confirme com a gente como será feita essa configuração."
    },
    {
      question: "Por que comprar a plaquinha em vez de imprimir um QR Code?",
      answer:
        "Ela reúne aproximação NFC e QR Code em um suporte para o balcão. Isso oferece duas formas de acesso e deixa o convite para avaliar visível durante o atendimento. Facilita o processo; a avaliação continua sendo uma escolha do cliente."
    },
    {
      question: "Como faço para comprar? Já está disponível?",
      answer: {
        [PHASES.presale]:
          "Estamos em pré-lançamento. Entre na lista de interesse aqui na página ou envie PLACA no direct da GVM para receber informações sobre disponibilidade e compra presencial.",
        [PHASES.sales]:
          "Sim, as vendas estão abertas. Faça seu pedido aqui na página ou envie PLACA no direct da GVM. Chamamos você no WhatsApp para combinar a entrega presencial e o pagamento."
      }
    }
  ]
};

/** FAQ com as respostas da fase informada (a última pergunta muda com a fase). */
export function getPlacaFaqs(phase) {
  return placa.faqs.map((faq) => ({
    question: faq.question,
    answer: typeof faq.answer === "string" ? faq.answer : faq.answer[phase]
  }));
}

/** Textos que mudam entre pré-venda e venda. */
export const phaseCopy = {
  [PHASES.presale]: {
    pill: "Pré-lançamento",
    lead: "Entre na lista de interesse e seja avisado assim que as vendas abrirem.",
    cta: "Quero entrar na lista de interesse",
    formLabel: "Lista de interesse",
    formTitle: 'Quer saber quando <span>chegar?</span>',
    formText: "Deixe seu contato e avisamos pelo WhatsApp assim que a plaquinha estiver disponível. Sem compromisso de compra.",
    notesLabel: "Alguma dúvida? (opcional)",
    notesPlaceholder: "Ex.: quero uma para cada caixa da loja.",
    submit: "Entrar na lista",
    success: "Pronto, você está na lista! Avisamos pelo WhatsApp assim que as vendas abrirem.",
    duplicate: "Esse WhatsApp já está na lista. Avisamos assim que as vendas abrirem."
  },
  [PHASES.sales]: {
    pill: "Vendas abertas",
    lead: "Faça seu pedido aqui e combinamos a entrega presencial pelo WhatsApp.",
    cta: "Quero comprar a minha",
    formLabel: "Pedido",
    formTitle: 'Garanta a sua <span>plaquinha</span>',
    formText: "Preencha o pedido e chamamos você no WhatsApp para combinar a entrega presencial e o pagamento.",
    notesLabel: "Bairro e melhor horário para a entrega (opcional)",
    notesPlaceholder: "Ex.: Adrianópolis, depois das 14h.",
    submit: "Enviar pedido",
    success: "Pedido recebido! Vamos chamar você no WhatsApp para combinar a entrega e o pagamento.",
    duplicate: "Já temos um pedido com esse WhatsApp. Vamos chamar você para confirmar os detalhes."
  }
};
