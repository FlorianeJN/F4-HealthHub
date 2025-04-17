import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchInvoices } from "@/lib/data";

import { invoiceColumns } from "@/lib/column-definitions";
import { InvoiceDataTable } from "./invoice-data-table";

export async function InvoiceTable() {
  const data = await fetchInvoices();

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader className="border-b bg-muted/50">
        <CardTitle className="text-lg">Liste des factures</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <InvoiceDataTable data={data} columns={invoiceColumns} />
      </CardContent>
    </Card>
  );
}
