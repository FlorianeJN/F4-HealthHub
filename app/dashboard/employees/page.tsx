import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Gestion des employés",
  description:
    "Gérez vos employés, consultez leurs disponibilités et leurs affectations depuis F4 HealthHub.",
  keywords: [
    "F4 HealthHub",
    "employés",
    "gestion employés",
    "agence placement",
    "RH",
  ],
};

export default async function Page() {
  await new Promise((r) => setTimeout(r, 2000)); //
  return <h1>EMPLOYEES</h1>;
}
