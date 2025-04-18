"use client";

import { InvoiceActions } from "@/components/invoice-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceDataTable } from "./invoice-data-table";

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "num_facture",
    header: "Numéro",
  },
  {
    accessorKey: "nom_partenaire",
    header: "Partenaire",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const invoiceNumber = row.original.num_facture;
      const [, month, year] = invoiceNumber.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "montant_apres_taxes",
    header: "Montant",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("montant_apres_taxes"));
      return new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
      }).format(amount);
    },
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("statut") as string;
      return (
        <Badge
          variant="default"
          className={
            status === "Payée"
              ? "bg-green-600 hover:bg-green-700"
              : status === "Envoyée"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : status === "Prête"
              ? "bg-blue-500 hover:bg-blue-600"
              : status === "À compléter"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-500 hover:bg-gray-600"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <InvoiceActions invoice={row.original} />,
  },
];

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des factures</CardTitle>
      </CardHeader>
      <CardContent>
        <InvoiceDataTable columns={columns} data={invoices} />
      </CardContent>
    </Card>
  );
}
