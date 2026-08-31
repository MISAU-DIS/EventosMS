import { NextResponse } from "next/server";
import { adminAuth, isValidAdminLogin } from "@/config/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!body.email || !body.password || !isValidAdminLogin(body.email, body.password)) {
    return NextResponse.json(
      { error: "Email ou senha inválidos." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, email: adminAuth.email });
  response.cookies.set(adminAuth.cookieName, adminAuth.sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminAuth.maxAgeSeconds,
  });
  return response;
}
