import { NextResponse } from "next/server";
import { adminAuth } from "@/config/admin";

export async function POST() {
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
