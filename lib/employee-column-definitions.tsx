import EmployeeActions from "@/components/employees-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./definitions";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
  {
    accessorKey: "email",
    header: "Email",
  },
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
