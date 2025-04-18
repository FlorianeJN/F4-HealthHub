import { ProfileFormSkeleton } from "@/components/skeletons/profile-form-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="text-muted-foreground">
          Gérez les informations de votre entreprise
        </p>
      </div>

      <ProfileFormSkeleton />
    </div>
  );
}
