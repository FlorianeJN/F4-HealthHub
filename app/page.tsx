import { Button } from "@/components/ui/button";
import LandingHeader from "@/components/ui/landing-header";
import SignUp from "@/components/ui/sign-up";
import { ArrowRight, BarChart3, Calendar, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                La solution tout-en-un pour les agences de placement en santé
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Simplifiez votre gestion, optimisez vos placements et augmentez
                votre rentabilité avec notre plateforme intuitive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-full px-8 py-6 text-base">
                  Regarder la démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Tableau de bord intuitif et puissant
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Visualisez vos performances en temps réel et prenez des
                décisions éclairées grâce à notre interface intuitive.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 max-w-5xl mx-auto">
              <Image
                src="/lander.PNG"
                alt="Tableau de bord F4-HEALTHCARE"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Fonctionnalités conçues pour les professionnels de la santé
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour gérer efficacement votre
                agence de placement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyse avancée</h3>
                <p className="text-slate-600">
                  Suivez vos revenus, quarts de travail, partenaires et employés
                  avec des tableaux de bord en temps réel.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Gestion des talents
                </h3>
                <p className="text-slate-600">
                  Gérez facilement vos professionnels de santé et leurs
                  affectations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Planification</h3>
                <p className="text-slate-600">
                  Optimisez les horaires et les affectations avec notre
                  calendrier intelligent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conformité</h3>
                <p className="text-slate-600">
                  Assurez-vous que tous vos placements respectent les
                  réglementations en vigueur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à transformer votre agence de placement?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Faites partie des agences qui optimisent leur organisation avec F4
              HealthHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUp
                className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-6 text-base"
                label="Commencer maintenant"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50  py-12 mt-8 pt-8 border-t text-center text-slate-500">
        <p>© {new Date().getFullYear()} F4-HEALTHCARE. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
