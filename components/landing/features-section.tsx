import {
  Calendar,
  ClipboardList,
  FileText,
  Heart,
  LineChart,
  Users,
} from "lucide-react";

const features = [
  {
    name: "Gestion des employés",
    description:
      "Gérez facilement vos équipes médicales, leurs horaires et leurs affectations.",
    icon: Users,
  },
  {
    name: "Suivi des patients",
    description:
      "Accédez aux dossiers médicaux et suivez l'évolution des traitements en temps réel.",
    icon: Heart,
  },
  {
    name: "Planification",
    description:
      "Organisez les rendez-vous et les consultations avec un calendrier intuitif.",
    icon: Calendar,
  },
  {
    name: "Rapports et analyses",
    description:
      "Générez des rapports détaillés et visualisez les données importantes.",
    icon: LineChart,
  },
  {
    name: "Gestion des documents",
    description:
      "Stockez et gérez tous vos documents médicaux de manière sécurisée.",
    icon: FileText,
  },
  {
    name: "Suivi des tâches",
    description:
      "Assignez et suivez les tâches de votre équipe pour une meilleure organisation.",
    icon: ClipboardList,
  },
];

export function FeaturesSection() {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une suite complète d&apos;outils pour votre pratique médicale
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Notre plateforme regroupe tous les outils nécessaires pour gérer
            efficacement votre pratique médicale, de la gestion des employés au
            suivi des patients.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
