import type { EventConfig } from "@/types/event";

export const eventConfig = {
  institutionName: "Ministério da Saúde",
  title: "LI Conselho Coordenador de Saúde",
  shortTitle: "LI CCS",
  edition: 51,
  description:
    "LI Conselho Coordenador de Saúde – Ministério da Saúde de Moçambique",
  slogan: "O NOSSO MAIOR VALOR É A VIDA",
  lema: "Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos",
  location: "Cidade da Beira",
  province: "Província da Sofala",
  country: "Moçambique",
  dateRange: "09 - 11 de Setembro de 2026",
  startDate: "2026-09-09",
  endDate: "2026-09-11",
  mapsUrl: "https://maps.google.com/maps?q=Beira,+Sofala,+Moçambique",
  calendarTitle: "LI Conselho Coordenador de Saúde",
  calendarDetails:
    "LI Conselho Coordenador de Saúde do Ministério da Saúde de Moçambique, realizado na Cidade da Beira.",
  calendarLocation: "Cidade da Beira, Sofala, Moçambique",
  calendarDates: "20260909T060000Z/20260911T150000Z",
  organizer: "Direcção de Planificação e Cooperação (DPC)",
  aboutEventText:
    "O Conselho Coordenador de Saúde é um órgão consultivo estratégico, convocado e presidido pelo Ministro da Saúde. A sua actuação visa assegurar a articulação, a planificação estratégica e a monitoria da implementação das políticas do sector, garantindo o alinhamento dos objectivos em todos os níveis de intervenção.",
  heroImage: "/fotografias/hero-evento.jpeg",
  heroImageAlt:
    "Imagem oficial do LI Conselho Coordenador de Saúde",
  aboutEventImage: "/fotografias/sobre-o-evento.jpeg",
  aboutEventImageAlt:
    "Momento do LI Conselho Coordenador de Saúde — sobre o evento",
  generalObjective:
    "Avaliar o desempenho sectorial e estabelecer as directrizes estratégicas para o desenvolvimento da saúde, assegurando o alinhamento das políticas e compromissos institucionais com vista à promoção da eficiência e sustentabilidade do sector.",
  specificObjectives: [
    {
      title: "Avaliar o desempenho e o cumprimento de metas sectoriais",
      description:
        "Avaliar o desempenho do sector (2025–2026) e o nível de implementação do PQG 2025–2029 e das recomendações do conselho anterior, identificando resultados, desafios e medidas correctivas.",
    },
    {
      title: "Planificar e orientar as prioridades estratégicas futuras",
      description:
        "Definir as prioridades e linhas estratégicas do sector para orientar a elaboração do PESOE 2027, garantindo o alinhamento com o PESS 2026–2035.",
    },
    {
      title: "Fortalecer a eficiência institucional e deliberar sobre matérias estratégicas",
      description:
        "Harmonizar intervenções, responsabilidades e compromissos para reforçar a eficiência e sustentabilidade do sector.",
    },
  ],
  expectedResults: [
    "Grau de cumprimento das recomendações anteriores e desempenho do sector (2025 – 2026) devidamente analisados, com os principais sucessos e estrangulamentos identificados.",
    "Linhas estratégicas e prioridades sectoriais claramente definidas para orientar o processo de elaboração do PESOE 2027.",
    "Intervenções, papéis e compromissos partilhados entre os diferentes actores harmonizados com vista a aumentar a eficiência e sustentabilidade do sector.",
  ],
  methodology: {
    format: "Presencial",
    dynamics: [
      "Discussões em plenária e painéis de discussão, com apresentações em PPT",
    ],
    plenaryTopics: ["Prestação de contas, discussão e informativos"],
  },
} as const satisfies EventConfig;

/** @deprecated Use eventConfig */
export const ccs2026Event = eventConfig;

export type {
  EventTheme,
  EventAgendaDay,
  EventSession,
  EventProgramDay,
  EventConfig,
  EventMethodology,
  Ccs2026Theme,
  Ccs2026AgendaDay,
  Ccs2026Session,
  Ccs2026ProgramDay,
} from "@/types/event";
