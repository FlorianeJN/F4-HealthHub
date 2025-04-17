"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function addPartner(formData: FormData) {
  "use server";

  const nom_partenaire = formData.get("nom_partenaire") as string;
  const no_civique = formData.get("no_civique") as string;
  const rue = formData.get("rue") as string;
  const ville = formData.get("ville") as string;
  const province = formData.get("province") as string;
  const code_postal = formData.get("code_postal") as string;
  const telephone = formData.get("telephone") as string;
  const courriel = formData.get("courriel") as string;

  try {
    console.log("Données du partenaire :", {
      nom_partenaire,
      no_civique,
      rue,
      ville,
      province,
      code_postal,
      telephone,
      courriel,
    });

    await sql`INSERT INTO partenaire (nom, numero_civique, rue, ville, province, code_postal, telephone, courriel)
     VALUES (${nom_partenaire}, ${no_civique}, ${rue}, ${ville}, ${province}, ${code_postal}, ${telephone}, ${courriel})`;
    revalidatePath("/dashboard/partners");
  } catch (e) {
    console.error("Erreur lors de l'insertion du partenaire :", e);
    throw new Error("Database Error");
  }
}

export async function deletePartner(id: number) {
  "use server";

  try {
    await sql`DELETE FROM partenaire WHERE id = ${id}`;
    revalidatePath("/dashboard/partners");
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de la suppression du partenaire :", e);
    throw new Error("Database Error");
  }
}

export async function updatePartner(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const nom_partenaire = formData.get("nom_partenaire") as string;
  const no_civique = formData.get("no_civique") as string;
  const rue = formData.get("rue") as string;
  const ville = formData.get("ville") as string;
  const province = formData.get("province") as string;
  const code_postal = formData.get("code_postal") as string;
  const telephone = formData.get("telephone") as string;
  const courriel = formData.get("courriel") as string;

  try {
    await sql`
      UPDATE partenaire 
      SET nom = ${nom_partenaire}, 
          numero_civique = ${no_civique}, 
          rue = ${rue}, 
          ville = ${ville}, 
          province = ${province}, 
          code_postal = ${code_postal}, 
          telephone = ${telephone}, 
          courriel = ${courriel}
      WHERE id = ${id}
    `;
    revalidatePath("/dashboard/partners");
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de la mise à jour du partenaire :", e);
    throw new Error("Database Error");
  }
}

export async function addEmployee(formData: FormData) {
  "use server";

  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const telephone = formData.get("telephone") as string;
  const email = formData.get("email") as string;
  const poste = formData.get("poste") as string;
  const statut = formData.get("statut") as string;

  try {
    await sql`
      INSERT INTO employe (nom, prenom, telephone, email, poste, statut)
      VALUES (${nom}, ${prenom}, ${telephone}, ${email}, ${poste}, ${statut})
    `;
    revalidatePath("/dashboard/employees");
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de l'insertion de l'employé :", e);
    throw new Error("Database Error");
  }
}

export async function deleteEmployee(id: number) {
  "use server";

  try {
    await sql`DELETE FROM employe WHERE id = ${id}`;
    revalidatePath("/dashboard/employees");
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de la suppression de l'employé :", e);
    throw new Error("Database Error");
  }
}

export async function updateEmployee(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const telephone = formData.get("telephone") as string;
  const email = formData.get("email") as string;
  const statut = formData.get("statut") as string;

  try {
    await sql`
      UPDATE employes 
      SET nom = ${nom}, 
          prenom = ${prenom}, 
          telephone = ${telephone}, 
          email = ${email}, 
          statut = ${statut}
      WHERE id = ${id}
    `;
    revalidatePath("/dashboard/employees");
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de la mise à jour de l'employé :", e);
    throw new Error("Database Error");
  }
}

export async function saveEnterpriseInfo(formData: FormData) {
  "use server";

  // Récupérer les données du formulaire
  const company = formData.get("company");
  const neq = formData.get("neq");
  const tps = formData.get("tps");
  const tvq = formData.get("tvq");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const website = formData.get("website");

  // Récupérer les données d'adresse
  const address_number = formData.get("address_number");
  const address_street = formData.get("address_street");
  const address_city = formData.get("address_city");
  const address_province = formData.get("address_province");
  const address_postal_code = formData.get("address_postal_code");

  // Ici, vous pouvez ajouter la logique pour sauvegarder les informations
  console.log("Sauvegarde des informations:", {
    company,
    neq,
    tps,
    tvq,
    phone,
    email,
    website,
    address: {
      number: address_number,
      street: address_street,
      city: address_city,
      province: address_province,
      postal_code: address_postal_code,
    },
  });

  // Pour l'instant, nous allons simplement simuler un délai
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
