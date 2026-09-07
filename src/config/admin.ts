/**
 * Credenciais admin — usar variáveis de ambiente em produção.
 */
export const adminAuth = {
  password: process.env.ADMIN_PASSWORD ?? "Misau.2025",
  sessionToken:
    process.env.ADMIN_SESSION_TOKEN ?? "misau-ccs-admin-local-session",
  cookieName: "ccs_admin_session",
  maxAgeSeconds: 60 * 60 * 8,
} as const;

export function isValidAdminPassword(password: string): boolean {
  return password === adminAuth.password;
}
