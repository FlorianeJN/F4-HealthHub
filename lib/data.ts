"use server";

import postgres from "postgres";
import { Employee, Invoice, Partner, Shift } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
