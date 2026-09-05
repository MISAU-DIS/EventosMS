import { adminLogoutResponse } from "@/server/admin-auth";

export async function POST() {
  return adminLogoutResponse();
}
