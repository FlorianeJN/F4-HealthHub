"use server";

import postgres from "postgres";
import { Employee, Invoice, Partner, Shift } from "./definitions";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
const currentYear = new Date().getFullYear();

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
    return data[0];
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

export async function fetchInvoiceStats() {
  try {
    // Total number of invoices in 2025
    const totalInvoices = await sql<{ count: string }[]>`
      SELECT COUNT(*) 
      FROM facture
      WHERE EXTRACT(YEAR FROM date) = ${currentYear};
    `;

    // Number of invoices per partner in 2025
    const invoicesByPartner = await sql<
      { nom_partenaire: string; count: string }[]
    >`
      SELECT nom_partenaire, COUNT(*) 
      FROM facture
      WHERE EXTRACT(YEAR FROM date) = ${currentYear}
      GROUP BY nom_partenaire;
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
    throw new Error("Database Error Fetching Invoice Stats for 2025");
  }
}

export async function fetchTotalAmounts() {
  try {
    // Montant total global for 2025
    const totalResult = await sql<{ total: number | null }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE EXTRACT(YEAR FROM date) = ${currentYear};
    `;

    const total = totalResult[0]?.total ?? 0;

    // Montant total par partenaire for 2025
    const partnerResult = await sql<
      { nom_partenaire: string; total: number | null }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE EXTRACT(YEAR FROM date) = ${currentYear}
      GROUP BY nom_partenaire;
    `;

    const byPartner = partnerResult.map((row) => ({
      partner: row.nom_partenaire,
      total: row.total ?? 0,
    }));

    return {
      total: formatter.format(total),
      byPartner,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total invoice amounts for 2025");
  }
}

export async function fetchTotalReceivedAmounts() {
  try {
    // Montant total payé for 2025
    const totalResult = await sql<{ total: number | null }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Payée' AND EXTRACT(YEAR FROM date) = ${currentYear};
    `;

    const total = totalResult[0]?.total ?? 0;

    // Montant payé par partenaire for 2025
    const partnerResult = await sql<
      { nom_partenaire: string; total: number | null }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Payée' AND EXTRACT(YEAR FROM date) = ${currentYear}
      GROUP BY nom_partenaire;
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
    throw new Error("Error fetching total received amounts for 2025");
  }
}

export async function fetchTotalPendingAmounts() {
  try {
    // Montant en attente for 2025
    const totalResult = await sql<{ total: number | null }[]>`
      SELECT SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Envoyée' AND EXTRACT(YEAR FROM date) = ${currentYear};
    `;

    const total = totalResult[0]?.total ?? 0;

    // Montant en attente par partenaire for 2025
    const partnerResult = await sql<
      { nom_partenaire: string; total: number | null }[]
    >`
      SELECT nom_partenaire, SUM(montant_apres_taxes) AS total
      FROM facture
      WHERE statut = 'Envoyée' AND EXTRACT(YEAR FROM date) = ${currentYear}
      GROUP BY nom_partenaire;
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
    throw new Error("Error fetching total pending amounts for 2025");
  }
}

export async function fetchPartnerEmailFromInvoiceNumber(numFacture: string) {
  try {
    const result = await sql`
      SELECT p.courriel
      FROM facture f
      JOIN partenaire p ON f.nom_partenaire = p.nom
      WHERE f.num_facture = ${numFacture}
    `;

    if (result.length === 0) {
      return null;
    }
    return result[0].courriel;
  } catch (error) {
    console.error("Erreur lors de la récupération du courriel :", error);
    throw error;
  }
}

export async function fetchInvoiceAmounts(numFacture: string) {
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
    WHERE num_facture = ${numFacture} 
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

export async function fetchInvoiceRow(num_facture: string) {
  try {
    const data = await sql<
      { nom_partenaire: string }[]
    >`SELECT nom_partenaire FROM facture WHERE num_facture = ${num_facture}`;
    return data[0];
  } catch (e) {
    console.error(e);
    throw new Error("Database Error Fetching Invoice Row");
  }
}

export async function fetchPartnerByName(nom: string) {
  try {
    const data = await sql<
      Partner[]
    >`SELECT * FROM partenaire WHERE nom = ${nom}`;
    return data[0];
  } catch (e) {
    console.error(e);
    throw new Error("Database Error Fetching Partner by Name");
  }
}

//TODO : VERIFY
export async function fetchEmployeeRevenue() {
  try {
    const data = await sql<{ nom: string; montant_total: number }[]>`
      SELECT 
        CONCAT(e.prenom, ' ', e.nom) as nom,
        COALESCE(SUM(f.montant_apres_taxes), 0) as montant_total
      FROM employe e
      LEFT JOIN quart q ON q.emp_name = e.prenom
      LEFT JOIN facture f ON f.num_facture = q.num_facture
      WHERE f.montant_apres_taxes IS NOT NULL
      GROUP BY e.id, e.prenom, e.nom
      ORDER BY montant_total DESC
    `;
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Database Error Fetching Employee Revenue");
  }
}

//TODO : VERIFY
export async function fetchEmployeeShifts() {
  try {
    const data = await sql<{ nom: string; count: number }[]>`
      SELECT 
        CONCAT(e.prenom, ' ', e.nom) as nom,
        COUNT(q.id) as count
      FROM employe e
      LEFT JOIN quart q ON q.emp_name = e.prenom
      GROUP BY e.id, e.prenom, e.nom
      ORDER BY count DESC
    `;
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Database Error Fetching Employee Shifts");
  }
}
