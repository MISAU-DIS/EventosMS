import { NextResponse } from "next/server";
import {
  buildAdminReport,
  buildAdminReportCsv,
  type AdminReportType,
} from "@/server/admin-reports";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";

const VALID_TYPES = new Set<AdminReportType>([
  "summary",
  "evaluations",
  "documents",
  "photos",
  "agenda",
  "program",
]);

export async function GET(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as AdminReportType | null;
  const format = searchParams.get("format") ?? "json";

  if (!type || !VALID_TYPES.has(type)) {
    return NextResponse.json(
      { error: "Parâmetro type inválido." },
      { status: 400 },
    );
  }

  try {
    if (format === "csv") {
      const csv = await buildAdminReportCsv(type);
      const filename = `relatorio-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    const report = await buildAdminReport(type);
    return NextResponse.json(report);
  } catch (error) {
    console.error("[admin/reports GET]", error);
    return NextResponse.json(
      { error: "Não foi possível gerar o relatório." },
      { status: 500 },
    );
  }
}
