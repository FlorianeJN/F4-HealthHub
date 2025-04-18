"use server";

import postgres from "postgres";
import { Employee, Invoice, Partner, Shift } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const formatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

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
