import { v1Error, v1Json } from "@/server/api-v1";
import { adminLoginResponse, parseAdminLoginBody } from "@/server/admin-auth";

export async function POST(request: Request) {
  const password = await parseAdminLoginBody(request);
  if (!password) {
    return v1Error("AUTH_INVALID", "Senha inválida.", 401);
  }
  const response = adminLoginResponse();
  response.headers.set("X-API-Version", "1.0.0");
  response.headers.set("X-API-Deprecated", "false");
  return response;
}
