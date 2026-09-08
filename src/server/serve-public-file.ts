import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { NextResponse } from "next/server";

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

function resolvePublicFile(relativePath: string): string | null {
  const publicRoot = path.resolve(process.cwd(), "public");
  const resolved = path.resolve(publicRoot, relativePath);
  if (resolved !== publicRoot && !resolved.startsWith(`${publicRoot}${path.sep}`)) {
    return null;
  }
  return resolved;
}

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export async function servePublicFile(
  relativePath: string,
  options?: { downloadName?: string; disposition?: "inline" | "attachment" },
) {
  const filePath = resolvePublicFile(relativePath);
  if (!filePath) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }

    const stream = createReadStream(filePath);
    const body = Readable.toWeb(stream) as ReadableStream<Uint8Array>;
    const disposition = options?.disposition ?? "inline";
    const downloadName = options?.downloadName ?? path.basename(filePath);

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentTypeFor(filePath),
        "Content-Length": String(fileStat.size),
        "Cache-Control": "public, max-age=3600, must-revalidate",
        "Content-Disposition": `${disposition}; filename="${downloadName.replace(/"/g, "")}"`,
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

export function isSafeFileName(value: string): boolean {
  return Boolean(value) && !value.includes("/") && !value.includes("\\") && value !== "..";
}
