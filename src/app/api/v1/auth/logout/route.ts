import { adminLogoutResponse } from "@/server/admin-auth";

export async function POST() {
  const response = adminLogoutResponse();
  response.headers.set("X-API-Version", "1.0.0");
  response.headers.set("X-API-Deprecated", "false");
  return response;
}
