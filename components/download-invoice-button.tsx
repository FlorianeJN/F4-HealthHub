"use client";

import { Shift } from "@/lib/definitions";
import { generateInvoicePDF, PartnerInfo } from "@/lib/generateInvoicePDF";
import { Button } from "./ui/button";

export interface EnterpriseInfo {
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

export interface InvoiceAmounts {
  montant_avant_taxes: string;
  tps: string;
  tvq: string;
  montant_apres_taxes: string;
}

export interface DownloadInvoiceButtonProps {
  invoiceNumber: string;
  date: string;
  enterpriseInfo: EnterpriseInfo;
  partnerInfo: PartnerInfo;
  shifts: Shift[];
  amounts: InvoiceAmounts;
}

export default function DownloadInvoiceButton({
  invoiceNumber,
  date,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: DownloadInvoiceButtonProps) {
  const handleDownload = () => {
    generateInvoicePDF({
      invoiceNumber,
      date,
      enterpriseInfo,
      partnerInfo,
      shifts,
      amounts,
    });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="hover:cursor-pointer"
      onClick={handleDownload}
    >
      Télécharger la facture (PDF)
    </Button>
  );
}
