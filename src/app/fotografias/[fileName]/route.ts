import { isSafeFileName, servePublicFile } from "@/server/serve-public-file";

type RouteContext = {
  params: Promise<{ fileName: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { fileName } = await context.params;

  if (!isSafeFileName(fileName)) {
    return new Response("Not found", { status: 404 });
  }

  return servePublicFile(`fotografias/${fileName}`, {
    downloadName: fileName,
    disposition: "inline",
  });
}
