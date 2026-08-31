import { NextResponse } from "next/server";
import { adminAuth } from "@/config/admin";
import { isAdminSessionValid } from "@/server/admin-session";

export async function GET() {
  const valid = await isAdminSessionValid();
  return NextResponse.json({
    authenticated: valid,
    email: valid ? adminAuth.email : null,
  });
}
