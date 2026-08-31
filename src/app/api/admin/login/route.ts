import { NextResponse } from "next/server";
import { adminAuth, isValidAdminPassword } from "@/config/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || !isValidAdminPassword(body.password)) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminAuth.cookieName, adminAuth.sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminAuth.maxAgeSeconds,
  });
  return response;
}
