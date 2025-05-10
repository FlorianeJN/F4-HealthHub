"use client";

import { Button } from "@/components/ui/button";
import { Invoice } from "@/lib/definitions";
import { IconDownload, IconShare3 } from "@tabler/icons-react";

interface InvoiceActionsProps {
  invoice: Invoice;
}

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  console.log(invoice);
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="hover:cursor-pointer"
        title="Télécharger la facture"
      >
        <IconDownload className="h-4 w-4" />
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
