export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/agenda", label: "Agenda" },
  { href: "/documentos", label: "Documentos da reunião" },
  { href: "/fotografias", label: "Fotografias" },
  { href: "/comentarios", label: "Comentários" },
  { href: "/contacto", label: "Contacto" },
];
