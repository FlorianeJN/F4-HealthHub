"use server";

import postgres from "postgres";
import { Employee, Invoice, Partner, Shift } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const formatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

export async function fetchEnterpriseInfo() {
  "use server";

  try {
    // Récupérer les informations de l'entreprise
    const enterpriseResult = await sql`
      SELECT * FROM entreprise LIMIT 1
    `;

    if (enterpriseResult.length === 0) {
      return { enterprise: null, address: null };
    }

    const enterprise = enterpriseResult[0];

    // Récupérer l'adresse associée à l'entreprise
    const addressResult = await sql`
      SELECT * FROM adresse WHERE link = ${enterprise.id}
    `;

    const address = addressResult.length > 0 ? addressResult[0] : null;

    return { enterprise, address };
  } catch (e) {
    console.error("Erreur lors de la récupération des informations:", e);
    throw new Error("Erreur de base de données");
  }
}

export async function fetchShift(shiftId: number) {
  try {
    const data = await sql<Shift[]>`SELECT * FROM quart WHERE id = ${shiftId} `;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Error fetching shift #" + shiftId);
  }
}

export async function fetchPartners() {
  try {
    const data = await sql<Partner[]>`SELECT * FROM partenaire`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Database Error Fetching Partners");
  }
}

export async function fetchEmployees() {
  try {
    const data = await sql<Employee[]>`SELECT * from employe`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Database Error Fetching Employees");
  }
}

export async function fetchInvoices() {
  try {
    const data = await sql<
      Invoice[]
    >`SELECT num_facture,nom_partenaire,date,montant_apres_taxes,statut from facture ORDER BY num_facture DESC`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Database Error Fetching Invoices");
  }
}

export async function fetchInvoice(num_facture: string) {
  try {
    const data = await sql<
      Shift[]
    >`SELECT * FROM quart WHERE num_facture = ${num_facture}`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Database Error Fetching Invoice");
  }
}

export async function fetchInvoiceStats2025() {
  try {
    // Total number of invoices in 2025
    const totalInvoices = await sql<{ count: string }[]>`
      SELECT COUNT(*) FROM facture
     
    `;

    // Number of invoices per partner in 2025
    const invoicesByPartner = await sql<
      { nom_partenaire: string; count: string }[]
    >`
      SELECT nom_partenaire, COUNT(*) 
      FROM facture
      
      GROUP BY nom_partenaire
    `;

    return {
      total: Number(totalInvoices[0].count),
      byPartner: invoicesByPartner.map((row) => ({
        partner: row.nom_partenaire,
        count: Number(row.count),
      })),
    };
  } catch (e) {
    console.error(e);
    throw new Error("Database Error Fetching Invoice Stats");
  }
}

