import jsPDF from "jspdf";
import { Shift } from "./definitions";

interface EnterpriseInfo {
  enterprise: {
    nom: string;
    telephone?: string;
    courriel?: string;
    [key: string]: unknown;
  } | null;
  address: {
    numero_civique?: number;
    rue?: string;
    ville?: string;
    province?: string;
    code_postal?: string;
    [key: string]: unknown;
  } | null;
}

interface InvoiceAmounts {
  montant_avant_taxes: string;
  tps: string;
  tvq: string;
  montant_apres_taxes: string;
}

export interface PartnerInfo {
  nom: string;
  numero_civique?: number;
  rue?: string;
  ville?: string;
  province?: string;
  code_postal?: string;
  telephone?: string;
  [key: string]: unknown;
}

interface GenerateInvoicePDFParams {
  invoiceNumber: string;
  date: string;
  enterpriseInfo: EnterpriseInfo;
  partnerInfo: PartnerInfo;
  shifts: Shift[];
  amounts: InvoiceAmounts;
}

export function generateInvoicePDF({
  invoiceNumber,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: GenerateInvoicePDFParams) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");

  // --- Logo ---
  const logoImg = document?.getElementById(
    "pdf-logo-img"
  ) as HTMLImageElement | null;
  if (logoImg && logoImg.src) {
    doc.addImage(logoImg.src, "PNG", 15, 15, 30, 30);
  }

  // --- Title and date ---
  doc.setFontSize(18);
  doc.text(`FACTURE N° ${invoiceNumber}`, 105, 25, { align: "center" });

  // --- Company info (left) ---
  let y = 50;
  doc.setFontSize(10);
  doc.text(enterpriseInfo.enterprise?.nom || "Entreprise", 15, y);
  y += 5;
  if (enterpriseInfo.address) {
    const { numero_civique, rue, ville, province, code_postal } =
      enterpriseInfo.address;
    doc.text(`${numero_civique || ""} ${rue || ""}`.trim(), 15, y);
    y += 5;
    doc.text(
      `${ville || ""}, ${province || ""} ${code_postal || ""}`.trim(),
      15,
      y
    );
    y += 5;
  }
  if (enterpriseInfo.enterprise?.telephone) {
    doc.text(`Téléphone : ${enterpriseInfo.enterprise.telephone}`, 15, y);
    y += 5;
  }
  if (enterpriseInfo.enterprise?.courriel) {
    doc.text(`Email : ${enterpriseInfo.enterprise.courriel}`, 15, y);
    y += 5;
  }

  // --- Partner info label and box (right) ---
  const boxX = 130,
    boxY = 45,
    boxW = 70,
    boxH = 36;
  doc.setFontSize(11);
  const labelY = boxY - 4;
  doc.text("Facturé à :", boxX, labelY, { align: "left" });
  doc.setDrawColor(120);
  doc.setLineWidth(0.5);
  doc.rect(boxX, boxY, boxW, boxH, "S");
  let boxTextY = boxY + 10;
  const boxTextX = boxX + 6;
  doc.text(partnerInfo.nom, boxTextX, boxTextY, { align: "left" });
  boxTextY += 6;
  if (partnerInfo.rue || partnerInfo.numero_civique) {
    doc.text(
      `${partnerInfo.numero_civique || ""} ${partnerInfo.rue || ""}`.trim(),
      boxTextX,
      boxTextY,
      { align: "left" }
    );
    boxTextY += 6;
  }
  doc.text(
    `${partnerInfo.ville || ""}, ${partnerInfo.province || ""}`.trim(),
    boxTextX,
    boxTextY,
    { align: "left" }
  );
  boxTextY += 6;
  if (partnerInfo.telephone) {
    doc.text(`Téléphone : ${partnerInfo.telephone}`, boxTextX, boxTextY, {
      align: "left",
    });
    boxTextY += 6;
  }

  // --- Table header with background ---
  y = 90;
  doc.setFillColor(230, 230, 230);
  doc.rect(15, y, 180, 8, "F");
  doc.setFontSize(10);
  const headers = [
    "Date",
    "Prestation",
    "Début",
    "Fin",
    "Pause",
    "Temps",
    "Taux",
    "Montant HT",
  ];
  const colX = [15, 40, 80, 100, 115, 130, 150, 175];
  headers.forEach((h, i) => doc.text(h, colX[i], y + 6));
  y += 12;

  // --- Table rows ---
  const formatTime = (t: string) => (t && t.length >= 5 ? t.slice(0, 5) : t);
  shifts.forEach((shift, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(245, 245, 245);
      doc.rect(15, y - 6, 180, 8, "F");
    }
    let dateStr = shift.date_quart;
    if (typeof dateStr !== "string") {
      try {
        dateStr = new Date(dateStr).toLocaleDateString("fr-CA");
      } catch {
        dateStr = String(dateStr);
      }
    }
    doc.text(dateStr || "", colX[0], y);
    doc.text(shift.prestation || "", colX[1], y, {
      maxWidth: colX[2] - colX[1] - 2,
    });
    doc.text(formatTime(shift.debut_quart || ""), colX[2], y);
    doc.text(formatTime(shift.fin_quart || ""), colX[3], y);
    doc.text(formatTime(shift.pause || ""), colX[4], y);
    doc.text(shift.temps_total || "", colX[5], y);
    doc.text(`${shift.taux_horaire || ""} $`, colX[6], y);
    doc.text(`${shift.montant_total || ""} $`, colX[7], y);
    y += 8;
    if (y > 230) {
      // Add footer image before page break
      const enteteImg = document?.getElementById(
        "pdf-entete-img"
      ) as HTMLImageElement | null;
      if (enteteImg && enteteImg.src) {
        doc.addImage(enteteImg.src, "PNG", 15, 275, 180, 15);
      }
      doc.addPage();
      y = 20;
    }
  });

  // --- Totals section (no box) ---
  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Montant total HT :", 115, y);
  doc.text(amounts.montant_avant_taxes, 190, y, { align: "right" });
  y += 7;
  doc.text("Montant TPS (5%) :", 115, y);
  doc.text(amounts.tps, 190, y, { align: "right" });
  y += 7;
  doc.text("Montant TVQ (9,975%) :", 115, y);
  doc.text(amounts.tvq, 190, y, { align: "right" });
  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 102, 0);
  doc.text("Montant TTC :", 115, y);
  doc.text(amounts.montant_apres_taxes, 190, y, { align: "right" });
  doc.setTextColor(0, 0, 0);

  // --- Footer image on last page ---
  const enteteImg = document?.getElementById(
    "pdf-entete-img"
  ) as HTMLImageElement | null;
  if (enteteImg && enteteImg.src) {
    doc.addImage(enteteImg.src, "PNG", 15, 275, 180, 15);
  }

  // --- Page indicator and footer image on each page ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // 1) On redessine d'abord l'image de pied de page
    const enteteImg = document?.getElementById(
      "pdf-entete-img"
    ) as HTMLImageElement | null;
    if (enteteImg && enteteImg.src) {
      doc.addImage(enteteImg.src, "PNG", 15, 275, 180, 15);
    }

    // 2) Puis on imprime l'indicateur juste en dessous (y = 295)
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Page ${i} sur ${pageCount}`, 200, 295, { align: "right" });
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`facture-${invoiceNumber}.pdf`);
}
