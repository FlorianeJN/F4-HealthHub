"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Partner } from "./definitions";

export const partnerColumns: ColumnDef<Partner>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "numero_civique",
    header: "No. civique",
  },
  {
    accessorKey: "rue",
    header: "Rue",
  },
  {
    accessorKey: "ville",
    header: "Ville",
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "code_postal",
    header: "Code postal",
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
    cell: ({ getValue }) => {
      const num = String(getValue<number>());
      return num.length === 10
        ? `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`
        : num;
    },
  },
  {
    accessorKey: "courriel",
    header: "Courriel",
  },
];
