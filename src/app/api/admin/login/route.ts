import { NextResponse } from "next/server";
import { adminLoginResponse, parseAdminLoginBody } from "@/server/admin-auth";

export async function POST(request: Request) {
  const password = await parseAdminLoginBody(request);
  if (!password) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }
  return adminLoginResponse();
}
