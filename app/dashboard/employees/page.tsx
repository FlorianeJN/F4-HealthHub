import MultipleBarChart from "@/components/MultipleBarChart";
import PieChartLabel from "@/components/pie-chart-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeesDataTable from "@/components/ui/employees-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Gestion des employés",
  description: "Gérez vos employés et leurs affectations",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-4 md:gap-8 md:py-6 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Employés</h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos employés et leurs informations
              </p>
            </div>
          </div>

          <Card className="bg-card shadow-sm">
            <CardHeader className="border-b bg-muted/50">
              <CardTitle className="text-lg">Liste des employés</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <EmployeesDataTable />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card shadow-sm">
              <CardHeader className="border-b bg-muted/50">
                <CardTitle className="text-lg">
                  Répartition par province
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MultipleBarChart />
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm">
              <CardHeader className="border-b bg-muted/50">
                <CardTitle className="text-lg">Types de partenaires</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartLabel />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
