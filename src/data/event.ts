export const ccs2026Event = {
  title: "LI Conselho Coordenador de Saúde",
  shortTitle: "LI CCS",
  edition: 51,
  description:
    "LI Conselho Coordenador de Saúde – Ministério da Saúde de Moçambique",
  lema: "Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos!",
  location: "Cidade da Beira",
  province: "Província da Sofala",
  country: "Moçambique",
  dateRange: "05 - 07 de Agosto de 2026",
  startDate: "2026-08-05",
  endDate: "2026-08-07",
  mapsUrl: "https://maps.google.com/maps?q=Beira,+Sofala,+Moçambique",
  calendarTitle: "LI Conselho Coordenador de Saúde",
  calendarDetails:
    "LI Conselho Coordenador de Saúde do Ministério da Saúde de Moçambique, realizado na Cidade da Beira.",
  calendarLocation: "Cidade da Beira, Sofala, Moçambique",
  calendarDates: "20260805T060000Z/20260807T150000Z",
  organizer: "Direcção de Planificação e Cooperação (DPC)",
  objectives: [
    "Avaliar o grau de cumprimento das recomendações do L Conselho Coordenador de Saúde",
    "Analisar o desempenho do sector e provincial em 2025",
    "Debater desafios operacionais, vigilância, formação e infraestruturas",
    "Alinhar o Plano Estratégico do Sector da Saúde 2026-2035 e o PESOE 2027",
    "Identificar acções para aumentar a eficiência e o financiamento do sector",
  ],
  expectedResults: [
    "Recomendações do L CCS avaliadas e actualizadas",
    "Desempenho sectorial e provincial 2025 analisado e validado",
    "Prioridades estratégicas para 2026-2035 e PESOE 2027 alinhadas",
    "Consensos sobre eficiência, vigilância e resposta a emergências",
    "Comunicado final do LI CCS aprovado",
  ],
} as const;

export type Ccs2026Theme = {
  order: number;
  title: string;
  responsible: string;
};

export type Ccs2026AgendaDay = {
  id: string;
  label: string;
  date: string;
  themes: Ccs2026Theme[];
};

export type Ccs2026Session = {
  order: number;
  time: string;
  title: string;
  type: string;
  speaker: string;
};

export type Ccs2026ProgramDay = {
  id: string;
  label: string;
  date: string;
  sessions: Ccs2026Session[];
};
