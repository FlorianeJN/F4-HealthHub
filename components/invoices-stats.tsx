import {
  fetchInvoiceStats2025,
  fetchTotalAmounts,
  fetchTotalPendingAmounts,
  fetchTotalReceivedAmounts,
} from "@/lib/data";
import Tuile from "./custom/tuile";

export async function InvoicesStats() {
  const { total, byPartner } = await fetchInvoiceStats2025();
  const { total: totalReceived, byPartner: byPartnerReceived } =
    await fetchTotalReceivedAmounts();
  const { total: totalPending, byPartner: byPartnerPending } =
    await fetchTotalPendingAmounts();

  const { total: totalAmount, byPartner: byPartnerTotalAmount } =
    await fetchTotalAmounts();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2 @xl/main:grid-cols-4">
      <Tuile
        title="Nombre total des factures générées"
        value={total.toString()}
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              CHSLD Saint-Jean :{" "}
              {byPartner.find((p) => p.partner === "CHSLD Saint-Jean")?.count}
            </div>
            <div className="text-muted-foreground">
              {" "}
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
            <div className="line-clamp-1 flex gap-2 font-medium">
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
            <div className="line-clamp-1 flex gap-2 font-medium">
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
            <div className="line-clamp-1 flex gap-2 font-medium">
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
