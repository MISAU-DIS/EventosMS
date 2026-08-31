import { cookies } from "next/headers";
import { adminAuth } from "@/config/admin";

export async function isAdminSessionValid(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(adminAuth.cookieName)?.value === adminAuth.sessionToken;
}

export function unauthorizedResponse() {
  return Response.json({ error: "Não autorizado." }, { status: 401 });
}
