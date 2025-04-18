import { InvoiceShiftsTable } from "@/components/invoice-shifts-table";
import { InvoiceStats } from "@/components/invoice-stats";
import { Badge } from "@/components/ui/badge";
import { fetchInvoice, fetchStatus } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Détails de la facture",
  description: "Consultez les détails de la facture et les quarts associés",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shifts = await fetchInvoice(id);
  const invoiceNumber = id;
  const [, month, year] = invoiceNumber.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const status = await fetchStatus(invoiceNumber);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-4 md:gap-8 md:py-6 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Facture {invoiceNumber}</h1>
              <p className="text-muted-foreground mt-1">
                {formatDate(date.toISOString())}
              </p>
            </div>
            <Badge
              variant="default"
              className={
                status === "Payée"
                  ? "bg-green-600 hover:bg-green-700"
                  : status === "Envoyée"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : status === "Prête"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : status === "À compléter"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }
            >
              {status}
            </Badge>
          </div>

          <InvoiceStats num_facture={invoiceNumber} />

          <InvoiceShiftsTable shifts={shifts} />
        </div>
      </div>
    </div>
  );
}
