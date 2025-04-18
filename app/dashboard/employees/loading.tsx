import { EmployeeStatsSkeleton } from "@/components/skeletons/employee-stats-skeleton";
import { EmployeeTableSkeleton } from "@/components/skeletons/employee-table-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des Employés
        </h1>
        <p className="text-muted-foreground">
          Gérez vos employés et leurs affectations
        </p>
      </div>

      <EmployeeStatsSkeleton />
      <EmployeeTableSkeleton />
    </div>
  );
}
