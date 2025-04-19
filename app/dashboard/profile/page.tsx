import { ProfileForm } from "@/components/profile-form";
import { fetchEnterpriseInfo } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Profil de l&apos;entreprise",
  description: "Informations sur l&apos;entreprise",
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Récupérer les données de l'entreprise
  const { enterprise, address } = await fetchEnterpriseInfo();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-4 md:gap-8 md:py-6 lg:px-6">
          <ProfileForm enterprise={enterprise} address={address} />
        </div>
      </div>
    </div>
  );
}