export async function fetchTotalAmounts() {
  try {
    // Montant total global
    const totalResult = await sql<{ total: number | null }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
    `;

    const total = totalResult[0]?.total ?? 0;

    // Montant total par partenaire
    const partnerResult = await sql<
      { nom_partenaire: string; total: number | null }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      GROUP BY nom_partenaire
    `;

    const byPartner = partnerResult.map((row) => ({
      partner: row.nom_partenaire,
      total: formatter.format(row.total ?? 0),
    }));

    return {
      total: formatter.format(total),
      byPartner,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total invoice amounts");
  }
}

export async function fetchTotalReceivedAmounts() {
  try {
    // Montant total payé
    const totalResult = await sql<{ total: number }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Payée'
    `;

    const total = totalResult[0].total || 0;

    // Montant payé par partenaire
    const partnerResult = await sql<
      { nom_partenaire: string; total: number }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Payée'
      GROUP BY nom_partenaire
    `;

    const byPartner = partnerResult.map((row) => ({
      partner: row.nom_partenaire,
      total: formatter.format(row.total || 0),
    }));

    return {
      total: formatter.format(total),
      byPartner,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total received amounts");
  }
}

export async function fetchTotalPendingAmounts() {
  try {
    const formatter = new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    });

    // Montant en attente
    const totalResult = await sql<{ total: number | null }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Envoyée'
    `;

    const total = totalResult[0]?.total ?? 0;

    // Montant en attente par partenaire
    const partnerResult = await sql<
      { nom_partenaire: string; total: number | null }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Envoyée'
      GROUP BY nom_partenaire
    `;

    const byPartner = partnerResult.map((row) => ({
      partner: row.nom_partenaire,
      total: formatter.format(row.total ?? 0),
    }));

    return {
      total: formatter.format(total),
      byPartner,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total pending amounts");
  }
}

export async function fetchInvoiceAmounts(num_facture: string) {
  try {
    const data = await sql<
      {
        montant_avant_taxes: number;
        montant_apres_taxes: number;
        tps: number;
        tvq: number;
      }[]
    >` 
    SELECT 
      montant_avant_taxes,
      montant_apres_taxes ,
      tps,
      tvq
    FROM facture 
    WHERE num_facture = ${num_facture} 
  `;

    const row = data[0];

    return {
      montant_avant_taxes: formatter.format(row.montant_avant_taxes ?? 0),
      tps: formatter.format(row.tps ?? 0),
      tvq: formatter.format(row.tvq ?? 0),
      montant_apres_taxes: formatter.format(row.montant_apres_taxes ?? 0),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching invoice amounts");
  }
}

export async function fetchNumberOfShifts(num_facture: string) {
  try {
    // Nombre total de quarts
    const totalResult = await sql<{ count: string }[]>`
      SELECT COUNT(*) AS count
      FROM quart
      WHERE num_facture = ${num_facture}
    `;

    // Nombre de quarts par prestation
    const byPrestationResult = await sql<
      { prestation: string; count: string }[]
    >`
      SELECT prestation, COUNT(*) AS count
      FROM quart
      WHERE num_facture = ${num_facture}
      GROUP BY prestation
    `;

    return {
      total: totalResult[0]?.count ?? 0,
      byPrestation: byPrestationResult,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching number of shifts");
  }
}

export async function fetchTotalHours(num_facture: string) {
  try {
    const totalResult = await sql<{ total_minutes: number | null }[]>`
      SELECT SUM(
        EXTRACT(HOUR FROM temps_total::time) * 60 +
        EXTRACT(MINUTE FROM temps_total::time)
      ) AS total_minutes
      FROM quart
      WHERE num_facture = ${num_facture}
    `;

    const totalMinutes = totalResult[0]?.total_minutes ?? 0;
    const totalHours = (totalMinutes / 60).toFixed(2);

    // Par prestation
    const byPrestationResult = await sql<
      { prestation: string; total_minutes: number | null }[]
    >`
      SELECT prestation,
        SUM(EXTRACT(HOUR FROM temps_total::time) * 60 + EXTRACT(MINUTE FROM temps_total::time)) AS total_minutes
      FROM quart
      WHERE num_facture = ${num_facture}
      GROUP BY prestation
    `;

    const byPrestation = byPrestationResult.map((row) => ({
      prestation: row.prestation,
      total: ((row.total_minutes ?? 0) / 60).toFixed(2), // Format "2.25" heures
    }));

    return {
      total: totalHours,
      byPrestation,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total hours");
  }
}

export async function fetchStatus(num_facture: string) {
  try {
    const data = await sql<{ statut: string }[]>`
      SELECT statut FROM facture WHERE num_facture = ${num_facture}
    `;
    return data[0]?.statut;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching status");
  }
}

export async function fetchAverageRate(num_facture: string) {
  try {
    const result = await sql<{ taux_moyen: number | null }[]>`
    SELECT ROUND(AVG(taux_horaire), 2) AS taux_moyen
    FROM quart
    WHERE num_facture = ${num_facture}
  `;
    return formatter.format(result[0]?.taux_moyen ?? 0);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching average rate");
  }
}
