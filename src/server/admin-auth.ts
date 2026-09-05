import { NextResponse } from "next/server";
import { adminAuth, isValidAdminPassword } from "@/config/admin";

export function adminLoginResponse() {
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

export function adminLogoutResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminAuth.cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function parseAdminLoginBody(request: Request): Promise<string | null> {
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !isValidAdminPassword(body.password)) return null;
    return body.password;
  } catch {
    return null;
  }
}
