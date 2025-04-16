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
