import { InvoiceStatsSkeleton } from "@/components/skeletons/invoice-stats-skeleton";
import { InvoiceTableSkeleton } from "@/components/skeletons/invoice-table-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Factures</h1>
        <p className="text-muted-foreground">
          Gérez vos factures et leur statut de paiement
        </p>
      </div>

      <InvoiceStatsSkeleton />
      <InvoiceTableSkeleton />
    </div>
  );
}
