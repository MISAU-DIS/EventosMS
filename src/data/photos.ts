export type OfficialPhoto = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

export const officialPhotos: OfficialPhoto[] = [
  {
    id: "grupo-conselho-coordenador",
    title: "Grupo oficial — Conselho Coordenador de Saúde",
    src: "/fotografias/grupo-conselho-coordenador-saude.jpg",
    alt: "Participantes em frente ao painel do XIII Conselho Hospitalar e LI Conselho Coordenador de Saúde",
  },
  {
    id: "grupo-capulana",
    title: "Equipa com capulana do evento",
    src: "/fotografias/grupo-capulana-conselho-hospitalar.jpg",
    alt: "Grupo de participantes com vestuário da capulana do XIII Conselho Hospitalar",
  },
  {
    id: "mesa-presidencia",
    title: "Mesa da presidência",
    src: "/fotografias/mesa-presidencia-conselho-coordenador.jpg",
    alt: "Mesa da presidência durante a reunião do Conselho Coordenador de Saúde",
  },
  {
    id: "recepcao-chegada",
    title: "Recepção e chegada oficial",
    src: "/fotografias/recepcao-chegada-oficial.jpg",
    alt: "Recepção oficial com acolhimento dos participantes à chegada do evento",
  },
];
