import { eventProgram, eventConfig } from "@/data";

const GOLD: [number, number, number] = [222, 178, 59];
const GREEN: [number, number, number] = [0, 100, 80];

type JsPDFWithAutoTable = import("jspdf").jsPDF & {
  lastAutoTable: { finalY: number };
};

function addHeader(doc: import("jspdf").jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.text("REPÚBLICA DE MOÇAMBIQUE", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(12);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("MINISTÉRIO DA SAÚDE", pageWidth / 2, 26, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text(eventConfig.title, pageWidth / 2, 36, { align: "center" });
  doc.setFontSize(11);
  doc.text(
    `${eventConfig.location}, ${eventConfig.dateRange}`,
    pageWidth / 2,
    44,
    { align: "center" },
  );
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const lemaLines = doc.splitTextToSize(`Lema: «${eventConfig.lema}»`, pageWidth - 30);
  doc.text(lemaLines, pageWidth / 2, 52, { align: "center" });
  doc.setFontSize(13);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("PROGRAMA DETALHADO", pageWidth / 2, 64, { align: "center" });
  doc.setTextColor(0, 0, 0);
  return 72;
}

export async function generateAgendaPdf() {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let startY = addHeader(doc);

  for (const day of eventProgram) {
    autoTable(doc, {
      startY,
      head: [[day.label]],
      body: [],
      headStyles: {
        fillColor: GREEN,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "left",
      },
      theme: "plain",
      margin: { left: 14, right: 14 },
    });
    startY = (doc as JsPDFWithAutoTable).lastAutoTable.finalY + 2;

    autoTable(doc, {
      startY,
      head: [["N.º", "Tempo", "Actividade/Tema", "Responsável"]],
      body: day.sessions.map((s) => [
        String(s.order),
        s.time,
        s.title,
        s.speaker || "—",
      ]),
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 28 },
        2: { cellWidth: "auto" },
        3: { cellWidth: 36 },
      },
      headStyles: {
        fillColor: GOLD,
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: { fontSize: 7, cellPadding: 1.5, overflow: "linebreak" },
      theme: "grid",
      margin: { left: 14, right: 14 },
    });
    startY = (doc as JsPDFWithAutoTable).lastAutoTable.finalY + 10;
  }

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Página ${i} de ${totalPages} — ${eventConfig.shortTitle} 2026`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" },
    );
  }

  doc.save("agenda-programa-li-ccs-2026.pdf");
}
