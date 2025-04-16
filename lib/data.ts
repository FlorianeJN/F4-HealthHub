"use server";

import postgres from "postgres";
import { Employee, Partner } from "./definitions";

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
    const data = await sql<Employee[]>`SELECT * from employes`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Database Error Fetching Employees");
  }
}
