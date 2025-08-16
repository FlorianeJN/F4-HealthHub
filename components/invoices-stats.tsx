import {
  fetchInvoiceStats,
  fetchTotalAmounts,
  fetchTotalPendingAmounts,
  fetchTotalReceivedAmounts,
} from "@/lib/data";
import Tuile from "./custom/tuile";

export async function InvoicesStats() {
  const { total, byPartner } = await fetchInvoiceStats();
  const { total: totalReceived, byPartner: byPartnerReceived } =
    await fetchTotalReceivedAmounts();
  const { total: totalPending, byPartner: byPartnerPending } =
    await fetchTotalPendingAmounts();
  const { total: totalAmount, byPartner: byPartnerTotalAmount } =
    await fetchTotalAmounts();

  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs">
      <Tuile
        title="Nombre total des factures générées"
        value={total.toString()}
        code={
          <>
            <div className="flex gap-2 font-medium">
              CHSLD Saint-Jean :{" "}
              {byPartner.find((p) => p.partner === "CHSLD Saint-Jean")?.count}
            </div>
            <div className="text-muted-foreground">
              CHSLD Granby :{" "}
              {byPartner.find((p) => p.partner === "CHSLD Granby")?.count}
            </div>
          </>
        }
      />

      <Tuile
        title="Montant total reçu "
        value={totalReceived.toString()}
        code={
          <>
            <div className="flex gap-2 font-medium">
              CHSLD Saint-Jean :{" "}
              {byPartnerReceived.find((p) => p.partner === "CHSLD Saint-Jean")
                ?.total || "0 $"}
            </div>
            <div className="text-muted-foreground">
              CHSLD Granby :{" "}
              {byPartnerReceived.find((p) => p.partner === "CHSLD Granby")
                ?.total || "0 $"}
            </div>
          </>
        }
      />

      <Tuile
        title="Montant en attente de paiement"
        value={totalPending.toString()}
        code={
          <>
            <div className="flex gap-2 font-medium">
              CHSLD Saint-Jean :{" "}
              {byPartnerPending.find((p) => p.partner === "CHSLD Saint-Jean")
                ?.total || "0 $"}
            </div>
            <div className="text-muted-foreground">
              CHSLD Granby :{" "}
              {byPartnerPending.find((p) => p.partner === "CHSLD Granby")
                ?.total || "0 $"}
            </div>
          </>
        }
      />

      <Tuile
        title="Montant total facturé"
        value={totalAmount}
        code={
          <>
            <div className="flex gap-2 font-medium">
              CHSLD Saint-Jean :{" "}
              {
                byPartnerTotalAmount.find(
                  (p) => p.partner === "CHSLD Saint-Jean"
                )?.total
              }
            </div>
            <div className="text-muted-foreground">
              CHSLD Granby :{" "}
              {
                byPartnerTotalAmount.find((p) => p.partner === "CHSLD Granby")
                  ?.total
              }
            </div>
          </>
        }
      />
    </div>
  );
}
