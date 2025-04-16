import { LandingHeader } from "@/components/ui/landing-header";
import SignUp from "@/components/ui/sign-up";
import { BarChart3, Calendar, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section with Dashboard Preview */}
        <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,124,245,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(57,108,255,0.1),transparent_50%)]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    F4 HealthHub
                  </h1>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                  La solution tout-en-un pour les agences de placement en santé
                </h2>
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                  Simplifiez votre gestion, optimisez vos placements et
                  augmentez votre rentabilité avec notre plateforme
                </p>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#637CF5]/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#637CF5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">
                      Gestion simplifiée
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#637CF5]/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#637CF5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">
                      Suivi en temps réel
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#637CF5]/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#637CF5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">
                      Planification optimisée
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#637CF5]/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#637CF5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">
                      Rapports détaillés
                    </span>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <SignUp
                    className="bg-[#396CFF] hover:bg-[#2F5FE0] text-white rounded-full px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    label="Commencer maintenant"
                  />
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Déjà utilisé par plus de 50 agences de placement en santé
                </p>
              </div>
              <div className="relative mt-6 lg:mt-0">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#637CF5] to-[#396CFF] rounded-2xl opacity-10 blur-xl -z-10"></div>
                  <Image
                    src="/illustration.png"
                    alt="Illustration F4 HealthHub"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-slate-200 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#637CF5]/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#637CF5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Satisfaction client
                      </p>
                      <p className="text-xs text-slate-500">
                        100% des utilisateurs satisfaits
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                Fonctionnalités
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                Conçu pour les professionnels de la santé
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour gérer efficacement votre
                agence de placement.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900">
                  Analyse avancée
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Suivez vos revenus, quarts de travail, partenaires et employés
                  avec des tableaux de bord en temps réel.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900">
                  Gestion des talents
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Gérez facilement vos professionnels de santé et leurs
                  affectations.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900">
                  Planification
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Optimisez les horaires et les affectations avec notre
                  calendrier intelligent.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-amber-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900">
                  Conformité
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Assurez-vous que tous vos placements respectent les
                  réglementations en vigueur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Showcase */}
        <section className="py-12 sm:py-16 bg-slate-50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,124,245,0.1),transparent_50%)]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-xl -z-10"></div>
                  <Image
                    src="/lander.png"
                    alt="Tableau de bord F4-HEALTHCARE"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                  Tableau de bord
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                  Visualisez vos performances en temps réel
                </h2>
                <p className="text-lg text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                  Notre tableau de bord intuitif vous permet de suivre tous les
                  aspects de votre agence en un coup d&apos;œil. Prenez des
                  décisions éclairées basées sur des données précises et à jour.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="h-4 w-4 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-slate-700">
                      Suivi des revenus et des dépenses
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="h-4 w-4 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-slate-700">
                      Gestion des quarts de travail
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="h-4 w-4 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-slate-700">
                      Analyse des performances des partenaires
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-[#637CF5] to-[#396CFF] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">
              Prêt à transformer votre agence de placement?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Faites partie des agences qui optimisent leur organisation avec F4
              HealthHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUp
                className="bg-white text-[#396CFF] hover:bg-slate-100 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                label="Commencer maintenant"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6 sm:py-8 mt-6 pt-6 border-t text-center text-slate-500">
        <p>© 2025 F4 HealthHub. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
