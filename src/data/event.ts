import type { EventConfig } from "@/types/event";

export const eventConfig = {
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
    "O Conselho Coordenador de Saúde constitui um órgão consultivo de elevada relevância para o sector, convocado e presidido pelo Ministro da Saúde. Por seu intermédio, assegura-se a articulação, a planificação estratégica e o acompanhamento da implementação das políticas e intervenções, garantindo coerência e alinhamento dos objectivos em todos os níveis.",
  generalObjective:
    "Realizar a prestação de contas do exercício económico de 2025 e traçar orientações para elaboração do PESOE 2027.",
  specificObjectives: [
    "Analisar o grau de cumprimento das recomendações do L Conselho Coordenador de Saúde",
    "Analisar o desempenho do sector 2025, 1º Semestre de 2026 e os principais desafios do sector",
    "Analisar o grau de implementação do PQG 2025-2029",
    "Analisar as principais realizações do sector 2025",
    "Aprovar as prioridades e linhas estratégicas do sector para 2027",
    "Apreciar as linhas estratégicas do PESS 2026-2035",
    "Harmonizar as intervenções para garantir a eficiência e sustentabilidade",
    "Discutir outros temas relevantes do sector",
  ],
  expectedResults: [
    "Grau de cumprimento das recomendações do L Conselho Coordenador de Saúde analisado",
    "Desempenho do Sector do ano 2025, 1º Semestre de 2026 e desafios do sector analisados",
    "Grau de implementação do PQG 2025-2029, analisado",
    "Prioridades e Linhas Estratégicas do PESOE 2027, aprovadas",
    "Linhas estratégicas do PESS 2026-2035, apreciadas",
    "Harmonizadas as intervenções para garantir a eficiência e sustentabilidade ao nível do sector",
  ],
  methodology: {
    format: "presencial",
    dynamics: ["Apresentações em PowerPoint e painel de discussão"],
    plenaryTopics: [
      "Temas de prestação de contas",
      "Temas de planificação e discussão",
      "Temas informativos",
    ],
    documentation: [
      "Síntese diárias com principais pontos discutidos e as decisões tomadas",
      "Comunicado final e matriz das principais decisões",
    ],
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
