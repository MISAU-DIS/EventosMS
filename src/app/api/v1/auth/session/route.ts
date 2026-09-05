import { v1Json } from "@/server/api-v1";
import { isAdminSessionValid } from "@/server/admin-session";

export async function GET() {
  return v1Json({ authenticated: await isAdminSessionValid() });
}
