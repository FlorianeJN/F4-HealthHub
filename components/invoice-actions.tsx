"use client";

import { Button } from "@/components/ui/button";
import { Invoice } from "@/lib/definitions";
import { IconDownload, IconEye, IconTrash } from "@tabler/icons-react";

interface InvoiceActionsProps {
  invoice: Invoice;
}

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" title="Voir la facture">
        <IconEye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" title="Télécharger la facture">
        <IconDownload className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" title="Supprimer la facture">
        <IconTrash className="h-4 w-4" />
      </Button>
    </div>
  );
}
