/**
 * Credenciais admin locais (fase de testes — substituir antes de produção MISAU).
 */
export const adminAuth = {
  email: "admin@misau.gov.mz",
  password: "Misau.2025",
  sessionToken: "misau-ccs-admin-local-session",
  cookieName: "ccs_admin_session",
  maxAgeSeconds: 60 * 60 * 8,
} as const;

export function isValidAdminLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === adminAuth.email.toLowerCase() &&
    password === adminAuth.password
  );
}
