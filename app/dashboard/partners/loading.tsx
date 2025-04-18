import { PartnerStatsSkeleton } from "@/components/skeletons/partner-stats-skeleton";
import { PartnerTableSkeleton } from "@/components/skeletons/partner-table-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des Partenaires
        </h1>
        <p className="text-muted-foreground">
          Gérez vos partenaires et leurs informations
        </p>
      </div>

      <PartnerStatsSkeleton />
      <PartnerTableSkeleton />
    </div>
  );
}
