import { InvoiceStats } from "@/components/invoice-stats";
import { InvoiceTable } from "@/components/invoice-table";
import { fetchInvoices } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Factures",
  description: "Gérez vos factures et paiements",
};

export default async function InvoicesPage() {
  const data = await fetchInvoices();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-4 md:gap-8 md:py-6 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Factures</h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos factures et suivez vos paiements
              </p>
            </div>
          </div>

          <InvoiceStats />
          <InvoiceTable invoices={data} />
        </div>
      </div>
    </div>
  );
}
