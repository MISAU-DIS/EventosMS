import { v1Json } from "@/server/api-v1";
import { apiMeta, API_VERSION } from "@/config/api";

export async function GET() {
  return v1Json({
    ...apiMeta,
    version: API_VERSION,
    environment: process.env.NODE_ENV ?? "development",
    legacyRoutes: [
      "/api/documents",
      "/api/agenda",
      "/api/program",
      "/api/admin/login",
      "/api/admin/documents",
    ],
    documentation: "/api/v1/docs",
    openApi: "/api/v1/openapi",
  });
}
