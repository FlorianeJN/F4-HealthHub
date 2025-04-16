import MultipleBarChart from "@/components/MultipleBarChart";
import PieChartLabel from "@/components/pie-chart-label";
import EmployeesDataTable from "@/components/ui/employees-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Gestion des employés",
  description:
    "Gérez vos employés, consultez leurs disponibilités et leurs affectations depuis F4 HealthHub.",
  keywords: [
    "F4 HealthHub",
    "employés",
    "gestion employés",
    "agence placement",
    "RH",
  ],
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
          <h1 className="text-2xl font-bold">Gestion des Employés</h1>
          <EmployeesDataTable />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Répartition par province
              </h2>
              <MultipleBarChart />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Types de partenaires
              </h2>
              <PieChartLabel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
