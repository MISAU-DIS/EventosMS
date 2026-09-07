import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Version",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };
}

function resolveAllowedOrigin(request: NextRequest): string {
  const configured = process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!configured?.length || configured.includes("*")) {
    return request.headers.get("origin") ?? "*";
  }

  const origin = request.headers.get("origin") ?? "";
  return configured.includes(origin) ? origin : configured[0];
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const allowOrigin = resolveAllowedOrigin(request);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders(allowOrigin) });
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(corsHeaders(allowOrigin))) {
    response.headers.set(key, value);
  }
  return response;
}

// Excluir uploads multipart — o middleware faz buffer do body (limite ~10 MB por defeito)
// e ficheiros PPT/PDF grandes falham com 500 antes de chegar ao route handler.
export const config = {
  matcher: [
    "/api/v1/:path*",
    "/api/health",
    "/api/documents",
    "/api/agenda",
    "/api/program",
    "/api/photos",
    "/api/evaluations",
    "/api/admin/login",
    "/api/admin/logout",
    "/api/admin/session",
    "/api/admin/agenda",
    "/api/admin/program",
    "/api/admin/evaluations",
    "/api/admin/documents/:id",
  ],
};
