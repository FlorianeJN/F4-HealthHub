import {
  fetchAverageRate,
  fetchInvoiceAmounts,
  fetchNumberOfShifts,
  fetchTotalHours,
} from "@/lib/data";
import Tuile from "./custom/tuile";

export async function InvoiceStats({ num_facture }: { num_facture: string }) {
  const { montant_apres_taxes, montant_avant_taxes, tvq, tps } =
    await fetchInvoiceAmounts(num_facture);

  const { total: totalQuarts, byPrestation } =
    await fetchNumberOfShifts(num_facture);

  const { total: totalHours, byPrestation: byPrestationHours } =
    await fetchTotalHours(num_facture);

  const tauxHoraireMoyen = await fetchAverageRate(num_facture);

  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs">
      <Tuile
        title="Montant total de la facture"
        value={montant_apres_taxes}
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Montant avant taxes : {montant_avant_taxes}
            </div>
            <div className="text-muted-foreground">TPS : {tps}</div>
            <div className="text-muted-foreground">TVQ : {tvq}</div>
          </>
        }
      />

      <Tuile
        title="Nombre total de quarts"
        value={totalQuarts}
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Soins infirmiers:{" "}
              {byPrestation.find((p) => p.prestation === "SOINS INFIRMIERS")
                ?.count ?? 0}
            </div>
            <div className="text-muted-foreground">
              Inf Clinicien(ne):{" "}
              {byPrestation.find((p) => p.prestation === "INF CLINICIEN(NE)")
                ?.count ?? 0}
            </div>
            <div className="text-muted-foreground">
              {" "}
              INF AUX :{" "}
              {byPrestation.find((p) => p.prestation === "INF AUXILIAIRE")
                ?.count ?? 0}
            </div>
            <div className="text-muted-foreground">
              {" "}
              PAB:{" "}
              {byPrestation.find((p) => p.prestation === "PAB")?.count ?? 0}
            </div>
          </>
        }
      />

      <Tuile
        title="Nombre total d'heures"
        value={totalHours + " h"}
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Soins infirmiers:{" "}
              {byPrestationHours.find(
                (p) => p.prestation === "SOINS INFIRMIERS"
              )?.total ?? 0}{" "}
              h
            </div>
            <div className="text-muted-foreground">
              Inf Clinicien(ne):{" "}
              {byPrestationHours.find(
                (p) => p.prestation === "INF CLINICIEN(NE)"
              )?.total ?? 0}{" "}
              h
            </div>
            <div className="text-muted-foreground">
              {" "}
              INF AUX :{" "}
              {byPrestationHours.find((p) => p.prestation === "INF AUXILIAIRE")
                ?.total ?? 0}{" "}
              h
            </div>
            <div className="text-muted-foreground">
              {" "}
              PAB:{" "}
              {byPrestationHours.find((p) => p.prestation === "PAB")?.total ??
                0}{" "}
              h
            </div>
          </>
        }
      />

      <Tuile
        title="Taux horaire moyen"
        value={tauxHoraireMoyen}
        code={
          <>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Taux horaire Soins infirmiers : 71,87 $
            </div>
            <div className="text-muted-foreground">
              Taux horaire Inf Clinicien(ne) : 74,36 $
            </div>
            <div className="text-muted-foreground">
              {" "}
              Taux horaire INF AUX : 47,65 $
            </div>
            <div className="text-muted-foreground">
              {" "}
              Taux horaire PAB : 41,96 $
            </div>
          </>
        }
      />
    </div>
  );
}
