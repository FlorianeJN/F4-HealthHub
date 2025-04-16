"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex px-4 sm:px-52 items-center gap-2">
          <span className="font-semibold text-xl">F4 HealthHub</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <SignIn
            label="Connexion"
            className="bg-white text-[#396CFF] border border-[#396CFF] hover:bg-[#396CFF]/10"
          />
          <SignUp
            label="Inscription"
            className="bg-[#396CFF] hover:bg-[#2F5FE0] text-white"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#396CFF] hover:bg-slate-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Ouvrir le menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-3">
            <SignIn
              label="Connexion"
              className="w-full bg-white text-[#396CFF] border border-[#396CFF] hover:bg-[#396CFF]/10"
            />
            <SignUp
              label="Inscription"
              className="w-full bg-[#396CFF] hover:bg-[#2F5FE0] text-white"
            />
          </div>
        </div>
      )}
    </header>
  );
}
