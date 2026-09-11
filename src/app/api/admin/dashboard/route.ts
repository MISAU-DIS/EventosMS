import { NextResponse } from "next/server";
import { getAdminDashboardOverview } from "@/server/admin-dashboard";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const overview = await getAdminDashboardOverview();
    return NextResponse.json(overview);
  } catch (error) {
    console.error("[admin/dashboard GET]", error);
    return NextResponse.json(
      { error: "Não foi possível carregar o dashboard." },
      { status: 500 },
    );
  }
}
