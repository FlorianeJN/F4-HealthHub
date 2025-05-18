"use client";

import { Button } from "@/components/ui/button";
import { Shift } from "@/lib/definitions";
import { generateInvoicePDF, PartnerInfo } from "@/lib/generateInvoicePDF";
import { IconDownload, IconShare3 } from "@tabler/icons-react";
import { useState } from "react";

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

interface InvoiceActionsProps {
  invoiceNumber: string;
  date: string;
  enterpriseInfo: EnterpriseInfo;
  partnerInfo: PartnerInfo;
  shifts: Shift[];
  amounts: InvoiceAmounts;
}

export function InvoiceActions({
  invoiceNumber,
  date,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: InvoiceActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      await generateInvoicePDF({
        invoiceNumber,
        date,
        enterpriseInfo,
        partnerInfo,
        shifts,
        amounts,
      });
    } catch (e) {
      console.error(e);
      alert("Erreur lors du téléchargement de la facture PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="hover:cursor-pointer"
        title="Télécharger la facture"
        onClick={handleDownload}
        disabled={loading}
      >
        <IconDownload className="h-4 w-4" />
        {loading && <span className="ml-2 animate-pulse text-xs">PDF...</span>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:cursor-pointer"
        title="Envoyer la facture"
      >
        <IconShare3 className="h-4 w-4" />
      </Button>
    </div>
  );
}
