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
  date,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: GenerateInvoicePDFParams) {
  const doc = new jsPDF();
  let y = 15;

  // --- Logo ---
  // Load logo image from public/logo.PNG (must be base64 or URL for jsPDF)
  // We'll use an <img> to get base64 if running in browser
  const logoImg = document?.getElementById(
    "pdf-logo-img"
  ) as HTMLImageElement | null;
  if (logoImg && logoImg.src) {
    doc.addImage(logoImg.src, "PNG", 10, 10, 30, 30);
  }
  y = 15;

  // --- Titre centré ---
  doc.setFontSize(16);
  doc.text(`FACTURE N° ${invoiceNumber}`, 105, 20, { align: "center" });
  doc.setFontSize(11);
  doc.text(`Date : ${date}`, 105, 27, { align: "center" });

  // --- Infos entreprise à gauche sous le logo ---
  let leftY = 45;
  doc.setFontSize(10);
  doc.text(enterpriseInfo.enterprise?.nom || "Entreprise", 10, leftY);
  leftY += 5;
  if (enterpriseInfo.address) {
    const { numero_civique, rue, ville, province, code_postal } =
      enterpriseInfo.address;
    doc.text(`${numero_civique || ""} ${rue || ""}`.trim(), 10, leftY);
    leftY += 5;
    doc.text(
      `${ville || ""}, ${province || ""} ${code_postal || ""}`.trim(),
      10,
      leftY
    );
    leftY += 5;
  }
  if (enterpriseInfo.enterprise?.telephone) {
    doc.text(`Téléphone : ${enterpriseInfo.enterprise.telephone}`, 10, leftY);
    leftY += 5;
  }
  if (enterpriseInfo.enterprise?.courriel) {
    doc.text(`Email : ${enterpriseInfo.enterprise.courriel}`, 10, leftY);
    leftY += 5;
  }

  // --- Encadré infos partenaire à droite ---
  doc.text("Facturé à", 115, 30);
  const boxX = 120,
    boxY = 35,
    boxW = 80,
    boxH = 25;
  doc.setDrawColor(0);
  doc.rect(boxX, boxY, boxW, boxH);
  let boxTextY = boxY + 6;
  doc.setFontSize(11);
  doc.text(partnerInfo.nom, boxX + 2, boxTextY);
  boxTextY += 5;
  if (partnerInfo.rue || partnerInfo.numero_civique) {
    doc.text(
      `${partnerInfo.numero_civique || ""} ${partnerInfo.rue || ""}`.trim(),
      boxX + 2,
      boxTextY
    );
    boxTextY += 5;
  }
  doc.text(
    `${partnerInfo.ville || ""}, ${partnerInfo.province || ""} ${
      partnerInfo.code_postal || ""
    }`.trim(),
    boxX + 2,
    boxTextY
  );
  boxTextY += 5;
  if (partnerInfo.telephone) {
    doc.text(`Téléphone : ${partnerInfo.telephone}`, boxX + 2, boxTextY);
    boxTextY += 5;
  }

  // --- Tableau des quarts (reprendre ton code existant ici) ---
  y = 80;
  // --- En-têtes du tableau ---
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
  const colX = [10, 35, 80, 100, 115, 130, 150, 175];
  headers.forEach((h, i) => doc.text(h, colX[i], y));
  y += 3;
  doc.setDrawColor(200);
  doc.setLineWidth(0.1);
  doc.line(10, y, 200, y);
  y += 4;

  // --- Données du tableau ---
  const formatTime = (t: string) => (t && t.length >= 5 ? t.slice(0, 5) : t);
  shifts.forEach((shift) => {
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

    doc.setDrawColor(230);
    doc.line(10, y + 1.5, 200, y + 1.5);
    y += 6;

    if (y > 250) {
      doc.addPage();
      y = 15;
    }
  });

  // --- Totaux ---
  y += 8;
  doc.setDrawColor(180);
  doc.line(10, y, 200, y);
  y += 7;

  y += 7;

  doc.setFontSize(12);
  doc.text("Montant total HT :", 120, y);
  doc.text(amounts.montant_avant_taxes, 200, y, { align: "right" });
  y += 6;

  doc.text("Montant TPS (5%) :", 120, y);
  doc.text(amounts.tps, 200, y, { align: "right" });
  y += 6;

  doc.text("Montant TVQ (9,975%) :", 120, y);
  doc.text(amounts.tvq, 200, y, { align: "right" });
  y += 6;

  doc.setFontSize(13);
  doc.setDrawColor(220);
  doc.setFillColor(245, 245, 245);
  doc.rect(115, y - 4, 80, 10, "F");
  doc.setTextColor(0, 102, 0);
  doc.text("Montant TTC :", 120, y + 3);
  doc.text(amounts.montant_apres_taxes, 200, y + 3, { align: "right" });
  doc.setTextColor(0, 0, 0);

  // --- Image entete en bas de page ---
  // Load entete image from public/ENTETE.PNG
  const enteteImg = document?.getElementById(
    "pdf-entete-img"
  ) as HTMLImageElement | null;
  if (enteteImg && enteteImg.src) {
    doc.addImage(enteteImg.src, "PNG", 10, 270, 190, 20);
  }

  doc.save(`facture-${invoiceNumber}.pdf`);
}
