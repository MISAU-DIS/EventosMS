export type NavLink = {
  href: string;
  label: string;
  mobileLabel?: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/agenda", label: "Agenda" },
  {
    href: "/documentos",
    label: "Documentos da reunião",
    mobileLabel: "Documentos",
  },
  { href: "/fotografias", label: "Fotografias" },
  { href: "/comentarios", label: "Comentários", mobileLabel: "Avaliações" },
  { href: "/contacto", label: "Contacto" },
];
