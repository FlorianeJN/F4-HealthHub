"use client";

import { Shift } from "@/lib/definitions";
import { generateInvoicePDF, PartnerInfo } from "@/lib/generateInvoicePDF";
import React from "react";

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

export interface DownloadInvoiceButtonProps {
  invoiceNumber: string;
  date: string;
  enterpriseInfo: EnterpriseInfo;
  partnerInfo: PartnerInfo;
  shifts: Shift[];
  amounts: InvoiceAmounts;
}

const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = (props) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl shadow"
      onClick={() => generateInvoicePDF(props)}
    >
      Télécharger la facture (PDF)
    </button>
  );
};

export default DownloadInvoiceButton;
