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
    "O Conselho Coordenador de Saúde constitui um órgão consultivo de elevada relevância para o sector, convocado e presidido pelo Ministro da Saúde. Por seu intermédio, assegura-se a articulação, a planificação estratégica e o acompanhamento da implementação das políticas e intervenções, garantindo coerência e alinhamento dos objectivos em todos os níveis.",
  heroImage: "/fotografias/recepcao-chegada-oficial.jpg",
  heroImageAlt:
    "Recepção oficial com acolhimento dos participantes à chegada do evento",
  aboutEventImage: "/fotografias/grupo-capulana-conselho-hospitalar.jpg",
  aboutEventImageAlt:
    "Equipa do evento com a capulana oficial do XIII Conselho Hospitalar e Conselho Coordenador de Saúde",
  generalObjective:
    "Avaliar o desempenho do sector da Saúde em 2025 e no primeiro semestre de 2026 e definir orientações estratégicas e prioridades para a elaboração do PESOE 2027, em alinhamento com o PQG 2025–2029 e o PESS 2026–2035.",
  specificObjectives: [
    "Avaliar o grau de cumprimento das recomendações do L Conselho Coordenador de Saúde e definir medidas de seguimento",
    "Avaliar o desempenho do sector em 2025 e no primeiro semestre de 2026, identificando os principais resultados, desafios e medidas correctivas",
    "Apreciar o grau de implementação do PQG 2025–2029 e identificar prioridades para acelerar o alcance das metas sectoriais",
    "Definir as prioridades e linhas estratégicas do sector para orientar a elaboração do PESOE 2027",
    "Alinhar as prioridades sectoriais com as linhas estratégicas do PESS 2026–2035",
    "Harmonizar intervenções, responsabilidades e compromissos, com vista ao reforço da eficiência e sustentabilidade do sector",
    "Deliberar sobre outras matérias estratégicas relevantes para o desempenho e desenvolvimento do sector da Saúde",
  ],
  expectedResults: [
    "Avaliado o grau de cumprimento das recomendações do L Conselho Coordenador de Saúde e definidas as medidas de seguimento",
    "Apreciado o desempenho do sector em 2025 e no primeiro semestre de 2026 e identificados os principais desafios e medidas correctivas",
    "Apreciado o grau de implementação do PQG 2025–2029 e definidas as prioridades para acelerar o alcance das metas sectoriais",
    "Aprovadas as prioridades e linhas estratégicas para a elaboração do PESOE 2027",
    "Alinhadas as prioridades sectoriais com as linhas estratégicas do PESS 2026–2035",
    "Harmonizadas as intervenções, responsabilidades e compromissos, visando reforçar a eficiência, coordenação e sustentabilidade do sector",
    "Adoptadas as deliberações sobre outras matérias estratégicas relevantes para o sector da Saúde",
  ],
  methodology: {
    format: "presencial",
    dynamics: ["Apresentações em PowerPoint e painel de discussão"],
    plenaryTopics: [
      "Temas de prestação de contas",
      "Temas de planificação e discussão",
      "Temas informativos",
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
