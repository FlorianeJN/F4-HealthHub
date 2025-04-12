import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Profil de l’entreprise",
  description:
    "Découvrez le profil de votre agence de placement : informations, statistiques et paramètres de l’entreprise sur F4 HealthHub.",
  keywords: [
    "F4 HealthHub",
    "profil entreprise",
    "agence placement",
    "informations société",
    "paramètres",
  ],
};

export default async function Page() {
  await new Promise((r) => setTimeout(r, 2000)); //
  return <h1>PROFIL DE L’ENTREPRISE</h1>;
}
