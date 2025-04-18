import Tuile from "./custom/tuile";

export function InvoicesStats() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2 @xl/main:grid-cols-4">
      <Tuile
        title="Nombre total des factures générées en 2025"
        value="123"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              CHSLD Granby : 2
            </div>
            <div className="text-muted-foreground"> CHSLD Saint-Jean : 4</div>
          </>
        }
      />

      <Tuile
        title="Montant total reçu en 2025"
        value="12 034$"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              CHSLD Granby : 2345$
            </div>
            <div className="text-muted-foreground">
              CHSLD Saint-Jean : 9689$
            </div>
          </>
        }
      />

      <Tuile
        title="Montant en attente de paiement"
        value="12 034$"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Factures prêtes : 444$
            </div>
            <div className="text-muted-foreground">
              Factures à compléter : 1234$
            </div>
          </>
        }
      />

      <Tuile
        title="Montant total facturé"
        value="33 435$"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              CHSLD Granby : 2564$
            </div>
            <div className="text-muted-foreground">
              CHSLD Saint-Jean : 4536$
            </div>
          </>
        }
      />
    </div>
  );
}
