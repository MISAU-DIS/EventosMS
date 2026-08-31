export type DocumentSectionId = "dia1" | "dia2" | "dia3" | "gerais";

export const documentSectionMeta: {
  id: DocumentSectionId;
  title: string;
  description: string;
}[] = [
  {
    id: "dia1",
    title: "Documentos do 1.º dia",
    description: "Apresentações e materiais do primeiro dia da reunião.",
  },
  {
    id: "dia2",
    title: "Documentos do 2.º dia",
    description: "Apresentações e materiais do segundo dia da reunião.",
  },
  {
    id: "dia3",
    title: "Documentos do 3.º dia",
    description: "Apresentações e materiais do terceiro dia da reunião.",
  },
  {
    id: "gerais",
    title: "Documentos gerais",
    description: "Agenda, programa e outros documentos de referência da reunião.",
  },
];

export const documentSectionLabels: Record<DocumentSectionId, string> = {
  dia1: "1.º dia",
  dia2: "2.º dia",
  dia3: "3.º dia",
  gerais: "Gerais",
};
