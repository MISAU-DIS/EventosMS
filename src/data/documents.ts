import type { DocumentSection } from "@/types/documents";

export const meetingDocuments: DocumentSection[] = [
  {
    id: "dia1",
    title: "Documentos do 1.º dia",
    description: "Apresentações e materiais do primeiro dia da reunião.",
    documents: [
      {
        id: "apresentacao1",
        title: "Apresentação1.pptx",
        description: "Apresentação do primeiro dia da reunião.",
        fileUrl: "/documentos/dia1/apresentacao1.pptx",
        fileType: "pptx",
      },
    ],
  },
  {
    id: "dia2",
    title: "Documentos do 2.º dia",
    description: "Apresentações e materiais do segundo dia da reunião.",
    documents: [
      {
        id: "drh-plano-operacional",
        title: "Plano operacional — rácio de profissionais de saúde (Nampula, Zambézia e Tete)",
        description:
          "Apresentação da DRH sobre o plano operacional para a melhoria do rácio de profissionais de saúde (sessão 37, 2.º dia).",
        fileUrl:
          "/documentos/dia2/drh-plano-operacional-racio-profissionais-saude.pptx",
        fileType: "pptx",
      },
    ],
  },
  {
    id: "dia3",
    title: "Documentos do 3.º dia",
    description: "Apresentações e materiais do terceiro dia da reunião.",
    documents: [],
  },
  {
    id: "gerais",
    title: "Documentos gerais",
    description: "Agenda, programa e outros documentos de referência da reunião.",
    documents: [],
  },
];
