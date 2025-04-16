"use client";

import EmployeeActions from "@/components/employees-actions";
import { PartnerActions } from "@/components/partner-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Employee, Partner } from "./definitions";

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
    header: "Actions",
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
    header: "Actions",
    cell: ({ row }) => {
      return <EmployeeActions employee={row.original} />;
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
