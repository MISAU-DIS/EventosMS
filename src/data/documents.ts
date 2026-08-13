import type { DocumentSection } from "@/types/documents";

export const meetingDocuments: DocumentSection[] = [
  {
    id: "dia1",
    title: "Documentos do 1.º dia",
    description: "Apresentações e materiais do primeiro dia da reunião.",
    documents: [],
  },
  {
    id: "dia2",
    title: "Documentos do 2.º dia",
    description: "Apresentações e materiais do segundo dia da reunião.",
    documents: [],
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
    description: "Sínteses, comunicados e outros documentos de referência.",
    documents: [
      {
        id: "documento-teste",
        title: "Documento de teste — validação da plataforma",
        description:
          "Ficheiro de exemplo para validar o descarregamento de documentos na plataforma.",
        fileUrl: "/documentos/gerais/documento-teste.txt",
        fileType: "other",
      },
    ],
  },
];
