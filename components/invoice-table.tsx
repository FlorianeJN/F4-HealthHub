"use client";

import { InvoiceActions } from "@/components/invoice-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceDataTable } from "./invoice-data-table";

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "numero_facture",
    header: "Numéro",
  },
  {
    accessorKey: "nom_partenaire",
    header: "Partenaire",
  },
  {
    accessorKey: "date_emission",
    header: "Date d'émission",
    cell: ({ row }) => row.getValue("date_emission"),
  },
  {
    accessorKey: "montant_total",
    header: "Montant",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("montant_total"));
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
          variant={
            status === "payée"
              ? "default"
              : status === "en attente"
              ? "secondary"
              : "destructive"
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
