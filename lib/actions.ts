"use server";

import { formSchema } from "@/components/shift-form";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

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
      UPDATE employe 
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
  const company = formData.get("company") as string;
  const neq = formData.get("neq") as string;
  const tps = formData.get("tps") as string;
  const tvq = formData.get("tvq") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const website = formData.get("website") as string;

  // Récupérer les données d'adresse
  const address_number = formData.get("address_number") as string;
  const address_street = formData.get("address_street") as string;
  const address_city = formData.get("address_city") as string;
  const address_province = formData.get("address_province") as string;
  const address_postal_code = formData.get("address_postal_code") as string;

  try {
    // Vérifier si une entreprise existe déjà
    const existingEnterprise = await sql`
      SELECT id FROM entreprise LIMIT 1
    `;

    let enterpriseId;

    if (existingEnterprise.length > 0) {
      // Mettre à jour l'entreprise existante
      enterpriseId = existingEnterprise[0].id;
      await sql`
        UPDATE entreprise 
        SET nom = ${company}, 
            neq = ${neq}, 
            tps = ${tps}, 
            tvq = ${tvq}, 
            telephone = ${phone}, 
            email = ${email}, 
            website = ${website}
        WHERE id = ${enterpriseId}
      `;

      // Vérifier si une adresse existe déjà pour cette entreprise
      const existingAddress = await sql`
        SELECT id FROM adresse WHERE link = ${enterpriseId}
      `;

      if (existingAddress.length > 0) {
        // Mettre à jour l'adresse existante
        await sql`
          UPDATE adresse 
          SET no_civique = ${address_number}, 
              rue = ${address_street}, 
              ville = ${address_city}, 
              province = ${address_province}, 
              code_postal = ${address_postal_code}
          WHERE link = ${enterpriseId}
        `;
      } else {
        // Créer une nouvelle adresse
        await sql`
          INSERT INTO adresse (no_civique, rue, ville, province, code_postal, link)
          VALUES (${address_number}, ${address_street}, ${address_city}, ${address_province}, ${address_postal_code}, ${enterpriseId})
        `;
      }
    } else {
      // Créer une nouvelle entreprise
      const result = await sql`
        INSERT INTO entreprise (nom, neq, tps, tvq, telephone, email, website)
        VALUES (${company}, ${neq}, ${tps}, ${tvq}, ${phone}, ${email}, ${website})
        RETURNING id
      `;

      enterpriseId = result[0].id;

      // Créer une nouvelle adresse
      await sql`
        INSERT INTO adresse (no_civique, rue, ville, province, code_postal, link)
        VALUES (${address_number}, ${address_street}, ${address_city}, ${address_province}, ${address_postal_code}, ${enterpriseId})
      `;
    }

    console.log(
      "Informations de l'entreprise et de l'adresse sauvegardées avec succès"
    );
    revalidatePath("/dashboard/profile");
  } catch (e) {
    console.error("Erreur lors de la sauvegarde des informations:", e);
    throw new Error("Erreur de base de données");
  }
}

export async function updateShift(
  shiftId: number,
  data: z.infer<typeof formSchema>,
  numFacture: string
) {
  "use server";
  const {
    date,
    debutQuart,
    finQuart,
    pause,
    tempsTotal,
    prestation,
    tauxHoraire,
    montantHorsTaxes,
    notes,
  } = data;

  // Conversion pour le bon nom de prestation
  let prestationModifiee;
  switch (prestation) {
    case "soins_infirmiers":
      prestationModifiee = "SOINS INFIRMIERS";
      break;
    case "inf_clinicien":
      prestationModifiee = "INF CLINICIEN(NE)";
      break;
    case "inf_aux":
      prestationModifiee = "INF AUXILIAIRE";
      break;
    default:
      prestationModifiee = "PAB";
  }

  try {
    await sql`
    UPDATE quart 
    SET 
      date_quart = ${date}, 
      debut_quart = ${debutQuart}, 
      fin_quart = ${finQuart}, 
      pause = ${pause}, 
      temps_total = ${tempsTotal}, 
      prestation = ${prestationModifiee}, 
      taux_horaire = ${tauxHoraire}, 
      montant_total = ${montantHorsTaxes}, 
      notes = ${notes}
    WHERE id = ${shiftId}
  `;

    console.log("Mise à jour complétée");

    // Mettre à jour les chemins liés à la facture
    revalidatePath(`/dashboard/invoices`);
    revalidatePath(`/dashboard/invoices/${numFacture}`);
  } catch (e) {
    console.error("Erreur lors de la mise à jour du quart : ", e);
  }
}

export async function addShift(
  data: z.infer<typeof formSchema>,
  numFacture: string
) {
  "use server";

  const {
    date,
    debutQuart,
    finQuart,
    pause,
    tempsTotal,
    prestation,
    tauxHoraire,
    montantHorsTaxes,
    notes,
  } = data;

  let prestationModifiee;

  //Conversion pour le bon nom de prestation
  if (prestation === "soins_infirmiers") {
    prestationModifiee = "SOINS INFIRMIERS";
  } else if (prestation === "inf_clinicien") {
    prestationModifiee = "INF CLINICIEN(NE)";
  } else if (prestation === "inf_aux") {
    prestationModifiee = "INF AUXILIAIRE";
  } else {
    prestationModifiee = "PAB";
  }

  try {
    await sql`INSERT INTO quart (num_facture,date_quart,debut_quart,fin_quart,pause,temps_total,prestation,taux_horaire,montant_total,notes) VALUES (${numFacture}, ${date}, ${debutQuart}, ${finQuart},${pause}, ${tempsTotal}, ${prestationModifiee}, ${tauxHoraire}, ${montantHorsTaxes},${notes} )`;

    console.log("Ajout complété");

    //Mettre a jour le montant de la facture

    revalidatePath(`/dashboard/invoices`);
    revalidatePath(`/dashboard/invoices/${numFacture}`);
  } catch (e) {
    console.error("Erreur lors de l'insertion du quart : ", e);
  }
}

export async function deleteShift(id: number) {
  "use server";

  try {
    await sql`DELETE FROM quart WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    revalidatePath(`/dashboard/invoices/${id}`);
    return { success: true };
  } catch (e) {
    console.error("Erreur lors de la suppression du quart :", e);
    throw new Error("Database Error");
  }
}

export async function updateStatus(newStatus: string, numFacture: string) {
  "use server";

  try {
    await sql`
      UPDATE facture
      SET statut = ${newStatus}
      WHERE num_facture = ${numFacture}
    `;

    // Revalidate cache for affected paths
    revalidatePath("/dashboard/invoices");
    revalidatePath(`/dashboard/invoices/${numFacture}`);
  } catch (e) {
    console.error(
      "Erreur lors du changement de statut de la facture #" + numFacture,
      e
    );
    throw new Error("Erreur changement statut facture");
  }
}
