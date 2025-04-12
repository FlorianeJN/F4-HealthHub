import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Connexion",
  description:
    "Connectez-vous à votre espace F4 HealthHub pour gérer votre agence de placement.",
  keywords: [
    "F4 HealthHub",
    "connexion",
    "login",
    "espace client",
    "agence placement",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}
