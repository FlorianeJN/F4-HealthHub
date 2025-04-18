import Tuile from "./custom/tuile";

export function InvoiceStats() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2 @xl/main:grid-cols-4">
      <Tuile
        title="Montant total de la facture"
        value="0,00 $"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Montant avant taxes : 0,00 $
            </div>
            <div className="text-muted-foreground">TPS : 0,00 $</div>
            <div className="text-muted-foreground">TVQ : 0,00 $</div>
          </>
        }
      />

      <Tuile
        title="Nombre total de quarts"
        value="124"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Soins infirmiers: 2
            </div>
            <div className="text-muted-foreground"> INF AUX : 2</div>
            <div className="text-muted-foreground"> PAB: 2</div>
          </>
        }
      />

      <Tuile
        title="Nombre total d'heures"
        value="0"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Soins infirmiers: 2h
            </div>
            <div className="text-muted-foreground"> INF AUX : 2h</div>
            <div className="text-muted-foreground"> PAB: 2h</div>
          </>
        }
      />

      <Tuile
        title="Taux horaire moyen"
        value="0,00 $"
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Taux horaire INF : 0,00 $
            </div>
            <div className="text-muted-foreground">
              {" "}
              Taux horaire INF AUX : 0,00 $
            </div>
            <div className="text-muted-foreground">
              {" "}
              Taux horaire PAB : 0,00 $
            </div>
          </>
        }
      />
    </div>
  );
}
