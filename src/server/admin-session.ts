import { cookies, headers } from "next/headers";
import { adminAuth } from "@/config/admin";

export async function isAdminSessionValid(): Promise<boolean> {
  const headerStore = await headers();
  const authorization = headerStore.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.slice(7).trim();
    if (token === adminAuth.sessionToken) return true;
  }

  const cookieStore = await cookies();
  return cookieStore.get(adminAuth.cookieName)?.value === adminAuth.sessionToken;
}

export function unauthorizedResponse() {
  return Response.json({ error: "Não autorizado." }, { status: 401 });
}
