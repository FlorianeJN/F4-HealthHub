"use client";

import EmployeeActions from "@/components/employees-actions";
import { PartnerActions } from "@/components/partner-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Employee, Invoice, Partner } from "./definitions";

export const partnerColumns: ColumnDef<Partner>[] = [
  {
    accessorKey: "id",
    header: "ID",
    sortingFn: "basic",
    enableSorting: true,
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <PartnerActions partner={row.original} />;
    },
  },
];

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
    sortingFn: "basic",
    enableSorting: true,
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "prenom",
    header: "Prénom",
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
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "statut",
    header: "Statut",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <EmployeeActions employee={row.original} />;
    },
  },
];

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "num_facture",
    header: "Numéro de facture",
  },
  {
    accessorKey: "nom_partenaire",
    header: "Partenaire",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "montant_apres_taxes",
    header: "Montant total",
    cell: ({ row }) => {
      const val = row.getValue<number | null>("montant_apres_taxes");
      const display = val != null ? val : 0;
      return `${display} $`;
    },
  },
  {
    accessorKey: "statut",
    header: "Statut",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return <button className="text-blue-600 hover:underline">Voir</button>;
    },
  },
];

// Configuration par défaut pour le tri
export const defaultSorting = [
  {
    id: "id",
    desc: false,
  },
];
