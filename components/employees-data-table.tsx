import { DataTable } from "@/components/data-table";
import { Employee } from "@/lib/definitions";
import { columns } from "@/lib/employee-column-definitions";

interface EmployeesDataTableProps {
  data: Employee[];
}

export function EmployeesDataTable({ data }: EmployeesDataTableProps) {
  return <DataTable columns={columns} data={data} />;
}
