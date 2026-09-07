import { v1Error, v1Json } from "@/server/api-v1";
import { API_VERSION } from "@/config/api";

export async function GET() {
  return v1Json({
    ok: true,
    service: "eventos-ms-api",
    apiVersion: API_VERSION,
    documentation: "/api/v1/docs",
    openApi: "/api/v1/openapi",
  });
}
