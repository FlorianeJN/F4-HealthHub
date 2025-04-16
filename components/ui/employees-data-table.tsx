import { employeeColumns } from "@/lib/column-definitions";
import { fetchEmployees } from "@/lib/data";
import { DataTable } from "../data-table";

export default async function EmployeesDataTable() {
  const data = await fetchEmployees();
  return (
    <div>
      <h1 className="px-6 text-xl font-semibold">Liste des Employés</h1>
      <DataTable data={data} columns={employeeColumns} />
    </div>
  );
}
