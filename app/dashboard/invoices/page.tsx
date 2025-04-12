import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Gestion des factures",
  description:
    "Consultez, générez et suivez toutes vos factures directement depuis F4 HealthHub.",
  keywords: [
    "F4 HealthHub",
    "factures",
    "gestion factures",
    "agence placement",
    "finances",
  ],
};

export default async function Page() {
  await new Promise((r) => setTimeout(r, 2000)); //
  return <h1>INVOICES</h1>;
}
