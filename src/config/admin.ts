/**
 * Credenciais admin locais (fase de testes — substituir antes de produção MISAU).
 */
export const adminAuth = {
  password: "Misau.2025",
  sessionToken: "misau-ccs-admin-local-session",
  cookieName: "ccs_admin_session",
  maxAgeSeconds: 60 * 60 * 8,
} as const;

export function isValidAdminPassword(password: string): boolean {
  return password === adminAuth.password;
}
