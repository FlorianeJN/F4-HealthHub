import { DataTable } from "@/components/data-table";
import { employeeColumns } from "@/lib/column-definitions";
import { fetchEmployees } from "@/lib/data";

export default async function EmployeesDataTable() {
  const data = await fetchEmployees();
  return (
    <div>
      <DataTable data={data} columns={employeeColumns} type="employee" />
    </div>
  );
}
